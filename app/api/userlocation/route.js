import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://ip-api.com/json/?lang=fr");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("error");
  }
}
