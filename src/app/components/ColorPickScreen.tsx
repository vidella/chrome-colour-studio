import { useRef, useState, useCallback } from "react";
import { ArrowLeft, Pipette, MousePointer2, ZoomIn, Eraser, Square, Circle, RotateCcw } from "lucide-react";
import { PaletteColor, findNearestReference } from "./colorUtils";
import { RetroWindow } from "./RetroWindow";

interface ColorPickScreenProps {
  imageUrl: string;
  itemLabel: string;
  onConfirm: (color: PaletteColor) => void;
  onBack: () => void;
}

// Inline HSL helper — ColorPickScreen can't use the non-exported internal version
function pxToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

/**
 * Samples colour from a compact 25×25 pixel region around the tap point.
 *
 * Problem: dark garments (like deep forest green) have shadow folds that
 * register as nearly black. Simply averaging all pixels makes dark coloured
 * garments look black.
 *
 * Solution — three-phase filtering:
 *   1. Discard pure background (L > 82%) and pure shadow (L < 6%).
 *   2. Among remaining pixels, prefer the lighter ones (top-40% by L).
 *      The lighter pixels of a dark garment show the true hue; the darker
 *      pixels are just shadow on that same hue.
 *   3. If no usable chromatic pixels found (neutral garment), fall back to
 *      a raw average of non-background pixels.
 */
function sampleColorAt(imageUrl: string, relX: number, relY: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      try {
        const MAX = 1000;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const cw = Math.round(img.width * scale);
        const ch = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, cw, ch);

        const px = Math.round(relX * cw);
        const py = Math.round(relY * ch);

        // Keep the patch close to the pointer. A large patch can include skin,
        // background, seams, or a neighbouring garment.
        const RADIUS = 12;
        const x0 = Math.max(0, px - RADIUS);
        const y0 = Math.max(0, py - RADIUS);
        const sw = Math.min(cw - x0, RADIUS * 2 + 1);
        const sh = Math.min(ch - y0, RADIUS * 2 + 1);
        const { data } = ctx.getImageData(x0, y0, sw, sh);

        type Px = { r: number; g: number; b: number; l: number; s: number };
        const pixels: Px[] = [];

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const [, s, l] = pxToHsl(r, g, b);
          pixels.push({ r, g, b, l, s });
        }

        if (pixels.length === 0) { resolve("#888888"); return; }

        // ── Step 1: remove pure background and pure shadow ───────────────
        // background: very light (L > 82%) or nearly-grey (S < 3% with L > 60%)
        // shadow:     below L 6% — essentially black pixels
        const garment = pixels.filter(
          (p) => p.l >= 6 && p.l <= 82 && !(p.s < 3 && p.l > 60)
        );

        // ── Step 2: for dark garments, prefer lighter pixels (less shadow) ─
        // A dark green pleat at L=8% and L=25% are the SAME green — just
        // differently shadowed. The L=25% pixel reveals the hue far better.
        const pool = garment.length >= 10 ? garment : pixels;
        pool.sort((a, b) => b.l - a.l); // brightest first

        const medianL = pool[Math.floor(pool.length / 2)]?.l ?? 50;
        let finalPixels: Px[];

        if (medianL < 30) {
          // Very dark garment: take the top-40% brightest pixels.
          // These are still dark (L 15-30%) but contain the true hue, not pure shadow.
          finalPixels = pool.slice(0, Math.max(3, Math.floor(pool.length * 0.4)));
        } else {
          finalPixels = pool;
        }

        // ── Step 3: median ────────────────────────────────────────────────
        // A channel median is more resistant than an average to a bright
        // highlight, dark stitch, or stray background pixel.
        const middle = (values: number[]) => {
          const sorted = [...values].sort((a, b) => a - b);
          return sorted[Math.floor(sorted.length / 2)];
        };
        const R = middle(finalPixels.map((p) => p.r));
        const G = middle(finalPixels.map((p) => p.g));
        const B = middle(finalPixels.map((p) => p.b));

        resolve(
          "#" +
          [R, G, B]
            .map((v) =>
              Math.max(0, Math.min(255, Math.round(v)))
                .toString(16)
                .padStart(2, "0")
            )
            .join("")
        );
      } catch {
        resolve("#888888");
      }
    };

    img.onerror = () => resolve("#888888");
    img.src = imageUrl; // fresh load — no stale-element issues
  });
}

// ─────────────────────────────────────────────────────────────────────────────

interface PickResult {
  sampledHex: string;
  reference: PaletteColor;
  dotX: number;
  dotY: number;
}

