import { ArrowLeft, RotateCcw, Copy, Download, Bookmark } from "lucide-react";
import { useState } from "react";
import { PaletteColor, ColorWithItems, OutfitCombo, ItemType, ITEM_TYPE_CONFIG } from "./colorUtils";
import { RetroWindow } from "./RetroWindow";

interface ResultsScreenProps {
  imageUrl: string;
  detected: PaletteColor;
  combinations: OutfitCombo[];
  itemType: ItemType;
  onReset: () => void;
}

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };
const SANS  = { fontFamily: "'Raleway', system-ui, sans-serif" };

function getItemLabel(itemType: ItemType): string {
  return ITEM_TYPE_CONFIG.find((c) => c.id === itemType)?.label ?? "Piece";
}

function RecommendationTile({ item, color }: { item: string; color: ColorWithItems }) {
  return (
    <article className="retro-rec-tile">
      <div className="retro-rec-colour" style={{ background: color.hex }} />
      <div className="retro-rec-copy">
        <strong>{item}</strong>
        <span>{color.name}</span>
        <span>{color.hex.toUpperCase()}</span>
      </div>
    </article>
  );
}

// ─── Results page ─────────────────────────────────────────────────────────────
export function ResultsScreen({
  imageUrl,
  detected,
  combinations,
  itemType,
  onReset,
}: ResultsScreenProps) {
  const itemLabel = getItemLabel(itemType);
  const [status, setStatus] = useState("");
  const [activeLook, setActiveLook] = useState(0);
  const activeCombo = combinations[activeLook] ?? combinations[0];
  const clothingRecommendations = activeCombo
    ? activeCombo.colors.slice(0, 2).flatMap((color) => color.items.map((item) => ({ item, color })))
    : [];
  const accessoryRecommendations = activeCombo
    ? activeCombo.colors.slice(2).flatMap((color) => color.items.map((item) => ({ item, color })))
    : [];

  const paletteText = combinations.flatMap((combo) => combo.colors.map((color) => color.hex)).filter((hex, index, all) => all.indexOf(hex) === index).join(", ");

  async function copyPalette() {
    await navigator.clipboard.writeText(`${detected.hex}, ${paletteText}`);
    setStatus("Palette copied");
  }

  function downloadPalette() {
    const data = { anchor: detected, itemType, combinations };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "chrome-colour-palette.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Palette downloaded");
  }

  function savePalette() {
    localStorage.setItem("chrome-saved-palette", JSON.stringify({ anchor: detected, itemType, combinations }));
    setStatus("Palette saved in this browser");
  }

  return (
    <RetroWindow
      title="chromé.exe — outfit results"
      accent={detected.hex}
      statusLeft="OUTFIT_PALETTE.CHR — 3 LOOKS GENERATED"
      statusRight={status || `${detected.hex.toUpperCase()} · ${detected.name}`}
      onFile={onReset}
      onBack={onReset}
    >
      <main className="retro-content">
        <div className="flex justify-between items-center gap-4 border-2 border-black bg-white p-3 mb-5">
          <button onClick={onReset} className="retro-button">
            <ArrowLeft size={14} className="inline mr-2" />New image
          </button>
          <div className="flex gap-2">
            <button onClick={copyPalette} aria-label="Copy palette" title="Copy palette" className="retro-tool w-10 h-10"><Copy size={15} /></button>
            <button onClick={savePalette} aria-label="Save palette" title="Save palette" className="retro-tool w-10 h-10"><Bookmark size={15} /></button>
            <button onClick={downloadPalette} aria-label="Download palette" title="Download JSON" className="retro-tool w-10 h-10"><Download size={15} /></button>
            <button onClick={onReset} aria-label="Reset" className="retro-tool w-10 h-10"><RotateCcw size={15} /></button>
          </div>
        </div>
        {/* Detected colour */}
        <div className="flex items-center gap-4 p-4 border-2 border-black bg-white">
          <div
            className="w-11 h-14 overflow-hidden shrink-0"
            style={{ border: "1px solid rgba(92,78,122,0.12)" }}
          >
            <img src={imageUrl} alt="uploaded" className="w-full h-full object-cover" />
          </div>
          <div
            className="w-11 h-14 shrink-0"
            style={{ backgroundColor: detected.hex, border: "1px solid rgba(92,78,122,0.12)" }}
          />
          <div className="min-w-0">
            <p
              className="mb-0.5"
              style={{ ...SANS, fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-foreground)" }}
            >
              Your {itemLabel}
            </p>
            <p
              className="leading-tight truncate"
              style={{ ...SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "1.15rem" }}
            >
              {detected.name}
            </p>
            <p
              className="mt-0.5"
              style={{ ...SANS, fontWeight: 300, fontSize: "0.65rem", color: "var(--muted-foreground)" }}
            >
              Reference {detected.code} · {detected.hex}
            </p>
          </div>
        </div>
        <p aria-live="polite" className="h-5 pt-1 text-right" style={{ ...SANS, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{status}</p>

        <div className="pt-6 pb-3">
          <p className="retro-kicker">SELECT COLOUR THEORY</p>
          <div className="retro-look-tabs mt-3">
            {combinations.map((combo, index) => (
              <button
                key={combo.id}
                className={`retro-look-tab ${index === activeLook ? "active" : ""}`}
                onClick={() => setActiveLook(index)}
              >
                <span className="block text-[10px]">0{combo.id} · {combo.theory}</span>
                <strong className="block mt-1">{combo.name}</strong>
              </button>
            ))}
          </div>
        </div>

        {activeCombo && (
          <div className="retro-look-workspace">
            <aside className="retro-recommendations">
              <div className="retro-rail-label">ACCESSORIES</div>
              {accessoryRecommendations.map(({ item, color }, index) => (
                <RecommendationTile key={`${item}-${color.code}-${index}`} item={item} color={color} />
              ))}
            </aside>

            <section className="retro-look-canvas">
              <div className="retro-look-image">
                <img src={imageUrl} alt={`Your ${itemLabel} styled with the ${activeCombo.name} palette`} />
              </div>
              <div className="retro-look-caption">
                <span className="text-[10px]">{activeCombo.theory.toUpperCase()} / LOOK 0{activeCombo.id}</span>
                <h2 className="text-2xl mt-1" style={{ ...SERIF, fontStyle: "italic" }}>{activeCombo.name}</h2>
                <p className="text-xs leading-relaxed mt-2">{activeCombo.description}</p>
                <div className="retro-look-colours">
                  <span style={{ background: detected.hex }} title={`Your ${itemLabel}: ${detected.hex}`} />
                  {activeCombo.colors.map((color) => <span key={color.code} style={{ background: color.hex }} title={`${color.name}: ${color.hex}`} />)}
                </div>
              </div>
            </section>

            <aside className="retro-recommendations">
              <div className="retro-rail-label">CLOTHING</div>
              {clothingRecommendations.map(({ item, color }, index) => (
                <RecommendationTile key={`${item}-${color.code}-${index}`} item={item} color={color} />
              ))}
            </aside>
          </div>
        )}
        <p className="pt-8 text-center" style={{ ...SANS, fontSize: "0.62rem", color: "var(--muted-foreground)" }}>
          Colour names and references are educational approximations. Chromé is not affiliated with reference.
        </p>
      </main>
    </RetroWindow>
  );
}
