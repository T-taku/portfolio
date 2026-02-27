import { NextResponse } from "next/server";
import { getWorkById } from "@/lib/microcms";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(work, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
