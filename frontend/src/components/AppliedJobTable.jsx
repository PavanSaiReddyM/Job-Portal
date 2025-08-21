import React from "react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job);

const getStatusClasses = (status) => {
  switch (status?.toLowerCase()) {
    case "selected":
    case "accepted":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "interview":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="w-full bg-background rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Applied Jobs</h3>
          <p className="text-sm text-muted-foreground">A list of your applied jobs</p>
        </div>

        {allAppliedJobs.length === 0 ? (
          <p className="p-4 text-center text-muted-foreground">
            You haven't applied to any jobs yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {allAppliedJobs.map((job, index) => (
              <div key={job?._id || index} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">{job.job?.title || job.role}</h4>
                    <p className="text-sm text-muted-foreground">{job.job?.company?.name || job.company}</p>
                  </div>
         <Badge className={`${getStatusClasses(job.status)} capitalize`}>
  {job.status}
</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{formatDate(job.createdAt || job.date)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableCaption className="text-muted-foreground">
            A list of your applied jobs
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-foreground">Date</TableHead>
              <TableHead className="font-semibold text-foreground">Job Role</TableHead>
              <TableHead className="font-semibold text-foreground">Company</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-muted-foreground">
                  You haven't applied to any jobs yet.
                </td>
              </tr>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob?._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium text-foreground">
                    {formatDate(appliedJob.createdAt)}
                  </TableCell>
                  <TableCell className="text-foreground">{appliedJob.job?.title}</TableCell>
                  <TableCell className="text-foreground">{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
               <Badge className={`${getStatusClasses(appliedJob.status)} capitalize`}>
  {appliedJob.status}
</Badge>

                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
