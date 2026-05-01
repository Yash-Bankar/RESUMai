'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ScrollReveal from '@/components/ScrollReveal';
import LineWaves from '@/components/LineWaves';

interface AnalysisResult {
  score: number;
  improvedBullets: string[];
  missingSkills: string[];
  atsTips: string[];
  suggestions: string[];
}

function CopyButton({ text, sectionId, copiedSection, onCopy }: {
  text: string;
  sectionId: string;
  copiedSection: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(text, sectionId)}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
        copiedSection === sectionId
          ? 'border-white/35 bg-white/20 text-white'
          : 'border-white/10 bg-white/5 text-zinc-200 hover:border-white/30 hover:bg-white/10'
      }`}
    >
      {copiedSection === sectionId ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('resumai_results');
    if (!raw) {
      router.replace('/');
      return;
    }
    try {
      setResults(JSON.parse(raw));
    } catch {
      router.replace('/');
    }
  }, [router]);

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  const scoreMeta = (() => {
    if (results.score >= 9) return { label: 'Elite', tone: 'from-zinc-100 to-zinc-300', note: 'Excellent recruiter-readability and impact.' };
    if (results.score >= 8) return { label: 'Strong', tone: 'from-zinc-200 to-zinc-400', note: 'Great base. Refine for sharper outcomes.' };
    if (results.score >= 6) return { label: 'Promising', tone: 'from-zinc-300 to-zinc-500', note: 'Solid structure, needs stronger metrics.' };
    return { label: 'Needs Upgrade', tone: 'from-zinc-400 to-zinc-600', note: 'Big wins available with targeted rewrites.' };
  })();

  const gaugeOffset = 439.82 - (Math.max(0, Math.min(10, results.score)) / 10) * 439.82;

  const sections = [
    { title: 'Improved Bullet Points', icon: '✨', items: results.improvedBullets, id: 'improvedBullets' },
    { title: 'Missing Skills / Keywords', icon: '🎯', items: results.missingSkills, id: 'missingSkills' },
    { title: 'ATS Recommendations', icon: '📋', items: results.atsTips, id: 'atsTips' },
    { title: 'General Suggestions', icon: '💡', items: results.suggestions, id: 'suggestions' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-100">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-25">
        <LineWaves
          speed={0.15}
          innerLineCount={25}
          outerLineCount={30}
          warpIntensity={0.8}
          rotation={-40}
          edgeFadeWidth={0.08}
          colorCycleSpeed={0.5}
          brightness={0.12}
          color1="#ffffff"
          color2="#d4d4d8"
          color3="#a1a1aa"
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-radial-mask" />

      <Navbar />

      {/* Main scrollable content */}
      <main className="relative z-10 flex-1 pt-24 pb-16 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Page header */}
          <ScrollReveal delay={0} direction="up" distance={30}>
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">Your Resume Analysis</h1>
              <p className="mt-3 text-zinc-400">Here&apos;s your personalised breakdown and recommendations.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">

            {/* Score card */}
            <ScrollReveal delay={80} direction="up" distance={40}>
              <section className="glass-card overflow-hidden">
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Resume Score</p>
                    <div className="mt-6 flex items-center gap-6">
                      <div className="relative h-40 w-40 shrink-0">
                        <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
                          <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="10" />
                          <circle
                            cx="80" cy="80" r="70"
                            fill="none"
                            stroke="url(#resultGradient)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray="439.82"
                            strokeDashoffset={gaugeOffset}
                            style={{ transition: 'stroke-dashoffset 800ms cubic-bezier(0.22,1,0.36,1)' }}
                          />
                          <defs>
                            <linearGradient id="resultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ffffff" />
                              <stop offset="100%" stopColor="#a1a1aa" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="text-center">
                            <p className="text-5xl font-black text-white">{results.score}</p>
                            <p className="text-xs text-zinc-400">out of 10</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className={`inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-black ${scoreMeta.tone}`}>
                          {scoreMeta.label}
                        </p>
                        <p className="mt-3 max-w-xs text-sm text-zinc-300">{scoreMeta.note}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Execution Focus</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        'Quantify impact in each role bullet.',
                        'Mirror keywords from target job posts.',
                        'Prioritize achievements over responsibilities.',
                        'Keep formatting ATS-clean and consistent.',
                      ].map((point) => (
                        <div key={point} className="glass-card-inner rounded-xl p-3 text-sm text-zinc-200">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* 4 section cards */}
            <div className="grid gap-5 lg:grid-cols-2">
              {sections.map((s, i) => (
                <ScrollReveal key={s.id} delay={i * 100} direction="up" distance={35}>
                  <article className="glass-card h-full">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
                        <span className="text-lg">{s.icon}</span>
                        {s.title}
                      </h2>
                      <CopyButton
                        text={s.items.join('\n')}
                        sectionId={s.id}
                        copiedSection={copiedSection}
                        onCopy={copyToClipboard}
                      />
                    </div>
                    <ul className="space-y-3">
                      {s.items.map((item, idx) => (
                        <li key={idx} className="glass-card-inner rounded-xl p-3 text-sm text-zinc-200">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            {/* Before / After + Actions */}
            <ScrollReveal delay={100} direction="up" distance={35}>
              <section className="glass-card">
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Before / After Snapshot</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="glass-card-inner rounded-2xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Before</p>
                        <p className="mt-2 text-sm text-zinc-300">
                          {results.suggestions[0] ?? 'Your current bullet points can be more specific and measurable.'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/20 bg-white/[0.07] p-4 backdrop-blur-sm">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-100">After</p>
                        <p className="mt-2 text-sm text-zinc-100">
                          {results.improvedBullets[0] ?? 'Improved bullet suggestions will appear here after analysis.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:pl-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Actions</p>
                    <div className="mt-4 space-y-3">
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            [
                              'Improved Bullet Points', ...results.improvedBullets, '',
                              'Missing Skills / Keywords', ...results.missingSkills, '',
                              'ATS Recommendations', ...results.atsTips, '',
                              'General Suggestions', ...results.suggestions,
                            ].join('\n'),
                            'all'
                          )
                        }
                        className="w-full rounded-xl border border-white/20 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/[0.12]"
                      >
                        {copiedSection === 'all' ? 'Copied all ✓' : 'Copy all suggestions'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sessionStorage.removeItem('resumai_results');
                          router.push('/');
                        }}
                        className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                      >
                        Analyze another resume
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>

          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/60 px-4 py-8 text-center text-sm text-zinc-400 backdrop-blur-xl">
        Crafted for modern job seekers
      </footer>
    </div>
  );
}
