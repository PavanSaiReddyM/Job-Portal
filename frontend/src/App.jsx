import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/autherisation/Login';
import Signup from './components/autherisation/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import Companiescreate from './components/admin/Companiescreate';
import CompanySetup from './components/admin/CompanySetup';
import Adminjobs from "./components/admin/Jobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import About from './components/About';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'jobs/description/:id', element: <JobDescription /> },
      { path: 'browse', element: <Browse /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  { path: '/login', element: <Login /> },
  {path:'/about',element:<About/>},
  { path: '/signup', element: <Signup /> },
  {path: '/admin/companies',element:<ProtectedRoute><Companies/></ProtectedRoute>}, 
  {path:'/admin/companies/create',element:<ProtectedRoute><Companiescreate/></ProtectedRoute>},
  {path:'/admin/companies/:id',element:<ProtectedRoute><CompanySetup/></ProtectedRoute>},
  {path:'/admin/jobs',element:<ProtectedRoute><Adminjobs/></ProtectedRoute>},
  {path:'/admin/jobpost',element:<ProtectedRoute><PostJob/></ProtectedRoute>},
  {path:'/admin/jobs/:id/applicants',element:<ProtectedRoute><Applicants/></ProtectedRoute>}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
