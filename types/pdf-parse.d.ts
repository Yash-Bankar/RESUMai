declare module 'pdf-parse' {
  import { Buffer } from 'buffer';

  interface PdfParseResult {
    text: string;
  }

  function pdfParse(data: Buffer): Promise<PdfParseResult>;
  export default pdfParse;
}
