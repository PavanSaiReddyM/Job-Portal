import { Divide } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import React from "react";
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "../utilis/(); constant";
import { Content } from "@radix-ui/react-popover";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from '../../redux/authslice'
 import { useDispatch, useSelector } from 'react-redux';
 import {toast} from "sonner";
const Signup = () => {
    const navigate=useNavigate();
         const dispatch = useDispatch();
    const {loading}=useSelector(store=>store.auth);
    const {user}=useSelector(store=>store.auth);
     const [input,setInput]=useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });
   const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
};

    const changeFileHandler=(e)=>{
        setInput({...input,file:e.target.files?.[0]});

    }
    const submithandler=async(e)=>{
        e.preventDefault();
       const formData=new FormData();
       formData.append("fullname",input.fullname);
       formData.append("email",input.email);
       formData.append("phoneNumber",input.phoneNumber);
       formData.append("password",input.password);
       formData.append("role",input.role);
    formData.append("profilePhoto", input.profilePhoto);
       try {
         dispatch(setLoading(true));
        const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
        });
        if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);
        }
       } catch (error) {
        console.log(error.response?.data || error.message);

       }
       finally{
                    dispatch(setLoading(false));
               }

    }
useEffect(()=>{
  if(user){
    navigate("/");
  }
    },[]);
    return (
        <><div><Navbar />
         <div className='flex items-center justify-center max-w-7xl mx-auto mt-15'>
                <form  onSubmit={submithandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label className="mb-2 block">Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="mb-2 block">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="abc@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className="mb-2 block">Phone Number</Label>
                        <Input
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            pattern="[0-9]{10}"
                            maxLength={10}
                        />

                    </div>
                    <div className='my-2'>
                        <Label className="mb-2 block">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="********"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                    <RadioGroup className='flex items-center gap-4 my-5'>
                        <div className="flex items-center space-x-2">
                            <Input
                            type="radio"
                            name="role"
                            value="student"
                            checked={input.role==='student'}
                            onChange={changeEventHandler}
                            className="cursor-pointer"
                            />
                            

                        
                            <Label htmlFor="r1" >Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                              <Input
                            type="radio"
                            name="role"
                            value="recruiter"
                            checked={input.role==='recruiter'}
                            onChange={changeEventHandler}
                            className="cursor-pointer"
                            />
                            
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                    </RadioGroup>
                   <input
  type="file"
  name="profilePhoto"
  accept="image/*"
  onChange={(e) =>
    setInput({ ...input, profilePhoto: e.target.files[0] })
  }
/>
</div>
                        {
        loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 animate-spin"/>Please wait</Button>:
<Button type="submit" className="w-full my-4">Signup</Button>
 }
                        <span className="text-sm">Already have an account?<Link to='/login' className="text-blue-500">Login</Link></span>
                </form></div>
        </div>
           



        </>
    )
}
export default Signup;