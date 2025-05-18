"use client"
import { redirect, useRouter } from "next/navigation"
import { FormEvent } from "react";



export default function Login() {

    const router = useRouter();

    async function login(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const res = await fetch("/login/api/",{
            method:"POST",
            cache:"no-cache",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username:formData.get("email"),
                password:formData.get("password")
            })
        })


        
        if (res.status/100 == 2){
            let data = await res.json()
            console.log(data)
            console.log(res.headers)
            if(data.user_type.toUpperCase() === "STUDENT"){
                redirect("/student")
            }
            else if(data.user_type.toUpperCase() === "FOUNDER"){
                redirect("/founder")
            }

        }
    }

    return (
        <div className="w-full h-fit pt-10">
            <form className="w-1/5 mx-auto border border-black rounded-3xl h-full p-2 flex flex-col gap-2 items-center bg-opacity-75 hover:shadow-lg" onSubmit={login}>
                <p className="text-3xl font-bold mx-auto text-center pb-6 pt-2">Login</p>
                <input type="text" name="email" placeholder="Email"  className="text-xs w-full border border-black rounded-md p-1"/>
                <input type="password" name="password" placeholder="Password" className="text-xs w-full border border-black rounded-md p-1"/>
                <div className="flex flex-row gap-2 w-full justify-between px-3">
                </div>
               
                <input type="submit" className="text-center text-sm w-fit px-16 rounded-lg border  py-1 transition duration-1000 bg-black text-white hover:cursor-pointer hover:w-10/12 hover:border border-black hover:text-black hover:bg-transparent" value="login"/> 
                <div className="w-fit mx-auto   h-full p-6 flex flex-row gap-2 items-center text-xs">
                <p >Don't have an account? </p>
                <a href="/register" className="underline hover:scale-110 hover:text-red-500 transition duration-300">Register</a>
            </div>
            </form>
            
        </div>
        
    );
}