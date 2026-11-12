'use strict';

/* =========================================================================
   TV do Castelo de Gelo: emulador real de Atari 2600 (Adventure) via
   EmulatorJS (core 'atari2600', Stella) ou a recriação in-canvas.

   A ROM NÃO vem no repositório (direitos autorais). O usuário coloca a
   própria cópia em assets/game/ (NTSC, ~4 KB) com um dos nomes reconhecidos
   (adventure.bin, adventure.a26, adventure.rom ou "Adventure (1978) (Atari).zip")
   ou seleciona o arquivo local — o último caso funciona até em file://.

   window.AtariTV = { open(cb?), close(), found() }
   - open(cb?): abre o overlay da TV. cb (opcional) é chamado após o close().
   - close(): fecha o overlay, revoga blob URLs e esvazia o player.
   - found(): botão "ACHEI!" (+1 coração máximo, 1× por jornada).
   ========================================================================= */

(function () {
  var overlay = document.getElementById('atari-overlay');
  var chooser = document.getElementById('atari-chooser');
  var playing = document.getElementById('atari-playing');
  var playerFrame = document.getElementById('atari-player-frame');
  var statusEl = document.getElementById('atari-status');
  var fileInput = document.getElementById('atari-file');
  var closeBtn = document.getElementById('atari-close');
  var pickBtn = document.getElementById('atari-pick');
  var recreationBtn = document.getElementById('atari-recreation');
  var foundBtn = document.getElementById('atari-found');
  var exitBtn = document.getElementById('atari-exit');

  // loader.js do EmulatorJS é adicionado no máximo uma vez por vez
  // (removido no close para permitir reabrir numa sessão limpa).
  var loaderScript = null;
  var blobUrl = null; // URL de objeto a revogar no close()
  var closeCallback = null;

  function currentSt() {
    try {
      if (typeof gameState !== 'undefined' && gameState) return gameState;
    } catch (e) {
      /* game.js ainda não inicializou */
    }
    return null;
  }

  function hasSound() {
    try {
      return typeof Sound !== 'undefined' && Sound;
    } catch (e) {
      return false;
    }
  }

  function gameToast(st, text, dur) {
    try {
      if (typeof toast === 'function') {
        toast(st, text, dur || 2.4);
        return;
      }
    } catch (e) {
      /* sem toast: segue sem quebrar */
    }
  }

  /* Desabilita/reabilita o botão de recompensa conforme st.easter.rpoKey. */
  function syncFoundButton(st) {
    if (!foundBtn) return;
    var awarded = !!(st && st.easter && st.easter.rpoKey);
    foundBtn.disabled = awarded;
    foundBtn.style.opacity = awarded ? '0.55' : '1';
    foundBtn.style.cursor = awarded ? 'default' : 'pointer';
  }

  function showChooser(message) {
    if (chooser) chooser.style.display = 'block';
    if (playing) playing.style.display = 'none';
    if (statusEl) statusEl.textContent = message || '\u00a0';
  }

  function setOverlayVisible(visible) {
    if (!overlay) return;
    overlay.style.display = visible ? 'flex' : 'none';
    overlay.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }

  /* Cria um #atari-game limpo dentro de #atari-player-frame (recria sempre)
     e aponta o EmulatorJS para ele. O loader.js é incluído só uma vez. */
  function boot(url) {
    if (chooser) chooser.style.display = 'none';
    if (playing) playing.style.display = 'block';

    if (playerFrame) {
      playerFrame.replaceChildren();
      var gb = document.createElement('div');
      gb.id = 'atari-game';
      gb.style.width = '100%';
      gb.style.height = '100%';
      playerFrame.appendChild(gb);
    }

    window.EJS_player = '#atari-game';
    window.EJS_core = 'atari2600';
    window.EJS_gameUrl = url;
    window.EJS_pathtodata = 'https://www.emulatorjs.com/data/';

    if (!loaderScript) {
      loaderScript = document.createElement('script');
      loaderScript.src = 'https://www.emulatorjs.com/loader.js';
      document.body.appendChild(loaderScript);
    }

    // O canvas do emulador é criado de forma assíncrona; tenta focar nele.
    var tries = 0;
    var focusTimer = setInterval(function () {
      tries += 1;
      var canvas = document.querySelector('#atari-game canvas');
      if (canvas) {
        try {
          canvas.setAttribute('tabindex', '0');
          canvas.focus();
        } catch (e) {
          /* sem foco, sem problema */
        }
        clearInterval(focusTimer);
      } else if (tries >= 40) {
        clearInterval(focusTimer);
      }
    }, 250);

    syncFoundButton(currentSt());
  }

  function open(cb) {
    var st = currentSt();
    if (!st) return;
    if (st.tvOpen) return; // já aberta: não faz nada

    closeCallback = typeof cb === 'function' ? cb : null;
    st.tvOpen = true;

    if (hasSound()) Sound.pauseMusic();
    setOverlayVisible(true);
    showChooser('Verificando a ROM local…');
    syncFoundButton(st);

    // Tenta os nomes reconhecidos, em ordem. O primeiro que responder ok
    // vira a URL de boot (o .zip vai direto para o EJS_gameUrl: o EmulatorJS
    // tenta extrair; se falhar, o usuário usa o seletor de arquivo).
    // Se NENHUM responder ok (404, file://, offline), cai no seletor.
    var candidates = [
      'assets/game/adventure.bin',
      'assets/game/adventure.a26',
      'assets/game/adventure.rom',
      'assets/game/Adventure (1978) (Atari).zip'
    ];
    var warn =
      'Coloque a sua cópia em assets/game/adventure.bin, .a26, .rom ou "Adventure (1978) (Atari).zip" — ou selecione o arquivo (funciona até em file://)';
    function probe(i) {
      if (i >= candidates.length) {
        showChooser(warn);
        return;
      }
      var romUrl = candidates[i];
      try {
        fetch(romUrl, { method: 'HEAD' })
          .then(function (res) {
            if (res && res.ok) boot(romUrl);
            else probe(i + 1);
          })
          .catch(function () {
            probe(i + 1);
          });
      } catch (e) {
        probe(i + 1);
      }
    }
    probe(0);
  }

  function close() {
    var st = currentSt();
    if (st) st.tvOpen = false;

    setOverlayVisible(false);

    if (blobUrl) {
      try {
        URL.revokeObjectURL(blobUrl);
      } catch (e) {
        /* ignorar */
      }
      blobUrl = null;
    }

    var gb = document.getElementById('atari-game');
    if (gb) gb.replaceChildren();

    // Remove o loader para que reabrir a TV numa mesma sessão carregue de novo.
    if (loaderScript) {
      loaderScript.remove();
      loaderScript = null;
    }

    if (hasSound()) {
      Sound.resumeMusic();
      Sound.sfx('click');
    }

    var cb = closeCallback;
    closeCallback = null;
    if (cb) {
      try {
        cb();
      } catch (e) {
        /* callback de quem abriu não pode derrubar o jogo */
      }
    }
  }

  /* Mesma recompensa do minigame Adventure: +1 coração máximo, 1× por jornada.
     Funciona mesmo que o minigame nunca tenha rodado (não depende de st.adv). */
  function found() {
    var st = currentSt();
    if (!st || !st.easter) return;

    if (st.easter.rpoKey) {
      gameToast(st, 'Você já descobriu esse segredo nesta jornada!', 2.6);
      syncFoundButton(st);
      return;
    }

    st.easter.rpoKey = true;
    st.maxHearts += 1;
    st.hearts = Math.min(st.maxHearts, st.hearts + 1);
    if (hasSound()) Sound.sfx('adv_win');
    gameToast(st, 'VOCÊ DESCOBRIU UM SEGREDO DO ADVENTURE! +1 CORAÇÃO MÁXIMO', 4);
    try {
      if (typeof spawnParticles === 'function') {
        spawnParticles(st, st.player.x, st.player.y - 18, '#e6bb4f', 16, { speed: 34, life: 0.9 });
        spawnParticles(st, st.player.x, st.player.y - 18, '#ffe9a3', 8, { speed: 24, life: 0.7 });
      }
    } catch (e) {
      /* partículas são só enfeite */
    }
    syncFoundButton(st);
  }

  /* Recriação in-canvas: fecha a TV e abre o minigame Adventure. */
  function playRecreation() {
    var st = currentSt();
    close();
    try {
      if (typeof startAdventure === 'function' && st) startAdventure(st);
    } catch (e) {
      /* se a recriação falhar, o jogo apenas permanece na sala */
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (exitBtn) exitBtn.addEventListener('click', close);
  if (pickBtn && fileInput) {
    pickBtn.addEventListener('click', function () {
      fileInput.click();
    });
  }
  if (recreationBtn) recreationBtn.addEventListener('click', playRecreation);
  if (foundBtn) foundBtn.addEventListener('click', found);
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      if (blobUrl) {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch (e) {
          /* ignorar */
        }
      }
      blobUrl = URL.createObjectURL(file);
      boot(blobUrl);
      fileInput.value = ''; // permite escolher o mesmo arquivo de novo
    });
  }

  window.AtariTV = { open: open, close: close, found: found };
})();
