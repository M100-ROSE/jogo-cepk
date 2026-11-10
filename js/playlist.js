'use strict';

/* =========================================================================
   Playlist opcional — trilha alternativa ativada pelo código secreto 0717

   Como adicionar faixas:
   1. Crie a pasta `assets/music/` na raiz do projeto.
   2. Copie para ela seus arquivos locais `.mp3` ou `.ogg`.
   3. Preencha a lista abaixo no formato { title, artist, src }.
      O `src` é relativo ao index.html, por exemplo:
        'assets/music/tema-covil.mp3'

   Exemplos de molde (deixe comentado até ter os arquivos de verdade):
     { title: 'Tema do Covil', artist: 'Banda Local', src: 'assets/music/tema-covil.mp3' },
     { title: 'Noite no Castelo', artist: 'Banda Local', src: 'assets/music/noite-castelo.ogg' },

   Observação: a playlist é LOCAL. Links de Spotify/YouTube não tocam dentro
   do jogo; é preciso ter o arquivo de áudio na pasta do projeto.
   ========================================================================= */

const PLAYLIST = [
  // { title: 'Tema do Covil', artist: 'Banda Local', src: 'assets/music/tema-covil.mp3' },
  // { title: 'Noite no Castelo', artist: 'Banda Local', src: 'assets/music/noite-castelo.ogg' },
];
