# Chromé — Colour Styling Assistant

Chromé is an interactive fashion-colour utility presented through a nostalgic desktop-paint interface. Users open a fashion image, choose an item type, sample the fabric with an eyedropper, and explore three outfit directions generated from colour-theory relationships.

## Features

- Local JPG, PNG, and WEBP image processing
- Tap-to-sample garment colour detection
- Perceptual nearest-colour matching using CIE Lab distance
- Complementary, analogous, and triadic styling directions
- Separate clothing and accessory recommendation rails
- Copy, locally save, and export palette actions
- Responsive retro desktop interface

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal, normally `http://localhost:5173`.

## Verify the project

```bash
npm run check
```

This runs the TypeScript checker followed by the production build.

## How it works

1. The user uploads an image; it remains inside the browser.
2. Chromé samples a compact pixel area around the selected point.
3. A median calculation reduces interference from highlights and dark folds.
4. The sampled colour is compared perceptually with a curated fashion-colour reference set.
5. The exact sampled HEX anchors three colour-theory outfit directions.

## Technology

React, TypeScript, Vite, Tailwind CSS, Motion, and Lucide icons.

## Current limitations

- Results depend on image lighting and the area selected by the user.
- Colour names and reference codes are educational approximations.
- Chromé is not affiliated with or endorsed by Pantone.
- The tool recommends colour relationships, not specific purchasable products.

## Favicon

`public/favicon.svg` is an editable placeholder. Replace that file with the final favicon while keeping the same filename, or update its path in `index.html`.

## Author

Concept, product direction, interface design, colour workflow, and testing by Vidella.

## License

Released under the MIT License. See [LICENSE](LICENSE).
