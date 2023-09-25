import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function PATCH(req) {
  const { chatId, messages } = await req.json();
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("finding chat");
      const existingChat = await Chat.findById(chatId);
      if (!existingChat) {
        return NextResponse.json("error: chat not found");
      } else {
        console.log("finded chat");
      }

      console.log("updating chat");
      existingChat.lastConnection = Date.now();
      existingChat.messages = JSON.stringify(messages);
      console.log("updated chat");

      await existingChat.save();

      return NextResponse.json(existingChat);
    } catch (error) {
      console.log("error: failed to update chat");
      return NextResponse.json("error: failed to update chat");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
