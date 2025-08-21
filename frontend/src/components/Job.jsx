import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
 const navigate=useNavigate() ;
const daysAgoFunction=(mongodbTime)=>{
  const createdAt=new Date(mongodbTime);
  const currentTime=new Date();
  const timedifference=currentTime-createdAt;
  return Math.floor(timedifference/(1000*24*60*60));
}
if (!job) return null; 

  return (
    <div className="group p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage 
            src={job?.company?.logo}
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">{job?.company?.name}</h3>
          <p className="text-sm text-muted-foreground">{job?.location}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h2 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {job?.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
{job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="secondary" className="text-xs">
          {job?.position}Positions
        </Badge>
        <Badge variant="outline" className="text-xs border-orange-200 text-orange-600">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
          {job?.salary}LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
        onClick={()=>navigate(`/jobs/description/${job?._id}`)}
          variant="outline" 
          size="sm" 
          className="flex-1 hover:bg-primary hover:text-primary-foreground"
        >
          View Details
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
        >
          Save Job
        </Button>
      </div>
    </div>
  );
};

export default Job;