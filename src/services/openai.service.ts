import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
  }

  async generateText(prompt: string): Promise<string> {
    const chatCompletion = await this.openai.chat.completions.create({
      model: 'gpt-4', // or 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: prompt }],
    });

    return chatCompletion.choices[0]?.message?.content ?? '';
  }

  async analyzeImage(
    imageUrl: string,
    question: string,
    formatExample: string,
  ): Promise<any> {
    const chatCompletion = await this.openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are an image-analysis assistant. ' +
            'Always respond ONLY in valid JSON format. ' +
            'Use camelCase for all keys. ' +
            'For the same question, always return the same JSON structure to ensure consistency for database parsing. ' +
            "For image analysis questions, return a JSON object with 'analysisResult' and 'details' fields. " +
            'Do not include explanations outside the JSON object. ' +
            'Ensure the response is complete and all brackets are closed. ' +
            'This is the model image link whose overall rating would be 94 95 please compare the images with this model image' +
            ''+
            `Here is the required JSON response format for this question:\n${formatExample}`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: question,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });
    return JSON.parse(chatCompletion.choices[0]?.message?.content ?? '{}');
  }
}
