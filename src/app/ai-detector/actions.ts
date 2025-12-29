"use server";

import { analyzeTextForAI } from "@/ai/flows/analyze-text-for-ai";

export async function analyzeAction(text: string) {
  if (!text) {
    return { error: "Text input cannot be empty." };
  }
  
  try {
    const result = await analyzeTextForAI({ text });
    return result;
  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred during analysis. Please try again later." };
  }
}
