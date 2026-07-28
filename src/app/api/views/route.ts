import { NextResponse } from "next/server";

const inMemoryStore: Record<string, number> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const increment = searchParams.get("increment") === "true";

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const namespace = "varunkumar-portfolio";
  const key = `project-${slug.toLowerCase().trim()}`;

  try {
    const url = increment
      ? `https://api.counterapi.dev/v1/${namespace}/${key}/up`
      : `https://api.counterapi.dev/v1/${namespace}/${key}`;

    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.count === "number") {
        inMemoryStore[key] = data.count;
        return NextResponse.json({ count: data.count });
      }
    }

    // If key not found on GET (e.g. brand new project), initialize it via /up
    if (!res.ok && !increment) {
      const initRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`, {
        cache: "no-store",
      });
      if (initRes.ok) {
        const initData = await initRes.json();
        if (initData && typeof initData.count === "number") {
          inMemoryStore[key] = initData.count;
          return NextResponse.json({ count: initData.count });
        }
      }
    }
  } catch (err) {
    console.error("CounterAPI fetch error:", err);
  }

  // Fallback count if CounterAPI is unreachable or errors
  const fallbackCount = inMemoryStore[key] || 1;
  return NextResponse.json({ count: fallbackCount });
}
