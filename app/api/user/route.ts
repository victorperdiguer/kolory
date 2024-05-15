import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  return NextResponse.json({
    message: "get!"
  })
}

export async function POST(req: NextRequest) {
  const {name, email, avatar} = await req.json()
  const db = await connectMongoDB()
  await User.create({name, email, avatar})
  return NextResponse.json({
    message: "Registration successful",
    user: name,
    email: email
  }, {status: 201})
}