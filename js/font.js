'use strict';

/* =========================================================================
   Fonte bitmap 5x7 desenhada à mão + acentos em português
   ========================================================================= */

const FONT_DATA = {
  A: '01110/10001/10001/11111/10001/10001/10001',
  B: '11110/10001/10001/11110/10001/10001/11110',
  C: '01110/10001/10000/10000/10000/10001/01110',
  D: '11110/10001/10001/10001/10001/10001/11110',
  E: '11111/10000/10000/11110/10000/10000/11111',
  F: '11111/10000/10000/11110/10000/10000/10000',
  G: '01110/10001/10000/10111/10001/10001/01111',
  H: '10001/10001/10001/11111/10001/10001/10001',
  I: '01110/00100/00100/00100/00100/00100/01110',
  J: '00111/00010/00010/00010/00010/10010/01100',
  K: '10001/10010/10100/11000/10100/10010/10001',
  L: '10000/10000/10000/10000/10000/10000/11111',
  M: '10001/11011/10101/10101/10001/10001/10001',
  N: '10001/11001/10101/10011/10001/10001/10001',
  O: '01110/10001/10001/10001/10001/10001/01110',
  P: '11110/10001/10001/11110/10000/10000/10000',
  Q: '01110/10001/10001/10001/10101/10010/01101',
  R: '11110/10001/10001/11110/10100/10010/10001',
  S: '01111/10000/10000/01110/00001/00001/11110',
  T: '11111/00100/00100/00100/00100/00100/00100',
  U: '10001/10001/10001/10001/10001/10001/01110',
  V: '10001/10001/10001/10001/10001/01010/00100',
  W: '10001/10001/10001/10101/10101/10101/01010',
  X: '10001/10001/01010/00100/01010/10001/10001',
  Y: '10001/10001/01010/00100/00100/00100/00100',
  Z: '11111/00001/00010/00100/01000/10000/11111',
  0: '01110/10001/10011/10101/11001/10001/01110',
  1: '00100/01100/00100/00100/00100/00100/01110',
  2: '01110/10001/00001/00010/00100/01000/11111',
  3: '11111/00010/00100/00010/00001/10001/01110',
  4: '00010/00110/01010/10010/11111/00010/00010',
  5: '11111/10000/11110/00001/00001/10001/01110',
  6: '00110/01000/10000/11110/10001/10001/01110',
  7: '11111/00001/00010/00100/01000/01000/01000',
  8: '01110/10001/10001/01110/10001/10001/01110',
  9: '01110/10001/10001/01111/00001/00010/01100',
  ' ': '00000/00000/00000/00000/00000/00000/00000',
  '.': '00000/00000/00000/00000/00000/00110/00110',
  ',': '00000/00000/00000/00000/00110/00110/00100',
  ':': '00000/00110/00110/00000/00110/00110/00000',
  ';': '00000/00110/00110/00000/00110/00110/00100',
  '!': '00100/00100/00100/00100/00100/00000/00100',
  '?': '01110/10001/00001/00010/00100/00000/00100',
  '-': '00000/00000/00000/11111/00000/00000/00000',
  '+': '00000/00100/00100/11111/00100/00100/00000',
  '/': '00001/00010/00010/00100/01000/01000/10000',
  '(': '00010/00100/01000/01000/01000/00100/00010',
  ')': '01000/00100/00010/00010/00010/00100/01000',
  "'": '00100/00100/00000/00000/00000/00000/00000',
  '"': '01010/01010/00000/00000/00000/00000/00000',
  '%': '11001/11010/00010/00100/01000/01011/10011',
  '=': '00000/00000/11111/00000/11111/00000/00000',
  '*': '00000/01010/00100/11111/00100/01010/00000',
  '#': '01010/01010/11111/01010/11111/01010/01010',
  '&': '01100/10010/10100/01000/10101/10010/01101',
  _: '00000/00000/00000/00000/00000/00000/11111',
  '|': '00100/00100/00100/00100/00100/00100/00100',
  '>': '01000/00100/00010/00001/00010/00100/01000',
  '<': '00010/00100/01000/10000/01000/00100/00010',
  '[': '01110/01000/01000/01000/01000/01000/01110',
  ']': '01110/00010/00010/00010/00010/00010/01110',
  '↑': '00100/01110/10101/00100/00100/00100/00100',
  '↓': '00100/00100/00100/00100/10101/01110/00100',
  '←': '00000/00100/01000/11111/01000/00100/00000',
  '→': '00000/00100/00010/11111/00010/00100/00000',
  '•': '00000/00000/00100/01110/00100/00000/00000',
  '·': '00000/00000/00100/00000/00000/00000/00000',
  '—': '00000/00000/00000/11111/00000/00000/00000',
  '–': '00000/00000/00000/01110/00000/00000/00000',
  '♥': '00000/01010/11111/11111/01110/00100/00000',
  '★': '00100/00100/11111/01110/01110/10001/00000',
};

