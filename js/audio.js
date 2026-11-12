'use strict';

/* =========================================================================
   Áudio sintetizado (WebAudio) - efeitos e ambiente
   ========================================================================= */

class GameAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.enabled = true;
    this.musicTimer = null;
    this.musicStep = 0;
    this.lastFoot = 0;

    // Playlist alternativa (HTMLAudioElement)
    this.playlistAudio = null;
    this.playlistActive = false;
    this.playlistPaused = false;
    this.playlistIndex = 0;
    this.playlistVolume = 0.4;
    this.currentTrack = null;
    this.onTrackChange = null;
    this.onPlaylistError = null;
    this.inGame = false;
    this._trackFailures = 0;
    this._lastErrorIndex = -1;
    this._suppressTrackToast = false;

    // Modo da trilha: 'synth' | 'local' | 'youtube'
    this.musicMode = 'synth';
    this.onMusicModeChange = null;
    this._ytBound = false;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.13;
      this.musicGain.connect(this.master);
    } catch (e) {
      this.ctx = null;
    }
  }

  setEnabled(on) {
    this.enabled = on;
    if (this.master) this.master.gain.value = on ? 0.5 : 0;
    if (this.playlistAudio) this.playlistAudio.muted = !on;
    if (typeof YoutubeMusic !== 'undefined') YoutubeMusic.setMuted(!on);
  }

  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  /* ------------------------------------------------------------------ */
  /* Playlist alternativa (arquivos locais em assets/music/)             */
  /* ------------------------------------------------------------------ */

  getPlaylist() {
    return typeof PLAYLIST !== 'undefined' && Array.isArray(PLAYLIST) ? PLAYLIST : [];
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  /* Alterna playlist <-> trilha sintetizada. Retorna status para o jogo. */
  togglePlaylist() {
    const list = this.getPlaylist();
    if (!list.length) {
      return {
        active: false,
        empty: true,
        message: 'Playlist vazia: adicione faixas em assets/music/',
      };
    }
    if (this.playlistActive) {
      this.stopPlaylist();
      return { active: false, empty: false };
    }
    return this.startPlaylist();
  }

  startPlaylist() {
    const list = this.getPlaylist();
    if (!list.length) {
      return {
        active: false,
        empty: true,
        message: 'Playlist vazia: adicione faixas em assets/music/',
      };
    }
    if (typeof Audio === 'undefined') {
      return {
        active: false,
        error: true,
        message: 'Áudio indisponível neste navegador.',
      };
    }
    if (this.playlistActive) {
      this.resumePlaylist();
      return { active: true, track: list[this.playlistIndex] };
    }

    this.stopMusic(); // a trilha sintetizada não deve sobrepor
    this._stopYoutube();
    this.playlistIndex = 0;
    this.playlistActive = true;
    this.musicMode = 'local';
    this.playlistPaused = false;
    this._trackFailures = 0;
    this._lastErrorIndex = -1;
    this._suppressTrackToast = true;

    if (!this.playlistAudio) {
      this.playlistAudio = new Audio();
      this.playlistAudio.preload = 'auto';
      this.playlistAudio.volume = this.playlistVolume;
      this.playlistAudio.addEventListener('ended', () => {
        if (this.playlistActive) this.nextTrack();
      });
      this.playlistAudio.addEventListener('error', () => this._handleTrackError());
    }
    this.playlistAudio.muted = !this.enabled;

    this._playCurrent();
    return { active: true, track: list[0] };
  }

  _playCurrent() {
    const list = this.getPlaylist();
    if (!this.playlistActive || !list.length || !this.playlistAudio) return;
    const track = list[this.playlistIndex];
    if (!track || !track.src) {
      this._handleTrackError();
      return;
    }

    const a = this.playlistAudio;
    this.currentTrack = track;
    a.src = track.src;
    try {
      a.currentTime = 0;
    } catch (e) {
      /* alguns navegadores reclamam antes dos metadados */
    }
    a.muted = !this.enabled;

    const p = a.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        this._trackFailures = 0;
        this._lastErrorIndex = -1;
        if (this.playlistActive && this.currentTrack === track) {
          this._notifyTrack(track);
        }
      }).catch(() => {
        // normalmente é bloqueio de autoplay; não drena a lista sozinho
        this._notifyError('Não foi possível iniciar a playlist. Toque na tela e tente novamente.');
      });
    }
  }

  _notifyTrack(track) {
    if (this._suppressTrackToast) {
      this._suppressTrackToast = false;
      return;
    }
    if (typeof this.onTrackChange === 'function') {
      this.onTrackChange(track, this.playlistIndex);
    }
  }

  _notifyError(message) {
    if (typeof this.onPlaylistError === 'function') this.onPlaylistError(message);
  }

  _handleTrackError() {
    if (!this.playlistActive) return;
    const list = this.getPlaylist();
    if (!list.length) return;

    if (this._lastErrorIndex === this.playlistIndex) return; // evita erro duplicado
    this._lastErrorIndex = this.playlistIndex;
    this._trackFailures++;

    if (this._trackFailures >= list.length) {
      this._playlistFailed(
        'Não foi possível carregar as faixas da playlist. Voltando à trilha original.'
      );
      return;
    }
    this._suppressTrackToast = false;
    this.nextTrack();
  }

  _playlistFailed(message) {
    this.playlistActive = false;
    this.playlistPaused = false;
    this.musicMode = 'synth';
    this.currentTrack = null;
    this._trackFailures = 0;
    this._lastErrorIndex = -1;
    this._suppressTrackToast = false;
    if (this.playlistAudio) {
      try {
        this.playlistAudio.pause();
      } catch (e) {
        /* ignora */
      }
    }
    this._notifyError(message);
    if (this.enabled && this.inGame) this.startMusic();
  }

  stopPlaylist(resumeSynth = true) {
    if (!this.playlistActive) return { active: false };
    this.playlistActive = false;
    this.playlistPaused = false;
    this.musicMode = 'synth';
    this.currentTrack = null;
    this._suppressTrackToast = false;
    if (this.playlistAudio) {
      try {
        this.playlistAudio.pause();
      } catch (e) {
        /* ignora */
      }
    }
    if (resumeSynth && this.enabled && this.inGame) this.startMusic();
    return { active: false };
  }

  nextTrack() {
    const list = this.getPlaylist();
    if (!list.length) {
      return {
        active: false,
        empty: true,
        message: 'Playlist vazia: adicione faixas em assets/music/',
      };
    }
    if (!this.playlistActive) return { active: false };
    this.playlistIndex = (this.playlistIndex + 1) % list.length;
    this._playCurrent();
    return { active: true, track: list[this.playlistIndex] };
  }

  pausePlaylist() {
    if (!this.playlistActive || !this.playlistAudio) return false;
    this.playlistPaused = true;
    try {
      this.playlistAudio.pause();
    } catch (e) {
      /* ignora */
    }
    return true;
  }

  resumePlaylist() {
    if (!this.playlistActive || !this.playlistAudio || !this.playlistPaused) return false;
    this.playlistPaused = false;
    const p = this.playlistAudio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => this._notifyError('Não foi possível retomar a playlist.'));
    }
    return true;
  }

  /* ------------------------------------------------------------------ */
  /* Ciclo da trilha secreta: synth -> local (se houver) -> youtube      */
  /* ------------------------------------------------------------------ */

  _bindYoutube() {
    if (typeof YoutubeMusic === 'undefined' || this._ytBound) return;
    this._ytBound = true;
    YoutubeMusic.onError = (message) => this._youtubeFailed(message);
    YoutubeMusic.onClose = () => this._youtubeClosed();
    YoutubeMusic.onAutoplayBlocked = () => this._notifyError('Toque no player para iniciar.');
  }

  _stopYoutube() {
    if (typeof YoutubeMusic !== 'undefined') YoutubeMusic.stop();
  }

  _enterSynth() {
    this.stopPlaylist(false);
    this._stopYoutube();
    this.stopMusic();
    this.musicMode = 'synth';
    this.playlistActive = false;
    if (this.enabled && this.inGame) this.startMusic();
    return { mode: 'synth', label: 'Trilha original' };
  }

  _enterLocal() {
    const list = this.getPlaylist();
    if (!list.length) return this._enterYoutube(true);

    this._stopYoutube();
    this.stopMusic();
    this.musicMode = 'local';
    const res = this.startPlaylist();
    if (!res || res.active !== true) {
      this.musicMode = 'synth';
      if (res && res.empty) return this._enterYoutube(true);
      return {
        mode: 'synth',
        label: 'Trilha original',
        error: (res && res.message) || 'Não foi possível iniciar a playlist local.',
      };
    }
    const track = res.track || list[0];
    return {
      mode: 'local',
      label: 'Playlist local: ' + (track && track.title ? track.title : 'faixa 1'),
    };
  }

  _enterYoutube(skippedLocal) {
    this.stopPlaylist(false);
    this.stopMusic();
    this.musicMode = 'youtube';
    this.playlistActive = false;

    if (typeof YoutubeMusic === 'undefined') {
      this.musicMode = 'synth';
      return {
        mode: 'synth',
        label: 'Trilha original',
        error: 'Player do YouTube indisponível.',
      };
    }

    this._bindYoutube();
    const name = typeof YOUTUBE_PLAYLIST_NAME !== 'undefined'
      ? YOUTUBE_PLAYLIST_NAME
      : 'estrelo';
    const empty = !!skippedLocal;

    try {
      const p = YoutubeMusic.play();
      if (p && typeof p.catch === 'function') {
        p.catch((err) =>
          this._youtubeFailed(
            err && err.message ? err.message : 'Não foi possível carregar o YouTube.'
          )
        );
      }
    } catch (err) {
      this._youtubeFailed(
        err && err.message ? err.message : 'Não foi possível carregar o YouTube.'
      );
    }

    return {
      mode: 'youtube',
      label: 'YouTube: ' + name,
      empty,
      message: empty ? 'Playlist local vazia: adicione faixas em assets/music/' : null,
    };
  }

  _youtubeFailed(message) {
    if (this.musicMode !== 'youtube') return;
    this._stopYoutube();
    this.musicMode = 'synth';
    this.playlistActive = false;
    if (this.enabled && this.inGame) this.startMusic();
    this._notifyError(
      (message || 'Falha no player do YouTube.') + ' Voltando à trilha original.'
    );
  }

  _youtubeClosed() {
    if (this.musicMode !== 'youtube') {
      this._stopYoutube();
      return;
    }
    this._stopYoutube();
    this.musicMode = 'synth';
    this.playlistActive = false;
    if (this.enabled && this.inGame) this.startMusic();
    if (typeof this.onMusicModeChange === 'function') {
      this.onMusicModeChange({ mode: 'synth', label: 'Trilha original' });
    }
  }

  cycleMusicMode() {
    if (this.musicMode === 'local') return this._enterYoutube(false);
    if (this.musicMode === 'youtube') return this._enterSynth();
    // synth: pula a playlist local quando vazia
    if (this.getPlaylist().length) return this._enterLocal();
    return this._enterYoutube(true);
  }

  pauseMusic() {
    if (this.musicMode === 'local') return this.pausePlaylist();
    if (this.musicMode === 'youtube' && typeof YoutubeMusic !== 'undefined') {
      return YoutubeMusic.pause();
    }
    return false;
  }

  resumeMusic() {
    if (this.musicMode === 'local') return this.resumePlaylist();
    if (this.musicMode === 'youtube' && typeof YoutubeMusic !== 'undefined') {
      return YoutubeMusic.resume();
    }
    return false;
  }

  tone(freq, dur, type = 'square', vol = 0.18, slideTo = null, delay = 0) {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  noise(dur, vol = 0.15, filterFreq = 1200, delay = 0) {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.ctx.currentTime + delay;
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, t0);
    filter.frequency.exponentialRampToValueAtTime(200, t0 + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t0);
    src.stop(t0 + dur);
  }

  footstep() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (now - this.lastFoot < 0.24) return;
    this.lastFoot = now;
    this.noise(0.05, 0.045, 700);
  }

  sfx(name) {
    if (!this.ctx || !this.enabled) return;
    switch (name) {
      case 'pickup':
        this.tone(660, 0.07, 'square', 0.15);
        this.tone(990, 0.1, 'square', 0.12, null, 0.06);
        break;
      case 'heart':
        this.tone(523, 0.1, 'triangle', 0.2);
        this.tone(784, 0.16, 'triangle', 0.18, null, 0.08);
        break;
      case 'drop':
        this.tone(240, 0.08, 'square', 0.1, 150);
        break;
      case 'swing':
        this.noise(0.14, 0.2, 3200);
        this.tone(900, 0.08, 'sawtooth', 0.06, 300);
        break;
      case 'hit':
        this.noise(0.12, 0.3, 900);
        this.tone(140, 0.16, 'square', 0.22, 60);
        break;
      case 'hitDragon':
        this.noise(0.09, 0.24, 1800);
        this.tone(220, 0.14, 'square', 0.2, 90);
        this.tone(660, 0.06, 'triangle', 0.09, 330);
        break;
      case 'heavy':
        this.noise(0.22, 0.24, 1600);
        this.tone(300, 0.2, 'sawtooth', 0.14, 110);
        this.tone(120, 0.28, 'square', 0.14, 50, 0.03);
        break;
      case 'roar':
        this.tone(150, 0.45, 'sawtooth', 0.2, 60);
        this.noise(0.4, 0.16, 600);
        break;
      case 'breath':
        this.noise(0.5, 0.22, 1100);
        this.tone(90, 0.4, 'sawtooth', 0.1, 45, 0.04);
        break;
      case 'bite':
        this.noise(0.1, 0.26, 2200);
        this.tone(180, 0.08, 'square', 0.14, 80);
        break;
      case 'tell':
        this.tone(880, 0.06, 'triangle', 0.1, 1320);
        break;
      case 'dragon':
        this.tone(180, 0.5, 'sawtooth', 0.22, 55);
        this.noise(0.4, 0.2, 500);
        this.tone(90, 0.6, 'square', 0.15, 40, 0.05);
        break;
      case 'hurt':
        this.tone(420, 0.25, 'square', 0.2, 90);
        this.noise(0.2, 0.18, 800);
        break;
      case 'guard':
        // impacto abafado contra a guarda
        this.noise(0.12, 0.16, 620);
        this.tone(170, 0.12, 'square', 0.13, 95);
        this.tone(90, 0.16, 'triangle', 0.1, 60, 0.02);
        break;
      case 'parry':
        // metal agudo + brilho
        this.tone(1568, 0.08, 'triangle', 0.15);
        this.tone(2093, 0.14, 'triangle', 0.11, null, 0.03);
        this.noise(0.08, 0.1, 4200);
        this.tone(784, 0.18, 'sawtooth', 0.06, 1400, 0.02);
        break;
      case 'roll':
        // whoosh curto
        this.noise(0.16, 0.13, 1500);
        this.tone(300, 0.1, 'sawtooth', 0.05, 120);
        break;
      case 'lito':
        // melodia original de homenagem (8 notas, sem material protegido)
        this.tone(392, 0.14, 'triangle', 0.14);
        this.tone(494, 0.14, 'triangle', 0.13, null, 0.14);
        this.tone(587, 0.14, 'triangle', 0.13, null, 0.28);
        this.tone(659, 0.18, 'triangle', 0.14, null, 0.42);
        this.tone(587, 0.12, 'triangle', 0.11, null, 0.62);
        this.tone(494, 0.12, 'triangle', 0.1, null, 0.76);
        this.tone(440, 0.14, 'triangle', 0.1, null, 0.9);
        this.tone(392, 0.22, 'triangle', 0.12, null, 1.05);
        break;
      case 'marx':
        // sino grave e acolhedor
        this.tone(196, 0.75, 'triangle', 0.2);
        this.tone(147, 0.9, 'sine', 0.16, null, 0.04);
        this.tone(98, 1.1, 'triangle', 0.13, null, 0.08);
        break;
      case 'senna':
        // motor subindo + whoosh de volta rápida
        this.noise(0.2, 0.16, 2400);
        this.tone(110, 0.3, 'sawtooth', 0.12, 280);
        this.tone(280, 0.2, 'square', 0.07, 420, 0.08);
        break;
      case 'trotsky':
        // gongo grave e solene
        this.tone(98, 1.1, 'sine', 0.2);
        this.tone(147, 0.8, 'triangle', 0.12, null, 0.03);
        this.tone(65, 1.4, 'sine', 0.14, null, 0.06);
        break;
      case 'star':
        // arpejo cristalino original (sem melodia de jogo)
        [1047, 1319, 1568, 2093].forEach((f, i) =>
          this.tone(f, 0.16, 'sine', 0.1, null, i * 0.085)
        );
        break;
      case 'terminal':
        // bipe digital curto
        this.tone(1320, 0.05, 'square', 0.1);
        this.tone(880, 0.05, 'square', 0.09, null, 0.07);
        this.tone(1760, 0.09, 'square', 0.07, null, 0.15);
        break;
      case 'verity':
        // duas notas brincalhonas
        this.tone(740, 0.09, 'triangle', 0.14);
        this.tone(988, 0.13, 'triangle', 0.12, null, 0.09);
        break;
      case 'live':
        // pop de notificação
        this.tone(880, 0.06, 'sine', 0.16, 1320);
        this.tone(1320, 0.1, 'sine', 0.12, null, 0.06);
        break;
      case 'coin':
        // moeda curta
        this.tone(1319, 0.05, 'square', 0.12);
        this.tone(1760, 0.12, 'square', 0.1, null, 0.05);
        break;
      case 'unlock':
        this.tone(523, 0.12, 'square', 0.16);
        this.tone(659, 0.12, 'square', 0.16, null, 0.1);
        this.tone(784, 0.22, 'square', 0.18, null, 0.2);
        break;
      case 'gate':
        this.noise(0.5, 0.18, 500);
        this.tone(120, 0.5, 'sawtooth', 0.14, 70);
        break;
      case 'bat':
        this.noise(0.09, 0.12, 2600);
        this.tone(1200, 0.05, 'triangle', 0.05, 800);
        break;
      case 'fire':
        this.noise(0.28, 0.16, 1400);
        break;
      case 'light':
        this.tone(392, 0.14, 'triangle', 0.18);
        this.tone(587, 0.14, 'triangle', 0.16, null, 0.1);
        this.tone(880, 0.3, 'triangle', 0.14, null, 0.2);
        break;
      case 'win':
        [523, 659, 784, 1047, 1319].forEach((f, i) =>
          this.tone(f, 0.3, 'square', 0.16, null, i * 0.13)
        );
        break;
      case 'lose':
        [392, 330, 262, 196].forEach((f, i) =>
          this.tone(f, 0.34, 'square', 0.16, null, i * 0.17)
        );
        break;
      case 'click':
        this.tone(880, 0.04, 'square', 0.08);
        break;
      case 'toast':
        this.tone(1046, 0.05, 'square', 0.06);
        break;
      case 'hiss':
        // ovo rompendo: ruído curto + sweep grave
        this.noise(0.35, 0.16, 1400);
        this.tone(180, 0.4, 'sawtooth', 0.1, 55);
        break;
      case 'batman':
        // whoosh grave de sinal no céu
        this.noise(0.5, 0.12, 900);
        this.tone(110, 0.55, 'sawtooth', 0.08, 55);
        break;
      case 'arc':
        // reator carregando: seno subindo + ruído elétrico
        this.tone(220, 0.35, 'sine', 0.14, 880);
        this.noise(0.3, 0.08, 2600);
        break;
      case 'web':
        // fio puxando: ruído subindo rápido
        this.noise(0.18, 0.1, 3800);
        this.tone(420, 0.14, 'triangle', 0.07, 1200);
        break;
      case 'myers':
        // drone grave com queda
        this.tone(75, 1.1, 'sawtooth', 0.14, 40);
        this.tone(112, 0.8, 'sine', 0.08, 58, 0.05);
        break;
      case 'ring':
        // dois bipes curtos de telefone
        this.tone(880, 0.09, 'square', 0.09);
        this.tone(880, 0.09, 'square', 0.09, null, 0.13);
        break;
      case 'phone':
        // clique ao atender
        this.tone(520, 0.04, 'square', 0.08);
        this.tone(360, 0.05, 'square', 0.06, null, 0.05);
        break;
      case 'konami':
        // arpejo ascendente de recompensa
        [523, 659, 784, 1047, 1319].forEach((f, i) =>
          this.tone(f, 0.14, 'triangle', 0.12, null, i * 0.07)
        );
        break;
      case 'bounce':
        // blip curto de bloco
        this.tone(740, 0.06, 'square', 0.12, 990);
        break;
      case 'crt':
        // TV CRT ligando: estalo seco + chiado de alta frequência
        this.tone(1400, 0.04, 'square', 0.09, 600);
        this.noise(0.18, 0.1, 3600);
        this.tone(90, 0.22, 'sawtooth', 0.06, 160, 0.02);
        break;
      case 'adv_win':
        // fanfarra curta 8-bit original (arpejo ascendente + acorde final)
        [523, 659, 784, 1047].forEach((f, i) => {
          this.tone(f, 0.12, 'square', 0.13, null, i * 0.1);
        });
        this.tone(1319, 0.3, 'square', 0.1, null, 0.42);
        break;
      case 'joker_laugh': {
        // risada sintética original, abafada e "de fundo": 4 "ha" descendentes
        // em quadrado/serra alternados com lowpass, leve ruído no ataque
        if (!this.ctx) break;
        const ha = [392, 370, 349, 330];
        ha.forEach((f, i) => {
          const delay = i * 0.22;
          const t0 = this.ctx.currentTime + delay;
          const osc = this.ctx.createOscillator();
          osc.type = i % 2 ? 'sawtooth' : 'square';
          osc.frequency.setValueAtTime(f + 26, t0);
          osc.frequency.exponentialRampToValueAtTime(f, t0 + 0.015); // sweep curto de 0.015s
          osc.frequency.exponentialRampToValueAtTime(f - 28, t0 + 0.15); // queda do "ha"
          const lp = this.ctx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.setValueAtTime(720, t0); // abafada, meio distante
          const g = this.ctx.createGain();
          g.gain.setValueAtTime(0.0001, t0);
          g.gain.exponentialRampToValueAtTime(0.075, t0 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
          osc.connect(lp);
          lp.connect(g);
          g.connect(this.master);
          osc.start(t0);
          osc.stop(t0 + 0.18);
          this.noise(0.045, 0.035, 750, delay); // ruído leve no ataque do "ha"
        });
        break;
      }
      case 'rb_oof': {
        // "oof" sintético original: grunhido descendente (quadrado + lowpass) + thump grave no fim
        if (!this.ctx) break;
        const t0 = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(240, t0);
        osc.frequency.exponentialRampToValueAtTime(150, t0 + 0.12);
        osc.frequency.exponentialRampToValueAtTime(95, t0 + 0.26);
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(800, t0);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.2, t0 + 0.018);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
        osc.connect(lp);
        lp.connect(g);
        g.connect(this.master);
        osc.start(t0);
        osc.stop(t0 + 0.3);
        this.tone(64, 0.14, 'sine', 0.24, 40, 0.22); // thump grave no fim
        this.noise(0.08, 0.1, 420, 0.22); // corpo do thump
        break;
      }
      case 'rb_blip':
        // chime de spawn/join original: duas notas ascendentes rápidas (triângulo) com leve eco
        this.tone(523, 0.09, 'triangle', 0.16);
        this.tone(784, 0.09, 'triangle', 0.16, null, 0.09);
        this.tone(523, 0.07, 'triangle', 0.055, null, 0.22); // eco
        this.tone(784, 0.12, 'triangle', 0.06, null, 0.31); // eco
        break;
      case 'web_thwip': {
        // "thwip" sintético original da teia: varredura ascendente (serra curta + ruído branco),
        // cutoff abrupto no release
        if (!this.ctx) break;
        const t0 = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, t0);
        osc.frequency.exponentialRampToValueAtTime(900, t0 + 0.09);
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(2600, t0);
        lp.frequency.setValueAtTime(2600, t0 + 0.075);
        lp.frequency.exponentialRampToValueAtTime(110, t0 + 0.095); // cutoff abrupto no release
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.16, t0);
        g.gain.setValueAtTime(0.16, t0 + 0.07);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.11);
        osc.connect(lp);
        lp.connect(g);
        g.connect(this.master);
        osc.start(t0);
        osc.stop(t0 + 0.12);
        this.noise(0.08, 0.12, 3200); // ruído branco do "thwip"
        break;
      }
      default:
        break;
    }
  }

  /* Ambiente: arpejo lento e sombrio em pentatônica menor */
  startMusic() {
    if (this.playlistActive || this.musicMode !== 'synth') return; // só um modo por vez
    if (!this.ctx || this.musicTimer) return;
    const scale = [130.81, 155.56, 196.0, 233.08, 261.63, 311.13, 392.0];
    this.musicTimer = setInterval(() => {
      if (!this.ctx || !this.enabled) return;
      const t = this.ctx.currentTime;
      const n = scale[(this.musicStep * 3 + (this.musicStep % 3)) % scale.length];
      const g = this.ctx.createGain();
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = n;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      osc.connect(g);
      g.connect(this.musicGain);
      osc.start(t);
      osc.stop(t + 2.5);
      if (this.musicStep % 4 === 0) {
        const osc2 = this.ctx.createOscillator();
        const g2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.value = n / 2;
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.4, t + 0.6);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
        osc2.connect(g2);
        g2.connect(this.musicGain);
        osc2.start(t);
        osc2.stop(t + 3.5);
      }
      this.musicStep++;
    }, 1500);
  }
}

const Sound = new GameAudio();
