'use strict';

/* =========================================================================
   Lógica principal do jogo
   ========================================================================= */

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const world = buildWorld();

let gameState = null;

/* Dificuldade */
const DIFFICULTY = {
  facil: {
    id: 'facil', name: 'Fácil', hearts: 3, dragonSpeed: 1.0, dragonCd: 1.0,
    batSteal: 0.45, dark: 0.6, extraDragons: 0,
    dragonHp: 2, bossHp: 6, telegraph: 1.15, projectile: false,
  },
  medio: {
    id: 'medio', name: 'Médio', hearts: 2, dragonSpeed: 1.35, dragonCd: 0.78,
    batSteal: 0.6, dark: 0.8, extraDragons: 1,
    dragonHp: 3, bossHp: 9, telegraph: 1.0, projectile: false,
  },
  dificil: {
    id: 'dificil', name: 'Difícil', hearts: 2, dragonSpeed: 1.75, dragonCd: 0.55,
    batSteal: 0.8, dark: 1.0, extraDragons: 2,
    dragonHp: 4, bossHp: 12, telegraph: 0.85, projectile: true,
  },
};

/* Ataques do jogador (espada) — constantes centralizadas */
const ATTACK = {
  light: { dur: 0.22, reach: 32, arcDot: 0.55, dmg: 1, cd: 0.7, knock: 7, shake: 3 },
  heavy: { dur: 0.45, reach: 40, arcDot: 0.3, dmg: 3, cd: 3.0, knock: 26, shake: 6 },
};

/* Armas secretas invocadas por comando: cada homenagem ganha a sua, com
   estatísticas próprias e, algumas, um efeito especial ao acertar.
   O tipo do item é a chave aqui (ex.: held.type === 'mc_sword'). */
const WEAPON_DEFS = {
  sword: {
    label: 'Espada',
    short: 'Espada',
    color: '#fff6d0',
    light: ATTACK.light,
    heavy: ATTACK.heavy,
  },
  lito_plane: {
    label: 'Avião de Papel',
    short: 'Avião',
    color: '#e8e2cc',
    light: { dur: 0.16, reach: 38, arcDot: 0.6, dmg: 1, cd: 0.3, knock: 4, shake: 2 },
    heavy: { dur: 0.34, reach: 46, arcDot: 0.35, dmg: 2, cd: 1.4, knock: 12, shake: 4 },
  },
  marx_book: {
    label: 'Manifesto',
    short: 'Marx',
    color: '#e6c26a',
    light: { dur: 0.26, reach: 34, arcDot: 0.5, dmg: 2, cd: 1.0, knock: 8, shake: 4 },
    heavy: { dur: 0.5, reach: 44, arcDot: 0.3, dmg: 4, cd: 3.2, knock: 24, shake: 7 },
  },
  senna_wheel: {
    label: 'Volante de Corrida',
    short: 'Volante',
    color: '#e6bb4f',
    effect: 'speed',
    effectAmount: 1.8,
    light: { dur: 0.18, reach: 32, arcDot: 0.55, dmg: 1, cd: 0.4, knock: 6, shake: 2 },
    heavy: { dur: 0.4, reach: 38, arcDot: 0.3, dmg: 3, cd: 2.0, knock: 20, shake: 6 },
  },
  trotsky_pick: {
    label: 'Picador de Gelo',
    short: 'Picador',
    color: '#d8503f',
    light: { dur: 0.22, reach: 34, arcDot: 0.55, dmg: 2, cd: 0.75, knock: 10, shake: 3 },
    heavy: { dur: 0.46, reach: 42, arcDot: 0.3, dmg: 5, cd: 3.0, knock: 30, shake: 7 },
  },
  deltarune_heart: {
    label: 'Coração Sombrio',
    short: 'Coração',
    color: '#b88af0',
    effect: 'heal',
    effectAmount: 0.35,
    light: { dur: 0.2, reach: 34, arcDot: 0.55, dmg: 1, cd: 0.55, knock: 7, shake: 3 },
    heavy: { dur: 0.44, reach: 42, arcDot: 0.3, dmg: 3, cd: 2.5, knock: 24, shake: 6 },
  },
  mc_sword: {
    label: 'Espada de Diamante',
    short: 'Diam.',
    color: '#5adf6a',
    light: { dur: 0.2, reach: 36, arcDot: 0.55, dmg: 2, cd: 0.55, knock: 9, shake: 3 },
    heavy: { dur: 0.44, reach: 44, arcDot: 0.3, dmg: 4, cd: 2.5, knock: 28, shake: 7 },
  },
  verity_ball: {
    label: 'Bola Verity',
    short: 'Verity',
    color: '#f2d94a',
    effect: 'stun',
    effectAmount: 0.35,
    light: { dur: 0.18, reach: 32, arcDot: 0.6, dmg: 1, cd: 0.4, knock: 12, shake: 3 },
    heavy: { dur: 0.4, reach: 38, arcDot: 0.32, dmg: 2, cd: 1.8, knock: 26, shake: 6 },
  },
  roblox_block: {
    label: 'Bloco de Checkpoint',
    short: 'Bloco',
    color: '#5adf6a',
    effect: 'shield',
    light: { dur: 0.24, reach: 32, arcDot: 0.5, dmg: 1, cd: 0.7, knock: 9, shake: 3 },
    heavy: { dur: 0.5, reach: 40, arcDot: 0.3, dmg: 3, cd: 2.4, knock: 26, shake: 7 },
  },
  rbiana_burger: {
    label: 'Hambúrguer da Rbiana',
    short: 'Burger',
    color: '#e86aa0',
    effect: 'heal',
    effectAmount: 0.25,
    light: { dur: 0.2, reach: 32, arcDot: 0.55, dmg: 1, cd: 0.5, knock: 7, shake: 3 },
    heavy: { dur: 0.42, reach: 38, arcDot: 0.3, dmg: 2, cd: 2.0, knock: 22, shake: 6 },
  },
  undertale_star: {
    label: 'Estrela da Determinação',
    short: 'Estrela',
    color: '#ffe66a',
    effect: 'invuln',
    effectAmount: 0.5,
    light: { dur: 0.18, reach: 34, arcDot: 0.6, dmg: 1, cd: 0.45, knock: 8, shake: 3 },
    heavy: { dur: 0.4, reach: 42, arcDot: 0.3, dmg: 2, cd: 1.8, knock: 24, shake: 6 },
  },
  ultrakill_coin: {
    label: 'Moeda de Aço',
    short: 'Moeda',
    color: '#ff8a2a',
    light: { dur: 0.26, reach: 34, arcDot: 0.5, dmg: 3, cd: 0.9, knock: 12, shake: 5 },
    heavy: { dur: 0.55, reach: 46, arcDot: 0.3, dmg: 6, cd: 3.5, knock: 34, shake: 8 },
  },
  richard_paper: {
    label: 'Papel de Regimento',
    short: 'Papel',
    color: '#e8e0cc',
    effect: 'stun',
    effectAmount: 0.5,
    light: { dur: 0.2, reach: 36, arcDot: 0.6, dmg: 1, cd: 0.5, knock: 8, shake: 3 },
    heavy: { dur: 0.46, reach: 44, arcDot: 0.3, dmg: 2, cd: 2.0, knock: 22, shake: 6 },
  },
};

function isWeapon(type) {
  return Object.prototype.hasOwnProperty.call(WEAPON_DEFS, type);
}

/* Comandos digitados no teclado (`/nome`) ou no modal de código (mobile).
   Cada um invoca a arma secreta da homenagem correspondente. */
const SECRET_COMMANDS = [
  { code: '/AVIAO', weapon: 'lito_plane' },
  { code: '/MANIFESTO', weapon: 'marx_book' },
  { code: '/VOLANTE', weapon: 'senna_wheel' },
  { code: '/PICADOR', weapon: 'trotsky_pick' },
  { code: '/CORACAO', weapon: 'deltarune_heart' },
  { code: '/DIAMANTE', weapon: 'mc_sword' },
  { code: '/VERITY', weapon: 'verity_ball' },
  { code: '/CHECKPOINT', weapon: 'roblox_block' },
  { code: '/HAMBURGUER', weapon: 'rbiana_burger' },
  { code: '/ESTRELA', weapon: 'undertale_star' },
  { code: '/MOEDA', weapon: 'ultrakill_coin' },
  { code: '/REGIMENTO', weapon: 'richard_paper' },
];
const COMMAND_TIMEOUT_MS = 4000;

/* Defesa e rolamento */
const GUARD = {
  speedMul: 0.47,      // ~47% da velocidade andando
  damageMul: 0.25,     // reduz 75% do dano
  knockMul: 0.25,      // reduz 75% do empurrão
  parryWindow: 0.25,   // primeiros 0,25s de guarda = parry
  maxAngleDot: Math.cos((100 * Math.PI) / 180), // bloqueia até ~100° do olhar
};
const ROLL = {
  dist: 60,
  dur: 0.25,
  cd: 0.9,
  invuln: 0.28,        // i-frames um pouco além do movimento
};
const DIFF_KEYS = ['facil', 'medio', 'dificil'];
let currentDifficulty = 'facil';
const EXTRA_DRAGON_ROOMS = ['pantano', 'caverna', 'ruinas', 'cemiterio', 'cripta', 'lago'];
const BOSS_COUNT = ENEMY_DEFS.filter((d) => d.boss).length;

const DIRS = {
  north: { x: 0, y: -1, face: 'up' },
  south: { x: 0, y: 1, face: 'down' },
  west: { x: -1, y: 0, face: 'left' },
  east: { x: 1, y: 0, face: 'right' },
  up: { x: 0, y: -1, face: 'up' },
  down: { x: 0, y: 1, face: 'down' },
  left: { x: -1, y: 0, face: 'left' },
  right: { x: 1, y: 0, face: 'right' },
};

const MAX_HEARTS = 3;

function loadBest() {
  try {
    const v = localStorage.getItem('lobocinza_best');
    return v ? parseFloat(v) : 0;
  } catch (e) {
    return 0;
  }
}

function saveBest(v) {
  try {
    localStorage.setItem('lobocinza_best', String(v));
  } catch (e) {
    /* sem localStorage */
  }
}

/* Flags centralizadas das homenagens. Usado em createState, resetRun,
   update e tryEasterEgg para nunca duplicar estado nem usar timers. */
function freshEasterFlags() {
  return {
    litoCd: 0,
    sennaCd: 0,
    verityCd: 0,
    rbianaCd: 0,
    rbianaIdx: 0,
    marxUsed: false,
    trotskyUsed: false,
    deltaruneUsed: false,
    mineUsed: false,
    robloxUsed: false,
    undertaleUsed: false,
    ultrakillUsed: false,
  };
}

function createState() {
  const st = {
    mode: 'title',
    room: world.rooms.clareira,
    player: {
      x: 200,
      y: 216,
      vx: 0,
      vy: 0,
      facing: 'up',
      moving: false,
      walkT: 0,
      swing: 0,
      swingDur: 0,
      swingKind: 'light',
      swingReach: ATTACK.light.reach,
      swingCd: 0,
      swingCdMax: ATTACK.light.cd,
      heavyCd: 0,
      heavyCdMax: ATTACK.heavy.cd,
      invuln: 0,
      guarding: false,
      guardT: 0,
      guardBroken: false,
      guardFlash: 0,
      parryFlash: 0,
      parryToastCd: 0,
      rollT: 0,
      rollDur: ROLL.dur,
      rollElapsed: 0,
      rollCd: 0,
      rollCdMax: ROLL.cd,
      rollInvuln: 0,
      rollDirX: 0,
      rollDirY: 0,
      rollStartX: 0,
      rollStartY: 0,
      rollTargetX: 0,
      rollTargetY: 0,
      boostTrailT: 0,
    },
    swingId: 0,
    held: null,
    speedBoostT: 0,
    powerBoostT: 0,
    shield: 0,
    easter: freshEasterFlags(),
    hasLantern: false,
    gateUnlocked: false,
    gateMsgCd: 0,
    keyTaken: false,
    swordTaken: false,
    chaliceTaken: false,
    bossDead: false,
    bossKills: 0,
    kills: 0,
    deaths: 0,
    hearts: MAX_HEARTS,
    maxHearts: MAX_HEARTS,
    elapsed: 0,
    level: 1,
    objective: '',
    showMap: false,
    toast: { text: '', time: 0, dur: 0 },
    bestTime: loadBest(),
    enemies: [],
    bat: null,
    projectiles: [],
    particles: [],
    transition: null,
    fade: 0,
    shake: 0,
    pickupCd: 0,
    won: false,
    altarGlow: 0,
    world,
  };
  resetRun(st);
  return st;
}

/* Verifica se um ponto colide com sólidos da sala (com margem para o corpo do dragão) */
function pointBlockedForSpawn(room, x, y, pad) {
  for (const s of room.solids) {
    if (x > s.x - pad && x < s.x + s.w + pad && y > s.y - pad && y < s.y + s.h + pad) {
      return true;
    }
  }
  return false;
}

