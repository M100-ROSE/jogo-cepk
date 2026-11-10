# Lobo Cinza — O Cálice de Ouro

Um jogo de aventura em HTML5 Canvas inspirado em **Adventure** (Atari 2600, 1980),
estrelado por um lobo cinza de uniforme escolar.

O objetivo é explorar o reino, encontrar a **chave dourada**, abrir o portão do
castelo, pegar a **espada**, derrotar o dragão e levar o **Cálice de Ouro** até o
altar do salão. Cuidado: o morcego rouba itens e os dragões não perdoam.

## Como jogar

Não precisa instalar nada. Basta abrir `index.html` no navegador (Chrome, Edge ou
Firefox). O jogo também funciona com controles de toque em celulares e tablets.

## Controles

| Ação | Teclas |
| --- | --- |
| Mover | Setas ou `W` `A` `S` `D` |
| Ação (golpe leve / pegar / usar / interagir) | `Espaço` |
| Golpe forte (espada) | `F` |
| Guarda / parry | `Shift` esquerdo ou direito (segurar) |
| Rolamento (dash) | `C` |
| Largar item | `Q` |
| Mapa | `M` |
| Ligar/desligar som | `N` |
| Pausar | `P` ou `Esc` |
| Começar / reiniciar | `Enter` |

No celular use o direcional na tela, `AÇÃO`, `GOLPE`, `DEF`, `Q` e `M`. O botão
`AÇÃO` faz o golpe leve e interage; `GOLPE` desfere o golpe forte; `DEF` segura
a guarda. Para rolar, dê **dois toques rápidos** (até 280 ms) na mesma direção
do direcional.

No título, as teclas `1`, `2` e `3` escolhem a dificuldade (fácil/médio/difícil)
imediatamente, sem precisar do `Enter`.

## Regras rápidas

- O lobo carrega **um item por vez**. Pise em um item para pegá-lo; use `Q` para
  largá-lo.
- Salas escuras exigem a **lanterna**.
- A **chave dourada** abre o portão do castelo.
- A **espada** é a única forma de ferir dragões e o morcego.
- Com a espada: `Espaço`/`AÇÃO` desfere um **golpe leve** (rápido, 1 de dano,
  recarga de 0,7s) e `F`/`GOLPE` um **golpe forte** (lento, 3 de dano, empurra o
  dragão, recarga de 3s). As recargas aparecem no HUD, à esquerda.
- Dragões comuns têm 2/3/4 de vida e o chefe 6/9/12, conforme a dificuldade
  (fácil/médio/difícil). A vida aparece acima do dragão depois do primeiro golpe.
- Dragões avisam antes de atacar: investida (risco/brilho), mordida, sopro em
  cone e rajada de bolas de fogo (o chefe sempre rajada; dragões comuns também
  atiram no difícil). Desvie do telegraph para não tomar dano.
- **Guarda/parry**: segure `Shift`/`DEF` para reduzir 75% do dano e do empurrão
  de golpes frontais (até ~100° do olhar); não é possível atacar enquanto
  defende. Golpes bloqueados custam 25% de um coração. Nos primeiros **0,25s**
  de guarda, um golpe frontal vira **parry**: o dano é anulado e o dragão fica
  atordoado por 1s. Levar dano derruba a guarda (solte e pressione de novo).
- **Rolamento**: `C`/duplo-toque move ~60px em 0,25s com i-frames próprios e
  recarga de 0,9s. Durante o rolamento o lobo não ataca, não defende e não troca
  de sala.
- O **coração** recupera uma vida (até o máximo da dificuldade: 3 no fácil, 2 no médio e no difícil).
- Coloque o **Cálice de Ouro** no altar do salão para vencer.
- O jogo termina se as vidas acabarem (3 no fácil, 2 no médio e no difícil). Seu melhor tempo fica salvo no navegador.

## Segredos

- Digite **`0717`** em qualquer tela (título ou durante o jogo) para ciclar a
  trilha sonora:
  1. **Trilha original** (sintetizada)
  2. **Playlist local** — só entra no ciclo se `PLAYLIST` tiver faixas
  3. **YouTube — estrelo**
  4. volta para a trilha original
- A playlist local é opcional. Sem faixas configuradas, o código pula esse modo
  e avisa que ela está vazia.
