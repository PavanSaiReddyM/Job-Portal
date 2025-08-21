import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companyslice'
import Jobstable from './Jobstable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobslice'

const jobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
const adminJobs = useSelector((state) => state.job.allAdminJobs);

  
  useEffect(() => {
    console.log("Admin jobs from Redux:", adminJobs);
  }, [adminJobs]);
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearchJobByText(input));
    }, 300);

    return () => clearTimeout(delay);
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-20">
        <div className="flex items-center my-5 justify-between">
          <Input
            className="w-fit"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate("/admin/jobpost")}>
            New Jobs
          </Button>
        </div>
       <Jobstable/>
      </div>
    </div>
  );
};

export default jobs;
