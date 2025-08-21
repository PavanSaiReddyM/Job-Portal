import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { setUser } from '../../redux/authslice';
import { LogOut, Menu, User2Icon, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../utilis/(); constant';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.user;


  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message || 'Logged out successfully');
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Logout error occurred');
    }
  };

  return (
    <nav className="bg-background border-b border-border shadow-sm fixed top-0 w-full z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-text-primary">
            Job<span className="text-text-accent">Portal</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="text-text-primary hover:text-brand-primary transition-colors duration-200 py-2"
                  >
                    Companies
                  </Link>
                </li>
                <li className="text-text-primary hover:text-brand-primary transition-colors duration-200 cursor-pointer">
                  <Link to="/admin/jobs"> Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="text-text-primary hover:text-brand-primary transition-colors duration-200 py-2"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-text-primary hover:text-brand-primary transition-colors duration-200 cursor-pointer">
                  <Link to="/jobs"> Jobs</Link>
                </li>
                <li className="text-text-primary hover:text-brand-primary transition-colors duration-200 cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-white hover:bg-black">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-surface-hover transition-colors duration-200">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback className="bg-brand-primary text-white">
                      CN
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4" align="end">
                <div className="flex gap-4 pb-4 border-b border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback className="bg-brand-primary text-white">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{user?.fullname}</h4>
                    <p className="text-sm text-text-secondary">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {user?.role === 'student' && (
                  <div className="flex w-fit items-center gap-2 cursor-pointer mt-3">
                    <User2Icon />
                    <Button variant="link" className="cursor-pointer">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}

                <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                  <LogOut />
                  <Button variant="link" className="cursor-pointer" onClick={logoutHandler}>
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-background px-6 pb-4 pt-2 space-y-3 border-t border-border">
          <Link to="/" className="block text-text-primary hover:text-brand-primary">
            Home
          </Link>
          <span className="block text-text-primary hover:text-brand-primary">Jobs</span>
          <span className="block text-text-primary hover:text-brand-primary">Browse</span>

          {!user ? (
            <div className="flex flex-col gap-3 pt-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full text-white hover:bg-black">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="pt-4">
              {user?.role === 'student' && (
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2Icon />
                  <Button variant="link" className="cursor-pointer">
                    <Link to="/profile">View Profile</Link>
                  </Button>
                </div>
              )}

              <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                <LogOut />
                <Button onClick={logoutHandler} className="block py-2" variant="link">
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
