# Quick Start: Add Groq to InsightSprint

## 3-Minute Setup

### Step 1: Get Your Groq API Key (1 minute)

1. Go to https://console.groq.com/
2. Sign up or log in
3. Click "API Keys" in the sidebar
4. Click "Create API Key"
5. Copy your key (starts with `gsk_`)

### Step 2: Add to Your Project (30 seconds)

Create a `.env` file in your project root:

```bash
GROQ_API_KEY=gsk_your_actual_key_here
```

### Step 3: Test It (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 and try a research query!

## That's It! 🎉

Your app now uses Groq for:

- ⚡ Faster responses (2-4 seconds vs 5-8)
- 💰 Lower costs (~$0.002 per query)
- 🚀 Better performance

## Deploy to Vercel

1. Push to GitHub
2. In Vercel: Settings → Environment Variables
3. Add: `GROQ_API_KEY` = your_key
4. Redeploy

## Verify It's Working

Open browser console (F12) and look for:

```
Using Groq AI for research
```

## Need Help?

See [GROQ-SETUP.md](GROQ-SETUP.md) for detailed instructions.

---

**Pro Tip**: Keep your Gemini key as a fallback:

```bash
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
```

The app will use Groq first, then fall back to Gemini if needed.
