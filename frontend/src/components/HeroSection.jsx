import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobslice";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const HeroSection = () => {
  const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) {
   toast("Please enter something to search!!");
    return;
  }
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
  return (
    <section className="relative text-center mt-20 px-4 sm:px-6">
      
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-purple-200 opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-pink-200 opacity-30 rounded-full blur-3xl z-0"></div>

     
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
    
        <span className="px-4 py-1 rounded-full bg-gray-100 text-[#F83002] text-sm font-semibold">
          No.1 Job Hunt website
        </span>

    
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
          Search, Apply &<br />
          Get Your{" "}
          <span className="bg-gradient-to-r from-[#6A38C2] to-[#9D7EE5] text-transparent bg-clip-text">
            Dream Jobs
          </span>
        </h1>

      
        <p className="text-gray-600 text-base sm:text-lg max-w-xl">
          Discover thousands of opportunities tailored for you. Apply easily and
          start your career journey today!
        </p>

    <div className="flex w-full max-w-xl shadow-md border border-gray-200 pl-4 pr-1 py-1 rounded-full items-center gap-2 bg-white">
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Find your dream jobs"
    className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
    onKeyDown={(e) => {
      if (e.key === "Enter") searchJobHandler();
    }}
  />
  <Button
    onClick={searchJobHandler} 
    className="rounded-full bg-[#6A38C2] hover:bg-[#5b2db1] transition-colors duration-200"
  >
    <Search className="h-5 w-5" />
  </Button>
</div>

      
      </div>
    </section>
  );
};

export default HeroSection;