/* Escolhe um ponto livre para um dragão extra: dentro da área interna,
   fora dos sólidos e a pelo menos 46px de outros inimigos da mesma sala. */
function findEnemySpawn(st, room, roomId) {
  const marginX = 46;
  const marginTop = 44;
  const marginBottom = 24;
  const minD = 46;

  const freeAt = (x, y) => {
    if (pointBlockedForSpawn(room, x, y, 14)) return false;
    if (pointBlockedForSpawn(room, x, y - 12, 10)) return false;
    for (const other of st.enemies) {
      if (other.room === roomId && dist(other.x, other.y, x, y) < minD) return false;
    }
    return true;
  };

  for (let tries = 0; tries < 80; tries++) {
    const x = INNER.x + marginX + Math.random() * (INNER.r - INNER.x - marginX * 2);
    const y = INNER.y + marginTop + Math.random() * (INNER.b - INNER.y - marginTop - marginBottom);
    if (freeAt(x, y)) return { x: Math.round(x), y: Math.round(y) };
  }

  // varredura determinística como reserva
  for (let y = INNER.y + marginTop; y <= INNER.b - marginBottom; y += 20) {
    for (let x = INNER.x + marginX; x <= INNER.r - marginX; x += 20) {
      if (freeAt(x, y)) return { x, y };
    }
  }

  return { x: 200, y: 140 };
}

function resetRun(st) {
  // Itens
  for (const roomId in world.rooms) {
    world.rooms[roomId].items.length = 0;
    world.rooms[roomId].visited = false;
  }
  // A passagem secreta de Richard precisa ser redescoberta em cada partida
  const escadaria = world.rooms.escadaria;
  if (escadaria) {
    escadaria.secretRevealed = false;
    escadaria.exits.east = null;
    escadaria.bg = null;
  }
  // As passagens de Lito, Marx e Senna também voltam a ficar escondidas
  for (const parentId in SECRET_PASSAGES) {
    const room = world.rooms[parentId];
    if (!room) continue;
    room.secretRevealed = false;
    delete room.exits[SECRET_PASSAGES[parentId].side];
    room.bg = null;
  }
  for (const def of ITEM_DEFS) {
    const it = st.world.items.find((i) => i.id === def.id);
    it.taken = false;
    it.picked = false;
    it.holder = null;
    it.room = def.room;
    it.x = def.x;
    it.y = def.y;
    world.rooms[def.room].items.push(it);
  }

  st.held = null;
  st.hasLantern = false;
  st.gateUnlocked = false;
  st.gateMsgCd = 0;
  st.keyTaken = false;
  st.swordTaken = false;
  st.chaliceTaken = false;
  st.bossDead = false;
  st.bossKills = 0;
  st.kills = 0;
  st.deaths = 0;
  const diff = DIFFICULTY[currentDifficulty];
  st.difficulty = currentDifficulty;
  st.hearts = diff.hearts;
  st.maxHearts = diff.hearts;
  st.elapsed = 0;
  st.won = false;
  st.showMap = false;
  st.toast = { text: '', time: 0, dur: 0 };
  st.projectiles = [];
  st.particles = [];
  st.transition = null;
  st.shake = 0;
  st.pickupCd = 0;
  st.speedBoostT = 0;
  st.powerBoostT = 0;
  st.shield = 0;
  st.easter = freshEasterFlags();
  st.player.boostTrailT = 0;

  st.player.x = 200;
  st.player.y = 216;
  st.player.facing = 'up';
  st.player.moving = false;
  st.player.walkT = 0;
  st.player.swing = 0;
  st.player.swingDur = 0;
  st.player.swingKind = 'light';
  st.player.swingReach = ATTACK.light.reach;
  st.player.swingCd = 0;
  st.player.swingCdMax = ATTACK.light.cd;
  st.player.heavyCd = 0;
  st.player.heavyCdMax = ATTACK.heavy.cd;
  st.player.invuln = 0;
  clearGuard(st.player);
  st.player.guardBroken = false;
  st.player.parryFlash = 0;
  st.player.guardFlash = 0;
  st.player.parryToastCd = 0;
  st.player.rollT = 0;
  st.player.rollElapsed = 0;
  st.player.rollCd = 0;
  st.player.rollCdMax = ROLL.cd;
  st.player.rollInvuln = 0;
  st.player.rollDirX = 0;
  st.player.rollDirY = 0;
  st.swingId = 0;

  // Inimigos
  st.enemies = ENEMY_DEFS.map((d) => ({
    ...d,
    alive: true,
    dir: 1,
    phase: Math.random() * Math.PI * 2,
    hp: d.boss ? diff.bossHp : diff.dragonHp,
    maxHp: d.boss ? diff.bossHp : diff.dragonHp,
    hitT: 0,
    lastHitSwing: 0,
    atkCd: (1.5 + Math.random() * 1.5) * diff.dragonCd,
    windup: 0,
    nextAttack: null,
    attack: null,
    atkT: 0,
    patternIdx: Math.floor(Math.random() * 3),
    speed: d.speed * diff.dragonSpeed,
    wanderT: 0,
  }));
  // dragões extras em dificuldades mais altas
  for (let i = 0; i < diff.extraDragons; i++) {
    const roomId = EXTRA_DRAGON_ROOMS[i % EXTRA_DRAGON_ROOMS.length];
    const spawnRoom = world.rooms[roomId];
    const spot = findEnemySpawn(st, spawnRoom, spawnRoom.id);
    st.enemies.push({
      id: 'extra_' + i,
      type: 'dragon',
      room: roomId,
      x: spot.x,
      y: spot.y,
      axis: 'x',
      from: 60,
      to: 340,
      speed: 24 * diff.dragonSpeed,
      dir: 1,
      phase: Math.random() * Math.PI * 2,
      hp: diff.dragonHp,
      maxHp: diff.dragonHp,
      hitT: 0,
      lastHitSwing: 0,
      atkCd: (1.5 + Math.random() * 1.5) * diff.dragonCd,
      windup: 0,
      nextAttack: null,
      attack: null,
      atkT: 0,
      patternIdx: 0,
      wanderT: 0,
      boss: false,
    });
  }
  st.bat = {
    room: 'labirinto',
    x: 200,
    y: 120,
    phase: Math.random() * Math.PI * 2,
    cd: 0,
    stun: 0,
    active: false,
  };

  st.room = world.rooms.clareira;
  st.room.visited = true;

  updateObjective(st);
}

function updateObjective(st) {
  let o;
  if (st.won) {
    o = 'O Cálice de Ouro foi devolvido ao altar!';
  } else if (!st.hasLantern) {
    o = 'Encontre a lanterna no bosque, ao norte.';
  } else if (!st.gateUnlocked) {
    if (st.held && st.held.type === 'key') o = 'Leve a chave dourada ao portão do castelo.';
    else if (!st.keyTaken) o = 'Procure a chave dourada no labirinto profundo.';
    else o = 'Recupere a chave dourada que você deixou cair.';
  } else if (!st.swordTaken && (st.bossKills || 0) < BOSS_COUNT) {
    o = 'Pegue a espada no salão do castelo.';
  } else if ((st.bossKills || 0) < BOSS_COUNT) {
    o = 'Derrote todos os dragões seniores para chegar ao tesouro.';
  } else if (!st.chaliceTaken) {
    o = 'Pegue o Cálice de Ouro na sala do tesouro.';
  } else if (st.held && st.held.type === 'chalice') {
    o = 'Leve o cálice ao altar do castelo.';
  } else {
    o = 'Recupere o cálice e leve-o ao altar.';
  }
  st.objective = o;
}

/* ------------------------------------------------------------------ */
/* Entrada                                                            */
/* ------------------------------------------------------------------ */

const keys = {};
const input = {
  up: false,
  down: false,
  left: false,
  right: false,
  moveX: 0,
  moveY: 0,
  touchX: 0,
  touchY: 0,
  action: false,
  touchGuard: false,
};
/* Zona morta do joystick analógico: abaixo disso o toque não move o lobo. */
const JOY_DEADZONE = 0.16;

/* Código secreto: 0717 ativa/desativa a playlist alternativa. O buffer
   expira após 2s. O buffer é alimentado antes do seletor de dificuldade
   porque 0717 contém os dígitos 7 e 1. */
const SECRET_CODES = [{ code: '0717', kind: 'music' }];
const SECRET_TIMEOUT_MS = 2000;
let secretBuffer = '';
let secretLastAt = 0;
let lastTrackToastAt = 0;
let commandBuffer = '';
let commandLastAt = 0;

function feedSecretDigit(digit) {
  const now = Date.now();
  if (now - secretLastAt > SECRET_TIMEOUT_MS) secretBuffer = '';
  secretLastAt = now;

  const candidate = secretBuffer + digit;
  const matches = SECRET_CODES.filter((entry) => entry.code.indexOf(candidate) === 0);

  if (!matches.length) {
    // Reinicia no dígito atual apenas se ele puder começar outro código.
    secretBuffer = SECRET_CODES.some((entry) => entry.code.indexOf(digit) === 0) ? digit : '';
    return false;
  }

  secretBuffer = candidate;
  const exact = matches.find((entry) => entry.code === candidate);
  if (exact) {
    secretBuffer = '';
    if (gameState) triggerSecretCode(gameState, exact);
    return true;
  }

  // O primeiro dígito fica disponível para o seletor de dificuldade.
  return candidate.length >= 2;
}

function triggerSecretCode(st, entry) {
  if (entry.kind === 'music') triggerSecret(st);
}

function triggerSecret(st) {
  if (typeof Sound === 'undefined') return;
  Sound.init();
  const result = Sound.cycleMusicMode();
  if (!st || !result) return;

  if (result.error) {
    toast(st, result.error, 3.4);
    return;
  }
  if (result.mode === 'local') lastTrackToastAt = Date.now();

  if (result.message) {
    toast(st, result.label + ' — ' + result.message, 3.8);
  } else {
    toast(st, result.label || 'Trilha original', 2.8);
  }
}

function normalizeSecretCommand(raw) {
  let code = String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '');
  // No modal de código aceita o comando sem a barra inicial.
  if (code && code.charAt(0) !== '/') code = '/' + code;
  return code;
}

function matchSecretCommand(raw) {
  const code = normalizeSecretCommand(raw);
  return SECRET_COMMANDS.find((entry) => entry.code === code) || null;
}

/* Invoca a arma secreta direto para a mão do lobo. Se ele já carrega algo,
   o item antigo é largado no chão (sem perder progresso de chave/cálice). */
function grantSecretWeapon(st, weaponKey) {
  if (!st || st.mode !== 'play' || st.transition) return false;
  const def = WEAPON_DEFS[weaponKey];
  if (!def) return false;

  if (st.held) dropItem(st);

  const p = st.player;
  const item = {
    id: 'secret_' + weaponKey + '_' + Date.now(),
    type: weaponKey,
    label: def.label,
    short: def.short || def.label,
    room: st.room.id,
    x: p.x,
    y: p.y - 6,
    taken: true,
    picked: true,
    holder: 'player',
    bob: Math.random() * Math.PI * 2,
  };

  st.held = item;
  st.pickupCd = 0.6;
  p.swingCd = 0;
  p.heavyCd = 0;
  p.swing = 0;

  Sound.sfx('pickup');
  spawnParticles(st, p.x, p.y - 18, def.color, 16, { speed: 50, life: 0.7 });
  spawnParticles(st, p.x, p.y - 18, '#fff6d0', 8, { speed: 34, life: 0.55 });
  toast(st, 'Arma secreta: ' + def.label + '!', 3);
  return true;
}

function executeSecretCommand(st, raw) {
  const entry = matchSecretCommand(raw);
  if (!entry) return false;
  return grantSecretWeapon(st, entry.weapon);
}

/* Digitação do comando (só durante o jogo). Retorna true quando a tecla foi
   consumida pelo comando, para não mover/abrir mapa/alternar som sem querer. */
function handleSecretCommandKey(e) {
  if (!gameState || gameState.mode !== 'play' || e.repeat) return false;
  if (e.ctrlKey || e.metaKey || e.altKey) return false;

  let ch = '';
  if (e.key === '/' || e.code === 'Slash' || e.code === 'NumpadDivide') ch = '/';
  else if (e.key && e.key.length === 1 && /[a-zA-Z]/.test(e.key)) ch = e.key.toUpperCase();
  if (!ch) return false;

  const now = Date.now();
  if (now - commandLastAt > COMMAND_TIMEOUT_MS) commandBuffer = '';
  commandLastAt = now;

  const candidate = commandBuffer + ch;
  const matches = SECRET_COMMANDS.filter((entry) => entry.code.indexOf(candidate) === 0);

  if (!matches.length) {
    // Comando errado: descarta o buffer e deixa a tecla seguir o fluxo normal.
    commandBuffer = ch === '/' ? '/' : '';
    return ch === '/';
  }

  commandBuffer = candidate;
  const exact = matches.find((entry) => entry.code === candidate);
  if (exact) {
    commandBuffer = '';
    if (!grantSecretWeapon(gameState, exact.weapon)) {
      toast(gameState, 'Não foi possível invocar agora.', 1.8);
    }
    return true;
  }
  return true;
}

