export interface PaletteColor {
  name: string;
  code: string;
  hex: string;
}

export interface ColorWithItems extends PaletteColor {
  items: string[];
}

export interface OutfitCombo {
  id: number;
  name: string;
  theory: string;
  description: string;
  colors: ColorWithItems[];
}

export const COLOR_REFERENCE_DB: PaletteColor[] = [
  // Reds & Cranberry
  { name: "True Red", code: "19-1664 TCX", hex: "#BC243C" },
  { name: "Flame Scarlet", code: "19-1763 TCX", hex: "#CC2529" },
  { name: "Chili Pepper", code: "19-1655 TCX", hex: "#9B1B30" },
  { name: "Burgundy", code: "19-1617 TCX", hex: "#70313D" },
  { name: "Cabernet", code: "19-1526 TCX", hex: "#6D2B3D" },
  { name: "Cherry Tomato", code: "16-1546 TCX", hex: "#E05A3A" },
  { name: "Pompeian Red", code: "19-1557 TCX", hex: "#9C2B2E" },
  // Pinks, Roses & Blush tones (inspo: blush + grey-brown, lilac dusk + mocha)
  { name: "Hot Coral", code: "17-1462 TCX", hex: "#F4634B" },
  { name: "Flamingo Pink", code: "15-1920 TCX", hex: "#F2A58E" },
  { name: "Blush Pink", code: "13-2010 TCX", hex: "#F5CBD7" },       // from inspo image 5
  { name: "Lilac Dusk", code: "14-3207 TCX", hex: "#DCC2C4" },        // from inspo image 6
  { name: "Pale Blush", code: "12-1706 TCX", hex: "#F5E4E0" },
  { name: "Bubblegum", code: "14-2311 TCX", hex: "#F0A8C0" },
  { name: "Fuchsia Rose", code: "17-2034 TCX", hex: "#C74375" },
  { name: "Raspberry Sorbet", code: "18-2043 TCX", hex: "#D2386C" },
  { name: "Magenta Haze", code: "17-3240 TCX", hex: "#9C4471" },
  { name: "Dusty Rose", code: "15-1614 TCX", hex: "#DCAE96" },
  // Muted mauves and rose-taupes need their own bridge between pink, brown,
  // purple and grey. Without these, perceptual distance can incorrectly send
  // a low-saturation mauve garment to a neutral charcoal.
  { name: "Mauve Taupe", code: "CHROMÉ M01", hex: "#765F60" },
  { name: "Rose Taupe", code: "CHROMÉ M02", hex: "#80666A" },
  { name: "Cocoa Mauve", code: "CHROMÉ M03", hex: "#685457" },
  { name: "Plum Taupe", code: "CHROMÉ M04", hex: "#6C5965" },
  // Oranges & Terracottas
  { name: "Tangerine", code: "15-1164 TCX", hex: "#F28500" },
  { name: "Autumn Maple", code: "18-1244 TCX", hex: "#B5651D" },
  { name: "Burnt Sienna", code: "16-1439 TCX", hex: "#C2714F" },
  { name: "Terracotta", code: "16-1435 TCX", hex: "#CB6D51" },
  { name: "Apricot Crush", code: "14-1227 TCX", hex: "#E8B49A" },
  { name: "Peach Amber", code: "14-1127 TCX", hex: "#F4C89A" },
  { name: "Melon", code: "14-1521 TCX", hex: "#F9A784" },
  // Yellows, Butters & Golds (inspo: espresso + butter, buttermilk + pastel blue)
  { name: "Butter", code: "12-0826 TCX", hex: "#FFEDAC" },             // from inspo image 4
  { name: "Buttermilk", code: "11-0111 TCX", hex: "#FFF1B5" },         // from inspo image 3
  { name: "Illuminating", code: "13-0858 TCX", hex: "#F5DF4D" },
  { name: "Buttercup", code: "12-0752 TCX", hex: "#F8CD35" },
  { name: "Mustard", code: "16-0950 TCX", hex: "#C6973F" },
  { name: "Golden Rod", code: "15-1062 TCX", hex: "#D4922A" },
  { name: "Pale Gold", code: "12-0820 TCX", hex: "#E8D5A0" },
  // Greens — pale sage & celadon (low saturation, high lightness)
  // This band is what gets mistaken for grey when the DB has no entries here
  { name: "Sea Mist", code: "13-5407 TCX", hex: "#CCDDD6" },       // very pale mint-green, L≈85%
  { name: "Celadon Green", code: "15-6414 TCX", hex: "#B4C4B8" },  // H≈150°, S≈8%, L≈74% — matches #B6C6BE
  { name: "Subtle Green", code: "15-0309 TCX", hex: "#B8C8BC" },   // H≈147°, S≈9%, L≈75%
  { name: "Smoke Green", code: "15-5207 TCX", hex: "#A8BDB4" },    // H≈163°, S≈13%, L≈70%
  { name: "Granite Green", code: "16-5515 TCX", hex: "#859E96" },  // H≈165°, S≈10%, L≈57%
  // Greens — bright to mid
  { name: "Mint Julep", code: "13-0117 TCX", hex: "#C7E8C5" },
  { name: "Sage Green", code: "16-0213 TCX", hex: "#87A878" },
  { name: "Jasmine Green", code: "16-0237 TCX", hex: "#7CB589" },
  { name: "Matcha", code: "17-0230 TCX", hex: "#5C7A59" },
  { name: "Emerald", code: "17-0145 TCX", hex: "#009B77" },
  { name: "Jade Green", code: "17-0231 TCX", hex: "#3F9142" },
  { name: "Fern", code: "17-0232 TCX", hex: "#6A7C59" },
  { name: "Olive Branch", code: "17-0535 TCX", hex: "#86874B" },
  // Dark greens & teals — fills the gap between forest green and teal
  // These cover the dark hunter/teal range that often gets mistaken for black
  { name: "Forest Night", code: "19-0315 TCX", hex: "#2D4A27" },  // army/forest, H≈107°
  { name: "Treetop", code: "18-0135 TCX", hex: "#4F6A40" },        // medium forest, H≈100°
  { name: "Duffel Bag", code: "19-0317 TCX", hex: "#3B4A35" },     // very dark olive-green
  { name: "Hunter Green", code: "19-0419 TCX", hex: "#3D5A45" },   // classic hunter, H≈140°
  { name: "Trekking Green", code: "19-5420 TCX", hex: "#3C5B50" }, // dark teal-green, H≈160°
  { name: "Pineneedle", code: "19-5323 TCX", hex: "#254A3E" },     // dark teal, H≈163° — close to #20463D
  { name: "Eden", code: "19-5513 TCX", hex: "#264E43" },           // very dark teal-green, H≈164°
  { name: "Bistro Green", code: "19-5420 TCX", hex: "#2E5047" },   // dark teal, H≈167°
  { name: "Deep Teal", code: "18-5322 TCX", hex: "#2E6B5E" },      // medium-dark teal, H≈168°
  { name: "Bayou", code: "18-5616 TCX", hex: "#4A7B72" },          // medium teal, H≈172°
  // Blues (inspo: royal blue + wren brown, pastel blue + old burgundy, periwinkle + dark plum)
  { name: "Pastel Blue", code: "14-4318 TCX", hex: "#C1DBE8" },        // from inspo image 3
  { name: "Periwinkle", code: "14-3912 TCX", hex: "#C5D2F8" },         // from inspo image 7
  { name: "Baby Blue", code: "15-3920 TCX", hex: "#AED6E8" },
  { name: "Sky Blue", code: "14-4122 TCX", hex: "#87CEEB" },
  { name: "Powder Blue", code: "14-4010 TCX", hex: "#B0D0E0" },
  { name: "Cerulean", code: "15-4020 TCX", hex: "#9BB7D4" },
  { name: "Cornflower Blue", code: "15-3932 TCX", hex: "#6A89CC" },
  { name: "French Blue", code: "18-4244 TCX", hex: "#0072B5" },
  { name: "Royal Blue", code: "19-3952 TCX", hex: "#0D2C8C" },         // reference 2758 C from inspo image 1
  { name: "Classic Blue", code: "19-4052 TCX", hex: "#0F4C81" },
  { name: "Navy Peony", code: "19-4340 TCX", hex: "#223A5E" },
  { name: "Dusk Blue", code: "18-4026 TCX", hex: "#6A8BA4" },
  { name: "Steel Blue", code: "17-4041 TCX", hex: "#4E82A4" },
  { name: "Snorkel Blue", code: "19-4150 TCX", hex: "#034F84" },
  // Purples, Plums & Lavenders (inspo: dark plum + periwinkle)
  { name: "Old Burgundy", code: "19-1518 TCX", hex: "#43302E" },       // from inspo image 3
  { name: "Dark Plum", code: "19-2512 TCX", hex: "#4F0C28" },          // from inspo image 7
  { name: "Pastel Lilac", code: "14-3812 TCX", hex: "#C8BFD8" },
  { name: "Lavender Mist", code: "15-3817 TCX", hex: "#B9B0D4" },
  { name: "Violet Tulip", code: "15-3820 TCX", hex: "#A890C0" },
  { name: "Orchid", code: "15-3214 TCX", hex: "#C17EB4" },
  { name: "Amethyst Orchid", code: "18-3633 TCX", hex: "#926AA6" },
  { name: "Ultra Violet", code: "18-3838 TCX", hex: "#5F4B8B" },
  { name: "Prism Violet", code: "19-3748 TCX", hex: "#4B3B8C" },
  // Rich Browns — Quiet Luxury Anchors (inspo: wren, espresso, mocha latte, grey-brown)
  { name: "Espresso", code: "19-0914 TCX", hex: "#3E2723" },           // from inspo image 4
  { name: "Wren", code: "19-0614 TCX", hex: "#4B4139" },               // reference 19-0614 from inspo image 1
  { name: "Mocha Latte", code: "19-0915 TCX", hex: "#332202" },        // from inspo image 6
  { name: "Grey Brown", code: "19-0912 TCX", hex: "#442F2A" },         // from inspo image 5
  { name: "Mocha Bisque", code: "15-1322 TCX", hex: "#D4A57C" },
  { name: "Camel", code: "16-1133 TCX", hex: "#C19A6B" },
  { name: "Tan", code: "14-1118 TCX", hex: "#D2B48C" },
  { name: "Cognac", code: "18-1142 TCX", hex: "#9A4722" },
  { name: "Chocolate Torte", code: "18-1136 TCX", hex: "#7B4226" },
  { name: "Dark Brown", code: "19-1217 TCX", hex: "#4A2C17" },
  { name: "Cinnamon", code: "18-1244 TCX", hex: "#854F2B" },
  { name: "Adobe", code: "17-1340 TCX", hex: "#C17A5A" },
  // Creams, Ivories & Soft Whites (inspo: cream + grey-brown, butter + espresso)
  { name: "Bright White", code: "11-0601 TCX", hex: "#F8F8F8" },
  { name: "Ivory", code: "11-0107 TCX", hex: "#FFFFF0" },
  { name: "Cream", code: "11-0110 TCX", hex: "#FFF7EC" },              // from inspo image 5
  { name: "Eggshell", code: "12-0104 TCX", hex: "#F0EAD6" },
  { name: "Birch", code: "12-0712 TCX", hex: "#E8DDC6" },
  { name: "Sand", code: "13-0905 TCX", hex: "#DCB896" },
  { name: "Nude", code: "13-1015 TCX", hex: "#E3C4A8" },
  { name: "Warm Taupe", code: "14-1107 TCX", hex: "#C4A882" },
  // Greys
  { name: "Pearl Grey", code: "13-0002 TCX", hex: "#D4D4D4" },
  { name: "Silver Grey", code: "15-4101 TCX", hex: "#A8A8A8" },
  { name: "Sharkskin", code: "17-0204 TCX", hex: "#8A8F8D" },
  { name: "Charcoal Grey", code: "18-0306 TCX", hex: "#4D4D4D" },
  // Blacks & Dark Neutrals
  { name: "Jet Black", code: "19-0303 TCX", hex: "#1A1A1A" },
  { name: "Noir", code: "19-0000 TCX", hex: "#070D0D" },               // from inspo image 5
  { name: "Navy", code: "19-3832 TCX", hex: "#1F305E" },
  { name: "Midnight Navy", code: "19-3924 TCX", hex: "#1B2A47" },
];

