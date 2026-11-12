'use strict';

/* =========================================================================
   Mundo: 20 salas em grade 5x4, itens, inimigos e decoração procedural
   ========================================================================= */

const GRID = [
  ['bosque_fechado', 'bosque_antigo', 'ruinas', 'pantano', 'cabana', 'floresta', 'serra'],
  ['clareira', 'labirinto', 'portao', 'ponte', 'lago', 'mar', 'fonte'],
  ['trilha', 'labirinto_profundo', 'salao', 'caverna', 'ilha', 'tempestade', 'abismo'],
  ['cemiterio', 'cripta', 'covil', 'tesouro', 'ponte_sub', 'cinzas', 'covil2'],
  ['castelo', 'sala_tesouro', 'salao_final', 'covil_final', 'altar_final', 'sagrario', 'escadaria'],
];

const ROOM_META = {
  bosque_fechado: { name: 'Bosque Fechado', theme: 'forest', short: 'Bosque' },
  bosque_antigo: { name: 'Bosque Antigo', theme: 'forest', short: 'Bosque' },
  ruinas: { name: 'Ruínas Esquecidas', theme: 'ruins', short: 'Ruínas' },
  pantano: { name: 'Pântano Sombrio', theme: 'swamp', short: 'Pântano' },
  cabana: { name: 'Cabana Abandonada', theme: 'cabin', short: 'Cabana' },
  clareira: { name: 'Clareira da Escola', theme: 'forest', short: 'Clareira' },
  labirinto: { name: 'Labirinto de Sebes', theme: 'maze', short: 'Labirinto' },
  portao: { name: 'Portão do Castelo', theme: 'castleExt', short: 'Portão' },
  ponte: { name: 'Ponte Quebrada', theme: 'bridge', short: 'Ponte' },
  lago: { name: 'Lago Negro', theme: 'lake', short: 'Lago' },
  trilha: { name: 'Trilha de Terra', theme: 'forest', short: 'Trilha' },
  labirinto_profundo: { name: 'Labirinto Profundo', theme: 'maze', dark: true, short: 'Labirinto' },
  salao: { name: 'Salão do Castelo', theme: 'castle', short: 'Salão' },
  caverna: { name: 'Caverna Úmida', theme: 'cave', short: 'Caverna' },
  ilha: { name: 'Ilha do Abismo', theme: 'void', short: 'Ilha' },
  cemiterio: { name: 'Cemitério Antigo', theme: 'graveyard', dark: true, short: 'Cemitério' },
  cripta: { name: 'Cripta', theme: 'crypt', dark: true, short: 'Cripta' },
  covil: { name: 'Covil do Dragão', theme: 'lair', short: 'Covil' },
  tesouro: { name: 'Câmara do Tesouro', theme: 'treasure', short: 'Tesouro' },
  abismo: { name: 'Abismo', theme: 'void', dark: true, short: 'Abismo' },
  floresta: { name: 'Floresta Antiga', theme: 'forest', short: 'Floresta' },
  serra: { name: 'Serra Rochosa', theme: 'cave', short: 'Serra' },
  mar: { name: 'Mar de Nevoa', theme: 'lake', dark: true, short: 'Mar' },
  fonte: { name: 'Fonte Esquecida', theme: 'lake', short: 'Fonte' },
  tempestade: { name: 'Tempestade', theme: 'void', dark: true, short: 'Tempest.' },
  ponte_sub: { name: 'Ponte Submersa', theme: 'bridge', dark: true, short: 'Ponte' },
  cinzas: { name: 'Campo de Cinzas', theme: 'lair', short: 'Cinzas' },
  covil2: { name: 'Covil Secundário', theme: 'lair', dark: true, short: 'Covil' },
  castelo: { name: 'Castelo Principal', theme: 'castle', short: 'Castelo' },
  sala_tesouro: { name: 'Sala do Tesouro Real', theme: 'treasure', short: 'Tesouro' },
  salao_final: { name: 'Salão do Trono', theme: 'castle', short: 'Salão' },
  covil_final: { name: 'Covil Final', theme: 'lair', dark: true, short: 'Covil' },
  altar_final: { name: 'Altar do Cálice', theme: 'castle', dark: true, short: 'Altar' },
  sagrario: { name: 'Sagrário', theme: 'crypt', dark: true, short: 'Sagrário' },
  escadaria: { name: 'Escadaria do Castelo', theme: 'castle', short: 'Escad.' },
  richard: { name: 'Santuário de Richard', theme: 'crypt', dark: true, short: 'Richard' },
  templo_lito: { name: 'Templo de Lito', theme: 'temple', short: 'Lito' },
  sala_marx: { name: 'Biblioteca de Marx', theme: 'library', short: 'Marx' },
  podio_senna: { name: 'Pódio de Senna', theme: 'race', short: 'Senna' },
  // Salas secretas de easter eggs (fora do grid)
  arquivo_trotski: { name: 'Arquivo de Trótski', theme: 'archive', short: 'Trótski' },
  fonte_sombria: { name: 'Fonte Sombria', theme: 'void', short: 'Fonte' },
  mina_esquecida: { name: 'Mina Esquecida', theme: 'cave', short: 'Mina' },
  obby_roblox: { name: 'Obby Perdido', theme: 'obby', short: 'Obby' },
  estudio_rbiana: { name: 'Estúdio da Rbiana', theme: 'studio', short: 'Rbiana' },
  sala_rpo: { name: 'Castelo de Gelo', theme: 'ice', short: 'Gelo' },
};