function startGame() {
  Sound.init();
  if (Sound.musicMode === 'local' || Sound.musicMode === 'youtube') Sound.resumeMusic();
  else Sound.startMusic();
  resetRun(gameState);
  gameState.mode = 'play';
  showRoomToast(gameState);
}

function showRoomToast(st) {
  st.toast = { text: '— ' + st.room.name + ' —', time: 2.6, dur: 2.6 };
}

function toast(st, text, dur = 2.4) {
  st.toast = { text, time: dur, dur };
  Sound.sfx('toast');
}

function handleKeyDown(e) {
  const code = e.code;

  const codeModal = document.getElementById('code-modal');
  if (codeModal && codeModal.classList.contains('open')) {
    if (code === 'Escape') {
      e.preventDefault();
      closeCodeModal(false);
    }
    return;
  }

  // Comandos de armas secretas (ex.: /diamante) são consumidos antes das
  // teclas de jogo para não mover o lobo nem abrir o mapa sem querer.
  if (handleSecretCommandKey(e)) {
    e.preventDefault();
    return;
  }

  if (
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyF', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyC'].includes(code)
  ) {
    e.preventDefault();
  }

  if (code === 'Enter' || code === 'NumpadEnter') {
    if (!gameState) return;
    if (gameState.mode === 'title' || gameState.mode === 'gameover' || gameState.mode === 'win') {
      startGame();
    }
    return;
  }

  // Alimenta o buffer do código secreto 0717 (qualquer modo). Se o dígito
  // foi consumido pelo código, não faz mais nada. Caso contrário, no título
  // ele pode ser a escolha imediata de dificuldade.
  const isTitle = !!gameState && gameState.mode === 'title';
  const digitMatch = /^(?:Digit|Numpad)([0-9])$/.exec(code);
  if (digitMatch) {
    if (e.repeat) return;
    const digit = digitMatch[1];
    if (feedSecretDigit(digit)) return;
    if (isTitle) {
      const diff = DIFF_KEYS[Number(digit) - 1];
      if (diff) {
        currentDifficulty = diff;
        Sound.sfx('click');
        return;
      }
    }
    return;
  }

  if (!gameState) return;

  if (code === 'KeyP' || code === 'Escape') {
    if (gameState.mode === 'play') {
      gameState.mode = 'pause';
      clearGuard(gameState.player);
      Sound.pauseMusic();
    } else if (gameState.mode === 'pause') {
      gameState.mode = 'play';
      Sound.resumeMusic();
    }
    return;
  }

  if (gameState.mode !== 'play') return;

  if (code === 'KeyM') {
    gameState.showMap = !gameState.showMap;
    Sound.sfx('click');
  } else if (code === 'KeyN' && !e.repeat) {
    const on = Sound.toggle();
    toast(gameState, on ? 'Som ligado' : 'Som desligado', 1.4);
  } else if (code === 'KeyQ' && !e.repeat) {
    dropItem(gameState);
  } else if (code === 'Space' && !e.repeat) {
    doAction(gameState);
  } else if (code === 'KeyF' && !e.repeat) {
    tryAttack(gameState, 'heavy');
  } else if (code === 'KeyC' && !e.repeat) {
    startRoll(gameState);
  }

  keys[code] = true;
}

function handleKeyUp(e) {
  keys[e.code] = false;
}

function readInput() {
  const kx =
    (keys.ArrowRight || keys.KeyD ? 1 : 0) - (keys.ArrowLeft || keys.KeyA ? 1 : 0);
  const ky =
    (keys.ArrowDown || keys.KeyS ? 1 : 0) - (keys.ArrowUp || keys.KeyW ? 1 : 0);

  // Soma teclado + joystick e limita o vetor a 1 (diagonal não fica mais rápida).
  let mx = kx + input.touchX;
  let my = ky + input.touchY;
  const mag = Math.hypot(mx, my);
  if (mag > 1) {
    mx /= mag;
    my /= mag;
  }
  input.moveX = mx;
  input.moveY = my;

  // Compatibilidade com o restante do jogo, que consulta direções digitais.
  input.up = my < -JOY_DEADZONE;
  input.down = my > JOY_DEADZONE;
  input.left = mx < -JOY_DEADZONE;
  input.right = mx > JOY_DEADZONE;
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

/* Se a janela perder o foco, os keyup podem nunca chegar. Sem isso a guarda
   (Shift/DEF) e o movimento ficariam presos ao voltar para o jogo. */
function releaseAllInput() {
  for (const k in keys) keys[k] = false;
  input.moveX = 0;
  input.moveY = 0;
  input.touchX = 0;
  input.touchY = 0;
  input.up = false;
  input.down = false;
  input.left = false;
  input.right = false;
  input.touchGuard = false;
  const defBtn = document.getElementById('btn-def');
  if (defBtn) defBtn.classList.remove('active');
  const joy = document.getElementById('joystick');
  if (joy) joy.classList.remove('active');
  const knob = document.getElementById('joystick-knob');
  if (knob) knob.style.transform = 'translate(0, 0)';
  if (gameState) clearGuard(gameState.player);
}
window.addEventListener('blur', releaseAllInput);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) releaseAllInput();
});

/* Joystick analógico: a manopla acompanha o dedo e o vetor resultante move
   o lobo em qualquer ângulo, com intensidade proporcional ao deslocamento. */
function setupJoystick() {
  const base = document.getElementById('joystick');
  const knob = document.getElementById('joystick-knob');
  if (!base || !knob) return;

  let pointerId = null;
  let downAt = 0;
  let lastTapDir = '';
  let lastTapAt = 0;

  const reset = () => {
    input.touchX = 0;
    input.touchY = 0;
    knob.style.transform = 'translate(0, 0)';
    base.classList.remove('active');
  };

  const apply = (clientX, clientY) => {
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const max = rect.width * 0.32;

    let dx = clientX - cx;
    let dy = clientY - cy;
    const len = Math.hypot(dx, dy);
    if (len > max && len > 0) {
      dx = (dx / len) * max;
      dy = (dy / len) * max;
    }

    const nx = dx / max;
    const ny = dy / max;
    const mag = Math.hypot(nx, ny);
    if (mag <= JOY_DEADZONE) {
      input.touchX = 0;
      input.touchY = 0;
    } else {
      // Reescala a zona morta para o controle começar suave, sem salto.
      const scaled = (mag - JOY_DEADZONE) / (1 - JOY_DEADZONE);
      input.touchX = (nx / mag) * scaled;
      input.touchY = (ny / mag) * scaled;
    }

    knob.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  base.addEventListener('pointerdown', (e) => {
    if (pointerId !== null) return;
    e.preventDefault();
    Sound.init();
    pointerId = e.pointerId;
    downAt = Date.now();
    base.classList.add('active');
    base.setPointerCapture(e.pointerId);
    apply(e.clientX, e.clientY);
  });

  base.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointerId) return;
    e.preventDefault();
    apply(e.clientX, e.clientY);
  });

  const end = (e) => {
    if (e.pointerId !== pointerId) return;
    e.preventDefault();

    // Dois toques rápidos na mesma direção continuam valendo como rolamento.
    const dx = input.touchX;
    const dy = input.touchY;
    const now = Date.now();
    if (
      Math.hypot(dx, dy) > 0.55 &&
      now - downAt <= 260 &&
      gameState &&
      gameState.mode === 'play'
    ) {
      const dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
            ? 'down'
            : 'up';
      if (lastTapDir === dir && now - lastTapAt <= 300) {
        startRoll(gameState, dir);
        lastTapDir = '';
        lastTapAt = 0;
      } else {
        lastTapDir = dir;
        lastTapAt = now;
      }
    }

    pointerId = null;
    reset();
  };

  base.addEventListener('pointerup', end);
  base.addEventListener('pointercancel', end);
  base.addEventListener('lostpointercapture', () => {
    if (pointerId !== null) {
      pointerId = null;
      reset();
    }
  });
}

/* Modal de código (toque): abre em pausa, aplica o comando e retoma o jogo. */
let codeModalResume = false;

function openCodeModal() {
  if (!gameState || gameState.mode !== 'play') return;
  const modal = document.getElementById('code-modal');
  const input = document.getElementById('code-input');
  const error = document.getElementById('code-error');
  if (!modal || !input) return;

  codeModalResume = true;
  gameState.mode = 'pause';
  clearGuard(gameState.player);
  if (typeof Sound !== 'undefined' && Sound.pauseMusic) Sound.pauseMusic();

  if (error) error.textContent = '';
  input.value = '/';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  input.focus();
  input.setSelectionRange(1, 1);
}

function closeCodeModal(apply) {
  const modal = document.getElementById('code-modal');
  const input = document.getElementById('code-input');
  const error = document.getElementById('code-error');
  if (!modal || !modal.classList.contains('open')) return;

  if (apply) {
    if (!gameState || !input) return;
    const prevMode = gameState.mode;
    gameState.mode = 'play';
    if (!executeSecretCommand(gameState, input.value)) {
      gameState.mode = prevMode;
      if (error) error.textContent = 'Código inválido. Confira o comando.';
      input.focus();
      return;
    }
  }

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (input) input.blur();

  if (gameState && codeModalResume) {
    gameState.mode = 'play';
    if (typeof Sound !== 'undefined' && Sound.resumeMusic) Sound.resumeMusic();
  }
  codeModalResume = false;
}

/* Toque */
function setupTouch() {
  setupJoystick();

  const codeBtn = document.getElementById('btn-code');
  if (codeBtn) {
    codeBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      openCodeModal();
    });
  }

  const codeForm = document.getElementById('code-form');
  if (codeForm) {
    codeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeCodeModal(true);
    });
  }

  const codeCancel = document.getElementById('code-cancel');
  if (codeCancel) {
    codeCancel.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      closeCodeModal(false);
    });
  }

  const codeModal = document.getElementById('code-modal');
  if (codeModal) {
    codeModal.addEventListener('pointerdown', (e) => {
      if (e.target === codeModal) closeCodeModal(false);
    });
  }

  const actionBtn = document.getElementById('btn-action');
  if (actionBtn) {
    actionBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      Sound.init();
      if (!gameState) return;
      if (gameState.mode === 'play') doAction(gameState);
      else if (gameState.mode === 'title' || gameState.mode === 'gameover' || gameState.mode === 'win') startGame();
    });
  }

  const heavyBtn = document.getElementById('btn-heavy');
  if (heavyBtn) {
    heavyBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      Sound.init();
      if (gameState && gameState.mode === 'play') tryAttack(gameState, 'heavy');
    });
  }

  const dropBtn = document.getElementById('btn-drop');  if (dropBtn) {
    dropBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (gameState && gameState.mode === 'play') dropItem(gameState);
    });
  }

  const defBtn = document.getElementById('btn-def');
  if (defBtn) {
    const setDef = (on) => {
      input.touchGuard = on;
      defBtn.classList.toggle('active', on);
    };
    defBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      Sound.init();
      setDef(true);
      defBtn.setPointerCapture(e.pointerId);
    });
    const offDef = (e) => {
      e.preventDefault();
      setDef(false);
    };
    defBtn.addEventListener('pointerup', offDef);
    defBtn.addEventListener('pointercancel', offDef);
    defBtn.addEventListener('lostpointercapture', () => setDef(false));
  }

  const mapBtn = document.getElementById('btn-map');
  if (mapBtn) {
    mapBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (gameState && gameState.mode === 'play') {
        gameState.showMap = !gameState.showMap;
        Sound.sfx('click');
      }
    });
  }

  canvas.addEventListener('pointerdown', (e) => {
    Sound.init();
    if (!gameState) return;
    if (gameState.mode === 'title' || gameState.mode === 'gameover' || gameState.mode === 'win') startGame();
  });
}

/* ------------------------------------------------------------------ */
/* Ações                                                              */
/* ------------------------------------------------------------------ */

function playerBox(p) {
  return { x: p.x - 7, y: p.y - 13, w: 14, h: 13 };
}

/* ------------------------------------------------------------------ */
/* Defesa (guarda / parry) e rolamento                                */
/* ------------------------------------------------------------------ */

function clearGuard(p) {
  p.guarding = false;
  p.guardT = 0;
  p.guardBroken = true;
}

function guardCoversSource(p, fromX, fromY) {
  if (!p.guarding) return false;
  const dir = DIRS[p.facing] || DIRS.down;
  const dx = fromX - p.x;
  const dy = fromY - (p.y - 12);
  const len = Math.hypot(dx, dy);
  if (len < 0.001) return true;
  const dot = (dx * dir.x + dy * dir.y) / len;
  return dot >= GUARD.maxAngleDot;
}

