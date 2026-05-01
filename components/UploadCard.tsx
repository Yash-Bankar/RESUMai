'use client';

import { useRef, useState } from 'react';

interface UploadCardProps {
  loading: boolean;
  error: string | null;
  onAnalyze: (file: File) => Promise<void>;
}

export default function UploadCard({ loading, error, onAnalyze }: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        alert('Please drop a PDF file');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleAnalyze = async () => {
    if (selectedFile) {
      await onAnalyze(selectedFile);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div
        className={`group relative overflow-hidden rounded-[2rem] border p-8 sm:p-12 ${
          isDragging
            ? 'border-white/60 bg-white/[0.06] shadow-[0_0_70px_-24px_rgba(255,255,255,0.5)]'
            : 'border-white/10 bg-black/65 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.95)]'
        } transition duration-300`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute -inset-[1px] rounded-[2rem] border border-white/10 opacity-50 transition duration-300 group-hover:opacity-100" />

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="relative z-10">
          {loading ? (
            <div className="py-10 text-center sm:py-14">
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/5">
                <div className="h-14 w-14 rounded-full border-4 border-white/20 border-t-white animate-spin" />
              </div>
              <h3 className="text-2xl font-bold text-white">Analyzing your resume</h3>
              <p className="mt-2 text-sm text-slate-300">
                Extracting context, scoring impact, and generating optimized recommendations.
              </p>
              <div className="mx-auto mt-6 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/2 animate-shimmer rounded-full bg-gradient-to-r from-zinc-200 via-white to-zinc-400" />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div
                className={`mx-auto grid h-24 w-24 place-items-center rounded-3xl border ${
                  isDragging ? 'border-white/70 bg-white/[0.12]' : 'border-white/15 bg-white/5'
                } transition duration-300`}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="text-4xl">📄</span>
              </div>
              <h3 className="mt-6 text-3xl font-bold text-white">Drag & drop your resume</h3>
              <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
                PDF only. We process your upload through secure backend routes and return clean, recruiter-focused insights.
              </p>

              {selectedFile ? (
                <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/25 bg-white/[0.06] p-4 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-100">{selectedFile.name}</p>
                      <p className="mt-1 text-xs text-zinc-300">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <span className="rounded-full border border-white/25 bg-white/[0.08] px-3 py-1 text-xs font-medium text-zinc-100">
                      Ready
                    </span>
                  </div>
                </div>
              ) : (
                <p className="mt-8 text-sm text-slate-400">Click inside this card or drop your PDF to begin.</p>
              )}

              {error && (
                <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/25 bg-white/[0.08] p-4 text-left">
                  <p className="text-sm font-semibold text-zinc-100">Unable to analyze resume</p>
                  <p className="mt-1 text-sm text-zinc-200">{error}</p>
                </div>
              )}

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!selectedFile || loading}
                  className="rounded-xl border border-white/20 bg-white px-8 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Analyze Resume
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border border-white/20 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-zinc-100 transition duration-300 hover:bg-white/[0.12]"
                >
                  Choose File
                </button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Max size: 10MB</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">PDF format only</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Instant AI insights</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
