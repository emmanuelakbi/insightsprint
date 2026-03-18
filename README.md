<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1ad5a1e7-8c84-48ae-a253-f75cec0251f6

## AI Provider Support

InsightSprint supports two AI providers:

- **Groq** (Recommended) - Faster and more cost-effective
- **Gemini** - Google's AI model

See [GROQ-SETUP.md](GROQ-SETUP.md) for detailed setup instructions.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your AI provider (choose one or both):

   **Option A: Groq (Recommended)**

   ```bash
   # Create .env file
   echo "GROQ_API_KEY=your_groq_api_key_here" > .env
   ```

   Get your key at: https://console.groq.com/

   **Option B: Gemini**

   ```bash
   # Create .env file
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Deploy to Vercel

1. Push your code to GitHub
2. Import repository to Vercel
3. Add environment variables:
   - `GROQ_API_KEY` (recommended) or `GEMINI_API_KEY`
4. Deploy!

See [GROQ-SETUP.md](GROQ-SETUP.md) for detailed deployment instructions.