/* letra base + tipo de acento */
const ACCENT_MAP = {
  'Á': ['A', 'acute'], 'À': ['A', 'grave'], 'Â': ['A', 'circ'], 'Ã': ['A', 'tilde'],
  'É': ['E', 'acute'], 'È': ['E', 'grave'], 'Ê': ['E', 'circ'],
  'Í': ['I', 'acute'], 'Ì': ['I', 'grave'], 'Î': ['I', 'circ'],
  'Ó': ['O', 'acute'], 'Ò': ['O', 'grave'], 'Ô': ['O', 'circ'], 'Õ': ['O', 'tilde'],
  'Ú': ['U', 'acute'], 'Ù': ['U', 'grave'], 'Û': ['U', 'circ'],
  'Ç': ['C', 'cedil'], 'Ñ': ['N', 'tilde'],
  'á': ['A', 'acute'], 'à': ['A', 'grave'], 'â': ['A', 'circ'], 'ã': ['A', 'tilde'],
  'é': ['E', 'acute'], 'è': ['E', 'grave'], 'ê': ['E', 'circ'],
  'í': ['I', 'acute'], 'ì': ['I', 'grave'], 'î': ['I', 'circ'],
  'ó': ['O', 'acute'], 'ò': ['O', 'grave'], 'ô': ['O', 'circ'], 'õ': ['O', 'tilde'],
  'ú': ['U', 'acute'], 'ù': ['U', 'grave'], 'û': ['U', 'circ'],
  'ç': ['C', 'cedil'], 'ñ': ['N', 'tilde'],
};

const GLYPHS = {};
for (const ch in FONT_DATA) {
  GLYPHS[ch] = FONT_DATA[ch].split('/').map((r) => parseInt(r, 2));
}

function glyphFor(ch) {
  let accent = null;
  if (ACCENT_MAP[ch]) {
    accent = ACCENT_MAP[ch][1];
    ch = ACCENT_MAP[ch][0];
  }
  return { rows: GLYPHS[ch] || GLYPHS[ch.toUpperCase()] || GLYPHS['?'], accent };
}

function textWidth(text, scale = 1) {
  return Math.max(0, text.length * 6 - 1) * scale;
}

/* Desenha texto pixelado. Opções: scale, color, align, shadow, outline, maxWidth */
function drawText(ctx, text, x, y, opts = {}) {
  const scale = opts.scale || 1;
  const color = opts.color || C.white;
  const align = opts.align || 'left';
  const shadow = opts.shadow;
  const outline = opts.outline;
  const alpha = opts.alpha === undefined ? 1 : opts.alpha;

  if (opts.maxWidth) text = wrapLines(text, opts.maxWidth, scale)[0] || text;

  const w = textWidth(text, scale);
  let sx = Math.round(x);
  if (align === 'center') sx = Math.round(x - w / 2);
  else if (align === 'right') sx = Math.round(x - w);
  const sy = Math.round(y);

  ctx.save();
  ctx.globalAlpha *= alpha;

  if (shadow) drawRawText(ctx, text, sx + scale, sy + scale, scale, shadow);
  if (outline) {
    for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      drawRawText(ctx, text, sx + ox * scale, sy + oy * scale, scale, outline);
    }
  }
  drawRawText(ctx, text, sx, sy, scale, color);
  ctx.restore();
  return w;
}

function drawRawText(ctx, text, x, y, scale, color) {
  ctx.fillStyle = color;
  for (let i = 0; i < text.length; i++) {
    const { rows, accent } = glyphFor(text[i]);
    const gx = x + i * 6 * scale;
    for (let ry = 0; ry < 7; ry++) {
      const bits = rows[ry];
      if (!bits) continue;
      for (let rx = 0; rx < 5; rx++) {
        if (bits & (1 << (4 - rx))) {
          ctx.fillRect(gx + rx * scale, y + ry * scale, scale, scale);
        }
      }
    }
    if (accent) drawAccent(ctx, accent, gx, y, scale, color);
  }
}

function drawAccent(ctx, accent, gx, gy, s, color) {
  ctx.fillStyle = color;
  const yTop = gy - 2 * s;
  if (accent === 'acute') {
    ctx.fillRect(gx + 3 * s, yTop - s, s, s);
    ctx.fillRect(gx + 2 * s, yTop, s, s);
  } else if (accent === 'grave') {
    ctx.fillRect(gx + s, yTop - s, s, s);
    ctx.fillRect(gx + 2 * s, yTop, s, s);
  } else if (accent === 'circ') {
    ctx.fillRect(gx + 2 * s, yTop - s, s, s);
    ctx.fillRect(gx + s, yTop, s, s);
    ctx.fillRect(gx + 3 * s, yTop, s, s);
  } else if (accent === 'tilde') {
    ctx.fillRect(gx + s, yTop, s, s);
    ctx.fillRect(gx + 2 * s, yTop - s, s, s);
    ctx.fillRect(gx + 3 * s, yTop, s, s);
  } else if (accent === 'cedil') {
    ctx.fillRect(gx + 2 * s, gy + 8 * s, s, s);
    ctx.fillRect(gx + s, gy + 9 * s, s, s);
  }
}

function wrapLines(text, maxWidth, scale = 1) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (textWidth(test, scale) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawTextWrapped(ctx, text, x, y, maxWidth, opts = {}) {
  const scale = opts.scale || 1;
  const lineHeight = (opts.lineHeight || 9) * scale;
  const lines = wrapLines(text, maxWidth, scale);
  lines.forEach((line, i) => {
    drawText(ctx, line, x, y + i * lineHeight, opts);
  });
  return lines.length * lineHeight;
}
