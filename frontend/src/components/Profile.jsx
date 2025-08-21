import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profile Header Card */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Avatar */}
              <Avatar
                onClick={() => setImageModalOpen(true)}
                className="h-24 w-24 border-4 border-brand-primary/20 rounded-full overflow-hidden cursor-pointer mx-auto sm:mx-0"
              >
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="Profile avatar"
                  className="object-cover w-full h-full"
                />
              </Avatar>

              {/* Name + Bio */}
              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-2xl font-bold text-foreground break-words">
                  {user?.fullname || "Your Name"}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {user?.profile?.bio ||
                    "Add your bio to showcase your expertise"}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="self-center w-full sm:w-auto"
            >
              <Pen className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Contact, Skills, Resume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Contact Information
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 break-all">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {user?.email || "Add your email"}
                </span>
              </div>
              <div className="flex items-center gap-3 break-all">
                <Contact className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground">
                  {user?.phoneNumber || "Add your phone"}
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
                    variant="secondary"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No skills listed
                </p>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm sm:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Resume
            </h2>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-brand-primary font-medium underline text-sm break-all"
              >
                {user?.profile?.resumeOriginalName || "Download Resume"}
              </a>
            ) : (
              <span className="text-muted-foreground text-sm">NA</span>
            )}
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm overflow-x-auto">
          <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>

      {/* Update Profile Modal */}
      <UpdateProfile open={open} setOpen={setOpen} />

      {/* Image Modal */}
      {imageModalOpen && (
        <div
          onClick={() => setImageModalOpen(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
        >
          <img
            src={user?.profile?.profilePhoto}
            alt="Full Profile"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg border border-white object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
