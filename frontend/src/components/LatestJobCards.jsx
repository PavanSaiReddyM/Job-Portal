import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";

const LatestJobCards = ({job}) => {
    const navigate=useNavigate();
    return (
        <div onClick={()=>navigate(`/jobs/description/${job._id}`)} className="p-4 sm:p-6 rounded-lg shadow-sm bg-background border border-border cursor-pointer 
                        hover:shadow-md hover:bg-surface-hover hover:border-brand-primary/20 
                        transition-all duration-200 transform hover:-translate-y-1 
                        w-full max-w-sm sm:max-w-md lg:max-w-lg">
            
           
            <div className="mb-3">
                <h1 className="font-semibold text-base sm:text-lg text-text-primary">{job?.company?.name}</h1>
                <p className="text-xs sm:text-sm text-text-secondary">{job?.location}</p>
            </div>

         
            <div className="mb-4">
                <h1 className="font-bold text-lg sm:text-xl text-text-primary mb-2">{job?.title}</h1>
                <p className="text-sm sm:text-base text-text-secondary line-clamp-2">
                  {job?.description}
                </p>
            </div>

           
            <div className="flex flex-wrap items-center gap-2">
                <Badge className="text-brand-primary font-semibold bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors" 
                       variant="secondary">
                    {job?.position}
                </Badge>
                <Badge className="text-text-accent font-semibold bg-text-accent/10 hover:bg-text-accent/20 transition-colors border-orange-200 text-orange-600" 
                       variant="secondary">
                    {job?.jobType}
                </Badge>
                <Badge className="text-brand-secondary font-semibold bg-brand-secondary/10 hover:bg-brand-secondary/20 transition-colors  border-blue-200 text-blue-600 " 
                       variant="secondary">
                    {job?.salary}LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;