import { NextApiRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    message: "hola!"
  })
}