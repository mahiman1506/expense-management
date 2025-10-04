// Next.js Server Action: OCR Integration
import { extractExpenseFromReceipt } from '../components/ocr';

export async function processReceipt(imagePath) {
    return await extractExpenseFromReceipt(imagePath);
}
