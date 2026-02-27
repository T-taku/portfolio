import { NextResponse } from "next/server";
import { getWorks } from "@/lib/microcms";

export const dynamic = "force-dynamic";

export async function GET() {
  const works = await getWorks();

  return NextResponse.json(works, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
