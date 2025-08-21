import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { JOB_API_END_POINT } from '../utilis/(); constant';
import { toast } from 'sonner';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '../ui/select'
import axios from 'axios';

 

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
          console.log("Submit triggered with input:", input); 
          console.log("API URL:", `${JOB_API_END_POINT}/post`);

        try {
            setLoading(true);
            console.log("Sending request...");
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            
    console.log("Response received:", res);
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className='flex items-center justify-center px-4 py-8 my-15'>
                <div className='w-full max-w-4xl'>
                    <div className="bg-card rounded-lg border border-border shadow-sm p-6 md:p-8">
                        <h1 className="text-2xl font-bold text-foreground mb-6">Post New Job</h1>
                        
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        placeholder="Enter job title"
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Location</Label>
                                    <Input
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="Enter job location"
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-sm font-medium text-foreground">Description</Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        placeholder="Enter job description"
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-sm font-medium text-foreground">Requirements</Label>
                                    <Input
                                        type="text"
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        placeholder="Enter job requirements (comma separated)"
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Salary (LPA)</Label>
                                    <Input
                                        type="text"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        placeholder="Enter salary"
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Job Type</Label>
                                    <Input
                                        type="text"
                                        name="jobType"
                                        value={input.jobType}
                                        onChange={changeEventHandler}
                                        placeholder="e.g., Full-time, Part-time"
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Experience Level (Years)</Label>
                                    <Input
                                        type="text"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        placeholder="Enter experience level"
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-foreground">Number of Positions</Label>
                                    <Input
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        placeholder="Enter number of positions"
                                        className="w-full"
                                        min="1"
                                    />
                                </div>
                                
                                {companies.length > 0 && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-sm font-medium text-foreground">Select Company</Label>
                                        <Select onValueChange={selectChangeHandler}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {companies.map((company) => (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                            {company.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                            
                            <div className="pt-4">
                                {loading ? (
                                    <Button disabled className="w-full">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full">
                                        Post New Job
                                    </Button>
                                )}
                                
                                {companies.length === 0 && (
                                    <p className='text-sm text-destructive font-medium text-center mt-4'>
                                        *Please register a company first, before posting a job
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostJob