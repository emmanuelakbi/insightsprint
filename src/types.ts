export type PlanType = 'free' | 'pro';

export interface SavedResearch {
  id: string;
  uid: string;
  goal: string;
  mode: string;
  createdAt: string;
  report: ResearchReport;
}

export interface ResearchReport {
  goal: string;
  mode: "market_landscape" | "competitor_analysis" | "hackathon_scouting" | "custom";
  overview: string;
  keyInsights: string[];       // 5–10 concise bullets
  risksAndGaps: string[];      // 3–7 bullets
  nextSteps: string[];         // 3–7 bullets, action-oriented
  sources: {
    title: string;
    url: string;
    note?: string;
  }[];
  slideOutline?: {
    title: string;
    slides: {
      title: string;
      bullets: string[];
    }[];
  };
}

export interface PageSnippet {
  title: string;
  url: string;
  text: string;
}

export interface ResearchPlan {
  subQuestions: string[];
  searchQueries: string[];
}

export type StepStatus = 'idle' | 'loading' | 'done' | 'error';

export interface PipelineStep {
  id: string;
  label: string;
  status: StepStatus;
}
