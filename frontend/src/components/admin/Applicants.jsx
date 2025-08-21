import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '../utilis/(); constant'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'
import axios from 'axios'

const Applicants=() =>{
   // http://localhost:5173/admin/jobs/68977e021804d3424b8c358a/applicants
   //params will get that id 
   const params=useParams();
const dispatch=useDispatch();
const {applicants}=useSelector(store=>store.application);
console.log("appplicants",applicants);    
useEffect(()=>{
  const fetchAllApplicants=async()=>{
    try {
        const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
       console.log("API response",res.data) 
    dispatch(setAllApplicants(res.data.job.applications));

        
    } catch (error) {
        console.log(error);
    }
  }
  fetchAllApplicants();
    },[])
  return (
    
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-19'>
            <h1 className='font-bold text-xl my-5'>Applicants {applicants.length}</h1>
            <ApplicantsTable/>
       
        </div>
      
    </div>
  )
}

export default Applicants