// ─── Item type system ─────────────────────────────────────────────────────────
export type ItemType = "top" | "trousers" | "skirt" | "dress" | "jacket" | "shoes" | "bag" | "headscarf" | "scarf";

export const ITEM_TYPE_CONFIG: Array<{ id: ItemType; label: string; sublabel: string }> = [
  { id: "top",        label: "Top",        sublabel: "Shirt · Blouse · Knitwear · Tee" },
  { id: "trousers",   label: "Trousers",   sublabel: "Pants · Wide-Leg · Culottes" },
  { id: "skirt",      label: "Skirt",      sublabel: "Midi · Mini · Maxi · A-Line" },
  { id: "dress",      label: "Dress",      sublabel: "Dress · Jumpsuit · Co-ord Set" },
  { id: "jacket",     label: "Jacket",     sublabel: "Blazer · Coat · Cardigan" },
  { id: "shoes",      label: "Shoes",      sublabel: "Heels · Flats · Boots · Loafers" },
  { id: "bag",        label: "Bag",        sublabel: "Handbag · Tote · Clutch · Backpack" },
  { id: "headscarf",  label: "Head Scarf", sublabel: "Hijab · Turban · Head Wrap" },
  { id: "scarf",      label: "Scarf",      sublabel: "Neck Scarf · Wrap · Stole" },
];

