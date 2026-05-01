interface ResumeAiLogoProps {
  className?: string;
}

export default function ResumeAiLogo({ className = '' }: ResumeAiLogoProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="resumeai logo"
      role="img"
    >
      <path
        d="M150,250 C150,180 200,160 250,160 C300,160 350,180 350,250 L360,250 C390,250 390,320 350,320 L150,320 C110,320 110,250 140,250 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <line x1="250" y1="160" x2="250" y2="120" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <circle cx="250" cy="110" r="10" fill="none" stroke="currentColor" strokeWidth="6" />
      <rect x="185" y="200" width="130" height="90" rx="20" fill="none" stroke="currentColor" strokeWidth="6" />
      <path
        className="logo-eye"
        d="M215,235 Q225,222 235,235"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle className="logo-eye" cx="225" cy="232" r="3" fill="currentColor" />
      <path
        className="logo-eye"
        d="M265,235 Q275,222 285,235"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle className="logo-eye" cx="275" cy="232" r="3" fill="currentColor" />
      <path d="M210,260 Q250,290 290,260" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
