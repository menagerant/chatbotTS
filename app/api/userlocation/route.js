import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const ipAddress = data.ip;
    const response2 = await fetch(
      `http://ip-api.com/json/${ipAddress}?lang=fr`
    );
    const data2 = await response2.json();
    return NextResponse.json(data2);
  } catch (error) {
    return NextResponse.json("error");
  }
}
