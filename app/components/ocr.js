import { createWorker } from 'tesseract.js';

export async function extractExpenseFromReceipt(file) {
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();

    // Simple extraction logic (can be improved)
    const amountMatch = text.match(/\b(\d+[.,]?\d*)\b/);
    const dateMatch = text.match(/\b(\d{2,4}[\/\-.]\d{1,2}[\/\-.]\d{1,4})\b/);
    const restaurantMatch = text.match(/(?:at|from)\s+([A-Za-z ]+)/i);

    return {
        amount: amountMatch ? amountMatch[1] : null,
        date: dateMatch ? dateMatch[1] : null,
        description: text,
        restaurant: restaurantMatch ? restaurantMatch[1].trim() : null,
    };
}
