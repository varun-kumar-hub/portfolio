import { NextResponse } from "next/server";
import { getPortfolioViews, recordPortfolioView } from "@/lib/firebase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shouldIncrement = searchParams.get("increment") === "true";

  try {
    const views = shouldIncrement
      ? await recordPortfolioView()
      : await getPortfolioViews();

    if (views !== null) {
      return NextResponse.json({ count: views });
    }
    return NextResponse.json({ count: null, error: "Unavailable" }, { status: 200 });
  } catch (error) {
    console.error("Views API error:", error);
    return NextResponse.json({ count: null, error: "Firestore error" }, { status: 200 });
  }
}