// Returns [primaryPiece, layerPiece, accessories] labels for the missing outfit items
function getOutfitSlots(itemType: ItemType): [string[], string[], string[]] {
  switch (itemType) {
    case "top":        return [["Trousers", "Midi Skirt"],     ["Jacket", "Blazer"],    ["Shoes", "Bag"]];
    case "trousers":   return [["Top", "Blouse"],              ["Jacket", "Coat"],      ["Shoes", "Bag"]];
    case "skirt":      return [["Top", "Blouse"],              ["Jacket", "Blazer"],    ["Shoes", "Bag"]];
    case "dress":      return [["Shoes", "Heels"],             ["Jacket", "Coat"],      ["Bag", "Belt"]];
    case "jacket":     return [["Trousers", "Wide-Leg Pants"], ["Top", "Knitwear"],     ["Shoes", "Bag"]];
    case "shoes":      return [["Trousers", "Midi Skirt"],     ["Top", "Blouse"],       ["Bag", "Jacket"]];
    case "bag":        return [["Trousers", "Midi Skirt"],     ["Top", "Blouse"],       ["Shoes", "Jacket"]];
    case "headscarf":  return [["Dress", "Abaya"],             ["Jacket", "Coat"],      ["Shoes", "Bag"]];
    case "scarf":      return [["Trousers", "Midi Skirt"],     ["Top", "Blouse"],       ["Shoes", "Bag"]];
    default:           return [["Trousers", "Midi Skirt"],     ["Jacket", "Blazer"],    ["Shoes", "Bag"]];
  }
}

