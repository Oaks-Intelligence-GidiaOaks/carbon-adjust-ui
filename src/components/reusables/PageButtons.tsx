import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

// Define the props interface
interface PaginationProps {
  totalPages: number; // Total number of pages
  currentPage: number; // Current page number
  onPageChange: (page: number) => void; // Callback for page change
}

const PaginationButtons: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  // Function to handle page changes
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page); // Call the parent function to handle page change
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    
    if (totalPages <= 4) {
      // Render all buttons if total pages are less than or equal to 5
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            className={`px-2 py-1 rounded-md text-sm border ${currentPage === i ? 'bg-white text-gray-400' : 'text-gray-500'}`}
            onClick={() => handlePageChange(i)} // Call handlePageChange
          >
            {i}
          </button>
        );
      }
    } else {
      // Handle ellipsis logic for larger page counts
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageButtons.push(
            <button
              key={i}
              className={`px-2 py-1 rounded-md text-sm ${currentPage === i ? 'bg-gray-500 text-white' : 'text-gray-500'}`}
              onClick={() => handlePageChange(i)} // Call handlePageChange
            >
              {i}
            </button>
          );
        }
        pageButtons.push(<span key="ellipsis1" className="px-2">...</span>);
        pageButtons.push(
          <button
            key={totalPages}
            className="px-2 py-1 rounded-md text-sm border text-gray-500"
            onClick={() => handlePageChange(totalPages)} // Call handlePageChange
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 2) {
        pageButtons.push(
          <button
            key={1}
            className="px-2 py-1 rounded-md text-sm border text-gray-500"
            onClick={() => handlePageChange(1)} // Call handlePageChange
          >
            1
          </button>
        );
        pageButtons.push(<span key="ellipsis2" className="px-2">...</span>);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageButtons.push(
            <button
              key={i}
              className={`px-2 py-1 rounded-md text-sm border ${currentPage === i  ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500"}`}
              onClick={() => handlePageChange(i)} // Call handlePageChange
            >
              {i}
            </button>
          );
        }
      } else {
        pageButtons.push(
          <button
            key={1}
            className="px-2 py-1 rounded-md text-sm text-gray-500 border"
            onClick={() => handlePageChange(1)} // Call handlePageChange
          >
            1
          </button>
        );
        pageButtons.push(<span key="ellipsis3" className="px-2">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageButtons.push(
            <button
              key={i}
              className={`px-2 py-1 rounded-md text-sm ${currentPage === i ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500"}`}
              onClick={() => handlePageChange(i)} // Call handlePageChange
            >
              {i}
            </button>
          );
        }
        pageButtons.push(<span key="ellipsis4" className="px-2">...</span>);
        pageButtons.push(
          <button
            key={totalPages}
            className="px-2 py-1 rounded-md text-sm text-gray-500"
            onClick={() => handlePageChange(totalPages)} // Call handlePageChange
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-center items-center mt-6 overflow-x-auto whitespace-nowrap">
      {/* Previous Button */}
      <button
        className={`flex items-center gap-0.5 sm:gap-2 px-2 md:px-3 py-1 rounded-md text-xs md:text-sm border bg-white mr-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-400'}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" /> Previous
      </button>

      {/* Render page buttons */}
      {renderPageButtons()}

      {/* Next Button */}
      <button
        className={`flex items-center gap-0.5 sm:gap-2 px-2 md:px-3 py-1 rounded-md text-xs md:text-sm  border bg-white ml-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-400'}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PaginationButtons;
