import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  if (!job) return null;

  return (
    <div className="group p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/50">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        {/* Save Icon */}
        <div
          onClick={() => {
            if (!user) {
              toast.error("User not authenticated. Please login first.");
              return;
            }
            toast.success("Job saved successfully");
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            disabled={!user}
            className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={job?.company?.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">
            {job?.company?.name}
          </h3>
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
          {job?.position} Positions
        </Badge>
        <Badge variant="outline" className="text-xs border-orange-200 text-orange-600">
          {job?.jobType}
        </Badge>
        <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex gap-3">

        {/* View Details */}
        <div
          className="flex-1"
          onClick={() => {
            if (!user) {
              toast.error("User not authenticated. Please login first.");
              return;
            }
            navigate(`/jobs/description/${job?._id}`);
          }}
        >
          <Button
            variant="outline"
            size="sm"
            disabled={!user}
            className="w-full hover:bg-primary hover:text-primary-foreground"
          >
            View Details
          </Button>
        </div>

        {/* Save Job */}
        <div
          className="flex-1"
          onClick={() => {
            if (!user) {
              toast.error("User not authenticated. Please login first.");
              return;
            }
            toast.success("Job saved successfully");
          }}
        >
          <Button size="sm" disabled={!user} className="w-full">
            Save Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
