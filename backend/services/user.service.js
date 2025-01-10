import userModel from "../models/user.model.js";

export const createUser = async ({
    email,
    password,
}) => {
    if (!email || !password) {
        throw new Error("Please provide email and password");
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password: hashPassword,
    })
    return user;
}

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Login with correct email and password");
    }

    const user = await userModel.findOne({ email }).select('+password');
   

    if (!user || !await user.isValidPassword(password)) {
        throw new Error("Invalid email or password");
    }

    return user; // Return the user instance
};

export const profileUser = async ({ email, password }) =>{
    if(!email || !password) {
        throw new Error("wrong profile");

    }
    const user = await userModel.findById({email,password})

    return user;
}