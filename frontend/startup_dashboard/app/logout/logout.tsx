"use client"
import { redirect } from "next/navigation"
import { FormEvent,use,useEffect, useState } from "react";


export default async function Logout({user}:any){

    async function logout(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        const res = await fetch("/logout/api/",{
            method:"POST",
            cache:"no-cache",
        })

        if (res.status/100 == 2){
            window.location.reload()
            redirect("/login")
        }
    }
    console.log(user)
    return (
        <div className="w-[100%] h-fit bg-[#181C14] text-white p-4 rounded-bl-[10px] rounded-br-[10px]">
            {
                user &&
                <div className="w-full flex flex-row justify-between ">
                    <div className="text-[1rem]">
                        Hello! {user.name}
                    </div>
                    <button className="text-right text-black bg-white border border-black py-2 px-4 rounded-md hover:scale-105 hover:border-white hover:bg-black hover:text-white transition duration-300" onClick={logout}>
                        Logout
                    </button>
                </div>
            }
            

        </div>
        
    )
}