function updateGuard(st, dt) {
  const p = st.player;
  const wants = !!(keys.ShiftLeft || keys.ShiftRight || input.touchGuard);

  p.parryFlash = Math.max(0, p.parryFlash - dt);
  p.guardFlash = Math.max(0, p.guardFlash - dt);
  p.parryToastCd = Math.max(0, p.parryToastCd - dt);

  if (!wants) {
    p.guardBroken = false;
    if (p.guarding) {
      p.guarding = false;
      p.guardT = 0;
    }
    return;
  }

  // rolamento e troca de sala interrompem a guarda; após levar dano é
  // preciso soltar e pressionar Shift/DEF de novo.
  if (p.rollT > 0 || st.transition || p.guardBroken) {
    if (p.guarding) {
      p.guarding = false;
      p.guardT = 0;
    }
    return;
  }

  if (!p.guarding) {
    p.guarding = true;
    p.guardT = 0;
  } else {
    p.guardT += dt;
  }
}

/* Atordoa o dragão que originou o golpe parryado. */
function stunDragon(st, source, fromX, fromY) {
  let e = null;
  if (source && source.hp !== undefined) e = source;
  else {
    const cx = Number.isFinite(fromX) ? fromX : st.player.x;
    const cy = Number.isFinite(fromY) ? fromY : st.player.y;
    e = st.enemies.find(
      (en) => en.alive && en.room === st.room.id && dist(en.x, en.y, cx, cy) < 48
    );
  }
  if (!e || e.hp === undefined || e.alive === false) return null;

  e.stunT = 1.0;
  e.windup = 0;
  e.nextAttack = null;
  e.attack = null;
  e.atkT = 0;
  e.chargeVx = 0;
  e.chargeVy = 0;
  e.atkCd = Math.max(e.atkCd || 0, 1.0);

  spawnParticles(st, e.x, e.y - 34, '#ffe9a3', 12, { speed: 70, life: 0.6 });
  spawnParticles(st, e.x, e.y - 30, '#fff6d0', 6, { speed: 45, life: 0.5 });
  return e;
}

/* Inicia o rolamento. touchDir permite o duplo-toque do direcional. */
function startRoll(st, touchDir) {
  if (!st || st.mode !== 'play' || st.transition) return false;
  const p = st.player;
  if (p.rollT > 0 || p.rollCd > 0) return false;

  // Interrompe a guarda sem marcá-la como "quebrada": se Shift/DEF continuar
  // pressionado, a guarda volta sozinha ao terminar o rolamento.
  if (p.guarding) {
    p.guarding = false;
    p.guardT = 0;
  }

  let dx = 0;
  let dy = 0;
  if (touchDir && DIRS[touchDir]) {
    dx = DIRS[touchDir].x;
    dy = DIRS[touchDir].y;
  } else {
    dx = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    dy = (input.down ? 1 : 0) - (input.up ? 1 : 0);
  }
  if (dx && dy) {
    dx *= 0.7071;
    dy *= 0.7071;
  }
  if (!dx && !dy) {
    const d = DIRS[p.facing] || DIRS.down;
    dx = d.x;
    dy = d.y;
  }

  if (Math.abs(dx) > Math.abs(dy)) p.facing = dx > 0 ? 'right' : 'left';
  else p.facing = dy > 0 ? 'down' : 'up';

  p.rollT = ROLL.dur;
  p.rollDur = ROLL.dur;
  p.rollElapsed = 0;
  p.rollCd = ROLL.cd;
  p.rollCdMax = ROLL.cd;
  p.rollInvuln = ROLL.invuln;
  p.rollDirX = dx;
  p.rollDirY = dy;
  p.rollStartX = p.x;
  p.rollStartY = p.y;
  p.rollTargetX = clamp(p.x + dx * ROLL.dist, INNER.x + 7, INNER.r - 7);
  p.rollTargetY = clamp(p.y + dy * ROLL.dist, INNER.y + 13, INNER.b);
  p.swing = 0; // rolar cancela o golpe em andamento
  p.moving = true;

  Sound.sfx('roll');
  spawnParticles(st, p.x, p.y - 2, '#a89a7c', 6, { speed: 26, life: 0.4 });
  return true;
}

function updateRoll(st, dt) {
  const p = st.player;
  p.rollElapsed += dt;
  p.rollT = Math.max(0, p.rollT - dt);

  const prog = clamp(p.rollElapsed / (p.rollDur || ROLL.dur), 0, 1);
  const ease = 1 - Math.pow(1 - prog, 3); // ease-out
  const tx = p.rollStartX + (p.rollTargetX - p.rollStartX) * ease;
  const ty = p.rollStartY + (p.rollTargetY - p.rollStartY) * ease;

  // Move o trajeto em passos curtos: o ease-out dá saltos grandes no início
  // e um único salto poderia pular um sólido inteiro (tunneling).
  const stepX = clamp(tx, INNER.x + 7, INNER.r - 7) - p.x;
  const stepY = clamp(ty, INNER.y + 13, INNER.b) - p.y;
  const steps = Math.max(1, Math.ceil(Math.max(Math.abs(stepX), Math.abs(stepY)) / 4));
  for (let i = 0; i < steps; i++) {
    p.vx = stepX > 0 ? 240 : stepX < 0 ? -240 : 0;
    p.vy = stepY > 0 ? 240 : stepY < 0 ? -240 : 0;
    p.x += stepX / steps;
    resolveSolidsAxis(st, 'x');
    p.y += stepY / steps;
    resolveSolidsAxis(st, 'y');
  }
  p.vx = p.rollDirX * 240;
  p.vy = p.rollDirY * 240;

  if (Math.random() < 0.6) {
    spawnParticles(st, p.x, p.y - 1, '#a89a7c', 1, { speed: 14, life: 0.3 });
  }

  if (p.rollT <= 0) {
    p.rollT = 0;
    p.moving = false;
    spawnParticles(st, p.x, p.y - 2, '#8f8268', 5, { speed: 22, life: 0.35 });
  }
}

/* Homenagem original à Rbiana/Biana e ao rbolinha, inspirada apenas em
   referências públicas (lives, reacts, memes e fofocas). Nenhum asset,
   imagem, voz ou avatar oficial é usado. As mensagens ciclam a cada
   interação e não alteram o gameplay. */
const rbianaLines = [
  'LIVE: SÓ NA CONVERSA e reacts com a Biana. O chat veio pela resenha.',
  'FOFOCA NO AR: a Biana leu o chat e o chat leu a Biana.',
  'O rbolinha entrou na live e tomou conta do chat.',
  'Mãe do Tiago, streamer nas horas vagas — e o chat não deixa esquecer.',
  'CLIPOU! Esse react já virou corte.',
];

/* Interação das homenagens fixas. Retorna true sempre que há um objeto no
   raio, mesmo em cooldown, para a espada não atacar sem querer por perto. */
function tryEasterEgg(st) {
  const p = st.player;
  if (!st.easter) st.easter = freshEasterFlags();

  for (const key in EASTER_EGGS) {
    const egg = EASTER_EGGS[key];
    if (egg.room !== st.room.id) continue;
    if (dist(p.x, p.y, egg.x, egg.y) > egg.interact) continue;

    if (egg.kind === 'lito') {
      if (st.easter.litoCd > 0) return true;
      st.easter.litoCd = egg.cooldown;
      Sound.sfx('lito');
      toast(st, 'Homenagem a Lito Souza — Aviões e Músicas', 3.6);
      spawnParticles(st, egg.x, egg.y - 24, '#f0d27a', 10, { speed: 24, life: 0.8 });
      spawnParticles(st, egg.x, egg.y - 24, '#fff0f6', 6, { speed: 18, life: 0.9 });
      return true;
    }

    if (egg.kind === 'marx') {
      if (!st.easter.marxUsed) {
        st.easter.marxUsed = true;
        const healed = st.hearts < st.maxHearts;
        if (healed) st.hearts = Math.min(st.maxHearts, st.hearts + 1);
        Sound.sfx('marx');
        toast(
          st,
          healed
            ? 'Trabalhadores do reino, uni-vos! +1 coração'
            : 'Trabalhadores do reino, uni-vos!',
          3.2
        );
        spawnParticles(st, egg.x, egg.y - 22, '#e6c26a', 14, { speed: 24, life: 0.9 });
      } else {
        Sound.sfx('toast');
        toast(st, 'O conselho já foi ouvido nesta jornada.', 2.4);
      }
      return true;
    }

    if (egg.kind === 'senna') {
      if (st.easter.sennaCd > 0) return true;
      st.easter.sennaCd = egg.cooldown;
      st.speedBoostT = egg.boostT;
      Sound.sfx('senna');
      toast(st, 'Volta rápida!', 2.2);
      spawnParticles(st, p.x, p.y - 8, '#e6bb4f', 10, { speed: 55, life: 0.5 });
      spawnParticles(st, p.x, p.y - 8, '#5adf6a', 5, { speed: 40, life: 0.45 });
      return true;
    }

    if (egg.kind === 'trotsky') {
      if (!st.easter.trotskyUsed) {
        st.easter.trotskyUsed = true;
        st.maxHearts += 1;
        st.hearts = Math.min(st.maxHearts, st.hearts + 1);
        Sound.sfx('trotsky');
        toast(st, 'A história não termina. +1 coração máximo.', 3.2);
        spawnParticles(st, egg.x, egg.y - 26, '#d8503f', 14, { speed: 30, life: 1 });
        spawnParticles(st, egg.x, egg.y - 26, '#e6c26a', 10, { speed: 22, life: 0.9 });
      } else {
        Sound.sfx('toast');
        toast(st, 'O arquivo já contou essa história nesta jornada.', 2.4);
      }
      return true;
    }

    if (egg.kind === 'deltarune') {
      if (!st.easter.deltaruneUsed) {
        st.easter.deltaruneUsed = true;
        st.shield = 1;
        Sound.sfx('star');
        toast(st, 'Um coração sombrio agora te protege.', 3.2);
        spawnParticles(st, egg.x, egg.y - 30, '#9a6ad8', 14, { speed: 28, life: 1 });
        spawnParticles(st, egg.x, egg.y - 30, '#7fe6e6', 9, { speed: 22, life: 0.9 });
      } else {
        Sound.sfx('toast');
        toast(st, 'A fonte já guarda sua determinação.', 2.4);
      }
      return true;
    }

    if (egg.kind === 'minecraft') {
      if (!st.easter.mineUsed) {
        st.easter.mineUsed = true;
        if (st.hearts < st.maxHearts) st.hearts = Math.min(st.maxHearts, st.hearts + 1);
        Sound.sfx('coin');
        toast(st, 'Diamante! +1 coração.', 2.8);
        spawnParticles(st, egg.x, egg.y - 24, '#7fe6e6', 14, { speed: 36, life: 0.8 });
        spawnParticles(st, egg.x, egg.y - 24, '#ffffff', 8, { speed: 24, life: 0.7 });
      } else {
        Sound.sfx('toast');
        toast(st, 'A veia de diamante já foi minerada.', 2.2);
      }
      return true;
    }

    if (egg.kind === 'verity') {
      if (st.easter.verityCd > 0) return true;
      st.easter.verityCd = egg.cooldown || 4;
      Sound.sfx('verity');
      toast(st, 'Verity sorri para você.', 2.4);
      spawnParticles(st, egg.x, egg.y - 12, '#f2d94a', 10, { speed: 24, life: 0.8 });
      spawnParticles(st, egg.x, egg.y - 12, '#fff0a0', 5, { speed: 16, life: 0.7 });
      return true;
    }

    if (egg.kind === 'roblox') {
      if (!st.easter.robloxUsed) {
        st.easter.robloxUsed = true;
        st.speedBoostT = Math.max(st.speedBoostT || 0, 8);
        Sound.sfx('live');
        toast(st, 'CHECKPOINT! Velocidade extra por 8s.', 3);
        spawnParticles(st, egg.x, egg.y - 18, '#5adf6a', 12, { speed: 42, life: 0.8 });
        spawnParticles(st, egg.x, egg.y - 18, '#5a86c9', 8, { speed: 32, life: 0.7 });
        spawnParticles(st, egg.x, egg.y - 18, '#f2d94a', 5, { speed: 26, life: 0.6 });
      } else {
        Sound.sfx('toast');
        toast(st, 'Checkpoint já ativado nesta jornada.', 2.2);
      }
      return true;
    }

    if (egg.kind === 'rbiana') {
      if (st.easter.rbianaCd > 0) return true;
      st.easter.rbianaCd = egg.cooldown || 5;
      if (!Number.isFinite(st.easter.rbianaIdx)) st.easter.rbianaIdx = 0;
      const line = rbianaLines[st.easter.rbianaIdx % rbianaLines.length];
      st.easter.rbianaIdx = (st.easter.rbianaIdx + 1) % rbianaLines.length;
      Sound.sfx('live');
      toast(st, line, 3.6);
      spawnParticles(st, egg.x, egg.y - 22, '#e86aa0', 12, { speed: 34, life: 0.9 });
      spawnParticles(st, egg.x, egg.y - 22, '#7fe6e6', 8, { speed: 26, life: 0.8 });
      spawnParticles(st, egg.x, egg.y - 22, '#f2d94a', 3, { speed: 18, life: 0.7 });
      return true;
    }

    if (egg.kind === 'undertale') {
      if (!st.easter.undertaleUsed) {
        st.easter.undertaleUsed = true;
        if (st.hearts < st.maxHearts) st.hearts = Math.min(st.maxHearts, st.hearts + 1);
        Sound.sfx('star');
        toast(st, '* O reino está cheio de determinação. +1 coração.', 3.2);
        spawnParticles(st, egg.x, egg.y - 12, '#f2d94a', 14, { speed: 30, life: 0.9 });
      } else {
        Sound.sfx('toast');
        toast(st, '* Você já sentiu essa determinação.', 2.2);
      }
      return true;
    }

    if (egg.kind === 'ultrakill') {
      if (!st.easter.ultrakillUsed) {
        st.easter.ultrakillUsed = true;
        st.powerBoostT = 10;
        Sound.sfx('terminal');
        toast(st, 'O AÇO NÃO CANSA. +1 DANO POR 10s.', 3.2);
        spawnParticles(st, egg.x, egg.y - 16, '#d8503f', 14, { speed: 44, life: 0.8 });
        spawnParticles(st, egg.x, egg.y - 16, '#ff8a2a', 9, { speed: 34, life: 0.7 });
      } else {
        Sound.sfx('toast');
        toast(st, 'Terminal já processou sua fúria.', 2.2);
      }
      return true;
    }
  }
  return false;
}

