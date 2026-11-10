'use strict';

/* =========================================================================
   LOBO CINZA - O Cálice de Ouro
   Utilidades, constantes e geometria da tela
   ========================================================================= */

const VW = 400;
const VH = 300;

const HUD_H = 28;
const BOTTOM_Y = 286;

// Moldura do quarto (área visível do cenário)
const ROOM = { x: 10, y: 32, w: 380, h: 254 };

// Área jogável interna
const INNER = { x: 24, y: 46, r: 376, b: 272 };

// Portas
const DOOR_CX = 200;
const DOOR_CY = 159;
const DOOR_GAP = 46;

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const sign = (v) => (v < 0 ? -1 : v > 0 ? 1 : 0);

function dist2(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function dist(ax, ay, bx, by) {
  return Math.sqrt(dist2(ax, ay, bx, by));
}

function inRect(px, py, r) {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function circleRect(cx, cy, cr, r) {
  const nx = clamp(cx, r.x, r.x + r.w);
  const ny = clamp(cy, r.y, r.y + r.h);
  return dist2(cx, cy, nx, ny) < cr * cr;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rnd(rng, a, b) {
  return a + rng() * (b - a);
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

/* Paleta geral */
const C = {
  ink: '#0a0c10',
  black: '#050609',
  white: '#f4f1e6',
  bone: '#e8e2cc',
  gold: '#e6bb4f',
  goldDark: '#a97c25',
  goldLight: '#ffe9a3',
  green: '#5cbf62',
  greenDark: '#2c7a3a',
  red: '#d8503f',
  redDark: '#8c2a22',
  blue: '#5a86c9',
  gray: '#8a8f98',
  grayDark: '#4a4f59',
  shadow: 'rgba(0,0,0,0.45)',
};

/* Desenha um retângulo "pixelado" com cantos arredondados em blocos */
function px(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

/* Círculo pixelado (scanlines) */
function pixelCircle(ctx, cx, cy, r, color) {
  ctx.fillStyle = color;
  const R = Math.round(r);
  for (let dy = -R; dy <= R; dy++) {
    const w = Math.floor(Math.sqrt(Math.max(0, R * R - dy * dy)));
    if (w > 0) ctx.fillRect(Math.round(cx - w), Math.round(cy + dy), w * 2, 1);
  }
}

/* Elipse pixelada */
function pixelEllipse(ctx, cx, cy, rx, ry, color) {
  ctx.fillStyle = color;
  const RY = Math.round(ry);
  for (let dy = -RY; dy <= RY; dy++) {
    const k = 1 - (dy * dy) / (ry * ry || 1);
    if (k <= 0) continue;
    const w = Math.floor(rx * Math.sqrt(k));
    if (w > 0) ctx.fillRect(Math.round(cx - w), Math.round(cy + dy), w * 2, 1);
  }
}

/* Textura de dithering em uma área */
function dither(ctx, x, y, w, h, color, step = 4, offset = 0) {
  ctx.fillStyle = color;
  for (let yy = Math.floor(y); yy < y + h; yy += step) {
    for (let xx = Math.floor(x) + ((yy / step + offset) % 2 === 0 ? 0 : step / 2); xx < x + w; xx += step) {
      ctx.fillRect(xx, yy, 1, 1);
    }
  }
}

/* Um detalhe de "pedra/ruído" determinístico */
function speckle(ctx, x, y, w, h, color, count, rng, size = 1) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const px_ = x + Math.floor(rng() * w);
    const py_ = y + Math.floor(rng() * h);
    ctx.fillRect(px_, py_, size, size);
  }
}
