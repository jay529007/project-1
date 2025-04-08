import React, { useEffect, useState } from "react";
import jobs from "../../jobs.json";
import { Joblistingcard } from "./Joblistingcard";
import { VscLoading } from "react-icons/vsc";



export const Joblisting = ({isHome = false ,bg= "bg-indigo-100"}) => {

  const [jobs , setJobs] = useState([])
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const fetchJobs= async()=>{
      const apiUrl = isHome
        ? '/api/jobs?_limit=3'
        : '/api/jobs';

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
        console.log("done");
        
        // setLoading(false);
      }
    };
    fetchJobs();
  }, [])
  // const listjobs  = isHome?  jobs.slice(0,3) : jobs;
  if (loading) return <VscLoading className=" animate-spin text-6xl mx-200 my-80 text-gray-500 "/>
  if (!jobs) return <div>Job not found</div>;

  return (
    <>
      <section className={`px-4 ${bg} py-7`}>
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
             {isHome? " Recent Jobs" :"Browse Jobs" }
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Joblistingcard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
     
    </>
  );
};
