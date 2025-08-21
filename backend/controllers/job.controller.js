import { Job } from "../models/job.js";
export const postjob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        // const userId = req.id;
const userId = req.id || "64d1234abcdef56789012345"; // example valid user id string

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({  // 400 is better for validation errors
                message: "Something is missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({  // 201 Created is better here
            message: "New job created successfully",
            success: true
        });
    } catch (error) {
        console.error("Error in postjob:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = { //mongodb search the queries by the keyword
            $or: [
                { title: { $regex: keyword, $options: "i" } },
               { description: { $regex: keyword, $options: "i" } },

            ]
        };
        const jobs = await Job.find(query).populate('company');
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log("error");
    }
}
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        })
       
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log("error");
    }
}

export const getAdminjobs=async (req,res)=>{
    try {
        const adminid=req.id;
        const jobs=await Job.find({created_by:adminid}).populate({
            path:'company',
            createdAt:-1
        });
         if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })


        
    } catch (error) {
        console.log("error");
    }
}