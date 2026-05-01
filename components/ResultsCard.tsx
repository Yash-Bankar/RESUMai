'use client';

import { useState } from 'react';

interface ResultsCardProps {
  results: {
    score: number;
    improvedBullets: string[];
    missingSkills: string[];
    atsTips: string[];
    suggestions: string[];
  };
  onAnalyzeAnother: () => void;
}

export default function ResultsCard({ results, onAnalyzeAnother }: ResultsCardProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  const scoreMeta = (() => {
    if (results.score >= 9) return { label: 'Elite', tone: 'from-zinc-100 to-zinc-300', note: 'Excellent recruiter-readability and impact.' };
    if (results.score >= 8) return { label: 'Strong', tone: 'from-zinc-200 to-zinc-400', note: 'Great base. Refine for sharper outcomes.' };
    if (results.score >= 6) return { label: 'Promising', tone: 'from-zinc-300 to-zinc-500', note: 'Solid structure, needs stronger metrics.' };
    return { label: 'Needs Upgrade', tone: 'from-zinc-400 to-zinc-600', note: 'Big wins available with targeted rewrites.' };
  })();

  const gaugeOffset = 439.82 - (Math.max(0, Math.min(10, results.score)) / 10) * 439.82;

  const Section = ({
    title,
    icon,
    items,
    sectionId,
  }: {
    title: string;
    icon: string;
    items: string[];
    sectionId: string;
  }) => (
    <article className="glass-card h-full">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          <span className="text-lg">{icon}</span>
          {title}
        </h3>
        <button
          type="button"
          onClick={() => copyToClipboard(items.join('\n'), sectionId)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
            copiedSection === sectionId
              ? 'border-white/35 bg-white/20 text-white'
              : 'border-white/10 bg-white/5 text-zinc-200 hover:border-white/30 hover:bg-white/10'
          }`}
        >
          {copiedSection === sectionId ? 'Copied' : 'Copy'}
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={`${sectionId}-${idx}`} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-200">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );

  return (
    <div className="space-y-8">
      <section className="glass-card overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Resume Score</p>
            <div className="mt-6 flex items-center gap-6">
              <div className="relative h-40 w-40">
                <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="10" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="url(#resultGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="439.82"
                    strokeDashoffset={gaugeOffset}
                    style={{ transition: 'stroke-dashoffset 500ms ease' }}
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
                    <p className="text-xs text-zinc-300">out of 10</p>
                  </div>
                </div>
              </div>
              <div>
                <p className={`inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-black ${scoreMeta.tone}`}>
                  {scoreMeta.label}
                </p>
                <p className="mt-3 max-w-xs text-sm text-zinc-200">{scoreMeta.note}</p>
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
                <div key={point} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-200">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Section title="Improved Bullet Points" icon="✨" items={results.improvedBullets} sectionId="improvedBullets" />
        <Section title="Missing Skills / Keywords" icon="🎯" items={results.missingSkills} sectionId="missingSkills" />
        <Section title="ATS Recommendations" icon="📋" items={results.atsTips} sectionId="atsTips" />
        <Section title="General Suggestions" icon="💡" items={results.suggestions} sectionId="suggestions" />
      </section>

      <section className="glass-card">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">Before / After Snapshot</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-300">Before</p>
                <p className="mt-2 text-sm text-zinc-200">
                  {results.suggestions[0] ?? 'Your current bullet points can be more specific and measurable.'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/[0.08] p-4">
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
                      'Improved Bullet Points',
                      ...results.improvedBullets,
                      '',
                      'Missing Skills / Keywords',
                      ...results.missingSkills,
                      '',
                      'ATS Recommendations',
                      ...results.atsTips,
                      '',
                      'General Suggestions',
                      ...results.suggestions,
                    ].join('\n'),
                    'all'
                  )
                }
                className="w-full rounded-xl border border-white/20 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/[0.12]"
              >
                {copiedSection === 'all' ? 'Copied all recommendations' : 'Copy all suggestions'}
              </button>
              <button
                type="button"
                onClick={onAnalyzeAnother}
                className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Analyze another resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
