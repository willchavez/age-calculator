# Age Calculator

A tiny, client‑side age calculator website. Enter a start date (today or earlier) and it shows the exact difference in years, months, and days. Includes a Light/Dark theme toggle with persistence.

## Features

- Validates against future dates
- Calculates age in years, months, days
- Light/Dark mode with localStorage persistence
- Responsive, accessible UI

## Getting Started

No build required.

1. Clone the repo
2. Open `index.html` in your browser

## Usage

- Pick a date using the date input
- Click "Calculate age"
- Use the theme toggle in the top‑left to switch themes

## Files

- `index.html` – markup and layout
- `styles.css` – styles and theme variables (`:root` and `:root[data-theme="light"]`)
- `script.js` – date validation, age calculation, and theme toggle

## Theming

The site uses CSS variables. Light mode is enabled by setting `data-theme="light"` on the root element. JS handles toggling and persistence.

```css
:root {
  /* dark defaults */
}
:root[data-theme="light"] {
  /* light overrides */
}
```

## License

MIT
