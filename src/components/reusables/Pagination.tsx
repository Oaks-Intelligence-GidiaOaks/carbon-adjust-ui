// components/Pagination.tsx

import { PaginationProps } from "@/interfaces/pagination.interface";
import React from "react";

const Pagination: React.FC<PaginationProps> = (props) => {
  const handlePrevClick = () => {
    if (props.hasPrevPage) {
      props.onPageChange(props.currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (props.hasNextPage) {
      props.onPageChange(props.currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={handlePrevClick}
        disabled={!props.hasPrevPage}
        className={`px-4 py-2 rounded ${
          props.hasPrevPage
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Prev
      </button>

      <span>
        Page {props.currentPage} of {props.totalPages}
      </span>

      <button
        onClick={handleNextClick}
        disabled={!props.hasNextPage}
        className={`px-4 py-2 rounded ${
          props.hasNextPage
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
