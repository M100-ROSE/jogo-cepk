'use strict';

/* =========================================================================
   Renderização: cenários, personagens, itens, HUD e telas
   ========================================================================= */

const PAL = {
  forest: {
    floor: '#315f3a', floor2: '#2a5231', floor3: '#3b7044', path: '#7a5f3c', path2: '#644c2f',
    wall: '#3b2d21', wall2: '#2a1f16', wall3: '#54402d',
  },
  ruins: {
    floor: '#6a6553', floor2: '#5c5747', floor3: '#7b7562', path: '#8a826b', path2: '#746c57',
    wall: '#5a5448', wall2: '#453f35', wall3: '#736c5c',
  },
  swamp: {
    floor: '#4a4b2e', floor2: '#3f4026', floor3: '#565834', path: '#5a5432', path2: '#494427',
    wall: '#3a3520', wall2: '#2a2716', wall3: '#504a2c',
  },
  maze: {
    floor: '#2b5535', floor2: '#244a2e', floor3: '#35643f', path: '#6b563a', path2: '#57452d',
    wall: '#244a2e', wall2: '#18351f', wall3: '#35643f',
  },
  cabin: {
    floor: '#6b4a2f', floor2: '#5c3f27', floor3: '#7c5738', path: '#5a3d25', path2: '#4b321e',
    wall: '#4a3320', wall2: '#392817', wall3: '#5f442b',
  },
  castleExt: {
    floor: '#5c5f66', floor2: '#4e5158', floor3: '#6b6f77', path: '#6f737b', path2: '#5b5f66',
    wall: '#585c64', wall2: '#40444b', wall3: '#71757e',
  },
  bridge: {
    floor: '#5a5140', floor2: '#4c4435', floor3: '#6a5f4a', path: '#7a6547', path2: '#645237',
    wall: '#3f3a2c', wall2: '#2e2a1f', wall3: '#574f3c',
  },
  lake: {
    floor: '#53604a', floor2: '#47543f', floor3: '#5f6d54', path: '#6d7352', path2: '#5b6144',
    wall: '#3d4430', wall2: '#2c3222', wall3: '#525b3e',
  },
  castle: {
    floor: '#575c68', floor2: '#4a4f5a', floor3: '#656b78', path: '#636976', path2: '#525863',
    wall: '#434852', wall2: '#31353d', wall3: '#5b616d',
  },
  cave: {
    floor: '#3f3a3f', floor2: '#343037', floor3: '#4a444b', path: '#4b454c', path2: '#3b363c',
    wall: '#2e2a30', wall2: '#211e23', wall3: '#423c45',
  },
  graveyard: {
    floor: '#2f3b31', floor2: '#283229', floor3: '#394738', path: '#4b4a3a', path2: '#3d3c2e',
    wall: '#333029', wall2: '#24221d', wall3: '#484337',
  },
  crypt: {
    floor: '#4a4642', floor2: '#3e3a36', floor3: '#57524d', path: '#5a544e', path2: '#48433d',
    wall: '#3a3531', wall2: '#2a2623', wall3: '#4f4944',
  },
  lair: {
    floor: '#4a3230', floor2: '#3d2826', floor3: '#57403c', path: '#5a3b34', path2: '#492f2a',
    wall: '#33201f', wall2: '#241616', wall3: '#4a2c2a',
  },
  treasure: {
    floor: '#6b5a35', floor2: '#5c4d2c', floor3: '#7c6a40', path: '#7a6740', path2: '#685735',
    wall: '#4a3d23', wall2: '#352c18', wall3: '#61502e',
  },
  void: {
    floor: '#0e1119', floor2: '#0a0d14', floor3: '#151b28', path: '#252b38', path2: '#1a1f2a',
    wall: '#141a26', wall2: '#0b0f18', wall3: '#232c3d',
  },
  temple: {
    floor: '#cfc9b8', floor2: '#bdb6a3', floor3: '#ded8c8', path: '#b8b19e', path2: '#a49d8c',
    wall: '#b7b0a0', wall2: '#9a9384', wall3: '#d6d0c0',
  },
  library: {
    floor: '#4a3a2a', floor2: '#3d3022', floor3: '#5a4632', path: '#5a3a2a', path2: '#472d20',
    wall: '#3a2d22', wall2: '#2a2018', wall3: '#51402f',
  },
  race: {
    floor: '#2a2c30', floor2: '#1e2024', floor3: '#3a3d42', path: '#3a3d42', path2: '#2a2c30',
    wall: '#26282c', wall2: '#181a1d', wall3: '#3a3d42',
  },
  archive: {
    floor: '#3a2a22', floor2: '#2e201a', floor3: '#4a352a', path: '#5a2a2e', path2: '#4a2024',
    wall: '#2c1d18', wall2: '#1f1410', wall3: '#4a3028',
  },
  obby: {
    floor: '#1a1e33', floor2: '#14172a', floor3: '#262c46', path: '#2a2140', path2: '#201a33',
    wall: '#1c2038', wall2: '#121526', wall3: '#343a5c',
  },
  studio: {
    // quarto aconchegante: piso de madeira e parede lavanda/cinza-quente
    floor: '#3b2a1e', floor2: '#2f2116', floor3: '#493527', path: '#4a3826', path2: '#3a2b1c',
    wall: '#665d74', wall2: '#4f4760', wall3: '#7a7286',
  },
  ice: {
    // Castelo de Gelo: piso de pedra clara/gelo azulado, blocos azul-roxo
    floor: '#b8c9d8', floor2: '#a2b4c7', floor3: '#d3e0ea', path: '#8ea9bd', path2: '#7b93a8',
    wall: '#2f3454', wall2: '#201f3d', wall3: '#4b548a',
  },
};

const WALL_STYLE = {
  forest: 'organic',
  maze: 'organic',
  ruins: 'brick',
  swamp: 'organic',
  cabin: 'wood',
  castleExt: 'brick',
  bridge: 'rock',
  lake: 'organic',
  castle: 'brick',
  cave: 'rock',
  graveyard: 'brick',
  crypt: 'brick',
  lair: 'rock',
  treasure: 'brick',
  void: 'rock',
  temple: 'brick',
  library: 'wood',
  race: 'brick',
  archive: 'wood',
  obby: 'brick',
  studio: 'wood',
  ice: 'ice',
};

/* ------------------------------------------------------------------ */
/* Fundo estático de cada sala (cache)                                */
/* ------------------------------------------------------------------ */

function getRoomBg(room) {
  if (room.bg) return room.bg;
  const cv = document.createElement('canvas');
  cv.width = VW;
  cv.height = VH;
  const g = cv.getContext('2d');
  g.imageSmoothingEnabled = false;
  drawRoomStatic(g, room);
  room.bg = cv;
  return cv;
}

function drawRoomStatic(c, room) {
  const p = PAL[room.theme] || PAL.forest;
  c.clearRect(0, 0, VW, VH);

  // fundo geral
  px(c, 0, 0, VW, VH, '#05070a');

  // piso
  px(c, INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y, p.floor);

  // textura do piso
  drawFloorTexture(c, room, p);

  // paredes
  drawWallBand(c, room, p);

  // portas
  drawDoorPassages(c, room, p);

  // caminhos internos
  drawPaths(c, room, p);

  // extras por tema
  drawThemeExtras(c, room, p);

  // decoração baixa/rentemente ao chão fica no fundo cacheado
  const t0 = 0;
  for (const d of room.decor) {
    if (!isTallDecor(d)) drawDecor(c, d, t0, room);
  }
}

/* Objetos altos são desenhados por cima do cenário a cada quadro,
   ordenados pela base (y), para o jogador poder passar por trás deles. */
const TALL_DECOR = new Set([
  'tree',
  'deadtree',
  'bush',
  'hedge',
  'school',
  'sign',
  'column',
  'pillar',
  'barrel',
  'crate',
  'tomb',
  'stalagmite',
  'crystal',
  'chest',
  'throne',
  'rock',
  'portrait',
  'tomb_richard',
  'radio_lito',
  'bust_marx',
  'temple_column',
  'fountain_lito',
  'bookshelf',
  'desk_marx',
  'podium_senna',
  'flag_checkered',
  'bust_trotsky',
  'banner_red',
  'desk_archive',
  'train_model',
  'dark_fountain',
  'hooded_figure',
  'dark_crystal',
  'mine_block',
  'diamond_ore',
  'creeper_block',
  'verity_orb',
  'pickaxe_rack',
  'obby_platform',
  'lava_block',
  'noob_statue',
  'checkpoint_flag',
  'figure_shelf',
  'stream_desk',
  'ring_light',
  'live_camera',
  'gaming_chair',
  'pc_tower',
  'save_star',
  'terminal_v',
  'egg_alien',
  'batsignal',
  'arc_reactor',
  'web_anchor',
  'myers_figure',
  'phone_scare',
  'question_block',
  'crt_tv',
  'tape_shelf',
  'beanbag',
  'poster_key',
  'ice_pillar',
]);

function isTallDecor(d) {
  return TALL_DECOR.has(d.type);
}

function drawFloorTexture(c, room, p) {
  const rng = mulberry32(hashString(room.id + '_floor'));
  const x = INNER.x, y = INNER.y, w = INNER.r - INNER.x, h = INNER.b - INNER.y;

  const theme = room.theme;
  if (theme === 'castle' || theme === 'castleExt' || theme === 'crypt' || theme === 'ruins') {
    // lajotas
    const size = theme === 'crypt' ? 22 : 26;
    for (let yy = y; yy < y + h; yy += size) {
      for (let xx = x; xx < x + w; xx += size) {
        const alt = ((xx / size) | 0) + ((yy / size) | 0);
        px(c, xx, yy, size - 1, size - 1, alt % 2 ? p.floor : p.floor2);
      }
    }
    // linhas
    c.fillStyle = 'rgba(0,0,0,0.18)';
    for (let yy = y; yy < y + h; yy += size) c.fillRect(x, yy, w, 1);
    for (let xx = x; xx < x + w; xx += size) c.fillRect(xx, y, 1, h);
  } else if (theme === 'cabin') {
    for (let yy = y; yy < y + h; yy += 9) {
      px(c, x, yy, w, 1, p.floor2);
      px(c, x, yy + 1, w, 1, p.floor3);
    }
  } else if (theme === 'temple') {
    // lajotas grandes de mármore com veios claros e escuros
    const size = 26;
    for (let yy = y; yy < y + h; yy += size) {
      for (let xx = x; xx < x + w; xx += size) {
        const alt = ((xx - x) / size | 0) + ((yy - y) / size | 0);
        px(c, xx, yy, size - 1, size - 1, alt % 3 === 0 ? p.floor3 : alt % 2 ? p.floor : p.floor2);
      }
    }
    // juntas finas
    c.fillStyle = 'rgba(60,55,44,0.28)';
    for (let yy = y; yy < y + h; yy += size) c.fillRect(x, yy, w, 1);
    for (let xx = x; xx < x + w; xx += size) c.fillRect(xx, y, 1, h);
    // veios do mármore: linhas curtas claras e escuras
    c.strokeStyle = 'rgba(255,255,255,0.16)';
    c.lineWidth = 1;
    for (let i = 0; i < 22; i++) {
      const vx = x + rng() * w;
      const vy = y + rng() * h;
      const len = 5 + rng() * 12;
      c.beginPath();
      c.moveTo(Math.round(vx), Math.round(vy));
      c.lineTo(Math.round(vx + len * 0.6), Math.round(vy + len * 0.5));
      c.lineTo(Math.round(vx + len), Math.round(vy + len * 0.35));
      c.stroke();
    }
    c.strokeStyle = 'rgba(70,64,52,0.18)';
    for (let i = 0; i < 14; i++) {
      const vx = x + rng() * w;
      const vy = y + rng() * h;
      const len = 4 + rng() * 10;
      c.beginPath();
      c.moveTo(Math.round(vx), Math.round(vy));
      c.lineTo(Math.round(vx + len * 0.7), Math.round(vy - len * 0.4));
      c.stroke();
    }
    speckle(c, x, y, w, h, '#efe9da', 70, rng, 1);
    speckle(c, x, y, w, h, '#b0a998', 50, rng, 1);
    // brilho suave no centro do piso
    const gl = c.createRadialGradient(200, 160, 10, 200, 160, 130);
    gl.addColorStop(0, 'rgba(255,250,235,0.10)');
    gl.addColorStop(1, 'rgba(255,250,235,0)');
    c.fillStyle = gl;
    c.fillRect(x, y, w, h);
  } else if (theme === 'library') {
    // tábuas horizontais de madeira escura
    for (let yy = y; yy < y + h; yy += 9) {
      px(c, x, yy, w, 1, p.floor2);
      px(c, x, yy + 1, w, 1, p.floor3);
      // emendas verticais alternadas
      const off = ((yy - y) / 9) % 2 ? 36 : 12;
      c.fillStyle = 'rgba(20,14,8,0.5)';
      for (let xx = x + off; xx < x + w; xx += 74) c.fillRect(xx, yy, 1, 9);
    }
    // veios
    speckle(c, x, y, w, h, '#2e2317', 90, rng, 1);
    speckle(c, x, y, w, h, '#6a5238', 45, rng, 1);
  } else if (theme === 'race') {
    // asfalto escuro com grão e faixa central quadriculada
    speckle(c, x, y, w, h, '#202226', 160, rng, 1);
    speckle(c, x, y, w, h, '#3f434a', 70, rng, 1);
    // área quadriculada central (não alcança as portas)
    const cx0 = 60, cx1 = 340, cy0 = 110, cy1 = 220, tile = 10;
    const lx = Math.max(x, cx0), rx = Math.min(x + w, cx1);
    const ly = Math.max(y, cy0), ry = Math.min(y + h, cy1);
    for (let yy = ly; yy < ry; yy += tile) {
      for (let xx = lx; xx < rx; xx += tile) {
        const alt = ((xx - cx0) / tile | 0) + ((yy - cy0) / tile | 0);
        px(c, xx, yy, tile, tile, alt % 2 ? '#202226' : '#cfd3d8');
      }
    }
    // suaviza o contraste do xadrez para não ofuscar os sprites
    c.fillStyle = 'rgba(20,22,26,0.32)';
    c.fillRect(lx, ly, rx - lx, ry - ly);
    // linha de largada na borda inferior do xadrez
    c.fillStyle = 'rgba(220,224,230,0.75)';
    for (let xx = lx; xx < rx; xx += 20) c.fillRect(xx, ry - 3, 10, 2);
    // marcas de pista (faixas desgastadas)
    c.fillStyle = 'rgba(200,206,214,0.08)';
    c.fillRect(cx0, 96, cx1 - cx0, 2);
    c.fillRect(cx0, 234, cx1 - cx0, 2);
  } else if (theme === 'void') {
    speckle(c, x, y, w, h, '#1b2233', 90, rng, 1);
    speckle(c, x, y, w, h, '#2b3550', 30, rng, 1);
  } else if (theme === 'archive') {
    // tábuas horizontais escuras com veios e emendas
    for (let yy = y; yy < y + h; yy += 9) {
      const alt = ((yy - y) / 9) % 2;
      px(c, x, yy, w, 8, alt ? p.floor2 : p.floor);
      px(c, x, yy, w, 1, '#241814');
      px(c, x, yy + 1, w, 1, alt ? p.floor3 : '#453026');
      const off = ((yy - y) / 9) % 2 ? 30 : 8;
      c.fillStyle = 'rgba(16,10,8,0.55)';
      for (let xx = x + off; xx < x + w; xx += 66) c.fillRect(xx, yy, 1, 9);
    }
    // veios
    speckle(c, x, y, w, h, '#241811', 110, rng, 1);
    speckle(c, x, y, w, h, '#5a3f30', 60, rng, 1);
    c.fillStyle = 'rgba(120,86,60,0.16)';
    for (let i = 0; i < 26; i++) {
      const gx = x + rng() * w;
      const gy = y + rng() * h;
      c.fillRect(Math.round(gx), Math.round(gy), 4 + Math.floor(rng() * 9), 1);
    }
    // runner central vinho
    const rx0 = 174, rx1 = 226;
    px(c, rx0, y, rx1 - rx0, h, 'rgba(0,0,0,0.35)');
    px(c, rx0 + 2, y, rx1 - rx0 - 4, h, '#4a1a22');
    px(c, rx0 + 5, y, rx1 - rx0 - 10, h, '#5e222a');
    c.fillStyle = 'rgba(201,162,74,0.30)';
    c.fillRect(rx0 + 2, y, 1, h);
    c.fillRect(rx1 - 3, y, 1, h);
    c.fillStyle = 'rgba(201,162,74,0.16)';
    for (let yy = y + 8; yy < y + h - 6; yy += 24) c.fillRect(rx0 + 10, yy, 32, 1);
  } else if (theme === 'obby') {
    // piso escuro com studs claros em grade
    px(c, x, y, w, h, p.floor);
    dither(c, x, y, w, h, p.floor2, 8, 0);
    dither(c, x, y, w, h, p.floor3, 10, 1);
    const step = 16;
    for (let yy = y + 6; yy < y + h; yy += step) {
      for (let xx = x + 8; xx < x + w; xx += step) {
        // não desenhar studs em cima das portas
        if (xx > 330 && Math.abs(yy - DOOR_CY) < 30) continue;
        if (xx > 170 && xx < 230 && yy > INNER.b - 32) continue;
        px(c, xx, yy, 3, 1, 'rgba(140,170,230,0.22)');
        px(c, xx, yy + 1, 1, 2, 'rgba(10,12,22,0.45)');
      }
    }
    // blocos coloridos esparsos no chão (determinístico, longe das portas)
    const colors = ['#3a6ac9', '#c94a8a', '#4ac9a0', '#d9b24a', '#7a5ae0'];
    for (let i = 0; i < 9; i++) {
      const bx = x + 12 + ((i * 71 + 23) % (w - 24));
      const by = y + 14 + ((i * 47 + 19) % (h - 28));
      if (bx > 330 && Math.abs(by - DOOR_CY) < 34) continue;
      if (bx > 168 && bx < 232 && by > INNER.b - 40) continue;
      const col = colors[(i + room.id.length) % colors.length];
      px(c, bx, by, 9, 9, 'rgba(0,0,0,0.35)');
      px(c, bx - 1, by - 1, 8, 8, col);
      px(c, bx - 1, by - 1, 8, 1, 'rgba(255,255,255,0.28)');
      px(c, bx - 1, by + 6, 8, 1, 'rgba(0,0,0,0.3)');
    }
  } else if (theme === 'studio') {
    // piso de madeira: tábuas largas, juntas discretas e veios quentes
    px(c, x, y, w, h, p.floor);
    speckle(c, x, y, w, h, p.floor2, 150, rng, 1);
    speckle(c, x, y, w, h, p.floor3, 70, rng, 1);
    const plankH = 18;
    for (let yy = y; yy < y + h; yy += plankH) {
      // sombra da junta entre tábuas
      c.fillStyle = 'rgba(20,12,8,0.42)';
      c.fillRect(x, yy, w, 1);
      c.fillStyle = 'rgba(120,88,60,0.18)';
      c.fillRect(x, yy + 1, w, 1);
      // emenda curta alternada (madeira corrida)
      const row = ((yy - y) / plankH) | 0;
      const jx = x + 40 + ((row * 83 + 37) % (w - 80));
      c.fillStyle = 'rgba(20,12,8,0.32)';
      c.fillRect(jx, yy, 1, plankH);
      // veios sutis
      c.fillStyle = 'rgba(122,90,62,0.13)';
      c.fillRect(x + 14 + ((row * 57) % 60), yy + 7, 26, 1);
      c.fillRect(x + w - 96 + ((row * 31) % 50), yy + 12, 18, 1);
    }
    // brilho roxo ambiente suave vindo do LED
    const gl = c.createRadialGradient(200, 96, 12, 200, 96, 170);
    gl.addColorStop(0, 'rgba(150,90,220,0.10)');
    gl.addColorStop(1, 'rgba(150,90,220,0)');
    c.fillStyle = gl;
    c.fillRect(x, y, w, h);
    // luz quente do ring light no canto esquerdo
    const wl = c.createRadialGradient(70, 150, 8, 70, 150, 130);
    wl.addColorStop(0, 'rgba(255,206,140,0.11)');
    wl.addColorStop(1, 'rgba(255,206,140,0)');
    c.fillStyle = wl;
    c.fillRect(x, y, w, h);
  } else if (theme === 'ice') {
    // lajotas de pedra clara/gelo azulado-esbranquiçado com trincas
    const size = 22;
    for (let yy = y; yy < y + h; yy += size) {
      for (let xx = x; xx < x + w; xx += size) {
        const alt = ((xx - x) / size | 0) + ((yy - y) / size | 0);
        px(c, xx, yy, size - 1, size - 1, alt % 3 === 0 ? p.floor3 : alt % 2 ? p.floor : p.floor2);
      }
    }
    // juntas frias
    c.fillStyle = 'rgba(24,38,58,0.38)';
    for (let yy = y; yy < y + h; yy += size) c.fillRect(x, yy, w, 1);
    for (let xx = x; xx < x + w; xx += size) c.fillRect(xx, y, 1, h);
    // trincas serrilhadas (determinísticas)
    c.strokeStyle = 'rgba(38,56,80,0.55)';
    c.lineWidth = 1;
    for (let i = 0; i < 9; i++) {
      let cx0 = x + 18 + rng() * (w - 36);
      let cy0 = y + 14 + rng() * (h - 28);
      c.beginPath();
      c.moveTo(Math.round(cx0), Math.round(cy0));
      const segs = 3 + ((rng() * 3) | 0);
      for (let sN = 0; sN < segs; sN++) {
        cx0 += (rng() - 0.35) * 26;
        cy0 += 6 + rng() * 12;
        c.lineTo(Math.round(cx0), Math.round(cy0));
      }
      c.stroke();
    }
    // veios de gelo e brilhos
    c.strokeStyle = 'rgba(255,255,255,0.35)';
    for (let i = 0; i < 7; i++) {
      const gx = x + rng() * w, gy = y + rng() * h, len = 6 + rng() * 12;
      c.beginPath();
      c.moveTo(Math.round(gx), Math.round(gy));
      c.lineTo(Math.round(gx + len), Math.round(gy + (rng() - 0.5) * 4));
      c.stroke();
    }
    speckle(c, x, y, w, h, '#e8f2f8', 80, rng, 1);
    speckle(c, x, y, w, h, '#7f95ab', 45, rng, 1);
    // reflexo frio central
    const gl = c.createRadialGradient(200, 160, 10, 200, 160, 135);
    gl.addColorStop(0, 'rgba(215,238,252,0.16)');
    gl.addColorStop(1, 'rgba(215,238,252,0)');
    c.fillStyle = gl;
    c.fillRect(x, y, w, h);
  } else if (theme === 'treasure') {
    speckle(c, x, y, w, h, p.floor3, 120, rng, 1);
    speckle(c, x, y, w, h, p.floor2, 100, rng, 1);
  } else {
    // grama / terra com dither
    dither(c, x, y, w, h, p.floor2, 6, 0);
    dither(c, x, y, w, h, p.floor3, 8, 1);
    speckle(c, x, y, w, h, p.floor2, 120, rng, 1);
    speckle(c, x, y, w, h, p.floor3, 70, rng, 1);
  }

  // sombra interna nas bordas
  c.fillStyle = 'rgba(0,0,0,0.28)';
  c.fillRect(x, y, w, 2);
  c.fillRect(x, y + h - 2, w, 2);
  c.fillRect(x, y, 2, h);
  c.fillRect(x + w - 2, y, 2, h);
}

function drawWallBand(c, room, p) {
  const style = WALL_STYLE[room.theme] || 'brick';
  const band = 14;

  // base (apenas a moldura, preservando o piso)
  px(c, ROOM.x, ROOM.y, ROOM.w, band, p.wall);
  px(c, ROOM.x, ROOM.y + ROOM.h - band, ROOM.w, band, p.wall);
  px(c, ROOM.x, ROOM.y + band, band, ROOM.h - band * 2, p.wall);
  px(c, ROOM.x + ROOM.w - band, ROOM.y + band, band, ROOM.h - band * 2, p.wall);

  // textura por estilo, desenhando apenas a moldura
  const bands = [
    { x: ROOM.x, y: ROOM.y, w: ROOM.w, h: band },
    { x: ROOM.x, y: ROOM.y + ROOM.h - band, w: ROOM.w, h: band },
    { x: ROOM.x, y: ROOM.y, w: band, h: ROOM.h },
    { x: ROOM.x + ROOM.w - band, y: ROOM.y, w: band, h: ROOM.h },
  ];

  c.save();
  for (const b of bands) {
    c.beginPath();
    c.rect(b.x, b.y, b.w, b.h);
    c.clip();
    if (style === 'brick') {
      const bh = 7, bw = 17;
      for (let yy = b.y; yy < b.y + b.h; yy += bh) {
        const off = ((yy - b.y) / bh) % 2 ? 8 : 0;
        for (let xx = b.x - bw; xx < b.x + b.w; xx += bw) {
          px(c, xx + off, yy, bw - 1, bh - 1, ((yy / bh) | 0) % 2 ? p.wall2 : p.wall);
        }
      }
      c.fillStyle = 'rgba(255,255,255,0.06)';
      for (let yy = b.y; yy < b.y + b.h; yy += 7) c.fillRect(b.x, yy, b.w, 1);
    } else if (style === 'wood') {
      for (let yy = b.y; yy < b.y + b.h; yy += 6) {
        px(c, b.x, yy, b.w, 1, p.wall2);
        px(c, b.x, yy + 1, b.w, 1, p.wall3);
      }
      c.fillStyle = 'rgba(0,0,0,0.3)';
      for (let xx = b.x; xx < b.x + b.w; xx += 24) c.fillRect(xx, b.y, 1, b.h);
    } else if (style === 'ice') {
      // blocos de gelo azul-escuro/roxo com reflexo superior, fendas e brilhos
      const bh = 8, bw = 22;
      for (let yy = b.y; yy < b.y + b.h; yy += bh) {
        const off = ((yy - b.y) / bh) % 2 ? 11 : 0;
        for (let xx = b.x - bw; xx < b.x + b.w; xx += bw) {
          const alt = Math.abs(((xx + off) / bw) | 0) % 2;
          px(c, xx + off, yy, bw - 1, bh - 1, alt ? p.wall : p.wall2);
          px(c, xx + off, yy, bw - 1, 1, p.wall3);
          px(c, xx + off, yy, 1, bh - 1, 'rgba(140,165,220,0.28)');
        }
      }
      // fendas e reflexos congelados
      const rng2 = mulberry32(hashString(room.id + '_icewall' + b.x + '_' + b.y));
      c.strokeStyle = 'rgba(168,205,240,0.30)';
      for (let i = 0; i < 6; i++) {
        const fx = b.x + rng2() * b.w, fy = b.y + rng2() * b.h;
        c.beginPath();
        c.moveTo(Math.round(fx), Math.round(fy));
        c.lineTo(Math.round(fx + (rng2() - 0.5) * 14), Math.round(fy + (rng2() - 0.5) * 6));
        c.stroke();
      }
      c.fillStyle = 'rgba(220,240,255,0.22)';
      for (let i = 0; i < 10; i++) {
        c.fillRect(Math.round(b.x + rng2() * b.w), Math.round(b.y + rng2() * b.h), 2, 1);
      }
    } else if (style === 'organic') {
      const rng = mulberry32(hashString(room.id + '_wall'));
      for (let i = 0; i < 70; i++) {
        const xx = b.x + rng() * b.w;
        const yy = b.y + rng() * b.h;
        pixelCircle(c, xx, yy, 3 + rng() * 4, i % 3 ? p.wall2 : p.wall3);
      }
    } else {
      // rock
      const rng = mulberry32(hashString(room.id + '_wall'));
      for (let i = 0; i < 60; i++) {
        const xx = b.x + rng() * b.w;
        const yy = b.y + rng() * b.h;
        pixelEllipse(c, xx, yy, 4 + rng() * 6, 3 + rng() * 4, i % 3 ? p.wall2 : p.wall3);
      }
    }
    c.restore();
    c.save();
  }
  c.restore();

  // luz/realce na quina interna
  c.fillStyle = 'rgba(255,255,255,0.08)';
  c.fillRect(INNER.x - 1, INNER.y - 1, INNER.r - INNER.x + 2, 1);
  c.fillRect(INNER.x - 1, INNER.y - 1, 1, INNER.b - INNER.y + 2);

  // sombra na base da parede
  c.fillStyle = 'rgba(0,0,0,0.35)';
  c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, 1);
  c.fillRect(INNER.x, INNER.y, 1, INNER.b - INNER.y);

  // ameias decorativas em salas de castelo
  if (room.theme === 'castleExt') {
    for (let xx = ROOM.x + 8; xx < ROOM.x + ROOM.w - 8; xx += 26) {
      px(c, xx, ROOM.y - 3, 12, 5, p.wall3);
      px(c, xx + 2, ROOM.y - 1, 8, 3, p.wall);
    }
  }
}

function drawDoorPassages(c, room, p) {
  const half = DOOR_GAP / 2;
  const port = '#0a0c10';
  const portLight = '#1a1f26';

  const draw = (x, y, w, h, dir) => {
    px(c, x, y, w, h, port);
    // escadas / profundidade
    if (dir === 'north' || dir === 'south') {
      for (let i = 0; i < 4; i++) {
        const yy = dir === 'north' ? y + i * 3 : y + h - (i + 1) * 3;
        px(c, x + 4 + i * 2, yy, w - 8 - i * 4, 2, i % 2 ? portLight : '#131820');
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const xx = dir === 'west' ? x + i * 3 : x + w - (i + 1) * 3;
        px(c, xx, y + 4 + i * 2, 2, h - 8 - i * 4, i % 2 ? portLight : '#131820');
      }
    }
  };

  if (room.exits.north) {
    draw(DOOR_CX - half, ROOM.y, DOOR_GAP, INNER.y - ROOM.y + 2, 'north');
    // luz
    px(c, DOOR_CX - half + 2, INNER.y - 1, DOOR_GAP - 4, 2, 'rgba(230,187,79,0.25)');
  }
  if (room.exits.south) {
    draw(DOOR_CX - half, INNER.b - 2, DOOR_GAP, ROOM.y + ROOM.h - INNER.b + 2, 'south');
    px(c, DOOR_CX - half + 2, INNER.b - 1, DOOR_GAP - 4, 2, 'rgba(230,187,79,0.25)');
  }
  if (room.exits.west) {
    draw(ROOM.x, DOOR_CY - half, INNER.x - ROOM.x + 2, DOOR_GAP, 'west');
    px(c, INNER.x - 1, DOOR_CY - half + 2, 2, DOOR_GAP - 4, 'rgba(230,187,79,0.25)');
  }
  if (room.exits.east) {
    draw(INNER.r - 2, DOOR_CY - half, ROOM.x + ROOM.w - INNER.r + 2, DOOR_GAP, 'east');
    px(c, INNER.r - 1, DOOR_CY - half + 2, 2, DOOR_GAP - 4, 'rgba(230,187,79,0.25)');
  }
}

function drawPaths(c, room, p) {
  const theme = room.theme;
  const pathThemes = ['forest', 'maze', 'ruins', 'swamp', 'graveyard'];
  if (!pathThemes.includes(theme)) return;

  const half = 15;
  const cx = 200, cy = 159;

  if (room.exits.north) {
    px(c, cx - half, INNER.y, half * 2, cy - INNER.y, p.path);
    dither(c, cx - half, INNER.y, half * 2, cy - INNER.y, p.path2, 5, 0);
  }
  if (room.exits.south) {
    px(c, cx - half, cy, half * 2, INNER.b - cy, p.path);
    dither(c, cx - half, cy, half * 2, INNER.b - cy, p.path2, 5, 0);
  }
  if (room.exits.west) {
    px(c, INNER.x, cy - half, cx - INNER.x, half * 2, p.path);
    dither(c, INNER.x, cy - half, cx - INNER.x, half * 2, p.path2, 5, 1);
  }
  if (room.exits.east) {
    px(c, cx, cy - half, INNER.r - cx, half * 2, p.path);
    dither(c, cx, cy - half, INNER.r - cx, half * 2, p.path2, 5, 1);
  }
  // centro
  px(c, cx - half, cy - half, half * 2, half * 2, p.path);
  dither(c, cx - half, cy - half, half * 2, half * 2, p.path2, 5, 1);
}

