import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanisTable from './CompanisTable'
import { useNavigate } from 'react-router'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companyslice'

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearchCompanyByText(input));
    }, 300);

    return () => clearTimeout(delay);
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-20">
        <div className="flex items-center my-5 justify-between">
          <Input
            className="w-fit"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompanisTable />
      </div>
    </div>
  );
};

export default Companies;
