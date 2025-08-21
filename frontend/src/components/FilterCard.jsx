import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobslice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh", "above 5lakh"],
  },
];

const FilterCard = () => {
  // Store selected filters as an object
  const [selectedFilters, setSelectedFilters] = useState({});
const dispatch=useDispatch();
  const changeHandler = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
  }, [selectedFilters]);

  const handleClearAll = () => {
    setSelectedFilters({});
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Filter Jobs</h2>
        <button
          onClick={handleClearAll}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          Clear All
        </button>
      </div>

      {filterData.map((data, index) => (
        <div key={index} className="space-y-3 mb-6">
          <h3 className="font-semibold text-foreground text-base border-b border-border pb-2">
            {data.filterType}
          </h3>
          <RadioGroup
            value={selectedFilters[data.filterType] || ""}
            onValueChange={(value) => changeHandler(data.filterType, value)}
            className="space-y-3"
          >
            {data.array.map((item, itemIndex) => {
              const itemId = `${data.filterType}-${itemIndex}`;
              return (
                <div key={itemIndex} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:text-primary"
                  />
                  <Label
                    htmlFor={itemId}
                    className={`text-sm text-muted-foreground hover:text-foreground cursor-pointer font-medium ${
                      selectedFilters[data.filterType] === item
                        ? "font-bold text-foreground"
                        : ""
                    }`}
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