function drawThemeExtras(c, room, p) {
  const theme = room.theme;

  if (theme === 'bridge') {
    // rio atravessando a sala
    const y0 = 128, y1 = 196;
    px(c, INNER.x, y0, INNER.r - INNER.x, y1 - y0, '#22384a');
    dither(c, INNER.x, y0, INNER.r - INNER.x, y1 - y0, '#2d4a60', 5, 0);
    c.fillStyle = '#3d5a6e';
    for (let i = 0; i < 8; i++) {
      const xx = INNER.x + 12 + i * 46;
      c.fillRect(xx, y0 + 8 + (i % 3) * 14, 16, 1);
    }
    // margens
    px(c, INNER.x, y0 - 3, INNER.r - INNER.x, 3, '#5a5140');
    px(c, INNER.x, y1, INNER.r - INNER.x, 3, '#5a5140');
    // ponte de madeira em cruz
    px(c, 168, y0 - 8, 64, y1 - y0 + 16, '#6a4b2e');
    for (let yy = y0 - 8; yy < y1 + 8; yy += 7) {
      px(c, 169, yy, 62, 1, '#7a5836');
      px(c, 169, yy + 1, 62, 1, '#4c3520');
    }
    px(c, 150, 140, 100, 44, '#6a4b2e');
    for (let xx = 150; xx < 250; xx += 7) {
      px(c, xx, 141, 1, 42, '#7a5836');
    }
    // cordas
    px(c, 168, y0 - 8, 2, y1 - y0 + 16, '#3d2a18');
    px(c, 230, y0 - 8, 2, y1 - y0 + 16, '#3d2a18');
  }

  if (theme === 'lake') {
    // grande massa d'água
    pixelEllipse(c, 120, 112, 74, 46, '#22384a');
    pixelEllipse(c, 120, 112, 66, 38, '#274356');
    pixelEllipse(c, 292, 208, 82, 54, '#22384a');
    pixelEllipse(c, 292, 208, 74, 46, '#274356');
    // margens
    c.fillStyle = '#5d6244';
    for (let i = 0; i < 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      px(c, 120 + Math.cos(a) * 78, 112 + Math.sin(a) * 50, 3, 2, '#5d6244');
      px(c, 292 + Math.cos(a) * 86, 208 + Math.sin(a) * 58, 3, 2, '#5d6244');
    }
  }

  if (theme === 'void') {
    // plataforma de rocha
    c.fillStyle = 'rgba(0,0,0,0.6)';
    pixelEllipse(c, 200, 162, 168, 110, 'rgba(0,0,0,0.5)');
    pixelEllipse(c, 200, 160, 158, 100, '#1b1f28');
    pixelEllipse(c, 200, 158, 148, 92, '#252a36');
  }

  if (theme === 'castleExt') {
    // brasões nas paredes
    drawBannerShape(c, 120, 34);
    drawBannerShape(c, 280, 34);
  }

  if (theme === 'treasure') {
    // brilho dourado no piso
    c.fillStyle = 'rgba(230,187,79,0.06)';
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    // mosaico central
    pixelEllipse(c, 200, 162, 74, 44, 'rgba(230,187,79,0.045)');
    pixelEllipse(c, 200, 162, 60, 34, 'rgba(230,187,79,0.05)');
    // pedestal do cálice
    px(c, 258 - 14, 150, 28, 7, '#4a453c');
    px(c, 258 - 11, 142, 22, 8, '#5a5448');
    px(c, 258 - 8, 136, 16, 6, '#6e6758');
    px(c, 258 - 6, 134, 12, 2, '#8a8272');
    px(c, 258 - 12, 150, 24, 1, '#6e6758');
  }

  if (theme === 'lair') {
    c.fillStyle = 'rgba(200,70,30,0.07)';
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
  }

  if (theme === 'temple') {
    // entablamento de mármore no topo (dentro da faixa da parede)
    px(c, ROOM.x, ROOM.y, ROOM.w, 6, '#d6d0c0');
    px(c, ROOM.x, ROOM.y + 6, ROOM.w, 2, '#a49d8c');
    px(c, ROOM.x, ROOM.y + 8, ROOM.w, 1, '#8a8374');
    // tríglifos
    for (let xx = ROOM.x + 14; xx < ROOM.x + ROOM.w - 10; xx += 26) {
      px(c, xx, ROOM.y + 1, 5, 5, '#b7b0a0');
      px(c, xx + 1, ROOM.y + 1, 1, 5, '#ded8c8');
      px(c, xx + 3, ROOM.y + 1, 1, 5, '#9a9384');
    }
    // friso claro na quina interna
    px(c, INNER.x, INNER.y - 1, INNER.r - INNER.x, 1, 'rgba(255,250,235,0.35)');

    // mosaico no chão ao redor da fonte
    pixelEllipse(c, 200, 172, 84, 46, 'rgba(140,132,112,0.30)');
    pixelEllipse(c, 200, 172, 78, 42, '#c4bdab');
    pixelEllipse(c, 200, 172, 72, 38, '#a9a291');
    pixelEllipse(c, 200, 172, 66, 34, '#cfc9b8');
    c.strokeStyle = 'rgba(201,162,74,0.55)';
    c.lineWidth = 2;
    c.beginPath();
    c.ellipse(200, 172, 70, 36, 0, 0, Math.PI * 2);
    c.stroke();
    c.lineWidth = 1;
    c.strokeStyle = 'rgba(90,84,68,0.45)';
    c.beginPath();
    c.ellipse(200, 172, 61, 31, 0, 0, Math.PI * 2);
    c.stroke();

    // LAUREL discreto ladeando o nome
    const laurel = (lx, dir) => {
      for (let i = 0; i < 5; i++) {
        const lxx = lx + dir * i * 3;
        const lyy = 64 - i * 2 - (i > 2 ? (i - 2) * 2 : 0);
        px(c, lxx, lyy, 3, 2, i % 2 ? '#6f7f52' : '#8a9a62');
        px(c, lxx + dir, lyy - 1, 1, 1, '#a8b878');
      }
    };
    laurel(136, -1);
    laurel(258, 1);

    // NOME em destaque na parede de mármore
    drawText(c, 'LITO SOUZA', 200, 55, {
      scale: 2,
      color: '#8a6a20',
      align: 'center',
      outline: '#3a3020',
      shadow: 'rgba(0,0,0,0.35)',
    });
    drawText(c, 'LITO SOUZA', 200, 54, {
      scale: 2,
      color: '#e6c26a',
      align: 'center',
    });
  }

  if (theme === 'library') {
    // painéis de madeira entalhada nas paredes
    const panel = (px0, py0, pw, ph) => {
      px(c, px0, py0, pw, ph, '#463628');
      px(c, px0 + 1, py0 + 1, pw - 2, ph - 2, '#51402f');
      px(c, px0 + 2, py0 + 2, pw - 4, ph - 4, '#3a2d22');
      px(c, px0 + 2, py0 + 2, pw - 4, 1, '#6a5238');
    };
    panel(58, 33, 78, 11);
    panel(264, 33, 78, 11);
    panel(33, 96, 10, 56);
    panel(357, 96, 10, 56);
    // iluminação quente de biblioteca
    c.fillStyle = 'rgba(230,160,70,0.05)';
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    for (const gx of [70, 330]) {
      const gg = c.createRadialGradient(gx, 70, 4, gx, 70, 84);
      gg.addColorStop(0, 'rgba(255,175,80,0.18)');
      gg.addColorStop(1, 'rgba(255,175,80,0)');
      c.fillStyle = gg;
      c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    }
    // tapete central (sob a mesa/busto)
    pixelEllipse(c, 200, 192, 92, 52, 'rgba(60,20,24,0.55)');
  }

  if (theme === 'race') {
    // faixa quadriculada na parede superior
    for (let xx = ROOM.x + 6; xx < ROOM.x + ROOM.w - 6; xx += 6) {
      const alt = ((xx - ROOM.x) / 6) | 0;
      px(c, xx, ROOM.y + 2, 6, 6, alt % 2 ? '#e8e8e8' : '#1a1c20');
    }
    px(c, ROOM.x, ROOM.y + 8, ROOM.w, 1, 'rgba(0,0,0,0.55)');
    // bandeirinhas quadriculadas nas paredes
    const pennant = (fx) => {
      px(c, fx - 1, ROOM.y + 9, 1, 5, '#8a9098');
      for (let ry = 0; ry < 3; ry++) {
        for (let rx = 0; rx < 4; rx++) {
          const alt = rx + ry;
          px(c, fx + rx * 4, ROOM.y + 10 + ry * 4, 4, 4, alt % 2 ? '#e8e8e8' : '#1a1c20');
        }
      }
    };
    pennant(126);
    pennant(258);
    // piso: brilho no pódio
    const pg = c.createRadialGradient(200, 158, 8, 200, 158, 66);
    pg.addColorStop(0, 'rgba(255,220,120,0.10)');
    pg.addColorStop(1, 'rgba(255,220,120,0)');
    c.fillStyle = pg;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
  }

  if (theme === 'archive') {
    // painéis de madeira e prateleiras ao fundo
    const panel = (px0, py0, pw, ph) => {
      px(c, px0, py0, pw, ph, '#3a241a');
      px(c, px0 + 1, py0 + 1, pw - 2, ph - 2, '#4a3022');
      px(c, px0 + 2, py0 + 2, pw - 4, ph - 4, '#2a1a12');
      px(c, px0 + 2, py0 + 2, pw - 4, 1, '#6a4a34');
      px(c, px0 + pw / 2, py0 + 2, 1, ph - 4, '#241610');
    };
    panel(52, 34, 44, 10);
    panel(304, 34, 44, 10);
    panel(33, 92, 10, 62);
    panel(357, 92, 10, 62);
    // prateleira alta ao fundo, entre os livros e o banner
    px(c, 142, 46, 26, 2, '#5a3b28');
    px(c, 232, 46, 26, 2, '#5a3b28');
    // lustre/luz quente
    const glow = c.createRadialGradient(200, 74, 6, 200, 74, 128);
    glow.addColorStop(0, 'rgba(255,175,80,0.20)');
    glow.addColorStop(0.55, 'rgba(230,140,60,0.07)');
    glow.addColorStop(1, 'rgba(230,140,60,0)');
    c.fillStyle = glow;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    for (const gx of [70, 330]) {
      const gg = c.createRadialGradient(gx, 66, 4, gx, 66, 70);
      gg.addColorStop(0, 'rgba(255,190,90,0.16)');
      gg.addColorStop(1, 'rgba(255,190,90,0)');
      c.fillStyle = gg;
      c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    }
    // NOME legível na parede (dourado com contorno vermelho escuro)
    drawText(c, 'TRÓTSKI', 200, 33, {
      scale: 2,
      color: '#a3282c',
      align: 'center',
      outline: '#1a0c0a',
    });
    drawText(c, 'TRÓTSKI', 200, 32, {
      scale: 2,
      color: '#e6c26a',
      align: 'center',
      outline: '#4a1010',
      shadow: 'rgba(0,0,0,0.45)',
    });
    // frase original curta no piso
    drawText(c, 'A HISTÓRIA NÃO TERMINA', 200, 254, {
      scale: 1,
      color: '#a98a4a',
      align: 'center',
      outline: '#241410',
    });
    c.fillStyle = 'rgba(201,162,74,0.22)';
    c.fillRect(146, 262, 108, 1);
  }

  if (theme === 'obby') {
    // moldura blocky com studs
    c.fillStyle = 'rgba(90,120,200,0.20)';
    for (let xx = ROOM.x + 6; xx < ROOM.x + ROOM.w - 4; xx += 12) {
      c.fillRect(xx, ROOM.y + 4, 2, 2);
      c.fillRect(xx, ROOM.y + ROOM.h - 8, 2, 2);
    }
    for (let yy = ROOM.y + 18; yy < ROOM.y + ROOM.h - 16; yy += 12) {
      c.fillRect(ROOM.x + 5, yy, 2, 2);
      c.fillRect(ROOM.x + ROOM.w - 7, yy, 2, 2);
    }
    // blocos de canto coloridos
    const accents = [['#3a6ac9', 16, 36], ['#c94a8a', 374, 36], ['#4ac9a0', 16, 276], ['#d9b24a', 374, 276]];
    for (const [col, ax, ay] of accents) {
      px(c, ax - 4, ay - 4, 8, 8, 'rgba(0,0,0,0.4)');
      px(c, ax - 3, ay - 3, 6, 6, col);
      px(c, ax - 3, ay - 3, 6, 1, 'rgba(255,255,255,0.3)');
    }
    // brilho de lava no fundo
    const lg = c.createRadialGradient(200, 258, 8, 200, 258, 110);
    lg.addColorStop(0, 'rgba(255,110,40,0.18)');
    lg.addColorStop(1, 'rgba(255,110,40,0)');
    c.fillStyle = lg;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    // placa "OBBY PERDIDO" na parede norte
    px(c, 132, 32, 136, 14, 'rgba(8,10,20,0.9)');
    px(c, 132, 32, 136, 1, '#5ae8f0');
    px(c, 132, 45, 136, 1, '#c94a8a');
    drawText(c, 'OBBY PERDIDO', 200, 32, {
      scale: 2,
      color: '#e8f4ff',
      align: 'center',
      outline: '#122040',
    });
  }

  if (theme === 'studio') {
    // parede de fundo do quarto (lavanda/cinza-quente) com rodapé claro
    const wallH = 70; // de INNER.y até a linha do rodapé
    const wallB = INNER.y + wallH;
    px(c, INNER.x, INNER.y, INNER.r - INNER.x, wallH, p.wall);
    // painéis de parede discretos
    c.fillStyle = 'rgba(255,255,255,0.045)';
    for (let xx = INNER.x + 26; xx < INNER.r - 10; xx += 74) c.fillRect(xx, INNER.y, 1, wallH - 5);
    // sombra no alto e luz quente perto do rodapé
    const wg = c.createLinearGradient(0, INNER.y, 0, wallB);
    wg.addColorStop(0, 'rgba(24,16,34,0.26)');
    wg.addColorStop(0.55, 'rgba(24,16,34,0)');
    wg.addColorStop(1, 'rgba(130,96,74,0.16)');
    c.fillStyle = wg;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, wallH);
    // rodapé
    px(c, INNER.x, wallB - 4, INNER.r - INNER.x, 4, '#b8b1a4');
    px(c, INNER.x, wallB - 4, INNER.r - INNER.x, 1, '#d6cfc0');
    px(c, INNER.x, wallB, INNER.r - INNER.x, 2, 'rgba(24,16,20,0.4)');

    // fita de LED roxa no alto da parede, com brilho suave
    const glow = c.createLinearGradient(0, ROOM.y, 0, ROOM.y + 64);
    glow.addColorStop(0, 'rgba(150,86,235,0.22)');
    glow.addColorStop(1, 'rgba(150,86,235,0)');
    c.fillStyle = glow;
    c.fillRect(INNER.x, ROOM.y, INNER.r - INNER.x, 64);
    // fita física (1px) e halo quente imediato
    px(c, INNER.x + 2, ROOM.y + 1, INNER.r - INNER.x - 4, 1, 'rgba(196,140,255,0.85)');
    px(c, INNER.x + 2, ROOM.y + 2, INNER.r - INNER.x - 4, 1, 'rgba(120,60,200,0.35)');
    // fita desce um pouco pelas laterais
    px(c, INNER.x + 1, INNER.y, 1, 46, 'rgba(180,120,250,0.45)');
    px(c, INNER.r - 2, INNER.y, 1, 46, 'rgba(180,120,250,0.45)');
    // luz quente do ring light no canto esquerdo
    const warm = c.createRadialGradient(70, 78, 10, 70, 78, 96);
    warm.addColorStop(0, 'rgba(255,214,158,0.13)');
    warm.addColorStop(0.55, 'rgba(255,190,120,0.05)');
    warm.addColorStop(1, 'rgba(255,190,120,0)');
    c.fillStyle = warm;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    // reflexo sutil do LED e do ring light no piso
    c.globalAlpha = 0.5;
    pixelEllipse(c, 200, 176, 96, 22, 'rgba(140,80,210,0.07)');
    pixelEllipse(c, 78, 208, 40, 14, 'rgba(255,200,140,0.06)');
    c.globalAlpha = 1;
  }

  if (theme === 'ice') {
    // leve degradê frio no topo
    const tg = c.createLinearGradient(0, ROOM.y, 0, INNER.y + 52);
    tg.addColorStop(0, 'rgba(12,18,38,0.55)');
    tg.addColorStop(0.6, 'rgba(12,18,38,0.12)');
    tg.addColorStop(1, 'rgba(12,18,38,0)');
    c.fillStyle = tg;
    c.fillRect(INNER.x, ROOM.y, INNER.r - INNER.x, INNER.y + 52 - ROOM.y);
    // brilho frio vindo do alto-centro
    const cg = c.createRadialGradient(200, INNER.y, 8, 200, INNER.y, 150);
    cg.addColorStop(0, 'rgba(190,220,245,0.16)');
    cg.addColorStop(1, 'rgba(190,220,245,0)');
    c.fillStyle = cg;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    // névoa fria escorrendo pelas bordas
    c.globalAlpha = 0.10;
    pixelEllipse(c, INNER.x + 38, INNER.b - 4, 70, 10, '#dfeaf2');
    pixelEllipse(c, 200, INNER.b, 96, 9, '#e8f2f8');
    pixelEllipse(c, INNER.r - 38, INNER.b - 4, 70, 10, '#dfeaf2');
    c.globalAlpha = 0.06;
    pixelEllipse(c, INNER.x + 6, 150, 24, 78, '#cfe0ec');
    pixelEllipse(c, INNER.r - 6, 150, 24, 78, '#cfe0ec');
    c.globalAlpha = 1;
    // faíscas congeladas no piso (determinísticas)
    const rngI = mulberry32(hashString(room.id + '_ice_sparkle'));
    for (let i = 0; i < 22; i++) {
      const sx = INNER.x + 10 + rngI() * (INNER.r - INNER.x - 20);
      const sy = INNER.y + 22 + rngI() * (INNER.b - INNER.y - 32);
      c.globalAlpha = 0.25 + rngI() * 0.5;
      c.fillStyle = '#ffffff';
      c.fillRect(Math.round(sx), Math.round(sy), 1, 1);
    }
    c.globalAlpha = 1;
  }

  // detalhes exclusivos das salas de homenagem
  if (room.id === 'fonte_sombria') {
    // brilho escuro/roxo no chão
    const vg = c.createRadialGradient(200, 160, 10, 200, 160, 104);
    vg.addColorStop(0, 'rgba(120,60,190,0.22)');
    vg.addColorStop(1, 'rgba(60,20,110,0)');
    c.fillStyle = vg;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    drawText(c, 'FONTE SOMBRIA', 200, 33, {
      scale: 1,
      color: '#a88ac8',
      align: 'center',
      outline: '#0c0614',
      shadow: 'rgba(0,0,0,0.5)',
    });
  }

  if (room.id === 'mina_esquecida') {
    // iluminação de caverna: quente nas tochas, frio no centro
    const cg = c.createRadialGradient(200, 150, 12, 200, 150, 120);
    cg.addColorStop(0, 'rgba(150,190,210,0.07)');
    cg.addColorStop(1, 'rgba(150,190,210,0)');
    c.fillStyle = cg;
    c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    for (const gx of [70, 330]) {
      const gg = c.createRadialGradient(gx, 70, 4, gx, 70, 76);
      gg.addColorStop(0, 'rgba(255,160,70,0.16)');
      gg.addColorStop(1, 'rgba(255,160,70,0)');
      c.fillStyle = gg;
      c.fillRect(INNER.x, INNER.y, INNER.r - INNER.x, INNER.b - INNER.y);
    }
    // placa de pedra com o nome
    px(c, 114, 31, 172, 15, '#241f26');
    px(c, 115, 32, 170, 13, '#4a444e');
    px(c, 115, 32, 170, 1, '#6e6874');
    px(c, 115, 44, 170, 1, '#1f1b22');
    speckle(c, 115, 32, 170, 13, '#5e5864', 26, mulberry32(hashString(room.id + '_plaque')), 1);
    drawText(c, 'MINA ESQUECIDA', 200, 32, {
      scale: 2,
      color: '#cfd8e8',
      align: 'center',
      outline: '#100c14',
      shadow: 'rgba(0,0,0,0.55)',
    });
  }

  drawTorchBrackets(c, room);
}

/* Rachaduras de passagem secreta: pistas visuais em paredes ainda fechadas.
   A lógica de revelação continua no jogo; aqui só desenhamos a pista.
   As pistas são desenhadas por quadro e só aparecem quando o jogador chega
   bem perto da parede certa, mantendo os segredos realmente escondidos. */
const SECRET_HINT_STYLE = {
  escadaria: { dark: '#241c14', light: '#d2d2c8' },
  fonte: { dark: '#1d231c', light: '#d6e0ce' },
  salao_final: { dark: '#1c1a17', light: '#d6d2c8' },
  sagrario: { dark: '#181614', light: '#cecac0' },
  cemiterio: { dark: '#13150f', light: '#c6d0ba' },
  abismo: { dark: '#080a10', light: '#b8a0ec' },
  serra: { dark: '#141117', light: '#d0cce0' },
  floresta: { dark: '#1d160f', light: '#dee8d6' },
  cabana: { dark: '#1a120a', light: '#ecdcc4' },
  ruinas: { dark: '#2b271f', light: '#cfc9b8' },
};
const SECRET_HINT_RANGE = 56;

function drawSecretHints(c, st, t) {
  const room = st.room;
  if (!room || room.secretRevealed) return;
  const style = SECRET_HINT_STYLE[room.id];
  if (!style) return;
  const pass = room.id === 'escadaria' ? { side: 'east' } : SECRET_PASSAGES[room.id];
  if (!pass) return;

  const wallX = pass.side === 'east' ? INNER.r : pass.side === 'west' ? INNER.x : DOOR_CX;
  const wallY = pass.side === 'north' ? INNER.y : pass.side === 'south' ? INNER.b : DOOR_CY;
  const p = st.player;
  const d = dist(p.x, p.y, wallX, wallY);
  if (d > SECRET_HINT_RANGE) return;

  // Some por completo ao se afastar; fica bem apagada mesmo de perto.
  const near = 1 - d / SECRET_HINT_RANGE;
  let a = 0.06 + near * near * 0.26;
  a *= 0.92 + Math.sin(t * 2.7 + wallX * 0.13) * 0.08;
  if (room.dark) a *= 0.7;

  c.save();
  c.globalAlpha = Math.max(0, Math.min(1, a));
  if (pass.side === 'east') drawCrackEast(c, INNER.r, DOOR_CY, style.dark, style.light);
  else if (pass.side === 'west') drawCrackWest(c, INNER.x, DOOR_CY, style.dark, style.light);
  else if (pass.side === 'north') drawCrackNorth(c, DOOR_CX, INNER.y, style.dark, style.light);
  else drawCrackSouth(c, DOOR_CX, INNER.b, style.dark, style.light);
  c.restore();
}

function drawCrackEast(c, x, cy, dark, light) {
  c.lineWidth = 2;
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(x + 1, cy - 21);
  c.lineTo(x + 6, cy - 12);
  c.lineTo(x + 3, cy + 1);
  c.lineTo(x + 8, cy + 12);
  c.lineTo(x + 4, cy + 22);
  c.stroke();
  c.lineWidth = 1;
  c.strokeStyle = light;
  c.beginPath();
  c.moveTo(x + 2, cy - 20);
  c.lineTo(x + 5, cy - 12);
  c.lineTo(x + 2, cy + 1);
  c.lineTo(x + 7, cy + 12);
  c.stroke();
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(x + 2, cy - 6);
  c.lineTo(x + 10, cy - 2);
  c.lineTo(x + 1, cy + 8);
  c.stroke();
}

function drawCrackSouth(c, cx, y, dark, light) {
  // desenha dentro da faixa da parede sul (y = INNER.b é o topo dela)
  const b = y + 4;
  c.lineWidth = 2;
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(cx - 21, b);
  c.lineTo(cx - 12, b + 4);
  c.lineTo(cx + 1, b + 1);
  c.lineTo(cx + 12, b + 5);
  c.lineTo(cx + 22, b + 2);
  c.stroke();
  c.lineWidth = 1;
  c.strokeStyle = light;
  c.beginPath();
  c.moveTo(cx - 20, b + 1);
  c.lineTo(cx - 12, b + 3);
  c.lineTo(cx + 1, b);
  c.lineTo(cx + 12, b + 4);
  c.stroke();
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(cx - 6, b + 1);
  c.lineTo(cx - 2, b - 3);
  c.lineTo(cx + 8, b);
  c.stroke();
}

function drawCrackWest(c, x, cy, dark, light) {
  // x = INNER.x; a parede fica à esquerda
  c.lineWidth = 2;
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(x - 1, cy - 21);
  c.lineTo(x - 6, cy - 12);
  c.lineTo(x - 3, cy + 1);
  c.lineTo(x - 8, cy + 12);
  c.lineTo(x - 4, cy + 22);
  c.stroke();
  c.lineWidth = 1;
  c.strokeStyle = light;
  c.beginPath();
  c.moveTo(x - 2, cy - 20);
  c.lineTo(x - 5, cy - 12);
  c.lineTo(x - 2, cy + 1);
  c.lineTo(x - 7, cy + 12);
  c.stroke();
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(x - 2, cy - 6);
  c.lineTo(x - 10, cy - 2);
  c.lineTo(x - 1, cy + 8);
  c.stroke();
}

function drawCrackNorth(c, cx, y, dark, light) {
  // y = INNER.y; a parede fica acima
  const b = y - 4;
  c.lineWidth = 2;
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(cx - 21, b);
  c.lineTo(cx - 12, b - 4);
  c.lineTo(cx + 1, b - 1);
  c.lineTo(cx + 12, b - 5);
  c.lineTo(cx + 22, b - 2);
  c.stroke();
  c.lineWidth = 1;
  c.strokeStyle = light;
  c.beginPath();
  c.moveTo(cx - 20, b - 1);
  c.lineTo(cx - 12, b - 3);
  c.lineTo(cx + 1, b);
  c.lineTo(cx + 12, b - 4);
  c.stroke();
  c.strokeStyle = dark;
  c.beginPath();
  c.moveTo(cx - 6, b - 1);
  c.lineTo(cx - 2, b + 3);
  c.lineTo(cx + 8, b);
  c.stroke();
}

function drawTorchBrackets(c, room) {
  for (const t of room.torches) {
    // suporte de parede
    px(c, t.x - 2, t.y + 6, 4, 10, '#2b2b2b');
    px(c, t.x - 4, t.y + 14, 8, 2, '#1a1a1a');
    px(c, t.x - 3, t.y + 4, 6, 4, '#3d3d3d');
  }
}

/* ------------------------------------------------------------------ */
/* Decoração                                                          */
/* ------------------------------------------------------------------ */

