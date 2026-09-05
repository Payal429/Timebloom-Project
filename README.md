# TIMEBLOOM 🌱

TIMEBLOOM is a small memory-garden web app. Users create an account, plant memories, choose flowers, and open memories as a 3D scroll-controlled blooming experience.

## Stack
HTML5, CSS3, vanilla JavaScript, Three.js via CDN, Wikipedia REST API, localStorage.

## Run
Open `index.html` directly, or use VS Code Live Server. The 3D memory page needs internet access to load Three.js from the CDN. The create page uses Wikipedia as the external API and has a fallback when that API fails.

## Test
Open `tests/index.html` to run four browser-based edge-case tests.

## Render
Create a Static Site from this repository. No build command is required. Publish directory: `.`. This is a static demo; accounts and memories live in each browser's localStorage rather than a shared production database.
