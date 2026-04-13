# Archimap Design Tokens

## Palette: Warm Art Deco

NYC Art Deco walking tour guide. Premium architectural feel, warm and inviting. Light mode with cream/ivory base, gold accents, and architectural green as secondary.

### Backgrounds

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FAF7F0` | Page background (warm ivory) |
| `--color-surface` | `#F2EDE4` | Cards, panels, popups (parchment) |
| `--color-surface-hover` | `#E8E1D5` | Surface hover states |

### Text

| Token | Value | Usage |
|---|---|---|
| `--color-text` | `#2D2D2D` | Primary body text (charcoal) |
| `--color-text-muted` | `#6B6B6B` | Secondary text, captions |
| `--color-text-subtle` | `#9B9B9B` | Tertiary text, placeholders |

### Borders

| Token | Value | Usage |
|---|---|---|
| `--color-border` | `#D4CFC5` | Default borders (warm gray) |
| `--color-border-hover` | `#B8B1A4` | Border hover states |

### Accent: Art Deco Gold

| Token | Value | Usage |
|---|---|---|
| `--color-accent` | `#B8860B` | Primary accent (dark goldenrod) |
| `--color-accent-hover` | `#996F09` | Accent hover/pressed state |
| `--color-accent-dim` | `rgba(184, 134, 11, 0.1)` | Accent backgrounds, highlights |

### Secondary: Architectural Green

| Token | Value | Usage |
|---|---|---|
| `--color-secondary` | `#2D5F4A` | Route lines, map elements |
| `--color-secondary-dim` | `rgba(45, 95, 74, 0.1)` | Secondary backgrounds |

## Typography

- **Display:** Instrument Serif (headers, hero text, building names)
- **Body:** Inter (descriptions, navigation, UI elements)

## Anti-patterns

- No dark mode. The warm ivory base communicates premium print/architectural guide.
- No pure white (#FFFFFF). Always use the cream/ivory tokens.
- No pure black (#000000). Charcoal (#2D2D2D) is the darkest text.
- No saturated blues or purples. Gold and green are the only color accents.

## Map

Leaflet with warm theme overrides. Light tile layer, warm popups with parchment background and subtle box shadows. Map container background matches `--color-bg`.