- **Salas secretas**: procure rachaduras suspeitas nas paredes e aproxime-se
  delas para abrir a passagem.
  - **Cemitério Antigo**, parede oeste → **Arquivo de Trótski**: tábua escura,
    faixa vermelha com estrela dourada, trem blindado, estantes, busto e papéis
    sobre a mesa.
  - **Abismo**, parede leste → **Fonte Sombria**: fonte de pedra escura com um
    coração brilhante, figura encapuzada e cristais roxos (homenagem original a
    Deltarune).
  - **Serra Rochosa**, parede leste → **Mina Esquecida**: blocos de terra,
    minério de diamante, bloco verde triste e uma bola amarela sorridente
    (homenagem original a Minecraft/Verity).
  - **Floresta Antiga**, parede norte → **Obby Perdido**: plataformas blocky,
    lava, bandeira de checkpoint e uma estátua amarela/azul/verde (homenagem
    original a Roblox).
  - **Cabana Abandonada**, parede norte → **Estúdio da Rbiana**: quarto gamer
    aconchegante com estante branca cheia de colecionáveis, cadeira gamer
    preta, gabinete com fans RGB, mesa com dois monitores (reacts e chat com
    contador “1,2K” e aba “FOFOCA”), microfone, webcam, ring light, LED roxo e
    um porta-retrato discreto do Tiago na estante.
  - **Fonte Esquecida**, parede leste → **Templo de Lito**: mármore grego,
    colunas, fonte de dois níveis e a melodia do rádio.
  - **Salão do Trono**, parede sul → **Biblioteca de Marx**: estantes, busto,
    mesa de estudo e um tapete vinho. A visita cura 1 coração por jornada.
  - **Sagrário**, parede sul → **Pódio de Senna**: pódio de três degraus,
    capacete e bandeiras quadriculadas. A homenagem dá um impulso de velocidade.
  - **Escadaria do Castelo**, parede leste → **Santuário de Richard**.
  - Cada passagem só existe depois de revelada e precisa ser redescoberta em
    cada partida.
- **Objetos escondidos** (aproxime-se e use AÇÃO/Espaço):
  - No **Labirinto Profundo**, uma pequena **estrela de determinação**
    (homenagem original a Undertale) recupera 1 coração, uma vez por jornada.
  - No **Castelo Principal**, um **terminal de combate vermelho** (homenagem
    original a Ultrakill) concede +1 de dano por 10s. Enquanto o efeito dura,
    um ícone de **fúria** aparece no HUD.
  - Na **Mina Esquecida**, a bola amarela **Verity** apenas sorri e solta
    partículas. O minério de diamante cura 1 coração, uma vez por jornada.
  - No **Arquivo de Trótski**, o busto aumenta o máximo de corações em 1, uma
    vez por jornada.
  - Na **Fonte Sombria**, o coração da fonte concede um **escudo** que bloqueia
    um golpe; o HUD mostra um coração roxo enquanto ele estiver ativo.
  - No **Obby Perdido**, a bandeira de checkpoint dá velocidade extra por 8s.
  - No **Estúdio da Rbiana**, a mesa de streaming inicia uma “live”: mensagem no
    toast, partículas e uma frase diferente a cada interação (reacts, fofocas e
    o chat da live).
- **Homenagens interativas** (aproxime-se e use AÇÃO/Espaço):
  - No Templo de Lito, a fonte de mármore guarda uma melodia original; ao lado,
    um rádio antigo com avião de papel lembra as duas paixões dele.
  - Na Biblioteca de Marx, o busto de pedra oferece um conselho e uma pequena
    ajuda.
  - No Pódio de Senna, o capacete amarelo lembra que velocidade também é
    coragem.
- Todas as salas acima são **interpretações originais em pixel art**: usam
  apenas formas, cores e nomes genéricos como referência. Não há sprites,
  logos, músicas ou frases protegidas copiadas de nenhum jogo ou marca.

### Estúdio da Rbiana (homenagem não oficial)

O quarto secreto **Estúdio da Rbiana** homenageia **Rbiana** (também chamada de
**Biana**), streamer e youtuber brasileira. A cena recria um quarto gamer
aconchegante: parede lavanda com fita de **LED roxa**, piso de madeira, uma
**estante branca** cheia de colecionáveis genéricos (bonequinhos, caixas,
pelúcias, plantas pequenas e livros), **cadeira gamer preta** de encosto alto,
**gabinete preto** com lateral de vidro e fans RGB, mesa com **dois monitores**
(um com grade de memes/reacts e outro com o chat, o contador **1,2K** e a aba
**FOFOCA**), microfone, teclado, mouse, caneca com “B”, webcam com LED vermelho,
**ring light** de luz quente e uma câmera de live em tripé com **REC**
piscando. Na estante, um porta-retrato pequeno com uma estrela lembra o
**Tiago** (referência à bio pública “mãe do Tiago”).

