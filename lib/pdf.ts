import pdfParse from 'pdf-parse';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdf = await pdfParse(buffer);
    const text = pdf.text;

    // Clean up excessive whitespace
    const cleaned = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');

    // Limit to ~8000 characters to keep token count reasonable
    return cleaned.substring(0, 8000);
  } catch (error) {
    throw new Error('Failed to parse PDF');
  }
}
