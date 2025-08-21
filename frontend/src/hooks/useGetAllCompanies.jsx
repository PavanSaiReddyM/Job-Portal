import axios from 'axios';
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '../components/utilis/(); constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany,setCompanies } from '../redux/companyslice';
const useGetAllCompanies=()=> {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchCompanies=async ()=>{
        try {
            const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setCompanies(res.data.companies));

            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchCompanies();
  },[dispatch])
}

export default useGetAllCompanies;
