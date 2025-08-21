import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Jobs = () => {
  useGetAllJobs();
  const { alljobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(alljobs);
  const [showFilters, setShowFilters] = useState(false); // NEW state for mobile filters

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === "object" && Object.keys(searchedQuery).length > 0) {
      const filteredJobs = alljobs.filter((job) => {
        let matches = true;

        if (searchedQuery.Location) {
          matches = matches && job.location?.toLowerCase() === searchedQuery.Location.toLowerCase();
        }
        if (searchedQuery.Industry) {
          matches = matches && job.title?.toLowerCase() === searchedQuery.Industry.toLowerCase();
        }
        if (searchedQuery.Salary) {
          const salary = Number(job.salary) || 0;
          switch (searchedQuery.Salary) {
            case "0-40k":
              matches = matches && salary <= 0.40;
              break;
            case "42-1lakh":
              matches = matches && salary >= 0.42 && salary <= 1;
              break;
            case "1lakh to 5lakh":
              matches = matches && salary >= 1 && salary <= 5;
              break;
            case "above 5lakh":
              matches = matches && salary > 5;
              break;
          }
        }
        return matches;
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs);
    }
  }, [alljobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Mobile filter toggle button */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-xl font-bold">{filterJobs.length} Jobs Available</h2>
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90"
          >
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters for desktop */}
          <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <FilterCard />
            </div>
          </div>

          {/* Job list */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No jobs found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="bg-white w-72 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>
            <FilterCard />
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setShowFilters(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
