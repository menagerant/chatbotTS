import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function POST(req) {
  const { currentPage, source } = await req.json();
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("finding chats...");
      const chats = await Chat.find({ source: source })
        .sort({ lastConnection: -1 })
        .skip((currentPage - 1) * 10)
        .limit(10);
      console.log("finded chats");
      return NextResponse.json(chats);
    } catch (error) {
      console.log("error: failed to fetch chats");
      return NextResponse.json("error: failed to fetch chats");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
