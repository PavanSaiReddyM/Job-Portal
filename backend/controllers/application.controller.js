import { Application } from "../models/application.js";
import { Job } from "../models/job.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // ✅ Corrected field names in the query
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in applyJob:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const getAppliedJobs=async (req,res)=>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            //populate path:job will written all jobs applied, it should match with the compnay
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
            options:{sort:{createdAt:-1}},

            }
        });
if(!application){
    //404 is invalid
    //400 is not found
    //201 created
    //200 ok
    return res.status(404).json({
        message:"No applications",
        success:false
    });
};
return res.status(200).json({
    application,
    success:true
})
    } catch (error) {
        console.log("error");
    }
}

//applicants seen by admin;
export const getapplicants =async(req,res)=>{
    try {
        const jobid=req.params.id;
        //applicants applied for this job
        const job=await Job.findById(jobid).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
      if(!job){
        return res.status(404).json({
            message:'Job not found',
            success:false
        });
      };

      return res.status(200).json({
        job,
        success:true
      });



    } 
    catch (error) {
        console.log("error");
    }
}

export const updatestatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicantionid=req.params.id;
        if(!status){
             return res.status(400).json({
            message:'Status required',
            success:false
        });
        }
        //finding application by applicant id
        const application=await Application.findOne({_id:applicantionid});
        if(!application){
             return res.status(400).json({
            message:'Application not found',
            success:false
        });
        };

        //updation
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        });
        
    } catch (error) {
        console.log("error");
    }
}