// Calcula si un color de fondo es "oscuro" (luminancia relativa, fórmula
// WCAG) y devuelve la paleta de texto con mejor contraste para ese fondo.

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function channelLuminance(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

export interface TextPalette {
  ink: string;
  soft: string;
  muted: string;
}

const paletteForLight: TextPalette = {
  ink: "#2e2f29",
  soft: "#5c5b50",
  muted: "#6b6a5e",
};

const paletteForDark: TextPalette = {
  ink: "#f5f3ec",
  soft: "#dcd8c9",
  muted: "#b8b29a",
};

export function getContrastPalette(bgHex: string): TextPalette {
  try {
    return relativeLuminance(bgHex) < 0.4 ? paletteForDark : paletteForLight;
  } catch {
    return paletteForLight;
  }
}
