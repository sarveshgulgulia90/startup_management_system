

// This page contains details related to job and application details if exists else a form to apply for the job



import { fetchApiAuth } from "../../../utils/api";


function ApplicationCard({application}:any) {
    return (
        <div className="rounded-lg border border-black p-2 text-md text-black flex flex-col">
            <p className="text-center font-bold">
                {application.applicant.name}
            </p>
            <p>
                Application Email: {application.applicant.email}
            </p>
            <p>
                Applied on: {application.date_of_application}
            </p>
            <a href={application.resume} target="_blank" className="text-blue-500 hover:underline">
                Resume
            </a>
        </div>
    );
}

async function Applications({job}:any){
    
    const res = await fetchApiAuth(`startups/applications/?job_static_id=${job.static_id}`,{
        method:"GET",
        cache:"no-cache"
    })

    const applications = await res.json()
    console.log(applications)

    return (
        <div className="w-full flex flex-col gap-3 h-full ">
            <p className="font-bold text-center">
                Applications
            </p>
            <div className="overflow-y-scroll p-3 grid grid-cols-6 gap-2 border borcer-black">
                {
                    applications.map((application)=><ApplicationCard application={application}/>)
                }
            </div>
        </div>
    );
}



async function JobDetails({job}:any){
    

    return (
        <div className="w-[99%] text-[#ECDFCC]  border bg-[#181C14] p-6 rounded-md mt-4">
            <div className="w-full flex flex-col gap-2">
                <div className="w-full text-[3rem] font-[550] font-sans text-center uppercase">
                    {job.title}
                </div>
                <div className="w-full tracking-[.3rem] capitalize">
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
            <Applications job={job}/>
        </div>
    )
}