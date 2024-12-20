import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

interface Filter {
  label: string;
  id: string;
}

interface SearchFilterBarProps {
  activeFilters: Filter[];
  totalResults: number;
  onRemoveFilter: (id: string) => void;
  sortOptions: string[];
  defaultSortOption: string;
  onSortChange: (selected: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  // activeFilters,
  // totalResults,
  // onRemoveFilter,
  sortOptions,
  defaultSortOption,
  onSortChange,
}) => {
  const [sortOption, setSortOption] = useState(defaultSortOption);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    onSortChange(selectedOption);
  };

  return (
    <div className="w-full bg-white container  justify-between mb-10">

    <div className="flex items-center justify-between">
      {/* Search Input */}
      <div className="flex items-center w-[70%] relative">
        <input
          type="text"
          placeholder="Search for anything..."
          className="flex-grow border border-gray-300 rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon  className="absolute top-2 right-3"/>  
          
      </div>
      {/* Sort Dropdown */}
      <div className="relative flex gap-3 items-center">
        <p>Sort by:</p>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters and Sorting */}
      {/* <div className="flex items-center space-x-4 justify-between w-full my-10 bg-[#F2F4F5] p-4"> */}
        {/* Active Filters */}
        {/* <div className="flex space-x-2 items-center gap-1 "><p className="text-sm text-[#5F6C72]">Active Filters:</p> 
          {activeFilters.map((filter) => (
            <span
              key={filter.id}
              className=" text-sm flex items-center"
            >
              {filter.label}
              <button
                onClick={() => onRemoveFilter(filter.id)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div> */}
        {/* Results Found */}
      {/* <div className="text-[#191C1F] text-sm">
        <span>{totalResults.toLocaleString()} <span className="text-sm text-[#5F6C72]">Results found</span></span>
      </div>
      </div> */}

   
    </div>
  );
};

export default SearchFilterBar;
