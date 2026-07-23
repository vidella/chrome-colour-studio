import { FolderOpen } from "lucide-react";
import { ItemType, ITEM_TYPE_CONFIG } from "./colorUtils";
import { RetroWindow } from "./RetroWindow";

interface ItemSelectScreenProps {
  imageUrl: string;
  onSelect: (itemType: ItemType) => void;
  onBack: () => void;
}

export function ItemSelectScreen({ imageUrl, onSelect, onBack }: ItemSelectScreenProps) {
  return (
    <RetroWindow
      title="chromé.exe — select item"
      accent="#f59ab5"
      statusLeft="STEP 02 / 03 — SELECT ITEM TYPE"
      onFile={onBack}
      onBack={onBack}
    >
      <main className="retro-content">
        <div className="flex items-start justify-between gap-5 mb-8">
          <div>
            <p className="retro-kicker">PROJECT TYPE</p>
            <h1 className="text-3xl md:text-5xl mt-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>
              What did you open?
            </h1>
            <p className="mt-3 text-sm">Choose the piece you want Chromé to style.</p>
          </div>
          <img src={imageUrl} alt="Selected fashion piece" className="w-20 h-24 object-cover border-2 border-black" />
        </div>

        <div className="retro-item-grid">
          {ITEM_TYPE_CONFIG.map((item, index) => (
            <button className="retro-item-card" key={item.id} onClick={() => onSelect(item.id)}>
              <div className="flex items-center justify-between mb-5">
                <FolderOpen size={22} />
                <span className="text-[10px]">0{index + 1}</span>
              </div>
              <strong className="block text-base">{item.label}</strong>
              <span className="block mt-2 text-[10px] leading-relaxed">{item.sublabel}</span>
            </button>
          ))}
        </div>
      </main>
    </RetroWindow>
  );
}