function drawDecor(c, d, t, room) {
  const x = d.x, y = d.y;
  switch (d.type) {
    case 'tree': {
      const sway = Math.sin(t * 1.15 + d.seed * 0.05) * 1.1;
      c.fillStyle = 'rgba(0,0,0,0.3)';
      pixelEllipse(c, x + 2, y + 1, 12, 4, 'rgba(0,0,0,0.3)');
      px(c, x - 3, y - 16, 6, 16, '#4a3422');
      px(c, x - 1, y - 16, 2, 16, '#5e442c');
      c.save();
      c.translate(sway, 0);
      pixelCircle(c, x, y - 30, 16, '#1f4326');
      pixelCircle(c, x, y - 30, 13, '#2c5c33');
      pixelCircle(c, x - 5, y - 34, 8, '#3a7040');
      pixelCircle(c, x + 6, y - 28, 7, '#2a5630');
      speckle(c, x - 12, y - 42, 24, 24, '#4d8a4f', 14, mulberry32(d.seed), 1);
      c.restore();
      break;
    }
    case 'bush': {
      pixelCircle(c, x, y - 6, 10, '#1f4326');
      pixelCircle(c, x, y - 7, 8, '#2c5c33');
      pixelCircle(c, x - 3, y - 9, 5, '#3a7040');
      speckle(c, x - 8, y - 13, 16, 12, '#4d8a4f', 8, mulberry32(d.seed), 1);
      break;
    }
    case 'flower': {
      const colors = ['#e8c85a', '#d96d7a', '#8f9fe8', '#e8e2cc'];
      const col = colors[d.seed % colors.length];
      px(c, x, y - 4, 1, 4, '#3a7040');
      px(c, x - 1, y - 6, 3, 2, col);
      px(c, x, y - 7, 1, 1, '#f4f1e6');
      break;
    }
    case 'tuft': {
      px(c, x, y - 4, 1, 4, '#3d7a45');
      px(c, x - 2, y - 3, 1, 3, '#356b3d');
      px(c, x + 2, y - 3, 1, 3, '#356b3d');
      break;
    }
    case 'mushroom': {
      px(c, x, y - 4, 2, 4, '#d8d0b8');
      pixelEllipse(c, x + 1, y - 5, 4, 2, d.color || '#c05a4a');
      px(c, x, y - 6, 1, 1, '#f0e8d0');
      break;
    }
    case 'rock': {
      c.fillStyle = 'rgba(0,0,0,0.3)';
      pixelEllipse(c, x + 1, y, 10, 3, 'rgba(0,0,0,0.3)');
      pixelEllipse(c, x, y - 5, 10, 7, '#4a4f59');
      pixelEllipse(c, x - 1, y - 6, 8, 5, '#686e78');
      pixelEllipse(c, x - 2, y - 7, 4, 2, '#878d98');
      break;
    }
    case 'sign': {
      px(c, x - 1, y - 12, 3, 12, '#5a3f2a');
      px(c, x - 10, y - 22, 21, 11, '#7a5a3a');
      px(c, x - 9, y - 21, 19, 9, '#8a6a48');
      // seta
      px(c, x - 6, y - 18, 10, 1, '#3a2a1a');
      px(c, x + 3, y - 19, 1, 3, '#3a2a1a');
      break;
    }
    case 'school': {
      // escola da clareira
      c.fillStyle = 'rgba(0,0,0,0.32)';
      pixelEllipse(c, x + 2, y + 1, 32, 5, 'rgba(0,0,0,0.32)');
      // corpo
      px(c, x - 30, y - 46, 60, 46, '#5f4128');
      px(c, x - 30, y - 46, 60, 3, '#7d5734');
      for (let yy = y - 42; yy < y; yy += 7) {
        px(c, x - 30, yy, 60, 1, '#4b321e');
        px(c, x - 30, yy + 1, 60, 1, '#6d4c2f');
      }
      // telhado
      for (let i = 0; i < 10; i++) {
        px(c, x - 34 + i * 3, y - 48 - i * 2, 68 - i * 6, 2, i % 2 ? '#7a2a2c' : '#5a1f22');
      }
      px(c, x - 36, y - 48, 72, 2, '#3d1518');
      // placa ESCOLA
      px(c, x - 23, y - 45, 46, 10, '#3a2a1a');
      px(c, x - 22, y - 44, 44, 8, '#5a422a');
      drawText(c, 'ESCOLA', x, y - 43, { scale: 1, color: '#e6bb4f', align: 'center' });
      // janelas
      for (const wx of [x - 22, x + 8]) {
        px(c, wx, y - 31, 14, 11, '#2a2018');
        px(c, wx + 1, y - 30, 12, 9, '#a8d8e8');
        px(c, wx + 6, y - 30, 1, 9, '#2a2018');
        px(c, wx + 1, y - 26, 12, 1, '#2a2018');
      }
      // porta
      px(c, x - 8, y - 19, 16, 19, '#2a2018');
      px(c, x - 7, y - 18, 14, 18, '#3f6b3a');
      px(c, x - 7, y - 18, 14, 2, '#5cbf62');
      px(c, x + 3, y - 10, 2, 2, '#e6bb4f');
      // sino
      px(c, x - 4, y - 58, 8, 6, '#6a5a3a');
      px(c, x - 2, y - 56, 4, 3, '#c9a24a');
      break;
    }
    case 'hedge': {
      c.fillStyle = 'rgba(0,0,0,0.25)';
      pixelEllipse(c, x, y + 1, 21, 6, 'rgba(0,0,0,0.25)');
      px(c, x - 19, y - 18, 38, 18, '#1b3d23');
      px(c, x - 18, y - 20, 36, 18, '#26512f');
      for (let i = 0; i < 8; i++) {
        pixelCircle(c, x - 15 + i * 4.3, y - 16, 5, i % 2 ? '#2f6238' : '#22472a');
      }
      speckle(c, x - 17, y - 22, 34, 18, '#3f7a45', 18, mulberry32(d.seed), 1);
      break;
    }
    case 'column': {
      c.fillStyle = 'rgba(0,0,0,0.3)';
      pixelEllipse(c, x + 2, y, 11, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 7, y - 20, 14, 20, '#6a6458');
      px(c, x - 5, y - 20, 4, 20, '#8a8374');
      px(c, x + 2, y - 20, 3, 20, '#57524a');
      px(c, x - 9, y - 4, 18, 4, '#7d7668');
      px(c, x - 9, y - 23, 18, 4, '#8a8374');
      px(c, x - 7, y - 25, 14, 3, '#6a6458');
      break;
    }
    case 'rubble': {
      px(c, x - 3, y - 3, 4, 3, '#7d7668');
      px(c, x + 1, y - 2, 3, 2, '#6a6458');
      px(c, x - 1, y - 5, 3, 2, '#8a8374');
      break;
    }
    case 'water': {
      pixelEllipse(c, x, y, d.r, d.r * 0.6, '#1c3040');
      pixelEllipse(c, x, y - 1, d.r * 0.85, d.r * 0.5, '#26465c');
      break;
    }
    case 'reed': {
      px(c, x, y - 9, 1, 9, '#5c6b35');
      px(c, x - 2, y - 7, 1, 7, '#4d5a2c');
      px(c, x + 2, y - 6, 1, 6, '#4d5a2c');
      px(c, x, y - 11, 2, 3, '#8a7a42');
      break;
    }
    case 'deadtree': {
      c.fillStyle = 'rgba(0,0,0,0.28)';
      pixelEllipse(c, x, y, 9, 3, 'rgba(0,0,0,0.28)');
      px(c, x - 3, y - 24, 6, 24, '#3d3228');
      px(c, x - 2, y - 24, 2, 24, '#4f4234');
      px(c, x - 9, y - 22, 7, 3, '#3d3228');
      px(c, x + 2, y - 17, 8, 3, '#3d3228');
      px(c, x - 12, y - 26, 4, 5, '#3d3228');
      px(c, x + 8, y - 22, 4, 6, '#3d3228');
      break;
    }
    case 'barrel': {
      pixelEllipse(c, x, y + 1, 9, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 7, y - 14, 14, 14, '#6a4628');
      px(c, x - 7, y - 14, 3, 14, '#855c36');
      px(c, x + 4, y - 14, 3, 14, '#4e331c');
      px(c, x - 7, y - 11, 14, 2, '#3d2a18');
      px(c, x - 7, y - 4, 14, 2, '#3d2a18');
      pixelEllipse(c, x, y - 14, 7, 2, '#8a6238');
      break;
    }
    case 'crate': {
      pixelEllipse(c, x, y + 1, 10, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 8, y - 15, 16, 15, '#6a4a2c');
      px(c, x - 8, y - 15, 16, 2, '#8a6238');
      px(c, x - 8, y - 15, 2, 15, '#7d5734');
      px(c, x + 6, y - 15, 2, 15, '#4f3520');
      px(c, x - 7, y - 9, 14, 2, '#4f3520');
      px(c, x - 7, y - 13, 14, 1, '#8a6238');
      break;
    }
    case 'rug': {
      pixelEllipse(c, x, y, 70, 40, '#5a2f2f');
      pixelEllipse(c, x, y, 64, 34, '#7a3f3a');
      pixelEllipse(c, x, y, 54, 26, '#8c4a42');
      c.strokeStyle = '#c9a24a';
      c.lineWidth = 1;
      c.strokeRect(x - 48, y - 20, 96, 40);
      break;
    }
    case 'cobweb': {
      c.strokeStyle = 'rgba(220,220,210,0.35)';
      c.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        c.beginPath();
        c.moveTo(x - 20, y - 20);
        c.lineTo(x - 20 + Math.cos((i / 4) * Math.PI * 0.5) * 26, y - 20 + Math.sin((i / 4) * Math.PI * 0.5) * 26);
        c.stroke();
      }
      for (let r = 6; r < 24; r += 6) {
        c.beginPath();
        c.arc(x - 20, y - 20, r, 0, Math.PI * 0.5);
        c.stroke();
      }
      break;
    }
    case 'pillar': {
      c.fillStyle = 'rgba(0,0,0,0.32)';
      pixelEllipse(c, x + 2, y, 13, 4, 'rgba(0,0,0,0.32)');
      px(c, x - 9, y - 34, 18, 34, '#5e626b');
      px(c, x - 9, y - 34, 5, 34, '#7a7f89');
      px(c, x + 4, y - 34, 5, 34, '#4a4e56');
      px(c, x - 11, y - 5, 22, 5, '#6e727b');
      px(c, x - 11, y - 38, 22, 5, '#7a7f89');
      px(c, x - 8, y - 41, 16, 4, '#5e626b');
      break;
    }
    case 'banner':
      drawBannerShape(c, x, y - 20);
      break;
    case 'throne': {
      px(c, x - 14, y - 22, 28, 22, '#5a1f22');
      px(c, x - 12, y - 34, 24, 16, '#7a2a2c');
      px(c, x - 10, y - 32, 20, 12, '#8c3a36');
      px(c, x - 3, y - 30, 6, 6, '#e6bb4f');
      px(c, x - 16, y - 26, 4, 26, '#4a181a');
      px(c, x + 12, y - 26, 4, 26, '#4a181a');
      break;
    }
    case 'carpet': {
      px(c, x - 16, INNER.y, 32, INNER.b - INNER.y, '#5a2024');
      px(c, x - 13, INNER.y, 26, INNER.b - INNER.y, '#7a2f30');
      px(c, x - 8, INNER.y, 16, INNER.b - INNER.y, '#8c3a36');
      c.fillStyle = '#c9a24a';
      for (let yy = INNER.y + 6; yy < INNER.b; yy += 16) {
        c.fillRect(x - 11, yy, 22, 1);
      }
      break;
    }
    case 'stalagmite': {
      pixelEllipse(c, x, y, 8, 3, 'rgba(0,0,0,0.3)');
      for (let i = 0; i < 10; i++) {
        px(c, x - 5 + i, y - i * 2 - 2, 10 - i * 2, 2, i < 5 ? '#5a4a55' : '#4a3d48');
      }
      break;
    }
    case 'crystal': {
      const glow = 0.5 + Math.sin(t * 2 + d.seed) * 0.2;
      c.globalAlpha = 0.25 * glow;
      pixelCircle(c, x, y - 6, 14, d.color || '#5ad9c8');
      c.globalAlpha = 1;
      px(c, x - 2, y - 12, 4, 12, '#5ad9c8');
      px(c, x + 1, y - 9, 3, 9, '#3fb8ad');
      px(c, x - 5, y - 7, 3, 7, '#7ae8d8');
      px(c, x - 1, y - 13, 1, 3, '#d8fff8');
      break;
    }
    case 'tomb': {
      c.fillStyle = 'rgba(0,0,0,0.3)';
      pixelEllipse(c, x, y, 8, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 6, y - 16, 12, 16, '#6a6a70');
      px(c, x - 6, y - 18, 12, 4, '#7a7a80');
      px(c, x - 5, y - 21, 10, 4, '#7a7a80');
      px(c, x - 5, y - 19, 10, 2, '#5a5a60');
      px(c, x - 1, y - 15, 2, 8, '#4a4a50');
      px(c, x - 4, y - 12, 8, 2, '#4a4a50');
      break;
    }
    case 'tomb_richard': {
      c.fillStyle = 'rgba(0,0,0,0.35)';
      pixelEllipse(c, x + 1, y, 15, 5, 'rgba(0,0,0,0.35)');
      // base
      px(c, x - 13, y - 4, 26, 4, '#5a5a60');
      px(c, x - 13, y - 4, 26, 1, '#7a7a80');
      // corpo
      px(c, x - 11, y - 22, 22, 18, '#6a6a70');
      px(c, x - 9, y - 22, 4, 18, '#8a8a90');
      px(c, x + 5, y - 22, 3, 18, '#4a4a50');
      // topo arredondado
      px(c, x - 13, y - 26, 26, 4, '#7a7a80');
      px(c, x - 9, y - 29, 18, 3, '#8a8a90');
      px(c, x - 6, y - 31, 12, 2, '#6a6a70');
      // cruz
      px(c, x - 1, y - 24, 2, 14, '#2c2c30');
      px(c, x - 5, y - 20, 10, 2, '#2c2c30');
      // nome esculpido
      drawText(c, 'RICHARD', x, y - 11, { scale: 1, color: '#b8b8c0', align: 'center' });
      break;
    }
    case 'portrait': {
      // suspensão de correntes
      c.strokeStyle = '#3d3d3d';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x - 58, INNER.y + 2);
      c.lineTo(x - 38, y + 12);
      c.moveTo(x + 58, INNER.y + 2);
      c.lineTo(x + 38, y + 12);
      c.stroke();
      // sombra da moldura
      c.fillStyle = 'rgba(0,0,0,0.4)';
      pixelEllipse(c, x + 2, y + 116, 80, 8, 'rgba(0,0,0,0.35)');
      // moldura dourada
      px(c, x - 78, y + 10, 156, 108, '#6a5315');
      px(c, x - 74, y + 14, 148, 100, '#8a6a20');
      px(c, x - 70, y + 18, 140, 92, '#a9822a');
      px(c, x - 64, y + 24, 128, 80, '#20160a');
      // foto do sagrado
      const imgOk = typeof RICHARD_IMG !== 'undefined' && RICHARD_IMG.complete && RICHARD_IMG.naturalWidth;
      if (imgOk) {
        c.save();
        c.beginPath();
        c.rect(x - 62, y + 26, 124, 74);
        c.clip();
        const iw = RICHARD_IMG.naturalWidth;
        const ih = RICHARD_IMG.naturalHeight;
        const scale = Math.max(124 / iw, 74 / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        c.drawImage(RICHARD_IMG, x - dw / 2, y + 26 + (74 - dh) / 2, dw, dh);
        c.restore();
      } else {
        px(c, x - 62, y + 26, 124, 74, '#2a2016');
        drawText(c, '?', x, y + 52, { scale: 2, color: '#6a7684', align: 'center' });
      }
      break;
    }
    case 'bones': {
      px(c, x - 4, y - 2, 8, 2, '#d8d2bc');
      px(c, x - 5, y - 3, 2, 2, '#d8d2bc');
      px(c, x + 3, y - 3, 2, 2, '#d8d2bc');
      px(c, x - 1, y - 5, 3, 3, '#c8c2ac');
      break;
    }
    case 'skull': {
      px(c, x - 4, y - 7, 8, 5, '#d8d2bc');
      px(c, x - 3, y - 2, 6, 2, '#c8c2ac');
      px(c, x - 3, y - 6, 2, 2, '#2a2a2a');
      px(c, x + 1, y - 6, 2, 2, '#2a2a2a');
      break;
    }
    case 'lava': {
      const pulse = 0.5 + Math.sin(t * 1.7 + d.seed) * 0.3;
      c.globalAlpha = 0.16 * pulse;
      pixelCircle(c, x, y, d.r + 8, '#ff6a2a');
      c.globalAlpha = 1;
      pixelEllipse(c, x, y, d.r, d.r * 0.4, '#7a2a10');
      pixelEllipse(c, x, y - 1, d.r * 0.7, d.r * 0.25, '#e05a20');
      pixelEllipse(c, x, y - 2, d.r * 0.4, d.r * 0.14, '#ffb04a');
      break;
    }
    case 'gold': {
      pixelEllipse(c, x, y, 8, 3, '#8a6a20');
      px(c, x - 6, y - 3, 5, 3, '#e6bb4f');
      px(c, x + 1, y - 4, 5, 3, '#ffe9a3');
      px(c, x - 2, y - 6, 4, 2, '#c9a24a');
      break;
    }
    case 'chest': {
      pixelEllipse(c, x, y + 1, 12, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 10, y - 12, 20, 12, '#6a4a2c');
      px(c, x - 10, y - 16, 20, 5, '#8a6238');
      px(c, x - 10, y - 16, 20, 2, '#a87a44');
      px(c, x - 2, y - 12, 4, 5, '#e6bb4f');
      px(c, x - 1, y - 8, 2, 3, '#a97c25');
      break;
    }
    case 'star': {
      const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + d.seed));
      c.globalAlpha = tw;
      px(c, x, y, 1, 1, '#dfe8ff');
      if (d.seed % 5 === 0) {
        px(c, x - 1, y, 1, 1, 'rgba(180,200,255,0.5)');
        px(c, x + 1, y, 1, 1, 'rgba(180,200,255,0.5)');
      }
      c.globalAlpha = 1;
      break;
    }
    case 'radio_lito': {
      pixelEllipse(c, x, y + 1, 13, 3, 'rgba(0,0,0,0.32)');
      // mesinha e rádio antigo
      px(c, x - 11, y - 10, 22, 10, '#3a2a1e');
      px(c, x - 12, y - 11, 24, 2, '#5a3f2a');
      px(c, x - 8, y - 21, 16, 11, '#4a3426');
      px(c, x - 7, y - 20, 14, 9, '#6a4a30');
      px(c, x - 6, y - 18, 6, 5, '#2a1d14');
      for (let i = 0; i < 3; i++) px(c, x - 5, y - 17 + i * 2, 4, 1, '#8a6a48');
      px(c, x + 3, y - 18, 3, 3, '#e6bb4f');
      px(c, x + 4, y - 17, 1, 1, '#3a2a1e');
      px(c, x + 6, y - 14, 2, 1, '#a97c25');
      // antena
      px(c, x - 7, y - 28, 1, 8, '#8a9098');
      px(c, x - 9, y - 29, 4, 1, '#cdd3dc');
      // aviãozinho de papel
      const planeY = y - 31 + Math.round(Math.sin(t * 1.5 + d.seed) * 2);
      px(c, x + 12, planeY, 7, 3, '#f4f1e6');
      px(c, x + 12, planeY - 2, 3, 2, '#dfe8ff');
      px(c, x + 17, planeY + 1, 4, 1, '#c8d2e0');
      // notas musicais subindo
      for (let i = 0; i < 3; i++) {
        const rise = (t * 13 + i * 9 + d.seed) % 27;
        const ny = Math.round(y - 23 - rise);
        const nx = Math.round(x + 9 + Math.sin(t * 1.2 + i * 2) * 3);
        c.globalAlpha = clamp(1 - rise / 27, 0, 1) * 0.85;
        px(c, nx, ny, 2, 2, i === 1 ? '#f2a6c0' : '#e6bb4f');
        px(c, nx + 2, ny - 3, 1, 4, i === 1 ? '#f2a6c0' : '#e6bb4f');
        c.globalAlpha = 1;
      }
      break;
    }
    case 'bust_marx': {
      pixelEllipse(c, x, y + 1, 12, 3, 'rgba(0,0,0,0.34)');
      // pedestal
      px(c, x - 9, y - 10, 18, 10, '#3d4148');
      px(c, x - 10, y - 12, 20, 3, '#5a5f68');
      // ombros e tronco de pedra
      px(c, x - 11, y - 21, 22, 9, '#7a7f88');
      px(c, x - 11, y - 21, 22, 1, '#9a9fa8');
      px(c, x - 9, y - 26, 18, 6, '#8a8f98');
      px(c, x - 2, y - 29, 4, 4, '#8a8f98');
      // cabeça
      px(c, x - 6, y - 38, 12, 9, '#9a9fa8');
      px(c, x + 5, y - 37, 1, 8, '#7a7f88');
      // cabelo e crânio
      px(c, x - 7, y - 40, 14, 4, '#4a4e56');
      px(c, x - 7, y - 37, 2, 5, '#4a4e56');
      px(c, x + 5, y - 37, 2, 4, '#4a4e56');
      // barba
      px(c, x - 6, y - 30, 12, 3, '#6a6f78');
      px(c, x - 4, y - 27, 8, 3, '#7a7f88');
      px(c, x - 2, y - 25, 4, 1, '#6a6f78');
      // sobrancelhas, olhos e nariz
      px(c, x - 4, y - 35, 3, 1, '#4a4e56');
      px(c, x + 1, y - 35, 3, 1, '#4a4e56');
      px(c, x - 3, y - 34, 2, 1, '#2a2d33');
      px(c, x + 1, y - 34, 2, 1, '#2a2d33');
      px(c, x - 1, y - 33, 3, 2, '#6a6f78');
      px(c, x - 1, y - 30, 3, 1, '#4a4e56');
      // placa "MARX" na base do pedestal
      px(c, x - 13, y - 8, 26, 8, '#24242a');
      px(c, x - 12, y - 7, 24, 6, '#3d4148');
      px(c, x - 12, y - 7, 24, 1, '#5a5f68');
      drawText(c, 'MARX', x, y - 7, { scale: 1, color: '#e0c47a', align: 'center' });
      // brilho dourado discreto
      c.globalAlpha = 0.25 + 0.25 * Math.abs(Math.sin(t * 1.2 + d.seed));
      px(c, x + 4, y - 35, 1, 1, '#e6c26a');
      c.globalAlpha = 1;
      break;
    }
    case 'temple_column': {
      const h = 58;
      const top = y - h;
      // sombra
      pixelEllipse(c, x + 2, y + 1, 12, 3.5, 'rgba(0,0,0,0.28)');
      // plinto
      px(c, x - 11, y - 6, 22, 6, '#9a9384');
      px(c, x - 11, y - 6, 22, 1, '#d6d0c0');
      // base (toro)
      px(c, x - 9, y - 10, 18, 4, '#cfc9b8');
      px(c, x - 9, y - 10, 18, 1, '#efe9da');
      px(c, x - 9, y - 7, 18, 1, '#a49d8c');
      // fuste com caneluras
      px(c, x - 7, top + 8, 14, h - 18, '#d6d0c0');
      px(c, x - 7, top + 8, 3, h - 18, '#efe9da');
      px(c, x + 4, top + 8, 3, h - 18, '#a49d8c');
      c.fillStyle = 'rgba(120,112,96,0.5)';
      for (let fx = -3; fx <= 3; fx += 2) {
        c.fillRect(Math.round(x + fx), top + 10, 1, h - 22);
      }
      // capitel
      px(c, x - 9, top + 2, 18, 6, '#cfc9b8');
      px(c, x - 9, top + 2, 18, 1, '#efe9da');
      px(c, x - 10, top - 1, 20, 3, '#ded8c8');
      px(c, x - 8, top - 3, 16, 2, '#a49d8c');
      px(c, x - 7, top + 6, 14, 2, '#b7b0a0');
      break;
    }
    case 'fountain_lito': {
      // fonte de mármore em dois níveis, ~58x56, base em y
      const b = y;
      pixelEllipse(c, x, b + 1, 31, 6, 'rgba(0,0,0,0.32)');
      // placa com o nome na base
      px(c, x - 35, b - 10, 70, 10, '#8a8374');
      px(c, x - 35, b - 10, 70, 1, '#ded8c8');
      px(c, x - 33, b - 9, 66, 7, '#3f3a30');
      px(c, x - 33, b - 9, 66, 1, '#6b6252');
      drawText(c, 'LITO SOUZA', x, b - 9, { scale: 1, color: '#e6c26a', align: 'center' });
      // pedestal central
      px(c, x - 9, b - 22, 18, 13, '#cfc9b8');
      px(c, x - 9, b - 22, 3, 13, '#efe9da');
      px(c, x + 6, b - 22, 3, 13, '#a49d8c');
      // bacia inferior
      pixelEllipse(c, x, b - 26, 29, 10, '#a49d8c');
      pixelEllipse(c, x, b - 27, 27, 9, '#cfc9b8');
      pixelEllipse(c, x, b - 28, 24, 7, '#ded8c8');
      // água
      pixelEllipse(c, x, b - 28, 22, 5, '#2f6f74');
      pixelEllipse(c, x, b - 29, 22, 4, '#3f8f90');
      const wave = Math.sin(t * 2.2 + d.seed) * 2;
      c.fillStyle = 'rgba(180,240,235,0.6)';
      c.fillRect(Math.round(x - 16 + wave), b - 30, 9, 1);
      c.fillRect(Math.round(x + 3 - wave), b - 27, 7, 1);
      // coluna do nível superior
      px(c, x - 4, b - 44, 8, 18, '#cfc9b8');
      px(c, x - 4, b - 44, 2, 18, '#efe9da');
      px(c, x + 2, b - 44, 2, 18, '#a49d8c');
      // bacia superior
      pixelEllipse(c, x, b - 47, 15, 5, '#a49d8c');
      pixelEllipse(c, x, b - 48, 13, 4, '#ded8c8');
      pixelEllipse(c, x, b - 48, 10, 2.5, '#4a9a9a');
      // jato central animado
      const jet = Math.sin(t * 5 + d.seed) * 1.5;
      px(c, x - 1, b - 56 + jet, 2, 6, 'rgba(190,240,240,0.85)');
      px(c, x, b - 58 + jet, 1, 3, '#d8fff8');
      pixelCircle(c, x, b - 57, 3, 'rgba(190,240,240,0.18)');
      // arcos de água dos dois lados (gotas animadas)
      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < 9; i++) {
          const p = (t * 0.55 + i / 9 + d.seed * 0.01) % 1;
          const dx = side * (3 + p * 19);
          const dy = b - 48 + p * p * 22;
          c.globalAlpha = 0.85 * (1 - p * 0.35);
          px(c, x + dx, dy, 2, 2, i % 2 ? '#a8e8e4' : '#d8fff8');
          c.globalAlpha = 1;
        }
      }
      // respingos na bacia
      c.globalAlpha = 0.5 + 0.4 * Math.abs(Math.sin(t * 3.4 + d.seed));
      px(c, x - 17, b - 31, 1, 1, '#d8fff8');
      px(c, x + 16, b - 30, 1, 1, '#d8fff8');
      c.globalAlpha = 1;
      break;
    }
    case 'bookshelf': {
      // estante de madeira com três prateleiras e livros coloridos
      pixelEllipse(c, x, y + 1, 19, 4, 'rgba(0,0,0,0.35)');
      px(c, x - 17, y - 56, 34, 56, '#2e1f14');
      px(c, x - 16, y - 55, 32, 54, '#46301f');
      px(c, x - 18, y - 58, 36, 4, '#6a4a2e');
      px(c, x - 18, y - 58, 36, 1, '#8a6238');
      px(c, x - 17, y - 4, 34, 4, '#2e1f14');
      // prateleiras
      for (const sy of [y - 51, y - 35, y - 19, y - 5]) {
        px(c, x - 15, sy, 30, 3, '#5a3d25');
        px(c, x - 15, sy, 30, 1, '#7a5836');
      }
      // livros (duas fileiras superiores completas, inferior com vão)
      const bookColors = ['#a83228', '#3a6ac9', '#3f8a4a', '#d9b24a', '#7a3f8a', '#c96a3a'];
      let bi = d.seed % bookColors.length;
      for (let row = 0; row < 3; row++) {
        const by = y - 50 + row * 16;
        for (let i = 0; i < 6; i++) {
          if (row === 2 && (i === 2 || i === 3)) continue;
          const bx = x - 14 + i * 5;
          const bh = 10 + ((i + row + d.seed) % 3);
          const col = bookColors[(bi + i + row) % bookColors.length];
          px(c, bx, by + (11 - bh), 4, bh, col);
          px(c, bx, by + (11 - bh), 1, bh, 'rgba(255,255,255,0.18)');
          px(c, bx + 3, by + (11 - bh), 1, bh, 'rgba(0,0,0,0.25)');
        }
        bi += 2;
      }
      // um livro inclinado no vão
      px(c, x - 4, y - 13, 8, 3, '#d9b24a');
      px(c, x + 2, y - 16, 3, 8, '#8a6238');
      break;
    }
    case 'desk_marx': {
      // mesa de estudo com papéis, vela e bandeira vermelha
      pixelEllipse(c, x, y + 1, 24, 4, 'rgba(0,0,0,0.32)');
      px(c, x - 22, y - 17, 4, 17, '#3a2618');
      px(c, x + 18, y - 17, 4, 17, '#3a2618');
      px(c, x - 23, y - 21, 46, 5, '#6a4a2e');
      px(c, x - 23, y - 21, 46, 1, '#8a6238');
      px(c, x - 21, y - 16, 42, 2, '#4b321e');
      // papéis
      px(c, x - 16, y - 27, 13, 9, '#e8e2cc');
      px(c, x - 15, y - 26, 11, 1, '#b8b0a0');
      px(c, x - 15, y - 23, 9, 1, '#b8b0a0');
      px(c, x - 15, y - 20, 10, 1, '#b8b0a0');
      px(c, x - 2, y - 26, 11, 8, '#dfd8c0');
      px(c, x - 1, y - 24, 8, 1, '#a8a090');
      // tinteiro
      px(c, x - 4, y - 25, 3, 4, '#1d2733');
      // vela com chama animada
      px(c, x + 8, y - 28, 3, 8, '#e8e2cc');
      px(c, x + 9, y - 30, 1, 2, '#d0c8b0');
      const fl = Math.sin(t * 9 + d.seed) * 0.6;
      px(c, x + 9, y - 33 + fl, 1, 3, '#ffd24a');
      px(c, x + 9, y - 35 + fl, 1, 2, '#fff0b0');
      c.globalAlpha = 0.16;
      pixelCircle(c, x + 9, y - 33, 8, '#ffb14a');
      c.globalAlpha = 1;
      // bandeira vermelha pequena
      px(c, x - 20, y - 38, 1, 17, '#3a2a1a');
      const wav = Math.sin(t * 2 + d.seed) > 0 ? 1 : 0;
      px(c, x - 19, y - 38, 10, 7, '#a83228');
      px(c, x - 19, y - 38, 10, 1, '#c9553a');
      px(c, x - 11 + wav, y - 36, 3, 3, 'rgba(0,0,0,0.12)');
      break;
    }
    case 'rug_marx': {
      // tapete vinho com borda dourada (fica no chão)
      pixelEllipse(c, x, y, 74, 42, 'rgba(0,0,0,0.22)');
      pixelEllipse(c, x, y, 72, 40, '#c9a24a');
      pixelEllipse(c, x, y, 69, 37, '#3d1a20');
      pixelEllipse(c, x, y, 64, 33, '#6a2a30');
      pixelEllipse(c, x, y, 52, 26, '#57242a');
      c.strokeStyle = 'rgba(201,162,74,0.55)';
      c.lineWidth = 1;
      c.beginPath();
      c.ellipse(x, y, 46, 22, 0, 0, Math.PI * 2);
      c.stroke();
      // losangos centrais
      c.fillStyle = 'rgba(201,162,74,0.4)';
      for (const dx of [-22, 0, 22]) {
        c.fillRect(Math.round(x + dx - 3), y - 1, 6, 2);
        c.fillRect(Math.round(x + dx - 1), y - 3, 2, 6);
      }
      break;
    }
    case 'podium_senna': {
      // pódio de três degraus com capacete e placa
      const glow = 0.5 + Math.sin(t * 1.8 + d.seed) * 0.5;
      c.globalAlpha = 0.10 + glow * 0.10;
      pixelEllipse(c, x, y - 26, 44, 30, '#ffe08a');
      c.globalAlpha = 1;
      pixelEllipse(c, x, y + 1, 36, 6, 'rgba(0,0,0,0.35)');
      // base
      px(c, x - 34, y - 5, 68, 5, '#3a3d42');
      px(c, x - 34, y - 5, 68, 1, '#5a5f68');
      // 2º e 3º lugares (laterais, mais baixos)
      px(c, x - 33, y - 16, 19, 11, '#4a4f59');
      px(c, x - 33, y - 16, 19, 1, '#7a7f89');
      px(c, x + 14, y - 16, 19, 11, '#4a4f59');
      px(c, x + 14, y - 16, 19, 1, '#7a7f89');
      // topos em perspectiva
      pixelEllipse(c, x - 23, y - 17, 10, 2.5, '#6a6f78');
      pixelEllipse(c, x + 23, y - 17, 10, 2.5, '#6a6f78');
      // separação entre os degraus
      px(c, x - 15, y - 16, 1, 11, '#26282c');
      px(c, x + 14, y - 16, 1, 11, '#26282c');
      drawText(c, '2', x - 24, y - 13, { scale: 1, color: '#c9d2df', align: 'center' });
      drawText(c, '3', x + 23, y - 13, { scale: 1, color: '#c9d2df', align: 'center' });
      // 1º lugar (central, mais alto)
      px(c, x - 15, y - 28, 30, 23, '#5a5f68');
      px(c, x - 15, y - 28, 30, 2, '#8a8f98');
      px(c, x - 15, y - 28, 2, 23, '#6a6f78');
      px(c, x + 13, y - 28, 2, 23, '#3a3d42');
      pixelEllipse(c, x, y - 29, 15, 3, '#7a7f89');
      drawText(c, '1', x, y - 25, { scale: 1, color: '#e6bb4f', align: 'center' });
      // placa SENNA
      px(c, x - 15, y - 18, 30, 8, '#2a2c30');
      px(c, x - 14, y - 17, 28, 6, '#3a3d42');
      drawText(c, 'SENNA', x, y - 17, { scale: 1, color: '#ffe9a3', align: 'center' });
      // capacete amarelo com faixas verde/azul
      px(c, x - 8, y - 42, 16, 10, '#e6c93a');
      px(c, x - 7, y - 45, 14, 4, '#f2df62');
      px(c, x - 5, y - 47, 10, 3, '#e6c93a');
      px(c, x - 9, y - 41, 2, 5, '#c9a824');
      px(c, x + 7, y - 41, 2, 5, '#c9a824');
      px(c, x - 3, y - 46, 3, 13, '#2f8a4a');
      px(c, x + 1, y - 45, 2, 11, '#3a6ac9');
      // viseira
      px(c, x - 7, y - 39, 14, 3, '#1d2733');
      px(c, x - 6, y - 38, 12, 1, '#8fb8e8');
      // brilho animado
      c.globalAlpha = 0.35 + 0.5 * glow;
      px(c, x - 5, y - 44, 3, 1, '#fff6d0');
      px(c, x + 4, y - 31, 1, 1, '#fff6d0');
      c.globalAlpha = 1;
      break;
    }
    case 'flag_checkered': {
      // mastro e bandeira quadriculada ondulando
      pixelEllipse(c, x, y + 1, 6, 2, 'rgba(0,0,0,0.3)');
      px(c, x - 1, y - 50, 2, 50, '#8a9098');
      px(c, x - 1, y - 50, 1, 50, '#c9d2df');
      px(c, x - 2, y - 54, 4, 4, '#d6b64a');
      px(c, x - 1, y - 53, 2, 2, '#fff0b0');
      for (let col = 0; col < 8; col++) {
        const wave = Math.round(Math.sin(t * 3 + col * 0.8 + d.seed) * 1.6);
        for (let row = 0; row < 5; row++) {
          const alt = col + row;
          px(c, x + 2 + col * 4, y - 48 + row * 4 + wave, 4, 4,
            alt % 2 ? '#e8e8e8' : '#1a1c20');
        }
      }
      // contorno leve na borda livre
      c.fillStyle = 'rgba(0,0,0,0.25)';
      c.fillRect(x + 2, y - 48, 1, 20);
      break;
    }
    case 'bust_trotsky': {
      // busto de pedra com óculos redondos, cavanhaque e placa na base
      pixelEllipse(c, x, y + 1, 17, 4, 'rgba(0,0,0,0.35)');
      px(c, x - 23, y - 10, 46, 2, '#4a423c');
      px(c, x - 23, y - 8, 46, 8, '#332c28');
      px(c, x - 21, y - 7, 42, 6, '#241f1c');
      px(c, x - 21, y - 7, 42, 1, '#3a3430');
      drawText(c, 'TRÓTSKI', x, y - 7, { scale: 1, color: '#d9b24a', align: 'center' });
      // tronco e ombros
      px(c, x - 16, y - 25, 32, 14, '#6e685e');
      px(c, x - 16, y - 25, 32, 2, '#8a8478');
      px(c, x + 13, y - 25, 3, 14, '#524c44');
      px(c, x - 10, y - 28, 20, 4, '#7a7468');
      px(c, x - 4, y - 30, 8, 3, '#8a8478');
      // cabeça
      px(c, x - 7, y - 41, 14, 11, '#a8a296');
      px(c, x - 7, y - 41, 2, 11, '#c0bab0');
      px(c, x + 5, y - 41, 2, 11, '#8a8478');
      // cabelo
      px(c, x - 8, y - 44, 16, 4, '#2f2b28');
      px(c, x - 8, y - 41, 2, 4, '#2f2b28');
      px(c, x + 6, y - 41, 2, 4, '#2f2b28');
      px(c, x - 9, y - 42, 2, 5, '#3a3632');
      // óculos redondos
      pixelCircle(c, x - 4, y - 37, 3, '#2a2622');
      pixelCircle(c, x - 4, y - 37, 2, '#a8a296');
      pixelCircle(c, x + 4, y - 37, 3, '#2a2622');
      pixelCircle(c, x + 4, y - 37, 2, '#a8a296');
      px(c, x - 1, y - 37, 2, 1, '#2a2622');
      px(c, x - 4, y - 37, 1, 1, '#1a1714');
      px(c, x + 4, y - 37, 1, 1, '#1a1714');
      // bigode e cavanhaque
      px(c, x - 5, y - 33, 10, 1, '#4a4440');
      px(c, x - 3, y - 31, 6, 2, '#2f2b28');
      px(c, x - 1, y - 29, 2, 2, '#2f2b28');
      // luz dourada discreta
      const gl = 0.25 + 0.2 * Math.abs(Math.sin(t * 1.2 + d.seed));
      c.globalAlpha = gl;
      px(c, x - 6, y - 42, 2, 1, '#e6c26a');
      c.globalAlpha = 1;
      break;
    }
    case 'banner_red': {
      // faixa vermelha larga com estrela dourada
      px(c, x - 64, y - 13, 4, 4, '#4a3020');
      px(c, x + 60, y - 13, 4, 4, '#4a3020');
      px(c, x - 61, y - 12, 122, 2, '#2f2118');
      px(c, x - 58, y - 10, 116, 15, '#5a1418');
      px(c, x - 57, y - 9, 114, 13, '#8a2228');
      px(c, x - 57, y - 9, 114, 2, '#a83232');
      px(c, x - 57, y + 2, 114, 2, '#6a1a20');
      c.fillStyle = 'rgba(0,0,0,0.16)';
      for (let i = 0; i < 5; i++) c.fillRect(x - 46 + i * 23, y - 8, 2, 11);
      // estrela dourada (original, sem foice/martelo)
      px(c, x - 1, y - 9, 3, 11, '#e6bb4f');
      px(c, x - 6, y - 5, 13, 3, '#e6bb4f');
      px(c, x - 4, y - 7, 3, 3, '#ffe9a3');
      px(c, x + 2, y - 7, 3, 3, '#ffe9a3');
      px(c, x - 4, y - 1, 3, 3, '#c9a24a');
      px(c, x + 2, y - 1, 3, 3, '#c9a24a');
      px(c, x, y - 5, 1, 3, '#fff6d0');
      c.fillStyle = 'rgba(0,0,0,0.25)';
      c.fillRect(x - 58, y + 4, 116, 1);
      break;
    }
    case 'desk_archive': {
      // mesa de arquivo com papéis, lamparina e mapa
      pixelEllipse(c, x, y + 1, 26, 4, 'rgba(0,0,0,0.34)');
      px(c, x - 22, y - 17, 4, 17, '#2e1f16');
      px(c, x + 18, y - 17, 4, 17, '#2e1f16');
      px(c, x - 25, y - 21, 50, 5, '#5a3c28');
      px(c, x - 25, y - 21, 50, 1, '#7a5838');
      px(c, x - 23, y - 16, 46, 1, '#3a2618');
      // papéis
      px(c, x - 18, y - 28, 15, 8, '#e8e2cc');
      px(c, x - 18, y - 28, 15, 1, '#fffaf0');
      px(c, x - 16, y - 25, 11, 1, '#b8b0a0');
      px(c, x - 16, y - 23, 9, 1, '#b8b0a0');
      px(c, x - 5, y - 27, 12, 7, '#dfd8c0');
      px(c, x - 3, y - 25, 8, 1, '#a8a090');
      // mapa com rota e X
      px(c, x + 9, y - 27, 14, 9, '#c8b88a');
      px(c, x + 9, y - 27, 14, 1, '#e0d0a4');
      c.fillStyle = 'rgba(90,60,30,0.6)';
      for (let i = 0; i < 4; i++) c.fillRect(x + 11 + i * 3, y - 24 + (i % 2) * 2, 2, 1);
      px(c, x + 20, y - 21, 2, 2, '#a83228');
      // lamparina acesa
      px(c, x + 17, y - 24, 5, 3, '#a97c25');
      px(c, x + 19, y - 32, 1, 8, '#6a5a3a');
      px(c, x + 15, y - 37, 9, 5, '#3f5a42');
      px(c, x + 16, y - 38, 7, 1, '#5a7a58');
      px(c, x + 18, y - 36, 3, 3, '#ffe9a3');
      const g = 0.55 + Math.sin(t * 5 + d.seed) * 0.2;
      c.globalAlpha = 0.18 * g;
      pixelCircle(c, x + 19, y - 35, 12, '#ffd27a');
      c.globalAlpha = 1;
      break;
    }
    case 'train_model': {
      // trem blindado em miniatura sobre trilho, com estrela e fumaça
      pixelEllipse(c, x, y + 1, 30, 4, 'rgba(0,0,0,0.32)');
      px(c, x - 30, y - 8, 60, 4, '#3a2618');
      px(c, x - 30, y - 8, 60, 1, '#5a3c28');
      px(c, x - 26, y - 4, 3, 4, '#241810');
      px(c, x + 23, y - 4, 3, 4, '#241810');
      px(c, x - 28, y - 10, 56, 1, '#8a9098');
      px(c, x - 28, y - 9, 56, 1, '#4a4f57');
      // rodas
      pixelCircle(c, x - 13, y - 13, 3, '#1f2226');
      pixelCircle(c, x - 13, y - 13, 1, '#6e747e');
      pixelCircle(c, x + 9, y - 13, 3, '#1f2226');
      pixelCircle(c, x + 9, y - 13, 1, '#6e747e');
      // casco blindado
      px(c, x - 21, y - 26, 43, 12, '#3a3f46');
      px(c, x - 21, y - 26, 43, 2, '#6e747e');
      px(c, x - 21, y - 17, 43, 3, '#2a2e33');
      px(c, x + 20, y - 25, 4, 9, '#2f343a');
      c.fillStyle = '#565c66';
      for (let i = 0; i < 6; i++) c.fillRect(x - 18 + i * 7, y - 23, 1, 1);
      // torre e canhão
      px(c, x - 12, y - 32, 18, 7, '#4a5058');
      px(c, x - 12, y - 32, 18, 1, '#7a828c');
      px(c, x + 6, y - 30, 11, 2, '#2a2e33');
      // estrela vermelha
      px(c, x - 4, y - 22, 2, 5, '#c03a30');
      px(c, x - 6, y - 20, 6, 2, '#c03a30');
      px(c, x - 4, y - 20, 2, 1, '#e05a4a');
      // fumaça animada
      for (let i = 0; i < 3; i++) {
        const p = (t * 0.35 + i / 3 + d.seed * 0.01) % 1;
        c.globalAlpha = (1 - p) * 0.45;
        pixelCircle(c, x - 8 + p * 6 + Math.sin(t + i) * 2, y - 33 - p * 20, 2 + p * 3, '#b8b0a8');
        c.globalAlpha = 1;
      }
      break;
    }
    case 'dark_fountain': {
      // fonte de pedra negra com coração brilhante e partículas
      const pulse = 0.5 + Math.sin(t * 1.6 + d.seed) * 0.5;
      c.globalAlpha = 0.14 + pulse * 0.10;
      pixelEllipse(c, x, y - 10, 44, 34, '#7a3ac0');
      c.globalAlpha = 1;
      pixelEllipse(c, x, y + 1, 32, 6, 'rgba(0,0,0,0.45)');
      px(c, x - 28, y - 8, 56, 8, '#211a2a');
      px(c, x - 28, y - 8, 56, 1, '#3a3048');
      px(c, x - 22, y - 15, 44, 7, '#2c2238');
      px(c, x - 22, y - 15, 44, 1, '#4a3a5c');
      // bacia
      pixelEllipse(c, x, y - 18, 30, 9, '#1c1526');
      pixelEllipse(c, x, y - 19, 28, 8, '#352a44');
      pixelEllipse(c, x, y - 20, 25, 6, '#20172e');
      pixelEllipse(c, x, y - 20, 22, 5, '#120d1e');
      pixelEllipse(c, x, y - 21, 18, 3, '#2a1548');
      c.fillStyle = 'rgba(150,90,220,0.35)';
      c.fillRect(Math.round(x - 12 + Math.sin(t * 2) * 3), y - 22, 9, 1);
      c.fillRect(Math.round(x + 3 - Math.sin(t * 2) * 3), y - 20, 7, 1);
      // coluna
      px(c, x - 5, y - 38, 10, 19, '#2a2036');
      px(c, x - 5, y - 38, 3, 19, '#443456');
      px(c, x + 3, y - 38, 2, 19, '#1c1526');
      px(c, x - 8, y - 40, 16, 3, '#352a44');
      // coração brilhante
      const hy = y - 49 + Math.sin(t * 2.1 + d.seed) * 1;
      c.globalAlpha = 0.22 + pulse * 0.24;
      pixelCircle(c, x, hy, 12, '#c95ae0');
      c.globalAlpha = 1;
      px(c, x - 4, hy - 3, 4, 3, '#ff9af0');
      px(c, x, hy - 3, 4, 3, '#ff9af0');
      px(c, x - 5, hy - 1, 10, 3, '#e05ae8');
      px(c, x - 3, hy + 2, 6, 2, '#c93ad0');
      px(c, x - 1, hy + 4, 3, 2, '#a82ab8');
      px(c, x - 4, hy - 3, 2, 1, '#ffe0ff');
      // partículas subindo
      for (let i = 0; i < 5; i++) {
        const p = (t * 0.25 + i / 5 + d.seed * 0.01) % 1;
        c.globalAlpha = (1 - p) * 0.7;
        px(c, x - 16 + i * 8 + Math.sin(t * 1.5 + i) * 2, y - 20 - p * 34, 1, 2,
          i % 2 ? '#e0a0ff' : '#9a6af0');
        c.globalAlpha = 1;
      }
      break;
    }
    case 'hooded_figure': {
      // estátua encapuzada sem rosto, olhos brilhantes
      pixelEllipse(c, x, y + 1, 14, 4, 'rgba(0,0,0,0.35)');
      px(c, x - 15, y - 8, 30, 8, '#1e1828');
      px(c, x - 15, y - 8, 30, 1, '#352c46');
      px(c, x - 12, y - 12, 24, 5, '#2a2236');
      px(c, x - 11, y - 32, 22, 21, '#241c30');
      px(c, x - 11, y - 32, 22, 2, '#3a2f4c');
      px(c, x - 11, y - 32, 3, 21, '#322842');
      px(c, x + 8, y - 32, 3, 21, '#18121f');
      c.fillStyle = 'rgba(0,0,0,0.28)';
      c.fillRect(x - 3, y - 30, 1, 18);
      c.fillRect(x + 4, y - 30, 1, 18);
      // mangas
      px(c, x - 14, y - 29, 4, 12, '#241c30');
      px(c, x + 10, y - 29, 4, 12, '#241c30');
      // capuz
      px(c, x - 10, y - 44, 20, 14, '#2c2338');
      px(c, x - 10, y - 44, 20, 2, '#443858');
      px(c, x - 10, y - 44, 3, 12, '#3a2f4c');
      px(c, x + 7, y - 44, 3, 12, '#1c1526');
      // vazio do rosto
      px(c, x - 7, y - 40, 14, 10, '#0a0710');
      px(c, x - 7, y - 40, 14, 1, '#171022');
      const eg = 0.55 + 0.45 * Math.abs(Math.sin(t * 2 + d.seed));
      c.globalAlpha = 0.5 + eg * 0.4;
      px(c, x - 4, y - 36, 2, 2, '#c47aff');
      px(c, x + 2, y - 36, 2, 2, '#c47aff');
      c.globalAlpha = 1;
      c.globalAlpha = 0.12 + eg * 0.12;
      pixelCircle(c, x, y - 35, 14, '#8a4ad0');
      c.globalAlpha = 1;
      break;
    }
    case 'dark_crystal': {
      const pulse = 0.5 + Math.sin(t * 2 + d.seed) * 0.5;
      c.globalAlpha = 0.10 + pulse * 0.12;
      pixelCircle(c, x, y - 12, 20, '#8a5af0');
      c.globalAlpha = 1;
      pixelEllipse(c, x, y + 1, 13, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 10, y - 6, 20, 4, '#2c2436');
      px(c, x - 10, y - 6, 20, 1, '#453a52');
      px(c, x - 2, y - 26, 5, 20, '#6a3ac8');
      px(c, x - 2, y - 26, 2, 20, '#9a6af0');
      px(c, x + 3, y - 24, 2, 5, '#4a2a9a');
      px(c, x - 7, y - 16, 4, 12, '#5a2fb0');
      px(c, x - 7, y - 16, 1, 12, '#8a5af0');
      px(c, x + 5, y - 14, 4, 11, '#7a4ae0');
      px(c, x + 5, y - 14, 1, 11, '#b48aff');
      px(c, x, y - 27, 2, 3, '#e0c8ff');
      c.globalAlpha = 0.4 + pulse * 0.5;
      px(c, x - 9, y - 20, 1, 1, '#e0c8ff');
      px(c, x + 9, y - 10, 1, 1, '#e0c8ff');
      c.globalAlpha = 1;
      break;
    }
    case 'mine_block': {
      // bloco de terra/pedra com topo de grama (altura casa com o sólido)
      const rb = mulberry32(d.seed);
      px(c, x - 13, y - 18, 26, 18, '#3a2a1e');
      px(c, x - 13, y - 18, 26, 4, '#2f6b3a');
      px(c, x - 13, y - 18, 26, 1, '#4a8a4a');
      px(c, x - 13, y - 14, 26, 2, '#2a1d14');
      for (let i = 0; i < 10; i++) {
        px(c, x - 13 + rb() * 24, y - 18, 1, 2, '#3f7a42');
      }
      for (let i = 0; i < 9; i++) {
        px(c, x - 12 + rb() * 22, y - 11 + rb() * 8, 2 + ((rb() * 2) | 0), 2,
          i % 2 ? '#5a4632' : '#2a1d14');
      }
      c.fillStyle = 'rgba(0,0,0,0.3)';
      c.fillRect(x - 13, y - 1, 26, 1);
      c.fillRect(x + 12, y - 18, 1, 18);
      break;
    }
    case 'diamond_ore': {
      // bloco de pedra com diamantes ciano e brilho
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + d.seed);
      px(c, x - 14, y - 25, 28, 25, '#241f28');
      px(c, x - 13, y - 24, 26, 24, '#5a545e');
      px(c, x - 13, y - 24, 26, 2, '#7a7480');
      px(c, x - 13, y - 10, 26, 10, '#4a4450');
      px(c, x - 13, y - 24, 2, 24, '#6e6874');
      c.fillStyle = 'rgba(0,0,0,0.3)';
      c.fillRect(x - 13, y - 1, 26, 1);
      c.fillRect(x + 12, y - 24, 1, 24);
      const shards = [[-8, -20], [3, -17], [-3, -9], [8, -7], [-11, -11], [1, -22]];
      for (let i = 0; i < shards.length; i++) {
        const sx = x + shards[i][0], sy = y + shards[i][1];
        px(c, sx - 1, sy + 1, 5, 3, '#1a3a44');
        px(c, sx, sy, 4, 3, '#3ac9d8');
        px(c, sx, sy, 2, 1, '#a8f8ff');
      }
      c.globalAlpha = 0.25 + pulse * 0.45;
      px(c, x + 5, y - 24, 1, 1, '#d8ffff');
      px(c, x - 9, y - 18, 1, 1, '#d8ffff');
      c.globalAlpha = 1;
      break;
    }
    case 'creeper_block': {
      // bloco verde com carinha triste original
      const rb = mulberry32(d.seed);
      pixelEllipse(c, x, y + 1, 12, 3, 'rgba(0,0,0,0.35)');
      px(c, x - 12, y - 24, 24, 24, '#2f6a30');
      px(c, x - 12, y - 24, 24, 2, '#3f8a3a');
      px(c, x - 12, y - 2, 24, 2, '#245026');
      for (let i = 0; i < 14; i++) {
        px(c, x - 11 + rb() * 21, y - 21 + rb() * 18, 2, 2, i % 2 ? '#3a7a38' : '#245026');
      }
      // olhos e sobrancelhas
      px(c, x - 6, y - 20, 3, 4, '#12210f');
      px(c, x + 3, y - 20, 3, 4, '#12210f');
      px(c, x - 6, y - 22, 3, 1, '#1a2e12');
      px(c, x + 3, y - 22, 3, 1, '#1a2e12');
      // boca triste (cantos para baixo)
      px(c, x - 3, y - 13, 6, 1, '#12210f');
      px(c, x - 5, y - 12, 2, 1, '#12210f');
      px(c, x + 3, y - 12, 2, 1, '#12210f');
      break;
    }
    case 'verity_orb': {
      // bola amarela flutuante e sorridente
      const bob = Math.sin(t * 2 + d.seed) * 3;
      const oy = y - 17 + bob;
      c.globalAlpha = 0.14 + 0.06 * Math.sin(t * 3);
      pixelCircle(c, x, oy, 16, '#ffe36a');
      c.globalAlpha = 1;
      pixelCircle(c, x, oy, 8, '#d9a824');
      pixelCircle(c, x, oy, 7, '#f2c838');
      pixelCircle(c, x - 2, oy - 2, 3, '#ffe98a');
      px(c, x - 4, oy - 2, 2, 3, '#2a2010');
      px(c, x + 2, oy - 2, 2, 3, '#2a2010');
      px(c, x - 3, oy + 2, 6, 1, '#2a2010');
      px(c, x - 4, oy + 1, 1, 1, '#2a2010');
      px(c, x + 3, oy + 1, 1, 1, '#2a2010');
      px(c, x - 4, oy - 5, 2, 1, '#fff6c0');
      break;
    }
    case 'pickaxe_rack': {
      // suporte de madeira com picareta
      pixelEllipse(c, x, y + 1, 12, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 10, y - 40, 2, 40, '#3a2618');
      px(c, x + 8, y - 40, 2, 40, '#3a2618');
      px(c, x - 10, y - 40, 20, 2, '#5a3c28');
      px(c, x - 10, y - 30, 20, 2, '#5a3c28');
      px(c, x - 1, y - 30, 3, 26, '#6a4a2c');
      px(c, x, y - 30, 1, 26, '#8a6238');
      px(c, x - 9, y - 34, 18, 3, '#8a8f98');
      px(c, x - 9, y - 34, 18, 1, '#c8d0d8');
      px(c, x - 11, y - 32, 3, 5, '#6e747e');
      px(c, x + 8, y - 32, 3, 5, '#6e747e');
      px(c, x - 3, y - 31, 6, 2, '#4a4f57');
      break;
    }
    case 'obby_platform': {
      // plataforma blocky colorida com studs e borda iluminada
      const palette = ['#3a6ac9', '#c94a8a', '#4ac9a0', '#d9b24a', '#7a5ae0'];
      const col = d.color || palette[d.seed % palette.length];
      pixelEllipse(c, x, y - 1, 20, 5, 'rgba(0,0,0,0.35)');
      px(c, x - 18, y - 10, 36, 9, '#20243a');
      px(c, x - 18, y - 10, 36, 1, 'rgba(255,255,255,0.12)');
      px(c, x - 18, y - 18, 36, 9, col);
      px(c, x - 18, y - 18, 36, 2, 'rgba(255,255,255,0.32)');
      px(c, x - 18, y - 10, 36, 1, 'rgba(0,0,0,0.3)');
      for (let i = 0; i < 3; i++) {
        px(c, x - 12 + i * 10, y - 16, 4, 3, 'rgba(0,0,0,0.22)');
        px(c, x - 12 + i * 10, y - 17, 4, 2, 'rgba(255,255,255,0.35)');
      }
      c.globalAlpha = 0.45 + 0.3 * Math.sin(t * 2 + d.seed);
      px(c, x - 18, y - 18, 36, 1, '#a8e8ff');
      c.globalAlpha = 1;
      break;
    }
    case 'lava_block': {
      // bloco de lava baixo, com bolhas animadas
      const glow = 0.5 + Math.sin(t * 2.2 + d.seed) * 0.5;
      c.globalAlpha = 0.14 + glow * 0.10;
      pixelEllipse(c, x, y - 5, 34, 14, '#ff6a2a');
      c.globalAlpha = 1;
      px(c, x - 24, y - 10, 48, 9, '#3a1a10');
      px(c, x - 22, y - 9, 44, 8, '#a8240c');
      px(c, x - 20, y - 8, 40, 6, '#e05a20');
      px(c, x - 16, y - 7, 32, 4, '#ff9a3a');
      for (let i = 0; i < 4; i++) {
        const p = (t * 0.7 + i / 4 + d.seed * 0.01) % 1;
        c.globalAlpha = 1 - p * 0.6;
        pixelCircle(c, x - 14 + i * 9, y - 3 - Math.sin(p * Math.PI) * 6, 2 + p * 2,
          i % 2 ? '#ffd24a' : '#ff8a2a');
        c.globalAlpha = 1;
      }
      break;
    }
    case 'noob_statue': {
      // figura blocky genérica (amarelo/azul/verde), sem marca
      pixelEllipse(c, x, y + 1, 18, 4, 'rgba(0,0,0,0.35)');
      px(c, x - 16, y - 8, 32, 8, '#2f3440');
      px(c, x - 16, y - 8, 32, 1, '#4a5262');
      px(c, x - 9, y - 22, 7, 14, '#3f8a4a');
      px(c, x + 2, y - 22, 7, 14, '#3f8a4a');
      px(c, x - 9, y - 22, 7, 1, '#5aa85a');
      px(c, x + 2, y - 22, 7, 1, '#5aa85a');
      px(c, x - 11, y - 38, 22, 17, '#3a6ac9');
      px(c, x - 11, y - 38, 22, 2, '#5a8ae0');
      px(c, x - 11, y - 22, 22, 1, '#2a4a9a');
      px(c, x - 16, y - 37, 5, 14, '#e6c93a');
      px(c, x + 11, y - 37, 5, 14, '#e6c93a');
      px(c, x - 16, y - 37, 5, 1, '#f2df62');
      px(c, x - 8, y - 52, 16, 14, '#e6c93a');
      px(c, x - 8, y - 52, 16, 2, '#f2df62');
      px(c, x + 6, y - 52, 2, 14, '#c9a824');
      px(c, x - 4, y - 47, 2, 3, '#2a2010');
      px(c, x + 2, y - 47, 2, 3, '#2a2010');
      px(c, x - 2, y - 42, 4, 1, '#2a2010');
      px(c, x - 3, y - 43, 1, 1, '#2a2010');
      px(c, x + 2, y - 43, 1, 1, '#2a2010');
      break;
    }
    case 'checkpoint_flag': {
      // mastro com bandeira brilhante
      const pulse = 0.5 + 0.5 * Math.sin(t * 2 + d.seed);
      pixelEllipse(c, x, y + 1, 8, 3, 'rgba(0,0,0,0.3)');
      px(c, x - 8, y - 4, 16, 4, '#2f3440');
      px(c, x - 1, y - 46, 2, 42, '#8a9098');
      px(c, x - 1, y - 46, 1, 42, '#c9d2df');
      for (let col = 0; col < 5; col++) {
        const wave = Math.round(Math.sin(t * 3 + col * 0.7 + d.seed) * 1.5);
        px(c, x + 1 + col * 4, y - 45 + wave, 4, 7, col % 2 ? '#4ae8c0' : '#2fc9a0');
      }
      c.globalAlpha = 0.25 + pulse * 0.25;
      pixelCircle(c, x, y - 47, 5, '#7affd8');
      c.globalAlpha = 1;
      break;
    }
    case 'figure_shelf': {
      // estante branca de parede cheia de colecionáveis genéricos
      // (bonequinhos, caixas, pelúcias, plantas, livros e um porta-retrato)
      const sx0 = x - 116, sx1 = x + 134;
      const sw = sx1 - sx0;
      const top = y - 54, bottom = y - 3;
      const boneCol = '#e6e0d4', boneHi = '#f7f3e8', boneLo = '#b5ae9d', boneEdge = '#8f8878';
      // fundo levemente escuro
      px(c, sx0 + 3, top + 4, sw - 6, bottom - top - 6, '#2a2434');
      px(c, sx0 + 3, top + 4, sw - 6, 1, '#1e1a26');
      // laterais e topo
      px(c, sx0, top, sw, 5, boneCol);
      px(c, sx0, top, sw, 1, boneHi);
      px(c, sx0, top + 4, sw, 1, boneLo);
      px(c, sx0, top, 5, bottom - top, boneCol);
      px(c, sx0 + sw - 5, top, 5, bottom - top, boneCol);
      px(c, sx0, top, 1, bottom - top, boneHi);
      px(c, sx0 + 4, top, 1, bottom - top, boneLo);
      px(c, sx1 - 1, top, 1, bottom - top, boneLo);
      // prateleiras internas
      const rows = [y - 38, y - 22, y - 6];
      for (const ry of [y - 38, y - 22]) {
        px(c, sx0 + 4, ry, sw - 8, 3, boneCol);
        px(c, sx0 + 4, ry, sw - 8, 1, boneHi);
        px(c, sx0 + 4, ry + 2, sw - 8, 1, boneLo);
      }
      px(c, sx0, bottom - 3, sw, 3, boneCol);
      px(c, sx0, bottom - 3, sw, 1, boneHi);
      px(c, sx0, bottom - 1, sw, 1, boneEdge);
      // sombra suave projetada na parede
      px(c, sx0 + 3, bottom, sw - 6, 3, 'rgba(20,12,24,0.22)');
      // fita de LED roxa fina sob a prateleira superior
      px(c, sx0 + 7, top + 5, sw - 14, 1, 'rgba(186,126,255,0.9)');
      c.globalAlpha = 0.16;
      px(c, sx0 + 7, top + 6, sw - 14, 3, '#a86aff');
      c.globalAlpha = 1;

      // ---- helpers de colecionáveis (determinísticos) ----
      const figurinha = (ix, by, body, head) => {
        px(c, ix - 3, by - 1, 6, 1, 'rgba(0,0,0,0.4)');
        px(c, ix - 3, by - 7, 6, 6, body);
        px(c, ix - 3, by - 7, 6, 1, 'rgba(255,255,255,0.35)');
        px(c, ix - 2, by - 10, 4, 3, head);
        px(c, ix - 2, by - 10, 4, 1, 'rgba(255,255,255,0.4)');
        px(c, ix - 1, by - 9, 1, 1, '#1a1418');
        px(c, ix + 1, by - 9, 1, 1, '#1a1418');
      };
      const pelucia = (ix, by, col, ear) => {
        px(c, ix - 4, by - 1, 9, 1, 'rgba(0,0,0,0.4)');
        pixelCircle(c, ix, by - 6, 4, col);
        px(c, ix - 4, by - 11, 3, 3, ear);
        px(c, ix + 1, by - 11, 3, 3, ear);
        px(c, ix - 2, by - 7, 1, 1, '#1a1418');
        px(c, ix + 1, by - 7, 1, 1, '#1a1418');
        px(c, ix - 1, by - 5, 2, 1, 'rgba(255,255,255,0.4)');
      };
      const caixinha = (ix, by, w, h, col, lid) => {
        px(c, ix, by - h, w, h, col);
        px(c, ix, by - h, w, 1, lid);
        px(c, ix, by - h + 2, w, 1, 'rgba(0,0,0,0.22)');
        px(c, ix, by - 1, w, 1, 'rgba(0,0,0,0.42)');
        px(c, ix, by - h, 1, h, 'rgba(255,255,255,0.18)');
      };
      const livrinhos = (ix, by, cols) => {
        for (let i = 0; i < cols.length; i++) {
          const h = 8 + ((i * 3 + d.seed) % 4);
          px(c, ix + i * 4, by - h, 3, h, cols[i]);
          px(c, ix + i * 4, by - h, 3, 1, 'rgba(255,255,255,0.3)');
        }
        px(c, ix, by - 1, 4 * cols.length - 1, 1, 'rgba(0,0,0,0.4)');
      };
      const plantinha = (ix, by) => {
        px(c, ix - 3, by - 4, 6, 4, '#9a6a4a');
        px(c, ix - 3, by - 4, 6, 1, '#b5805a');
        px(c, ix - 1, by - 10, 2, 6, '#3f7a4a');
        px(c, ix - 5, by - 9, 4, 2, '#4a8f58');
        px(c, ix + 1, by - 8, 5, 2, '#4a8f58');
        px(c, ix - 4, by - 11, 2, 2, '#5aa066');
        px(c, ix + 2, by - 11, 2, 2, '#5aa066');
      };
      const retratinho = (ix, by) => {
        // porta-retrato pequeno com uma estrelinha (referência discreta)
        px(c, ix - 8, by - 13, 16, 13, boneHi);
        px(c, ix - 8, by - 13, 16, 1, '#ffffff');
        px(c, ix - 8, by - 1, 16, 1, boneEdge);
        px(c, ix - 7, by - 12, 14, 11, '#3a3048');
        px(c, ix - 7, by - 12, 14, 1, '#524866');
        drawText(c, '★', ix, by - 10, { scale: 1, color: '#ffe36a', align: 'center' });
        px(c, ix - 9, by, 18, 1, 'rgba(0,0,0,0.3)');
      };

      const figCols = ['#c94a6a', '#4a8ac9', '#5aa06a', '#c9a24a', '#8a5ac9', '#4ac9b0', '#c96a3a', '#8a8ac9'];
      const heads = ['#e8c2a0', '#d9b090', '#f0d0b0'];
      const pickCol = (i) => figCols[(i + d.seed) % figCols.length];
      const pickHead = (i) => heads[(i + d.seed) % heads.length];

      // prateleira de cima (baseline y - 38)
      const r0 = rows[0];
      livrinhos(x - 108, r0, ['#8a4a5a', '#4a6a8a', '#8a7a3a', '#5a7a5a']);
      caixinha(x - 88, r0, 10, 8, '#b8864a', '#d9b478');
      figurinha(x - 72, r0, pickCol(0), pickHead(0));
      figurinha(x - 58, r0, pickCol(1), pickHead(1));
      pelucia(x - 44, r0, '#c98a4a', '#a86a30');
      retratinho(x - 24, r0);
      figurinha(x - 2, r0, pickCol(2), pickHead(2));
      caixinha(x + 12, r0, 12, 8, '#4a7a9a', '#7aa8c9');
      figurinha(x + 32, r0, pickCol(3), pickHead(0));
      pelucia(x + 46, r0, '#9a94a8', '#7a7488');
      livrinhos(x + 60, r0, ['#c9a24a', '#7a5ac9', '#4a8a8a']);
      caixinha(x + 80, r0, 10, 7, '#c96a3a', '#e89060');
      plantinha(x + 98, r0);
      figurinha(x + 114, r0, pickCol(4), pickHead(1));

      // prateleira do meio (baseline y - 22)
      const r1 = rows[1];
      figurinha(x - 106, r1, pickCol(5), pickHead(2));
      caixinha(x - 92, r1, 11, 8, '#5a8a5a', '#8ab88a');
      pelucia(x - 74, r1, '#c96a8a', '#a84a6a');
      figurinha(x - 60, r1, pickCol(6), pickHead(0));
      figurinha(x - 48, r1, pickCol(7), pickHead(1));
      plantinha(x - 32, r1);
      caixinha(x - 16, r1, 13, 7, '#8a6a4a', '#b5906a');
      figurinha(x + 2, r1, pickCol(0), pickHead(2));
      pelucia(x + 16, r1, '#6a8ac9', '#4a6aa8');
      livrinhos(x + 32, r1, ['#8a7a3a', '#4a5a8a', '#8a4a5a']);
      figurinha(x + 50, r1, pickCol(1), pickHead(0));
      caixinha(x + 64, r1, 10, 8, '#b8864a', '#d9b478');
      plantinha(x + 82, r1);
      figurinha(x + 98, r1, pickCol(2), pickHead(1));
      caixinha(x + 112, r1, 11, 7, '#5a7a9a', '#8aa8c9');

      // prateleira de baixo (baseline y - 6)
      const r2 = rows[2];
      livrinhos(x - 108, r2, ['#4a6a8a', '#8a4a5a', '#5a7a5a']);
      figurinha(x - 88, r2, pickCol(3), pickHead(0));
      caixinha(x - 74, r2, 11, 9, '#8a5ac9', '#a880e0');
      pelucia(x - 56, r2, '#c9a24a', '#a8823a');
      figurinha(x - 38, r2, pickCol(4), pickHead(1));
      figurinha(x - 26, r2, pickCol(5), pickHead(2));
      plantinha(x - 8, r2);
      figurinha(x + 10, r2, pickCol(6), pickHead(0));
      pelucia(x + 26, r2, '#c96a4a', '#a84a30');
      caixinha(x + 44, r2, 12, 8, '#4a8a8a', '#7ab8b8');
      livrinhos(x + 60, r2, ['#8a4a5a', '#8a7a3a', '#4a5a8a']);
      figurinha(x + 78, r2, pickCol(7), pickHead(1));
      caixinha(x + 94, r2, 10, 7, '#b8864a', '#d9b478');
      figurinha(x + 110, r2, pickCol(0), pickHead(2));

      // moldura superior redesenhada por cima: itens altos ficam contidos
      // dentro do armário (evita o porta-retrato fundir com a tábua de cima)
      px(c, sx0, top, sw, 5, boneCol);
      px(c, sx0, top, sw, 1, boneHi);
      px(c, sx0, top + 4, sw, 1, boneLo);
      break;
    }
    case 'stream_desk': {
      // mesa com dois monitores, webcam, microfone, teclado, mouse e caneca "B"
      pixelEllipse(c, x, y + 1, 58, 5, 'rgba(0,0,0,0.38)');
      // pés
      px(c, x - 55, y - 13, 6, 13, '#2e2118');
      px(c, x + 49, y - 13, 6, 13, '#2e2118');
      px(c, x - 55, y - 13, 1, 13, '#4a3527');
      px(c, x + 49, y - 13, 1, 13, '#4a3527');
      px(c, x - 55, y - 1, 6, 1, '#1a120e');
      px(c, x + 49, y - 1, 6, 1, '#1a120e');
      // tampo de madeira
      px(c, x - 60, y - 22, 120, 6, '#4a3527');
      px(c, x - 60, y - 22, 120, 1, '#6b5034');
      px(c, x - 58, y - 20, 116, 2, 'rgba(130,96,64,0.35)');
      px(c, x - 60, y - 16, 120, 4, '#38281d');
      // LED roxo/rosa sob o tampo, com brilho no chão
      for (let i = 0; i < 36; i++) {
        const pulse = 0.55 + 0.45 * Math.sin(t * 2 + i * 0.35 + d.seed);
        c.globalAlpha = pulse;
        c.fillStyle = i % 2 ? '#b46aff' : '#ff7ad9';
        c.fillRect(x - 54 + i * 3, y - 15, 2, 1);
      }
      c.globalAlpha = 0.10;
      pixelEllipse(c, x, y - 10, 50, 9, '#b46aff');
      c.globalAlpha = 1;

      // monitor esquerdo: grid de memes/reacts
      px(c, x - 58, y - 56, 54, 30, '#161720');
      px(c, x - 58, y - 56, 54, 1, '#2c2f3c');
      px(c, x - 57, y - 55, 52, 28, '#0c1420');
      px(c, x - 56, y - 54, 50, 26, '#101a28');
      px(c, x - 56, y - 54, 50, 7, '#1e2b45');
      drawText(c, 'REACTS', x - 55, y - 54, { scale: 1, color: '#8ad0f0' });
      const tiles = ['#6a4a8a', '#3a6a8a', '#8a4a5a', '#4a8a6a', '#8a7a3a', '#5a5a8a'];
      for (let i = 0; i < 6; i++) {
        const tx = x - 54 + (i % 3) * 16;
        const ty = y - 45 + ((i / 3) | 0) * 10;
        px(c, tx, ty, 14, 8, '#1a2438');
        px(c, tx + 1, ty + 1, 12, 5, tiles[i]);
        px(c, tx + 1, ty + 1, 12, 1, 'rgba(255,255,255,0.25)');
        // carinha genérica do react
        px(c, tx + 4, ty + 2, 1, 1, '#0e0c14');
        px(c, tx + 8, ty + 2, 1, 1, '#0e0c14');
        px(c, tx + 5, ty + 4, 3, 1, '#0e0c14');
        px(c, tx + 1, ty + 6, 12, 1, 'rgba(0,0,0,0.35)');
      }
      // pé do monitor esquerdo
      px(c, x - 33, y - 26, 4, 4, '#141519');
      px(c, x - 38, y - 23, 14, 2, '#1a1c24');

      // monitor direito: chat com contador e aba FOFOCA
      px(c, x + 4, y - 56, 54, 30, '#161720');
      px(c, x + 4, y - 56, 54, 1, '#2c2f3c');
      px(c, x + 5, y - 55, 52, 28, '#0c1420');
      px(c, x + 6, y - 54, 50, 26, '#0e1420');
      px(c, x + 6, y - 54, 50, 8, '#1e2b45');
      drawText(c, 'CHAT', x + 7, y - 54, { scale: 1, color: '#8ad0f0' });
      drawText(c, '1,2K', x + 54, y - 54, { scale: 1, color: '#ff9ade', align: 'right' });
      // aba FOFOCA
      px(c, x + 7, y - 44, 38, 8, '#b8862a');
      px(c, x + 7, y - 44, 38, 1, '#e8c45a');
      px(c, x + 7, y - 37, 38, 1, '#7a5618');
      drawText(c, 'FOFOCA', x + 8, y - 44, { scale: 1, color: '#241806' });
      // linhas animadas do chat
      const chatCols = ['#ff7ad9', '#5ae8f0', '#a8ff8a'];
      const shift = Math.floor((t * 3.5) % 6);
      for (let i = 0; i < 2; i++) {
        const ly = y - 34 + i * 4;
        px(c, x + 8, ly, 2, 2, chatCols[i]);
        px(c, x + 12, ly, 12 + ((i * 9 + d.seed + shift) % 22), 2, chatCols[(i + 1) % 3]);
      }
      if (Math.sin(t * 2.4 + d.seed) > 0.2) px(c, x + 50, y - 29, 2, 2, '#8ad0f0');
      // pé do monitor direito
      px(c, x + 29, y - 26, 4, 4, '#141519');
      px(c, x + 24, y - 23, 14, 2, '#1a1c24');

      // webcam em cima do monitor direito, com LED vermelho
      px(c, x + 25, y - 60, 12, 4, '#2f3240');
      px(c, x + 25, y - 60, 12, 1, '#575c72');
      px(c, x + 27, y - 56, 3, 1, '#1f2128');
      pixelCircle(c, x + 31, y - 58, 2, '#0c0a14');
      px(c, x + 30, y - 59, 1, 1, '#8ab8d8');
      c.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + d.seed));
      px(c, x + 26, y - 59, 1, 1, '#ff4a4a');
      c.globalAlpha = 1;

      // caneca clara com "B" na frente do monitor direito, apoiada na mesa
      px(c, x + 44, y - 27, 8, 1, '#fff6e8');
      px(c, x + 44, y - 26, 8, 5, '#e2d5bd');
      px(c, x + 45, y - 26, 6, 1, 'rgba(255,255,255,0.45)');
      px(c, x + 44, y - 21, 8, 1, '#c9b8a0');
      // alça à direita
      px(c, x + 52, y - 26, 2, 1, '#c9b8a0');
      px(c, x + 53, y - 25, 1, 3, '#c9b8a0');
      px(c, x + 52, y - 22, 2, 1, '#c9b8a0');
      // "B" roxo 3x5 desenhado pixel a pixel (cabe no corpo da caneca)
      const mugB = ['###', '#.#', '##.', '#.#', '###'];
      for (let by = 0; by < mugB.length; by++) {
        for (let bx = 0; bx < 3; bx++) {
          if (mugB[by][bx] === '#') px(c, x + 47 + bx, y - 26 + by, 1, 1, '#5a3480');
        }
      }

      // teclado e mouse sobre o tampo
      px(c, x - 30, y - 21, 30, 3, '#191426');
      for (let i = 0; i < 9; i++) px(c, x - 29 + i * 3, y - 21, 2, 1, '#3a3050');
      px(c, x + 8, y - 21, 5, 3, '#191426');
      px(c, x + 8, y - 21, 5, 1, '#3a3050');

      // microfone em pedestal, à esquerda da mesa
      pixelEllipse(c, x - 64, y + 1, 9, 3, 'rgba(0,0,0,0.35)');
      px(c, x - 70, y - 2, 12, 2, '#242430');
      px(c, x - 65, y - 46, 2, 44, '#2a2c36');
      px(c, x - 65, y - 46, 1, 44, '#3c4050');
      px(c, x - 71, y - 55, 12, 9, '#1c1e26');
      px(c, x - 70, y - 54, 10, 7, '#3a3e4a');
      px(c, x - 69, y - 53, 8, 1, '#5a6070');
      px(c, x - 69, y - 49, 8, 1, '#2a2e38');
      c.globalAlpha = 0.5 + 0.5 * Math.abs(Math.sin(t * 4 + d.seed));
      px(c, x - 67, y - 52, 1, 1, '#ff5a7a');
      c.globalAlpha = 1;
      break;
    }
    case 'gaming_chair': {
      // cadeira gamer preta de encosto alto, base com rodinhas e brilho roxo
      pixelEllipse(c, x, y + 1, 19, 4, 'rgba(0,0,0,0.4)');
      // base estrela e rodinhas
      px(c, x - 18, y - 6, 36, 2, '#2a2d36');
      px(c, x - 18, y - 6, 36, 1, '#414652');
      for (const wx of [-18, -7, 6, 17]) {
        px(c, x + wx - 2, y - 5, 4, 5, '#08090c');
        px(c, x + wx - 1, y - 5, 2, 2, '#3a3e4a');
      }
      // haste e mecanismo
      px(c, x - 2, y - 16, 4, 10, '#33363f');
      px(c, x - 2, y - 16, 1, 10, '#4a4f5c');
      px(c, x - 4, y - 18, 8, 3, '#141519');
      // assento estofado (mais largo que o encosto)
      px(c, x - 17, y - 24, 34, 7, '#2e313a');
      px(c, x - 17, y - 24, 34, 2, '#3c414e');
      px(c, x - 16, y - 22, 32, 1, 'rgba(90,96,112,0.4)');
      px(c, x - 16, y - 17, 32, 2, '#141519');
      // braços
      px(c, x - 20, y - 27, 5, 3, '#33363f');
      px(c, x + 15, y - 27, 5, 3, '#33363f');
      px(c, x - 20, y - 27, 5, 1, '#505664');
      px(c, x + 15, y - 27, 5, 1, '#505664');
      px(c, x - 19, y - 24, 2, 2, '#1a1c22');
      px(c, x + 17, y - 24, 2, 2, '#1a1c22');
      // encosto alto e estreito
      px(c, x - 12, y - 48, 24, 25, '#1c1e25');
      px(c, x - 12, y - 48, 24, 1, '#3c414e');
      px(c, x - 15, y - 46, 3, 22, '#2a2d36');
      px(c, x + 12, y - 46, 3, 22, '#2a2d36');
      px(c, x - 15, y - 46, 1, 22, '#4a4f5c');
      px(c, x + 14, y - 46, 1, 22, '#121318');
      px(c, x - 12, y - 48, 1, 25, '#383d49');
      // apoio de cabeça
      px(c, x - 8, y - 53, 16, 5, '#1c1e25');
      px(c, x - 8, y - 53, 16, 1, '#3c414e');
      px(c, x - 5, y - 51, 10, 1, 'rgba(201,207,216,0.35)');
      // detalhes brancos genéricos (piping lateral, sem logo)
      px(c, x - 15, y - 39, 1, 6, 'rgba(201,207,216,0.55)');
      px(c, x + 14, y - 39, 1, 6, 'rgba(201,207,216,0.55)');
      px(c, x - 8, y - 53, 16, 1, 'rgba(255,255,255,0.35)');
      px(c, x - 17, y - 20, 34, 1, 'rgba(201,207,216,0.4)');
      // luz roxa rente à cadeira (sem virar halo)
      c.globalAlpha = 0.22;
      px(c, x - 15, y - 46, 1, 22, '#a86aff');
      px(c, x + 14, y - 46, 1, 22, '#7a4ad8');
      c.globalAlpha = 1;
      break;
    }
    case 'pc_tower': {
      // gabinete preto com lateral de vidro, fans RGB e cabos
      pixelEllipse(c, x, y + 1, 14, 4, 'rgba(0,0,0,0.38)');
      // pés
      px(c, x - 10, y - 4, 7, 4, '#0c0d11');
      px(c, x + 3, y - 4, 7, 4, '#0c0d11');
      // corpo
      px(c, x - 11, y - 54, 23, 51, '#101116');
      px(c, x - 11, y - 54, 23, 1, '#2c2f3a');
      px(c, x - 11, y - 54, 1, 51, '#22242c');
      px(c, x + 11, y - 54, 1, 51, '#08090c');
      // lateral de vidro
      px(c, x - 8, y - 50, 17, 42, '#141a26');
      px(c, x - 8, y - 50, 17, 1, '#2a3444');
      c.globalAlpha = 0.18;
      px(c, x - 8, y - 50, 17, 42, '#7a4ad8');
      c.globalAlpha = 1;
      // fans RGB
      for (let i = 0; i < 2; i++) {
        const fy = y - 42 + i * 18;
        const pulse = 0.6 + 0.4 * Math.sin(t * 2.6 + i * 1.7 + d.seed);
        c.globalAlpha = 0.22 * pulse;
        pixelCircle(c, x - 1, fy, 8, i ? '#5aa8ff' : '#b46aff');
        c.globalAlpha = 1;
        pixelCircle(c, x - 1, fy, 6, '#0e1016');
        pixelCircle(c, x - 1, fy, 5, i ? '#2a5a8a' : '#4a2a7a');
        px(c, x - 5, fy - 1, 3, 1, i ? '#8ad0ff' : '#d8a8ff');
        px(c, x + 1, fy + 2, 3, 1, i ? '#5aa8ff' : '#a86aff');
        px(c, x - 1, fy - 1, 2, 2, '#0a0b10');
      }
      // botão de energia e portas
      c.globalAlpha = 0.5 + 0.5 * Math.abs(Math.sin(t * 2.2 + d.seed));
      px(c, x + 7, y - 52, 1, 1, '#6affb0');
      c.globalAlpha = 1;
      px(c, x + 5, y - 48, 5, 1, '#2a2c36');
      px(c, x + 5, y - 46, 5, 1, '#2a2c36');
      // cabos discretos indo para a mesa
      c.strokeStyle = 'rgba(10,10,14,0.85)';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x - 11, y - 6);
      c.quadraticCurveTo(x - 20, y - 3, x - 26, y - 1);
      c.stroke();
      c.beginPath();
      c.moveTo(x - 11, y - 12);
      c.quadraticCurveTo(x - 22, y - 9, x - 28, y - 5);
      c.stroke();
      break;
    }
    case 'ring_light': {
      // ring light de luz quente/neutra, com mastro, tripé e brilho
      const pulse = 0.5 + 0.5 * Math.sin(t * 3 + d.seed);
      pixelEllipse(c, x, y + 1, 16, 4, 'rgba(0,0,0,0.35)');
      px(c, x - 12, y - 3, 10, 2, '#2e2a2c');
      px(c, x + 3, y - 3, 10, 2, '#2e2a2c');
      px(c, x - 12, y - 3, 2, 3, '#1c1a1a');
      px(c, x + 11, y - 3, 2, 3, '#1c1a1a');
      px(c, x - 1, y - 34, 3, 34, '#2e2a2c');
      const cy = y - 44;
      c.globalAlpha = 0.12 + pulse * 0.08;
      pixelCircle(c, x, cy, 24, '#ffe6b8');
      c.globalAlpha = 1;
      pixelCircle(c, x, cy, 16, '#3a3630');
      pixelCircle(c, x, cy, 14, '#ffe8c8');
      pixelCircle(c, x, cy, 11, '#1c1a18');
      // brilho nas bordas do anel (mantém o furo escuro)
      px(c, x - 8, cy - 10, 8, 2, '#fffdf4');
      px(c, x - 12, cy - 6, 2, 7, '#fffaf0');
      px(c, x + 3, cy + 9, 7, 2, '#ffe0c0');
      px(c, x + 10, cy + 2, 2, 5, '#f5cfa0');
      px(c, x - 1, cy + 16, 2, 12, '#2e2a2c');
      break;
    }
    case 'live_camera': {
      // câmera de live em tripé: corpo escuro, lente, telinha e REC piscando
      pixelEllipse(c, x, y + 1, 16, 4, 'rgba(0,0,0,0.35)');
      // tripé
      px(c, x - 12, y - 2, 11, 2, '#241f30');
      px(c, x + 2, y - 2, 11, 2, '#241f30');
      px(c, x - 12, y - 3, 2, 3, '#1a1622');
      px(c, x + 11, y - 3, 2, 3, '#1a1622');
      px(c, x - 1, y - 31, 3, 31, '#2a2436');
      px(c, x - 1, y - 31, 1, 31, '#3a3450');
      px(c, x - 4, y - 32, 9, 3, '#3a3450');
      // corpo da câmera
      px(c, x - 13, y - 44, 27, 14, '#241f2e');
      px(c, x - 13, y - 44, 27, 2, '#3a3450');
      px(c, x - 11, y - 42, 23, 11, '#1a1622');
      // alça superior
      px(c, x - 5, y - 48, 11, 4, '#2a2436');
      px(c, x - 4, y - 48, 9, 1, '#4a4460');
      // lente
      pixelCircle(c, x - 4, y - 37, 6, '#0e0c16');
      pixelCircle(c, x - 4, y - 37, 4, '#2a3a54');
      pixelCircle(c, x - 4, y - 37, 2, '#121e30');
      px(c, x - 6, y - 39, 2, 2, '#7ab0d0');
      // telinha lateral
      px(c, x + 3, y - 41, 8, 7, '#0e1a26');
      px(c, x + 4, y - 40, 6, 5, '#2a5a7a');
      px(c, x + 4, y - 39, 4, 1, '#8ad0e8');
      px(c, x + 4, y - 37, 3, 1, '#5a90b0');
      // LED REC vermelho piscando
      const rec = 0.5 + 0.5 * Math.sin(t * 5 + d.seed);
      c.globalAlpha = 0.35 + rec * 0.65;
      pixelCircle(c, x + 9, y - 42, 3, 'rgba(255,70,80,0.35)');
      px(c, x + 8, y - 43, 2, 2, '#ff3a4a');
      c.globalAlpha = 1;
      break;
    }
    case 'save_star': {
      // estrela de determinação: pequena, brilhante e pulsante
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + d.seed);
      const sy = y - 9 + Math.sin(t * 1.8 + d.seed) * 2;
      c.globalAlpha = 0.12 + pulse * 0.20;
      pixelCircle(c, x, sy, 13, '#ffe36a');
      c.globalAlpha = 1;
      px(c, x - 1, sy - 7, 3, 15, '#ffe36a');
      px(c, x - 7, sy - 1, 15, 3, '#ffe36a');
      px(c, x - 4, sy - 4, 3, 3, '#ffd24a');
      px(c, x + 2, sy - 4, 3, 3, '#ffd24a');
      px(c, x - 4, sy + 2, 3, 3, '#ffd24a');
      px(c, x + 2, sy + 2, 3, 3, '#ffd24a');
      px(c, x - 1, sy - 5, 2, 9, '#fff6d0');
      px(c, x - 5, sy - 1, 9, 2, '#fff6d0');
      c.globalAlpha = 0.3 + pulse * 0.4;
      px(c, x - 9, sy, 2, 1, '#ffe9a3');
      px(c, x + 8, sy, 2, 1, '#ffe9a3');
      px(c, x, sy - 9, 1, 2, '#ffe9a3');
      c.globalAlpha = 1;
      break;
    }
    case 'terminal_v': {
      // terminal de combate vermelho/preto com tela, slot e antena
      const pulse = 0.5 + 0.5 * Math.sin(t * 3 + d.seed);
      c.globalAlpha = 0.10 + pulse * 0.14;
      pixelEllipse(c, x, y - 14, 26, 24, '#ff3a3a');
      c.globalAlpha = 1;
      px(c, x - 16, y - 4, 32, 4, '#160a0e');
      px(c, x - 14, y - 5, 28, 1, '#3a1018');
      px(c, x - 13, y - 32, 26, 28, '#241014');
      px(c, x - 13, y - 32, 26, 2, '#4a1820');
      px(c, x - 13, y - 32, 3, 28, '#3a141a');
      px(c, x + 10, y - 32, 3, 28, '#160a0e');
      px(c, x - 9, y - 28, 18, 13, '#0c0406');
      px(c, x - 8, y - 27, 16, 11, '#2a060a');
      drawText(c, '>V', x, y - 26, { scale: 1, color: '#ff4a4a', align: 'center' });
      if (Math.sin(t * 4) > -0.2) px(c, x + 2, y - 18, 3, 1, '#ff8a8a');
      px(c, x - 4, y - 11, 8, 2, '#c9a24a');
      px(c, x - 3, y - 11, 6, 1, '#ffe9a3');
      px(c, x - 8, y - 7, 3, 2, '#ff4a4a');
      px(c, x - 3, y - 7, 3, 2, '#4a1820');
      px(c, x + 2, y - 7, 3, 2, '#4a1820');
      px(c, x + 6, y - 42, 1, 10, '#4a4a52');
      px(c, x + 5, y - 44, 3, 2, '#8a9098');
      c.globalAlpha = 0.5 + pulse * 0.5;
      px(c, x + 6, y - 45, 1, 1, '#ff4a4a');
      c.globalAlpha = 1;
      break;
    }
    case 'egg_alien': {
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + (d.seed || 0));
      const sd = d.seed || 0;
      pixelEllipse(c, x, y + 1, 10, 3, 'rgba(0,0,0,0.34)');
      c.globalAlpha = 0.09 + pulse * 0.12;
      pixelEllipse(c, x, y - 10, 15 + pulse * 3, 13, d.open ? '#8aff6a' : '#6a8a4a');
      c.globalAlpha = 1;

      c.save();
      c.translate(x, y);
      const ps = 1 + pulse * 0.02;
      c.scale(ps, ps);

      if (!d.open) {
        // ovo fechado: casco de couro e pétalas recolhidas
        pixelEllipse(c, 0, -10, 8, 10, '#2e1d18');
        pixelEllipse(c, 0, -10, 7, 9, '#4a3026');
        pixelEllipse(c, -2, -12, 3, 5, '#6a4634');
        pixelEllipse(c, 2, -8, 2, 4, '#3a241e');
        // sulcos entre as pétalas
        c.fillStyle = 'rgba(22,10,8,0.75)';
        for (const gx of [-5, 0, 5]) {
          for (let yy = 0; yy < 19; yy++) {
            const off = Math.sin(yy * 0.45 + gx) * 0.8;
            c.fillRect(Math.round(gx + off), -20 + yy, 1, 1);
          }
        }
        // veias ácido pulsando na casca
        c.strokeStyle = `rgba(138,255,106,${0.22 + pulse * 0.45})`;
        c.lineWidth = 1;
        const vein = (pts) => {
          c.beginPath();
          c.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
          c.stroke();
        };
        vein([[-2, -19], [-4, -14], [-1, -10], [-4, -6]]);
        vein([[3, -18], [1, -12], [4, -8]]);
        vein([[0, -20], [0, -15], [-1, -11]]);
        // coração quente brilhando entre as veias
        c.globalAlpha = 0.25 + pulse * 0.55;
        px(c, -1, -13, 2, 2, '#b0ff8a');
        c.globalAlpha = 1;
        // pontas fechadas
        px(c, -6, -20, 3, 2, '#3a241e');
        px(c, -2, -21, 3, 2, '#4a3026');
        px(c, 2, -21, 3, 2, '#4a3026');
        px(c, 5, -20, 3, 2, '#3a241e');
        // poros e manchas
        speckle(c, -6, -18, 12, 16, '#2a1814', 9, mulberry32(sd), 1);
        speckle(c, -5, -17, 10, 14, '#7a5a44', 5, mulberry32(sd + 1), 1);
        px(c, -3, -15, 1, 1, '#8a6a52');
      } else {
        // casco inferior
        pixelEllipse(c, 0, -6, 8, 7, '#2e1d18');
        pixelEllipse(c, 0, -6, 7, 6, '#4a3026');
        pixelEllipse(c, -2, -7, 3, 4, '#6a4634');
        // abertura escura
        pixelEllipse(c, 0, -12, 7, 3, '#3a241e');
        pixelEllipse(c, 0, -12, 6, 2, '#0e1a10');
        // pétalas abertas para fora
        const petal = (ax, ay, bx2, by2, cx2, cy2) => {
          c.fillStyle = '#4a3026';
          c.beginPath();
          c.moveTo(ax, ay);
          c.lineTo(bx2, by2);
          c.lineTo(cx2, cy2);
          c.closePath();
          c.fill();
        };
        petal(-2, -12, -15, -20, -9, -8);
        petal(-1, -13, -5, -28, 2, -12);
        petal(1, -13, 6, -28, 4, -12);
        petal(2, -12, 15, -20, 9, -8);
        // bordas iluminadas das pétalas
        px(c, -13, -19, 1, 3, '#6a4634');
        px(c, -5, -27, 1, 5, '#6a4634');
        px(c, 6, -27, 1, 5, '#6a4634');
        px(c, 13, -19, 1, 3, '#6a4634');
        // interior ácido
        c.globalAlpha = 0.35 + pulse * 0.45;
        pixelCircle(c, 0, -12, 3, '#8aff6a');
        pixelCircle(c, 0, -12, 1.5, '#e0ffb0');
        c.globalAlpha = 1;
        // gosma
        pixelEllipse(c, 7, -1, 3, 1, 'rgba(110,180,80,0.45)');
        px(c, 6, -4, 1, 3, '#6a9a52');
        px(c, 9, -3, 1, 2, '#6a9a52');
        px(c, -8, -2, 1, 2, '#4a7a3a');
      }
      c.restore();
      break;
    }
    case 'batsignal': {
      // emblema amarelo pendurado por cordão curto (arte própria, sem logo)
      const R = 10;
      // feixe de luz fino vindo de cima (opcional, sutil)
      c.globalAlpha = 0.07 + 0.02 * Math.sin(t * 1.7 + (d.seed || 0));
      c.fillStyle = '#ffe9a3';
      c.beginPath();
      c.moveTo(x - 3, y - R);
      c.lineTo(x - 8, y - R - 66);
      c.lineTo(x + 8, y - R - 66);
      c.closePath();
      c.fill();
      c.globalAlpha = 1;
      // cordão curto até um prego acima
      c.strokeStyle = '#3a3a44';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x + 6, y - R - 12);
      c.lineTo(x, y - R + 1);
      c.stroke();
      px(c, x + 5, y - R - 14, 3, 2, '#22222a'); // prego
      px(c, x + 6, y - R - 14, 1, 1, '#55555e');
      // halo pulsando (mais forte com o sinal aceso)
      const lit = room && room.batLit;
      c.globalAlpha = lit ? 0.45 + 0.2 * Math.sin(t * 3.4 + x * 0.1) : 0.2 + 0.1 * Math.sin(t);
      pixelCircle(c, x, y, R + 4 + (lit ? Math.sin(t * 3.4) * 1.5 : 0), '#ffd94a');
      c.globalAlpha = 1;
      // círculo do sinal: 2 tons
      pixelCircle(c, x, y, R, '#ffd94a');
      pixelCircle(c, x, y, R - 2, '#ffeb8a');
      // silhueta do morcego (pixel, simétrica, arte própria)
      const B = '#1a1a1f';
      const tri = (ax, ay, bx, by, cx2, cy2) => {
        c.fillStyle = B;
        c.beginPath();
        c.moveTo(ax, ay);
        c.lineTo(bx, by);
        c.lineTo(cx2, cy2);
        c.closePath();
        c.fill();
      };
      tri(x - 1, y - 2, x - 7, y - 5, x - 5, y + 1); // asa esq (tri superior)
      tri(x - 1, y + 1, x - 5, y + 1, x - 2, y + 4); // asa esq (tri inferior)
      tri(x + 1, y - 2, x + 7, y - 5, x + 5, y + 1); // asa dir (tri superior)
      tri(x + 1, y + 1, x + 5, y + 1, x + 2, y + 4); // asa dir (tri inferior)
      px(c, x - 2, y - 5, 1, 2, B); // orelha esq
      px(c, x + 1, y - 5, 1, 2, B); // orelha dir
      px(c, x - 2, y - 3, 5, 2, B); // cabeça
      px(c, x - 1, y - 1, 3, 4, B); // corpo
      px(c, x, y + 3, 1, 1, B); // ponta
      break;
    }
    case 'arc_reactor': {
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + (d.seed || 0));
      // cabo fino desligando o pedestal para um canto (dica de máquina)
      px(c, x - 32, y - 4, 17, 4, '#22303a');
      px(c, x - 32, y - 4, 17, 1, '#33424c');
      // sombra no chão
      pixelEllipse(c, x, y + 1, 17, 4, 'rgba(0,0,0,0.35)');
      // piscina de luz ciano no chão (pulsando)
      c.globalAlpha = 0.12 + pulse * 0.18;
      pixelEllipse(c, x, y + 1, 24, 5, '#4ad0e8');
      c.globalAlpha = 1;
      // halo do núcleo
      c.globalAlpha = 0.10 + pulse * 0.16;
      pixelCircle(c, x, y - 22, 18, '#4ad0e8');
      c.globalAlpha = 1;
      // pedestal baixo
      px(c, x - 15, y - 10, 30, 10, '#26323a');
      px(c, x - 15, y - 10, 30, 2, '#4a5a64');
      px(c, x - 15, y - 2, 30, 2, '#171f24');
      px(c, x - 12, y - 14, 24, 5, '#33424c');
      px(c, x - 12, y - 14, 24, 1, '#607078');
      px(c, x - 6, y - 18, 12, 4, '#2a3840');
      px(c, x - 6, y - 18, 12, 1, '#52626c');
      // anel externo segmentado (girando)
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + t * 1.5;
        const rx = x + Math.round(Math.cos(a) * 11);
        const ry = y - 22 + Math.round(Math.sin(a) * 11);
        px(c, rx - 2, ry - 1, 4, 2, i % 2 ? '#8a9aa4' : '#5a6a74');
        px(c, rx - 1, ry - 1, 2, 1, '#c8d4dc');
      }
      // segmento destacado pulsando na varredura
      const sa = Math.floor((((t * 1.5) / (Math.PI * 2)) * 8) % 8 + 8) % 8;
      const ha = (sa / 8) * Math.PI * 2 + t * 1.5;
      const hx = x + Math.round(Math.cos(ha) * 11);
      const hy = y - 22 + Math.round(Math.sin(ha) * 11);
      c.globalAlpha = 0.55 + 0.45 * Math.sin(t * 6);
      px(c, hx - 2, hy - 1, 4, 2, '#dff4fa');
      c.globalAlpha = 1;
      // 3 bobinas externas com arcos em zigzag amarelo-branco (nas picos de pulsação)
      const zig = Math.max(0, Math.sin(t * 6));
      for (let i = 0; i < 3; i++) {
        const a = -Math.PI / 2 + (i * Math.PI * 2) / 3 + Math.sin(t * 0.5) * 0.08;
        const bx = x + Math.cos(a) * 16;
        const by = y - 22 + Math.sin(a) * 16;
        px(c, bx - 1, by - 1, 3, 3, '#5a6a74'); // bobina
        px(c, bx, by - 1, 1, 1, '#c8d4dc');
        if (zig > 0.15) {
          const ix = x + Math.cos(a) * 11; // anel externo
          const iy = y - 22 + Math.sin(a) * 11;
          const mx = (bx + ix) / 2;
          const my = (by + iy) / 2;
          const nx = Math.cos(a + Math.PI / 2);
          const ny = Math.sin(a + Math.PI / 2);
          c.globalAlpha = zig * zig * 0.9;
          c.strokeStyle = '#ffd94a';
          c.lineWidth = 2;
          c.beginPath();
          c.moveTo(bx, by);
          c.lineTo(mx + nx * 2, my + ny * 2);
          c.lineTo(mx - nx * 2, my - ny * 2);
          c.lineTo(ix, iy);
          c.stroke();
          c.strokeStyle = '#ffffff';
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(bx, by);
          c.lineTo(mx + nx * 2, my + ny * 2);
          c.lineTo(mx - nx * 2, my - ny * 2);
          c.lineTo(ix, iy);
          c.stroke();
          c.globalAlpha = 1;
        }
      }
      // núcleo escuro
      pixelCircle(c, x, y - 22, 8, '#123a46');
      // dois anéis triangulados internos (3 segmentos de bobina, sentidos opostos)
      for (const [rad, dir, spd] of [[5.2, 1, 1.1], [2.9, -1, 1.8]]) {
        for (let i = 0; i < 3; i++) {
          const a0 = dir * t * spd + (i * Math.PI * 2) / 3;
          const a1 = a0 + Math.PI / 2.6; // arco ~69°, 3 bobinas em triângulo
          c.strokeStyle = '#1e5a74';
          c.lineWidth = 2;
          c.beginPath();
          c.arc(x, y - 22, rad, a0, a1);
          c.stroke();
          c.strokeStyle = '#4ad0e8';
          c.lineWidth = 1;
          c.beginPath();
          c.arc(x, y - 22, rad, a0, a1);
          c.stroke();
        }
      }
      // núcleo incandescente
      pixelCircle(c, x, y - 22, 1.5, '#d8ffff');
      // cross flare de lente no núcleo (no pico do pulso)
      const cf = Math.max(0, Math.sin(t * 2.4 + (d.seed || 0)) - 0.6) / 0.4;
      if (cf > 0) {
        c.globalAlpha = cf * 0.85;
        c.strokeStyle = '#eaffff';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x - 7, y - 22); c.lineTo(x + 7, y - 22); // eixo +
        c.moveTo(x, y - 29); c.lineTo(x, y - 15); // eixo |
        c.moveTo(x - 4, y - 26); c.lineTo(x + 4, y - 18); // eixo x
        c.moveTo(x + 4, y - 26); c.lineTo(x - 4, y - 18);
        c.stroke();
        c.globalAlpha = 1;
        px(c, x - 1, y - 23, 2, 2, '#ffffff'); // 2px centrais no pico
      }
      c.globalAlpha = 0.25 + pulse * 0.4;
      px(c, x - 3, y - 26, 2, 2, '#eaffff');
      px(c, x + 2, y - 20, 1, 1, '#eaffff');
      c.globalAlpha = 1;
      break;
    }
    case 'web_anchor': {
      const sway = Math.sin(t * 0.8 + (d.seed || 0)) * 0.6;
      const topY = INNER.y + 1;
      const hookY = y - 3;
      const strands = [[-16, 0.2], [-7, 0.8], [5, 1.1], [14, 0.5]];
      c.strokeStyle = 'rgba(210,205,190,0.45)';
      c.lineWidth = 1;
      for (const [off, k] of strands) {
        c.beginPath();
        c.moveTo(x + off, topY);
        c.lineTo(x + sway * k, hookY);
        c.stroke();
      }
      // fios transversais formando a teia
      c.strokeStyle = 'rgba(210,205,190,0.28)';
      for (const f of [0.28, 0.52, 0.76]) {
        const py2 = Math.round(topY + (hookY - topY) * f);
        const left = Math.round(x - 16 * (1 - f) + sway * f);
        const right = Math.round(x + 14 * (1 - f) + sway * f);
        c.beginPath();
        c.moveTo(left, py2);
        c.quadraticCurveTo(x, py2 + 3, right, py2);
        c.stroke();
      }
      // fios de seda cintilando (pontos de orvalho/luz)
      for (let i = 0; i < 7; i++) {
        const a = i * 2.399 + 1.3;
        const rr = 4 + ((i * 5) % 12);
        const gx = x + Math.cos(a) * rr + sway * 0.6;
        const gy = y - 14 + Math.sin(a) * rr;
        const tw = Math.max(0, Math.sin(t * 2.6 + i * 2.3));
        if (tw > 0.72) px(c, gx, gy, 1, 1, '#ffffff');
        else if (tw > 0.4) px(c, gx, gy, 1, 1, 'rgba(240,238,225,0.55)');
      }
      // gancho preso na parede
      px(c, x - 4, y - 7, 8, 2, '#5a5148');
      px(c, x - 4, y - 5, 2, 4, '#4a4238');
      px(c, x + 2, y - 5, 2, 4, '#4a4238');
      px(c, x - 1, y - 8, 3, 2, '#7a7060');
      // aranha pendurada
      const spiderY = y - 12 + Math.sin(t * 1.4 + (d.seed || 0)) * 1.5;
      px(c, x, y - 22, 1, Math.max(2, spiderY - (y - 22)), 'rgba(215,210,195,0.4)');
      px(c, x - 2, spiderY, 5, 3, '#2a2420');
      px(c, x - 1, spiderY - 2, 3, 2, '#2a2420');
      px(c, x - 4, spiderY, 2, 1, '#3a342c');
      px(c, x + 3, spiderY, 2, 1, '#3a342c');
      px(c, x - 4, spiderY + 2, 2, 1, '#3a342c');
      px(c, x + 3, spiderY + 2, 2, 1, '#3a342c');
      px(c, x - 1, spiderY - 1, 1, 1, '#c84a3a');
      px(c, x + 1, spiderY - 1, 1, 1, '#c84a3a');
      break;
    }
    case 'myers_figure': {
      if (!d.hidden) {
        const breath = Math.round(Math.sin(t * 1.1 + (d.seed || 0)) * 0.5);
        const sway = Math.sin(t * 0.8 + (d.seed || 0) * 0.4) * 0.04;
        c.save();
        c.translate(x, y);
        c.rotate(sway);
        c.translate(-x, -y);
        pixelEllipse(c, x, y + 1, 11, 3, 'rgba(0,0,0,0.36)');
        // pernas e botas
        px(c, x - 6, y - 18, 4, 18, '#232a26');
        px(c, x + 2, y - 18, 4, 18, '#1a201d');
        px(c, x - 7, y - 3, 5, 3, '#121514');
        px(c, x + 2, y - 3, 5, 3, '#121514');
        // macacão
        px(c, x - 8, y - 36 + breath, 16, 19, '#28302b');
        px(c, x - 8, y - 36 + breath, 16, 2, '#3a443d');
        px(c, x - 8, y - 36 + breath, 2, 18, '#333d37');
        px(c, x + 6, y - 36 + breath, 2, 18, '#1a201d');
        px(c, x, y - 33 + breath, 1, 15, '#1a201d');
        // braços rígidos
        px(c, x - 11, y - 34 + breath, 3, 17, '#252d28');
        px(c, x + 8, y - 34 + breath, 3, 17, '#1a201d');
        px(c, x - 11, y - 18 + breath, 3, 2, '#c8c2ac');
        px(c, x + 8, y - 18 + breath, 3, 2, '#c8c2ac');
        // máscara pálida genérica
        px(c, x - 6, y - 47 + breath, 12, 13, '#d8d2bc');
        px(c, x - 5, y - 46 + breath, 10, 11, '#e6e0cc');
        // cabelo escuro
        px(c, x - 7, y - 48 + breath, 14, 4, '#241e18');
        px(c, x - 7, y - 45 + breath, 2, 6, '#241e18');
        px(c, x + 5, y - 45 + breath, 2, 6, '#2a241e');
        // olhos vazios, nariz e boca discretos
        px(c, x - 4, y - 42 + breath, 2, 2, '#14120f');
        px(c, x + 2, y - 42 + breath, 2, 2, '#14120f');
        px(c, x, y - 40 + breath, 1, 2, '#b8b2a0');
        px(c, x - 2, y - 37 + breath, 4, 1, '#9a8f80');
        // marca genérica na bochecha
        px(c, x - 4, y - 38 + breath, 2, 1, '#b5aa96');
        // faca escondida ao lado (lâmina quase invisível no escuro)
        px(c, x + 10, y - 12, 1, 6, '#2c3138');
        px(c, x + 10, y - 12, 1, 1, '#4a525c');
        if (Math.max(0, Math.sin(t * 1.6 + 2.1)) > 0.93) {
          px(c, x + 10, y - 12, 1, 1, '#dfe8ff');
        }
        c.restore();
      }
      break;
    }
    case 'phone_scare': {
      // telefone de parede antigo com cúpula dupla
      const ringing = (typeof gameState !== 'undefined' && gameState && gameState.easter && gameState.easter.phoneRinging);
      const bellShake = ringing ? Math.round(Math.sin(t * 30) * 1) : 0;
      const bellGlow = ringing ? 0.5 + 0.5 * Math.sin(t * 11) : 0;
      px(c, x - 13, y - 36, 26, 34, 'rgba(0,0,0,0.22)');
      px(c, x - 9, y - 34, 18, 32, '#2a1e18');
      px(c, x - 9, y - 34, 18, 2, '#4a3426');
      px(c, x - 9, y - 34, 2, 32, '#3a2a20');
      px(c, x + 7, y - 34, 2, 32, '#17100c');
      px(c, x - 7, y - 31, 14, 22, '#3a2a20');
      // parafusos
      for (const [sx2, sy2] of [[-7, -31], [6, -31], [-7, -12], [6, -12]]) {
        px(c, x + sx2, y + sy2, 1, 1, '#8a6a48');
      }
      // fone no gancho
      px(c, x - 14, y - 32, 7, 4, '#3a2a20');
      px(c, x - 14, y - 19, 7, 4, '#3a2a20');
      px(c, x - 13, y - 31, 5, 15, '#241a14');
      px(c, x - 12, y - 27, 3, 7, '#4a3426');
      px(c, x - 12, y - 31, 3, 1, '#6a4a32');
      px(c, x - 8, y - 28, 2, 3, '#5a4030');
      px(c, x - 8, y - 20, 2, 3, '#5a4030');
      // cordão ondulado até a base
      c.strokeStyle = '#1a120e';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x - 10, y - 16);
      for (let i = 1; i <= 12; i++) {
        const f = i / 12;
        c.lineTo(x - 10 + f * 14 + Math.sin(f * Math.PI * 5) * 3, y - 16 + f * 14);
      }
      c.stroke();
      c.strokeStyle = 'rgba(120,90,60,0.35)';
      c.beginPath();
      c.moveTo(x - 10, y - 15);
      for (let i = 1; i <= 12; i++) {
        const f = i / 12;
        c.lineTo(x - 10 + f * 14 + Math.sin(f * Math.PI * 5) * 3, y - 15 + f * 14);
      }
      c.stroke();
      // manivela
      px(c, x + 9, y - 24, 4, 2, '#4a3426');
      pixelCircle(c, x + 13, y - 23, 2, '#6a4a32');
      px(c, x + 9, y - 21, 3, 2, '#2a1e18');
      // plaqueta
      px(c, x - 5, y - 28, 10, 3, '#5a4532');
      px(c, x - 3, y - 27, 6, 1, '#8a6a48');
      // cúpula dupla da campainha no topo
      px(c, x - 8 - bellShake, y - 40, 6, 4, '#4a3426');
      px(c, x - 8 - bellShake, y - 40, 6, 1, '#7a5a3a');
      px(c, x + 2 + bellShake, y - 40, 6, 4, '#4a3426');
      px(c, x + 2 + bellShake, y - 40, 6, 1, '#7a5a3a');
      px(c, x - 1, y - 42, 3, 2, '#241a14');
      if (ringing) {
        // ondas de toque pulsando das cúpulas
        c.globalAlpha = 0.35 + bellGlow * 0.45;
        pixelCircle(c, x - 6 - bellShake, y - 42, 2, '#ffe9a3');
        pixelCircle(c, x + 6 + bellShake, y - 42, 2, '#ffe9a3');
        c.globalAlpha = 1;
      }
      break;
    }
    case 'question_block': {
      const bounce = d.bounceT > 0 ? -Math.sin((d.bounceT / 0.35) * Math.PI) * 6 : 0;
      const twBoost = d.bounceT > 0 ? 1 : 0.4;
      pixelEllipse(c, x, y, 8, 2, 'rgba(0,0,0,0.28)');
      const by2 = y - 26 + bounce;
      // bloco amarelo com chanfros
      px(c, x - 8, by2, 16, 16, '#e6bb4f');
      px(c, x - 8, by2, 16, 2, '#ffe9a3');
      px(c, x - 8, by2, 2, 16, '#ffe9a3');
      px(c, x - 8, by2 + 14, 16, 2, '#a97c25');
      px(c, x + 6, by2, 2, 16, '#a97c25');
      px(c, x - 5, by2 + 3, 10, 10, '#e8c85a');
      px(c, x - 5, by2 + 3, 10, 1, '#f4d878');
      // parafusos nos cantos
      for (const [dx2, dy2] of [[-6, 2], [5, 2], [-6, 13], [5, 13]]) {
        px(c, x + dx2, by2 + dy2, 1, 1, '#8a6418');
      }
      // "?" em pixels escuros
      const qx = x - 2, qy = by2 + 3, qc = '#6a4a08';
      const q = (dx2, dy2, w, h) => px(c, qx + dx2, qy + dy2, w, h, qc);
      q(1, 0, 3, 1);
      q(0, 1, 1, 1);
      q(4, 1, 1, 1);
      q(4, 2, 1, 1);
      q(3, 3, 1, 1);
      q(2, 4, 1, 1);
      q(2, 6, 1, 1);
      // faíscas mágicas cintilando (mais brilhantes no quique)
      for (let i = 0; i < 6; i++) {
        const a = i * 1.047 + 0.6 + Math.floor(t * 2) * 0.3;
        const rr = 12 + ((i * 37) % 6);
        const sx = x + Math.cos(a) * rr;
        const sy = by2 + 8 + Math.sin(a) * (rr - 4);
        const tw = Math.max(0, Math.sin(t * 6 + i * 2.1)) * twBoost;
        if (tw > 0.28) {
          c.globalAlpha = tw;
          px(c, sx, sy, 1, 1, '#fff6c8');
        }
      }
      c.globalAlpha = 1;
      break;
    }
    case 'crt_tv': {
      // A CENA DO FILME: TV CRT pesada sobre gabinete de madeira,
      // ATARI 2600 de madeira na frente (grão vertical, dois botões
      // redondos, "2600" estilizado) e joystick no chão.
      const sd = d.seed || 0;
      const flick = 0.5 + 0.5 * Math.sin(t * 7.3 + sd);
      const boot = 0.5 + 0.5 * Math.sin(t * 2.1 + sd * 0.7);
      const noiseSeed = Math.floor(t * 11) * 7919 + sd * 131;
      const rngN = mulberry32(noiseSeed + 1);

      // sombra projetada na plataforma de gelo
      pixelEllipse(c, x, y + 14, 46, 5, 'rgba(8,14,24,0.5)');

      // gabinete de madeira (suporte da TV), grão vertical
      px(c, x - 38, y - 2, 76, 15, '#4a301c');
      px(c, x - 38, y - 2, 76, 2, '#6d4c2f');
      px(c, x - 38, y - 2, 1, 15, '#5c3f27');
      px(c, x + 37, y - 2, 1, 15, '#241610');
      for (let gx = x - 34; gx < x + 36; gx += 6) {
        px(c, gx, y, 1, 13, '#3f2817');
        px(c, gx + 3, y, 1, 13, '#54371f');
      }
      // portas do gabinete com puxadores dourados
      px(c, x - 33, y + 1, 30, 11, '#41291a');
      px(c, x + 3, y + 1, 30, 11, '#41291a');
      px(c, x - 18, y + 5, 5, 2, '#c9a24a');
      px(c, x + 13, y + 5, 5, 2, '#c9a24a');
      // pés do gabinete
      px(c, x - 35, y + 13, 6, 2, '#241a12');
      px(c, x + 29, y + 13, 6, 2, '#241a12');

      // corpo pesado do CRT
      px(c, x - 33, y - 46, 66, 45, '#1f2126');
      px(c, x - 33, y - 46, 66, 2, '#3f434b');
      px(c, x - 33, y - 46, 1, 45, '#2e3138');
      px(c, x + 32, y - 46, 1, 45, '#0e1013');
      px(c, x - 33, y - 3, 66, 2, '#0a0b0d');
      // lateral esquerda de madeira (aparelho clássico), grão vertical
      px(c, x - 33, y - 44, 5, 42, '#4a301c');
      px(c, x - 33, y - 44, 5, 2, '#6d4c2f');
      px(c, x - 31, y - 44, 1, 42, '#33200f');
      px(c, x - 29, y - 44, 1, 42, '#54371f');
      // lateral direita de madeira
      px(c, x + 28, y - 44, 5, 42, '#4a301c');
      px(c, x + 28, y - 44, 5, 2, '#6d4c2f');
      px(c, x + 30, y - 44, 1, 42, '#33200f');

      // tela: moldura interna escura e vidro curvo
      px(c, x - 26, y - 42, 42, 34, '#0c0d10');
      px(c, x - 24, y - 40, 38, 30, '#111316');
      // fósforo (adventure-esque, arte original)
      c.globalAlpha = 0.92 + flick * 0.08;
      px(c, x - 24, y - 40, 38, 30, '#14301e');
      c.globalAlpha = 1;
      // silhueta de castelo (eco do Adventure, arte original)
      c.fillStyle = '#050c07';
      c.fillRect(x - 18, y - 24, 26, 12);
      c.fillRect(x - 15, y - 30, 5, 7);
      c.fillRect(x - 3, y - 33, 6, 10);
      c.fillRect(x + 7, y - 30, 5, 7);
      c.fillRect(x - 15, y - 32, 1, 2);
      c.fillRect(x - 12, y - 32, 1, 2);
      c.fillRect(x - 9, y - 32, 1, 2);
      c.fillRect(x - 3, y - 35, 1, 2);
      c.fillRect(x, y - 35, 1, 2);
      c.fillRect(x + 3, y - 35, 1, 2);
      c.fillRect(x + 7, y - 32, 1, 2);
      c.fillRect(x + 10, y - 32, 1, 2);
      c.fillRect(x + 13, y - 32, 1, 2);
      // portão do castelo
      c.fillRect(x - 1, y - 18, 5, 6);
      // chave dourada cintilando na tela
      c.globalAlpha = 0.35 + boot * 0.65;
      px(c, x + 9, y - 37, 1, 1, '#ffd24a');
      c.globalAlpha = 1;
      // estática animada (pontos por frame)
      for (let i = 0; i < 46; i++) {
        const nx = x - 24 + Math.floor(rngN() * 38);
        const ny = y - 40 + Math.floor(rngN() * 30);
        c.globalAlpha = 0.14 + rngN() * 0.3;
        px(c, nx, ny, 1, 1, rngN() < 0.25 ? '#b8ffcc' : '#5a8a68');
      }
      c.globalAlpha = 1;
      // scanlines
      for (let sy = 0; sy < 30; sy += 3) {
        px(c, x - 24, y - 40 + sy, 38, 1, 'rgba(3,14,7,0.5)');
      }
      // banda de varredura descendo
      const scanY = y - 40 + Math.floor((t * 17 + sd * 3) % 30);
      px(c, x - 24, scanY, 38, 1, 'rgba(190,255,205,0.13)');
      // reflexo de vidro
      px(c, x - 21, y - 37, 9, 1, 'rgba(230,255,235,0.25)');
      px(c, x - 22, y - 35, 1, 5, 'rgba(230,255,235,0.12)');
      // vazamento de luz da tela no gabinete
      c.globalAlpha = 0.10 + flick * 0.08;
      pixelEllipse(c, x - 7, y + 1, 24, 3, '#bdf0c8');
      c.globalAlpha = 1;

      // painel de controle do CRT (lateral direita do vidro)
      px(c, x + 17, y - 40, 10, 30, '#17191d');
      // dois botões de canal/volume redondos do CRT
      pixelCircle(c, x + 22, y - 34, 2, '#55595f');
      pixelCircle(c, x + 22, y - 34, 1, '#26292e');
      pixelCircle(c, x + 22, y - 27, 2, '#55595f');
      pixelCircle(c, x + 22, y - 27, 1, '#26292e');
      // grade do alto-falante
      for (let i = 0; i < 4; i++) px(c, x + 18, y - 20 + i * 2, 8, 1, '#0a0b0d');
      // LED standby âmbar
      c.globalAlpha = 0.3 + boot * 0.7;
      px(c, x + 20, y - 12, 3, 1, '#ffb84a');
      c.globalAlpha = 1;

      // ATARI 2600: corpo de madeira com grão vertical, dois botões
      // redondos, texto "2600" (sem copiar a marca oficial)
      px(c, x - 34, y + 2, 68, 10, '#14100c');
      px(c, x - 34, y + 2, 68, 2, '#26201a');
      px(c, x - 34, y + 4, 68, 7, '#5a3b24');
      // grão vertical da madeira
      for (let gx = x - 31; gx < x + 33; gx += 4) {
        px(c, gx, y + 4, 1, 7, '#3f2817');
        px(c, gx + 2, y + 4, 1, 7, '#6d4c2f');
      }
      // slot de cartucho no topo
      px(c, x - 10, y + 2, 20, 2, '#0c0a08');
      px(c, x - 10, y + 2, 20, 1, '#332a22');
      // placa central com "2600"
      px(c, x - 13, y + 5, 26, 5, '#241a12');
      px(c, x - 13, y + 5, 26, 1, '#3a2b1c');
      drawText(c, '2600', x, y + 5, { scale: 1, color: '#e8c86a', align: 'center', outline: '#120c06' });
      // dois botões redondos (chave de dificuldade)
      pixelCircle(c, x - 24, y + 8, 3, '#0e0b08');
      pixelCircle(c, x - 24, y + 8, 2, '#2a251f');
      px(c, x - 25, y + 6, 2, 1, '#5f584e');
      pixelCircle(c, x + 24, y + 8, 3, '#0e0b08');
      pixelCircle(c, x + 24, y + 8, 2, '#2a251f');
      px(c, x + 23, y + 6, 2, 1, '#5f584e');
      // pezinhos do console
      px(c, x - 32, y + 11, 3, 2, '#0c0a08');
      px(c, x + 29, y + 11, 3, 2, '#0c0a08');

      // joystick de 1 botão no chão, à esquerda
      px(c, x - 52, y + 7, 10, 5, '#121317');
      px(c, x - 52, y + 7, 10, 1, '#2e3038');
      px(c, x - 49, y + 3, 3, 5, '#1a1b20');
      px(c, x - 50, y + 1, 5, 3, '#c94a3a');
      px(c, x - 50, y + 1, 5, 1, '#ff8a6a');
      c.strokeStyle = 'rgba(8,8,10,0.9)';
      c.beginPath();
      c.moveTo(x - 42, y + 9);
      c.quadraticCurveTo(x - 36, y + 12, x - 33, y + 11);
      c.stroke();
      break;
    }
    case 'tape_shelf': {
      // estante baixa de madeira com VHS e cartuchos
      const rng = mulberry32((d.seed || 0) + 77);
      pixelEllipse(c, x + 1, y + 1, 34, 6, 'rgba(0,0,0,0.35)');
      // moldura
      px(c, x - 33, y - 46, 66, 46, '#4a3320');
      px(c, x - 33, y - 46, 66, 3, '#6a4a2e');
      px(c, x - 33, y - 46, 2, 46, '#5c3f27');
      px(c, x + 31, y - 46, 2, 46, '#33220f');
      px(c, x - 33, y - 2, 66, 2, '#2a1e14');
      px(c, x - 31, y - 44, 62, 38, '#2a1e14');
      // prateleira do meio
      px(c, x - 31, y - 25, 62, 3, '#6a4a2e');
      px(c, x - 31, y - 25, 62, 1, '#7d5734');
      px(c, x - 31, y - 22, 62, 1, '#1f150d');

      // caixas e cartuchos na prateleira de cima
      const boxCols = ['#7a5a3a', '#8a3a2e', '#2e5a7a', '#6a5a3a'];
      for (let i = 0; i < 4; i++) {
        const bx = x - 28 + i * 12;
        px(c, bx, y - 41, 10, 14, boxCols[i]);
        px(c, bx, y - 41, 10, 1, 'rgba(255,255,255,0.16)');
        px(c, bx, y - 28, 10, 1, 'rgba(0,0,0,0.35)');
        px(c, bx + 2, y - 37, 6, 4, '#d8cfb0');
        px(c, bx + 2, y - 32, 4, 1, 'rgba(30,20,14,0.55)');
      }
      // cartucho inclinado encostado na direita
      c.save();
      c.translate(x + 24, y - 27);
      c.rotate(-0.16);
      px(c, -5, -15, 10, 15, '#4a6a3a');
      px(c, -5, -15, 10, 1, '#6a8a52');
      px(c, -3, -11, 6, 5, '#d8cfb0');
      c.restore();

      // fitas VHS coloridas na prateleira de baixo
      const tapeCols = ['#8a3a2e', '#2e5a8a', '#c9a24a', '#5a4a7a', '#3a6b3a'];
      for (let i = 0; i < 5; i++) {
        const tx = x - 29 + i * 11;
        const col = tapeCols[i];
        px(c, tx, y - 20, 9, 17, col);
        px(c, tx, y - 20, 9, 1, 'rgba(255,255,255,0.18)');
        px(c, tx + 7, y - 20, 2, 17, 'rgba(0,0,0,0.28)');
        // etiqueta
        px(c, tx + 1, y - 17, 6, 5, '#d8cfb0');
        px(c, tx + 1, y - 15, 6, 1, 'rgba(40,30,22,0.6)');
        px(c, tx + 1, y - 11, 4, 1, 'rgba(40,30,22,0.45)');
        // fita aparecendo
        px(c, tx + 1, y - 5, 5, 2, 'rgba(20,16,14,0.75)');
      }
      // fita deitada
      px(c, x + 18, y - 9, 12, 5, '#2e5a8a');
      px(c, x + 18, y - 9, 12, 1, '#5a86b0');
      px(c, x + 20, y - 7, 5, 2, '#d8cfb0');

      // poeira/ruído
      speckle(c, x - 30, y - 42, 60, 38, 'rgba(220,200,160,0.14)', 10, rng, 1);
      break;
    }
    case 'beanbag': {
      // pufe escuro afundado
      const sd = d.seed || 0;
      pixelEllipse(c, x + 2, y + 1, 31, 7, 'rgba(0,0,0,0.4)');
      pixelEllipse(c, x, y - 7, 28, 13, '#241f2d');
      pixelEllipse(c, x, y - 9, 27, 12, '#332d40');
      pixelEllipse(c, x - 2, y - 12, 23, 9, '#403850');
      pixelEllipse(c, x - 3, y - 14, 18, 6, '#4b425c');
      // afundamento no centro
      pixelEllipse(c, x + 3, y - 16, 9, 3, '#282330');
      px(c, x + 1, y - 16, 5, 1, '#221e2a');
      // dobras
      c.strokeStyle = 'rgba(22,18,28,0.8)';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x - 24, y - 7);
      c.quadraticCurveTo(x - 14, y - 14, x - 6, y - 15);
      c.stroke();
      c.beginPath();
      c.moveTo(x + 24, y - 7);
      c.quadraticCurveTo(x + 15, y - 14, x + 8, y - 15);
      c.stroke();
      // costura central
      c.strokeStyle = 'rgba(120,108,150,0.35)';
      c.setLineDash([1, 2]);
      c.beginPath();
      c.moveTo(x - 2, y - 21);
      c.quadraticCurveTo(x + 3, y - 12, x + 1, y - 2);
      c.stroke();
      c.setLineDash([]);
      // brilho de tecido
      px(c, x - 14, y - 19, 9, 1, 'rgba(150,138,180,0.22)');
      px(c, x - 18, y - 15, 4, 1, 'rgba(150,138,180,0.16)');
      c.globalAlpha = 0.12 + 0.06 * Math.sin(t * 1.3 + sd);
      pixelEllipse(c, x, y - 11, 34, 15, '#7a6aa0');
      c.globalAlpha = 1;
      break;
    }
    case 'poster_key': {
      // CRT antigo na geada mostrando ESTÁTICA (arte original, sem marca)
      const sd = d.seed || 0;
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.1 + sd);
      // sombra na parede
      px(c, x - 22, y - 50, 42, 45, 'rgba(6,10,18,0.42)');
      // moldura de gelo: blocos congelados (com trincas)
      px(c, x - 21, y - 49, 40, 44, '#7fa8c8');
      px(c, x - 20, y - 48, 38, 2, '#dcebf5');
      px(c, x - 21, y - 49, 3, 44, '#a9c8de');
      px(c, x + 18, y - 49, 3, 44, '#557a9e');
      px(c, x - 21, y - 6, 40, 2, '#3f5f7e');
      // trincas na moldura
      px(c, x - 14, y - 49, 1, 4, '#3f5f7e');
      px(c, x + 9, y - 7, 1, 4, '#2c405a');
      px(c, x - 20, y - 31, 5, 1, '#3f5f7e');
      px(c, x + 15, y - 40, 5, 1, '#2c405a');
      // corpo do CRT
      px(c, x - 18, y - 46, 34, 29, '#2e2e33');
      px(c, x - 18, y - 46, 34, 2, '#4a4a52');
      px(c, x - 18, y - 46, 2, 29, '#3a3a42');
      px(c, x + 16, y - 46, 2, 29, '#17171c');
      px(c, x - 18, y - 18, 34, 1, '#17171c');
      // tela com estática branca (seed por frame -> chiado vivo)
      px(c, x - 14, y - 43, 26, 22, '#0d0d10');
      const tick = Math.floor(t * 9);
      speckle(c, x - 14, y - 43, 26, 22, '#f4f4f4', 42, mulberry32((sd + tick * 131) >>> 0), 1);
      speckle(c, x - 14, y - 43, 26, 22, '#8a8f98', 26, mulberry32((sd + 7 + tick * 57) >>> 0), 1);
      // faixa de roll da estática descendo a tela
      const rollY = y - 43 + Math.floor((t * 16 + sd * 5) % 22);
      c.globalAlpha = 0.32;
      px(c, x - 14, rollY, 26, 1, '#ffffff');
      c.globalAlpha = 1;
      // reflexo do vidro
      px(c, x - 12, y - 41, 6, 1, 'rgba(255,255,255,0.10)');
      // UM ÚNICO PIXEL branco brilhando ao centro (raio ~1-2px, alpha pulsando)
      c.globalAlpha = 0.45 + 0.55 * pulse;
      px(c, x - 1, y - 33, 2, 2, '#ffffff');
      if (pulse > 0.72) px(c, x, y - 32, 1, 1, '#ffffff'); // estrela central
      c.globalAlpha = 1;
      // LED de espera
      px(c, x, y - 19, 1, 1, '#c0392b');
      // gelo escorrendo pelos cantos e gotas congeladas
      px(c, x - 18, y - 46, 8, 2, '#dcebf5');
      px(c, x - 18, y - 46, 2, 7, '#dcebf5');
      px(c, x + 10, y - 46, 8, 2, '#c3d5e2');
      px(c, x + 16, y - 46, 2, 6, '#c3d5e2');
      px(c, x - 18, y - 9, 6, 3, '#a9c0d4');
      px(c, x + 12, y - 9, 6, 3, '#8fa9bd');
      px(c, x - 13, y - 39, 1, 4, '#b8d4e6');
      px(c, x + 14, y - 37, 1, 5, '#a9c8de');
      // embaixo: só '...?' pequeno (sem nome)
      drawText(c, '...?', x, y - 13, { scale: 1, color: '#8a8f98', align: 'center' });
      break;
    }
    case 'ice_platform': {
      // plataforma de gelo em camadas (laje sob a TV)
      const sd = d.seed || 0;
      const rng = mulberry32(sd + 1013);
      pixelEllipse(c, x, y + 2, 74, 7, 'rgba(10,18,30,0.45)');
      // pingentes sob a laje
      for (const [ix, il] of [[-44, 5], [-12, 7], [24, 4], [48, 6]]) {
        px(c, x + ix, y + 1, 2, il, '#b8d4e6');
        px(c, x + ix, y + 1, 1, 1, '#eaf6ff');
      }
      // laje em camadas: base estreita, topo largo
      px(c, x - 50, y - 3, 100, 4, '#3f5f7e');
      px(c, x - 54, y - 7, 108, 4, '#557a9e');
      px(c, x - 59, y - 11, 118, 5, '#7fa8c8');
      px(c, x - 63, y - 15, 126, 4, '#a9c8de');
      // faceta superior e brilho 1px no topo
      px(c, x - 63, y - 15, 126, 2, '#dcebf5');
      px(c, x - 63, y - 16, 126, 1, '#ffffff');
      // contorno frio
      c.fillStyle = '#16283a';
      c.fillRect(Math.round(x - 50), Math.round(y + 1), 100, 1);
      c.fillRect(Math.round(x - 63), Math.round(y - 15), 1, 12);
      c.fillRect(Math.round(x + 62), Math.round(y - 15), 1, 12);
      // bolhas congeladas
      for (let i = 0; i < 12; i++) {
        const bx = x - 56 + rng() * 112;
        const by = y - 13 + rng() * 11;
        const br = rng() < 0.3 ? 2 : 1;
        px(c, bx, by, br, br, 'rgba(234,246,255,0.8)');
        if (br === 2) px(c, bx, by, 1, 1, '#ffffff');
      }
      // trincas na laje
      c.strokeStyle = '#2c405a';
      c.lineWidth = 1;
      for (const [sx2, sy2, len] of [[-38, -13, 12], [-4, -8, 15], [28, -12, 10]]) {
        c.beginPath();
        c.moveTo(x + sx2, y + sy2);
        c.lineTo(x + sx2 + len * 0.5, y + sy2 + 2);
        c.lineTo(x + sx2 + len, y + sy2 + 1);
        c.stroke();
      }
      break;
    }
    case 'ice_pillar': {
      // coluna alta de gelo cristalino com brilho frio atrás
      c.globalAlpha = 0.14;
      pixelCircle(c, x, y - 26, 26, '#bcd8ea');
      c.globalAlpha = 0.09;
      pixelCircle(c, x, y - 26, 34, '#8fb8d2');
      c.globalAlpha = 1;
      pixelEllipse(c, x, y + 1, 15, 5, 'rgba(10,18,30,0.4)');
      // corpo facetado
      px(c, x - 8, y - 44, 16, 44, '#5f88a8');
      px(c, x - 8, y - 44, 6, 44, '#9fc3dd');
      px(c, x - 2, y - 44, 4, 44, '#7fa8c8');
      px(c, x + 2, y - 44, 6, 44, '#3f5f7e');
      // topo cristalino pontudo
      px(c, x - 6, y - 48, 12, 4, '#7fa8c8');
      px(c, x - 6, y - 48, 4, 4, '#b8d8ea');
      px(c, x - 3, y - 52, 7, 4, '#9fc3dd');
      px(c, x - 1, y - 55, 3, 3, '#dcebf5');
      px(c, x, y - 57, 1, 2, '#ffffff');
      // contorno frio
      c.fillStyle = '#16283a';
      c.fillRect(Math.round(x - 9), Math.round(y - 44), 1, 44);
      c.fillRect(Math.round(x + 8), Math.round(y - 44), 1, 44);
      // veios e fenda
      c.strokeStyle = 'rgba(220,240,255,0.55)';
      c.beginPath(); c.moveTo(x - 3, y - 38); c.lineTo(x - 4, y - 24); c.lineTo(x - 2, y - 8); c.stroke();
      c.strokeStyle = '#2c405a';
      c.beginPath(); c.moveTo(x + 4, y - 34); c.lineTo(x + 2, y - 18); c.stroke();
      // pontos de luz congelada
      px(c, x - 4, y - 36, 1, 1, '#ffffff');
      px(c, x + 2, y - 22, 1, 1, '#eaf6ff');
      px(c, x - 1, y - 10, 1, 1, '#ffffff');
      // neve acumulada na base
      pixelEllipse(c, x, y, 11, 3, '#dcebf5');
      break;
    }
    case 'icicle': {
      // pingentes pendurados no topo (sem sólido)
      const spikes = [[-11, 13], [0, 19], [11, 10]];
      for (const [off, len] of spikes) {
        const w = len > 15 ? 5 : 4;
        px(c, x + off - (w >> 1), y - 10, w, 4, '#8fb2ca');
        for (let i = 0; i < len; i += 4) {
          const ww = Math.max(1, w - Math.floor((i / len) * w));
          px(c, x + off - (ww >> 1), y - 6 + i, ww, Math.min(4, len - i), i % 8 ? '#c9dfeb' : '#e8f4fb');
        }
        px(c, x + off, y - 6 + len, 1, 2, '#f4fbff');
        px(c, x + off - 1, y - 8, 1, 3, '#ffffff');
      }
      break;
    }
    case 'frost_pile': {
      // monte baixo de neve com sombras frias e brilhos
      const sd = d.seed || 0;
      const rng = mulberry32(sd + 717);
      pixelEllipse(c, x, y + 1, 23, 4, 'rgba(10,18,30,0.35)');
      pixelEllipse(c, x, y - 3, 20, 7, '#a9c0d4');
      pixelEllipse(c, x, y - 5, 17, 6, '#c3d5e2');
      pixelEllipse(c, x - 2, y - 7, 12, 5, '#dcebf5');
      pixelEllipse(c, x - 4, y - 8, 6, 2, '#ffffff');
      // sombras frias
      px(c, x + 6, y - 4, 7, 2, '#7f99b2');
      px(c, x - 12, y - 3, 5, 2, '#8fa9bd');
      // pontos de brilho
      for (let i = 0; i < 6; i++) {
        px(c, x - 14 + rng() * 28, y - 9 + rng() * 6, 1, 1, '#ffffff');
      }
      break;
    }
    case 'crystal_blue': {
      // cristal azul-turquesa brilhante (halo animado em drawRoomFX)
      c.globalAlpha = 0.16;
      pixelCircle(c, x, y - 8, 12, '#3ad0c0');
      c.globalAlpha = 1;
      pixelEllipse(c, x, y + 1, 13, 4, 'rgba(10,18,30,0.4)');
      // cristais laterais menores
      const shard = (sx, hgt, hw) => {
        c.fillStyle = '#0e4a4a';
        c.beginPath();
        c.moveTo(sx, y - hgt - 2);
        c.lineTo(sx + hw, y);
        c.lineTo(sx - hw, y);
        c.closePath();
        c.fill();
        c.fillStyle = '#2fb8ae';
        c.beginPath();
        c.moveTo(sx, y - hgt);
        c.lineTo(sx + hw - 2, y - 1);
        c.lineTo(sx - hw + 2, y - 1);
        c.closePath();
        c.fill();
        px(c, sx - 1, y - hgt + 2, 1, Math.max(1, Math.floor(hgt * 0.5)), '#59e0d0');
      };
      shard(x - 8, 11, 3);
      shard(x + 8, 13, 3);
      // cristal central (mais alto)
      c.fillStyle = '#0e4a4a';
      c.beginPath();
      c.moveTo(x, y - 24);
      c.lineTo(x + 6, y - 11);
      c.lineTo(x + 4, y);
      c.lineTo(x - 4, y);
      c.lineTo(x - 6, y - 11);
      c.closePath();
      c.fill();
      c.fillStyle = '#2fb8ae';
      c.beginPath();
      c.moveTo(x, y - 22);
      c.lineTo(x + 4, y - 11);
      c.lineTo(x + 3, y - 1);
      c.lineTo(x - 3, y - 1);
      c.lineTo(x - 4, y - 11);
      c.closePath();
      c.fill();
      c.fillStyle = '#59e0d0';
      c.beginPath();
      c.moveTo(x, y - 22);
      c.lineTo(x + 2, y - 11);
      c.lineTo(x + 1, y - 2);
      c.lineTo(x - 1, y - 2);
      c.lineTo(x - 2, y - 11);
      c.closePath();
      c.fill();
      px(c, x - 1, y - 18, 1, 6, '#a8fff0');
      // faíscas
      px(c, x - 1, y - 21, 1, 1, '#ffffff');
      px(c, x + 4, y - 10, 1, 1, '#d8fffa');
      px(c, x - 5, y - 8, 1, 1, '#d8fffa');
      break;
    }
    default:
      break;
  }
}

