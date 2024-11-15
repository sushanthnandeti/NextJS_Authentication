import mongoose, { connection } from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        
        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure the database is running' + err);
            process.exit();
        })


    } catch (error) {
        console.log("Something is wrong");
        console.log(error)
    }
}

