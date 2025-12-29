import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Mail,
  Lock,
  GraduationCap,
  Building2,
  Loader2,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authslice";
import { toast } from "sonner";

const USER_API_END_POINT =
  "https://job-portal-ec1m.onrender.com/api/v1/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

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
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
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
              <KeyRound className="h-4 w-4" />
              Welcome back
            </div>
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">
              Access your account and continue
            </p>
          </div>

          {/* Card */}
          <div className="gradient-card rounded-2xl border p-6 shadow-elegant">
            <form onSubmit={submitHandler} className="space-y-5">
              {/* Email */}
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
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
                  placeholder="••••••••"
                />
              </div>

              {/* Role */}
              <div>
                <Label>Login as...</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setInput({ ...input, role: "student" })
                    }
                    className={`p-4 rounded-xl border-2 transition ${
                      input.role === "student"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <GraduationCap className="mx-auto mb-2 text-primary" />
                    <p className="font-medium">Student</p>
                    <span className="text-xs text-muted-foreground">
                      Job seeker
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setInput({ ...input, role: "recruiter" })
                    }
                    className={`p-4 rounded-xl border-2 transition ${
                      input.role === "recruiter"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Building2 className="mx-auto mb-2 text-primary" />
                    <p className="font-medium">Recruiter</p>
                    <span className="text-xs text-muted-foreground">
                      Hiring manager
                    </span>
                  </button>
                </div>
              </div>

              {/* Button */}
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={loading || !input.role}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight />
                  </>
                )}
              </Button>

              {/* Footer */}
              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-medium"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
            <Lock className="h-3 w-3" />
            <span>256-bit encrypted & secure</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
