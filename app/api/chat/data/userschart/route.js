import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function GET() {
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("fetching users chart...");
      let usersChart = [];
      for (let i = 0; i < 7; i++) {
        let day1 = new Date();
        let day2 = new Date();
        if (i !== 0) {
          day1.setHours(0, 0, 0);
          day1.setDate(day1.getDate() - i + 1);
          day2.setHours(0, 0, 0);
          day2.setDate(day2.getDate() - i);
        } else {
          day2.setHours(0, 0, 0);
        }
        const obj = {
          name: `${day2.getDate()}/${day2.getMonth() + 1}`,
          total: await Chat.find({
            firstConnection: { $gte: day2, $lt: day1 },
          }).count(),
        };
        usersChart.unshift(obj);
      }
      console.log("fetched users chart");
      return NextResponse.json(usersChart);
    } catch (error) {
      console.log("error: failed to fetch users chart");
      return NextResponse.json("error: failed to fetch users chart");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
