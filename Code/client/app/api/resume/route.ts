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

    // Apply a reasonable timeout to upstream requests to avoid hanging
    const timeoutMs = 10000; // 10 seconds
    const signal = AbortSignal.timeout(timeoutMs);

    // Forward authorization if present so backend can verify caller
    const forwardHeaders: Record<string, string> = { "Content-Type": "application/json" };
    const auth = req.headers.get("authorization");
    if (auth) forwardHeaders.Authorization = auth;

    let forwardRes: Response;
    try {
      forwardRes = await fetch(backend.replace(/\/$/, "") + "/resume", {
        method: "POST",
        headers: forwardHeaders,
        body: JSON.stringify(body),
        // include credentials so cookies/credentials are forwarded when applicable
        credentials: "include",
        signal,
      });
    } catch (e: any) {
      if (e && (e.name === "AbortError" || e.name === "TimeoutError")) {
        return NextResponse.json({ error: "upstream timeout" }, { status: 504 });
      }
      throw e;
    }

    const data = await forwardRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: forwardRes.status });
  } catch (err) {
    console.error("resume validation/forward error", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
