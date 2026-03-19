# InsightSprint: Deep Intelligence at Scale

## Inspiration

Market research is broken. Traditional methods take weeks, cost thousands, and require entire teams. By the time you get results, the market has already changed. We built InsightSprint because we believed fast, affordable market intelligence should be accessible to everyone - not just enterprises with big budgets.

## What it does

InsightSprint transforms vague research goals into structured market intelligence using agentic AI workflows. Simply ask your research question and get comprehensive analysis in minutes:

- **Market Landscape Analysis** - Understand your industry, trends, and opportunities
- **Competitor Intelligence** - Track competitors and identify gaps
- **Customer Research** - Validate customer needs and pain points
- **Go-to-Market Strategy** - Build actionable plans from your insights

The platform automatically structures your research, gathers data, analyzes patterns, and delivers actionable insights with slide-ready summaries.

## How we built it

We built InsightSprint using a modern tech stack focused on speed and reliability:

- **Frontend**: React 19 with TypeScript, Vite for fast development
- **Styling**: Tailwind CSS for rapid UI development
- **Animations**: Framer Motion for smooth interactions
- **Backend**: Express.js server with Firebase integration
- **AI Providers**: Gemini AI and Groq AI for flexible, cost-effective processing
- **Database**: Firebase Firestore for storing research history
- **Authentication**: Firebase Authentication with Google sign-in

The core innovation is our agentic AI workflow that automatically plans, gather, and synthesize research without manual intervention.

## Challenges we ran into

1. **AI Response Consistency**: Different models return data in different formats. We solved this by implementing strict JSON schema validation and fallback mechanisms.

2. **Context Window Management**: Some models have limited context windows. We optimized prompts and implemented smart data aggregation to work within constraints.

3. **Real-time Updates**: Keeping research history synchronized across users required careful Firebase configuration and real-time listener management.

4. **Prompt Engineering**: Getting consistent, high-quality outputs from AI required extensive testing and refinement of system prompts and schema definitions.

## Accomplishments that we're proud of

- **100x Speed Improvement**: Reduced research time from weeks to minutes
- **Cost Reduction**: Made professional-grade research accessible at 1/1000th the cost
- **Agentic AI Implementation**: Built a robust multi-step AI workflow that handles complex research tasks autonomously
- **Dual AI Provider Support**: Seamlessly support both Gemini and Groq with automatic provider selection
- **Production-Ready**: Built a complete, deployable application with proper error handling and logging

## What we learned

1. **Prompt Engineering is Critical**: The quality of your output depends heavily on how you structure your prompts and schemas.

2. **Model Selection Matters**: Different models have different strengths. Groq is faster, Gemini is more consistent for complex tasks.

3. **JSON Mode is Essential**: Using `response_format: { type: "json_object" }` ensures reliable data parsing.

4. **Error Handling is Non-Negotiable**: AI APIs can fail for many reasons. Comprehensive error handling makes or breaks the user experience.

5. **Developer Experience Matters**: Clean, well-structured code with good abstractions (like our unified AI service) makes future development much easier.

## What's next for InsightSprint

- **Advanced Filtering**: Add more granular control over research parameters
- **Team Collaboration**: Real-time collaboration features for research teams
- **Automated Monitoring**: Set up continuous research monitoring for markets and competitors
- **Export Options**: More export formats (PDF, CSV, Notion integration)
- **Custom Workflows**: Allow users to create and save custom research workflows
- **Multi-language Support**: Support research in multiple languages
- **Data Visualization**: Built-in charts and graphs for insights

## Built with

**Languages & Frameworks:**

- TypeScript
- React 19
- Vite
- Express.js
- Node.js

**AI & APIs:**

- Google Gemini AI (gemini-2.0-flash, gemini-1.5-pro)
- Groq AI (llama-3.3-70b-versatile, llama-3.1-8b-instant)

**Cloud & Infrastructure:**

- Firebase (Authentication, Firestore)
- Vercel (Deployment)

**Styling & UI:**

- Tailwind CSS
- Framer Motion
- Lucide React (Icons)

**Development Tools:**

- GitHub (Version control)
- Vercel (CI/CD, hosting)
- VS Code (Development)