// Color conversion utilities
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
    case gn: h = ((bn - rn) / d + 2) / 6; break;
    default: h = ((rn - gn) / d + 4) / 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sn = s / 100, ln = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => ln - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
      .join("")
  );
}

// ── Perceptual colour distance in CIE L*a*b* space ───────────────────────────
// RGB Euclidean distance fails badly for real colours — a dark olive green can
// be numerically "closer" to lavender than to sage. LAB distance is perceptually
// uniform: colours that look different to the human eye are always far apart.
function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // 1. sRGB → linear RGB (undo gamma)
  const lin = (c: number) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const rl = lin(r), gl = lin(g), bl = lin(b);
  // 2. linear RGB → XYZ (D65 illuminant)
  const x = (rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375) / 0.95047;
  const y = (rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750) / 1.00000;
  const z = (rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041) / 1.08883;
  // 3. XYZ → L*a*b*
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

function colorDistanceLab(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const [L1, a1, bv1] = rgbToLab(r1, g1, b1);
  const [L2, a2, bv2] = rgbToLab(r2, g2, b2);
  return Math.sqrt((L1 - L2) ** 2 + (a1 - a2) ** 2 + (bv1 - bv2) ** 2);
}

export function findNearestReference(
  targetHex: string,
  exclude: string[] = []
): PaletteColor {
  let minDist = Infinity;
  let nearest = COLOR_REFERENCE_DB[0];
  for (const color of COLOR_REFERENCE_DB) {
    if (exclude.includes(color.code)) continue;
    // Use perceptual LAB distance — green will never match lavender
    const dist = colorDistanceLab(targetHex, color.hex);
    if (dist < minDist) {
      minDist = dist;
      nearest = color;
    }
  }
  return nearest;
}

