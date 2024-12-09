import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


await connect()
console.log("Here I am");

// Post request for User Signup 

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log("Here I am");
        console.log(reqBody);    

        // check if the user already exits 

        const user = await User.findOne({email});

        if(user) {
            return  NextResponse.json({error: "User already Exists "}, {status : 400});
        }

        // hash password 

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        });

        const savedUser = await newUser.save(); 
        console.log(savedUser);

        return NextResponse.json(
            {
                message: "User created Successfully",
                success: true,
                savedUser
            });
    }
    catch (error: any) {
        console.error(error);
        console.log("Hello");
        return NextResponse.json({error: error.message},
        {status: 500});
    }
}