import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/pdf';
import { analyzeResume } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    // Get file from form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(buffer);

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from PDF' },
        { status: 400 }
      );
    }

    // Analyze with Gemini
    const analysis = await analyzeResume(resumeText);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);

    const message = error instanceof Error ? error.message : 'Analysis failed';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
