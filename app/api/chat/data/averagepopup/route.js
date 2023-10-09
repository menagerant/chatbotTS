import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import database from "@/utils/database";

export async function GET() {
  if (database.isConnected) {
    console.log("MongoDB connected");
    try {
      console.log("fetching average popup clics...");
      const popupClicsToday = await Chat.findMany({}, "popupClics");
      let nbPopupClicsToday = [];
      for (const obj of popupClicsToday) {
        if (obj.popupClics) {
          nbPopupClicsToday.push(obj.popupClics);
        } else {
          nbPopupClicsToday.push(0);
        }
      }
      //console.log("nbPopupClicsToday", nbPopupClicsToday);
      const averageToday =
        nbPopupClicsToday.reduce((a, b) => a + b, 0) / nbPopupClicsToday.length;
      //console.log("averageToday", averageToday);
      const yesterday = new Date();
      yesterday.setHours(0, 0, 0);
      const popupClicsYesterday = await Chat.findMany(
        {
          firstConnection: { $lt: yesterday },
        },
        "popupClics"
      );
      let nbPopupClicsYesterday = [];
      for (const obj of popupClicsYesterday) {
        if (obj.popupClics) {
          nbPopupClicsYesterday.push(obj.popupClics);
        } else {
          nbPopupClicsYesterday.push(0);
        }
      }
      //console.log("nbPopupClicsYesterday", nbPopupClicsYesterday);
      const averageYesterday =
        nbPopupClicsYesterday.reduce((a, b) => a + b, 0) /
        nbPopupClicsYesterday.length;
      //console.log("averageYesterday", averageYesterday);
      console.log("fetched average popup clics");
      return NextResponse.json({
        today: averageToday,
        yesterday: averageYesterday,
      });
    } catch (error) {
      console.log("error: failed to fetch average popup clics");
      return NextResponse.json("error: failed to fetch average popup clics");
    }
  } else {
    console.log("MongoDB not connected");
    return NextResponse.json("error: MongoDB not connected");
  }
}
