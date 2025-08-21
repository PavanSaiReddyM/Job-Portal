import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '../utilis/(); constant';
import axios from 'axios';
import { Badge } from '../ui/badge';

const shortlistingStatus = ["Accepted", "Rejected"];

const getStatusClasses = (status) => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="block md:hidden">
        {applicants && applicants.length > 0 ? (
          <div className="space-y-4">
            {applicants.map((item) => (
              <div key={item._id} className="p-4 border rounded-lg bg-white shadow-sm">
                <h3 className="font-semibold text-lg">{item?.applicant?.fullname}</h3>
                <p className="text-sm text-gray-600">{item?.applicant?.email}</p>
                <p className="text-sm text-gray-600">{item?.applicant?.phoneNumber}</p>
                <p className="text-sm mt-1">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-700 underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : 'No Resume'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                {/* Status or Action Buttons */}
                <div className="mt-3">
                  {item.status && (item.status === "Accepted" || item.status === "Rejected") ? (
                    <Badge className={`${getStatusClasses(item.status)} capitalize`}>
                      {item.status}
                    </Badge>
                  ) : (
                    <div className="flex gap-2">
                      {shortlistingStatus.map((status, index) => (
                        <button
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className={`px-3 py-1 rounded text-white text-sm ${
                            status === "Accepted" ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 p-4">No applicants found.</p>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>
            A list of your recent applied persons
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Fullname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applicants && applicants.length > 0 ? applicants.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a className="text-blue-700" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  {item.status && (item.status === "Accepted" || item.status === "Rejected") ? (
                    <Badge className={`${getStatusClasses(item.status)} capitalize`}>
                      {item.status}
                    </Badge>
                  ) : (
                    <Popover>
                      <PopoverTrigger className="cursor-pointer">
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className='w-32 p-2 bg-white rounded-md shadow-md cursor-pointer'>
                        {shortlistingStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className='px-2 py-1 hover:bg-gray-100 rounded cursor-pointer'
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  )}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No applicants found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
