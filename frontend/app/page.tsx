"use client";

import { useState } from "react";
import {
  LayoutPanelLeft,
  FileText,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

type ViewMode = "analyzer" | "simulator";

export default function Home() {
  const [view, setView] = useState<ViewMode>("analyzer");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isFocusMode = view === "simulator";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col border-r border-[color:var(--border-subtle)]/40 bg-[radial-gradient(circle_at_top,_#111827,_#020617)]/95 transition-[width,opacity] duration-150 ease-out ${
          isFocusMode && sidebarCollapsed ? "w-0 opacity-0" : "w-72 opacity-100"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-100">
                Resume Intelligence
              </span>
              <span className="text-xs text-slate-500">
                ATS Analyzer · Mock Interview
              </span>
            </div>
          </div>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          <SidebarItem
            icon={LayoutPanelLeft}
            label="Analyzer"
            active={view === "analyzer"}
            onClick={() => {
              setView("analyzer");
              setSidebarCollapsed(false);
            }}
          />
          <SidebarItem
            icon={MessageCircle}
            label="Interview Simulator"
            active={view === "simulator"}
            onClick={() => setView("simulator")}
          />
        </nav>

        <div className="mt-auto border-t border-[color:var(--border-subtle)]/40 px-5 py-4 text-xs text-slate-500">
          Designed for low-light, high-focus sessions. No distractions, only
          signal.
        </div>
      </aside>

      {/* Main content */}
      <main className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-[color:var(--border-subtle)]/40 px-6">
          <div className="flex items-center gap-3">
            {isFocusMode && (
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-subtle)]/60 bg-black/20 text-slate-400 transition-colors duration-150 hover:border-slate-500 hover:text-slate-200"
                onClick={() => setSidebarCollapsed((prev) => !prev)}
                aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 rotate-90" />
                )}
              </button>
            )}
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {view === "analyzer" ? "Analyzer View" : "Simulator View"}
              </span>
              <h1 className="text-sm font-medium text-slate-100">
                {view === "analyzer"
                  ? "Optimize your resume for modern ATS pipelines"
                  : "Rehearse interviews in a focused, low-friction space"}
              </h1>
            </div>
          </div>
        </header>

        {view === "analyzer" ? <AnalyzerView /> : <SimulatorView />}
      </main>
    </div>
  );
}

type SidebarItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors duration-150 ${
        active
          ? "bg-[color:var(--accent-soft)] text-slate-50"
          : "text-slate-400 hover:bg-slate-900/70 hover:text-slate-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

function AnalyzerView() {
  return (
    <div className="flex flex-1 gap-6 p-6">
      {/* Left: PDF preview / upload */}
      <section className="glass-panel relative flex w-[42%] flex-col overflow-hidden p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-500" />
            <span>Resume Preview</span>
          </div>
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] tracking-wide text-slate-400">
            PDF · Private to this browser
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-[color:var(--border-subtle)]/40 bg-slate-900/30">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/40 text-[color:var(--accent)]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-100">
                Drop your resume PDF here
              </p>
              <p className="text-xs text-slate-500">
                I&apos;ll parse it like a hiring manager and a modern ATS.
              </p>
            </div>
            <button className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-4 py-1.5 text-xs font-medium text-slate-950 transition-colors duration-150 hover:bg-indigo-400/90">
              Browse files
            </button>
          </div>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          No gimmicks, no neon. Just a clear signal on whether your resume will
          survive the first filter.
        </p>
      </section>

      {/* Right: Bento grid with analysis */}
      <section className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="grid flex-1 grid-cols-3 gap-4">
          {/* ATS Score */}
          <div className="col-span-1 rounded-2xl bg-[rgba(15,23,42,0.96)] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">ATS Score</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                Draft
              </span>
            </div>
            <div className="flex items-center justify-center">
              <CircularScore score={76} />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              Above average. Small, targeted changes can push this into the top
              10% of the pipeline.
            </p>
          </div>

          {/* Missing Keywords */}
          <div className="col-span-2 rounded-2xl bg-[rgba(15,23,42,0.96)] p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>Missing or weak signals</span>
              <span>Role: Senior Frontend Engineer</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Design systems",
                "Accessibility (a11y)",
                "End-to-end testing",
                "Performance budgets",
                "Observability",
                "Experimentation",
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[color:var(--border-subtle)]/60 bg-slate-950/40 px-2.5 py-1 text-[11px] text-slate-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              These aren&apos;t just buzzwords—each one maps to an interview
              lane. If you&apos;ve done the work, make sure the resume says so
              explicitly.
            </p>
          </div>
        </div>

        {/* Actionable Fixes Accordion */}
        <div className="rounded-2xl bg-[rgba(15,23,42,0.96)] p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Actionable fixes</span>
            <span>Prioritized for impact · ~15–20 min pass</span>
          </div>
          <div className="space-y-2">
            <AccordionItem
              title="Tighten your top 3 bullet points"
              body="Rewrite the first three bullets under your current role to be metric-first. Lead with numbers, then describe the work that got you there."
            />
            <AccordionItem
              title="Surface your system-level thinking"
              body="Add one bullet that describes an end-to-end initiative (requirements → design → rollout → measurement). Interviewers scan for ownership."
            />
            <AccordionItem
              title="Make your tech stack query-friendly"
              body="Consolidate key technologies into a single, skimmable line that can be copy-pasted into an ATS search query."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CircularScore({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-28 w-28">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="rgba(30,64,175,0.4)"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#grad)"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-slate-50">
          {score}
          <span className="text-xs text-slate-400">/100</span>
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Fit signal
        </span>
      </div>
    </div>
  );
}

function AccordionItem({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[color:var(--border-subtle)]/60 bg-slate-950/40">
      <button
        className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-slate-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-[color:var(--border-subtle)]/50 px-3 py-2 text-[11px] leading-relaxed text-slate-400">
          {body}
        </div>
      )}
    </div>
  );
}

function SimulatorView() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 pb-6 pt-4">
      <div className="flex w-full max-w-3xl flex-1 flex-col rounded-3xl bg-[rgba(15,23,42,0.96)]/95 p-4 shadow-[0_22px_60px_rgba(15,23,42,0.95)]">
        {/* Conversation body (placeholder) */}
        <div className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-2xl bg-slate-950/40 p-4">
          <div className="inline-flex max-w-[80%] flex-col gap-1 rounded-2xl bg-slate-900/80 px-3 py-2 text-xs text-slate-200">
            <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              System
            </span>
            <p>
              When you&apos;re ready, type your first answer as if I just asked:
              &quot;Tell me about a time you had to push back on a product
              decision.&quot;
            </p>
          </div>
          <div className="inline-flex max-w-[80%] flex-col gap-1 self-end rounded-2xl bg-indigo-500/20 px-3 py-2 text-xs text-indigo-100">
            <span className="text-[10px] uppercase tracking-[0.16em] text-indigo-300/80">
              You
            </span>
            <p>
              I&apos;ll mirror your tone and pacing. Focus on clarity, not
              theatrics.
            </p>
          </div>
        </div>

        {/* Input + waveform */}
        <div className="mt-auto space-y-2">
          <div className="flex items-end gap-2">
            <div className="flex-1 rounded-2xl border border-[color:var(--border-subtle)]/60 bg-black/40 px-3 py-2 text-xs text-slate-300">
              <span className="text-slate-500">
                Start typing your answer. I&apos;ll pause when you pause, and
                push when details are missing.
              </span>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-medium text-slate-950 transition-colors duration-150 hover:bg-indigo-400/90">
              Send
            </button>
          </div>

          {/* Subtle waveform indicator */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            <div className="waveform-dot h-1.5 w-6 rounded-full bg-[color:var(--accent-soft)]" />
            <div className="waveform-dot h-1.5 w-6 rounded-full bg-[color:var(--accent-soft)]" />
            <div className="waveform-dot h-1.5 w-6 rounded-full bg-[color:var(--accent-soft)]" />
          </div>
          <p className="text-center text-[10px] text-slate-500">
            Listening for structure, not perfection. You can always pause,
            breathe, and restart.
          </p>
        </div>
      </div>
    </section>
  );
}
