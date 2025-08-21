import { Link, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from "../ui/radio-group";
import Navbar from "../shared/Navbar";
import { setLoading, setUser } from '@/redux/authSlice'
import { Button } from "../ui/button";
import { Loader2 } from 'lucide-react'
 import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";


const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

const Login = () => {
    const navigate = useNavigate();
     const dispatch = useDispatch();
    const {loading}=useSelector(store=>store.auth);
    const {user}=useSelector(store=>store.auth);
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
               console.log("res.data:", res.data);      
console.log("res.data.user:", res.data.user);
                 dispatch(setUser(res.data.user)); 
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Login failed");
        }finally{
             dispatch(setLoading(false));
        }
    };
    useEffect(()=>{
  if(user){
    navigate("/");
  }
    },[])

    return (
        <>
            <div>
                {/* <Navbar /> */}
                <div className='flex items-center justify-center max-w-7xl mx-auto mt-15'>
                    <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                        <h1 className='font-bold text-xl mb-5'>Login</h1>

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
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
 {
        loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 animate-spin"/>Please wait</Button>:
<Button type="submit" className="w-full my-4">Login</Button>
 }
                        
                        <span className="text-sm">Don't have an account?<Link to='/signup' className="text-blue-500">Signup</Link></span>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;