A homenagem se apoia apenas em **informações públicas**: o conteúdo de lives,
reacts, memes e fofocas, a categoria **“SÓ NA CONVERSA”** e a descrição
“streamer nas horas vagas”, além dos nomes “Biana” e “mãe do Tiago”. O jogo não
exibe links nem endereços de canal. Nada aqui reproduz avatar, foto, rosto,
voz, logo, thumbnail ou qualquer asset oficial: o quarto é uma **interpretação
original em pixel art**, feita com formas genéricas e cores próprias. É uma
homenagem **não oficial**, sem vínculo com a criadora.

### Playlist local (recomendada offline)

1. Crie a pasta `assets/music/` na raiz do projeto.
2. Copie para ela arquivos `.mp3` ou `.ogg` que você já tenha (não baixe nada
   pelo jogo).
3. Abra `js/playlist.js` e preencha a lista `PLAYLIST`:

```js
const PLAYLIST = [
  { title: 'Tema do Covil', artist: 'Banda Local', src: 'assets/music/tema-covil.mp3' },
  { title: 'Noite no Castelo', artist: 'Banda Local', src: 'assets/music/noite-castelo.ogg' },
];
```

O `src` é sempre relativo ao `index.html`. A playlist toca em sequência e volta
ao início no fim. Links de Spotify/YouTube **não** tocam no modo local: é
necessário ter o arquivo de áudio na pasta do projeto.

### Modo YouTube

O terceiro modo usa a IFrame Player API do YouTube para tocar a playlist
pública **estrelo** (`PLXT54x4WKF0g`) em um mini-player visível no canto
inferior direito. Esse modo **exige internet** e uma playlist pública que
permita embed. Para trocar a playlist, edite `YOUTUBE_PLAYLIST_ID` e
`YOUTUBE_PLAYLIST_NAME` em `js/youtube.js`.

O embed é controlado pelo YouTube e pode mostrar vídeo e anúncios conforme a
conta/origem. O modo local continua sendo o recomendado para jogar offline.
Feche o mini-player pelo `✕` para voltar imediatamente à trilha original.
Se a API não carregar (offline, embed bloqueado ou restrições de `file://`), o
jogo avisa e volta sozinho para a trilha sintetizada sem travar.

Ao pausar o jogo (`P`/`Esc`), o modo ativo (local ou YouTube) pausa e retoma
junto. Ao vencer ou perder, ele também fica pausado; ao reiniciar, volta a
tocar do ponto em que parou.

## Deploy no Render

O projeto é um site estático puro (HTML/CSS/JS, sem build), então o deploy no
[Render](https://render.com) não precisa de Node, npm nem variáveis de ambiente.

**Opção Blueprint (recomendada):** em **New → Blueprint**, selecione o
repositório. O `render.yaml` já configura tudo: static site, branch `master`,
publish path `.` e deploy automático.

**Opção manual:** em **New → Static Site**, selecione o repositório
`M100-ROSE/jogo-cepk` e a branch `master`, deixe o **Build Command vazio** e
preencha o **Publish Directory** com `.`.

## Estrutura do projeto

```
index.html            Ponto de entrada
css/style.css         Layout, escala do canvas, toque e mini-player do YouTube
js/util.js            Constantes, geometria e paletas
js/font.js            Fonte bitmap 5x7 com acentos
js/audio.js           Efeitos, música sintetizada e gerência dos modos de trilha
js/playlist.js        Lista local de faixas da trilha alternativa (0717)
js/youtube.js         Mini-player e IFrame API do YouTube (modo 0717)
js/assets.js          Atlas do jogador embutido em base64
js/world.js           Grade 5x7, salas, itens, inimigos e decoração
js/render.js          Renderização das salas, personagens e HUD
js/game.js            Loop, entrada, colisões, inimigos e estados do jogo
assets/               Sprite original do lobo e arquivos-fonte
assets/music/         Faixas locais da playlist (criar quando for usar)
shots/                Capturas de tela de teste
```

Não há build, dependências ou servidor: é só abrir o `index.html`.

## Créditos

- Inspiração: *Adventure* (Warren Robinett, Atari, 1980).
- Sprite do lobo gerado com **SpriteCook** (`gpt-image-2`), ver
  `assets/spritecook-assets.json`.
- Código, arte procedural e áudio: feitos para este projeto.