// Extract dominant clothing color — crop region is guided by item type so we look
// in the right part of the image (lower half for trousers, upper half for tops, etc.)
export function extractDominantColor(
  img: HTMLImageElement,
  itemType: ItemType = "top"
): string {
  const canvas = document.createElement("canvas");
  const SIZE = 200;
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;

  // [x%, y%, w%, h%] — where in the image the garment typically lives
  type Region = [number, number, number, number];
  const REGIONS: Record<ItemType, Region> = {
    top:      [0.10, 0.03, 0.80, 0.55], // upper body
    trousers: [0.10, 0.38, 0.80, 0.62], // skip face/torso, focus lower half
    skirt:    [0.10, 0.35, 0.80, 0.65],
    dress:    [0.10, 0.03, 0.80, 0.94], // full body
    jacket:   [0.05, 0.03, 0.90, 0.65],
    shoes:    [0.10, 0.55, 0.80, 0.45], // bottom of frame
    bag:      [0.10, 0.15, 0.80, 0.75],
    headscarf:[0.10, 0.00, 0.80, 0.45],
    scarf:    [0.10, 0.05, 0.80, 0.65],
  };

  const [cx, cy, cw, ch] = REGIONS[itemType] ?? [0.15, 0.10, 0.70, 0.80];
  ctx.drawImage(
    img,
    img.naturalWidth * cx,
    img.naturalHeight * cy,
    img.naturalWidth * cw,
    img.naturalHeight * ch,
    0, 0, SIZE, SIZE
  );

  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;

  // Separate pixels into chromatic vs neutral buckets
  const colorPixels: Array<[number, number, number, number]> = []; // [r,g,b,saturation]
  const lightPixels: Array<[number, number, number]> = [];
  const darkPixels:  Array<[number, number, number]> = [];
  const greyPixels:  Array<[number, number, number]> = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 200) continue;
    const [, s, l] = rgbToHsl(r, g, b);
    if (s >= 8 && l >= 8 && l <= 92) {
      colorPixels.push([r, g, b, s]);
    } else if (l > 82) {
      lightPixels.push([r, g, b]);
    } else if (l < 10) {
      darkPixels.push([r, g, b]);
    } else {
      greyPixels.push([r, g, b]);
    }
  }

  const total =
    colorPixels.length + lightPixels.length + darkPixels.length + greyPixels.length;
  if (total === 0) return "#888888";

  if (colorPixels.length / total > 0.10) {
    // Score each 30° hue bucket by TOTAL SATURATION of its pixels, not just pixel count.
    // A garment with 400 highly-saturated green pixels beats 800 pale-lavender background
    // pixels — vivid clothing colours win over washed-out surroundings.
    const hueBuckets: number[] = new Array(12).fill(0);
    const hueGroups: Array<Array<[number, number, number]>> = Array.from(
      { length: 12 }, () => []
    );

    for (const [r, g, b, s] of colorPixels) {
      const [h] = rgbToHsl(r, g, b);
      if (s < 5) continue;
      const bucket = Math.floor(h / 30) % 12;
      hueBuckets[bucket] += s; // accumulate saturation — not just a headcount
      hueGroups[bucket].push([r, g, b]);
    }

    const maxBucket = hueBuckets.indexOf(Math.max(...hueBuckets));
    const cluster =
      hueGroups[maxBucket].length > 5 ? hueGroups[maxBucket] : colorPixels.map(([r, g, b]) => [r, g, b] as [number, number, number]);

    const rAvg = Math.round(cluster.reduce((s, [r]) => s + r, 0) / cluster.length);
    const gAvg = Math.round(cluster.reduce((s, [, g]) => s + g, 0) / cluster.length);
    const bAvg = Math.round(cluster.reduce((s, [, , b]) => s + b, 0) / cluster.length);
    return rgbToHex(rAvg, gAvg, bAvg);
  }

  // Neutral garment (black / white / grey) — pick the largest neutral bucket
  const counts = [
    { group: lightPixels },
    { group: darkPixels },
    { group: greyPixels },
  ];
  const dominant = counts.sort((a, b) => b.group.length - a.group.length)[0];
  const cluster =
    dominant.group.length > 0
      ? dominant.group
      : [...lightPixels, ...darkPixels, ...greyPixels];

  const rAvg = Math.round(cluster.reduce((s, [r]) => s + r, 0) / cluster.length);
  const gAvg = Math.round(cluster.reduce((s, [, g]) => s + g, 0) / cluster.length);
  const bAvg = Math.round(cluster.reduce((s, [, , b]) => s + b, 0) / cluster.length);
  return rgbToHex(rAvg, gAvg, bAvg);
}

