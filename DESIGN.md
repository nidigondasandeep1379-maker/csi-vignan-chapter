# Design Brief

## Direction
**CSI Vignan Authority** — Premium dark tech organization aesthetic. Deep navy foundation with strategic gold accents. Refined, authoritative, unforgettable.

## Tone
Sophisticated editorial meets tech authority. Dark, grounded, premium without corporate sterility. Confident and purposeful.

## Differentiation
Dark navy (13% L) + vibrant gold accent (68% L, 75 H) creates visual tension—refined but unmissable. Gold appears only on CTAs, badges, active states, never scattered. Typography hierarchy through Space Grotesk bold + DM Sans regular enforces professional credibility.

## Color Palette

| Token        | OKLCH          | Role                           |
| ------------ | -------------- | ------------------------------ |
| background   | 0.13 0.02 255  | Dark forest navy, page base    |
| foreground   | 0.92 0.01 255  | Crisp white text               |
| card         | 0.17 0.022 255 | Elevated card surfaces         |
| primary      | 0.48 0.15 260  | Secondary interactive elements |
| accent       | 0.68 0.18 75   | Gold CTAs, highlights, badges  |
| muted        | 0.22 0.025 255 | Subtle backgrounds, dividers    |
| destructive  | 0.55 0.22 25   | Warning/error states           |

## Typography
- Display: Space Grotesk — bold headlines, hero text, strong authority
- Body: DM Sans — clean paragraphs, labels, readable UI
- Mono: Geist Mono — code blocks, data
- Scale: hero `text-5xl md:text-7xl`, h2 `text-3xl md:text-5xl`, label `text-sm uppercase`, body `text-base`

## Elevation & Depth
Subtle layered surface hierarchy via background lightness (background → card → popover). Soft shadows at card borders. No dramatic elevation—refined and minimal.

## Structural Zones

| Zone    | Background         | Border                    | Notes                                    |
| ------- | ------------------ | ------------------------- | ---------------------------------------- |
| Header  | card (0.17 L)      | border-b 1px muted        | Sticky, navigation + logo                |
| Hero    | background (0.13L) | —                         | Full-width, dual logo side-by-side       |
| Content | background (0.13L) | —                         | Sections alternate: card/muted           |
| Footer  | card (0.17 L)      | border-t 1px muted        | Navy foundation with accent links        |

## Spacing & Rhythm
6px baseline radius (no rounded-full pills). Sections separated by 4rem vertical gaps. Card padding 1.5rem. Micro-spacing via gaps (1rem, 2rem, 3rem). Dense but breathing.

## Component Patterns
- Buttons: solid accent background, accent-foreground text, hover scale+shadow
- Cards: card background, subtle border, no shadow (or xs shadow only)
- Badges: accent background + text, small rounded
- Links: foreground text, accent-underline on hover

## Motion
- Entrance: fade in + subtle slide up on scroll (50ms stagger per item)
- Hover: color transition 0.2s, scale 1.02 on interactive elements
- Decorative: none—keep motion minimal and purposeful

## Constraints
- No color gradients (solid tokens only)
- Accent used sparingly—only on primary CTAs and active states
- Header sticky on scroll
- Dark mode always-on (no light mode option)
- Gold never on text body (accent-foreground on accent only)
- Images use full width in hero and gallery

## Signature Detail
Subtle gold accent line (border-b-2 border-accent) appears beneath section headers and on hover states—a refined detail that ties the design together without visual noise.
