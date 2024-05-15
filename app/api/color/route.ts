import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const { email, color } = await req.json();
  await connectMongoDB();
  console.log(email, color)
  
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  console.log(user)

  // Add color to the savedColors array if it's not already there
  if (!user.savedColors.includes(color)) {
    user.savedColors.push(color);
    await user.save();
  }

  return NextResponse.json({
    message: "Color saved successfully",
    color: color,
    email: email
  }, { status: 201 });
}