export function ColorPickScreen({
  imageUrl,
  itemLabel,
  onConfirm,
  onBack,
}: ColorPickScreenProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [result, setResult] = useState<PickResult | null>(null);
  const [sampling, setSampling] = useState(false);
  const touchFiredRef = useRef(false);

  const sample = useCallback(
    async (clientX: number, clientY: number) => {
      const img = imgRef.current;
      if (!img) return;

      const rect = img.getBoundingClientRect();
      const relX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const relY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const dotX = clientX - rect.left;
      const dotY = clientY - rect.top;

      setSampling(true);
      const hex = await sampleColorAt(imageUrl, relX, relY);
      const reference = findNearestReference(hex);
      setResult({ sampledHex: hex, reference, dotX, dotY });
      setSampling(false);
    },
    [imageUrl]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      touchFiredRef.current = true;
      const t = e.changedTouches[0];
      sample(t.clientX, t.clientY);
    },
    [sample]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (touchFiredRef.current) { touchFiredRef.current = false; return; }
      sample(e.clientX, e.clientY);
    },
    [sample]
  );

  return (
    <RetroWindow
      title={`chromé.exe — ${itemLabel.toLowerCase()}.jpg`}
      accent={result?.sampledHex ?? "#a9d9ec"}
      statusLeft={sampling ? "READING PIXELS…" : "STEP 03 / 03 — EYEDROPPER ACTIVE"}
      statusRight={result ? `${result.sampledHex.toUpperCase()} · ${result.reference.name}` : "CLICK DIRECTLY ON FABRIC"}
      onFile={onBack}
      onBack={onBack}
    >
      <div className="retro-paint-workspace">
        <aside className="retro-tools" aria-label="Paint tools">
          <button className="retro-tool" disabled aria-label="Pointer tool unavailable"><MousePointer2 size={22} /></button>
          <button className="retro-tool" disabled aria-label="Selection tool unavailable"><Square size={22} /></button>
          <button className="retro-tool active" aria-label="Eyedropper active"><Pipette size={22} /></button>
          <button className="retro-tool" disabled aria-label="Zoom tool unavailable"><ZoomIn size={22} /></button>
          <button className="retro-tool" disabled aria-label="Eraser tool unavailable"><Eraser size={22} /></button>
          <button className="retro-tool" disabled aria-label="Shape tool unavailable"><Circle size={22} /></button>
          <button className="retro-tool" onClick={() => setResult(null)}><RotateCcw size={22} /></button>
          <button className="retro-tool" onClick={onBack}><ArrowLeft size={22} /></button>
        </aside>

        <div className="retro-canvas-wrap">
          <div className="retro-canvas" onClick={handleClick} onTouchEnd={handleTouchEnd}>
            <img ref={imgRef} src={imageUrl} alt={`Tap directly on the ${itemLabel} fabric`} draggable={false} />
            {!result && !sampling && (
              <div className="absolute left-1/2 bottom-4 -translate-x-1/2 bg-white border-2 border-black px-3 py-2 text-[11px] text-center pointer-events-none">
                EYEDROPPER ACTIVE<br />CLICK DIRECTLY ON THE FABRIC
              </div>
            )}
            {sampling && <div className="absolute inset-0 grid place-items-center bg-white/40 font-bold">READING…</div>}
            {result && !sampling && (
              <div className="absolute pointer-events-none" style={{ left: result.dotX, top: result.dotY, transform: "translate(-50%,-50%)" }}>
                <div className="w-14 h-14 rounded-full border-[3px] border-white outline outline-2 outline-black grid place-items-center">
                  <span className="w-5 h-5 rounded-full border-2 border-white outline outline-1 outline-black" style={{ background: result.sampledHex }} />
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="retro-inspector">
          <p className="retro-kicker">COLOUR INSPECTOR</p>
          <div className="retro-swatch-large" style={{ background: result?.sampledHex ?? "#ffffff" }} />
          <p className="text-xs">SAMPLED HEX</p>
          <strong className="text-xl">{result?.sampledHex.toUpperCase() ?? "— — — — — —"}</strong>

          <div className="retro-reference mt-5">
            <div className="retro-reference-swatch" style={{ background: result?.reference.hex ?? "#efeee8" }} />
            <p className="text-[10px]">NEAREST PALETTE REFERENCE</p>
            <strong className="block mt-1">{result?.reference.name ?? "Awaiting sample"}</strong>
            <span className="text-[10px]">{result?.reference.code ?? "Click the canvas"}</span>
          </div>

          {result && (
            <div className="mt-5 grid gap-3">
              <button className="retro-button primary" onClick={() => onConfirm({ ...result.reference, hex: result.sampledHex })}>Build outfit →</button>
              <button className="retro-button" onClick={() => setResult(null)}>Sample again</button>
            </div>
          )}
        </aside>
      </div>

      <div className="retro-palette" aria-label="Current palette">
        {(result ? [result.sampledHex, result.reference.hex, "#f59ab5", "#c8ed69", "#a9d9ec", "#f4df83", "#80666a", "#20231f"] : ["#20231f","#ffffff","#f59ab5","#c8ed69","#a9d9ec","#f4df83","#80666a","#c7c7bf"]).map((hex) => (
          <span key={hex} style={{ background: hex }} title={hex} />
        ))}
      </div>
    </RetroWindow>
  );
}
