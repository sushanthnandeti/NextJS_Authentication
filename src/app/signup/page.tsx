"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function SignupPage() {

    const router = useRouter(); 
    const [user, setUser] = React.useState({
        email : "",
        password : "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading ,setLoading]  = React.useState(false);


    const onSignup = async () => {
       try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            router.push("/login");
           

       } catch (error : any) {
            console.log("Signup Failed", error.message);
            

       } finally {
            setLoading(false)
       }
    }

    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="bg-red-300 rounded-lg text-3xl pb-3 mb-5">  {loading ? "Processing" : "Signup Page" } </h1>
            <hr />
            <label className = "pb-2 text-xl" htmlFor="username" > Username </label>
            <input
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:border-gray-600 text-black"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username : e.target.value})}
                placeholder="username"
            /> 
            
        
            <hr />
            <label className = "pb-2 text-xl" htmlFor="email" > Email </label>
            <input
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:border-gray-600 text-black"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email : e.target.value})}
                placeholder="email"
            /> 
     
            <hr />
            <label className = "pb-2 text-xl" htmlFor="password" > Password </label>
            <input
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:border-gray-600 text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password : e.target.value})}
                placeholder="password"
            /> 

            <button  
                onClick ={ onSignup }
                className=" text-2xl bg-emerald-400 p-2 border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"> 
                {buttonDisabled ? "Cant Signup" : "Signup"}
            </button>

            <Link  className = "text-2xl border-gray-300" href="/login"> Visit Login Page</Link>
            </div>
        </>
    );
}

