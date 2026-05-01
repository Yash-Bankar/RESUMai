import { GoogleGenerativeAI } from '@google/generative-ai';

interface AnalysisResult {
  score: number;
  improvedBullets: string[];
  missingSkills: string[];
  atsTips: string[];
  suggestions: string[];
}

export async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const client = new GoogleGenerativeAI(apiKey);
  const configuredModel = process.env.GEMINI_MODEL?.trim();
  const modelCandidates = configuredModel
    ? [configuredModel]
    : ['gemini-flash-latest', 'gemini-1.5-flash-latest', 'gemini-1.5-flash'];

  const prompt = `Analyze this resume and provide a structured response. Return ONLY valid JSON (no markdown, no extra text).

Resume text:
${resumeText}

Respond with ONLY this JSON structure (no other text before or after):
{
  "score": <number 0-10>,
  "improvedBullets": ["<improved bullet 1>", "<improved bullet 2>", "<improved bullet 3>"],
  "missingSkills": ["<skill 1>", "<skill 2>", "<skill 3>"],
  "atsTips": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"]
}

Focus on: resume impact, clarity, action verbs, metrics, ATS friendliness. Be concise and practical. Do not be generic.`;

  let responseText: string | null = null;
  let lastModelError: Error | null = null;

  for (const modelName of modelCandidates) {
    try {
      const model = client.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
      break;
    } catch (error) {
      if (error instanceof Error) {
        lastModelError = error;
        const shouldTryNext = !configuredModel && /404|not found/i.test(error.message);
        if (shouldTryNext) {
          continue;
        }
        throw new Error(`Gemini API Error: ${error.message}`);
      }
      throw new Error('Failed to analyze resume');
    }
  }

  if (!responseText) {
    if (lastModelError) {
      throw new Error(`Gemini API Error: ${lastModelError.message}`);
    }
    throw new Error('Gemini API Error: No compatible model found');
  }

  // Extract JSON from response (handle possible markdown code blocks)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }

  const analysis = JSON.parse(jsonMatch[0]) as AnalysisResult;

  // Validate structure
  if (
    typeof analysis.score !== 'number' ||
    !Array.isArray(analysis.improvedBullets) ||
    !Array.isArray(analysis.missingSkills) ||
    !Array.isArray(analysis.atsTips) ||
    !Array.isArray(analysis.suggestions)
  ) {
    throw new Error('Invalid response structure');
  }

  return analysis;
}
