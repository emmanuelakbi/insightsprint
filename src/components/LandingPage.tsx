import React from "react";
import { motion } from "motion/react";
import {
  Zap,
  Target,
  Cpu,
  ArrowRight,
  Activity,
  Search,
  Database,
  Globe,
} from "lucide-react";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-ink selection:bg-accent selection:text-white overflow-x-hidden">
      {/* Brutalist Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Navigation Rail */}
      <div className="fixed left-0 top-0 bottom-0 w-12 border-r-2 border-ink hidden lg:flex flex-col items-center py-8 gap-12 z-50 bg-white">
        <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-black tracking-[0.3em] uppercase">
          INSIGHT_SPRINT_V2.0
        </div>
        <div className="flex-1 border-l border-ink/20" />
        <Activity className="w-6 h-6 text-accent" />
      </div>

      {/* Hero Section */}
      <main className="lg:pl-12">
        <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-ink text-white px-3 py-1 text-[10px] sm:text-xs font-black tracking-widest uppercase">
                Agentic_Research_Engine
              </span>
              <div className="h-[2px] w-8 sm:w-12 bg-accent" />
            </div>

            <h1 className="text-[clamp(1.6rem,7.5vw,10rem)] font-black leading-[0.85] tracking-tighter uppercase mb-12">
              Deep
              <br />
              <span className="text-accent">Intelligence</span>
              <br />
              At Scale.
            </h1>

            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight max-w-md">
                Automated market intelligence and agentic research pipeline.
                Turn raw goals into comprehensive strategy reports in seconds.
              </p>

              <div className="flex flex-col gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onEnter}
                  className="group relative inline-flex items-center justify-between bg-ink text-white p-6 sm:p-8 border-4 border-ink hover:bg-accent hover:border-accent transition-all duration-300"
                >
                  <span className="text-lg sm:text-2xl lg:text-4xl font-black uppercase tracking-tighter">
                    Enter_Pipeline
                  </span>
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-50">
                  <span>[ 20_FREE_RUNS_REMAINING ]</span>
                  <span>[ NO_CREDIT_CARD_REQUIRED ]</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-24 right-12 hidden xl:block">
            <div className="text-[200px] font-black opacity-[0.03] leading-none select-none">
              01
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-t-4 border-ink bg-ink text-white py-24 px-6 sm:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-[clamp(1rem,5vw,2.5rem)] font-black uppercase tracking-tighter whitespace-nowrap">
                Core_Capabilities
              </h2>
              <div className="flex-1 h-[2px] bg-white/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/20 border border-white/20">
              <FeatureCard
                icon={<Search className="w-8 h-8 text-accent" />}
                number="01"
                title="Autonomous_Gathering"
                desc="Our agents crawl the web, identifying key data points and market signals without manual intervention."
              />
              <FeatureCard
                icon={<Cpu className="w-8 h-8 text-accent" />}
                number="02"
                title="Neural_Synthesis"
                desc="Advanced synthesis algorithms compress massive datasets into actionable strategic intelligence."
              />
              <FeatureCard
                icon={<Target className="w-8 h-8 text-accent" />}
                number="03"
                title="Strategy_Generation"
                desc="Receive structured reports with clear next steps, competitor analysis, and market positioning."
              />
            </div>
          </div>
        </section>

        {/* Stats / Marquee */}
        <section className="py-8 sm:py-12 border-t-4 border-ink overflow-hidden bg-accent text-white">
          <div className="flex whitespace-nowrap animate-marquee font-black text-4xl sm:text-6xl uppercase tracking-tighter py-4">
            <span className="mx-8">Market Intelligence</span>
            <span className="mx-8 text-ink">×</span>
            <span className="mx-8">Agentic Research</span>
            <span className="mx-8 text-ink">×</span>
            <span className="mx-8">Deep Synthesis</span>
            <span className="mx-8 text-ink">×</span>
            <span className="mx-8">Strategic Insight</span>
            <span className="mx-8 text-ink">×</span>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 sm:px-12 lg:px-24 border-t-4 border-ink flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-accent" />
            <span className="font-black text-xl uppercase">InsightSprint</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-accent transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              API_Access
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Enterprise
            </a>
          </div>
          <div className="text-[10px] font-black uppercase opacity-50">
            © 2026_GENAI_ZURICH_HACKATHON
          </div>
        </footer>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: fit-content;
        }
      `,
        }}
      />
    </div>
  );
}

function FeatureCard({
  icon,
  number,
  title,
  desc,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-ink p-6 sm:p-12 hover:bg-zinc-900 transition-colors group overflow-hidden">
      <div className="flex justify-between items-start mb-8">
        {icon}
        <span className="text-xs font-black opacity-30 group-hover:opacity-100 transition-opacity">
          [{number}]
        </span>
      </div>
      <h3 className="text-[clamp(0.85rem,4vw,1.5rem)] sm:text-xl md:text-2xl font-black uppercase mb-4 tracking-tighter leading-none break-all">
        {title}
      </h3>
      <p className="text-zinc-400 font-bold leading-snug">{desc}</p>
    </div>
  );
}