function pickNeutral(
  kind: "warm-dark" | "cool-dark" | "warm-light" | "cool-light",
  exclude: string[]
): PaletteColor {
  // Preferences ordered by quiet luxury priority (richest, most editorial first)
  const PREFERENCES: Record<string, string[]> = {
    "warm-dark": ["Espresso", "Wren", "Mocha Latte", "Grey Brown", "Dark Brown", "Chocolate Torte", "Cognac", "Old Burgundy", "Cinnamon"],
    "cool-dark": ["Noir", "Jet Black", "Navy Peony", "Dark Plum", "Midnight Navy", "Navy", "Charcoal Grey"],
    "warm-light": ["Cream", "Butter", "Buttermilk", "Ivory", "Eggshell", "Birch", "Nude", "Warm Taupe", "Blush Pink"],
    "cool-light": ["Lilac Dusk", "Periwinkle", "Pastel Blue", "Pastel Lilac", "Lavender Mist", "Pearl Grey", "Silver Grey", "Powder Blue"],
  };
  for (const name of PREFERENCES[kind]) {
    const found = COLOR_REFERENCE_DB.find((p) => p.name === name && !exclude.includes(p.code));
    if (found) return found;
  }
  return COLOR_REFERENCE_DB.find((p) => p.name === "Jet Black")!;
}