/* Ligações bloqueadas (sem porta) */
const BLOCKED_LINKS = new Set(['labirinto_profundo|salao', 'salao|labirinto_profundo']);

/* Itens iniciais */
const ITEM_DEFS = [
  { id: 'lantern', type: 'lantern', room: 'bosque_fechado', x: 200, y: 120, label: 'Lanterna' },
  { id: 'key', type: 'key', room: 'labirinto_profundo', x: 200, y: 196, label: 'Chave Dourada' },
  { id: 'sword', type: 'sword', room: 'salao', x: 96, y: 168, label: 'Espada' },
  { id: 'chalice', type: 'chalice', room: 'sala_tesouro', x: 258, y: 128, label: 'Cálice de Ouro' },
  { id: 'heart_cabana', type: 'heart', room: 'cabana', x: 200, y: 130, label: 'Coração' },
  { id: 'heart_abismo', type: 'heart', room: 'abismo', x: 200, y: 196, label: 'Coração' },
  { id: 'heart_mar', type: 'heart', room: 'mar', x: 200, y: 140, label: 'Coração' },
  { id: 'heart_sagrario', type: 'heart', room: 'sagrario', x: 200, y: 140, label: 'Coração' },
  { id: 'heart_serra', type: 'heart', room: 'serra', x: 200, y: 140, label: 'Coração' },
  { id: 'lanterna2', type: 'lantern', room: 'tempestade', x: 200, y: 140, label: 'Lanterna' },
];

const ALTAR = { room: 'altar_final', x: 200, y: 150 };

/* Homenagens interativas fixas dentro das salas secretas. As posições são
   as bases (pés) dos objetos e coincidem com a decoração construída em
   buildDecor. */
const EASTER_EGGS = {
  lito: { kind: 'lito', room: 'templo_lito', x: 200, y: 170, interact: 64, cooldown: 3 },
  marx: { kind: 'marx', room: 'sala_marx', x: 200, y: 140, interact: 56 },
  senna: {
    kind: 'senna',
    room: 'podio_senna',
    x: 200,
    y: 170,
    interact: 60,
    cooldown: 12,
    boostT: 6,
    boostMul: 1.35,
  },
  // Homenagens em pixel art original (sem material protegido)
  trotsky: { kind: 'trotsky', room: 'arquivo_trotski', x: 200, y: 130, interact: 56 },
  deltarune: { kind: 'deltarune', room: 'fonte_sombria', x: 200, y: 160, interact: 64 },
  minecraft: { kind: 'minecraft', room: 'mina_esquecida', x: 200, y: 130, interact: 52 },
  verity: { kind: 'verity', room: 'mina_esquecida', x: 110, y: 190, interact: 40, cooldown: 4 },
  roblox: { kind: 'roblox', room: 'obby_roblox', x: 70, y: 140, interact: 44 },
  rbiana: { kind: 'rbiana', room: 'estudio_rbiana', x: 200, y: 154, interact: 64, cooldown: 5 },
  undertale: { kind: 'undertale', room: 'labirinto_profundo', x: 330, y: 230, interact: 40 },
  ultrakill: { kind: 'ultrakill', room: 'castelo', x: 340, y: 230, interact: 44 },
  // Easter eggs geek com ação (os passivos ficam fora de EASTER_EGGS).
  batman: { kind: 'batman', room: 'ruinas', x: 72, y: 120, interact: 48 },
  panic: { kind: 'panic', room: 'cabana', x: 330, y: 222, interact: 40 },
  rpo: { kind: 'rpo', room: 'sala_rpo', x: 200, y: 150, interact: 52 },
};

/* Easter eggs geek de cultura pop, em pixel art original (sem logos ou
   material protegido). Cada entrada define a sala, o tipo de decor e a área
   reservada para o espalhamento procedural não nascer em cima. O de Konami
   é global e não tem decor. */
const GEEK_EGGS = {
  alien: { room: 'cripta', type: 'egg_alien', x: 330, y: 232, r: 12, solid: { w: 16, h: 14 } },
  batman: { room: 'ruinas', type: 'batsignal', x: 72, y: 120, r: 14, solid: { w: 18, h: 14 } },
  ironman: { room: 'sala_tesouro', type: 'arc_reactor', x: 64, y: 120, r: 10, solid: { w: 14, h: 16 } },
  spiderman: { room: 'caverna', type: 'web_anchor', x: 330, y: 90, r: 10, solid: null },
  myers: { room: 'cemiterio', type: 'myers_figure', x: 330, y: 96, r: 12, solid: null },
  panic: { room: 'cabana', type: 'phone_scare', x: 330, y: 222, r: 10, solid: { w: 14, h: 12 } },
  mario: { room: 'clareira', type: 'question_block', x: 300, y: 210, r: 12, solid: { w: 16, h: 12 } },
};

/* Passagens escondidas até serem descobertas: cada sala do grid ganha uma
   parede secreta que só vira saída depois que o jogador a investiga (ação).
   A sala de destino já aponta de volta para a sala-mãe pela porta normal. */
