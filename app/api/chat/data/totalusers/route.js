import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function GET() {
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("fetching all users...");
      const usersToday = await Chat.findMany({}).count();
      const yesterday = new Date();
      yesterday.setHours(0, 0, 0);
      const usersYesterday = await Chat.findMany({
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
