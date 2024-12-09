import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect()


export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        // Check for the user

        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        // Validate the Password 

        const validPassword =  await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({error: "Invalid Password, Try again."}, {status: 400});
        }

        // Create TokenData

        const tokenData = {
            id: user._id,
            username : user.username, 
            email: user.email
        }

        // Create Token using jsonwebtokens library

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn :"1d"});

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        console.error(error);
        console.log("Hello");
        return NextResponse.json({error: error.message},
        {status: 500});
    }
}