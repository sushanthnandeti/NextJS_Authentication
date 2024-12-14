import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId} : any) => {

    try {
        // create a hashed token 

        const hashedtoken = await bcryptjs.hash(userId.toString(),10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                { verifyToken: hashedtoken, 
                    verifyTokenExpiry: Date.now() + 3600000})
            }
        
        else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, 
                { forgotPasswordToken: hashedtoken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000})
            }
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "6bca34c9b18066",
                  pass: "cb4c3f113eaa77"
                }
              });
            
            const mailOptions = {
                from : "sushanthnandeti96@gmail.com",
                to: email,
                subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html : `<p> Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedtoken}"> here </a> to 
                        ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
                        or
                        copy and paste the below link in your browser. 
                        <br>
                        ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
                        
                        </p>`
            }

            const mailresponse = await transport.sendMail(mailOptions); 
            return mailresponse;

    } catch(error : any) {
        throw new Error(error.message);
    }
}




