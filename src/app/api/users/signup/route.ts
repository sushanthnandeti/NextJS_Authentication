import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()

// Post request for User Signup 

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);    

        // check if the user already exits 

        const user = await User.findOne({email});

        if(user) {
            return  NextResponse.json({error: "User already Exists "}, {status : 400});
    
    } 
    }
    catch (error: any) {
        return NextResponse.json({error: error.message},
        {status: 500});
    }
}