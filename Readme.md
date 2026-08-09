# LUMO — Voice Assistant

LUMO is a browser-based, always-listening voice assistant built with vanilla
JavaScript and the Web Speech API. Say **"Lumo"** anywhere in a sentence and
it answers — from general knowledge and calculations to opening apps,
websites, and playing songs directly on YouTube, all inside the same tab.

---

## Features

- **Always-on listening** — the mic restarts itself automatically, no need
  to click the button more than once.
- **Wake word anywhere in the sentence** — "what's the time, Lumo" works
  just as well as "Lumo, what's the time".
- **1,800+ built-in commands** — general knowledge, world capitals, science,
  math helpers, grammar, idioms, jokes, motivational quotes, Excel/Word/
  PowerPoint tips, and more, all answered instantly with no API calls.
- **Open apps & websites hands-free** — say *"open YouTube"* or *"open
  Instagram"* without needing the wake word first. Also supports desktop
  apps that register a URL protocol (VS Code, Spotify, Discord, Zoom, etc.).
- **Play songs on YouTube, same tab** — *"play shape of you"* searches
  YouTube and plays the top result in an embedded player on the page
  itself — no new tab, no page reload.
- **Voice-controlled volume** — *"low volume"*, *"high volume"*,
  *"volume to 40 percent"*, *"max volume"* (ramps up over ~5 seconds),
  *"mute"* / *"unmute"*, *"pause"* / *"resume"*.
- **Chat history sidebar** — every command and its answer is saved
  (`localStorage`) and listed on the left; click any past entry to run it
  again.
- **Text-to-speech replies** — every answer is spoken back using the
  browser's built-in speech synthesis.

---

## File structure

```
lumo_project/
├── index.html          UI: orb animation, sidebar history, embedded YouTube player
├── app_testing.js       Core logic: speech recognition, commandDB, YouTube playback
├── lumo_wakeword.js      (legacy/optional) backend-driven variant — not loaded by index.html
├── server.js             (optional) Node/Express backend that asks Gemini for answers
├── package.json          Dependencies for server.js
└── .env.example           Template for the Gemini API key used by server.js
```

> **Note:** `app_testing.js` is fully self-contained and answers from its own
> local `commandDB` — it does **not** need `server.js` to run. The backend
> files are only relevant if you want to route unmatched questions to an AI
> instead of Google search.

---

## Setup

1. **Install a local server** (any static file server works) — e.g. VS
   Code's "Live Server" extension, or:
   ```bash
   npx serve .
   ```
2. Open `index.html` in **Chrome** (Speech Recognition and the YouTube
   IFrame API are best supported there).
3. Click the mic button once to grant microphone permission — after that,
   LUMO stays listening on its own.

### YouTube song playback (optional but recommended)

To let LUMO actually find and play songs (instead of just opening search
results), you need a free YouTube Data API v3 key:

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and
   create/select a project.
2. **APIs & Services → Library** → search "YouTube Data API v3" → **Enable**.
3. **APIs & Services → Credentials → Create Credentials → API Key**.
4. (Recommended) Restrict the key to your domain under HTTP referrers.
5. Paste it into `app_testing.js`:
   ```js
   const YOUTUBE_API_KEY = 'YOUR_KEY_HERE';
   ```

Without a key, "play `<song>`" still works but opens YouTube search results
instead of playing directly.

### Optional: AI-backed answers (server.js)

If you'd rather have unmatched questions answered by Gemini instead of a
Google search fallback:

```bash
npm install
cp .env.example .env     # then add your GOOGLE_API_KEY inside
npm start
```

This starts a backend at `http://localhost:3000`. Wiring it into the
frontend is not currently connected — `app_testing.js` needs a `fetch()` call
added to reach `/ask` for this to take effect.

---

## How commands work

| You say | What happens |
|---|---|
| `Lumo, what's the capital of France?` | Wake word required for general Q&A — answered from `commandDB`. |
| `open youtube` | **No wake word needed** — anything starting with "open" that matches a known app/site fires immediately. |
| `play perfect by ed sheeran` | **No wake word needed** (unless a song is already playing — see below) — searches YouTube and plays the top result in-page. |
| `Lumo, low volume` / `high volume` / `volume to 60` | Adjusts the embedded player's volume. |
| `Lumo, pause` / `resume` | Pauses/resumes the current song. |

**Why does a song sometimes need "Lumo" even for "play ...”?**
While a song is already playing, the mic can pick up the song's own audio
bleeding through your speakers. To stop that from accidentally re-triggering
playback, the wake-word-free shortcuts are temporarily disabled during
playback — say "Lumo, play `<song>`" instead. Using headphones avoids this
entirely.

---

## Known limitations

- **Chrome / Chromium browsers only** — Speech Recognition relies on
  `webkitSpeechRecognition`, which Firefox and Safari don't support the same
  way.
- **Some videos can't be embedded** — a few official/label videos disable
  embedding; LUMO detects this and opens them in a normal YouTube tab
  instead.
- **Desktop app links depend on what's installed** — commands like *"open
  VS Code"* only work if that app is installed and its URL protocol is
  registered on your machine.
- **Console noise from YouTube's own scripts** (ad-tracking CORS warnings,
  `postMessage` origin notices) is expected and harmless — it comes from
  Google's embedded ad/widget code, not from LUMO's own code.

---

## Credits

Built by **Hridesh Thakur**.