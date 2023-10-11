import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function POST(req) {
  const today = await req.json();
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("fetching all conversions...");
      const conversionsToday = await Chat.find({
        conversion: true,
      }).count();
      const yesterday = new Date(today);
      yesterday.setHours(0, 0, 0);
      const conversionsYesterday = await Chat.find({
        conversion: true,
        firstConnection: { $lt: yesterday },
      }).count();
      console.log("fetched all conversions");
      return NextResponse.json({
        today: conversionsToday,
        yesterday: conversionsYesterday,
      });
    } catch (error) {
      console.log("error: failed to fetch all conversions");
      return NextResponse.json("error: failed to fetch all conversions");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
