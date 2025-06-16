import Avatar from "../models/avatar.model";
import { Request, Response } from "express";

export const createAvatar = async (req: Request, res: Response) => {
  try { 
    const {gender } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : "";
    const avatar = await Avatar.create({ image, gender });
    res.status(201).json({ avatar });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: (error as Error).message });
  }
};

export const getAvatars = async (req: Request, res: Response) => {
  try {
    const avatars = await Avatar.find();
    res.status(200).json({ avatars });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: (error as Error).message });
  }
};

export const getAvatarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const avatar = await Avatar.findById(id);
    res.status(200).json({ avatar });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: (error as Error).message });
  }
};


export const deleteAvatar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const avatar = await Avatar.findByIdAndDelete(id);
    res.status(200).json({ message: "Avatar deleted successfully", avatar });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: (error as Error).message });
  }
}