const SECRET_PASSAGES = {
  fonte: { side: 'east', target: 'templo_lito' },
  salao_final: { side: 'south', target: 'sala_marx' },
  sagrario: { side: 'south', target: 'podio_senna' },
  // Novas homenagens. As laterais foram conferidas: nenhuma tem vizinho no
  // GRID, então a passagem não sobrescreve uma porta normal.
  cemiterio: { side: 'west', target: 'arquivo_trotski' },
  abismo: { side: 'east', target: 'fonte_sombria' },
  serra: { side: 'east', target: 'mina_esquecida' },
  floresta: { side: 'north', target: 'obby_roblox' },
  cabana: { side: 'north', target: 'estudio_rbiana' },
  ruinas: { side: 'north', target: 'sala_rpo' },
};

/* Minigame "Adventure": homenagem original ao clássico do Atari 2600.
   Os dados são lidos tanto por game.js (lógica/estado) quanto por render.js
   (desenho do minigame dentro do mesmo canvas). */
const ADVENTURE = {
  speed: 62,
  credit: 'CRIADO POR WARREN ROBINETT',
  hint: 'SETAS/WASD: MOVER    AÇÃO/ESC: SAIR',
  maps: [
    {
      label: 'O CASTELO',
      walls: [
        { x: 0, y: 30, w: 400, h: 10 }, { x: 0, y: 290, w: 400, h: 10 },
        { x: 0, y: 30, w: 10, h: 90 }, { x: 0, y: 180, w: 10, h: 120 },
        { x: 390, y: 30, w: 10, h: 90 }, { x: 390, y: 180, w: 10, h: 120 },
        { x: 110, y: 88, w: 70, h: 10 }, { x: 110, y: 88, w: 10, h: 72 },
        { x: 250, y: 170, w: 70, h: 10 }, { x: 310, y: 110, w: 10, h: 70 },
      ],
      doors: [{ x: 390, y: 120, w: 10, h: 60, to: 1, side: 'east' }],
      spawn: { x: 50, y: 240 },
    },
    {
      label: 'A CAVERNA',
      walls: [
        { x: 0, y: 30, w: 400, h: 10 }, { x: 0, y: 290, w: 400, h: 10 },
        { x: 0, y: 30, w: 10, h: 90 }, { x: 0, y: 180, w: 10, h: 120 },
        { x: 390, y: 30, w: 10, h: 270 },
        { x: 200, y: 140, w: 10, h: 110 },
      ],
      doors: [],
      spawn: { x: 24, y: 150 },
      dragon: { x: 60, y: 110, min: 40, max: 340, speed: 34, y2: 110 },
      secret: { x: 300, y: 36, r: 10 },
    },
    {
      label: 'O OVO',
      walls: [
        { x: 0, y: 30, w: 400, h: 10 }, { x: 0, y: 290, w: 400, h: 10 },
        { x: 0, y: 30, w: 10, h: 270 }, { x: 390, y: 30, w: 10, h: 270 },
      ],
      doors: [],
      spawn: { x: 200, y: 235 },
      dot: { x: 332, y: 74, r: 9 },
    },
    {
      label: 'O NOME',
      walls: [
        { x: 0, y: 30, w: 400, h: 10 }, { x: 0, y: 290, w: 400, h: 10 },
        { x: 0, y: 30, w: 10, h: 270 }, { x: 390, y: 30, w: 10, h: 270 },
      ],
      doors: [],
      spawn: { x: 196, y: 150 },
    },
  ],
};

const ENEMY_DEFS = [
  { id: 'dragao_covil', type: 'dragon', room: 'covil', x: 120, y: 196, axis: 'x', from: 72, to: 330, speed: 26, boss: true },
  { id: 'dragao_caverna', type: 'dragon', room: 'caverna', x: 200, y: 110, axis: 'y', from: 74, to: 240, speed: 21, boss: false },
  { id: 'dragao_pantano', type: 'dragon', room: 'pantano', x: 290, y: 150, axis: 'y', from: 80, to: 246, speed: 19, boss: false },
  { id: 'dragao_mar', type: 'dragon', room: 'mar', x: 120, y: 150, axis: 'x', from: 60, to: 340, speed: 22, boss: false },
  { id: 'dragao_serra', type: 'dragon', room: 'serra', x: 200, y: 120, axis: 'y', from: 70, to: 250, speed: 24, boss: false },
  { id: 'dragao_covil2', type: 'dragon', room: 'covil2', x: 200, y: 140, axis: 'x', from: 60, to: 340, speed: 25, boss: false },
  { id: 'dragao_covil_final', type: 'dragon', room: 'covil_final', x: 120, y: 180, axis: 'x', from: 60, to: 340, speed: 30, boss: true },
  { id: 'dragao_castelo', type: 'dragon', room: 'castelo', x: 200, y: 120, axis: 'y', from: 70, to: 250, speed: 23, boss: false },
  { id: 'dragao_cinzas', type: 'dragon', room: 'cinzas', x: 290, y: 150, axis: 'y', from: 80, to: 246, speed: 21, boss: false },
];

/* ------------------------------------------------------------------ */
/* Construção do mundo                                                */
/* ------------------------------------------------------------------ */

