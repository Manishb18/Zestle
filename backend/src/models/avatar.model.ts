import mongoose, { Document, Schema } from "mongoose";

export interface IAvatar extends Document {
  image: string;     // URL of the avatar image
  gender: string;   // Gender associated with the avatar
}

const avatarSchema = new Schema<IAvatar>(
  {
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Avatar = mongoose.model<IAvatar>("Avatar", avatarSchema);

export default Avatar;