import mongoose, { Schema, Document, Model } from 'mongoose';

// Define a TypeScript interface for the user schema
interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string; // Optional field
  savedColors: string[];
  savedPalettes: string[][]; // Array of arrays of hex color codes
}

// Create the user schema with TypeScript types
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    savedColors: {
      type: [String],
      required: true,
      default: []
    },
    savedPalettes: {
      type: [[String]], // Array of arrays of strings
      required: true,
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: true,
  }
);

// Define the User model with TypeScript types
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
