'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LineWaves from '@/components/LineWaves';
import Navbar from '@/components/Navbar';
import ScrollReveal from '@/components/ScrollReveal';
import UploadCard from '@/components/UploadCard';
import ResumeAiLogo from '@/components/ResumeAiLogo';
import GradientText from '@/components/GradientText';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      sessionStorage.setItem('resumai_results', JSON.stringify(data.data));
      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-100">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-35">
        <LineWaves
          speed={0.22}
          innerLineCount={30}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-40}
          edgeFadeWidth={0.08}
          colorCycleSpeed={0.65}
          brightness={0.14}
          color1="#ffffff"
          color2="#d4d4d8"
          color3="#a1a1aa"
          enableMouseInteraction
          mouseInfluence={1.8}
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-50" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-radial-mask" />

      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Hero + Feature Cards */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          {/* Two-column hero: text left, logo right on desktop */}
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">

            {/* Left — text content */}
            <div className="flex-1 text-center lg:text-left">
              <ScrollReveal delay={0} direction="up" distance={30}>
                <div className="leading-none">
                  <h1 className="m-0 text-5xl font-black leading-[1.1] text-white sm:text-6xl lg:text-7xl">
                    Upgrade your resume with
                  </h1>
                  <GradientText
                    colors={['#ffffff', '#a1a1aa', '#ffffff', '#71717a', '#ffffff']}
                    animationSpeed={5}
                    showBorder={false}
                    className="!mx-0 !font-black !text-5xl sm:!text-6xl lg:!text-7xl !leading-[1.1] !rounded-none !max-w-none !backdrop-blur-none lg:!justify-start"
                  >
                    RESUMai
                  </GradientText>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150} direction="up" distance={25}>
                <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-300 sm:text-xl lg:mx-0">
                  Upload your resume and get focused feedback: score, bullet rewrites, missing keywords, ATS tips,
                  and concise recommendations.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300} direction="up" distance={20}>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <button
                    type="button"
                    onClick={scrollToUpload}
                    className="w-full rounded-xl border border-white/20 bg-white px-8 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200 sm:w-auto"
                  >
                    Upload Resume
                  </button>
                  <button
                    type="button"
                    onClick={scrollToUpload}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-zinc-100 transition duration-300 hover:bg-white/[0.1] sm:w-auto"
                  >
                    Try Sample Flow
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — blinking logo */}
            <ScrollReveal delay={200} direction="left" distance={50} className="shrink-0">
  <ResumeAiLogo className="hidden md:block navbar-logo-wrap h-64 w-64 text-white opacity-90 lg:h-80 lg:w-80 glow-hover" />
</ScrollReveal>
          </div>

          {/* Feature Cards */}
          <div className="mt-20 grid gap-5 lg:grid-cols-12">
            <ScrollReveal delay={0} direction="up" distance={40} className="lg:col-span-4">
              <article className="glass-card group h-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-300">Fast Analysis</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Upload and score quickly</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Clean parsing and focused AI feedback without unnecessary noise.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={120} direction="up" distance={40} className="lg:col-span-4">
              <article className="glass-card group h-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-300">ATS First</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Optimize for screening systems</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Identify missing keywords and formatting issues that impact shortlist chances.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={240} direction="up" distance={40} className="lg:col-span-4">
              <article className="glass-card group h-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-300">Clear Upgrades</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Actionable bullet rewrites</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Transform weak bullets into impact-first statements recruiters can scan fast.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={80} direction="up" distance={40} className="lg:col-span-8">
              <article className="glass-card h-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-300">What You Get</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    { title: 'Structured Score', desc: 'A clear score plus direct guidance to strengthen your resume.' },
                    { title: 'Targeted Rewrites', desc: 'Sharper bullet suggestions focused on outcomes and clarity.' },
                    { title: 'ATS Guidance', desc: 'Keyword and structure recommendations for better compatibility.' },
                  ].map((item) => (
                    <div key={item.title} className="glass-card-inner rounded-xl p-4">
                      <div className="text-base font-semibold text-white">{item.title}</div>
                      <div className="mt-2 text-sm text-zinc-300">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={180} direction="up" distance={40} className="lg:col-span-4">
              <article className="glass-card h-full">
                <p className="text-sm font-semibold uppercase tracking-widest text-zinc-300">How It Works</p>
                <ol className="mt-4 space-y-3 text-sm text-zinc-200">
                  <li className="glass-card-inner rounded-xl p-3">1. Upload your PDF resume</li>
                  <li className="glass-card-inner rounded-xl p-3">2. Analyze content and structure</li>
                  <li className="glass-card-inner rounded-xl p-3">3. Apply improvements and iterate</li>
                </ol>
              </article>
            </ScrollReveal>
          </div>
        </section>

        {/* Upload section */}
        <section ref={uploadSectionRef} className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <ScrollReveal delay={0} direction="up" distance={50}>
            <UploadCard loading={loading} error={error} onAnalyze={handleAnalyze} />
          </ScrollReveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/60 px-4 py-8 text-center text-sm text-zinc-400 backdrop-blur-xl">
        Crafted for modern job seekers
      </footer>
    </div>
  );
}
