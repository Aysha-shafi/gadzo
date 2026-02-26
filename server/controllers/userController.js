import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET)

}


//route for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //checking if user exists
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        //comparing password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id);
        res.status(200).json({ success: true, message: "User logged in successfully", token: token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error" });

    }

}
//route for user registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //checking if user already exists 
        const exists = await userModel.findOne({ email: email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        //validating email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" })
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ success: true, message: "User registered successfully", token: token });

    } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
}

}

//route for admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(
                { role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully",
                token: token
            });

        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
