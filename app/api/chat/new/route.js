import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function GET() {
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("creating new user");
      const userChat = new Chat({
        firstConnection: Date.now(),
        lastConnection: Date.now(),
        messages: "",
      });
      await userChat.save();
      console.log("created new user");
      return NextResponse.json(userChat);
    } catch (error) {
      console.log("error: failed to create new user");
      return NextResponse.json("error: failed to create new user");
    }
  } else {
    console.log("MongoDB not connected");
  }
}
