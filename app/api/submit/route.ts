// app/api/submit/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // 1) 클라이언트에서 받은 JSON 파싱
  const payload = await request.json();

  // 2) Google Apps Script Web App으로 중계
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbwEBMm072mL6rxjjLpTuyx92WKceVGskbOwqHH3KvwpdFfSxQHmoeBgEOt86eXEH3OC9A/exec";
  const resp = await fetch(scriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await resp.text();

  // 3) CORS 헤더 붙여서 클라이언트에 그대로 전달
  return new NextResponse(text, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS() {
  // 브라우저 preflight 요청 수락
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