function buildWorld() {
  const rooms = {};
  const byId = {};

  for (let gy = 0; gy < GRID.length; gy++) {
    for (let gx = 0; gx < GRID[gy].length; gx++) {
      const id = GRID[gy][gx];
      const meta = ROOM_META[id];
      const room = {
        id,
        gx,
        gy,
        name: meta.name,
        short: meta.short,
        theme: meta.theme,
        dark: !!meta.dark,
        exits: {},
        items: [],
        decor: [],
        solids: [],
        torches: [],
        waters: [],
        fog: false,
        gate: false,
        rng: mulberry32(hashString(id)),
        reserved: [],
        visited: false,
        bg: null,
      };
      rooms[id] = room;
      byId[id] = room;
    }
  }

  const gridAt = (gx, gy) => (GRID[gy] && GRID[gy][gx]) || null;

  for (const id in rooms) {
    const room = rooms[id];
    const { gx, gy } = room;

    const north = gridAt(gx, gy - 1);
    const south = gridAt(gx, gy + 1);
    const west = gridAt(gx - 1, gy);
    const east = gridAt(gx + 1, gy);

    if (north && !BLOCKED_LINKS.has(`${id}|${north}`)) room.exits.north = north;
    if (south && !BLOCKED_LINKS.has(`${id}|${south}`)) room.exits.south = south;
    if (west && !BLOCKED_LINKS.has(`${id}|${west}`)) room.exits.west = west;
    if (east && !BLOCKED_LINKS.has(`${id}|${east}`)) room.exits.east = east;
  }

  // Sala secreta de Richard (fora do grid) — Inúna pelas paredes da Escadaria
  const richardRoom = {
    id: 'richard',
    gx: -1,
    gy: 0,
    name: 'Santuário de Richard',
    short: 'Richard',
    theme: 'crypt',
    dark: false,
    exits: { west: 'escadaria' },
    items: [],
    decor: [],
    solids: [],
    torches: [
      { x: 70, y: 66 },
      { x: 330, y: 66 },
      { x: 200, y: 230 },
    ],
    waters: [],
    fog: true,
    gate: false,
    rng: mulberry32(hashString('richard')),
    reserved: [],
    visited: false,
    bg: null,
  };
  rooms.richard = richardRoom;
  // A passagem secreta fica escondida até o jogador descobrir
  if (!rooms.escadaria.secretRevealed) rooms.escadaria.exits.east = null;

  // Salas secretas de homenagem (fora do grid, como a de Richard).
  // A porta de volta é normal; a ida depende de descobrir a passagem.
  const litoRoom = {
    id: 'templo_lito',
    gx: 7,
    gy: -1,
    name: ROOM_META.templo_lito.name,
    short: ROOM_META.templo_lito.short,
    theme: ROOM_META.templo_lito.theme,
    dark: false,
    exits: { west: 'fonte' },
    items: [],
    decor: [],
    solids: [],
    torches: [],
    waters: [],
    fog: false,
    gate: false,
    rng: mulberry32(hashString('templo_lito')),
    reserved: [],
    visited: false,
    bg: null,
  };
  const marxRoom = {
    id: 'sala_marx',
    gx: 1,
    gy: 5,
    name: ROOM_META.sala_marx.name,
    short: ROOM_META.sala_marx.short,
    theme: ROOM_META.sala_marx.theme,
    dark: false,
    exits: { north: 'salao_final' },
    items: [],
    decor: [],
    solids: [],
    torches: [],
    waters: [],
    fog: false,
    gate: false,
    rng: mulberry32(hashString('sala_marx')),
    reserved: [],
    visited: false,
    bg: null,
  };
  const sennaRoom = {
    id: 'podio_senna',
    gx: 5,
    gy: 5,
    name: ROOM_META.podio_senna.name,
    short: ROOM_META.podio_senna.short,
    theme: ROOM_META.podio_senna.theme,
    dark: false,
    exits: { north: 'sagrario' },
    items: [],
    decor: [],
    solids: [],
    torches: [],
    waters: [],
    fog: false,
    gate: false,
    rng: mulberry32(hashString('podio_senna')),
    reserved: [],
    visited: false,
    bg: null,
  };
  rooms.templo_lito = litoRoom;
  rooms.sala_marx = marxRoom;
  rooms.podio_senna = sennaRoom;

  /* Salas secretas adicionais (fora do grid, mesmo padrão da de Richard).
     A porta de volta é normal; a ida depende de descobrir a passagem. */
  const addSecretRoom = (id, gx, gy, exits) => {
    const meta = ROOM_META[id];
    const room = {
      id,
      gx,
      gy,
      name: meta.name,
      short: meta.short,
      theme: meta.theme,
      dark: false,
      exits,
      items: [],
      decor: [],
      solids: [],
      torches: [],
      waters: [],
      fog: false,
      gate: false,
      rng: mulberry32(hashString(id)),
      reserved: [],
      visited: false,
      bg: null,
    };
    rooms[id] = room;
    return room;
  };
  addSecretRoom('arquivo_trotski', -1, 3, { east: 'cemiterio' });
  addSecretRoom('fonte_sombria', 7, 2, { west: 'abismo' });
  addSecretRoom('mina_esquecida', 7, 0, { west: 'serra' });
  addSecretRoom('obby_roblox', 5, -1, { south: 'floresta' });
  addSecretRoom('estudio_rbiana', 4, -1, { south: 'cabana' });
  addSecretRoom('sala_rpo', 2, -1, { south: 'ruinas' });

  // Escode as passagens nas salas-mãe até o jogador descobri-las
  for (const parentId in SECRET_PASSAGES) {
    const parent = rooms[parentId];
    if (!parent) continue;
    parent.secretRevealed = false;
    delete parent.exits[SECRET_PASSAGES[parentId].side];
  }

  // Portão trancado entre o Portão e o Salão
  rooms.portao.south = 'salao';
  rooms.portao.gate = true;
  rooms.salao.north = 'portao';
  rooms.salao.gate = true;

  // Itens
  const items = ITEM_DEFS.map((d) => ({
    ...d,
    taken: false,
    picked: false,
    holder: null,
    bob: Math.random() * Math.PI * 2,
  }));
  for (const it of items) rooms[it.room].items.push(it);

  // Reservas para não colocar decoração em cima de itens/portas/altar
  for (const id in rooms) {
    const room = rooms[id];
    const res = [
      { x: DOOR_CX, y: INNER.y + 10, r: 46 },
      { x: DOOR_CX, y: INNER.b - 10, r: 46 },
      { x: INNER.x + 10, y: DOOR_CY, r: 46 },
      { x: INNER.r - 10, y: DOOR_CY, r: 46 },
      { x: 200, y: 159, r: 26 },
    ];
    if (room.id === 'portao') res.push({ x: DOOR_CX, y: INNER.b - 26, r: 54 });
    if (room.id === 'clareira') {
      res.push({ x: 200, y: 216, r: 30 });
      res.push({ x: 62, y: 100, r: 52 });
      res.push({ x: 132, y: 132, r: 26 });
    }
    for (const it of room.items) res.push({ x: it.x, y: it.y, r: 34 });
    if (room.id === ALTAR.room) res.push({ x: ALTAR.x, y: ALTAR.y, r: 46 });
    room.reserved = res;
  }

  // Decoração
  for (const id in rooms) buildDecor(rooms[id]);

  return { rooms, byId, items, altar: ALTAR };
}

