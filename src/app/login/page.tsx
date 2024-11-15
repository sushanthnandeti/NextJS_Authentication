"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { axios } from "axios";


export default function LoginPage() {

    const [user, setUser] = React.useState({
        email : "",
        password : "",
    });

    const onLogin = async () => {

    }

    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="bg-red-300 rounded-lg text-3xl pb-3 mb-5">  Login Page </h1>
        
            <hr />

            <label className = "pb-2 text-xl" htmlFor="email" > Email </label>
            <input
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:border-gray-600"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email : e.target.value})}
                placeholder="email"
            /> 
     
            <hr />
            <label className = "pb-2 text-xl" htmlFor="password" > Password </label>
            <input
                className="p-3 border border-gray-300 rounded-lg mb-4 focus:border-gray-600"
                type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password : e.target.value})}
                placeholder="password"
            /> 

            <button  
                onClick ={ onLogin }
                className=" text-2xl bg-emerald-400 p-2 border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600"> Login
            </button>

            <Link  className = "text-2xl border-gray-300" href="/signup"> Visit Signup Page</Link>
            </div>
        </>
    );
}

