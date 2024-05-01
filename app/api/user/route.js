import {NextResponse} from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  return NextResponse.json({
    message: "get!"
  })
}

export async function POST(request) {
  const {name, email, avatar} = await request.json()
  console.log(name, email)
  const db = await connectMongoDB()
  console.log(db)
  await User.create({name, email, avatar})
  return NextResponse.json({
    message: "Registration successful",
    user: name,
    email: email
  }, {status: 201})
}