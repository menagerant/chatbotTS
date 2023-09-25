import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import { connectToDB } from "@/utils/database";

export async function PATCH(req) {
  const { chatId, messages } = await req.json();
  try {
    await connectToDB();

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
    console.log(error);
    return NextResponse.json("error: failed to update chat");
  }
}
