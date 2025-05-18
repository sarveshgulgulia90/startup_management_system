

// This page contains details related to job and application details if exists else a form to apply for the job



import { redirect } from "next/navigation";
import { fetchApiAuth } from "../../../utils/api";
import { BASE_URL } from "../../../utils/api";


interface JobIDProps {
    job:string
}

interface PathParams {
    params:JobIDProps
}


async function Apply({job}:any){
    async function applyJob(formdata:FormData){
        'use server'

        const res = await fetchApiAuth(`startups/applications/`,{
            "method":"POST",
            "cache":"no-cache",
            "body":formdata,
        })

        const data = await res.json()
        console.log(data)

        if (res.status/100 == 2){
            redirect(`/student/jobs/${job.static_id}`)
        }
    }

    return (
        <div className="w-full border border-black p-2 rounded-md mt-4">
            <form className="w-full flex flex-col gap-2 items-center" action={applyJob}>
                <input type="hidden" name="job_id" value={job.static_id} className="w-full border border-black p-1 rounded-md"/>
                <input required={true} type="file" placeholder="Resume URL" name="resume" className="w-full border border-black p-1 rounded-md"/>
                <input type="submit" value="Apply" className="w-fit p-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:shadow-md"/>
            </form>
        </div>
    )
}

function AlreadyApplied({resume}:any){
    return (
        <div className="w-full border border-black p-2 rounded-md mt-4">
            <div className="w-full text-center">
                You have already applied for this job with this <a href={resume} target="_blank" className="text-blue-500 hover:underline hover:cursor-pointer">
                    resume
                </a>
            </div>
            
        </div>
    )
}

async function JobDetails({job}:any){
    

    return (
        <div className="w-full border border-black p-6 rounded-md mt-4">
            <div className="w-full flex flex-col gap-2">
                <div className="w-full text-2xl">
                    {job.title}
                </div>
                <div className="w-full">
                    {job.description}
                </div>
            </div>
        </div>
    )
}     

export default async function Page({params}:PathParams){

    const res = await fetchApiAuth(`startups/jobs/detail/${params.job}`,{
        method:"GET",
        cache:"no-cache"
    })

    const job = await res.json()

    return (
        <div className="w-full h-full flex flex-col gap-2 p-4">
            <JobDetails job={job}/>
            {
                job.application ? <AlreadyApplied resume={job.application}/> : <Apply job={job}/>
            }
        </div>
    )
}