
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose';
import User from "@/models/User";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userId, colorPalette } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { $push: { savedPalettes: colorPalette } });
    res.status(200).json({ message: 'Color saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the color' });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { userId, color } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { $pull: { savedPalettes: color } });
    res.status(200).json({ message: 'Color deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the color' });
  }
}