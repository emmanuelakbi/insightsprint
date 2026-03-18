# InsightSprint: Deep Intelligence at Scale

> **Transform vague research goals into structured market intelligence in minutes, not weeks.**

InsightSprint is an AI-powered market research platform that automates the entire research workflow using agentic AI. Built for the GenAI Zurich Hackathon 2026.

## 🚀 What It Does

- **Market Landscape Analysis** - Understand your industry, trends, and opportunities
- **Competitor Intelligence** - Track competitors and identify market gaps
- **Customer Research** - Validate customer needs and pain points
- **Go-to-Market Strategy** - Build actionable plans from your insights

Simply ask your research question and get comprehensive analysis with:

- Executive overview
- Key insights (data-driven bullets)
- Risks & gaps analysis
- Strategic next steps
- Pitch deck outline (slide-ready)
- Verified sources

## ✨ Key Features

- **Agentic AI Workflow** - 4-step autonomous research pipeline (Planning → Gathering → Synthesis → Strategy)
- **Dual AI Provider Support** - Choose between Groq (faster) or Gemini (more comprehensive)
- **Real-time Processing** - Watch your research unfold step-by-step
- **Research History** - Save and revisit past research (requires login)
- **Free & Pro Plans** - 20 research runs per day on both plans
- **Export-Ready** - Slide deck outlines ready for presentation

## 🛠️ Tech Stack

**Frontend:**

- React 19 + TypeScript
- Vite (fast development)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Lucide React (icons)

**Backend:**

- Express.js server
- Firebase Authentication (Google sign-in)
- Firebase Firestore (research history)

**AI Providers:**

- **Groq AI** - `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`
- **Gemini AI** - `gemini-2.0-flash`, `gemini-1.5-pro`, and more

**Deployment:**

- Vercel (hosting & CI/CD)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Groq API key (recommended) or Gemini API key

## 🏃 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd insightsprint
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
# Choose one or both AI providers

# Option A: Groq (Recommended - faster and cheaper)
GROQ_API_KEY=your_groq_api_key_here

# Option B: Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# App URL (for local development)
APP_URL="http://localhost:3000"
```

**Get your API keys:**

- Groq: https://console.groq.com/
- Gemini: https://aistudio.google.com/app/apikey

### 4. Run the development server

```bash
npm run dev
```

### 5. Open your browser

Navigate to http://localhost:3000

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - `GROQ_API_KEY` or `GEMINI_API_KEY`
   - `APP_URL` (Vercel will auto-populate this)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add GROQ_API_KEY
vercel env add APP_URL

# Deploy to production
vercel --prod
```

## 🎯 Usage

1. **Choose a template** or enter your own research goal
2. **Select AI provider** (Groq or Gemini) and model
3. **Click "RUN_PROC"** to start the research
4. **Watch the pipeline** process your request in real-time
5. **Review results** - overview, insights, risks, next steps, and sources
6. **Save to history** (login required) for future reference

## 🔧 Configuration

### AI Provider Selection

The app automatically detects which AI provider to use based on:

1. The model you select in the UI
2. Available API keys in your environment

**Groq Models:**

- `llama-3.3-70b-versatile` (recommended)
- `llama-3.1-8b-instant`

**Gemini Models:**

- `gemini-2.0-flash` (recommended)
- `gemini-2.0-flash-lite`
- `gemini-1.5-flash`
- `gemini-1.5-pro`
- `gemini-2.5-pro-preview-06-05`

### Firebase Setup (Optional)

Firebase is used for authentication and research history. If you want to enable these features:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Google Authentication
3. Create a Firestore database
4. Update `src/firebase.ts` with your Firebase config

## 📚 Documentation

- [GROQ-SETUP.md](GROQ-SETUP.md) - Detailed Groq integration guide
- [GROQ-INTEGRATION-SUMMARY.md](GROQ-INTEGRATION-SUMMARY.md) - Integration overview
- [QUICK-START-GROQ.md](QUICK-START-GROQ.md) - Quick start with Groq
- [MODEL-SELECTION-UPDATE.md](MODEL-SELECTION-UPDATE.md) - Model selection details

## 🏆 Hackathon Project

Built for **GenAI Zurich Hackathon 2026**

**Problem:** Market research takes weeks, costs thousands, and requires entire teams.

**Solution:** InsightSprint delivers professional-grade market intelligence in minutes using agentic AI workflows.

**Impact:**

- 100x speed improvement (weeks → minutes)
- 1000x cost reduction
- Accessible to everyone, not just enterprises

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🔗 Links

- [Groq Console](https://console.groq.com/)
- [Gemini API](https://aistudio.google.com/app/apikey)

## 💡 Tips

- **Use Groq for speed** - Groq models are significantly faster
- **Use Gemini for depth** - Gemini models provide more comprehensive analysis
- **Save your research** - Login with Google to save research history
- **Try templates** - Use built-in templates for common research types
- **Export slides** - Use the pitch deck outline for presentations

---

**Built with ❤️ for the GenAI Zurich Hackathon 2026**