function drawBannerShape(c, x, y) {
  px(c, x - 8, y, 16, 22, '#5a1f22');
  px(c, x - 6, y, 12, 20, '#7a2a2c');
  px(c, x - 6, y + 20, 4, 4, '#7a2a2c');
  px(c, x + 2, y + 20, 4, 4, '#7a2a2c');
  px(c, x - 3, y + 5, 6, 7, '#e6bb4f');
  px(c, x - 1, y + 3, 2, 3, '#e6bb4f');
  px(c, x - 6, y - 2, 12, 2, '#3d3d3d');
}

/* ------------------------------------------------------------------ */
/* Itens                                                              */
/* ------------------------------------------------------------------ */

function drawItemIcon(c, type, x, y, s = 1, t = 0) {
  c.save();
  c.translate(x, y);
  c.scale(s, s);
  if (type === 'lantern') {
    px(c, -3, -8, 6, 2, '#3d3d3d');
    px(c, -2, -10, 4, 2, '#6a6a70');
    px(c, -6, -7, 12, 12, '#8a6a20');
    px(c, -5, -6, 10, 10, '#e6bb4f');
    px(c, -4, -5, 8, 8, '#ffeaa0');
    px(c, -2, -3, 4, 5, '#fff6d0');
    px(c, 0, -2, 2, 3, '#ff9a3a');
    px(c, -6, 5, 12, 2, '#a97c25');
    px(c, -3, -6, 1, 6, '#a97c25');
  } else if (type === 'key') {
    px(c, -8, -2, 5, 5, '#e6bb4f');
    px(c, -7, -1, 3, 3, '#0a0c10');
    px(c, -3, 0, 9, 2, '#e6bb4f');
    px(c, 5, 1, 2, 4, '#e6bb4f');
    px(c, 2, 1, 2, 3, '#e6bb4f');
    px(c, -1, 0, 6, 1, '#ffe9a3');
  } else if (type === 'sword') {
    px(c, -1, -11, 3, 15, '#cdd3dc');
    px(c, 0, -13, 1, 3, '#f4f1e6');
    px(c, -1, -11, 1, 13, '#f4f1e6');
    px(c, 1, -11, 1, 13, '#8a9098');
    px(c, -5, 3, 11, 3, '#a97c25');
    px(c, -1, 6, 3, 6, '#6a4628');
    px(c, -3, 12, 6, 2, '#e6bb4f');
  } else if (type === 'chalice') {
    px(c, -5, -7, 11, 2, '#e6bb4f');
    px(c, -6, -5, 2, 5, '#e6bb4f');
    px(c, 5, -5, 2, 5, '#e6bb4f');
    px(c, -5, 0, 11, 2, '#a97c25');
    px(c, -4, -4, 9, 4, '#ffe9a3');
    px(c, -1, 1, 3, 5, '#c9a24a');
    px(c, -4, 6, 9, 2, '#e6bb4f');
    px(c, -2, -3, 3, 2, '#fff6d0');
  } else if (type === 'heart') {
    px(c, -5, -4, 4, 3, '#e05a4a');
    px(c, 1, -4, 4, 3, '#e05a4a');
    px(c, -5, -2, 10, 3, '#e05a4a');
    px(c, -4, 1, 8, 2, '#c04334');
    px(c, -2, 3, 4, 2, '#a83228');
    px(c, 0, 5, 1, 1, '#a83228');
    px(c, -4, -3, 2, 1, '#ff9a8a');
  } else if (type === 'shield') {
    px(c, -5, -6, 10, 8, '#5a86c9');
    px(c, -4, 2, 8, 2, '#4870ad');
    px(c, -2, 4, 4, 2, '#375d93');
    px(c, -1, -3, 2, 7, '#dfe8ff');
  } else if (type === 'mc_sword') {
    px(c, 0, -12, 3, 14, '#33ebff');
    px(c, 1, -12, 1, 14, '#8ff5ff');
    px(c, 0, -14, 2, 2, '#d8ffff');
    px(c, -4, 2, 11, 2, '#8a6a20');
    px(c, -1, 4, 3, 7, '#6a4628');
    px(c, -2, 10, 5, 2, '#3ad0ff');
  } else if (type === 'rbiana_burger') {
    px(c, -6, -7, 12, 2, '#f0c070');
    px(c, -6, -5, 12, 2, '#e0a04a');
    px(c, -6, -3, 12, 2, '#f2d94a');
    px(c, -7, -1, 14, 3, '#6a3a22');
    px(c, -6, 2, 12, 2, '#5adf6a');
    px(c, -5, 4, 10, 3, '#e0a04a');
    px(c, -4, 6, 8, 1, '#c07a32');
    px(c, -4, -6, 1, 1, '#fff6d0');
    px(c, 2, -6, 1, 1, '#fff6d0');
    px(c, -3, -2, 1, 1, '#ffe9a3');
  } else if (type === 'richard_paper') {
    px(c, -6, -8, 12, 15, '#e8e0cc');
    px(c, -5, -7, 10, 13, '#fff6e0');
    px(c, -6, -8, 12, 1, '#c9c0a0');
    for (let i = 0; i < 4; i++) px(c, -4, -5 + i * 3, 7, 1, '#8a8270');
    px(c, 2, 2, 4, 4, '#c94a3f');
    px(c, 3, 3, 2, 2, '#e6c26a');
  } else if (type === 'lito_plane') {
    px(c, -8, -4, 13, 2, '#f4f1e6');
    px(c, 4, -2, 3, 2, '#d6d0c0');
    px(c, -6, -1, 9, 2, '#e8e2cc');
    px(c, -4, 1, 6, 2, '#d6d0c0');
    px(c, -8, -4, 2, 5, '#c9c0a0');
    px(c, 1, -3, 1, 4, '#b8b0a0');
  } else if (type === 'marx_book') {
    px(c, -6, -8, 12, 16, '#7a2a24');
    px(c, -5, -7, 10, 14, '#c94a3f');
    px(c, -4, -6, 7, 12, '#e8dcc0');
    px(c, 3, -6, 2, 12, '#a83a30');
    px(c, -1, -2, 3, 4, '#e6c26a');
    px(c, 0, -1, 1, 2, '#8a6a20');
  } else if (type === 'senna_wheel') {
    px(c, -6, -7, 12, 3, '#22242a');
    px(c, -6, 4, 12, 3, '#22242a');
    px(c, -7, -5, 3, 10, '#22242a');
    px(c, 4, -5, 3, 10, '#22242a');
    px(c, -2, -2, 4, 4, '#e6bb4f');
    px(c, 0, -1, 2, 2, '#8a6a20');
    px(c, -1, -6, 2, 2, '#e6bb4f');
    px(c, -1, 4, 2, 2, '#e6bb4f');
  } else if (type === 'trotsky_pick') {
    px(c, -1, -10, 2, 11, '#8a9098');
    px(c, -6, -10, 12, 2, '#cdd3dc');
    px(c, -8, -10, 3, 5, '#b8c0c8');
    px(c, 5, -10, 3, 5, '#b8c0c8');
    px(c, -1, 0, 3, 8, '#6a4628');
    px(c, -3, 7, 6, 2, '#d8503f');
  } else if (type === 'deltarune_heart') {
    px(c, -5, -4, 4, 3, '#b88af0');
    px(c, 1, -4, 4, 3, '#b88af0');
    px(c, -5, -2, 10, 3, '#b88af0');
    px(c, -4, 1, 8, 2, '#8a5ad8');
    px(c, -2, 3, 4, 2, '#6a3fb8');
    px(c, 0, 5, 1, 1, '#6a3fb8');
    px(c, -1, -1, 2, 2, '#7fe6e6');
  } else if (type === 'verity_ball') {
    pixelCircle(c, 0, 0, 6, '#f2d94a');
    px(c, -3, -2, 2, 2, '#3a2a10');
    px(c, 1, -2, 2, 2, '#3a2a10');
    px(c, -2, 1, 4, 1, '#3a2a10');
    px(c, -3, 2, 1, 1, '#3a2a10');
    px(c, 2, 2, 1, 1, '#3a2a10');
    px(c, -2, -4, 4, 1, '#fff0a0');
  } else if (type === 'roblox_cola') {
    // garrafa de refrigerante (arte própria, sem logo): silhueta vermelha, faixa e bolhas
    px(c, -2, -15, 5, 2, '#8a9098'); // tampa
    px(c, -2, -15, 5, 1, '#b8bec6');
    px(c, -4, -13, 9, 2, '#f4f1e6'); // halo de espuma no gargalo
    px(c, -4, -11, 1, 2, '#f4f1e6');
    px(c, 3, -11, 1, 2, '#f4f1e6');
    px(c, -1, -14, 1, 1, '#ffffff');
    px(c, 1, -14, 1, 1, '#ffffff');
    px(c, -2, -11, 5, 2, '#c0392b'); // gargalo
    px(c, -3, -9, 7, 2, '#c0392b'); // ombros
    px(c, -5, -7, 11, 16, '#c0392b'); // corpo
    px(c, 3, -7, 3, 16, '#7a1f16'); // sombra
    px(c, -4, -6, 1, 14, '#ff6a5a'); // highlight
    px(c, -5, -1, 11, 5, '#f4f1e6'); // faixa branca
    px(c, -5, -1, 11, 1, '#ffffff');
    px(c, -5, 3, 11, 1, '#d8d4c8');
    px(c, -2, 0, 2, 2, '#c0392b'); // bolha 1
    px(c, 1, 1, 1, 1, '#ff6a5a');
    px(c, 2, 1, 2, 2, '#c0392b'); // bolha 2
    px(c, 3, 2, 1, 1, '#ff6a5a');
    px(c, -5, 8, 11, 1, '#7a1f16'); // base
  } else if (type === 'undertale_star') {
    px(c, -1, -9, 3, 18, '#ffe66a');
    px(c, -9, -1, 18, 3, '#ffe66a');
    px(c, -6, -6, 12, 12, '#ffe66a');
    px(c, -3, -3, 6, 6, '#fff6d0');
    px(c, 0, -2, 1, 4, '#ffffff');
  } else if (type === 'ultrakill_coin') {
    px(c, -5, -7, 10, 14, '#c94a3f');
    px(c, -3, -6, 6, 12, '#e6bb4f');
    px(c, -1, -8, 2, 16, '#ff8a2a');
    px(c, -1, -2, 2, 5, '#fff6d0');
    px(c, -2, 3, 4, 2, '#c94a3f');
  }
  c.restore();
}

