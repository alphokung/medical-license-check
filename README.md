# Medical License Check (ตรวจสอบใบประกอบวิชาชีพ)

A public service landing page that provides a centralized hub for Thai citizens to verify medical professionals' licenses across various health councils. It connects directly to official sources without requiring user registration and advertises the "Thang Rath" Super App.

## Features
- **Centralized Verification**: Links to official verification pages for doctors, dentists, nurses, pharmacists, physical therapists, medical technologists, Thai traditional medicine practitioners, and social workers.
- **Privacy First**: No personal data is stored or processed on this portal.
- **Free to Use**: Instant access without any membership or login requirements.
- **Thang Rath App Promotion**: Includes a prominent call-to-action encouraging citizens to download the Thang Rath Super App for access to over 400+ government services.

## How to run

### 1. Serve locally

Pick any static file server:

```bash
# Option A — Node.js (no install needed)
npx serve .

# Option B — Python 3
python3 -m http.server 8000

# Option C — VS Code
# Install the "Live Server" extension, right-click index.html → Open with Live Server
```

Then open `http://localhost:3000` (or the port shown) in your browser.

---

## Development

The project is a static site with no build pipeline beyond SCSS compilation.

### Prerequisites

- [Dart Sass](https://sass-lang.com/install) — compile SCSS to CSS

### Compile styles

```bash
# One-time build
sass style.scss style.css

# Watch mode (recompiles on save)
sass --watch style.scss style.css
```

`style.css` is committed to the repo so compilation is only needed when editing `style.scss`.

### OG image

Social sharing uses `_media/og-image.webp` (1200 × 630 px). Create this file before deploying so link previews on Facebook, LINE, and WhatsApp render correctly.

---

## Design System

Design tokens and component specs live in [`DESIGN.md`](DESIGN.md).
