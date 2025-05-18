import { redirect } from "next/navigation"
import { fetchApi } from "../utils/api"


export default function Register() {

    async function register(formdata:FormData){
        'use server'
        console.log(formdata)
        const res = await fetchApi("users/register/",{
            "method":"POST",
            "body":formdata
        })
        
        if (res.status/100 == 2){
            redirect(`/login`)
        }
    }

    return (
        <div className="w-full h-fit pt-10">
            <form className="w-1/5 mx-auto border border-black rounded-lg h-fit p-2 flex flex-col gap-3 items-center hover:shadow-lg" action={register}>
                <p className="text-3xl py-3 font-bold mx-auto text-center">Sign up</p>
                <input type="text" name="name" placeholder="Name" className="w-full text-xs border border-black rounded-md p-1" required={true}/>
                <input type="text" name="email" placeholder="Email" className="w-full text-xs border border-black rounded-md p-1" required={true}/>
                <input type="password" name="password" placeholder="Password" className="w-full text-xs border border-black rounded-md p-1" required={true}/>
                <div className="flex flex-row gap-2 w-full justify-between px-3">
                    <div >
                        <input type="radio" id="founder" name="type" value="Founder" className="text-black focus:ring-2 focus:ring-black accent-black" defaultChecked={true}/>
                        <label htmlFor="founder">Founder</label>
                    </div>
                    <div>
                        <input type="radio" id="student" name="type" value="Student" className="text-black focus:ring-2 focus:ring-black accent-black"/>
                        <label htmlFor="student">Student</label>
                    </div>
                </div>
                <input type="submit" className="text-center text-sm w-fit px-16 rounded-lg border  py-1 transition duration-1000 bg-black text-white hover:cursor-pointer hover:w-10/12 hover:border border-black hover:text-black hover:bg-transparent" value="Submit"/>
                <div className="w-fit mx-auto text-xs h-fit p-2 flex flex-row gap-2 items-center">
                <p>Already have an account? Please </p>
                <a href="/login" className="underline text-blue hover:scale-110 hover:text-red-500 transition duration-300">login</a>
            </div>
            </form>
            
        </div>
    )
}