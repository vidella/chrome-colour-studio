import { useState, useCallback, useEffect } from "react";
import { UploadScreen } from "./components/UploadScreen";
import { ItemSelectScreen } from "./components/ItemSelectScreen";
import { ColorPickScreen } from "./components/ColorPickScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import {
  generateCombinations,
  PaletteColor,
  OutfitCombo,
  ItemType,
  ITEM_TYPE_CONFIG,
} from "./components/colorUtils";
import { motion, AnimatePresence } from "motion/react";

type Screen = "upload" | "item-select" | "color-pick" | "results";

export default function App() {
  const [screen, setScreen] = useState<Screen>("upload");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [itemType, setItemType] = useState<ItemType>("top");
  const [detected, setDetected] = useState<PaletteColor | null>(null);
  const [combinations, setCombinations] = useState<OutfitCombo[]>([]);

  // Step 1: photo chosen → pick item type
  const handleImageSelect = useCallback((file: File) => {
    setImageUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
    setScreen("item-select");
  }, []);

  useEffect(() => () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  // Step 2: item type chosen → tap-to-pick colour screen
  const handleItemSelect = useCallback((type: ItemType) => {
    setItemType(type);
    setScreen("color-pick");
  }, []);

  // Step 3: user tapped their garment and confirmed the reference → results
  const handleColorConfirm = useCallback(
    (reference: PaletteColor) => {
      const combos = generateCombinations(reference, itemType);
      setDetected(reference);
      setCombinations(combos);
      setScreen("results");
    },
    [itemType]
  );

  const handleReset = useCallback(() => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl("");
    setDetected(null);
    setCombinations([]);
    setScreen("upload");
  }, [imageUrl]);

  const itemLabel =
    ITEM_TYPE_CONFIG.find((c) => c.id === itemType)?.label ?? "Piece";

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {screen === "upload" && (
          <motion.div key="upload"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <UploadScreen onImageSelect={handleImageSelect} />
          </motion.div>
        )}

        {screen === "item-select" && (
          <motion.div key="item-select"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ItemSelectScreen imageUrl={imageUrl} onSelect={handleItemSelect} onBack={handleReset} />
          </motion.div>
        )}

        {screen === "color-pick" && (
          <motion.div key="color-pick"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ColorPickScreen
              imageUrl={imageUrl}
              itemLabel={itemLabel}
              onConfirm={handleColorConfirm}
              onBack={() => setScreen("item-select")}
            />
          </motion.div>
        )}

        {screen === "results" && detected && (
          <motion.div key="results"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ResultsScreen
              imageUrl={imageUrl}
              detected={detected}
              combinations={combinations}
              itemType={itemType}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