function doAction(st) {
  if (st.transition) return;
  const p = st.player;

  // Descobrir a passagem secreta da escadaria (parede rachada)
  if (st.room.id === 'escadaria' && !st.room.secretRevealed) {
    if (p.x > INNER.r - 18 && Math.abs(p.y - DOOR_CY) < DOOR_GAP / 2) {
      st.room.secretRevealed = true;
      st.room.exits.east = 'richard';
      st.room.bg = null;
      toast(st, 'A rachadura se abriu revelando uma passagem!', 3);
      Sound.sfx('gate');
      st.shake = 4;
      spawnParticles(st, INNER.r - 8, DOOR_CY, '#c9c0a0', 14, { speed: 40, life: 0.9 });
      return;
    }
  }

  // Interagir no santuário de Richard
  if (st.room.id === 'richard') {
    if (dist(p.x, p.y, 332, 232) < 48) {
      toast(st, 'AQUI JAZ RICHARD', 3.6);
      Sound.sfx('gate');
      spawnParticles(st, 332, 210, '#e6c26a', 12, { speed: 25, life: 0.8 });
      return;
    }
    if (dist(p.x, p.y, 200, 118) < 80) {
      toast(st, 'EM MEMÓRIA DE RICHARD', 3);
      Sound.sfx('toast');
      return;
    }
  }

  // Passagens escondidas até serem descobertas: investigar a parede abre
  // a sala secreta correspondente (Lito, Marx, Senna e as novas homenagens).
  for (const parentId in SECRET_PASSAGES) {
    if (st.room.id !== parentId || st.room.secretRevealed) continue;
    const pass = SECRET_PASSAGES[parentId];

    // Verifica a lateral correta da parede secreta.
    let near = false;
    if (pass.side === 'east') {
      near = p.x > INNER.r - 18 && Math.abs(p.y - DOOR_CY) < DOOR_GAP / 2;
    } else if (pass.side === 'west') {
      near = p.x < INNER.x + 18 && Math.abs(p.y - DOOR_CY) < DOOR_GAP / 2;
    } else if (pass.side === 'north') {
      near = p.y < INNER.y + 18 && Math.abs(p.x - DOOR_CX) < DOOR_GAP / 2;
    } else {
      near = p.y > INNER.b - 18 && Math.abs(p.x - DOOR_CX) < DOOR_GAP / 2;
    }
    if (!near) continue;

    st.room.secretRevealed = true;
    st.room.exits[pass.side] = pass.target;
    st.room.bg = null;
    Sound.sfx('gate');
    st.shake = 4;

    // Cor e mensagem originais por sala de destino.
    const revealFx = {
      templo_lito: { color: '#e8e2cc', accent: '#ffe9a3', msg: 'Uma passagem de mármore se abriu para o Templo de Lito!' },
      sala_marx: { color: '#c9a24a', accent: '#e6c26a', msg: 'Uma estante se deslocou, revelando a Biblioteca de Marx!' },
      podio_senna: { color: '#d8503f', accent: '#e6bb4f', msg: 'A parede cedeu, abrindo caminho ao Pódio de Senna!' },
      arquivo_trotski: { color: '#c94a3f', accent: '#e6c26a', msg: 'Uma estante se abriu para o Arquivo de Trótski!' },
      fonte_sombria: { color: '#9a6ad8', accent: '#7fe6e6', msg: 'A escuridão se abre para a Fonte Sombria!' },
      mina_esquecida: { color: '#7fb0b8', accent: '#7fe6e6', msg: 'A rocha cedeu, revelando a Mina Esquecida!' },
      obby_roblox: { color: '#5adf6a', accent: '#5a86c9', msg: 'Um bloco se deslocou: bem-vindo ao Obby Perdido!' },
      estudio_rbiana: { color: '#e86aa0', accent: '#7fe6e6', msg: 'A parede da Cabana esconde o Estúdio da Rbiana!' },
    };
    const fx = revealFx[pass.target] || { color: '#c9c0a0', accent: '#e6c26a', msg: 'Uma passagem secreta se abriu!' };

    // Ponto de impacto das partículas conforme a lateral.
    let fxX = DOOR_CX;
    let fxY = INNER.b - 8;
    if (pass.side === 'east') {
      fxX = INNER.r - 8;
      fxY = DOOR_CY;
    } else if (pass.side === 'west') {
      fxX = INNER.x + 8;
      fxY = DOOR_CY;
    } else if (pass.side === 'north') {
      fxX = DOOR_CX;
      fxY = INNER.y + 8;
    }

    spawnParticles(st, fxX, fxY, fx.color, 14, { speed: 40, life: 0.9 });
    spawnParticles(st, fxX, fxY, fx.accent, 6, { speed: 28, life: 0.7 });
    toast(st, fx.msg, 3.4);
    return;
  }

  // Homenagens interativas têm prioridade sobre o ataque com espada
  if (tryEasterEgg(st)) return;

  // Colocar o cálice no altar
  if (st.held && st.held.type === 'chalice') {
    if (st.room.id === ALTAR.room && dist(p.x, p.y, ALTAR.x, ALTAR.y) < 44) {
      st.held.taken = true;
      st.held.holder = null;
      st.held = null;
      winGame(st);
      return;
    }
    toast(st, 'Leve o cálice ao altar do castelo.', 1.8);
    return;
  }

  if (st.held && isWeapon(st.held.type)) {
    tryAttack(st, 'light');
    return;
  }

  if (st.held) dropItem(st);
}

/* Inicia um golpe de arma. kind: 'light' | 'heavy' */
function tryAttack(st, kind) {
  if (!st || st.transition) return;
  const weapon = st.held ? WEAPON_DEFS[st.held.type] : null;
  if (!weapon) return;
  const p = st.player;
  if (p.guarding || p.rollT > 0) return; // não ataca defendendo ou rolando
  const def = weapon[kind] || weapon.light;
  if (p.swing > 0) return; // não cancela um golpe em andamento

  const cd = kind === 'heavy' ? p.heavyCd : p.swingCd;
  if (cd > 0) return;

  p.swing = def.dur;
  p.swingDur = def.dur;
  p.swingKind = kind;
  p.swingReach = def.reach;
  p.swingWeapon = weapon;
  p.swingDef = def;
  p.swingColor = weapon.color || '#fff6d0';
  st.swingId = (st.swingId || 0) + 1;

  if (kind === 'heavy') {
    p.heavyCd = def.cd;
    p.heavyCdMax = def.cd;
    Sound.sfx('heavy');
  } else {
    p.swingCd = def.cd;
    p.swingCdMax = def.cd;
    Sound.sfx('swing');
  }

  // partículas de corte à frente
  const ang = { right: 0, left: Math.PI, down: Math.PI / 2, up: -Math.PI / 2 }[p.facing] || 0;
  const reach = def.reach * (kind === 'heavy' ? 0.8 : 0.62);
  spawnParticles(
    st,
    p.x + Math.cos(ang) * reach,
    p.y - 20 + Math.sin(ang) * reach,
    p.swingColor,
    kind === 'heavy' ? 6 : 3,
    { speed: kind === 'heavy' ? 65 : 40, life: kind === 'heavy' ? 0.4 : 0.25 }
  );
}

/* Ângulo do ataque conforme a direção do jogador */
function attackAngle(p) {
  return { right: 0, left: Math.PI, down: Math.PI / 2, up: -Math.PI / 2 }[p.facing] || 0;
}

/* Verifica se o dragão está dentro do alcance/arco do golpe atual */
function playerCanHitDragon(st, e, def) {
  const p = st.player;
  const cx = p.x;
  const cy = p.y - 18;
  const dx = e.x - cx;
  const dy = e.y - cy;
  const d = Math.hypot(dx, dy) || 1;
  if (d > def.reach + 16) return false; // 16 ≈ raio do corpo do dragão
  const ang = attackAngle(p);
  const dot = (dx * Math.cos(ang) + dy * Math.sin(ang)) / d;
  return dot >= def.arcDot;
}

function dropItem(st) {
  if (!st.held || st.transition) return;
  const p = st.player;
  const dir = DIRS[p.facing] || DIRS.down;
  const it = st.held;
  const nx = clamp(p.x + dir.x * 24, INNER.x + 14, INNER.r - 14);
  const ny = clamp(p.y - 6 + dir.y * 24, INNER.y + 14, INNER.b - 14);

  it.taken = false;
  it.holder = null;
  it.room = st.room.id;
  it.x = nx;
  it.y = ny;
  st.room.items.push(it);
  st.held = null;
  st.pickupCd = 0.7;
  Sound.sfx('drop');
  spawnParticles(st, nx, ny, '#c9a24a', 4, { speed: 20, life: 0.3 });
  updateObjective(st);
}

function pickupItem(st, it) {
  const p = st.player;
  removeItemFromRoom(st, it);

  if (it.type === 'heart') {
    it.taken = true;
    it.holder = null;
    if (st.hearts < st.maxHearts) {
      st.hearts = Math.min(st.maxHearts, st.hearts + 1);
      toast(st, 'Coração restaurado!', 1.8);
    } else {
      toast(st, 'Você está com a saúde cheia.', 1.8);
    }
    Sound.sfx('heart');
    spawnParticles(st, it.x, it.y, '#e05a4a', 10, { speed: 55, life: 0.6 });
    return;
  }

  if (it.type === 'lantern') {
    it.taken = true;
    it.holder = null;
    st.hasLantern = true;
    toast(st, 'Lanterna acesa! A escuridão não é mais um problema.', 3.4);
    Sound.sfx('light');
    spawnParticles(st, it.x, it.y, '#ffe9a3', 16, { speed: 60, life: 0.9 });
    st.shake = 2;
    updateObjective(st);
    return;
  }

  if (st.held) return;

  it.taken = true;
  it.holder = 'player';
  st.held = it;
  st.pickupCd = 0.4;

  if (it.type === 'key') st.keyTaken = true;
  if (it.type === 'sword') st.swordTaken = true;
  if (it.type === 'chalice') st.chaliceTaken = true;

  Sound.sfx('pickup');
  spawnParticles(st, it.x, it.y, '#ffe9a3', 8, { speed: 45, life: 0.5 });
  toast(st, it.label + ' obtida!', 2);
  updateObjective(st);
}

/* ------------------------------------------------------------------ */
/* Transições de sala                                                 */
/* ------------------------------------------------------------------ */

function gateSide(st, side) {
  return (
    (st.room.id === 'portao' && side === 'south') ||
    (st.room.id === 'salao' && side === 'north')
  );
}

function canPassGate(st, side) {
  if (!st.room.gate || !gateSide(st, side)) return true;
  if (st.gateUnlocked) return true;

  if (st.held && st.held.type === 'key') {
    // usa a chave
    st.held.taken = true;
    st.held.holder = null;
    st.held = null;
    st.gateUnlocked = true;
    Sound.sfx('unlock');
    setTimeout(() => Sound.sfx('gate'), 260);
    toast(st, 'O portão do castelo se abriu!', 3);
    spawnParticles(st, DOOR_CX, INNER.b - 20, '#ffe9a3', 24, { speed: 70, life: 1 });
    st.shake = 4;
    updateObjective(st);
    return true;
  }

  if (st.gateMsgCd <= 0) {
    toast(st, 'O portão está trancado. Precisa da chave dourada.', 2.6);
    st.gateMsgCd = 2.5;
    Sound.sfx('gate');
  }
  return false;
}