function drawWorldItem(c, item, t) {
  const bob = Math.sin(t * 2.2 + item.bob) * 2;
  const x = item.x;
  const y = item.y + bob;
  const pulse = 0.65 + Math.sin(t * 3 + item.bob) * 0.35;

  const glowColor =
    item.type === 'chalice' || item.type === 'key' || item.type === 'lantern'
      ? '230,187,79'
      : item.type === 'heart'
      ? '224,90,74'
      : '205,211,220';

  const g = c.createRadialGradient(x, y, 0, x, y, 22);
  g.addColorStop(0, `rgba(${glowColor},${0.28 * pulse})`);
  g.addColorStop(1, `rgba(${glowColor},0)`);
  c.fillStyle = g;
  c.fillRect(x - 22, y - 22, 44, 44);

  // sombra no chão
  c.globalAlpha = 0.3;
  pixelEllipse(c, x, item.y + 2, 7, 2, '#000');
  c.globalAlpha = 1;

  drawItemIcon(c, item.type, x, y, 1.1, t);

  // brilho
  if (Math.sin(t * 4 + item.bob) > 0.7) {
    px(c, x + 7, y - 10, 2, 2, '#fff6d0');
    px(c, x - 9, y - 5, 1, 1, '#fff6d0');
  }
}

/* ------------------------------------------------------------------ */
/* Jogador                                                            */
/* ------------------------------------------------------------------ */

