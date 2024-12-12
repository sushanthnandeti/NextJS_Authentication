"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { log } from "console";


export default function ProfilePage() {
    
    const router = useRouter();
    const logout = async()=> {

        try {

            await axios.get("/api/users/logout");
            router.push("/login");
            
        } catch (error : any) {
            console.log(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Profile Page</h1>
            <p className="text-4xl mt-6"> Profile Page</p>
            <hr />
            <button className="bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}> 
                Logout 
            </button>
        </div>
    )
}