function startTransition(st, side) {
  if (st.transition) return;
  const target = st.room.exits[side];
  if (!target) return;
  if (!canPassGate(st, side)) return;
  st.transition = { side, target, t: 0, switched: false };
  Sound.sfx('click');
}

function applyTransition(st) {
  const tr = st.transition;
  const target = world.rooms[tr.target];
  st.room = target;
  target.visited = true;

  // projéteis pertencem à sala de origem
  st.projectiles.length = 0;

  const p = st.player;
  p.swing = 0;
  if (tr.side === 'north') {
    p.x = DOOR_CX;
    p.y = INNER.b - 14;
    p.facing = 'up';
  } else if (tr.side === 'south') {
    p.x = DOOR_CX;
    p.y = INNER.y + 14;
    p.facing = 'down';
  } else if (tr.side === 'west') {
    p.x = INNER.r - 14;
    p.y = DOOR_CY;
    p.facing = 'left';
  } else {
    p.x = INNER.x + 14;
    p.y = DOOR_CY;
    p.facing = 'right';
  }
  p.vx = 0;
  p.vy = 0;

  // troca de sala interrompe a guarda, mas não a marca como quebrada:
  // se Shift/DEF continuar pressionado, ela volta na sala nova.
  p.guarding = false;
  p.guardT = 0;
  p.rollT = 0;
  p.rollInvuln = 0;

  showRoomToast(st);
  if (target.dark && !st.hasLantern) {
    setTimeout(() => {
      if (gameState.room === target && !gameState.hasLantern && gameState.mode === 'play')
        toast(gameState, 'Está escuro demais... encontre uma luz.', 2.6);
    }, 300);
  }
}

/* ------------------------------------------------------------------ */
/* Movimento e colisões                                               */
/* ------------------------------------------------------------------ */

function insideDoorGapNS(p) {
  return Math.abs(p.x - DOOR_CX) < DOOR_GAP / 2 - 4;
}

function insideDoorGapEW(p) {
  return Math.abs(p.y - DOOR_CY) < DOOR_GAP / 2 - 4;
}

function movePlayer(st, dt) {
  const p = st.player;
  const room = st.room;

  let ix = input.moveX;
  let iy = input.moveY;
  const inputLen = Math.hypot(ix, iy);
  if (inputLen > 1) {
    ix /= inputLen;
    iy /= inputLen;
  }

  const boostMul = st.speedBoostT > 0 ? EASTER_EGGS.senna.boostMul : 1;
  const speed = 82 * (p.guarding ? GUARD.speedMul : 1) * boostMul;
  p.vx = ix * speed;
  p.vy = iy * speed;
  p.moving = !!(ix || iy);

  if (p.moving) {
    p.walkT += dt;
    if (p.facing === 'up' || p.facing === 'down') {
      if (ix) p.facing = ix > 0 ? 'right' : 'left';
      else if (iy) p.facing = iy > 0 ? 'down' : 'up';
    } else {
      if (iy && !ix) p.facing = iy > 0 ? 'down' : 'up';
      else if (ix) p.facing = ix > 0 ? 'right' : 'left';
    }
    if (Math.sin(p.walkT * 9) > 0.92) {
      Sound.footstep();
      spawnParticles(st, p.x + (Math.random() - 0.5) * 8, p.y - 1, '#a89a7c', 2, {
        speed: 12,
        life: 0.35,
      });
    }
    // rastro visual do impulso de Ayrton Senna
    if (st.speedBoostT > 0) {
      p.boostTrailT = (p.boostTrailT || 0) - dt;
      if (p.boostTrailT <= 0) {
        p.boostTrailT = 0.07;
        const len = Math.hypot(p.vx, p.vy) || 1;
        spawnParticles(
          st,
          p.x - (p.vx / len) * 8,
          p.y - 10 - (p.vy / len) * 4,
          Math.random() > 0.45 ? '#e6bb4f' : '#5adf6a',
          1,
          { speed: 8, life: 0.28 }
        );
      }
    }
  }

  // Eixo X
  p.x += p.vx * dt;
  if (p.x - 7 < INNER.x) {
    if (room.exits.west && insideDoorGapEW(p)) {
      startTransition(st, 'west');
      return;
    }
    p.x = INNER.x + 7;
  }
  if (p.x + 7 > INNER.r) {
    if (room.exits.east && insideDoorGapEW(p)) {
      startTransition(st, 'east');
      return;
    }
    p.x = INNER.r - 7;
  }
  resolveSolidsAxis(st, 'x');

  // Eixo Y
  p.y += p.vy * dt;
  if (p.y - 13 < INNER.y) {
    if (room.exits.north && insideDoorGapNS(p)) {
      startTransition(st, 'north');
      return;
    }
    p.y = INNER.y + 13;
  }
  if (p.y > INNER.b) {
    if (room.exits.south && insideDoorGapNS(p)) {
      startTransition(st, 'south');
      return;
    }
    p.y = INNER.b;
  }
  resolveSolidsAxis(st, 'y');

  // segurança
  p.x = clamp(p.x, INNER.x + 7, INNER.r - 7);
  p.y = clamp(p.y, INNER.y + 13, INNER.b);
}

function resolveSolidsAxis(st, axis) {
  const p = st.player;
  const box = playerBox(p);
  for (const s of st.room.solids) {
    if (!rectsOverlap(box, s)) continue;
    if (axis === 'x') {
      if (p.vx > 0) p.x = s.x - 7;
      else if (p.vx < 0) p.x = s.x + s.w + 7;
    } else {
      if (p.vy > 0) p.y = s.y;
      else if (p.vy < 0) p.y = s.y + s.h + 13;
    }
    box.x = p.x - 7;
    box.y = p.y - 13;
  }
}

/* ------------------------------------------------------------------ */
/* Inimigos                                                           */
/* ------------------------------------------------------------------ */

function updateEnemies(st, dt) {
  const p = st.player;
  const diff = DIFFICULTY[st.difficulty];

  for (const e of st.enemies) {
    if (!e.alive || e.room !== st.room.id) continue;

    e.hitT = Math.max(0, (e.hitT || 0) - dt);
    e.atkCd = Math.max(0, (e.atkCd || 0) - dt);
    e.stunT = Math.max(0, (e.stunT || 0) - dt);

    const stunned = e.stunT > 0;

    if (!stunned) {
      // máquina de estados do ataque: telegraph -> execução
      if (e.windup > 0) {
        e.windup -= dt;
        if (e.windup <= 0) executeDragonAttack(st, e, diff);
      } else if (e.attack) {
        updateDragonAttack(st, e, diff, dt);
      }

      const pd = dist(e.x, e.y, p.x, p.y);
      const busy = e.windup > 0 || e.attack;

      if (!busy) {
        if (e.atkCd <= 0 && pd < 200) {
          startDragonWindup(st, e, diff, pd);
        } else {
          const chaseRange = 105 * diff.dragonSpeed;
          if (pd < chaseRange) {
            const dx = p.x - e.x;
            const dy = p.y - e.y;
            const len = Math.hypot(dx, dy) || 1;
            e.x += (dx / len) * (e.speed + 12) * dt;
            e.y += (dy / len) * (e.speed + 12) * dt;
            if (Math.abs(dx) > 2) e.dir = dx > 0 ? 1 : -1;
          } else if (e.axis === 'x') {
            e.x += e.dir * e.speed * dt;
            if (e.x < e.from) {
              e.x = e.from;
              e.dir = 1;
            }
            if (e.x > e.to) {
              e.x = e.to;
              e.dir = -1;
            }
          } else {
            e.y += e.dir * e.speed * dt;
            if (e.y < e.from) {
              e.y = e.from;
              e.dir = 1;
            }
            if (e.y > e.to) {
              e.y = e.to;
              e.dir = -1;
            }
          }
        }
      }

      e.x = clamp(e.x, INNER.x + 42, INNER.r - 42);
      e.y = clamp(e.y, INNER.y + 40, INNER.b - 20);
    }

    // ataque do jogador (um acerto por golpe em cada dragão)
    if (p.swing > 0 && e.alive && e.lastHitSwing !== st.swingId) {
      const kind = p.swingKind || 'light';
      const weapon = p.swingWeapon || WEAPON_DEFS.sword;
      const def = p.swingDef || weapon[kind] || weapon.light;
      if (playerCanHitDragon(st, e, def)) {
        e.lastHitSwing = st.swingId;
        // Fúria (Ultrakill): +1 de dano enquanto o impulso estiver ativo.
        const fury = st.powerBoostT > 0 ? 1 : 0;
        hitDragon(st, e, def.dmg + fury, p.x, p.y - 18, {
          knock: def.knock,
          shake: def.shake,
          color: weapon.color,
        });
        applyWeaponHitEffect(st, e, weapon, kind);
      }
    }
    if (!e.alive) continue;

    // contato corpo a corpo
    if (!stunned && dist(e.x, e.y, p.x, p.y) < 22 && p.invuln <= 0 && p.rollInvuln <= 0) {
      hurtPlayer(st, e.x, e.y, e);
    }
  }
}

/* Cooldown entre ataques: 3,5–6s, encurtando com a dificuldade */
function dragonAtkCooldown(diff, boss) {
  const base = boss ? 3.4 : 3.5;
  const spread = boss ? 2.0 : 2.5;
  const cd = (base + Math.random() * spread) * diff.dragonCd;
  return Math.max(2.2, cd);
}

function startDragonWindup(st, e, diff, pd) {
  const p = st.player;
  let pattern;

  if (e.boss) {
    // chefe alterna rajada -> sopro -> investida
    e.patternIdx = ((e.patternIdx || 0) + 1) % 3;
    pattern = ['volley', 'cone', 'charge'][e.patternIdx];
    if (pattern === 'cone' && pd > 110) pattern = 'volley';
  } else if (pd < 52) {
    pattern = Math.random() < 0.55 ? 'bite' : 'charge';
  } else if (diff.projectile && pd > 90 && Math.random() < 0.3) {
    pattern = 'volley';
  } else {
    pattern = 'charge';
  }

  e.nextAttack = pattern;
  e.attack = null;
  e.atkT = 0;

  // direção travada no início do telegraph (o jogador pode desviar)
  const dx = p.x - e.x;
  const dy = p.y - 12 - e.y;
  const len = Math.hypot(dx, dy) || 1;
  e.atkDirX = dx / len;
  e.atkDirY = dy / len;
  if (Math.abs(dx) > 2) e.dir = dx > 0 ? 1 : -1;

  const base = { charge: 0.45, bite: 0.28, cone: 0.6, volley: 0.38 }[pattern] || 0.4;
  e.windup = base * diff.telegraph;

  if (pattern === 'charge') Sound.sfx('roar');
  else if (pattern === 'cone') Sound.sfx('breath');
  else Sound.sfx('tell');
}

function executeDragonAttack(st, e, diff) {
  const pattern = e.nextAttack;
  e.nextAttack = null;
  e.windup = 0;
  if (!pattern) return;

  const p = st.player;
  const nx = e.atkDirX || (e.dir > 0 ? 1 : -1);
  const ny = e.atkDirY || 0;

  if (pattern === 'charge') {
    e.attack = 'charge';
    e.atkT = e.boss ? 0.42 : 0.35;
    const speed = (e.boss ? 235 : 190) * diff.dragonSpeed;
    e.chargeVx = nx * speed;
    e.chargeVy = ny * speed;
    Sound.sfx('roar');
    return;
  }

  if (pattern === 'bite') {
    const dx = p.x - e.x;
    const dy = p.y - 12 - e.y;
    const len = Math.hypot(dx, dy) || 1;
    const dot = (dx * nx + dy * ny) / len;
    if (len < 42 && dot > 0.3 && p.invuln <= 0 && p.rollInvuln <= 0) hurtPlayer(st, e.x, e.y, e);
    spawnParticles(st, e.x + nx * 18, e.y - 18 + ny * 18, '#ff8a2a', 8, { speed: 55, life: 0.45 });
    Sound.sfx('bite');
    e.atkCd = dragonAtkCooldown(diff, e.boss);
    return;
  }

  if (pattern === 'cone') {
    e.attack = 'cone';
    e.atkT = 0.35;
    const ang = Math.atan2(ny, nx);
    const dx = p.x - e.x;
    const dy = p.y - 14 - e.y;
    const pd = Math.hypot(dx, dy);
    if (pd < 74 && angleDiff(Math.atan2(dy, dx), ang) < 0.6 && p.invuln <= 0 && p.rollInvuln <= 0) {
      hurtPlayer(st, e.x, e.y, e);
    }
    st.shake = Math.max(st.shake, 3);
    for (let i = 0; i < 12; i++) {
      const a = ang + (Math.random() - 0.5) * 1.1;
      spawnParticles(st, e.x + nx * 14, e.y - 16 + ny * 14, i % 2 ? '#ff8a2a' : '#ffd24a', 1, {
        speed: 70 + Math.random() * 40,
        life: 0.4,
      });
    }
    Sound.sfx('breath');
    e.atkCd = dragonAtkCooldown(diff, e.boss);
    return;
  }

  if (pattern === 'volley') {
    e.attack = 'volley';
    e.atkT = 0.28;
    const baseAng = Math.atan2(ny, nx);
    const count = e.boss ? 3 : diff.projectile ? 2 : 1;
    const spread = e.boss ? 0.28 : 0.18;
    const speed = (e.boss ? 95 : 88) * Math.min(1.35, diff.dragonSpeed);
    for (let i = 0; i < count; i++) {
      const a = baseAng + (i - (count - 1) / 2) * spread;
      st.projectiles.push({
        x: e.x + Math.cos(a) * 16,
        y: e.y - 8,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        life: 3,
        r: 6,
        kind: 'fire',
        owner: 'dragon',
        source: e,
        dmg: 1,
      });
    }
    Sound.sfx('fire');
    e.atkCd = dragonAtkCooldown(diff, e.boss);
  }
}

