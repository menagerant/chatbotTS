import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const prompts = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      messages: prompts,
      model: "gpt-3.5-turbo",
    });
    return NextResponse.json(completion);
  } catch (error) {
    return NextResponse.json("error");
  }
}
