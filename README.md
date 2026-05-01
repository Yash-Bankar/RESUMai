# RESUMai — AI Resume Analyzer

RESUMai is a Next.js app that analyzes PDF resumes with Google Gemini. Users upload a resume, the backend extracts text, sends it to Gemini, and the UI renders a score plus targeted improvements.

## Overview
- **Input:** PDF resume (max 10MB)
- **Processing:** PDF text extraction → Gemini analysis → JSON parsing
- **Output:** Score (0–10), improved bullet points, missing skills, ATS tips, and general suggestions

## User Flow
1. Upload a PDF on the landing page.
2. `/api/analyze` validates file type/size and extracts text (trimmed to ~8000 characters).
3. Gemini returns structured JSON.
4. Results render with copy-to-clipboard actions.

## Features
- Drag-and-drop PDF upload with validation
- Fast analysis with structured results
- Copy buttons per section + “copy all”
- Dark, responsive UI with smooth states

## Tech Stack
Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Google Gemini API, pdf-parse.

## Project Structure
```
resume-anal/
├── app/
│   ├── api/analyze/route.ts    # Upload + validation + analysis
│   ├── page.tsx                # Main UI
│   └── globals.css             # Global styles
├── components/
│   ├── UploadCard.tsx          # File upload UI
│   └── ResultsCard.tsx         # Results display
├── lib/
│   ├── pdf.ts                  # PDF parsing
│   └── gemini.ts               # Gemini integration
├── public/
├── package.json
└── README.md
```

## Environment Variables
| Name | Required | Description |
|------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Gemini API key |
| `GEMINI_MODEL` | No | Override model (e.g., `gemini-1.5-flash`) |

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` (gitignored):
   ```bash
   GEMINI_API_KEY=your_key_here
   GEMINI_MODEL=gemini-1.5-flash
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## API Endpoint
**POST** `/api/analyze`  
**Body:** `multipart/form-data` with field `file`

**Validations**
- PDF only (`.pdf` or `application/pdf`)
- Max size: 10MB

**Success Response**
```json
{
  "success": true,
  "data": {
    "score": 8,
    "improvedBullets": ["..."],
    "missingSkills": ["..."],
    "atsTips": ["..."],
    "suggestions": ["..."]
  }
}
```

**Error Responses**
- `400`: invalid file type/size or empty text
- `500`: Gemini or parsing errors

## Build & Deploy
```bash
npm run build
npm start
```

## Security & Privacy
- Uploaded resumes are processed in memory and not stored.

## Troubleshooting
- **"GEMINI_API_KEY not configured"** → add the key to `.env.local` and restart.
- **"Failed to parse PDF"** → use a text-based PDF (not scanned images).
- **"File too large"** → keep the PDF under 10MB.
- **"Only PDF files are supported"** → upload a `.pdf`.