function updateDragonAttack(st, e, diff, dt) {
  const p = st.player;
  if (e.attack === 'charge') {
    e.atkT -= dt;
    e.x += e.chargeVx * dt;
    e.y += e.chargeVy * dt;

    // bateu na parede: encerra a investida
    if (
      e.x <= INNER.x + 42 || e.x >= INNER.r - 42 ||
      e.y <= INNER.y + 40 || e.y >= INNER.b - 20
    ) {
      e.atkT = 0;
      st.shake = Math.max(st.shake, 4);
      spawnParticles(st, e.x, e.y, '#a89a7c', 10, { speed: 60, life: 0.5 });
    }

    if (dist(e.x, e.y, p.x, p.y) < 26 && p.invuln <= 0 && p.rollInvuln <= 0) hurtPlayer(st, e.x, e.y, e);

    if (e.atkT <= 0) {
      e.attack = null;
      e.atkT = 0;
      e.chargeVx = 0;
      e.chargeVy = 0;
      e.atkCd = dragonAtkCooldown(diff, e.boss);
    }
    return;
  }

  e.atkT -= dt;
  if (e.atkT <= 0) {
    e.attack = null;
    e.atkT = 0;
  }
}

/* Diferença angular normalizada (0..PI) */
function angleDiff(a, b) {
  let d = Math.abs(a - b) % (Math.PI * 2);
  if (d > Math.PI) d = Math.PI * 2 - d;
  return d;
}

/* Efeitos especiais das armas secretas ao acertar um dragão. */
function applyWeaponHitEffect(st, e, weapon, kind) {
  const p = st.player;
  const amount = weapon.effectAmount || 1;

  if (weapon.effect === 'heal') {
    const healed = Math.min(st.maxHearts, st.hearts + amount);
    if (healed > st.hearts + 0.001) {
      st.hearts = healed;
      spawnParticles(st, p.x, p.y - 18, weapon.color, 5, { speed: 22, life: 0.45 });
    }
  } else if (weapon.effect === 'speed') {
    st.speedBoostT = Math.max(st.speedBoostT || 0, amount);
  } else if (weapon.effect === 'shield') {
    if (kind === 'heavy' && st.shield <= 0) {
      st.shield = 1;
      spawnParticles(st, p.x, p.y - 20, '#9fd0ff', 10, { speed: 36, life: 0.6 });
    }
  } else if (weapon.effect === 'invuln') {
    p.invuln = Math.max(p.invuln || 0, amount);
  } else if (weapon.effect === 'stun') {
    e.stunT = Math.max(e.stunT || 0, amount);
    spawnParticles(st, e.x, e.y - 24, weapon.color, 6, { speed: 26, life: 0.5 });
  }
}

/* Aplica dano ao dragão, com knockback, flash e cancelamento de ataque */
function hitDragon(st, e, dmg, fromX, fromY, opts = {}) {
  if (!e.alive) return;

  e.hp -= dmg;
  e.hitT = 0.18;
  // levar dano cancela telegraph/ataque em andamento e impõe um respiro mínimo
  e.windup = 0;
  e.nextAttack = null;
  e.attack = null;
  e.atkT = 0;
  e.atkCd = Math.max(e.atkCd || 0, 0.3);

  const dx = e.x - fromX;
  const dy = e.y - fromY;
  const len = Math.hypot(dx, dy) || 1;
  const knock = (opts.knock || 8) * (e.boss ? 0.35 : 1);
  e.x = clamp(e.x + (dx / len) * knock, INNER.x + 42, INNER.r - 42);
  e.y = clamp(e.y + (dy / len) * knock, INNER.y + 40, INNER.b - 20);

  st.shake = Math.max(st.shake, opts.shake || 3);
  Sound.sfx('hitDragon');
  spawnParticles(st, e.x, e.y - 8, opts.color || '#ffd24a', 5, { speed: 55, life: 0.35 });
  spawnParticles(st, e.x, e.y - 8, '#e05a4a', 4, { speed: 40, life: 0.3 });

  if (e.hp <= 0) killDragon(st, e);
}

function killDragon(st, e) {
  e.alive = false;
  st.kills++;
  if (e.boss) {
    st.bossKills = (st.bossKills || 0) + 1;
    st.shake = 8;
    toast(st, st.bossKills >= BOSS_COUNT ? 'Todos os dragões seniores caíram!' : 'O dragão senhor caiu!', 3.4);
  } else {
    st.shake = 5;
    toast(st, 'Dragão derrotado!', 2.2);
  }
  Sound.sfx('dragon');
  spawnParticles(st, e.x, e.y, '#ff8a2a', 26, { speed: 90, life: 0.9, gravity: 30 });
  spawnParticles(st, e.x, e.y, '#e6bb4f', 14, { speed: 60, life: 0.7 });
  updateObjective(st);
}

function hurtPlayer(st, fromX, fromY, source) {
  const p = st.player;

  // Rolamento tem i-frames próprios, sem o piscar do invuln de dano.
  if (p.rollInvuln > 0) return { result: 'roll', damage: 0 };
  if (p.invuln > 0) return { result: 'invuln', damage: 0 };

  const front = guardCoversSource(p, fromX, fromY);

  // PARRY: guarda recém-iniciada e golpe vindo da frente
  if (p.guarding && front && p.guardT <= GUARD.parryWindow) {
    stunDragon(st, source, fromX, fromY);
    p.parryFlash = 0.35;
    p.guardFlash = 0.35;
    if (p.parryToastCd <= 0) {
      toast(st, 'Parry!', 1.2);
      p.parryToastCd = 1.5;
    }
    Sound.sfx('parry');
    st.shake = Math.max(st.shake, 4);

    const dir = DIRS[p.facing] || DIRS.down;
    spawnParticles(st, p.x + dir.x * 13, p.y - 18 + dir.y * 13, '#fff6d0', 10, {
      speed: 85,
      life: 0.45,
    });
    spawnParticles(st, p.x + dir.x * 10, p.y - 18 + dir.y * 10, '#e6bb4f', 8, {
      speed: 55,
      life: 0.35,
    });
    return { result: 'parry', damage: 0 };
  }

  // ESCUDO (Deltarune): absorve um golpe inteiro. O parry acima tem
  // prioridade; aqui o escudo é consumido antes do cálculo de guarda/dano.
  if (st.shield > 0) {
    st.shield = 0;
    p.invuln = 0.9;
    clearGuard(p);
    p.guardFlash = 0.3;
    Sound.sfx('parry');
    st.shake = Math.max(st.shake, 3);
    toast(st, 'O coração sombrio te protegeu!', 2.6);
    spawnParticles(st, p.x, p.y - 18, '#9a6ad8', 14, { speed: 62, life: 0.7 });
    spawnParticles(st, p.x, p.y - 18, '#7fe6e6', 9, { speed: 46, life: 0.6 });
    return { result: 'shield', damage: 0 };
  }

  // Guarda normal: só segura golpes frontais
  const guarded = p.guarding && front;
  let dmg = 1;
  let knock = 20;

  if (guarded) {
    dmg *= GUARD.damageMul;
    knock *= GUARD.knockMul;
    p.guardFlash = 0.25;
    Sound.sfx('guard');
    spawnParticles(st, p.x, p.y - 18, '#c9d2df', 8, { speed: 38, life: 0.35 });
    spawnParticles(st, p.x, p.y - 18, '#e6bb4f', 4, { speed: 26, life: 0.3 });
  } else {
    Sound.sfx('hurt');
    spawnParticles(st, p.x, p.y - 16, '#e05a4a', 14, { speed: 70, life: 0.7 });
  }

  // Qualquer dano (mesmo bloqueado) derruba a guarda.
  clearGuard(p);

  st.hearts = Math.max(0, st.hearts - dmg);
  p.invuln = 1.6;
  st.shake = Math.max(st.shake, guarded ? 4 : 7);

  const dx = p.x - fromX;
  const dy = p.y - fromY;
  const len = Math.hypot(dx, dy) || 1;
  p.x = clamp(p.x + (dx / len) * knock, INNER.x + 8, INNER.r - 8);
  p.y = clamp(p.y + (dy / len) * knock, INNER.y + 14, INNER.b);

  if (st.hearts <= 0) {
    p.rollT = 0;
    p.rollInvuln = 0;
    clearGuard(p);
    st.deaths++;
    st.mode = 'gameover';
    Sound.pauseMusic();
    Sound.sfx('lose');
    if (!st.bestTime || st.elapsed < st.bestTime) {
      // não salva em derrota
    }
  }

  return { result: guarded ? 'block' : 'hurt', damage: dmg };
}

function updateProjectiles(st, dt) {
  const p = st.player;
  for (let i = st.projectiles.length - 1; i >= 0; i--) {
    const pr = st.projectiles[i];
    pr.x += pr.vx * dt;
    pr.y += pr.vy * dt;
    pr.life -= dt;
    if (pr.life <= 0 || pr.x < INNER.x || pr.x > INNER.r || pr.y < INNER.y || pr.y > INNER.b) {
      st.projectiles.splice(i, 1);
      continue;
    }
    if (Math.random() < 0.5) {
      st.particles.push({
        x: pr.x,
        y: pr.y,
        vx: -pr.vx * 0.1 + (Math.random() - 0.5) * 20,
        vy: -pr.vy * 0.1 + (Math.random() - 0.5) * 20,
        life: 0.3,
        maxLife: 0.3,
        color: Math.random() < 0.5 ? '#ff8a2a' : '#ffd24a',
        size: 2,
      });
    }
    if (
      dist(pr.x, pr.y, p.x, p.y - 14) < (pr.r || 6) + 6 &&
      p.invuln <= 0 &&
      p.rollInvuln <= 0
    ) {
      st.projectiles.splice(i, 1);
      hurtPlayer(st, pr.x, pr.y, pr.source || null);
    }
  }
}

function updateBat(st, dt) {
  const b = st.bat;
  b.cd = Math.max(0, b.cd - dt);
  b.stun = Math.max(0, b.stun - dt);

  const diff = DIFFICULTY[st.difficulty];
  const batRooms = ['labirinto', 'labirinto_profundo', 'cripta'];
  b.active = batRooms.includes(st.room.id);

  if (b.stun > 0) {
    b.active = false;
    return;
  }
  if (!b.active) return;
  if (b.room !== st.room.id) {
    b.room = st.room.id;
    b.x = INNER.x + 40 + Math.random() * 60;
    b.y = INNER.y + 40 + Math.random() * 40;
  }

  const p = st.player;
  const d = dist(b.x, b.y, p.x, p.y);
  if (d < 160 && b.cd <= 0) {
    const dx = p.x - b.x;
    const dy = p.y - 22 - b.y;
    const len = Math.hypot(dx, dy) || 1;
    b.x += (dx / len) * 38 * dt;
    b.y += (dy / len) * 38 * dt;
  } else {
    b.x += Math.cos(st.elapsed * 1.5 + b.phase) * 18 * dt;
    b.y += Math.sin(st.elapsed * 2.1 + b.phase) * 12 * dt;
  }
  b.x = clamp(b.x, INNER.x + 16, INNER.r - 16);
  b.y = clamp(b.y, INNER.y + 20, INNER.b - 20);

  // ataque da espada no morcego
  if (p.swing > 0 && dist(b.x, b.y, p.x, p.y - 18) < 30) {
    b.stun = 9;
    b.cd = 9;
    toast(st, 'O morcego fugiu para as sombras!', 2);
    Sound.sfx('bat');
    spawnParticles(st, b.x, b.y, '#9a7ab8', 10, { speed: 50, life: 0.5 });
    return;
  }

  if (d < 18 && st.held && b.cd <= 0 && Math.random() < diff.batSteal) {
    // rouba o item
    const it = st.held;
    const dest = ['labirinto', 'cripta', 'bosque_antigo', 'pantano', 'ruinas'][
      Math.floor(Math.random() * 5)
    ];
    const room = world.rooms[dest];
    removeItemFromRoom(st, it);
    it.room = dest;
    it.x = INNER.x + 50 + Math.random() * (INNER.r - INNER.x - 100);
    it.y = INNER.y + 50 + Math.random() * (INNER.b - INNER.y - 100);
    it.taken = false;
    it.holder = null;
    room.items.push(it);
    st.held = null;
    b.cd = 11;
    toast(st, 'O morcego roubou a ' + it.label + ' e fugiu para ' + room.name + '!', 3.6);
    Sound.sfx('bat');
    st.shake = 3;
    updateObjective(st);
  }
}

