import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function POST(req) {
  const chatId = await req.json();
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("creating new user");
      const userChat = new Chat({
        id: chatId,
        firstConnection: Date.now(),
        lastConnection: Date.now(),
        messages: "",
      });
      const saving = await userChat.save();
      console.log("created new user:", saving);
      return NextResponse.json(userChat);
    } catch (error) {
      console.log("error: failed to create new user");
      return NextResponse.json("error: failed to create new user");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
