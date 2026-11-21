# Nagrik Saathi — UI and Assistant Update

## What changed
- Replaced the oversized image hero with a compact responsive homepage hero.
- Reduced base typography, card icon sizes, navigation spacing and button sizing.
- Updated the floating assistant panel for desktop and mobile.
- Fixed the assistant script: it now runs in the same JavaScript scope as the site's language and search helpers.
- Added verified helpline entries to `search-index.json`, so the assistant and site search can find helpline names and numbers.
- Added quick prompts for scholarship, pension, documents and cyber-fraud help.

## Build and run locally
From this folder (the one containing `build.py`):

```powershell
python build.py
cd dist
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`.

If `dist` is already your current directory, do not run `cd dist` a second time.

## What this assistant is — and is not
The current assistant is a local search assistant. It searches the site's published, verified search records and links users to the relevant page. It does not call an external AI model and does not need an API key. It should not be described as ChatGPT-like generative AI.

A generative AI chatbot requires a secure server-side endpoint and an API key stored as a server secret. Never put an API key in `assets/app.js` or any public frontend file. The static Cloudflare Pages site alone cannot keep a frontend API key secret.

## Notes
- Existing content records are preserved.
- The build still publishes only records marked `verified`.
- Confirm scheme details and helpline numbers at their official sources before acting.
