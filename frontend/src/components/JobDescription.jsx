import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Building2, Calendar, Users, DollarSign, Clock } from "lucide-react";
import { useParams } from "react-router";
import axios from "axios";
import { setSingleJob } from "../redux/jobslice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "./utilis/(); constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const user = useSelector((store) => store.auth.user);
  const params = useParams();
  const jobid = params.id;
  const dispatch = useDispatch();
  const singleJob = useSelector((store) => store.job.singleJob);

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (singleJob && user) {
      const applied = singleJob.applications?.some(
        (application) =>
          application.applicant === user._id ||
          application.applicant?._id === user._id
      );
      setIsApplied(!!applied);
    }
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobid}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id }
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message); 
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobid) {
      fetchSingleJob();
    }
  }, [jobid, dispatch, user?._id]);

  const jobDetails = [
    { label: "Role", value: singleJob?.title || "N/A", icon: Building2 },
    { label: "Location", value: singleJob?.location || "N/A", icon: MapPin },
    { label: "Experience", value: `${singleJob?.experienceLevel || 0} Years`, icon: Clock },
    { label: "Salary", value: `${singleJob?.salary || 0} LPA`, icon: DollarSign },
    { label: "Total Applicants", value: singleJob?.applications?.length || 0, icon: Users },
    {
      label: "Posted Date",
      value: singleJob?.createdAt
        ? new Date(singleJob.createdAt).toLocaleDateString()
        : "N/A",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {singleJob?.title || "Job Title"}
                </h1>
                <p className="text-muted-foreground">
                  {singleJob?.description || "Job description"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
                >
                  {singleJob?.position || 0} Positions
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"
                >
                  {singleJob?.jobType || "Job Type"}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
                >
                  {singleJob?.salary || 0} LPA
                </Badge>
              </div>
            </div>

            <Button
              onClick={!isApplied ? applyJobHandler : null}
              disabled={isApplied}
              className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : ""}`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-6 pb-4 border-b border-border">
            Job Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobDetails.map((detail, index) => {
              const IconComponent = detail.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="text-foreground font-semibold">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Job Description Section */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-6 pb-4 border-b border-border">
            Job Description
          </h2>

          <div className="prose max-w-none text-foreground">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">About the Role</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {singleJob?.description || "No description available"}
                </p>
              </div>

              {singleJob?.requirements && singleJob.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {singleJob.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3">Job Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                  <div>
                    <span className="font-medium">Experience Level:</span>{" "}
                    {singleJob?.experienceLevel || 0} years
                  </div>
                  <div>
                    <span className="font-medium">Job Type:</span>{" "}
                    {singleJob?.jobType || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{" "}
                    {singleJob?.location || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Positions Available:</span>{" "}
                    {singleJob?.position || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default JobDescription;
