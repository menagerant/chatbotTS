import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function POST(req) {
  const today = await req.json();
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("fetching all users...");
      const usersToday = await Chat.find({}).count();
      const yesterday = new Date(today);
      yesterday.setHours(0, 0, 0);
      const usersYesterday = await Chat.find({
        firstConnection: { $lt: yesterday },
      }).count();
      console.log("fetched all users");
      return NextResponse.json({
        today: usersToday,
        yesterday: usersYesterday,
      });
    } catch (error) {
      console.log("error: failed to fetch all users");
      return NextResponse.json("error: failed to fetch all users");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
