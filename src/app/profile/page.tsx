"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";


export default function ProfilePage() {
    
    const router = useRouter();
    const [data,setData] = useState("nothing");
    const logout = async()=> {

        try {

            await axios.get("/api/users/logout");
            router.push("/login");
            
        } catch (error : any) {
            console.log(error.message);
        }
    }

    const getUserDetails = async() => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Profile Page</h1>
            <p className="text-4xl mt-6"> Profile Page</p>
            <h2 className="p-1 rounded bg-pink-300"> {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}> {data}</Link>}</h2>
            <hr />
            <button className="bg-red-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getUserDetails}> 
                GetUserDetails 
            </button>
            <button className="bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}> 
                Logout 
            </button>
        </div>
    )
}