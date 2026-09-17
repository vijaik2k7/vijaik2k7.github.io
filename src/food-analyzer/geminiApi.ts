import { FoodAnalysis } from './types';

export async function analyzeFood(
  apiKey: string,
  imageBase64?: string,
  textDescription?: string
): Promise<FoodAnalysis> {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Gemini API Key is missing. Please enter your API key in the settings bar.');
  }

  if (!imageBase64 && (!textDescription || !textDescription.trim())) {
    throw new Error('Please provide either a camera photo or a product description to analyze.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey.trim()}`;

  const systemInstructionText = `You are an expert clinical nutritionist and food scientist.
Your task is to analyze the food product shown in the image or described in text.
Evaluate its nutritional value, ingredient quality, processing level, and health impact.

Output ONLY a raw, valid JSON object with no markdown formatting or backticks.
Format:
{
  "grade": "A" | "B" | "C" | "D" | "F",
  "productName": "Identify exact product name or dish description",
  "good": ["2-4 concise, bulleted health pros/positive nutrients"],
  "bad": ["2-4 concise, bulleted health cons/concerning ingredients/high sodium/sugar"],
  "summary": "1 punchy sentence summarizing the verdict"
}

Grade criteria:
- A: Whole food, unprocessed or minimally processed, highly nutritious.
- B: Generally healthy food with minor processing or moderate sodium/sugar.
- C: Average snack or meal; moderately processed or moderate additives.
- D: Unhealthy, highly processed, high in sugar/saturated fats/refined seed oils.
- F: Extremely unhealthy, ultra-processed, heavy artificial additives/trans fats.`;

  const parts: Array<Record<string, unknown>> = [];

  if (imageBase64) {
    // Strip header prefix if present (e.g. data:image/jpeg;base64,)
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: cleanBase64,
      },
    });
  }

  const userPrompt = textDescription
    ? `Analyze this food product: "${textDescription.trim()}".`
    : `Analyze the food product shown in this image.`;

  parts.push({ text: userPrompt });

  const requestBody = {
    contents: [
      {
        parts,
      },
    ],
    systemInstruction: {
      parts: [{ text: systemInstructionText }],
    },
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json',
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 400 || response.status === 403) {
        throw new Error('Invalid Gemini API Key or permission denied. Please verify your API key.');
      } else if (response.status === 429) {
        throw new Error('Gemini API rate limit exceeded. Please wait a moment and try again.');
      } else {
        const detail = errorData?.error?.message || `HTTP ${response.status} ${response.statusText}`;
        throw new Error(`Gemini API Error: ${detail}`);
      }
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Received empty response from Gemini API.');
    }

    // Clean JSON response if enclosed in code blocks
    let cleanedText = candidateText.trim();
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }

    const parsed: FoodAnalysis = JSON.parse(cleanedText);

    if (!parsed.grade || !parsed.productName || !Array.isArray(parsed.good) || !Array.isArray(parsed.bad)) {
      throw new Error('Invalid JSON structure returned by Gemini.');
    }

    return parsed;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('An unexpected error occurred while communicating with Gemini.');
  }
}
