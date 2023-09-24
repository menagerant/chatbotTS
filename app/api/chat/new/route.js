import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import { connectToDB } from "@/utils/database";

export async function GET() {
  try {
    await connectToDB();

    console.log("creating new user");
    const userChat = await Chat.create({
      firstConnection: Date.now(),
      lastConnection: Date.now(),
      messages: "",
    });
    console.log("created new user");
    return NextResponse.json(userChat);
  } catch (error) {
    console.log(error);
    return NextResponse.json("error");
  }
}
