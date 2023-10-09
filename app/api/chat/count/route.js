import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function POST(req) {
  const source = await req.json();

  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("finding chats number...");
      const chatsNumber = await Chat.find({ source: source }).count();
      console.log("finded chats number");
      return NextResponse.json(chatsNumber);
    } catch (error) {
      console.log("error: failed to fetch chats number");
      return NextResponse.json("error: failed to fetch chats number");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