const FACE_INDEX = { down: 0, up: 1, left: 2, right: 3 };
const PLAYER_LEG_Y = 39; // linha onde começam as pernas no atlas (32x48)

/* Escala apenas visual do lobo — não altera hitbox nem alcances de ataque.
   0.75 deixa o atlas em 24x36 px na tela (25% menor) com dimensões finais
   inteiras, reduzindo a irregularidade do pixel grid com o smoothing desligado. */
const PLAYER_DRAW_SCALE = 0.75;

function drawPlayer(c, game, t) {
  const p = game.player;
  if (p.invuln > 0 && Math.floor(t * 20) % 2 === 0) return;

  const s = PLAYER_DRAW_SCALE;
  const walking = p.moving && !game.transition && p.rollT <= 0 && Math.abs(p.vx) + Math.abs(p.vy) > 1;
  const phase = p.walkT * 9;
  const bob = walking ? Math.abs(Math.sin(phase)) * 1.8 : Math.sin(t * 2) * 0.6;
  const bobPx = Math.round(bob);

  // Passo: pernas inclinam a partir do quadril; tronco balança levemente
  const legSkew = walking ? Math.sin(phase) * 0.24 : 0;
  const sideLean = p.facing === 'left' ? -1 : p.facing === 'right' ? 1 : 0;
  let lean = walking ? Math.sin(phase) * 0.025 * sideLean : Math.sin(t * 1.6) * 0.004;

  // Impulso do golpe
  let lx = 0;
  let ly = 0;
  if (p.swing > 0) {
    const dur = p.swingDur || 0.22;
    const prog = 1 - p.swing / dur;
    const heavy = p.swingKind === 'heavy';
    const push = Math.sin(prog * Math.PI) * (heavy ? 5 : 3);
    const dir = DIRS[p.facing] || DIRS.down;
    lx = dir.x * push;
    ly = dir.y * push;
    lean += sideLean * (heavy ? 0.09 : 0.05) * Math.sin(prog * Math.PI);
  }

  // Tremor ao levar dano
  if (p.invuln > 1.32) {
    lx += (Math.random() - 0.5) * 2.4;
    ly += (Math.random() - 0.5) * 1.2;
  }

  const px0 = Math.round(p.x + lx);
  const py0 = Math.round(p.y + ly);

  // Rolamento: gira o corpo em torno do centro, mantendo o pixel art
  const rolling = p.rollT > 0;
  const rollProg = rolling ? 1 - p.rollT / (p.rollDur || ROLL.dur) : 0;
  const rollSign = Math.abs(p.rollDirX) > 0.1
    ? (p.rollDirX < 0 ? -1 : 1)
    : (p.rollDirY < 0 ? -1 : 1);
  const rollSpin = rolling ? rollSign * rollProg * Math.PI * 2 : 0;

  // sombra
  c.globalAlpha = walking ? 0.3 : 0.35;
  pixelEllipse(c, px0, p.y + 1, (walking ? 11 : 10) * s, 4 * s, '#000');
  c.globalAlpha = 1;

  const frame = FACE_INDEX[p.facing] || 0;

  if (typeof PLAYER_IMG !== 'undefined' && PLAYER_IMG.complete && PLAYER_IMG.naturalWidth) {
    c.save();
    c.translate(px0, py0);
    if (rolling) {
      c.translate(0, -20);
      c.rotate(rollSpin);
      c.translate(0, 20);
    }
    c.rotate(lean);
    c.scale(s, s); // tronco e pernas compartilham a mesma escala
    // tronco + cabeça
    c.drawImage(
      PLAYER_IMG,
      frame * 32,
      0,
      32,
      PLAYER_LEG_Y,
      -16,
      -48 + bobPx,
      32,
      PLAYER_LEG_Y
    );
    // pernas: inclinam no quadril a cada passo (sem emenda no tronco)
    const legH = 48 - PLAYER_LEG_Y;
    c.save();
    c.translate(0, -48 + bobPx + PLAYER_LEG_Y);
    c.transform(1, 0, legSkew, 1, 0, 0);
    c.drawImage(PLAYER_IMG, frame * 32, PLAYER_LEG_Y, 32, legH, -16, 0, 32, legH);
    c.restore();
    c.restore();
  } else {
    drawWolfFallback(c, px0, py0 + bobPx, p.facing);
  }

  // item na mão (offsets do lobo)
  if (game.held) {
    const side = (p.facing === 'left' ? -13 : p.facing === 'right' ? 13 : 11) * s;
    const sway = (walking ? Math.sin(phase) * 1.2 : Math.sin(t * 2) * 0.4) * s;
    const iy = py0 - 24 * s + bobPx * s;
    drawItemIcon(c, game.held.type, px0 + side + sway, iy, 0.62 * s, t);
  }

  // golpe de espada/item especial — swoop rico (só com item na mão)
  if (p.swing > 0 && game.held) {
    const ang = { right: 0, left: Math.PI, down: Math.PI / 2, up: -Math.PI / 2 }[p.facing] || 0;
    const dur = p.swingDur || 0.22;
    const prog = 1 - p.swing / dur;
    const heavy = p.swingKind === 'heavy';
    const reach = (p.swingReach || (heavy ? 40 : 32)) * s;
    const swingColor = p.swingColor || '#fff6d0';
    const sw = heavy ? 0.85 : 0.55; // meia-abertura do arco
    const arcR = reach * 0.8; // raio do arco principal
    const cur = ang - (heavy ? 1.35 : 0.9) + prog * (heavy ? 2.7 : 1.8); // ângulo atual da varredura
    c.save();
    c.translate(px0, py0 - 22 * s);

    // (d) anel de choque (heavy): se expande do jogador e some
    if (heavy) {
      const rr = reach * (0.45 + prog * 0.55);
      c.globalAlpha = Math.max(0, 1 - prog) * 0.5;
      c.strokeStyle = swingColor;
      c.lineWidth = Math.max(1, 2 * s);
      c.beginPath();
      c.arc(0, 0, rr, 0, Math.PI * 2);
      c.stroke();
      c.globalAlpha = 1;
    }

    // (a) ghost arcs de motion-blur atrás do ângulo atual (mesmo raio do arco)
    for (const [off, alpha] of [[-0.28, 0.32], [-0.56, 0.18]]) {
      c.globalAlpha = alpha * (1 - prog * 0.4);
      c.strokeStyle = swingColor;
      c.lineWidth = Math.max(1, (heavy ? 7 : 5) * s);
      c.beginPath();
      c.arc(0, 0, arcR, cur + off - sw, cur + off);
      c.stroke();
    }
    c.globalAlpha = 1;

    // (b) arco principal (0.85rad heavy / 0.55 light), duas passadas
    c.globalAlpha = 0.75; // glow externo (cor do golpe)
    c.strokeStyle = swingColor;
    c.lineWidth = Math.max(1, (heavy ? 6 : 4) * s);
    c.beginPath();
    c.arc(0, 0, arcR, cur - sw, cur);
    c.stroke();
    c.globalAlpha = 1; // núcleo claro
    c.strokeStyle = '#fff0b0';
    c.lineWidth = Math.max(1, (heavy ? 2 : 1.5) * s);
    c.beginPath();
    c.arc(0, 0, arcR, cur - sw, cur);
    c.stroke();

    // (c) ponta incandescente no ângulo final do arco (na ponta da arc)
    const tipX = Math.cos(cur) * arcR;
    const tipY = Math.sin(cur) * arcR;
    px(c, tipX - 1, tipY - 1, 2, 2, '#fff0b0');
    px(c, tipX, tipY, 1, 1, '#ffffff');

    // (e) arma na ponta do arco, girando com a varredura
    c.save();
    c.rotate(cur); // rotação = ângulo do caminho
    drawItemIcon(c, game.held.type, arcR, 0, 0.85, t);
    c.restore();

    c.restore();
  }

  // Guarda: arco/escudo à frente do lobo (escala 0.75)
  if (p.guarding) {
    const ang = { right: 0, left: Math.PI, down: Math.PI / 2, up: -Math.PI / 2 }[p.facing] || 0;
    const parryReady = p.guardT <= GUARD.parryWindow;
    const hot = parryReady || p.guardFlash > 0;
    c.save();
    c.translate(px0, py0 - 20 * s);
    c.rotate(ang);

    c.fillStyle = hot ? 'rgba(255,246,208,0.22)' : 'rgba(120,170,220,0.16)';
    c.beginPath();
    c.arc(0, 0, 13 * s, -0.8, 0.8);
    c.lineTo(0, 0);
    c.closePath();
    c.fill();

    c.strokeStyle = hot ? '#fff6d0' : 'rgba(159,208,255,0.85)';
    c.lineWidth = Math.max(1, (hot ? 2.4 : 2) * s);
    c.beginPath();
    c.arc(0, 0, 14 * s, -0.85, 0.85);
    c.stroke();

    // pequeno escudo na frente
    const shield = hot ? '#fff6d0' : '#9fd0ff';
    px(c, 10 * s, -2, 4, 4, shield);
    px(c, 11 * s, 2, 2, 2, shield);
    c.restore();
  }

  // Flash dourado/branco do parry
  if (p.parryFlash > 0) {
    const a = clamp(p.parryFlash / 0.35, 0, 1);
    c.save();
    c.globalAlpha = a;
    c.strokeStyle = '#fff6d0';
    c.lineWidth = Math.max(1, 2 * s);
    c.beginPath();
    c.arc(px0, py0 - 20 * s, (16 + (1 - a) * 12) * s, 0, Math.PI * 2);
    c.stroke();
    c.strokeStyle = 'rgba(230,187,79,0.8)';
    c.lineWidth = Math.max(1, 1 * s);
    c.beginPath();
    c.arc(px0, py0 - 20 * s, (22 + (1 - a) * 14) * s, 0, Math.PI * 2);
    c.stroke();
    c.restore();
  }
}

