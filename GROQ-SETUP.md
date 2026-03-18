# Groq AI Integration

InsightSprint now supports **Groq AI** as an alternative to Gemini for faster and more cost-effective AI processing.

## Why Groq?

- ⚡ **Faster**: Up to 10x faster inference speeds
- 💰 **Cheaper**: More cost-effective API pricing
- 🚀 **High Performance**: Optimized for production workloads
- 🔄 **Drop-in Replacement**: Works seamlessly with existing code

## Setup Instructions

### 1. Get Your Groq API Key

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy your API key

### 2. Add to Environment Variables

#### Local Development

Create or update your `.env` file:

```bash
# Add your Groq API key
GROQ_API_KEY=gsk_your_api_key_here

# Optional: Keep Gemini as fallback
GEMINI_API_KEY=your_gemini_key_here
```

#### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**
5. Redeploy your application

### 3. How It Works

The app automatically detects which AI provider to use:

1. **If `GROQ_API_KEY` is set**: Uses Groq (recommended)
2. **If only `GEMINI_API_KEY` is set**: Uses Gemini
3. **If neither is set**: Shows error message

## Supported Models

### Groq Models (Default: llama-3.3-70b-versatile)

- `llama-3.3-70b-versatile` - Best balance of speed and quality (recommended)
- `llama-3.1-70b-versatile` - Fast and reliable
- `mixtral-8x7b-32768` - Good for longer contexts
- `gemma2-9b-it` - Lightweight and fast

### Gemini Models (Default: gemini-2.0-flash)

- `gemini-2.0-flash` - Fast and efficient
- `gemini-1.5-pro` - More capable, slower
- `gemini-1.5-flash` - Balanced option

## Testing Your Setup

After adding your Groq API key:

1. Start your development server: `npm run dev`
2. Open the browser console (F12)
3. Look for the message: `"Using Groq AI for research"` or `"Using Gemini AI for research"`
4. Run a research query
5. Check that it completes successfully

## Troubleshooting

### "No AI provider configured" Error

**Problem**: Neither Groq nor Gemini API key is set.

**Solution**: Add at least one API key to your `.env` file:

```bash
GROQ_API_KEY=your_key_here
```

### "Invalid Groq API key" Error

**Problem**: The API key is incorrect or expired.

**Solution**:

1. Verify your API key at [https://console.groq.com/](https://console.groq.com/)
2. Generate a new key if needed
3. Update your `.env` file
4. Restart your development server

### Groq API Quota Exceeded

**Problem**: You've hit your Groq API rate limit.

**Solution**:

1. Wait a few minutes for the rate limit to reset
2. Or add a Gemini API key as fallback
3. The app will automatically use Gemini if Groq fails

### Environment Variables Not Loading

**Problem**: Changes to `.env` not taking effect.

**Solution**:

1. Stop your development server (Ctrl+C)
2. Restart it: `npm run dev`
3. Clear browser cache if needed
4. Check that `.env` is in the root directory (not in `src/`)

## API Key Security

### ⚠️ Important Security Notes

1. **Never commit API keys to Git**
   - `.env` is already in `.gitignore`
   - Never hardcode keys in your code

2. **Use environment variables**
   - Local: `.env` file
   - Production: Vercel environment variables

3. **Rotate keys regularly**
   - Generate new keys periodically
   - Revoke old keys in the console

4. **Monitor usage**
   - Check your Groq dashboard for usage
   - Set up billing alerts

## Cost Comparison

### Groq Pricing (Approximate)

- **llama-3.3-70b-versatile**: $0.59 per 1M input tokens, $0.79 per 1M output tokens
- **Free tier**: Generous free credits for testing

### Gemini Pricing (Approximate)

- **gemini-2.0-flash**: Free tier available, then pay-as-you-go
- **gemini-1.5-pro**: Higher cost for advanced features

**Recommendation**: Start with Groq for better performance and lower costs.

## Performance Comparison

Based on typical InsightSprint research queries:

| Provider             | Average Response Time | Cost per Query |
| -------------------- | --------------------- | -------------- |
| Groq (llama-3.3-70b) | 2-4 seconds           | ~$0.002        |
| Gemini (2.0-flash)   | 5-8 seconds           | ~$0.003        |

_Times may vary based on query complexity and network conditions_

## Switching Between Providers

You can easily switch between Groq and Gemini:

### Use Groq (Recommended)

```bash
# .env
GROQ_API_KEY=your_groq_key
# GEMINI_API_KEY=your_gemini_key  # commented out
```

### Use Gemini

```bash
# .env
# GROQ_API_KEY=your_groq_key  # commented out
GEMINI_API_KEY=your_gemini_key
```

### Use Both (Groq Primary, Gemini Fallback)

```bash
# .env
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
```

The app will prefer Groq if both are available.

## Advanced Configuration

### Custom Model Selection

To use a different model, you can modify `src/services/aiService.ts`:

```typescript
// Change default Groq model
return groqService.planResearchGroq(goal, mode, "mixtral-8x7b-32768");

// Change default Gemini model
return geminiService.planResearch(goal, mode, "gemini-1.5-pro");
```

## Support

### Groq Support

- Documentation: [https://console.groq.com/docs](https://console.groq.com/docs)
- Discord: [https://groq.com/discord](https://groq.com/discord)

### InsightSprint Issues

- Check console logs for error messages
- Verify API keys are correctly set
- Ensure you have internet connectivity
- Try with a simpler research query first

## Next Steps

1. ✅ Add your Groq API key to `.env`
2. ✅ Restart your development server
3. ✅ Test with a research query
4. ✅ Deploy to Vercel with environment variables
5. ✅ Monitor usage in Groq console

Enjoy faster, more cost-effective AI-powered research! 🚀
