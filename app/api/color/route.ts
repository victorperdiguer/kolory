import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  console.log(req.nextUrl.searchParams)
  if (!email) {
    return NextResponse.json({ message: "Email query parameter is required" }, { status: 400 });
  }

  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    savedColors: user.savedColors,
  }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { email, color } = await req.json();
  await connectMongoDB();
  console.log(email, color)
  
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  console.log(user)

  // Add color to the savedColors array if it's not already there. If it's there, it's a delete.
  if (!user.savedColors.includes(color)) {
    user.savedColors.push(color);
    await user.save();
    return NextResponse.json({
      message: "Color saved successfully",
      color: color,
      email: email
    }, { status: 201 });
  } else {
    user.savedColors = user.savedColors.filter(savedColor => savedColor !== color);
    await user.save();
    return NextResponse.json({
      message: "Color deleted successfully",
      color: color,
      email: email
    }, { status: 201 });
  }
}