function drawWolfFallback(c, x, y, facing) {
  // lobo cinza de uniforme, desenho simples de emergência (mesma escala do atlas)
  const s = PLAYER_DRAW_SCALE;
  c.save();
  c.translate(Math.round(x), Math.round(y));
  c.scale(s, s);
  px(c, -8, -30, 16, 18, '#7d818a');
  px(c, -8, -14, 16, 14, '#171a20');
  px(c, -8, -14, 4, 12, '#2c7a3a');
  px(c, 4, -14, 4, 12, '#2c7a3a');
  px(c, -8, -32, 4, 5, '#7d818a');
  px(c, 4, -32, 4, 5, '#7d818a');
  px(c, -5, -27, 3, 3, '#e6bb4f');
  px(c, 2, -27, 3, 3, '#e6bb4f');
  px(c, -7, -2, 5, 3, '#0a0c10');
  px(c, 2, -2, 5, 3, '#0a0c10');
  c.restore();
}

/* ------------------------------------------------------------------ */
/* Inimigos                                                           */
/* ------------------------------------------------------------------ */

function drawDragon(c, e, t) {
  const x = e.x;
  const y = e.y;
  const flap = Math.sin(t * 7 + e.phase);
  const dir = e.dir || 1;
  const boss = e.boss;

  const body = boss ? '#b23a2a' : '#3f7a3f';
  const bodyDark = boss ? '#7a2218' : '#274f2a';
  const belly = boss ? '#e8b45a' : '#8ab86a';
  const wing = boss ? '#c9553a' : '#4f8a4a';
  const wingDark = boss ? '#7a2218' : '#2b4d2c';
  const horn = boss ? '#f0e2c0' : '#e8e2cc';

  c.save();
  c.translate(x, y);
  c.scale(dir, 1);
  c.imageSmoothingEnabled = false;

  // aura do chefe
  if (boss) {
    c.globalAlpha = 0.1 + Math.sin(t * 3 + e.phase) * 0.04;
    pixelCircle(c, 0, -6, 42, '#ff4a2a');
    c.globalAlpha = 1;
  }

  // sombra
  c.globalAlpha = 0.32;
  pixelEllipse(c, 0, 22, 26, 6, '#000');
  c.globalAlpha = 1;

  // cauda
  c.fillStyle = bodyDark;
  px(c, -20, 4, 9, 5, bodyDark);
  px(c, -27, 6, 9, 4, body);
  px(c, -34, 9, 9, 3, bodyDark);
  px(c, -38, 7, 6, 5, body);
  px(c, -42, 4, 5, 4, bodyDark);
  px(c, -45, 2, 4, 3, body);

  // asas de trás
  c.fillStyle = wingDark;
  c.beginPath();
  c.moveTo(-6, -8);
  c.lineTo(-22, -34 + flap * 4);
  c.lineTo(-32, -14);
  c.lineTo(-12, -4);
  c.closePath();
  c.fill();
  // asas da frente
  c.fillStyle = wing;
  c.beginPath();
  c.moveTo(2, -10);
  c.lineTo(24, -36 - flap * 4);
  c.lineTo(36, -14);
  c.lineTo(14, -2);
  c.closePath();
  c.fill();
  c.strokeStyle = wingDark;
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(3, -10);
  c.lineTo(24, -34 - flap * 4);
  c.moveTo(12, -6);
  c.lineTo(24, -36 - flap * 4);
  c.stroke();

  // patas
  px(c, -13, 12, 9, 8, bodyDark);
  px(c, 6, 12, 9, 8, bodyDark);
  px(c, -14, 19, 11, 2, '#2a201a');
  px(c, 5, 19, 11, 2, '#2a201a');

  // corpo
  pixelEllipse(c, 0, 2, 21, 14, bodyDark);
  pixelEllipse(c, 0, 0, 19, 12, body);
  pixelEllipse(c, 0, 5, 13, 6, belly);

  // placas da barriga
  c.fillStyle = 'rgba(0,0,0,0.18)';
  for (let i = -2; i <= 2; i++) c.fillRect(i * 4 - 1, 4, 3, 1);

  // espinhos do dorso
  c.fillStyle = bodyDark;
  for (let i = -2; i <= 2; i++) {
    c.beginPath();
    c.moveTo(i * 7 - 3, -10);
    c.lineTo(i * 7, -17);
    c.lineTo(i * 7 + 3, -10);
    c.closePath();
    c.fill();
  }

  // pescoço
  px(c, 7, -13, 10, 12, bodyDark);
  px(c, 8, -15, 9, 12, body);
  px(c, 14, -22, 9, 12, bodyDark);
  px(c, 15, -23, 8, 11, body);

  // cabeça
  pixelEllipse(c, 22, -23, 11, 9, bodyDark);
  pixelEllipse(c, 22, -24, 10, 8, body);
  // focinho
  px(c, 29, -23, 12, 6, body);
  px(c, 29, -19, 12, 2, bodyDark);
  px(c, 39, -22, 2, 2, '#1a1a1a');
  // mandíbula e dentes
  px(c, 30, -18, 8, 1, '#f0e2c0');
  px(c, 31, -17, 1, 2, '#fff');
  px(c, 35, -17, 1, 2, '#fff');
  // olho
  px(c, 24, -27, 5, 4, boss ? '#ff5a3a' : '#f0d24a');
  px(c, 25, -26, 2, 3, '#1a1a1a');
  px(c, 26, -27, 2, 1, '#fff6d0');
  // chifres
  px(c, 16, -32, 3, 6, horn);
  px(c, 18, -34, 2, 3, horn);
  px(c, 25, -33, 3, 6, horn);
  px(c, 27, -35, 2, 3, horn);
  // orelhas/aletas
  px(c, 12, -29, 4, 3, bodyDark);

  // flash branco ao levar dano
  if (e.hitT > 0) {
    const a = clamp(e.hitT / 0.18, 0, 1) * 0.65;
    c.globalAlpha = a;
    pixelEllipse(c, 0, 0, 19, 12, '#ffffff');
    pixelEllipse(c, 22, -24, 10, 8, '#ffffff');
    c.globalAlpha = 1;
  }

  c.restore();

  // Estrelinhas de atordoamento ao redor da cabeça
  if (e.stunT > 0) {
    c.save();
    c.globalAlpha = 0.9;
    for (let i = 0; i < 3; i++) {
      const a = t * 6 + i * 2.1;
      const sx = Math.round(x + dir * 22 + Math.cos(a) * 11);
      const sy = Math.round(y - 40 + Math.sin(a) * 4);
      const col = i === 1 ? '#fff6d0' : '#e6bb4f';
      px(c, sx, sy, 2, 1, col);
      px(c, sx - 1, sy + 1, 4, 1, col);
      px(c, sx, sy + 2, 2, 1, col);
      px(c, sx - 2, sy + 1, 1, 1, col);
      px(c, sx + 3, sy + 1, 1, 1, col);
    }
    c.globalAlpha = 1;
    c.restore();
  }

  // barra de vida apenas se já foi ferido
  if (e.hp !== undefined && e.hp < e.maxHp) {
    const bw = boss ? 34 : 26;
    const bx = Math.round(x - bw / 2);
    const by = Math.round(y - (boss ? 62 : 52));
    px(c, bx - 1, by - 1, bw + 2, 5, 'rgba(5,7,10,0.85)');
    px(c, bx, by, bw, 3, '#2a1a18');
    const frac = clamp(e.hp / e.maxHp, 0, 1);
    px(c, bx, by, Math.round(bw * frac), 3, boss ? '#ff6a3a' : '#7ed05a');
    px(c, bx, by, Math.round(bw * frac), 1, boss ? '#ffb14a' : '#b8e86a');
  }
}

/* Telegraph dos ataques dos dragões.
   Desenhado depois da escuridão para continuar legível em salas escuras. */
function drawDragonTelegraph(c, e, t) {
  if (!e.alive) return;
  const pattern = e.attack || e.nextAttack || null;
  if (!pattern) return;

  const nx = e.atkDirX !== undefined ? e.atkDirX : e.dir > 0 ? 1 : -1;
  const ny = e.atkDirY || 0;
  const ang = Math.atan2(ny, nx);
  const pulse = 0.5 + 0.5 * Math.sin(t * 22 + (e.phase || 0));
  const active = !!e.attack;

  c.save();

  if (pattern === 'charge') {
    const len = active ? 90 : 130;
    c.globalAlpha = active ? 0.5 : 0.28 + pulse * 0.32;
    c.strokeStyle = '#ffb14a';
    c.lineWidth = active ? 4 : 2;
    c.setLineDash(active ? [] : [5, 4]);
    c.beginPath();
    c.moveTo(e.x, e.y - 10);
    c.lineTo(e.x + nx * len, e.y - 10 + ny * len);
    c.stroke();
    c.setLineDash([]);
    c.globalAlpha = 0.14 + pulse * 0.18;
    pixelCircle(c, e.x, e.y - 8, 26 + pulse * 5, '#ff5a2a');
    c.globalAlpha = 1;
  } else if (pattern === 'cone') {
    c.globalAlpha = active ? 0.42 : 0.16 + pulse * 0.2;
    c.fillStyle = active ? '#ff9a3a' : '#ff6a2a';
    c.beginPath();
    c.moveTo(e.x + nx * 10, e.y - 16 + ny * 10);
    c.arc(e.x + nx * 10, e.y - 16 + ny * 10, 74, ang - 0.6, ang + 0.6);
    c.closePath();
    c.fill();
    c.globalAlpha = 0.5 + pulse * 0.4;
    c.strokeStyle = '#ffd24a';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(e.x + nx * 10, e.y - 16 + ny * 10);
    c.lineTo(e.x + Math.cos(ang - 0.6) * 74, e.y - 16 + Math.sin(ang - 0.6) * 74);
    c.moveTo(e.x + nx * 10, e.y - 16 + ny * 10);
    c.lineTo(e.x + Math.cos(ang + 0.6) * 74, e.y - 16 + Math.sin(ang + 0.6) * 74);
    c.stroke();
    c.globalAlpha = 1;
  } else if (pattern === 'volley') {
    c.globalAlpha = 0.18 + pulse * 0.28;
    pixelCircle(c, e.x, e.y - 10, 28 + pulse * 6, '#ff8a2a');
    c.globalAlpha = 0.65;
    c.strokeStyle = '#ffd24a';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(e.x, e.y - 10, 20 + pulse * 4, 0, Math.PI * 2);
    c.stroke();
    c.globalAlpha = 1;
  } else if (pattern === 'bite') {
    c.globalAlpha = 0.35 + pulse * 0.35;
    c.strokeStyle = '#ff5a3a';
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(e.x + nx * 16, e.y - 18 + ny * 16);
    c.lineTo(e.x + nx * 42, e.y - 18 + ny * 42);
    c.stroke();
    c.globalAlpha = 1;
  }

  c.restore();
}

function drawBat(c, b, t) {
  const flap = Math.sin(t * 14 + b.phase);
  const x = b.x, y = b.y;
  c.save();
  c.translate(x, y);
  // asas
  c.fillStyle = '#4a3357';
  c.beginPath();
  c.moveTo(-2, 0);
  c.lineTo(-12, -3 + flap * 4);
  c.lineTo(-9, 3);
  c.lineTo(-3, 2);
  c.fill();
  c.beginPath();
  c.moveTo(2, 0);
  c.lineTo(12, -3 + flap * 4);
  c.lineTo(9, 3);
  c.lineTo(3, 2);
  c.fill();
  // corpo
  pixelEllipse(c, 0, 0, 4, 5, '#2f2138');
  px(c, -2, -4, 1, 2, '#2f2138');
  px(c, 1, -4, 1, 2, '#2f2138');
  px(c, -2, -1, 1, 1, '#ff5a5a');
  px(c, 1, -1, 1, 1, '#ff5a5a');
  c.restore();
}

/* ------------------------------------------------------------------ */
/* Efeitos dinâmicos da sala                                          */
/* ------------------------------------------------------------------ */

function drawRoomFX(c, room, t) {
  // tochas
  for (const torch of room.torches) {
    const flick = Math.sin(t * 11 + torch.x) * 0.5 + Math.sin(t * 23 + torch.y) * 0.5;
    const fy = torch.y + 2;
    c.globalAlpha = 0.9;
    px(c, torch.x - 2, fy + 1, 4, 3, '#ff8a2a');
    px(c, torch.x - 1, fy - 2 + flick, 2, 4, '#ffd24a');
    px(c, torch.x, fy - 5 + flick, 1, 3, '#fff0b0');
    c.globalAlpha = 0.16;
    pixelCircle(c, torch.x, fy, 16 + flick * 2, '#ff9a3a');
    c.globalAlpha = 1;
  }

  // água animada
  for (const w of room.waters) {
    const rr = w.r || 20;
    c.fillStyle = 'rgba(140,200,230,0.16)';
    for (let i = 0; i < 3; i++) {
      const yy = w.y - rr * 0.3 + i * rr * 0.3 + Math.sin(t * 1.6 + i + w.x) * 2;
      const ww = Math.floor(rr * (0.5 - i * 0.12));
      c.fillRect(Math.round(w.x - ww + Math.sin(t + i) * 3), Math.round(yy), ww, 1);
    }
  }

  // névoa
  if (room.fog) {
    for (let i = 0; i < 3; i++) {
      const fx = ((t * (8 + i * 3) + i * 130) % (INNER.r - INNER.x + 120)) - 60 + INNER.x;
      const fy = INNER.y + 40 + i * 60 + Math.sin(t * 0.7 + i) * 8;
      c.globalAlpha = 0.05 + i * 0.01;
      pixelEllipse(c, fx, fy, 70, 18, '#cfd8e8');
      c.globalAlpha = 1;
    }
  }

  // portão trancado
  if (room.gate && !gameState.gateUnlocked && ((room.id === 'portao' && room.exits.south) || (room.id === 'salao' && room.exits.north))) {
    const isPortao = room.id === 'portao';
    const gy = isPortao ? INNER.b - 12 : ROOM.y + 2;
    const gh = 14;
    c.fillStyle = '#3a2a12';
    for (let i = 0; i < 6; i++) {
      const gx = DOOR_CX - DOOR_GAP / 2 + 4 + i * 7.5;
      px(c, gx, gy, 3, gh + 8, '#c9a24a');
      px(c, gx, gy, 1, gh + 8, '#ffe9a3');
    }
    px(c, DOOR_CX - DOOR_GAP / 2 + 2, gy + 4, DOOR_GAP - 4, 2, '#a97c25');
    // brilho da fechadura
    const pulse = 0.5 + Math.sin(t * 4) * 0.5;
    c.globalAlpha = 0.4 + pulse * 0.5;
    px(c, DOOR_CX - 2, gy + 8, 4, 4, '#ffe9a3');
    c.globalAlpha = 1;
  }

  // brilho do altar (o pedestal em si é desenhado na camada ordenada)
  if (room.id === ALTAR.room) {
    const pulse = 0.5 + Math.sin(t * 2) * 0.3;
    c.globalAlpha = 0.18 * pulse;
    pixelCircle(c, ALTAR.x, ALTAR.y - 8, 30, '#e6bb4f');
    c.globalAlpha = 1;
  }

  // Castelo de Gelo: neve caindo, névoa fria no chão e brilho ocasional
  if (room.theme === 'ice') {
    const r1 = (n) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
    const SPAN = INNER.b - INNER.y + 26;
    // flocos determinísticos (50-70), caindo com leve balanço
    for (let i = 0; i < 64; i++) {
      const baseX = INNER.x + r1(i * 3 + 1) * (INNER.r - INNER.x);
      const speed = 9 + r1(i * 3 + 2) * 15;
      const sway = 4 + r1(i * 3 + 3) * 7;
      const fx = baseX + Math.sin(t * 0.9 + i * 1.7) * sway;
      const fy = INNER.y - 8 + ((t * speed + r1(i * 7 + 5) * SPAN) % SPAN);
      const sz = i % 6 === 0 ? 2 : 1;
      c.globalAlpha = 0.35 + r1(i * 5 + 3) * 0.45;
      px(c, fx, fy, sz, sz, '#f2f8ff');
      if (i % 9 === 0) {
        px(c, fx - 1, fy, 1, 1, '#ffffff');
        px(c, fx + sz, fy, 1, 1, '#ffffff');
      }
    }
    c.globalAlpha = 1;
    // névoa fria rastejando no chão (deriva alternada)
    for (let i = 0; i < 3; i++) {
      const span = INNER.r - INNER.x + 150;
      const off = (t * (6 + i * 3) + i * 140) % span;
      const fx = i % 2 ? INNER.x + off - 75 : INNER.r - off + 75;
      c.globalAlpha = 0.06 + i * 0.02;
      pixelEllipse(c, fx, INNER.b - 5 - i * 5, 76, 9, '#d7e6ef');
    }
    c.globalAlpha = 1;
    // brilho ocasional varrendo o gelo (envelope raro)
    const env = Math.pow(Math.max(0, Math.sin(t * 0.55 + 1.3)), 8);
    if (env > 0.02) {
      const sweep = ((t * 46) % (INNER.r - INNER.x + 340)) - 170;
      c.globalAlpha = 0.11 * env;
      c.fillStyle = '#eaf6ff';
      c.beginPath();
      c.moveTo(sweep, INNER.y);
      c.lineTo(sweep + 62, INNER.y);
      c.lineTo(sweep + 12, INNER.b);
      c.lineTo(sweep - 50, INNER.b);
      c.closePath();
      c.fill();
      c.globalAlpha = 1;
    }
    // cristais pulsando (base estática no cache; halo animado aqui)
    for (const cd of room.decor) {
      if (cd.type !== 'crystal_blue') continue;
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.6 + (cd.seed || 0));
      c.globalAlpha = 0.09 + pulse * 0.15;
      pixelCircle(c, cd.x, cd.y - 8, 11 + pulse * 3, '#4ae0d0');
      c.globalAlpha = 0.3 + pulse * 0.45;
      px(c, cd.x - 1, cd.y - 15, 1, 1, '#d8fffa');
      px(c, cd.x + 3, cd.y - 9, 1, 1, '#d8fffa');
      c.globalAlpha = 1;
    }
  }

  // telefone tocando na cabana
  if (room.id === 'cabana') {
    const gs = (typeof gameState !== 'undefined' && gameState)
      || (typeof game !== 'undefined' && game)
      || null;
    if (gs && gs.easter && gs.easter.phoneRinging) {
      const pd = room.decor.find((d) => d.type === 'phone_scare');
      const phx = pd ? pd.x : 330;
      const phy = pd ? pd.y : 222;
      const cxp = phx - 11;
      const cyp = phy - 24 + Math.round(Math.sin(t * 32) * 0.5);
      const ringPulse = 0.5 + 0.5 * Math.sin(t * 11);
      c.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const r = 5 + i * 4 + ringPulse * 1.5;
        c.globalAlpha = (0.65 - i * 0.16) * (0.45 + ringPulse * 0.55);
        c.strokeStyle = i === 0 ? '#fff6d0' : '#ffe9a3';
        c.beginPath();
        c.arc(cxp, cyp, r, Math.PI * 0.60, Math.PI * 1.40);
        c.stroke();
      }
      c.globalAlpha = 0.25 + ringPulse * 0.45;
      px(c, cxp + 1, cyp - 2, 2, 4, '#fff6d0');
      c.globalAlpha = 1;
    }
  }
}

function drawAltar(c, x, y, t) {
  // pedestal
  px(c, x - 16, y + 2, 32, 8, '#5a5448');
  px(c, x - 13, y - 4, 26, 8, '#6e6758');
  px(c, x - 10, y - 10, 20, 8, '#7a7262');
  px(c, x - 8, y - 12, 16, 3, '#8a8272');
  px(c, x - 16, y + 2, 32, 2, '#8a8272');
  // runas
  const pulse = 0.5 + Math.sin(t * 2.4) * 0.5;
  c.fillStyle = `rgba(230,187,79,${0.25 + pulse * 0.35})`;
  c.fillRect(x - 6, y - 7, 2, 2);
  c.fillRect(x + 4, y - 7, 2, 2);
  c.fillRect(x - 1, y - 9, 2, 2);
  c.fillRect(x - 2, y - 3, 4, 1);
}

/* ------------------------------------------------------------------ */
/* HUD e telas                                                        */
/* ------------------------------------------------------------------ */

function drawHeartIcon(c, x, y, filled, s = 1, frac = 1) {
  c.save();
  c.translate(x, y);
  c.scale(s, s);

  const shape = (col, dark, shiny) => {
    px(c, -5, -4, 4, 3, col);
    px(c, 1, -4, 4, 3, col);
    px(c, -5, -2, 10, 3, col);
    px(c, -4, 1, 8, 2, dark);
    px(c, -2, 3, 4, 2, dark);
    px(c, 0, 5, 1, 1, dark);
    if (shiny) px(c, -4, -3, 2, 1, '#ff9a8a');
  };

  const f = clamp(filled ? 1 : frac, 0, 1);
  if (f <= 0.001) {
    shape('#3a2a2a', '#241a1a', false);
  } else if (f >= 0.999) {
    shape('#e05a4a', '#a83228', true);
  } else {
    // coração parcial: desenha vazio e recorta a fração preenchida
    shape('#3a2a2a', '#241a1a', false);
    c.save();
    c.beginPath();
    c.rect(-6, -6, 12 * f, 12);
    c.clip();
    shape('#e05a4a', '#a83228', true);
    c.restore();
  }
  c.restore();
}

/* Indicador compacto de DASH/DEF na barra inferior */
function drawAbilityHud(c, p, game) {
  const x = VW - 104;
  const y = BOTTOM_Y + 3;
  px(c, x, BOTTOM_Y + 1, 98, 12, 'rgba(11,13,18,0.94)');
  px(c, x, BOTTOM_Y + 1, 1, 12, '#1d2733');

  const dashReady = (p.rollCd || 0) <= 0.0001 && p.rollT <= 0;
  drawText(c, 'DASH', x + 4, y, {
    scale: 1,
    color: dashReady ? C.green : p.rollT > 0 ? '#fff6d0' : '#6f7a8a',
  });
  const bx = x + 32;
  const bw = 18;
  const frac = p.rollCdMax > 0 ? clamp(1 - (p.rollCd || 0) / p.rollCdMax, 0, 1) : 1;
  px(c, bx, y + 1, bw, 4, '#151b24');
  px(c, bx, y + 1, Math.round(bw * frac), 4, dashReady ? C.green : '#c9a24a');
  if (frac > 0) px(c, bx, y + 1, Math.round(bw * frac), 1, 'rgba(255,255,255,0.16)');

  const parryWindow = p.guarding && p.guardT <= GUARD.parryWindow;
  const guardCol = parryWindow || p.guardFlash > 0
    ? '#fff6d0'
    : p.guarding
      ? '#9fd0ff'
      : '#4d5666';
  drawText(c, 'DEF', x + 54, y, { scale: 1, color: guardCol });
  const sx = x + 74;
  px(c, sx, y + 1, 5, 4, guardCol);
  px(c, sx + 1, y + 5, 3, 2, guardCol);
  px(c, sx + 2, y + 7, 1, 1, guardCol);

  // efeitos das homenagens: escudo (roxo) e fúria (vermelho)
  const shieldOn = typeof game.shield === 'number' ? game.shield > 0 : !!game.shield;
  if (shieldOn) {
    const pulse = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() * 0.004));
    c.globalAlpha = pulse;
    px(c, x + 81, y + 1, 3, 2, '#9a5ae0');
    px(c, x + 85, y + 1, 3, 2, '#9a5ae0');
    px(c, x + 80, y + 2, 9, 3, '#7a3ac0');
    px(c, x + 82, y + 5, 5, 2, '#6a2fb0');
    px(c, x + 83, y + 7, 3, 1, '#5a2f9a');
    px(c, x + 81, y + 2, 2, 1, '#d8b0ff');
    c.globalAlpha = 1;
  }
  if (game.powerBoostT > 0) {
    const pulse = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() * 0.006));
    c.globalAlpha = pulse;
    px(c, x + 90, y + 5, 6, 2, '#a83228');
    px(c, x + 91, y + 2, 4, 3, '#d8503f');
    px(c, x + 92, y - 1, 2, 3, '#ffb14a');
    px(c, x + 92, y + 3, 2, 3, '#ffd24a');
    c.globalAlpha = 1;
  }
}

function drawCooldownBar(c, x, y, w, label, remain, max, readyColor) {
  const ready = remain <= 0.0001;
  drawText(c, label, x, y, { scale: 1, color: ready ? readyColor : '#6f7a8a' });
  const bx = x + 26;
  const frac = max > 0 ? clamp(1 - remain / max, 0, 1) : 1;
  px(c, bx, y + 1, w, 4, '#151b24');
  px(c, bx, y + 1, Math.round(w * frac), 4, ready ? readyColor : '#c9a24a');
  px(c, bx, y + 1, Math.round(w * frac), 1, 'rgba(255,255,255,0.16)');
  if (ready) {
    drawText(c, 'PRONTO', bx + w + 4, y, { scale: 1, color: readyColor });
  } else {
    drawText(c, remain.toFixed(1) + 's', bx + w + 4, y, {
      scale: 1,
      color: '#5f6b7c',
    });
  }
}

function drawHUD(c, game, t) {
  const p = game.player;

  // barra superior
  px(c, 0, 0, VW, HUD_H, '#0b0d12');
  px(c, 0, HUD_H - 2, VW, 2, '#1d2733');
  px(c, 0, HUD_H - 1, VW, 1, 'rgba(230,187,79,0.35)');

  // corações (suporta frações do dano bloqueado)
  for (let i = 0; i < game.maxHearts; i++) {
    const frac = clamp(game.hearts - i, 0, 1);
    drawHeartIcon(c, 14 + i * 14, 11, frac >= 0.999, 1, frac);
  }

  // divisor
  px(c, 58, 6, 1, 16, '#232b38');

  // item na mão
  drawText(c, 'MÃOS', 66, 6, { scale: 1, color: '#6f7a8a' });
  if (game.held) {
    drawItemIcon(c, game.held.type, 70, 19, 0.6, t);
    drawText(c, game.held.short || game.held.label, 80, 15, { scale: 1, color: C.goldLight });
  } else {
    drawText(c, 'vazias', 66, 15, { scale: 1, color: '#4d5666' });
  }

  // recarga dos golpes da arma equipada
  if (game.held && isWeapon(game.held.type)) {
    drawCooldownBar(c, 124, 4, 32, 'LEVE', p.swingCd || 0, p.swingCdMax || 0.7, C.green);
    drawCooldownBar(c, 124, 15, 32, 'FORTE', p.heavyCd || 0, p.heavyCdMax || 3, '#ffb14a');
  }

  // lanterna
  if (game.hasLantern) {
    drawItemIcon(c, 'lantern', 232, 14, 0.5, t);
    drawText(c, 'LUZ', 242, 11, { scale: 1, color: '#c9a24a' });
  }

  // nome da sala
  drawText(c, game.room.name.toUpperCase(), VW - 12, 6, {
    scale: 1,
    color: '#c9d2df',
    align: 'right',
  });
  drawText(c, game.room.dark && !game.hasLantern ? 'ESCURO' : 'TEMPO ' + formatTime(game.elapsed), VW - 12, 16, {
    scale: 1,
    color: game.room.dark && !game.hasLantern ? '#8a6a9a' : '#5f6b7c',
    align: 'right',
  });

  // barra de chefe da sala (não desenha durante um toast para não ficar coberta)
  const boss = game.enemies.find(
    (e) => e.alive && e.boss && e.room === game.room.id
  );
  const toastVisible = !!(game.toast && game.toast.time > 0);
  if (boss && !toastVisible) {
    const bw = 150;
    const bx = Math.round((VW - bw) / 2);
    const by = HUD_H + 11;
    px(c, bx - 6, HUD_H + 1, bw + 12, 19, 'rgba(5,7,10,0.75)');
    drawText(c, 'DRAGÃO SENHOR', VW / 2, HUD_H + 3, {
      scale: 1,
      color: C.goldLight,
      align: 'center',
    });
    px(c, bx, by, bw, 4, '#2a1412');
    const frac = clamp(boss.hp / boss.maxHp, 0, 1);
    px(c, bx, by, Math.round(bw * frac), 4, '#ff6a3a');
    px(c, bx, by, Math.round(bw * frac), 1, '#ffb14a');
  }

  // barra inferior
  px(c, 0, BOTTOM_Y, VW, VH - BOTTOM_Y, '#0b0d12');
  px(c, 0, BOTTOM_Y, VW, 1, '#1d2733');
  px(c, 8, BOTTOM_Y + 7, 3, 3, C.green);
  c.save();
  c.beginPath();
  c.rect(0, BOTTOM_Y, VW - 108, VH - BOTTOM_Y);
  c.clip();
  drawText(c, game.objective, 16, BOTTOM_Y + 4, { scale: 1, color: '#9aa7b8' });
  c.restore();
  drawAbilityHud(c, p, game);

  // minimapa
  if (game.showMap) drawMiniMap(c, game, t);

  // toasts
  drawToast(c, game);
}

/* Toast compartilhado entre o HUD e a tela-título */
function drawToast(c, game) {
  if (!game.toast || game.toast.time <= 0) return;
  const a = clamp(game.toast.time, 0, 1);
  const maxW = 360;
  const lines = wrapLines(game.toast.text, maxW, 1);
  let boxW = 0;
  for (const ln of lines) boxW = Math.max(boxW, textWidth(ln, 1));
  boxW = Math.min(maxW, boxW) + 24;
  const boxH = 14 + lines.length * 9;
  const x = VW / 2 - boxW / 2;
  const y = ROOM.y + 8;
  c.globalAlpha = Math.min(1, a * 1.5);
  px(c, x, y, boxW, boxH, 'rgba(8,10,14,0.9)');
  px(c, x, y, boxW, 1, 'rgba(230,187,79,0.5)');
  px(c, x, y + boxH - 1, boxW, 1, 'rgba(230,187,79,0.5)');
  lines.forEach((ln, i) => {
    drawText(c, ln, VW / 2, y + 6 + i * 9, {
      scale: 1,
      color: C.goldLight,
      align: 'center',
    });
  });
  c.globalAlpha = 1;
}

