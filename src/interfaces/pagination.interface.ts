export interface PaginationProps {
  limit: number;
  prev: string | null;
  next: string | null;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
