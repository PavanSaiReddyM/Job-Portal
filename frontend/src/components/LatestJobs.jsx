import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { alljobs } = useSelector((store) => store.job);

  console.log("latest", alljobs);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {alljobs.length !== 0 ? (
          [...alljobs] 
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <span>Jobs not found</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
