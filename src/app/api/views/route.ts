import { NextResponse } from "next/server";
import { getPortfolioViews } from "@/lib/firebase";

export async function GET() {
  try {
    const views = await getPortfolioViews();

    if (views !== null) {
      return NextResponse.json({ count: views });
    }
    return NextResponse.json({ count: null, error: "Unavailable" }, { status: 200 });
  } catch (error) {
    console.error("Views API error:", error);
    return NextResponse.json({ count: null, error: "Firestore error" }, { status: 200 });
  }
}
