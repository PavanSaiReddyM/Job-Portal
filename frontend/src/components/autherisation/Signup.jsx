import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  User,
  Mail,
  Phone,
  Lock,
  Upload,
  GraduationCap,
  Building2,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "../utilis/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authslice";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePhoto: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) =>
      formData.append(key, value)
    );

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen gradient-hero">
      <Navbar />

      <main className="container py-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              Create your account
            </div>
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Join and start your journey
            </p>
          </div>

          {/* Card */}
          <div className="gradient-card rounded-2xl border p-6 shadow-elegant">
            <form onSubmit={submitHandler} className="space-y-5">

              {/* Full Name */}
              <div>
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Full Name
                </Label>
                <Input
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone Number
                </Label>
                <Input
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="8080808080"
                  maxLength={10}
                />
              </div>

              {/* Password */}
              <div>
                <Label className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                />
              </div>

              {/* Role */}
              <div>
                <Label>I am a...</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["student", "recruiter"].map((role) => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setInput({ ...input, role })}
                      className={`p-4 rounded-xl border-2 text-center transition ${
                        input.role === role
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      {role === "student" ? (
                        <GraduationCap className="mx-auto mb-2 text-primary" />
                      ) : (
                        <Building2 className="mx-auto mb-2 text-primary" />
                      )}
                      <p className="font-medium capitalize">{role}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div>
                <Label className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Profile Photo
                </Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      profilePhoto: e.target.files[0],
                    })
                  }
                  className="block w-full mt-2 text-sm"
                />
              </div>

              {/* Button */}
              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Please wait
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight />
                  </>
                )}
              </Button>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Signup;
