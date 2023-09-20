import { NextResponse } from "next/server";
import { internalIpV6, internalIpV4 } from "internal-ip";

export async function GET() {
  try {
    const response2 = await fetch(`http://ip-api.com/json/?lang=fr`);
    const data2 = await response2.json();
    return NextResponse.json(data2);
  } catch (error) {
    return NextResponse.json("error");
  }
}