function drawMiniMap(c, game, t) {
  const cellW = 22, cellH = 12, gap = 2;
  const cols = GRID[0].length, rows = GRID.length;
  const w = cols * (cellW + gap) + 8;
  const h = rows * (cellH + gap) + 8;
  const x = VW - w - 8;
  const y = VH - h - 20;

  c.globalAlpha = 0.92;
  px(c, x, y, w, h, 'rgba(8,10,14,0.94)');
  c.strokeStyle = 'rgba(120,150,180,0.4)';
  c.lineWidth = 1;
  c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  c.globalAlpha = 1;

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const id = GRID[gy][gx];
      const room = game.world.rooms[id];
      const cx = x + 4 + gx * (cellW + gap);
      const cy = y + 4 + gy * (cellH + gap);
      if (room.visited) {
        px(c, cx, cy, cellW, cellH, id === game.room.id ? '#e6bb4f' : '#274434');
        px(c, cx, cy, cellW, 1, id === game.room.id ? '#fff6d0' : '#3f6a50');
      } else {
        px(c, cx, cy, cellW, cellH, '#141a23');
        px(c, cx, cy, cellW, 1, '#1d2632');
      }
      if (id === game.room.id) {
        if (Math.floor(t * 4) % 2 === 0) {
          px(c, cx + cellW / 2 - 2, cy + cellH / 2 - 2, 4, 4, '#0a0c10');
        }
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Telas                                                              */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Cutscenes                                                          */
/* ------------------------------------------------------------------ */

function cutsceneLerpHex(a, b, t) {
  const ca = parseInt(a.slice(1), 16);
  const cb = parseInt(b.slice(1), 16);
  const r = Math.round(lerp((ca >> 16) & 255, (cb >> 16) & 255, t));
  const g = Math.round(lerp((ca >> 8) & 255, (cb >> 8) & 255, t));
  const bl = Math.round(lerp(ca & 255, cb & 255, t));
  return `rgb(${r},${g},${bl})`;
}

function drawCutsceneBg(c, bg, t) {
  const palettes = {
    night: ['#070d18', '#1b2944'],
    forest: ['#050f09', '#143522'],
    castle: ['#080d16', '#242c3c'],
    cave: ['#0b0709', '#33180f'],
    altar: ['#080c18', '#4a3a18'],
  };
  const sky = palettes[bg] || palettes.night;

  for (let y = 0; y < VH; y += 4) {
    c.fillStyle = cutsceneLerpHex(sky[0], sky[1], y / VH);
    c.fillRect(0, y, VW, 4);
  }

  // estrelas ou brasas flutuando
  const rng = mulberry32(7331);
  for (let i = 0; i < 46; i++) {
    const x = Math.floor(rng() * VW);
    const y = Math.floor(rng() * 205);
    const tw = 0.2 + 0.8 * Math.abs(Math.sin(t * 1.4 + i * 1.7));
    c.globalAlpha = tw * (bg === 'cave' ? 0.5 : 0.8);
    px(c, x, y, 1, 1, bg === 'cave' ? '#ff9a4a' : '#dfe8ff');
    c.globalAlpha = 1;
  }

  if (bg === 'night' || bg === 'forest') {
    // pinheiros em silhueta
    for (let i = 0; i < 17; i++) {
      const x = 8 + i * 25 + (i % 3) * 5;
      const h = 32 + (i % 4) * 11;
      c.fillStyle = bg === 'night' ? '#0b1712' : '#07170e';
      c.beginPath();
      c.moveTo(x, 206 - h);
      c.lineTo(x - 11, 212);
      c.lineTo(x + 11, 212);
      c.closePath();
      c.fill();
    }
    px(c, 0, 210, VW, VH - 210, '#060b08');
    px(c, 0, 210, VW, 1, '#13271b');
  } else if (bg === 'castle') {
    // torres do castelo
    c.fillStyle = '#0a0f18';
    const towers = [
      [26, 44, 92],
      [112, 56, 132],
      [226, 46, 100],
      [300, 64, 144],
    ];
    for (const [x, w, h] of towers) {
      c.fillRect(x, 208 - h, w, h + 70);
      c.beginPath();
      c.moveTo(x - 7, 208 - h);
      c.lineTo(x + w / 2, 208 - h - 24);
      c.lineTo(x + w + 7, 208 - h);
      c.closePath();
      c.fill();
    }
    px(c, 58, 154, 3, 6, 'rgba(230,187,79,0.55)');
    px(c, 142, 122, 3, 6, 'rgba(230,187,79,0.55)');
    px(c, 248, 148, 3, 6, 'rgba(230,187,79,0.55)');
    px(c, 326, 118, 3, 6, 'rgba(230,187,79,0.55)');
    px(c, 0, 250, VW, VH - 250, '#070a10');
  } else if (bg === 'cave') {
    // estalactites e brilho de lava
    c.fillStyle = '#180d0a';
    for (let i = 0; i < 12; i++) {
      const x = i * 36 + 6;
      const h = 30 + ((i * 7) % 42);
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x + 17, 0);
      c.lineTo(x + 9, h);
      c.closePath();
      c.fill();
    }
    for (let i = 0; i < 9; i++) {
      const x = i * 48 + 20;
      const h = 18 + ((i * 11) % 30);
      c.beginPath();
      c.moveTo(x, VH);
      c.lineTo(x + 20, VH);
      c.lineTo(x + 10, VH - h);
      c.closePath();
      c.fill();
    }
    px(c, 0, 252, VW, VH - 252, '#1a0d08');
    c.globalAlpha = 0.35 + 0.12 * Math.sin(t * 3);
    px(c, 0, 252, VW, 4, '#ff6a2a');
    c.globalAlpha = 1;
  } else if (bg === 'altar') {
    // colunas e raios dourados
    c.fillStyle = '#090c13';
    for (let i = 0; i < 4; i++) {
      const x = 26 + i * 106;
      c.fillRect(x, 78, 26, 174);
      c.fillRect(x - 6, 70, 38, 10);
      c.fillRect(x - 4, 244, 34, 8);
    }
    c.save();
    c.translate(VW / 2, 216);
    for (let i = 0; i < 12; i++) {
      c.rotate(Math.PI / 6);
      c.globalAlpha = 0.05 + 0.035 * Math.abs(Math.sin(t * 1.7 + i));
      c.fillStyle = '#e6bb4f';
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(150, -16);
      c.lineTo(150, 16);
      c.closePath();
      c.fill();
    }
    c.globalAlpha = 1;
    c.restore();
    px(c, 0, 250, VW, VH - 250, '#080a10');
  }

  // vinheta
  const vg = c.createRadialGradient(VW / 2, 140, 70, VW / 2, 150, 300);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.55)');
  c.fillStyle = vg;
  c.fillRect(0, 0, VW, VH);
}

function drawCutsceneWolf(c, cx, cy, t) {
  const s = 1.55 * PLAYER_DRAW_SCALE;
  const wy = cy + 28 + Math.sin(t * 1.6) * 2;

  c.globalAlpha = 0.35;
  pixelEllipse(c, cx, wy + 2, 14 * s, 3 * s, '#000');
  c.globalAlpha = 1;

  if (typeof PLAYER_IMG !== 'undefined' && PLAYER_IMG.complete && PLAYER_IMG.naturalWidth) {
    c.save();
    c.translate(Math.round(cx), Math.round(wy));
    c.scale(s, s);
    c.drawImage(PLAYER_IMG, 0, 0, 32, 48, -16, -48, 32, 48);
    c.restore();
  } else {
    pixelEllipse(c, cx, wy - 12 * s, 10 * s, 17 * s, '#6f7a8a');
    pixelCircle(c, cx, wy - 32 * s, 8 * s, '#8a95a4');
    px(c, cx - 3 * s, wy - 35 * s, 2 * s, 2 * s, '#fff6d0');
    px(c, cx + 3 * s, wy - 35 * s, 2 * s, 2 * s, '#fff6d0');
  }
}

function drawCutsceneDragon(c, cx, cy, t) {
  const y = cy + Math.sin(t * 1.3) * 2;
  const body = '#4a241b';
  const bodyLight = '#6a3022';

  c.fillStyle = '#2e1610';
  c.beginPath();
  c.moveTo(cx - 8, y - 4);
  c.lineTo(cx - 66, y - 40);
  c.lineTo(cx - 48, y + 4);
  c.closePath();
  c.fill();
  c.beginPath();
  c.moveTo(cx + 8, y - 4);
  c.lineTo(cx + 66, y - 40);
  c.lineTo(cx + 48, y + 4);
  c.closePath();
  c.fill();
  c.beginPath();
  c.moveTo(cx - 18, y + 14);
  c.lineTo(cx - 62, y + 34);
  c.lineTo(cx - 50, y + 40);
  c.lineTo(cx - 10, y + 26);
  c.closePath();
  c.fill();

  pixelEllipse(c, cx, y + 14, 34, 24, body);
  pixelEllipse(c, cx, y + 16, 24, 16, bodyLight);
  pixelEllipse(c, cx + 28, y - 8, 15, 13, body);
  px(c, cx + 20, y - 26, 5, 10, '#8a6a20');
  px(c, cx + 38, y - 6, 16, 9, bodyLight);
  px(c, cx + 38, y + 1, 14, 2, '#2e1610');
  px(c, cx + 33, y - 11, 4, 3, '#ffd24a');
  px(c, cx + 34, y - 11, 2, 1, '#fff6d0');
  px(c, cx - 18, y + 34, 8, 12, body);
  px(c, cx + 10, y + 34, 8, 12, body);

  for (let i = 0; i < 4; i++) {
    c.globalAlpha = 0.22 - i * 0.04;
    pixelCircle(c, cx + 52 + i * 7, y - 12 - Math.sin(t * 2 + i) * 5, 4 + i * 2, '#9aa0aa');
  }
  c.globalAlpha = 1;
}

function drawCutsceneAltar(c, cx, cy, t) {
  const y = cy + 10;

  c.globalAlpha = 0.35;
  pixelEllipse(c, cx, y + 34, 58, 9, '#000');
  c.globalAlpha = 1;

  px(c, cx - 48, y + 14, 96, 16, '#242a34');
  px(c, cx - 40, y + 2, 80, 14, '#343c4a');
  px(c, cx - 48, y + 14, 96, 3, '#5a626f');
  px(c, cx - 36, y + 6, 72, 2, '#4a5361');

  c.save();
  c.translate(cx, y - 8);
  for (let i = 0; i < 12; i++) {
    c.rotate(Math.PI / 6);
    c.globalAlpha = 0.08 + 0.05 * Math.abs(Math.sin(t * 1.8 + i));
    c.fillStyle = '#e6bb4f';
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(58, -7);
    c.lineTo(58, 7);
    c.closePath();
    c.fill();
  }
  c.globalAlpha = 1;
  c.restore();

  drawItemIcon(c, 'chalice', cx, y - 12 + Math.sin(t * 1.8) * 2, 2.6, t);
}

function drawCutsceneArt(c, art, cx, cy, t, game) {
  const glow = c.createRadialGradient(cx, cy, 0, cx, cy, 70);
  glow.addColorStop(0, 'rgba(230,187,79,0.16)');
  glow.addColorStop(1, 'rgba(230,187,79,0)');
  c.fillStyle = glow;
  c.fillRect(cx - 70, cy - 70, 140, 140);

  const bob = Math.sin(t * 1.7) * 2;
  if (art === 'chalice') drawItemIcon(c, 'chalice', cx, cy + bob, 3, t);
  else if (art === 'key') drawItemIcon(c, 'key', cx, cy + bob, 2.8, t);
  else if (art === 'sword') drawItemIcon(c, 'sword', cx, cy + bob, 2.8, t);
  else if (art === 'wolf') drawCutsceneWolf(c, cx, cy, t);
  else if (art === 'dragon') drawCutsceneDragon(c, cx, cy, t);
  else if (art === 'altar') drawCutsceneAltar(c, cx, cy, t);
}

function drawCutscene(c, game, t) {
  const cs = game.cutscene;
  if (!cs) return;
  const slide = cs.def.slides[cs.index];
  const accent = slide.accent || C.goldLight;

  drawCutsceneBg(c, slide.bg, t);

  // barras de cinema
  px(c, 0, 0, VW, 20, '#030407');
  px(c, 0, VH - 20, VW, 20, '#030407');

  drawText(c, 'LOBO CINZA  •  O CÁLICE DE OURO', VW / 2, 25, {
    scale: 1,
    color: 'rgba(201,210,223,0.55)',
    align: 'center',
  });

  drawText(c, slide.title, VW / 2, 37, {
    scale: 2,
    color: accent,
    align: 'center',
    outline: '#0a0c10',
    shadow: '#000',
  });

  px(c, VW / 2 - 60, 56, 120, 1, accent);
  px(c, VW / 2 - 30, 57, 60, 1, 'rgba(255,246,208,0.35)');

  drawCutsceneArt(c, slide.art, VW / 2, 128, t, game);

  let budget = Math.max(0, cs.reveal || 0);
  slide.lines.forEach((line, i) => {
    const shown = line.slice(0, Math.max(0, budget));
    budget -= line.length + 1;
    drawText(c, shown, VW / 2, 198 + i * 13, {
      scale: 1,
      color: '#d7dee8',
      align: 'center',
      shadow: '#05070a',
    });
  });

  // indicador de progresso
  const count = cs.def.slides.length;
  const gap = 10;
  const totalW = count * gap;
  for (let i = 0; i < count; i++) {
    const dx = VW / 2 - totalW / 2 + i * gap + gap / 2;
    px(c, dx - 1, 229, 3, 3, i === cs.index ? accent : 'rgba(120,140,165,0.35)');
  }

  const touch = document.body.classList.contains('touch');
  const hint = touch ? 'AÇÃO PARA CONTINUAR' : 'ESPAÇO/ENTER CONTINUAR   ESC PULAR';
  drawText(c, hint, VW / 2, 250, {
    scale: 1,
    color: Math.floor(t * 2) % 2 ? accent : 'rgba(154,167,184,0.55)',
    align: 'center',
  });

  drawText(c, cs.index + 1 + '/' + count, VW - 12, 268, {
    scale: 1,
    color: 'rgba(120,140,165,0.6)',
    align: 'right',
  });

  const fade = clamp(1 - cs.t / 0.35, 0, 1);
  if (fade > 0) drawFade(c, fade);
}

function drawTitle(c, game, t) {
  // céu noturno
  for (let i = 0; i < 30; i++) {
    const v = i / 30;
    const r = Math.round(lerp(8, 26, v));
    const g = Math.round(lerp(12, 38, v));
    const b = Math.round(lerp(24, 58, v));
    px(c, 0, i * 10, VW, 10, `rgb(${r},${g},${b})`);
  }
  // estrelas
  const rng = mulberry32(4242);
  for (let i = 0; i < 70; i++) {
    const x = Math.floor(rng() * VW);
    const y = Math.floor(rng() * 160);
    const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + i));
    c.globalAlpha = tw;
    px(c, x, y, 1, 1, i % 4 === 0 ? '#fff6d0' : '#dfe8ff');
    c.globalAlpha = 1;
  }
  // lua
  const mx = 318, my = 58;
  c.globalAlpha = 0.14;
  pixelCircle(c, mx, my, 44, '#dfe8ff');
  c.globalAlpha = 1;
  pixelCircle(c, mx, my, 26, '#e8eef8');
  pixelCircle(c, mx - 8, my - 6, 5, '#c9d2df');
  pixelCircle(c, mx + 8, my + 8, 3, '#c9d2df');
  pixelCircle(c, mx + 2, my - 12, 2, '#d5dce8');

  // colinas
  c.fillStyle = '#152a20';
  for (let x = 0; x < VW; x += 4) {
    const h = 30 + Math.sin(x * 0.02) * 10 + Math.sin(x * 0.05 + 2) * 5;
    c.fillRect(x, 230 - h, 4, h);
  }
  // pinheiros distantes
  for (let i = 0; i < 18; i++) {
    const x = 20 + i * 22 + (i % 2) * 6;
    const h = 26 + (i % 4) * 8;
    c.fillStyle = '#0e1d17';
    c.beginPath();
    c.moveTo(x, 200 - h);
    c.lineTo(x - 10, 200);
    c.lineTo(x + 10, 200);
    c.closePath();
    c.fill();
  }
  // chão
  px(c, 0, 200, VW, VH - 200, '#0b140f');
  px(c, 0, 200, VW, 2, '#1c3a26');

  // vaga-lumes
  for (let i = 0; i < 12; i++) {
    const x = 30 + i * 31 + Math.sin(t * 0.7 + i) * 8;
    const y = 190 + Math.sin(t * 1.3 + i * 2) * 18;
    const a = 0.3 + 0.7 * Math.abs(Math.sin(t * 2 + i));
    c.globalAlpha = a;
    px(c, x, y, 2, 2, '#b8e86a');
    c.globalAlpha = 1;
  }

  // logo
  drawText(c, 'LOBO CINZA', VW / 2, 62, {
    scale: 4,
    color: '#e8e2cc',
    align: 'center',
    outline: '#0a0c10',
    shadow: '#2c7a3a',
  });
  drawText(c, 'O CÁLICE DE OURO', VW / 2, 100, {
    scale: 2,
    color: C.gold,
    align: 'center',
    outline: '#20170a',
  });

  px(c, 120, 120, 160, 1, 'rgba(230,187,79,0.5)');
  px(c, 150, 119, 100, 1, 'rgba(230,187,79,0.8)');

  // personagem em destaque: sempre o lobo
  const bob = Math.sin(t * 2) * 2;
  const wx = VW / 2;
  const wy = 230 + bob;
  const titleScale = 2 * PLAYER_DRAW_SCALE;
  c.globalAlpha = 0.3;
  pixelEllipse(c, wx, wy + 1, 15 * titleScale, 3 * titleScale, '#000');
  c.globalAlpha = 1;

  if (typeof PLAYER_IMG !== 'undefined' && PLAYER_IMG.complete && PLAYER_IMG.naturalWidth) {
    // arte de apresentação: 2x a escala do jogo (48x72), ainda em destaque
    const tx = Math.round(wx);
    const ty = Math.round(wy);
    c.save();
    c.translate(tx, ty);
    c.scale(titleScale, titleScale);
    c.drawImage(PLAYER_IMG, 0, 0, 32, 48, -16, -48, 32, 48);
    c.restore();
  }
  // seletor de dificuldade
  const diff = DIFFICULTY[currentDifficulty];
  const selY = 244;
  for (let i = 0; i < DIFF_KEYS.length; i++) {
    const key = DIFF_KEYS[i];
    const d = DIFFICULTY[key];
    const active = key === currentDifficulty;
    const label = (i + 1) + ':' + d.name;
    const lw = textWidth(label, 1) + 8;
    const lx = VW / 2 - (DIFF_KEYS.length * 78) / 2 + i * 78 - lw / 2 + 4;
    px(c, lx, selY, lw, 11, active ? 'rgba(230,187,79,0.25)' : 'rgba(60,70,80,0.5)');
    px(c, lx, selY, 1, 11, active ? C.goldLight : '#3a4450');
    px(c, lx + lw - 1, selY, 1, 11, active ? C.goldLight : '#3a4450');
    drawText(c, label, lx + 4, selY + 1, {
      scale: 1,
      color: active ? C.goldLight : '#6a7684',
      align: 'left',
    });
  }
  drawText(c, 'DIFICULDADE', VW / 2, 236, {
    scale: 1,
    color: '#5f6b7c',
    align: 'center',
  });

  drawText(c, 'PRESSIONE ENTER', VW / 2, 266, {
    scale: 1,
    color: Math.floor(t * 2) % 2 ? C.goldLight : '#8a7a4a',
    align: 'center',
  });

  drawText(c, 'SETAS/WASD MOVER   ESPAÇO AÇÃO   F GOLPE FORTE', VW / 2, 282, {
    scale: 1,
    color: '#7d8a9c',
    align: 'center',
  });
  drawText(c, 'M MAPA   P PAUSA   N SOM: ' + (Sound.enabled ? 'LIGADO' : 'MUDO'), VW / 2, 293, {
    scale: 1,
    color: '#5f6b7c',
    align: 'center',
  });

  if (game.bestTime) {
    drawText(c, 'MELHOR TEMPO: ' + formatTime(game.bestTime), 10, 8, {
      scale: 1,
      color: '#c9a24a',
    });
  }

  // o código secreto 0717 também funciona no título
  drawToast(c, game);
}

function drawPause(c, game, t) {
  c.fillStyle = 'rgba(4,6,9,0.78)';
  c.fillRect(0, 0, VW, VH);
  panel(c, 78, 92, 244, 116);
  drawText(c, 'PAUSA', VW / 2, 108, {
    scale: 3,
    color: C.goldLight,
    align: 'center',
    outline: '#20170a',
  });
  drawText(c, 'MAPA: M   SOM: N   LARGAR: Q', VW / 2, 148, {
    scale: 1,
    color: '#9aa7b8',
    align: 'center',
  });
  drawText(c, 'P PARA CONTINUAR', VW / 2, 170, {
    scale: 1,
    color: Math.floor(t * 2) % 2 ? C.gold : '#7d6a3a',
    align: 'center',
  });
}

function drawGameOver(c, game, t) {
  c.fillStyle = 'rgba(4,6,9,0.82)';
  c.fillRect(0, 0, VW, VH);
  panel(c, 66, 78, 268, 148);
  drawText(c, 'FIM DA JORNADA', VW / 2, 96, {
    scale: 3,
    color: '#e05a4a',
    align: 'center',
    outline: '#2a0e0c',
  });
  drawText(c, 'O lobo caiu nas garras da escuridão.', VW / 2, 132, {
    scale: 1,
    color: '#9aa7b8',
    align: 'center',
  });
  drawText(c, 'Tempo: ' + formatTime(game.elapsed), VW / 2, 152, {
    scale: 1,
    color: '#c9d2df',
    align: 'center',
  });
  drawText(c, 'Dragões derrotados: ' + game.kills, VW / 2, 166, {
    scale: 1,
    color: '#c9d2df',
    align: 'center',
  });
  drawText(c, 'ENTER PARA TENTAR DE NOVO', VW / 2, 198, {
    scale: 1,
    color: Math.floor(t * 2) % 2 ? C.goldLight : '#8a7a4a',
    align: 'center',
  });
}

function drawWin(c, game, t) {
  c.fillStyle = 'rgba(4,6,9,0.8)';
  c.fillRect(0, 0, VW, VH);
  panel(c, 52, 52, 296, 206, true);

  // raios dourados
  c.save();
  c.translate(VW / 2, 96);
  for (let i = 0; i < 12; i++) {
    c.rotate(Math.PI / 6);
    c.globalAlpha = 0.08 + Math.sin(t * 2 + i) * 0.04;
    c.fillStyle = '#e6bb4f';
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(60, -8);
    c.lineTo(60, 8);
    c.closePath();
    c.fill();
  }
  c.globalAlpha = 1;
  c.restore();

  drawText(c, 'VOCÊ VENCEU!', VW / 2, 64, {
    scale: 3,
    color: C.goldLight,
    align: 'center',
    outline: '#20170a',
  });
  drawText(c, 'O Cálice de Ouro voltou ao altar.', VW / 2, 100, {
    scale: 1,
    color: '#c9d2df',
    align: 'center',
  });

  drawItemIcon(c, 'chalice', VW / 2, 132, 2.2, t);

  drawText(c, 'Tempo: ' + formatTime(game.elapsed), VW / 2, 168, {
    scale: 1,
    color: '#e8e2cc',
    align: 'center',
  });
  drawText(c, 'Dragões derrotados: ' + game.kills + '   Quedas: ' + game.deaths, VW / 2, 182, {
    scale: 1,
    color: '#9aa7b8',
    align: 'center',
  });
  drawText(c, 'Melhor tempo: ' + formatTime(game.bestTime || game.elapsed), VW / 2, 196, {
    scale: 1,
    color: '#c9a24a',
    align: 'center',
  });
  drawText(c, 'ENTER PARA JOGAR DE NOVO', VW / 2, 228, {
    scale: 1,
    color: Math.floor(t * 2) % 2 ? C.goldLight : '#8a7a4a',
    align: 'center',
  });
}

function panel(c, x, y, w, h, gold = false) {
  px(c, x, y, w, h, '#0c1017');
  px(c, x + 2, y + 2, w - 4, h - 4, '#111722');
  c.strokeStyle = gold ? 'rgba(230,187,79,0.8)' : 'rgba(120,140,165,0.55)';
  c.lineWidth = 1;
  c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  c.strokeStyle = gold ? 'rgba(230,187,79,0.25)' : 'rgba(120,140,165,0.2)';
  c.strokeRect(x + 3.5, y + 3.5, w - 7, h - 7);
}

function formatTime(sec) {
  if (!sec || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function drawFade(c, alpha) {
  if (alpha <= 0) return;
  c.fillStyle = `rgba(3,4,6,${alpha})`;
  c.fillRect(0, 0, VW, VH);
}

/* =========================================================================
   Minigame Adventure (tela cheia, estética Atari 2600)
   ========================================================================= */

function drawAdventure(c, st, t) {
  const a = (st && st.adv) || {};
  const hasAdv = typeof ADVENTURE !== 'undefined' && ADVENTURE && Array.isArray(ADVENTURE.maps);
  const labels = ['O CASTELO', 'A CAVERNA', 'O OVO', '???'];
  const idx = Math.max(0, Math.min(3, a.screen | 0));
  const M = (hasAdv && ADVENTURE.maps[idx]) || { walls: [] };
  const hint = (hasAdv && ADVENTURE.hint) || 'SETAS/WASD: MOVER    AÇÃO/ESC: SAIR';
  const credit = (hasAdv && ADVENTURE.credit) || 'CRIADO POR WARREN ROBINETT';

  const styles = [
    { face: '#c9a24a', top: '#e6bb4f', shade: '#6a5315', edge: '#3a2c0a', label: '#e6bb4f' },
    { face: '#b8433a', top: '#d85a4a', shade: '#6a1f1a', edge: '#3a0f0c', label: '#d85a4a' },
    { face: '#8a8a90', top: '#b0b0b8', shade: '#4a4a52', edge: '#26262c', label: '#b0b0b8' },
    { face: '#141414', top: '#e6bb4f', shade: '#050505', edge: '#000000', label: '#ffe9a3' },
  ];
  const S = styles[idx];
  const flick = 0.5 + 0.5 * Math.sin(t * 9.1);
  const now = Number.isFinite(t) ? t : 0;

  c.save();

  // fundo chapado
  px(c, 0, 0, VW, VH, '#000000');

  // grade discreta de "celas" no chão
  c.globalAlpha = 0.05;
  for (let gy = 56; gy < VH; gy += 32) px(c, 0, gy, VW, 1, '#ffffff');
  for (let gx = 20; gx < VW; gx += 40) px(c, gx, 28, 1, VH - 28, '#ffffff');
  c.globalAlpha = 1;

  // estrelas discretas nas fases finais (ovo e ???)
  if (idx >= 2) {
    for (let i = 0; i < 52; i++) {
      const sx = 12 + ((i * 83 + 11) % 376);
      const sy = 36 + ((i * 47 + 19) % 252);
      const tw = 0.5 + 0.5 * Math.sin(now * 2.2 + i * 1.7);
      c.globalAlpha = 0.16 + tw * 0.34;
      px(c, sx, sy, 1, 1, i % 7 === 0 ? '#ffe9a3' : '#cfd8e8');
    }
    c.globalAlpha = 1;
  }

  // paredes do mapa atual
  const walls = Array.isArray(M.walls) ? M.walls : [];
  for (const w of walls) {
    if (!w || !Number.isFinite(w.x) || !Number.isFinite(w.y)) continue;
    const ww = Math.max(1, w.w || 1);
    const wh = Math.max(1, w.h || 1);
    px(c, w.x, w.y, ww, wh, S.face);
    px(c, w.x, w.y, ww, Math.min(2, wh), S.top);
    px(c, w.x, w.y, 1, wh, S.top);
    px(c, w.x + ww - 2, w.y, 2, wh, S.shade);
    px(c, w.x, w.y + wh - 2, ww, 2, S.shade);
    px(c, w.x, w.y, ww, 1, S.edge);
    px(c, w.x, w.y + wh - 1, ww, 1, S.edge);
    // brilho de 1px
    if (ww > 4 && wh > 4) px(c, w.x + 2, w.y + 3, ww - 4, 1, 'rgba(255,255,255,0.12)');
  }

  // aposento oculto (tela do nome) — a "sala" criada pelo ponto invisível
  if (idx === 3) {
    drawText(c, credit, VW / 2, 96, {
      scale: 1, color: '#a97c25', align: 'center',
    });
    c.globalAlpha = 0.7 + 0.3 * Math.sin(now * 2.4);
    drawText(c, 'WARREN ROBINETT', VW / 2, 132, {
      scale: 2, color: '#e6bb4f', align: 'center', shadow: '#000000',
    });
    c.globalAlpha = 1;
    const halo = 0.5 + 0.5 * Math.sin(now * 2.4 + 1.3);
    c.globalAlpha = 0.25 + halo * 0.55;
    pixelCircle(c, VW / 2, 180, 1, '#ffffff');
    c.globalAlpha = 1;
  }

  // porta de saída (mapa do castelo)
  const doors = Array.isArray(M.doors) ? M.doors : [];
  for (const d of doors) {
    if (!d || !Number.isFinite(d.x)) continue;
    const dw = d.w || 18, dh = d.h || 34;
    px(c, d.x - 1, d.y - 1, dw + 2, dh + 2, S.edge);
    px(c, d.x, d.y, dw, dh, '#050403');
    px(c, d.x + 2, d.y + 2, dw - 4, dh - 4, '#0d0a06');
    px(c, d.x, d.y, dw, 1, S.shade);
    // brilho/seta sutil indicando saída
    const p = 0.5 + 0.5 * Math.sin(now * 3.2);
    c.globalAlpha = 0.35 + p * 0.5;
    drawText(c, '→', d.x + dw / 2 - 2, d.y + dh / 2 - 3, {
      scale: 1, color: S.top, align: 'center',
    });
    c.globalAlpha = 1;
  }

  // passagem secreta da caverna (quase invisível, revela ao aproximar)
  if (idx === 1 && M.secret && Number.isFinite(M.secret.x)) {
    const sec = M.secret;
    const plx = Number.isFinite(a.x) ? a.x : ((M.spawn && M.spawn.x) || 200);
    const ply = Number.isFinite(a.y) ? a.y : ((M.spawn && M.spawn.y) || 200);
    const near = Math.hypot(plx + 4 - sec.x, ply + 4 - sec.y) < (sec.r || 10) * 2.6;
    c.globalAlpha = near ? 0.5 : 0.07;
    px(c, sec.x - 2, sec.y, 4, 1, '#d8d8d0');
    px(c, sec.x - 1, sec.y + 1, 2, 1, '#d8d8d0');
    if (near) {
      c.globalAlpha = 0.10;
      pixelCircle(c, sec.x, sec.y, 4, '#d8d8d0');
    }
    c.globalAlpha = 1;
  }

  // glint periódico do ponto invisível (1× a cada 5s, sutil)
  if (idx === 2 && M.dot && Number.isFinite(M.dot.x) && Number.isFinite(M.dot.y)) {
    const g = now % 5;
    if (g < 0.75) {
      const k = 1 - g / 0.75;
      c.globalAlpha = k * 0.85;
      px(c, M.dot.x, M.dot.y, 1, 1, '#fff6d0');
      c.globalAlpha = k * 0.3;
      pixelCircle(c, M.dot.x, M.dot.y, 3, '#ffe9a3');
      c.globalAlpha = 1;
    }
  }

  // dragão/ave blocky da caverna
  if (idx === 1 && M.dragon && Number.isFinite(M.dragon.y)) {
    const dx = Number.isFinite(a.dragonX) ? a.dragonX : (M.dragon.x || 200);
    const dy = M.dragon.y;
    const dir = a.dragonDir < 0 ? -1 : 1;
    const flap = Math.round(Math.sin(now * 8) * 1);
    c.save();
    c.translate(dx, dy);
    c.scale(dir, 1);
    // cauda
    px(c, -11, 1, 4, 2, '#8c2a22');
    px(c, -12, 2, 2, 1, '#6a1f1a');
    // asa
    px(c, -5, -10 + flap, 7, 3, '#6a1f1a');
    px(c, -2, -13 + flap, 4, 4, '#8c2a22');
    px(c, -6, -7, 8, 3, '#8c2a22');
    px(c, -4, -13 + flap, 3, 1, '#b8433a');
    // corpo
    px(c, -8, -2, 16, 8, '#8c2a22');
    px(c, -7, -4, 14, 4, '#b8433a');
    px(c, -6, -4, 12, 1, '#d85a4a');
    px(c, -6, 4, 12, 2, '#d87a5a');
    // cabeça, bico e chifre
    px(c, 5, -7, 6, 6, '#b8433a');
    px(c, 6, -7, 4, 1, '#d85a4a');
    px(c, 6, -9, 2, 2, '#6a1f1a');
    px(c, 9, 0, 4, 3, '#d85a4a');
    px(c, 10, 3, 4, 1, '#3a0f0c');
    px(c, 11, 3, 1, 1, '#f4e6c0');
    // olho
    px(c, 7, -5, 2, 2, '#ffd24a');
    px(c, 8, -5, 1, 1, '#3a0f0c');
    // patas
    px(c, -6, 6, 2, 3, '#6a1f1a');
    px(c, 2, 6, 2, 3, '#6a1f1a');
    c.restore();
  }

  // jogador (quadrado 8x8 amarelo-pálido)
  if (!(a.phase === 'win')) {
    const plx = Number.isFinite(a.x) ? a.x : ((M.spawn && M.spawn.x) || 200);
    const ply = Number.isFinite(a.y) ? a.y : ((M.spawn && M.spawn.y) || 180);
    const facing = a.dir || a.face || 'down';
    px(c, plx - 1, ply - 1, 10, 10, '#141007');
    px(c, plx, ply, 8, 8, '#f4f1d0');
    px(c, plx, ply, 8, 1, '#fffde8');
    px(c, plx, ply, 1, 8, '#fffde8');
    px(c, plx + 6, ply + 6, 2, 2, '#c9c4a0');
    px(c, plx + 6, ply, 2, 1, '#c9c4a0');
    // entalhe indicando a direção
    const notch = '#3a3418';
    if (facing === 'left') px(c, plx, ply + 3, 2, 2, notch);
    else if (facing === 'right') px(c, plx + 6, ply + 3, 2, 2, notch);
    else if (facing === 'up') px(c, plx + 3, ply, 2, 2, notch);
    else px(c, plx + 3, ply + 6, 2, 2, notch);
  }

  // flash de dano/impacto
  const flash = Number.isFinite(a.flash) ? Math.max(0, Math.min(1, a.flash)) : 0;
  if (flash > 0) {
    const red = idx === 1;
    c.globalAlpha = flash * 0.55;
    px(c, 0, 0, VW, VH, red ? '#ff5040' : '#ffffff');
    c.globalAlpha = 1;
  }

  // barra superior
  px(c, 0, 0, VW, 28, '#0b0b0b');
  px(c, 0, 27, VW, 1, S.shade);
  px(c, 6, 11, 2, 2, S.top);
  // barra superior (a 4ª tela fica anônima: '???' — world.js não foi alterado)
  const barLabel = idx === 3 ? labels[3] : (M.label || labels[idx]);
  drawText(c, barLabel.toUpperCase(), 12, 10, {
    scale: 1, color: S.label,
  });
  drawText(c, hint, VW - 8, 10, {
    scale: 1, color: '#8a8f98', align: 'right',
  });
  // linha de brilho sob a barra
  c.globalAlpha = 0.22 + flick * 0.10;
  px(c, 0, 28, VW, 1, S.top);
  c.globalAlpha = 1;

  // tela de vitória (por cima de tudo, inclusive da barra)
  if (a.phase === 'win') {
    px(c, 0, 0, VW, VH, 'rgba(0,0,0,0.72)');
    // apenas o crédito do jogo
    c.globalAlpha = 0.75 + 0.25 * Math.sin(now * 2.2);
    drawText(c, credit, VW / 2, 128, {
      scale: 2, color: '#e6bb4f', align: 'center', shadow: '#000000',
    });
    c.globalAlpha = 1;
    drawText(c, 'AÇÃO/ESC: SAIR', VW / 2, 196, {
      scale: 1, color: '#8a8f98', align: 'center',
    });
  }

  c.restore();
}
