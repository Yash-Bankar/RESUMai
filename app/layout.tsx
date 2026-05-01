import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "resumai | AI Resume Analyzer",
  description: "resumai analyzes your resume with AI and returns score, improved bullets, missing skills, ATS tips, and concise suggestions.",
  icons: {
    icon: "/resumeailogop.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased flex flex-col min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
