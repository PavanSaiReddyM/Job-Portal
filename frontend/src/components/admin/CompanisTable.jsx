import React, { useEffect, useState } from 'react';
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '../ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const CompanisTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(companies)) {
      const filteredCompany = companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
      setFilterCompany(filteredCompany);
    } else {
      setFilterCompany([]);
    }
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[600px] sm:min-w-full">
        <TableCaption className="text-sm sm:text-base">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            {/* Hide Date on extra small screens */}
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
    <Avatar className="w-full h-full">
      <AvatarImage
        src={company.logo}
        alt="Logo"
        className="w-full h-full object-cover"
      />
    </Avatar>
  </div>
</TableCell>

              <TableCell className="text-sm sm:text-base">{company.name}</TableCell>
              {/* Hide Date on extra small screens */}
              <TableCell className="hidden sm:table-cell text-sm sm:text-base">
                {company.createdAt.split('T')[0]}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanisTable;
