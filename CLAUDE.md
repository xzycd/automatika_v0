# Automatika — Project Notes

Single-file landing page for an AI automation service targeting Lithuanian small businesses (dental clinics, sports clubs, beauty salons, service businesses).

## Files

- `ai_automatika_2026.html` — the entire site. Inline CSS, inline JS, Tailwind via CDN. No build step.
- `ai_automatika_2026.js` — orphaned (not loaded by the HTML). Safe to ignore.
- `content.json` — orphaned research content from earlier subagent run. Not loaded.
- `CLAUDE.md` — this file.

## Stack

- Tailwind CSS via CDN (`https://cdn.tailwindcss.com`)
- Font Awesome 6.6 icons (CDN)
- Google Fonts: Inter + Instrument Serif
- No bundler, no package.json, no node_modules. Open the HTML in a browser to view.

## Design system

- Editorial light direction: warm cream backgrounds (`#FAF7F2`), deep green accent (`#0C4A2F`), Instrument Serif italics for emphasis on Inter body.
- CSS vars at the top of `<style>` (`--bg`, `--ink`, `--accent`, etc.). Edit there, not inline.
- One radius scale: `rounded-full` for pills/buttons, `rounded-2xl` (16px) for cards.
- One accent color, no purple gradients, no AI glow.

## Content conventions

- Bilingual via `data-lt` + `data-en` attributes. JS swaps `textContent` on toggle.
- Default LT, lang preference persisted in `localStorage`.
- **Register: `Jūs` (formal/respectful)** throughout — target audience is small-business owners 35+. The only exception is the BEFORE/AFTER flow rows where `tu`-style internal monologue is intentional.
- **No em-dashes (`—`) or en-dashes (`–`) anywhere visible.** Use regular hyphen (`-`) or restructure the sentence.
- Numbers and currency follow Lithuanian: `1 390 €`, `4,33`, etc.

## Local preview

No build step. Either:
- Open `ai_automatika_2026.html` directly in a browser (`file://`), or
- Serve via `python3 -m http.server 8080` from this directory.

A `.claude/launch.json` exists with a configured static server.

## Adding new sections

- Stick to the existing rhythm: `<section class="py-24 md:py-32">` with `<hr class="hr-line">` between major blocks.
- Eyebrow labels (`<p class="eyebrow">`) are rationed — at most one per 3 sections. Don't add a small uppercase label above every headline.
- Cards use `.card` + `.card-hover`. Don't invent new card variants.

## Things to NOT do

- Don't switch the body font to anything other than Inter (or the existing Instrument Serif italic for emphasis).
- Don't add `window.addEventListener('scroll', ...)` directly — use the existing `rAF`-batched handler.
- Don't add fake social-proof toasts, fake testimonials with invented names, or div-based fake product screenshots.
- Don't insert generic placeholder names like `[Vardas]` / `[Name]` — pick a real founder name and use it consistently.
