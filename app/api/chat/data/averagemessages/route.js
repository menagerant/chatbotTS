import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function GET() {
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("fetching average messages...");
      const messagesToday = await Chat.findMany({}, "messages");
      let nbMessagesToday = [];
      for (const obj of messagesToday) {
        obj.messages
          ? nbMessagesToday.push(JSON.parse(obj.messages).length)
          : nbMessagesToday.push(0);
      }
      //console.log("nbMessagesToday", nbMessagesToday);
      const averageToday =
        nbMessagesToday.reduce((a, b) => a + b, 0) / nbMessagesToday.length;
      //console.log("averageToday", averageToday);
      const yesterday = new Date();
      yesterday.setHours(0, 0, 0);
      const messagesYesterday = await Chat.findMany(
        {
          firstConnection: { $lt: yesterday },
        },
        "messages"
      );
      let nbMessagesYesterday = [];
      for (const obj of messagesYesterday) {
        obj.messages
          ? nbMessagesYesterday.push(JSON.parse(obj.messages).length)
          : nbMessagesYesterday.push(0);
      }
      //console.log("nbMessagesYesterday", nbMessagesYesterday);
      const averageYesterday =
        nbMessagesYesterday.reduce((a, b) => a + b, 0) /
        nbMessagesYesterday.length;
      //console.log("averageYesterday", averageYesterday);
      console.log("fetched average messages");
      return NextResponse.json({
        today: averageToday,
        yesterday: averageYesterday,
      });
    } catch (error) {
      console.log("error: failed to fetch average messages");
      return NextResponse.json("error: failed to fetch average messages");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
