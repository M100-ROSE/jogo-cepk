# ROM do Adventure (Atari 2600) — NÃO incluída

Esta pasta é servida junto com o jogo, mas **a ROM do _Adventure_ (Atari 2600,
NTSC, ~4 KB) não é e não pode ser distribuída neste repositório** por direitos
autorais (Atari, 1978/1980). O jogador precisa ter a própria cópia; nenhum
arquivo de ROM entra no git.

## Nomes reconhecidos automaticamente

O jogo tenta carregar a ROM sozinho, nesta ordem:

1. `assets/game/adventure.bin`
2. `assets/game/adventure.a26`
3. `assets/game/adventure.rom`
4. `assets/game/Adventure (1978) (Atari).zip`

O primeiro nome que responder com sucesso vira a URL de boot da TV. Se você
colocar **a sua** cópia legalizada com um desses nomes nesta pasta, a TV sobe
o emulador direto assim que você interage com ela.

**Nota sobre o `.zip`:** `EJS_gameUrl` aponta para a própria URL do zip e o
EmulatorJS tenta extrair a ROM de dentro dele. Se a extração falhar (por
formato inesperado, zip corrompido etc.), o emulador não sobe — nesse caso,
use o seletor de arquivo descrito abaixo e escolha o `.bin`/`.a26`/`.rom`
direto no seu computador.

## Seletor de arquivo (fallback)

Se **nenhum** dos nomes acima existir (ou o jogo estiver aberto via `file://`,
ou o navegador bloquear o acesso), a TV mostra um seletor e você escolhe o
arquivo da ROM no seu computador. Funciona até em `file://` — a ROM nunca sobe
para servidor nenhum, fica no navegador.

## Como obter uma cópia legal

- Dumps de cartuchos que **você possui fisicamente** (backup pessoal).
- Compre/jogue através de serviços oficiais que distribuam o título.
- Não distribua a ROM: está no `.gitignore` de propósito (`assets/game/*.bin`,
  `*.a26`, `*.rom`, `*.zip`). Este `README.md` é a única coisa versionada aqui.

## O que o jogo usa

- Emulador: [EmulatorJS](https://emulatorjs.com/) (core **Stella**,
  `atari2600`), carregado de CDN (`https://www.emulatorjs.com/loader.js`), por
  isso **é preciso internet na primeira vez** (depois o navegador pode cachear).
- Sem ROM, a TV oferece a **recriação in-canvas** do minigame Adventure —
  original, em pixel art própria, sem nenhum asset oficial.
- A recompensa por "Achar o nome de Robinett" (+1 coração máximo, uma vez por
  jornada) é a mesma nos dois modos.
