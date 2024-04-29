import { Schema, model, connect } from "mongoose";

interface IUser {
  name: string
  email: string
  avatar?: string
}

const UserSchema = new Schema<IUser> ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: String
},
{
  timestamps: true
}
)

const User = model('user', UserSchema)

export default User