// Returns fashion-appropriate combos for black, white, and grey base colours
function generateNeutralCombinations(
  detected: PaletteColor,
  kind: "black" | "white" | "grey",
  slots: [string[], string[], string[]]
): OutfitCombo[] {
  const ex = [detected.code];

  const pick = (names: string[], exclude: string[] = []) => {
    for (const name of names) {
      const found = COLOR_REFERENCE_DB.find((p) => p.name === name && !exclude.includes(p.code));
      if (found) return found;
    }
    return COLOR_REFERENCE_DB[0];
  };

  if (kind === "black") {
    const ivory    = pick(["Cream", "Ivory", "Eggshell"], ex);
    const silver   = pick(["Silver Grey", "Pearl Grey"], [...ex, ivory.code]);
    const charcoal = pick(["Charcoal Grey", "Sharkskin"], [...ex, ivory.code, silver.code]);
    const emerald  = pick(["Emerald", "Jade Green", "Matcha"], ex);
    const espresso1 = pick(["Espresso", "Wren", "Cognac"], [...ex, emerald.code]);
    const camel    = pick(["Camel", "Tan", "Warm Taupe"], [...ex, emerald.code, espresso1.code]);
    const burgundy = pick(["Burgundy", "Old Burgundy", "Cabernet"], ex);
    const blush    = pick(["Blush Pink", "Lilac Dusk", "Nude"], [...ex, burgundy.code]);
    const wren     = pick(["Wren", "Espresso", "Mocha Latte"], [...ex, burgundy.code, blush.code]);
    return [
      {
        id: 1, name: "Monochrome Edit", theory: "Achromatic",
        description: "Ivory and silver beside black — minimal, architectural, quietly expensive.",
        colors: [
          { ...ivory,    items: slots[0] },
          { ...charcoal, items: slots[1] },
          { ...silver,   items: slots[2] },
        ],
      },
      {
        id: 2, name: "Jewel & Earth", theory: "Contrast Accent",
        description: "Emerald and camel against black — rich, grounded, investment-piece dressing.",
        colors: [
          { ...emerald,   items: slots[0] },
          { ...espresso1, items: slots[1] },
          { ...camel,     items: slots[2] },
        ],
      },
      {
        id: 3, name: "Noir & Blush", theory: "Soft Contrast",
        description: "Burgundy and blush soften black — feminine, refined, Old World luxury.",
        colors: [
          { ...burgundy, items: slots[0] },
          { ...wren,     items: slots[1] },
          { ...blush,    items: slots[2] },
        ],
      },
    ];
  }

  if (kind === "white") {
    const espresso   = pick(["Wren", "Espresso", "Grey Brown"], ex);
    const cream      = pick(["Cream", "Ivory", "Eggshell"], [...ex, espresso.code]);
    const mocha      = pick(["Mocha Bisque", "Sand", "Camel"], [...ex, espresso.code, cream.code]);
    const camel      = pick(["Camel", "Tan", "Warm Taupe"], ex);
    const espresso2  = pick(["Espresso", "Dark Brown", "Cognac"], [...ex, camel.code]);
    const terracotta = pick(["Terracotta", "Burnt Sienna", "Adobe"], [...ex, camel.code, espresso2.code]);
    const navy       = pick(["Navy Peony", "Snorkel Blue", "Classic Blue"], ex);
    const wren2      = pick(["Wren", "Tan", "Sand"], [...ex, navy.code]);
    const butter     = pick(["Butter", "Buttermilk", "Pale Gold"], [...ex, navy.code, wren2.code]);
    return [
      {
        id: 1, name: "Ivory & Espresso", theory: "Tonal Luxury",
        description: "Espresso brown grounds white — the quiet luxury formula refined to its essence.",
        colors: [
          { ...espresso, items: slots[0] },
          { ...cream,    items: slots[1] },
          { ...mocha,    items: slots[2] },
        ],
      },
      {
        id: 2, name: "Earth Warmth", theory: "Warm Neutrals",
        description: "Camel and terracotta saturate white with warmth — effortless and beautifully grounded.",
        colors: [
          { ...camel,      items: slots[0] },
          { ...espresso2,  items: slots[1] },
          { ...terracotta, items: slots[2] },
        ],
      },
      {
        id: 3, name: "Navy & Butter", theory: "Cool Contrast",
        description: "Deep navy and soft butter yellow with white — crisp, considered, expensive-looking.",
        colors: [
          { ...navy,   items: slots[0] },
          { ...wren2,  items: slots[1] },
          { ...butter, items: slots[2] },
        ],
      },
    ];
  }

  // Grey
  const espresso3  = pick(["Wren", "Espresso", "Grey Brown", "Mocha Latte"], ex);
  const cream2     = pick(["Cream", "Ivory", "Eggshell"], [...ex, espresso3.code]);
  const blush2     = pick(["Blush Pink", "Lilac Dusk", "Nude"], [...ex, espresso3.code, cream2.code]);
  const camel2     = pick(["Camel", "Tan", "Adobe"], ex);
  const espresso4  = pick(["Espresso", "Dark Brown", "Chocolate Torte"], [...ex, camel2.code]);
  const rust       = pick(["Burnt Sienna", "Terracotta", "Cognac"], [...ex, camel2.code, espresso4.code]);
  const navy2      = pick(["Navy Peony", "Midnight Navy"], ex);
  const cream3     = pick(["Cream", "Ivory"], [...ex, navy2.code]);
  const periwinkle = pick(["Periwinkle", "Pastel Blue", "Lavender Mist"], [...ex, navy2.code, cream3.code]);
  return [
    {
      id: 1, name: "Espresso & Cream", theory: "Warm Tonal",
      description: "Rich espresso and ivory beside grey — warm, refined, the quiet luxury triad.",
      colors: [
        { ...espresso3, items: slots[0] },
        { ...cream2,    items: slots[1] },
        { ...blush2,    items: slots[2] },
      ],
    },
    {
      id: 2, name: "Terrain Edit", theory: "Warm Contrast",
      description: "Camel and rust earth tones lift grey — relaxed, textured, considered.",
      colors: [
        { ...camel2,    items: slots[0] },
        { ...espresso4, items: slots[1] },
        { ...rust,      items: slots[2] },
      ],
    },
    {
      id: 3, name: "Navy & Periwinkle", theory: "Cool Harmony",
      description: "Deep navy grounds soft periwinkle beside grey — polished, calm, unexpectedly chic.",
      colors: [
        { ...navy2,      items: slots[0] },
        { ...cream3,     items: slots[1] },
        { ...periwinkle, items: slots[2] },
      ],
    },
  ];
}

