import cloudinary from '../lib/Cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export async function signup(req, res) {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password.trim().length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters." });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save(); // save the user to the database.

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profileImg: newUser.profileImg
            })
        } else {
            res.status(400).json('Invalid User Data')
        }
    } catch (error) {
        console.log('error in signup controller', error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                generateToken(user._id, res);

                res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    profileImg: user.profileImg
                })
            }
            else {
                return res.status(400).json({ message: "Invalid credentials" })
            }
        }
        else {
            return res.status(400).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export function logout(req, res) {
try {
res.cookie("token", "", {maxAge:0})
res.status(200).json({ message: "Logged out successfully" })
} catch (error) {
    console.log("error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" })
}}

export async function updateProfile(req, res){
try {
    const {profileImg} = req.body;
    const userId = req.user._id; // got the .user from protectRoute, where we have added the user property.
    if (!profileImg) {
        return res.status(400).json({message: "Profile pic is required"})
    }

    const uploadResponse = await cloudinary.uploader.upload(profileImg)
    const updatedUser = await User.findByIdAndUpdate(userId, {profileImg: uploadResponse.secure_url},{new:true})

    return res.status(200).json(updatedUser)
} catch (error) {
    console.log("error in update profile controller", error.message);
    res.status(500).json({ message: "Internal server error" })
}
};

export function checkAuth(req, res) {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in Check auth controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}