/* ------------------------------------------------------------------ */
/* Decoração procedural                                               */
/* ------------------------------------------------------------------ */

function buildDecor(room) {
  const rng = room.rng;
  const decor = room.decor;
  const solids = room.solids;

  const tooClose = (x, y, r) => {
    for (const p of room.reserved) {
      if (dist2(x, y, p.x, p.y) < (p.r + r) * (p.r + r)) return true;
    }
    for (const d of decor) {
      if (d.solid && dist2(x, y, d.x, d.y) < (d.r + r + 6) * (d.r + r + 6)) return true;
    }
    return false;
  };

  const add = (type, x, y, opts = {}) => {
    x = Math.round(x);
    y = Math.round(y);
    const d = {
      type,
      x,
      y,
      r: opts.r || 10,
      scale: opts.scale || 1,
      flip: opts.flip || (rng() > 0.5 ? 1 : -1),
      seed: Math.floor(rng() * 9999),
      solid: null,
      color: opts.color,
    };
    if (opts.solid) {
      d.solid = { x: x - opts.solid.w / 2, y: y - opts.solid.h, w: opts.solid.w, h: opts.solid.h };
      solids.push(d.solid);
    }
    decor.push(d);
    return d;
  };

  const scatter = (count, radius, margin, cb) => {
    let placed = 0;
    let tries = 0;
    while (placed < count && tries < count * 40) {
      tries++;
      const x = rnd(rng, INNER.x + margin, INNER.r - margin);
      const y = rnd(rng, INNER.y + margin, INNER.b - margin);
      if (tooClose(x, y, radius)) continue;
      cb(x, y);
      placed++;
    }
  };

  if (room.id === 'richard') {
    add('portrait', 200, 66, { r: 46, solid: { w: 56, h: 12 } });
    add('tomb_richard', 332, 232, { r: 12, solid: { w: 22, h: 16 } });
    add('stalagmite', 96, 226, { r: 6, solid: { w: 12, h: 8 } });
    add('crystal', 46, 130, { r: 5, color: '#e6c26a' });
    add('crystal', 354, 130, { r: 5, color: '#e6c26a' });
    return;
  }

  // Salas secretas: decoração fixa, sem espalhamento procedural.
  if (room.id === 'templo_lito') {
    add('temple_column', 70, 140, { r: 14, solid: { w: 18, h: 16 } });
    add('temple_column', 330, 140, { r: 14, solid: { w: 18, h: 16 } });
    add('temple_column', 70, 230, { r: 14, solid: { w: 18, h: 16 } });
    add('temple_column', 330, 230, { r: 14, solid: { w: 18, h: 16 } });
    add('fountain_lito', 200, 170, { r: 34, solid: { w: 58, h: 24 } });
    room.waters.push({ x: 200, y: 164, r: 30 });
    // detalhe de "Aviões e Músicas"
    add('radio_lito', 310, 232, { r: 10, solid: { w: 22, h: 12 } });
    room.torches.push({ x: 70, y: 60 }, { x: 330, y: 60 });
    return;
  }

  if (room.id === 'sala_marx') {
    add('bookshelf', 64, 120, { r: 16, solid: { w: 30, h: 14 } });
    add('bookshelf', 120, 120, { r: 16, solid: { w: 30, h: 14 } });
    add('bookshelf', 280, 120, { r: 16, solid: { w: 30, h: 14 } });
    add('bookshelf', 336, 120, { r: 16, solid: { w: 30, h: 14 } });
    add('bust_marx', 200, 140, { r: 14, solid: { w: 20, h: 16 } });
    add('desk_marx', 300, 220, { r: 12, solid: { w: 30, h: 16 } });
    add('rug_marx', 200, 190, { r: 0 });
    room.torches.push({ x: 70, y: 62 }, { x: 330, y: 62 });
    return;
  }

  if (room.id === 'podio_senna') {
    add('podium_senna', 200, 170, { r: 30, solid: { w: 70, h: 22 } });
    add('flag_checkered', 80, 120, { r: 10, solid: { w: 8, h: 12 } });
    add('flag_checkered', 320, 120, { r: 10, solid: { w: 8, h: 12 } });
    return;
  }

  /* --- Novas salas de easter egg: decoração fixa, sem espalhamento --- */

  if (room.id === 'arquivo_trotski') {
    add('bust_trotsky', 200, 130, { r: 14, solid: { w: 20, h: 16 } });
    add('bookshelf', 64, 100, { r: 16, solid: { w: 30, h: 14 } });
    add('bookshelf', 120, 100, { r: 16, solid: { w: 30, h: 14 } });
    add('bookshelf', 280, 100, { r: 16, solid: { w: 30, h: 14 } });
    add('bookshelf', 336, 100, { r: 16, solid: { w: 30, h: 14 } });
    add('desk_archive', 300, 220, { r: 12, solid: { w: 32, h: 16 } });
    add('banner_red', 200, 60, { r: 0 });
    add('train_model', 90, 220, { r: 10, solid: { w: 26, h: 12 } });
    add('rug_marx', 200, 180, { r: 0 });
    room.torches.push({ x: 70, y: 60 }, { x: 330, y: 60 });
    return;
  }

  if (room.id === 'fonte_sombria') {
    add('dark_fountain', 200, 160, { r: 34, solid: { w: 58, h: 24 } });
    add('hooded_figure', 300, 120, { r: 14, solid: { w: 16, h: 14 } });
    add('dark_crystal', 70, 220, { r: 6, solid: { w: 8, h: 6 } });
    add('dark_crystal', 330, 220, { r: 6, solid: { w: 8, h: 6 } });
    room.waters.push({ x: 200, y: 154, r: 28 });
    return;
  }

  if (room.id === 'mina_esquecida') {
    add('mine_block', 60, 80, { r: 16, solid: { w: 30, h: 18 } });
    add('mine_block', 120, 80, { r: 16, solid: { w: 30, h: 18 } });
    add('mine_block', 300, 80, { r: 16, solid: { w: 30, h: 18 } });
    add('mine_block', 340, 80, { r: 16, solid: { w: 30, h: 18 } });
    add('diamond_ore', 200, 130, { r: 14, solid: { w: 20, h: 16 } });
    add('creeper_block', 300, 200, { r: 12, solid: { w: 18, h: 16 } });
    add('pickaxe_rack', 250, 220, { r: 10, solid: { w: 18, h: 14 } });
    add('verity_orb', 110, 190, { r: 10 });
    room.torches.push({ x: 70, y: 62 }, { x: 330, y: 62 });
    return;
  }

  if (room.id === 'obby_roblox') {
    add('obby_platform', 100, 110, { r: 18, solid: { w: 36, h: 18 } });
    add('obby_platform', 300, 110, { r: 18, solid: { w: 36, h: 18 } });
    add('obby_platform', 200, 170, { r: 18, solid: { w: 36, h: 18 } });
    add('obby_platform', 100, 230, { r: 18, solid: { w: 36, h: 18 } });
    add('obby_platform', 300, 230, { r: 18, solid: { w: 36, h: 18 } });
    add('lava_block', 140, 245, { r: 16 });
    add('noob_statue', 200, 128, { r: 14, solid: { w: 18, h: 16 } });
    add('checkpoint_flag', 70, 140, { r: 10, solid: { w: 8, h: 12 } });
    return;
  }

  if (room.id === 'estudio_rbiana') {
    // Quarto de streamer em pixel art original: estante branca de
    // colecionáveis, mesa com monitores, cadeira gamer e câmera.
    // A estante é decoração de parede (sem sólido) e não bloqueia a porta sul.
    add('figure_shelf', 200, 92, { r: 0 });
    add('stream_desk', 200, 154, { r: 34, solid: { w: 110, h: 24 } });
    add('gaming_chair', 278, 192, { r: 14, solid: { w: 20, h: 16 } });
    add('ring_light', 70, 120, { r: 12, solid: { w: 14, h: 10 } });
    add('live_camera', 80, 215, { r: 12, solid: { w: 14, h: 10 } });
    add('pc_tower', 330, 220, { r: 10, solid: { w: 16, h: 20 } });
    return;
  }

  if (room.id === 'sala_rpo') {
    // Castelo de Gelo (homenagem a Ready Player One): os jogadores sentados
    // diante de uma TV sobre plataforma de gelo.
    add('ice_platform', 200, 178, { r: 44, solid: { w: 120, h: 20 } });
    add('crt_tv', 200, 148, { r: 30, solid: { w: 40, h: 18 } });
    add('ice_pillar', 58, 96, { r: 12, solid: { w: 16, h: 16 } });
    add('ice_pillar', 342, 96, { r: 12, solid: { w: 16, h: 16 } });
    add('icicle', 120, 46, { r: 0 });
    add('icicle', 200, 46, { r: 0 });
    add('icicle', 280, 46, { r: 0 });
    add('frost_pile', 46, 252, { r: 14 });
    add('frost_pile', 354, 252, { r: 14 });
    add('crystal_blue', 90, 210, { r: 8 });
    add('crystal_blue', 310, 210, { r: 8 });
    add('poster_key', 290, 84, { r: 0 });
    return;
  }

  /* --- Easter eggs geek: decoração fixa antes do espalhamento --- */
  for (const key in GEEK_EGGS) {
    const egg = GEEK_EGGS[key];
    if (egg.room !== room.id) continue;
    room.reserved.push({ x: egg.x, y: egg.y, r: 28 });
    add(egg.type, egg.x, egg.y, { r: egg.r, solid: egg.solid || undefined });
  }

  const theme = room.theme;

  if (theme === 'forest') {
    scatter(7, 16, 26, (x, y) =>
      add('tree', x, y, { r: 14, solid: { w: 16, h: 10 } })
    );
    scatter(9, 10, 20, (x, y) => add('bush', x, y, { r: 8 }));
    scatter(4, 10, 24, (x, y) => add('rock', x, y, { r: 8, solid: { w: 18, h: 9 } }));
    scatter(14, 3, 16, (x, y) => add('flower', x, y, { r: 2 }));
    scatter(10, 2, 16, (x, y) => add('tuft', x, y, { r: 2 }));
    scatter(3, 5, 24, (x, y) => add('mushroom', x, y, { r: 3 }));
    if (room.id === 'clareira') {
      decor.push({
        type: 'school',
        x: 62,
        y: 112,
        r: 30,
        scale: 1,
        flip: 1,
        seed: 7,
        solid: { x: 32, y: 66, w: 60, h: 46 },
      });
      solids.push({ x: 32, y: 66, w: 60, h: 46 });
      decor.push({
        type: 'sign',
        x: 132,
        y: 136,
        r: 10,
        scale: 1,
        flip: 1,
        seed: 11,
        solid: { x: 122, y: 128, w: 20, h: 12 },
      });
      solids.push({ x: 122, y: 128, w: 20, h: 12 });
    }
  } else if (theme === 'maze') {
    // sebes estruturadas, deixando corredores livres
    const blocks =
      room.id === 'labirinto'
        ? [
            [80, 96], [150, 96], [250, 96], [320, 96],
            [80, 216], [150, 216], [250, 216], [320, 216],
          ]
        : [
            [82, 112], [318, 112], [82, 208], [318, 208],
            [200, 96], [148, 160], [252, 160],
          ];
    for (const [bx, by] of blocks) {
      add('hedge', bx, by, { r: 20, solid: { w: 38, h: 20 } });
    }
    scatter(12, 3, 16, (x, y) => add('tuft', x, y, { r: 2 }));
    scatter(6, 4, 20, (x, y) => add('flower', x, y, { r: 2 }));
    scatter(4, 6, 22, (x, y) => add('mushroom', x, y, { r: 3 }));
    // Estrela de determinação escondida no labirinto profundo (sem sólido,
    // em um canto livre para não atrapalhar os corredores).
    if (room.id === 'labirinto_profundo') add('save_star', 330, 230, { r: 10 });
  } else if (theme === 'ruins') {
    scatter(5, 16, 28, (x, y) =>
      add('column', x, y, { r: 14, solid: { w: 18, h: 16 } })
    );
    scatter(8, 6, 18, (x, y) => add('rubble', x, y, { r: 4 }));
    scatter(3, 12, 26, (x, y) => add('rock', x, y, { r: 8, solid: { w: 18, h: 9 } }));
    scatter(8, 3, 16, (x, y) => add('tuft', x, y, { r: 2 }));
    scatter(5, 3, 18, (x, y) => add('flower', x, y, { r: 2 }));
  } else if (theme === 'swamp') {
    scatter(5, 18, 26, (x, y) => {
      const w = rnd(rng, 22, 40);
      room.waters.push({ x, y, r: w });
      add('water', x, y, { r: w * 0.6 });
    });
    scatter(3, 14, 28, (x, y) =>
      add('deadtree', x, y, { r: 10, solid: { w: 12, h: 10 } })
    );
    scatter(14, 4, 18, (x, y) => add('reed', x, y, { r: 3 }));
    scatter(3, 10, 26, (x, y) => add('rock', x, y, { r: 8, solid: { w: 16, h: 8 } }));
    scatter(4, 4, 20, (x, y) => add('mushroom', x, y, { r: 3, color: '#7fd6a0' }));
    room.fog = true;
  } else if (theme === 'cabin') {
    add('rug', 200, 170, { r: 0 });
    scatter(3, 12, 30, (x, y) => add('barrel', x, y, { r: 9, solid: { w: 16, h: 12 } }));
    scatter(2, 12, 30, (x, y) => add('crate', x, y, { r: 9, solid: { w: 18, h: 14 } }));
    add('cobweb', 46, 62, { r: 0 });
    add('cobweb', 352, 62, { r: 0 });
    scatter(4, 4, 22, (x, y) => add('rubble', x, y, { r: 3 }));
  } else if (theme === 'castleExt') {
    scatter(4, 14, 30, (x, y) =>
      add('pillar', x, y, { r: 12, solid: { w: 20, h: 18 } })
    );
    room.torches.push({ x: 78, y: 62 }, { x: 322, y: 62 });
    scatter(4, 8, 26, (x, y) => add('rock', x, y, { r: 8, solid: { w: 16, h: 8 } }));
    scatter(6, 3, 18, (x, y) => add('tuft', x, y, { r: 2 }));
  } else if (theme === 'bridge') {
    scatter(4, 12, 24, (x, y) => add('rock', x, y, { r: 8, solid: { w: 16, h: 8 } }));
    scatter(6, 4, 18, (x, y) => add('reed', x, y, { r: 3 }));
    scatter(4, 3, 18, (x, y) => add('tuft', x, y, { r: 2 }));
    room.waters.push({ x: 70, y: 230, r: 34 }, { x: 336, y: 92, r: 30 });
  } else if (theme === 'lake') {
    room.waters.push({ x: 120, y: 110, r: 60 }, { x: 290, y: 210, r: 70 }, { x: 70, y: 230, r: 40 });
    scatter(8, 4, 18, (x, y) => add('reed', x, y, { r: 3 }));
    scatter(4, 10, 26, (x, y) => add('rock', x, y, { r: 8, solid: { w: 16, h: 8 } }));
    scatter(4, 3, 18, (x, y) => add('tuft', x, y, { r: 2 }));
    room.fog = true;
  } else if (theme === 'castle') {
    // Terminal de combate no canto do Castelo Principal. Vem antes do
    // espalhamento para os pilares aleatórios desviarem dele.
    if (room.id === 'castelo') add('terminal_v', 340, 230, { r: 10, solid: { w: 18, h: 12 } });
    scatter(4, 14, 30, (x, y) =>
      add('pillar', x, y, { r: 12, solid: { w: 22, h: 18 } })
    );
    room.torches.push({ x: 66, y: 62 }, { x: 334, y: 62 });
    add('banner', 130, 54, { r: 0 });
    add('banner', 270, 54, { r: 0 });
    add('throne', 302, 176, { r: 16, solid: { w: 30, h: 20 } });
    add('carpet', 200, 159, { r: 0 });
  } else if (theme === 'cave') {
    scatter(7, 10, 22, (x, y) =>
      add('stalagmite', x, y, { r: 8, solid: { w: 14, h: 8 } })
    );
    scatter(5, 6, 22, (x, y) => add('crystal', x, y, { r: 5, solid: { w: 8, h: 6 } }));
    scatter(5, 10, 24, (x, y) => add('rock', x, y, { r: 8, solid: { w: 18, h: 9 } }));
    scatter(3, 14, 26, (x, y) => {
      room.waters.push({ x, y, r: 20 });
      add('water', x, y, { r: 16 });
    });
    room.torches.push({ x: 70, y: 62 });
  } else if (theme === 'graveyard') {
    scatter(9, 10, 22, (x, y) =>
      add('tomb', x, y, { r: 8, solid: { w: 14, h: 10 } })
    );
    scatter(3, 14, 28, (x, y) =>
      add('deadtree', x, y, { r: 10, solid: { w: 12, h: 10 } })
    );
    scatter(4, 8, 24, (x, y) => add('rock', x, y, { r: 8, solid: { w: 16, h: 8 } }));
    scatter(6, 2, 16, (x, y) => add('tuft', x, y, { r: 2 }));
    room.fog = true;
  } else if (theme === 'crypt') {
    scatter(8, 10, 20, (x, y) =>
      add('tomb', x, y, { r: 8, solid: { w: 14, h: 10 } })
    );
    scatter(6, 4, 18, (x, y) => add('bones', x, y, { r: 3 }));
    scatter(2, 14, 28, (x, y) =>
      add('column', x, y, { r: 12, solid: { w: 18, h: 16 } })
    );
    room.torches.push({ x: 70, y: 62 }, { x: 330, y: 62 });
    room.fog = true;
  } else if (theme === 'lair') {
    scatter(10, 4, 18, (x, y) => add('bones', x, y, { r: 3 }));
    scatter(6, 10, 24, (x, y) => add('rock', x, y, { r: 8, solid: { w: 18, h: 9 } }));
    scatter(4, 8, 24, (x, y) => add('stalagmite', x, y, { r: 8, solid: { w: 12, h: 8 } }));
    add('lava', 60, 250, { r: 20 });
    add('lava', 340, 80, { r: 18 });
    add('skull', 330, 240, { r: 5 });
  } else if (theme === 'treasure') {
    scatter(10, 8, 20, (x, y) => add('gold', x, y, { r: 6 }));
    scatter(3, 12, 26, (x, y) =>
      add('chest', x, y, { r: 10, solid: { w: 22, h: 14 } })
    );
    scatter(3, 14, 28, (x, y) =>
      add('column', x, y, { r: 12, solid: { w: 18, h: 16 } })
    );
  } else if (theme === 'void') {
    for (let i = 0; i < 26; i++) {
      add('star', rnd(rng, INNER.x + 6, INNER.r - 6), rnd(rng, INNER.y + 6, INNER.b - 6), {
        r: 0,
      });
    }
    scatter(4, 12, 26, (x, y) => add('rock', x, y, { r: 8, solid: { w: 16, h: 8 } }));
    if (room.id === 'abismo') room.fog = true;
  }
}
