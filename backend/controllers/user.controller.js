import user from "../models/user.model.js";
import client from "../services/redis.service.js";
import * as userService from "../services/user.service.js";
import {
    validationResult
} from 'express-validator'

 
export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userService.createUser(req.body);
        const token = user.generateJWT(); 
        delete user._doc.password;
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userService.loginUser(req.body);
        const token = user.generateJWT(); 
        delete user._doc.password;

        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};



export const getUserProfileController = async (req, res) => {
    console.log(req.body)
    res.status(200).json({
        user: req.user
    })

};

export const logoutController = async (req,res) => {
    try {
        const token = req.cookies.token ||req.headers.authorization?.split(' ')[1];
        await client.set(token,'logout','EX',60*60*24);
        res.status(200).send({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "Internal Server Error" });
    }
};


export const deleteuserController = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userService.deleteUser(req.body);
        const token = user.generateJWT(); 
        delete user._doc.password;

        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

export const showalluserController = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await userService.showAllUsers(req.body);
        const token = user.generateJWT(); 
        delete user._doc.password;

        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}