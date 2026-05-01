'use client';

import Link from 'next/link';
import ResumeAiLogo from '@/components/ResumeAiLogo';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] navbar-glass">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="navbar-logo-wrap flex items-center gap-3">
          <ResumeAiLogo className="h-30 w-20 text-white" />
          <span className="text-base font-bold tracking-[0.2em] text-white/90">RESUMai</span>
        </Link>
      </div>
    </header>
  );
}
