import React from "react";
import { Activity, History, LogIn, LogOut } from "lucide-react";
import { User } from "firebase/auth";

interface NavbarProps {
  user: User | null;
  isLoggingIn: boolean;
  runCount: number;
  plan: "free" | "pro";
  freeLimit: number;
  proLimit: number;
  onLogin: () => void;
  onLogout: () => void;
  onOpenHistory: () => void;
  onOpenPricing: () => void;
}

export default function Navbar({
  user,
  isLoggingIn,
  runCount,
  plan,
  freeLimit,
  proLimit,
  onLogin,
  onLogout,
  onOpenHistory,
  onOpenPricing,
}: NavbarProps) {
  const limit = plan === "pro" ? proLimit : freeLimit;

  return (
    <nav className="w-full border-b-4 border-ink bg-white/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Activity className="text-accent w-6 h-6" />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-widest uppercase">
              InsightSprint
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              V2.0_STABLE
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
          <button
            onClick={onOpenPricing}
            className="hover:text-accent transition-colors"
          >
            Plans
          </button>
          <button className="hover:text-accent transition-colors">Docs</button>
          <button className="hover:text-accent transition-colors">
            Changelog
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-gray-500">
            Usage {runCount} / {limit}
          </span>
          <span
            className={`text-[10px] font-black px-2 py-0.5 border-2 border-ink uppercase ${
              plan === "pro" ? "bg-accent text-white" : "bg-white text-ink"
            }`}
          >
            Plan: {plan}
          </span>

          {plan === "free" && (
            <button
              onClick={onOpenPricing}
              className="hidden sm:inline text-[10px] font-black text-accent hover:underline uppercase tracking-widest"
            >
              Upgrade
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2 border-l-2 border-ink pl-2">
              <button
                onClick={onOpenHistory}
                className="hidden sm:flex items-center gap-1 text-[10px] font-black uppercase hover:text-accent transition-colors"
              >
                <History className="w-4 h-4" />
                History
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-[10px] font-black uppercase hover:text-accent transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className={`flex items-center gap-1 text-[10px] font-black uppercase bg-accent text-white px-3 py-1 border-2 border-ink hover:bg-ink transition-colors ${
                isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoggingIn ? "Logging_In..." : "Login"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
