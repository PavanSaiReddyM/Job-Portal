import axios from 'axios';
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../components/utilis/(); constant';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs, setAllJobs } from '../redux/jobslice';

const useGetAllAdminJobs=()=> {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs=async ()=>{
        try {
            const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{
                withCredentials:true
            })
            if(res.data.success){
                console.log('jobs recieved');
                dispatch(setAllAdminJobs(res.data.jobs));

            }
        } catch (error) {

            console.log('api error');
        }
    }
    fetchAllAdminJobs();
  },[])
}

export default useGetAllAdminJobs
