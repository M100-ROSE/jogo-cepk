'use strict';

/* =========================================================================
   Player do YouTube — modo "YouTube" da trilha secreta 0717

   Para trocar a playlist, altere o ID abaixo (o trecho depois de `list=`)
   e o nome exibido no mini-player.
   A playlist precisa ser pública e permitir embed.
   ========================================================================= */

const YOUTUBE_PLAYLIST_ID = 'PLXT54x4WKF0g';
const YOUTUBE_PLAYLIST_NAME = 'estrelo';

const YoutubeMusic = {
  player: null,
  active: false,
  muted: false,
  onError: null,
  onClose: null,
  onAutoplayBlocked: null,

  _apiPromise: null,
  _container: null,
  _playerHost: null,
  _readyTimer: null,
  _autoplayTimer: null,

  /* Carrega a IFrame Player API uma única vez, em runtime. Sem script fixo
     no index.html para o jogo continuar abrindo offline. */
  ensureLoaded() {
    if (this._apiPromise) return this._apiPromise;

    this._apiPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        reject(new Error('YouTube indisponível neste ambiente.'));
        return;
      }
      if (window.YT && typeof window.YT.Player === 'function') {
        resolve(window.YT);
        return;
      }

      let settled = false;
      let timer = null;

      const done = () => {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        if (window.YT && typeof window.YT.Player === 'function') resolve(window.YT);
        else reject(new Error('A API do YouTube não inicializou.'));
      };
      const fail = () => {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        reject(new Error('Não foi possível carregar o YouTube (offline?)'));
      };

      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previous === 'function') previous();
        done();
      };

      timer = setTimeout(fail, 6000);

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = fail;
      document.head.appendChild(script);
    }).catch((err) => {
      this._apiPromise = null; // permite tentar de novo numa próxima ativação
      throw err;
    });

    return this._apiPromise;
  },

  _ensureContainer() {
    if (this._container && this._container.parentNode) return;

    const box = document.createElement('div');
    box.id = 'yt-music';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Player do YouTube — ' + YOUTUBE_PLAYLIST_NAME);

    const head = document.createElement('div');
    head.className = 'yt-music__head';

    const title = document.createElement('span');
    title.className = 'yt-music__title';
    title.textContent = YOUTUBE_PLAYLIST_NAME;

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'yt-music__close';
    close.setAttribute('aria-label', 'Fechar player do YouTube');
    close.title = 'Fechar e voltar à trilha original';
    close.textContent = '✕';
    close.addEventListener('click', () => this._handleClose());

    head.appendChild(title);
    head.appendChild(close);

    const host = document.createElement('div');
    host.className = 'yt-music__player';
    host.id = 'yt-music-player';

    box.appendChild(head);
    box.appendChild(host);
    document.body.appendChild(box);

    this._container = box;
    this._playerHost = host;
  },

  _clearTimers() {
    if (this._readyTimer) {
      clearTimeout(this._readyTimer);
      this._readyTimer = null;
    }
    if (this._autoplayTimer) {
      clearTimeout(this._autoplayTimer);
      this._autoplayTimer = null;
    }
  },

  _armAutoplayCheck() {
    if (this._autoplayTimer) clearTimeout(this._autoplayTimer);
    this._autoplayTimer = setTimeout(() => {
      this._autoplayTimer = null;
      if (!this.active || !this.player) return;
      let state = -1;
      try {
        state = this.player.getPlayerState();
      } catch (e) {
        return;
      }
      // 1 = tocando, 3 = carregando. Qualquer outra coisa sugere bloqueio.
      if (state !== 1 && state !== 3 && typeof this.onAutoplayBlocked === 'function') {
        this.onAutoplayBlocked();
      }
    }, 2500);
  },

  _errorMessage(code) {
    switch (code) {
      case 2:
        return 'A playlist do YouTube é inválida.';
      case 5:
        return 'O navegador não conseguiu reproduzir o player do YouTube.';
      case 100:
        return 'A playlist do YouTube é privada ou foi removida.';
      case 101:
      case 150:
        return 'O dono da playlist bloqueou a reprodução em embed.';
      default:
        return 'Não foi possível tocar o YouTube.';
    }
  },

  _fail(message) {
    if (!this.active) return;
    this.stop();
    if (typeof this.onError === 'function') this.onError(message);
  },

  _handleClose() {
    if (!this.active && !this.player) return;
    this.stop();
    if (typeof this.onClose === 'function') this.onClose();
  },

  play() {
    // Mostra o container de imediato; o iframe entra quando a API responder.
    this._ensureContainer();
    this.active = true;
    this._clearTimers();

    return this.ensureLoaded().then((YT) => {
      if (!this.active) return; // fecharam/trocaram de modo enquanto carregava

      if (this.player && typeof this.player.loadPlaylist === 'function') {
        this.player.loadPlaylist({
          list: YOUTUBE_PLAYLIST_ID,
          listType: 'playlist',
          index: 0,
          startSeconds: 0,
        });
        this.player.playVideo();
        this._armAutoplayCheck();
        return;
      }

      this._readyTimer = setTimeout(() => {
        this._readyTimer = null;
        if (this.active) this._fail('O player do YouTube demorou para responder.');
      }, 6000);

      this.player = new YT.Player(this._playerHost, {
        width: '100%',
        height: '100%',
        playerVars: {
          listType: 'playlist',
          list: YOUTUBE_PLAYLIST_ID,
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (this._readyTimer) {
              clearTimeout(this._readyTimer);
              this._readyTimer = null;
            }
            if (!this.active || !this.player) return;
            try {
              this.player.setVolume(40);
              if (this.muted) this.player.mute();
              else this.player.unMute();
              this.player.playVideo();
            } catch (e) {
              /* player destruído no meio do caminho */
            }
            this._armAutoplayCheck();
          },
          onStateChange: (event) => {
            const playing = typeof YT !== 'undefined' && YT.PlayerState
              ? YT.PlayerState.PLAYING
              : 1;
            if (event && event.data === playing && this._autoplayTimer) {
              clearTimeout(this._autoplayTimer);
              this._autoplayTimer = null;
            }
          },
          onError: (event) => {
            this._fail(this._errorMessage(event && event.data));
          },
        },
      });
    }).catch((err) => {
      const message = err && err.message ? err.message : 'Não foi possível carregar o YouTube.';
      this._fail(message);
      throw err;
    });
  },

  pause() {
    if (!this.active) return false;
    if (this._autoplayTimer) {
      clearTimeout(this._autoplayTimer);
      this._autoplayTimer = null;
    }
    try {
      if (this.player && this.player.pauseVideo) this.player.pauseVideo();
    } catch (e) {
      /* ignora */
    }
    return true;
  },

  resume() {
    if (!this.active) return false;
    try {
      if (this.player && this.player.playVideo) {
        this.player.playVideo();
        this._armAutoplayCheck();
        return true;
      }
    } catch (e) {
      /* ignora */
    }
    return false;
  },

  setMuted(muted) {
    this.muted = !!muted;
    if (!this.player) return;
    try {
      if (this.muted) this.player.mute();
      else {
        this.player.unMute();
        this.player.setVolume(40);
      }
    } catch (e) {
      /* player ainda não está pronto */
    }
  },

  stop() {
    this.active = false;
    this._clearTimers();

    const p = this.player;
    this.player = null;
    if (p) {
      try {
        if (p.stopVideo) p.stopVideo();
      } catch (e) {
        /* ignora */
      }
      try {
        if (p.destroy) p.destroy();
      } catch (e) {
        /* ignora */
      }
    }

    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._container = null;
    this._playerHost = null;
  },
};
