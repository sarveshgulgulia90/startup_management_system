import { fetchApiAuth } from "../../utils/api";


async function Jobs({startup_id}){
    const res = await fetchApiAuth(`startups/jobs/${startup_id}`,{
        method:"GET",
        cache:"no-cache"
    })

    const jobs = await res.json()

    return (
        <div className="flex flex-col gap-4 overflow-y-scroll p-7">
            <p className="text-2xl font-bold text-center">
                Jobs
            </p>
            <div className="grid grid-cols-6 gap-4">
                {
                    jobs.map((job)=>
                        <a className="border border-black p-4 rounded-md" href={`/student/jobs/${job.static_id}`}>
                            <p className="font-bold">
                                {job.title}
                            </p>
                            <p>
                                {job.job_type}
                            </p>
                        </a>
                    )
                }
            </div>
        </div>
    )
}

async function Startup({params}){

    const res = await fetchApiAuth(`startups/detail/${params.startup}`,{
        method:"GET",
        cache:"no-cache"
    })

    const startup = await res.json()

    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <h1 className="w-full text-center text-6xl font-bold">
                {startup.name}
            </h1>
            <p>
                {startup.description}
            </p>
            <div>
                <p className="font-semibold">
                    Founders:
                </p>
                <div className="grid grid-cols-4">
                    {
                        startup.founders.map((founder)=><p>{founder.email}</p>)
                    }
                </div>
                
            </div>
            
        </div>
    );
}

export default function Page({params}){
    
    return (
        <div className="flex flex-col">
            <Startup params={params}/>
            <Jobs startup_id={params.startup}/>
        </div>
    )
}