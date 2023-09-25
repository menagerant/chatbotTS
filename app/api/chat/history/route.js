import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import { connectToDB } from "@/utils/database";

export async function POST(req) {
  const chatId = await req.json();
  try {
    await connectToDB();

    console.log("finding chat");
    const chat = await Chat.findById(chatId);
    console.log("finded chat");
    return NextResponse.json(chat);
  } catch (error) {
    console.log(error);
    return NextResponse.json("error: failed to fetch existing chat");
  }
}
