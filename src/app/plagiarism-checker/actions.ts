"use server";

import { checkTextForPlagiarism } from "@/ai/flows/check-text-for-plagiarism";

export async function checkPlagiarismAction(text: string) {
  if (!text) {
    return { error: "Text input cannot be empty." };
  }
  
  try {
    const result = await checkTextForPlagiarism({ text });
    return result;
  } catch (e) {
    console.error(e);
    return { error: "An unexpected error occurred while checking for plagiarism. Please try again later." };
  }
}
