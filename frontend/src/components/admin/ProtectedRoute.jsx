import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    //here we are getting the <ProtectedRoute><Companies/></ProtectedRoute> comapnies as children if he is 
    // recruiter then it will return {children}
    useEffect(() => {
        if (user === null || user.role !== 'recruiter') {
            navigate("/");
        }
    }, []);
    return (
        <>
            {children}</>
    )
};
export default ProtectedRoute;