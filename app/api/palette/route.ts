import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ message: "Email query parameter is required" }, { status: 400 });
  }

  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    savedPalettes: user.savedPalettes,
  }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { email, palette } = await req.json();
  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Convert palette array to a JSON string for comparison
  const paletteString = JSON.stringify(palette);
  const savedPalettesStrings = user.savedPalettes.map(p => JSON.stringify(p));

  // Check if the palette is already saved
  if (!savedPalettesStrings.includes(paletteString)) {
    user.savedPalettes.push(palette);
    await user.save();
    return NextResponse.json({
      message: "Palette saved successfully",
      palette: palette,
      email: email
    }, { status: 201 });
  } else {
    user.savedPalettes = user.savedPalettes.filter(savedPalette => JSON.stringify(savedPalette) !== paletteString);
    await user.save();
    return NextResponse.json({
      message: "Palette deleted successfully",
      palette: palette,
      email: email
    }, { status: 201 });
  }
}
