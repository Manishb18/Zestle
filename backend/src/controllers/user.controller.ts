import { Request, Response } from "express";
import User from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate('avatar');
    console.log("user",user);
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { name, email, phone, dob, gender, avatar } = req.body;
    
    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (dob) updateFields.dob = dob;
    if (gender) updateFields.gender = gender;
    if (avatar) updateFields.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      userId, 
      updateFields,
      { new: true }
    ).populate('avatar');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
