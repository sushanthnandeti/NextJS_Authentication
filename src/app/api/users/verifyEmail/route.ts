import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect();


export async function POST(request: NextRequest) {

        try {
            const reqBody = await request.json();
            const {token} = reqBody;
            console.log(token);

            const user = await User.findOne({verifyToken: token, verifyTokenExpiry : {$gt: Date.now()}});

            console.log(user);

            if(!user){
                return new Response('Invalid token here', {status: 400});
            }

            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;

            await user.save();

            return NextResponse.json({
                message: "Email Verification Successful!",
                success: true
            })


        } catch (error:any) {
                return NextResponse.json({error: error.messgae }, {status: 500})
        }
}