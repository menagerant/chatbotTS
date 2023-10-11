import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function POST(req) {
  const chatId = await req.json();
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("finding chat...");
      const chat = await Chat.findOne({ id: chatId });
      console.log("finded chat");
      return NextResponse.json(chat);
    } catch (error) {
      console.log("error: failed to fetch existing chat");
      return NextResponse.json("error: failed to fetch existing chat");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
