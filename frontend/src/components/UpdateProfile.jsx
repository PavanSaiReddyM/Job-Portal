import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Upload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from './utilis/(); constant'; // ⚠️ Fix path if needed

import axios from 'axios';
import { setUser } from '../redux/authslice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };
const handleProfilePhotoChange = (e) => {
  const file = e.target.files?.[0];
  if (file) setProfilePhotoFile(file);
};
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append("skills", input.skills);

    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    if (profilePhotoFile) {
  formData.append('profilePhoto', profilePhotoFile);
}

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update Profile</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update your profile information to help employers know more about you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Personal Information</h3>

              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Skills</h3>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="e.g., React, Node, CSS"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Resume</h3>

              <div className="space-y-2">
                <Label htmlFor="file">Upload Resume (PDF only)</Label>
                <div className="relative">
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                {resumeFile && (
                  <p className="text-sm text-muted-foreground">Selected: {resumeFile.name}</p>
                )}
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Profile Photo</h3>

                <div className="space-y-2">
                  <Label htmlFor="profilePhoto">Upload Profile Photo</Label>
                  <div className="relative">
                    <Input
                      id="profilePhoto"
                      name="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                    />
                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {profilePhotoFile && (
                    <p className="text-sm text-muted-foreground">Selected: {profilePhotoFile.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-[100px]">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
