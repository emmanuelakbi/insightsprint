import { GoogleGenAI, Type } from "@google/genai";
import { ResearchReport, PageSnippet, ResearchPlan, PlanType } from "../types";

// Initialize Gemini
const getAI = () => {
  // In AI Studio, the key is injected via vite.config.ts define
  // We check both process.env (defined in vite.config.ts) and import.meta.env (standard Vite)
  const apiKey =
    process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing from environment");
    throw new Error(
      "GEMINI_API_KEY is missing. Please ensure it is configured in the AI Studio Secrets panel.",
    );
  }

  return new GoogleGenAI({ apiKey });
};

// Check if Groq is enabled
const isGroqEnabled = () => {
  const apiKey =
    process.env.GROQ_API_KEY || (import.meta as any).env?.VITE_GROQ_API_KEY;
  return !!apiKey;
};

// Helper to log errors to the backend
async function logToBackend(level: string, message: string, details?: any) {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, message, details }),
    });
  } catch (e) {
    console.error("Failed to log to backend:", e);
  }
}

// Helper to call Gemini for JSON output
async function generateJson(
  prompt: string,
  schema: any,
  modelName = "gemini-2.0-flash",
) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    if (!response.text) {
      const errorMsg =
        "Gemini returned an empty response. This might be due to safety filters or a model error.";
      await logToBackend("ERROR", errorMsg, { modelName, prompt });
      throw new Error(errorMsg);
    }

    return JSON.parse(response.text);
  } catch (error: any) {
    let userMessage = "An error occurred while communicating with the AI.";

    if (error.message?.includes("quota")) {
      userMessage =
        "AI service quota exceeded. Please try again in a few minutes.";
    } else if (error.message?.includes("safety")) {
      userMessage =
        "The request was blocked by AI safety filters. Please try rephrasing your goal.";
    } else if (error.message?.includes("API key")) {
      userMessage = "Invalid API key. Please check your configuration.";
    } else if (error instanceof SyntaxError) {
      userMessage = "The AI returned an invalid data format. Please try again.";
    }

    await logToBackend("ERROR", `Gemini API Error: ${error.message}`, {
      originalError: error,
      modelName,
      promptSnippet: prompt.substring(0, 100),
    });

    throw new Error(userMessage);
  }
}

// 1. Planner Step
export async function planResearch(
  goal: string,
  mode: string,
  model = "gemini-2.0-flash",
): Promise<ResearchPlan> {
  const prompt = `You are a professional research planner. 
  Goal: ${goal}
  Mode: ${mode}
  
  Produce a research plan including 3-6 key sub-questions and a list of 3-5 search queries.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      subQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
      searchQueries: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["subQuestions", "searchQueries"],
  };

  return await generateJson(prompt, schema, model);
}

// 2. Data Gathering Step
export async function fetchPages(
  goal: string,
  queries: string[],
  model = "gemini-2.0-flash",
): Promise<PageSnippet[]> {
  const prompt = `Act as a high-performance web search engine and scraper. 
  Research Goal: ${goal}
  Queries: ${queries.join(", ")}
  
  Provide 4-6 realistic "scraped" page snippets (title, url, and a 200-word summary of content) that would be found for these queries. 
  Make them highly relevant, data-rich, and informative. Avoid generic filler.`;

  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        url: { type: Type.STRING },
        text: { type: Type.STRING },
      },
      required: ["title", "url", "text"],
    },
  };

  return await generateJson(prompt, schema, model);
}

// 3. Synthesis Step
export async function synthesizeReport(
  goal: string,
  mode: string,
  plan: ResearchPlan,
  snippets: PageSnippet[],
  planType: PlanType,
  model = "gemini-2.0-flash",
): Promise<ResearchReport> {
  const isPro = planType === "pro";
  const prompt = `You are an elite market analyst and strategist. 
  Goal: ${goal}
  Mode: ${mode}
  Sub-questions: ${plan.subQuestions.join(", ")}
  Plan Level: ${planType.toUpperCase()}
  
  Context (Scraped Data):
  ${JSON.stringify(snippets)}
  
  Synthesize this into a structured ResearchReport. 
  ${isPro ? "- Provide a deep, comprehensive analysis with extensive detail." : "- Provide a concise, high-level summary suitable for a quick overview."}
  - Overview: ${isPro ? "3-5" : "1-2"} paragraphs of high-level context.
  - Key Insights: ${isPro ? "8-12" : "3-5"} concise, data-driven bullets.
  - Risks & Gaps: ${isPro ? "5-8" : "2-4"} critical bullets.
  - Next Steps: ${isPro ? "5-8" : "2-4"} action-oriented, strategic bullets.
  - Sources: Map the snippets used.
  - Slide Outline: Create a ${isPro ? "6-8" : "3-4"} slide pitch deck outline based on this research. Each slide needs a title and 3-5 bullets.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      goal: { type: Type.STRING },
      mode: { type: Type.STRING },
      overview: { type: Type.STRING },
      keyInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
      risksAndGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
      nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
      sources: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            url: { type: Type.STRING },
            note: { type: Type.STRING },
          },
          required: ["title", "url"],
        },
      },
      slideOutline: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["title", "bullets"],
            },
          },
        },
        required: ["title", "slides"],
      },
    },
    required: [
      "goal",
      "mode",
      "overview",
      "keyInsights",
      "risksAndGaps",
      "nextSteps",
      "sources",
      "slideOutline",
    ],
  };

  return await generateJson(prompt, schema, model);
}
