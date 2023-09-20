import { NextResponse } from "next/server";
import { internalIpV6, internalIpV4 } from "internal-ip";

export async function GET() {
  try {
    const ipAddress = await internalIpV4();
    const response2 = await fetch(
      `http://ip-api.com/json/${ipAddress}?lang=fr`
    );
    const data2 = await response2.json();
    return NextResponse.json(data2);
  } catch (error) {
    return NextResponse.json("error");
  }
}