function removeItemFromRoom(st, it) {
  const room = world.rooms[it.room];
  if (!room) return;
  const idx = room.items.indexOf(it);
  if (idx >= 0) room.items.splice(idx, 1);
}

/* ------------------------------------------------------------------ */
/* Partículas                                                         */
/* ------------------------------------------------------------------ */

function spawnParticles(st, x, y, color, count, opts = {}) {
  const speed = opts.speed || 50;
  const life = opts.life || 0.5;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = speed * (0.3 + Math.random() * 0.7);
    st.particles.push({
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - (opts.gravity ? 20 : 0),
      life,
      maxLife: life,
      color,
      size: 1 + Math.floor(Math.random() * 2),
      gravity: opts.gravity || 0,
    });
  }
}

function updateParticles(st, dt) {
  for (let i = st.particles.length - 1; i >= 0; i--) {
    const pt = st.particles[i];
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    pt.vy += (pt.gravity || 0) * dt;
    pt.vx *= 0.96;
    pt.vy *= 0.96;
    pt.life -= dt;
    if (pt.life <= 0) st.particles.splice(i, 1);
  }
}

/* ------------------------------------------------------------------ */
/* Atualização principal                                              */
/* ------------------------------------------------------------------ */

function update(st, dt) {
  const p = st.player;

  st.gateMsgCd = Math.max(0, st.gateMsgCd - dt);
  st.pickupCd = Math.max(0, st.pickupCd - dt);
  st.speedBoostT = Math.max(0, (st.speedBoostT || 0) - dt);
  st.powerBoostT = Math.max(0, (st.powerBoostT || 0) - dt);
  if (!st.easter) st.easter = freshEasterFlags();
  st.easter.litoCd = Math.max(0, st.easter.litoCd - dt);
  st.easter.sennaCd = Math.max(0, st.easter.sennaCd - dt);
  st.easter.verityCd = Math.max(0, st.easter.verityCd - dt);
  st.easter.rbianaCd = Math.max(0, st.easter.rbianaCd - dt);
  p.swing = Math.max(0, p.swing - dt);
  p.swingCd = Math.max(0, p.swingCd - dt);
  p.heavyCd = Math.max(0, (p.heavyCd || 0) - dt);
  p.invuln = Math.max(0, p.invuln - dt);
  p.rollCd = Math.max(0, (p.rollCd || 0) - dt);
  p.rollInvuln = Math.max(0, (p.rollInvuln || 0) - dt);
  updateGuard(st, dt);
  st.shake = Math.max(0, st.shake - dt * 14);

  if (st.toast.time > 0) {
    st.toast.time -= dt;
  }

  if (st.transition) {
    const tr = st.transition;
    tr.t += dt;
    if (!tr.switched && tr.t >= 0.13) {
      tr.switched = true;
      applyTransition(st);
    }
    if (tr.t >= 0.28) {
      st.transition = null;
    }
  } else {
    st.elapsed += dt;
    if (p.rollT > 0) updateRoll(st, dt);
    else movePlayer(st, dt);

    // itens
    if (!st.held && st.pickupCd <= 0) {
      for (const it of st.room.items) {
        if (it.taken) continue;
        if (dist(p.x, p.y - 6, it.x, it.y) < 18) {
          pickupItem(st, it);
          break;
        }
      }
    }
    updateEnemies(st, dt);
    updateBat(st, dt);
  }

  updateProjectiles(st, dt);
  updateParticles(st, dt);

  // tremor
  if (st.shake > 0.1) {
    st.shakeX = (Math.random() - 0.5) * st.shake * 2;
    st.shakeY = (Math.random() - 0.5) * st.shake * 2;
  } else {
    st.shakeX = 0;
    st.shakeY = 0;
  }
}

function winGame(st) {
  st.won = true;
  st.mode = 'win';
  st.player.rollT = 0;
  st.player.rollInvuln = 0;
  clearGuard(st.player);
  Sound.pauseMusic();
  Sound.sfx('win');
  if (!st.bestTime || st.elapsed < st.bestTime) {
    st.bestTime = st.elapsed;
    saveBest(st.elapsed);
  }
  st.shake = 6;
  spawnParticles(st, ALTAR.x, ALTAR.y - 20, '#ffe9a3', 40, { speed: 110, life: 1.4 });
  updateObjective(st);
}

/* ------------------------------------------------------------------ */
/* Escuridão e luz                                                    */
/* ------------------------------------------------------------------ */

const lightCv = document.createElement('canvas');
lightCv.width = VW;
lightCv.height = VH;
const lightCtx = lightCv.getContext('2d');

function drawDarkness(c, st, t) {
  const room = st.room;
  if (!room.dark) return;

  const lc = lightCtx;
  lc.clearRect(0, 0, VW, VH);
  lc.save();
  lc.beginPath();
  lc.rect(ROOM.x, ROOM.y, ROOM.w, ROOM.h);
  lc.clip();
  lc.fillStyle = 'rgba(3,5,10,0.96)';
  lc.fillRect(ROOM.x, ROOM.y, ROOM.w, ROOM.h);
  lc.globalCompositeOperation = 'destination-out';

  const lights = [];
  const p = st.player;
  lights.push({ x: p.x, y: p.y - 16, r: st.hasLantern ? 132 : 56, i: 1 });
  for (const torch of room.torches) {
    lights.push({ x: torch.x, y: torch.y, r: 54, i: 0.8 });
  }
  for (const it of room.items) {
    if (!it.taken) lights.push({ x: it.x, y: it.y, r: 26, i: 0.7 });
  }
  for (const d of room.decor) {
    if (d.type === 'crystal' || d.type === 'lava') {
      lights.push({ x: d.x, y: d.y - 4, r: 30, i: 0.5 });
    }
  }

  for (const l of lights) {
    const g = lc.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
    g.addColorStop(0, `rgba(0,0,0,${l.i})`);
    g.addColorStop(0.55, `rgba(0,0,0,${l.i * 0.9})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    lc.fillStyle = g;
    lc.beginPath();
    lc.arc(l.x, l.y, l.r, 0, Math.PI * 2);
    lc.fill();
  }

  lc.globalCompositeOperation = 'source-over';
  lc.restore();

  c.drawImage(lightCv, 0, 0);
}

/* ------------------------------------------------------------------ */
/* Render                                                             */
/* ------------------------------------------------------------------ */

function render(st, t) {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, VW, VH);

  if (st.mode === 'title') {
    drawTitle(ctx, st, t);
    return;
  }

  // Sala
  ctx.save();
  ctx.translate(Math.round(st.shakeX || 0), Math.round(st.shakeY || 0));

  const bg = getRoomBg(st.room);
  ctx.drawImage(bg, 0, 0);

  drawRoomFX(ctx, st.room, t);

  // pistas de passagem secreta só surgem de perto da parede certa
  drawSecretHints(ctx, st, t);

  // camada ordenada por profundidade: objetos altos, itens, inimigos e jogador
  const scene = [];
  for (const d of st.room.decor) {
    if (isTallDecor(d)) {
      scene.push({ y: d.y, draw: () => drawDecor(ctx, d, t, st.room) });
    }
  }
  if (st.room.id === ALTAR.room) {
    scene.push({ y: ALTAR.y + 10, draw: () => drawAltar(ctx, ALTAR.x, ALTAR.y, t) });
  }
  for (const it of st.room.items) {
    if (!it.taken) scene.push({ y: it.y, draw: () => drawWorldItem(ctx, it, t) });
  }
  for (const e of st.enemies) {
    if (e.alive && e.room === st.room.id) {
      scene.push({ y: e.y, draw: () => drawDragon(ctx, e, t) });
    }
  }
  if (st.bat.active) {
    scene.push({ y: st.bat.y + 6, draw: () => drawBat(ctx, st.bat, t) });
  }
  scene.push({ y: st.player.y, draw: () => drawPlayer(ctx, st, t) });
  scene.sort((a, b) => a.y - b.y);
  for (const o of scene) o.draw();

  // projéteis
  for (const pr of st.projectiles) {
    const pulse = 0.7 + Math.sin(t * 18) * 0.3;
    ctx.globalAlpha = 0.35 * pulse;
    pixelCircle(ctx, pr.x, pr.y, 10, '#ff6a2a');
    ctx.globalAlpha = 1;
    pixelCircle(ctx, pr.x, pr.y, 5, '#ff8a2a');
    pixelCircle(ctx, pr.x, pr.y, 3, '#ffd24a');
    pixelCircle(ctx, pr.x, pr.y, 1.5, '#fff6d0');
  }

  // partículas
  for (const pt of st.particles) {
    ctx.globalAlpha = clamp(pt.life / pt.maxLife, 0, 1);
    px(ctx, pt.x, pt.y, pt.size, pt.size, pt.color);
  }
  ctx.globalAlpha = 1;

  // escuridão
  drawDarkness(ctx, st, t);

  // telegraphs por cima da escuridão para permanecerem legíveis
  for (const e of st.enemies) {
    if (e.alive && e.room === st.room.id && (e.windup > 0 || e.attack)) {
      drawDragonTelegraph(ctx, e, t);
    }
  }

  ctx.restore();

  // HUD
  drawHUD(ctx, st, t);

  // transição
  if (st.transition) {
    const tr = st.transition;
    let a;
    if (tr.t < 0.13) a = tr.t / 0.13;
    else a = 1 - (tr.t - 0.13) / 0.15;
    drawFade(ctx, clamp(a, 0, 1));
  }

  if (st.mode === 'pause') drawPause(ctx, st, t);
  else if (st.mode === 'gameover') drawGameOver(ctx, st, t);
  else if (st.mode === 'win') drawWin(ctx, st, t);
}

/* ------------------------------------------------------------------ */
/* Loop                                                               */
/* ------------------------------------------------------------------ */

let lastTime = 0;
let initialized = false;

function loop(now) {
  if (!lastTime) lastTime = now;
  let dt = (now - lastTime) / 1000;
  lastTime = now;
  if (dt > 0.05) dt = 0.05;
  if (dt < 0) dt = 0;

  const t = now / 1000;

  if (!initialized) {
    gameState = createState();
    initialized = true;
  }

  readInput();

  if (gameState.mode === 'play') {
    update(gameState, dt);
  } else {
    // animações de fundo continuam em overlays
    if (gameState.toast.time > 0) gameState.toast.time = Math.max(0, gameState.toast.time - dt);
    if (gameState.mode === 'title') {
      gameState.shake = 0;
    }
  }

  // usado pelo áudio para retomar a trilha sintetizada só durante o jogo
  Sound.inGame = gameState.mode === 'play' || gameState.mode === 'pause';

  render(gameState, t);
  requestAnimationFrame(loop);
}

/* ------------------------------------------------------------------ */
/* Ajuste de escala                                                    */
/* ------------------------------------------------------------------ */

function resize() {
  const wrap = document.getElementById('stage');
  const availW = wrap.clientWidth;
  const availH = wrap.clientHeight;
  let scale = Math.min(availW / VW, availH / VH);
  // escala inteira quando couber, para pixels perfeitos
  if (scale >= 1.5) {
    const intScale = Math.floor(scale);
    if (intScale / scale > 0.85) scale = intScale;
  }
  canvas.style.width = Math.floor(VW * scale) + 'px';
  canvas.style.height = Math.floor(VH * scale) + 'px';
}

window.addEventListener('resize', resize);

/* Callbacks da playlist: toast de troca de faixa e avisos de erro */
Sound.onTrackChange = function (track) {
  if (!track || !gameState) return;
  const now = Date.now();
  if (now - lastTrackToastAt < 1600) return; // evita toast duplicado ao ativar
  lastTrackToastAt = now;
  toast(gameState, track.artist ? track.title + ' — ' + track.artist : track.title, 2.4);
};

Sound.onPlaylistError = function (message) {
  if (gameState && message) toast(gameState, message, 3.2);
};

Sound.onMusicModeChange = function (info) {
  if (gameState && info) toast(gameState, info.label || 'Trilha original', 2.6);
};

/* Início */
setupTouch();
resize();
requestAnimationFrame(loop);

// Pequena pausa para o navegador carregar a imagem do lobo
window.addEventListener('load', () => {
  resize();
});

/* Atalho para depuração */
window.LOBO = {
  get state() {
    return gameState;
  },
  get currentDifficulty() {
    return currentDifficulty;
  },
  set currentDifficulty(value) {
    if (DIFFICULTY[value]) currentDifficulty = value;
  },
  start: startGame,
  grant: (key) => grantSecretWeapon(gameState, key),
  commands: SECRET_COMMANDS,
  world,
};
