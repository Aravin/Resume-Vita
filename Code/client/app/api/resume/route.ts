import { NextRequest, NextResponse } from "next/server";
import { validateResumePayload } from "@/lib/validateResume";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const errors = validateResumePayload(body);
    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Forward to configured backend if present
    const backend = process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT;
    if (!backend) {
      return NextResponse.json({ ok: true, message: "Validation passed (no backend configured)" });
    }

    const forwardRes = await fetch(backend.replace(/\/$/, "") + "/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await forwardRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: forwardRes.status });
  } catch (err) {
    console.error("resume validation/forward error", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