export function generateCombinations(
  detected: PaletteColor,
  itemType: ItemType = "top"
): OutfitCombo[] {
  const slots = getOutfitSlots(itemType);
  const [r, g, b] = hexToRgb(detected.hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const exclude = [detected.code];

  // Route neutral/achromatic colours to dedicated logic
  if (s < 12 || l > 88 || l < 10) {
    const kind = l > 75 ? "white" : l < 20 ? "black" : "grey";
    return generateNeutralCombinations(detected, kind, slots);
  }

  const targetHex = (hue: number, sat: number, lig: number) => {
    const clamped = rgbToHex(...hslToRgb(hue, Math.min(100, sat), Math.min(95, Math.max(5, lig))));
    return clamped;
  };

  // Determine warm vs cool tendency for neutral selection
  const isWarmHue = (h >= 0 && h < 80) || (h >= 300 && h <= 360);
  const darkNeutralKind = isWarmHue ? "warm-dark" : "cool-dark";
  const lightNeutralKind = isWarmHue ? "warm-light" : "cool-light";

  // ── Combo 1: Complementary (high contrast, bold) ──
  const compHue = (h + 180) % 360;
  const compTarget = targetHex(compHue, Math.max(s, 50), Math.min(Math.max(l, 32), 68));
  const compColor = findNearestReference(compTarget, exclude);
  const n1Dark = pickNeutral(darkNeutralKind, [...exclude, compColor.code]);
  const n1Light = pickNeutral(lightNeutralKind, [...exclude, compColor.code, n1Dark.code]);

  // ── Combo 2: Analogous (tonal, adjacent hues) ──
  const ana1Hue = (h + 40) % 360;
  const ana2Hue = (h - 40 + 360) % 360;
  const ana1 = findNearestReference(
    targetHex(ana1Hue, s * 0.85, l * 0.85),
    [...exclude, compColor.code]
  );
  const ana2 = findNearestReference(
    targetHex(ana2Hue, s * 0.7, Math.min(l * 1.1, 90)),
    [...exclude, compColor.code, ana1.code]
  );
  const n2Dark = pickNeutral(darkNeutralKind, [...exclude, ana1.code, ana2.code]);

  // ── Combo 3: Triadic (three equidistant hues) ──
  const tri1Hue = (h + 120) % 360;
  const tri2Hue = (h + 240) % 360;
  const tri1 = findNearestReference(
    targetHex(tri1Hue, Math.max(s, 48), l),
    [...exclude, compColor.code, ana1.code]
  );
  const tri2 = findNearestReference(
    targetHex(tri2Hue, Math.max(s, 48), l),
    [...exclude, compColor.code, ana1.code, tri1.code]
  );
  const n3Light = pickNeutral(lightNeutralKind, [...exclude, tri1.code, tri2.code]);

  return [
    {
      id: 1,
      name: "Quiet Contrast",
      theory: "Complementary",
      description: "Opposite hues anchored by a rich dark neutral — unexpected, editorial, expensive.",
      colors: [
        { ...compColor, items: slots[0] },
        { ...n1Dark,    items: slots[1] },
        { ...n1Light,   items: slots[2] },
      ],
    },
    {
      id: 2,
      name: "Tonal Edit",
      theory: "Analogous",
      description: "Neighbouring hues in shifting depth — cohesive, considered, a dressed-up monochrome.",
      colors: [
        { ...ana1,   items: slots[0] },
        { ...ana2,   items: slots[1] },
        { ...n2Dark, items: slots[2] },
      ],
    },
    {
      id: 3,
      name: "Colour Story",
      theory: "Triadic",
      description: "Three equidistant hues grounded by a soft neutral — vibrant but never loud.",
      colors: [
        { ...tri1,    items: slots[0] },
        { ...tri2,    items: slots[1] },
        { ...n3Light, items: slots[2] },
      ],
    },
  ];
}
