import {NextResponse} from "next/server";

export function GET() {
  return NextResponse.json({
    message: "get!"
  })
}

export function POST() {
  return NextResponse.json({
    message: "post!"
  })
}