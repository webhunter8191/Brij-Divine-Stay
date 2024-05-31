import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { logger } from "../config/logger.js"
import { User } from "../models/user.js";
import { rootConfig } from "../config/envConfig.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password ,address,role} = req.body;
        
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message:"Please fill all the fields"
            })
        }
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
                return res.status(401).json({
                  success: false,
                  message: "Already signed Up please login ",
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let user = {
            name,
            email,
            password: hashedPassword,
            role,
        }
        if (address) {
            user.address = address;
       }
    
        const savedUser = await User.create(user);

        return res.status(200).json({
            success: true,
            message: "User created Succesfullly",
            savedUser
        })

        
    } catch (err) {
        logger.error(`Error in Signing Up ${err.message}`)
        throw err;
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message:"Please fill all the fields"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message:"Do signup first "
            })
        }

        //password comaparing 
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            const payload = {
                email: user.email,
                role:user.role
            };
            const secret = rootConfig.server.secret;
            const token = jwt.sign(payload, secret, {
                expiresIn:'1h'
            })
            user.password = undefined;
            user.token = token;

            return res.status(200).json({
                success: true,
                message: "User logged IN",
                user,
                token
            })
        }

        else {
            return res.status(403).json({
                success: false,
                message:"password not matched "
            })
        }
        
    } catch (err) {
        logger.error(`Error in Log in ${err.message}`);
        throw err;
    }
}