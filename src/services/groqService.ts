import { ResearchReport, PageSnippet, ResearchPlan } from "../types";

// Initialize Groq
const getGroqClient = () => {
  const apiKey =
    process.env.GROQ_API_KEY || (import.meta as any).env?.VITE_GROQ_API_KEY;

  if (!apiKey) {
    console.error("GROQ_API_KEY is missing from environment");
    throw new Error(
      "GROQ_API_KEY is missing. Please add your Groq API key in the environment variables.",
    );
  }

  return {
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  };
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

// Helper to call Groq for JSON output
async function generateJsonGroq(
  prompt: string,
  schema: any,
  modelName = "llama-3.3-70b-versatile",
): Promise<any> {
  const { apiKey, baseURL } = getGroqClient();
  console.log("Groq API Key present:", !!apiKey);
  console.log("Groq Model:", modelName);

  try {
    const response = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that outputs JSON. Always respond with valid JSON matching the provided schema.",
          },
          {
            role: "user",
            content: `${prompt}\n\nOutput MUST be valid JSON matching this schema:\n${JSON.stringify(schema, null, 2)}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = `Groq API Error: ${response.statusText}`;
      await logToBackend("ERROR", errorMsg, {
        status: response.status,
        errorData,
      });
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      const errorMsg = "Groq returned an empty response.";
      await logToBackend("ERROR", errorMsg, { modelName, prompt });
      throw new Error(errorMsg);
    }

    return JSON.parse(content);
  } catch (error: any) {
    let userMessage = "An error occurred while communicating with Groq AI.";

    if (error.message?.includes("quota")) {
      userMessage =
        "Groq API quota exceeded. Please try again in a few minutes.";
    } else if (error.message?.includes("API key")) {
      userMessage = "Invalid Groq API key. Please check your configuration.";
    } else if (error instanceof SyntaxError) {
      userMessage = "The AI returned an invalid data format. Please try again.";
    }

    await logToBackend("ERROR", `Groq API Error: ${error.message}`, {
      originalError: error,
      modelName,
      promptSnippet: prompt.substring(0, 100),
    });

    throw new Error(userMessage);
  }
}

// 1. Planner Step
export async function planResearchGroq(
  goal: string,
  mode: string,
  model = "llama-3.3-70b-versatile",
): Promise<ResearchPlan> {
  const prompt = `You are a professional research planner. 
  Goal: ${goal}
  Mode: ${mode}
  
  Produce a research plan including 3-6 key sub-questions and a list of 3-5 search queries.`;

  const schema = {
    type: "object",
    properties: {
      subQuestions: { type: "array", items: { type: "string" } },
      searchQueries: { type: "array", items: { type: "string" } },
    },
    required: ["subQuestions", "searchQueries"],
  };

  return await generateJsonGroq(prompt, schema, model);
}

// 2. Data Gathering Step
export async function fetchPagesGroq(
  goal: string,
  queries: string[],
  model = "llama-3.3-70b-versatile",
): Promise<PageSnippet[]> {
  const prompt = `Act as a high-performance web search engine and scraper. 
  Research Goal: ${goal}
  Queries: ${queries.join(", ")}
  
  Provide 4-6 realistic "scraped" page snippets (title, url, and a 200-word summary of content) that would be found for these queries. 
  Make them highly relevant, data-rich, and informative. Avoid generic filler.`;

  const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        title: { type: "string" },
        url: { type: "string" },
        text: { type: "string" },
      },
      required: ["title", "url", "text"],
    },
  };

  return await generateJsonGroq(prompt, schema, model);
}

// 3. Synthesis Step
export async function synthesizeReportGroq(
  goal: string,
  mode: string,
  plan: ResearchPlan,
  snippets: PageSnippet[],
  planType: string,
  model = "llama-3.3-70b-versatile",
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
    type: "object",
    properties: {
      goal: { type: "string" },
      mode: { type: "string" },
      overview: { type: "string" },
      keyInsights: { type: "array", items: { type: "string" } },
      risksAndGaps: { type: "array", items: { type: "string" } },
      nextSteps: { type: "array", items: { type: "string" } },
      sources: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            url: { type: "string" },
            note: { type: "string" },
          },
          required: ["title", "url"],
        },
      },
      slideOutline: {
        type: "object",
        properties: {
          title: { type: "string" },
          slides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                bullets: { type: "array", items: { type: "string" } },
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

  return await generateJsonGroq(prompt, schema, model);
}
