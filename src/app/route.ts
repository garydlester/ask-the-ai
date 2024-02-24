import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {

  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return new NextResponse('Invalid content type', { status: 400 });
  }

  try {

    const requestBody = await request.json();
    const { query } = requestBody;

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
    });

    console.log(chatCompletion)

    return NextResponse.json({ response: chatCompletion });
  } catch (error) {
    return new NextResponse('Invalid JSON data', { status: 400 });
  }
}
