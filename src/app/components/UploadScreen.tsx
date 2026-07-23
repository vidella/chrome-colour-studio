import { useRef, useState } from "react";
import { ImagePlus, Pipette } from "lucide-react";
import { RetroWindow } from "./RetroWindow";

interface UploadScreenProps {
  onImageSelect: (file: File) => void;
}

export function UploadScreen({ onImageSelect }: UploadScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  function validateAndSelect(file?: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("ERROR: SELECT A JPG, PNG, OR WEBP IMAGE.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("ERROR: IMAGE MUST BE SMALLER THAN 10 MB.");
      return;
    }
    setError("");
    onImageSelect(file);
  }

  return (
    <RetroWindow statusLeft="STEP 01 / 03 — OPEN IMAGE" onFile={() => fileInputRef.current?.click()}>
      <main className="retro-content retro-upload-layout">
        <section>
          <p className="retro-kicker">Fashion colour utility v1.0</p>
          <h1 className="retro-display-title">Pick a piece.<br />Build the look.</h1>
          <p className="retro-copy">
            Open a fashion image, use the eyedropper on the fabric, and let Chromé build
            three styling palettes around the colour you choose.
          </p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <button className="retro-button primary" onClick={() => fileInputRef.current?.click()}>
              File → Open image
            </button>
            <span className="retro-button" aria-hidden="true"><Pipette size={17} /></span>
          </div>
          {error && <p role="alert" className="mt-5 text-sm font-bold" style={{ color: "#9b1b30" }}>{error}</p>}
        </section>

        <section
          className="retro-dropzone"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            validateAndSelect(event.dataTransfer.files[0]);
          }}
        >
          <div className="retro-dropzone-inner">
            <ImagePlus size={38} className="mx-auto mb-4" />
            <strong>DROP IMAGE HERE</strong>
            <p className="mt-2 text-xs">OR CLICK TO BROWSE</p>
            <p className="mt-5 text-[10px]">JPG · PNG · WEBP · MAX 10 MB</p>
          </div>
        </section>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(event) => validateAndSelect(event.target.files?.[0])}
        />
      </main>
    </RetroWindow>
  );
}
