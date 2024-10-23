import { PaginateProps } from "@/types/general";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/CardPagination";

const Paginate = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: PaginateProps) => {
  const handlePrevClick = () => {
    if (hasPrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  if (!currentPage) {
    return null;
  }

  return (
    <div className="mt-4 w-fit ">
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={handlePrevClick}>
            <PaginationPrevious href="#" isActive={!hasPrevPage} />
          </PaginationItem>

          {/* Render all the page links */}
          {renderPages()}

          <PaginationItem onClick={handleNextClick}>
            <PaginationNext href="#" isActive={!hasNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginate;
