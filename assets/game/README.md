# ROM do Adventure (Atari 2600) — NÃO incluída

Esta pasta é servida junto com o jogo, mas **a ROM do _Adventure_ (Atari 2600,
NTSC, ~4 KB) não é e não pode ser distribuída neste repositório** por direitos
autorais.

O jogo carrega a ROM de dois jeitos, nesta ordem:

1. **Automático:** se você colocar **a sua** cópia legalizada do arquivo
   `adventure.bin` (Atari 2600, NTSC) nesta pasta, o jogo baixa via
   `assets/game/adventure.bin` assim que você interage com a TV e sobe o
   emulador direto.
2. **Seletor de arquivo:** se o arquivo não existir (ou o jogo estiver aberto
   via `file://`, ou o navegador bloquear o acesso), a TV mostra um seletor e
   você escolhe o `adventure.bin` no seu computador. Funciona até em
   `file://` — a ROM nunca sobe para servidor nenhum, fica no navegador.

## Como obter uma cópia legal

- Dumps de cartuchos que **você possui fisicamente** (backup pessoal).
- Compre/jogue através de serviços oficiais que distribuam o título.
- Não distribua o `.bin`: está no `.gitignore` de propósito (`assets/game/*.bin`,
  `*.a26`, `*.rom`, `*.zip`). Este `README.md` é a única coisa versionada aqui.

## O que o jogo usa

- Emulador: [EmulatorJS](https://emulatorjs.com/) (core **Stella**,
  `atari2600`), carregado de CDN (`https://www.emulatorjs.com/loader.js`), por
  isso **é preciso internet na primeira vez** (depois o navegador pode cachear).
- Sem ROM, a TV oferece a **recriação in-canvas** do minigame Adventure —
  original, em pixel art própria, sem nenhum asset oficial.
- A recompensa por "Achar o nome de Robinett" (+1 coração máximo, uma vez por
  jornada) é a mesma nos dois modos.
