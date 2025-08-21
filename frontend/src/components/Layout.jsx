import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authslice";
import { USER_API_END_POINT } from "./utilis/(); constant";
import Navbar from "./shared/Navbar";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
