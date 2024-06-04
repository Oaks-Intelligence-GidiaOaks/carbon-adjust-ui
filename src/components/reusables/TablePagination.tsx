import {
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";
import PaginationButton from "./PaginationButton";

const TablePagination = ({ table }: { table: any }) => {
  return (
    <div className="flex font-poppins flex-wrap justify-center min-[720px]:justify-between gap-x-10 items-center my-3 gap-3 ml-auto w-full px-2 sm:px-6">
      <div className="flex flex-wrap gap-y-2 my-6 justify-center text-sm">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}&nbsp;
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 focus:outline-ca-blue"
          />
        </span>
        <select
          className="ml-4 border rounded focus:outline-ca-blue"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <div className="flex gap-2">
          {/* Previous Pagination Button */}
          <button
            className={`w-7 h-7 grid place-items-center rounded bg-light-blue ${
              !table.getCanPreviousPage()
                ? "grayscale cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <HiMiniChevronDoubleLeft />
          </button>
          <button
            className={`w-7 h-7 grid place-items-center rounded bg-light-blue ${
              !table.getCanPreviousPage()
                ? "grayscale cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <HiMiniChevronLeft />
          </button>
          {/* Current Page */}
          <PaginationButton
            data={table.getState().pagination.pageIndex + 1}
            onClick={() => {}}
          />
          {/* Next Pagination button */}
          <button
            className={`w-7 h-7 grid place-items-center rounded bg-light-blue ${
              !table.getCanNextPage()
                ? "grayscale cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <HiMiniChevronRight />
          </button>
          {/* Next Pagination button */}
          <button
            className={`w-7 h-7 grid place-items-center rounded bg-light-blue ${
              !table.getCanNextPage()
                ? "grayscale cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <HiMiniChevronDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
