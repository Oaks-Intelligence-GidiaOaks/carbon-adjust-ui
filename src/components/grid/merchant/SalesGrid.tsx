import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchSales } from "@/services/merchant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "@/components/ui";
import { BiSearch } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { cn, formatDateTime, serializeGridData } from "@/lib/utils";
import { Isales } from "@/interfaces/sales.interface";

 const getStatusStyle = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-[#A39412] bg-[#FCFFC1]";
    case "completed":
      return "text-[#15A312] bg-[#DEFFE5]";
    case "cancelled":
      return "text-[#FA4258] bg-[#FFEBEB]";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

const columns: ColumnDef<Isales>[] = [
  {
    accessorKey: "id",
    header: () => <div className="pl-2">S/N</div>,
    cell: ({ row }) => (
      <span className="text-sm pl-2">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "package.title",
    header: () => <div className="whitespace-nowrap">Product</div>,
    cell: ({ row }) => (
      <div className="capitalize text-sm">{row.original.package?.title || "N/A"}</div>
    ),
  },
  {
    accessorKey: "package.price",
    header: () => <div className="w-20">Amount</div>,
    cell: ({ row }) => (
      <div className="text-sm">{ row.original.package?.price || "N/A"}</div>
    ),
  },
  {
    accessorKey: "customer._id",
    header: () => <div className="w-32">Customer ID</div>,
    cell: ({ row }) => (
      <div className="text-sm">{row.original.customer?.name || "N/A"}</div>
    ),
  },
  {
    accessorKey: "package.category.name",
    header: () => <div className="w-32">Category</div>,
    cell: ({ row }) => (
      <div className="capitalize text-sm">{row.original.package?.category?.name || "N/A"}</div>
    ),
  },
  {
    accessorKey: "package.color",
    header: () => <div className="w-20">Color</div>,
    cell: ({ row }) => (
      <div className="capitalize text-sm">{row.original.package?.color || "N/A"}</div>
    ),
  },
  {
    accessorKey: "package.quantity",
    header: () => <div className="w-30">Quantity Sold</div>,
    cell: ({ row }) => (
      <div className="text-sm">{row.original.package?.quantity || "N/A"}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="w-32">Transaction Date</div>,
    cell: ({ row }) => (
      <div className="text-sm">{formatDateTime(row.original.createdAt)}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="w-25">Status</div>,
    cell: ({ row }) => (
      <div
        className={`capitalize text-xxs py-1 px-3 text-center rounded-lg w-fit ${getStatusStyle(
          row.original.status || "n/a"
        )}`}
      >
        {row.original.status || "N/A"}
      </div>
    ),
  }
];


export function SalesGrid({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const { data: sales, isLoading } = useQuery({
    queryKey: ["get-sales", pagination.page, pagination.limit],
    queryFn: () => fetchSales(pagination.page, pagination.limit),
  });

  let salesData = useMemo(() => {
    return sales?.data
      ? serializeGridData(
        sales?.data?.sales,
          pagination.page,
          pagination.limit
        )
      : [];
  }, [sales?.data, pagination.page, pagination.limit]);
  

  const {
    page = 1,
    totalPages = 1,
    totalSales = 0,
  } = sales?.data || {};

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: salesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  const LoadingState = () => (
    <>
      {Array.from({ length: 8 }, (_, rowIndex) => (
        <TableRow key={`loading-row-${rowIndex}`}>
          {columns.map((_, colIndex) => (
            <TableCell
              key={`loading-cell-${rowIndex}-${colIndex}`}
              className="h-10 text-center animate-pulse bg-gray-50"
            >
              {/* Placeholder content */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page,
      totalPages,
    }));
  }, [page, totalPages]);

  const handleClickPrev = useCallback(() => {
    if (pagination.page > 1) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  }, [pagination.page]);

  const handleClickNext = useCallback(() => {
    if (pagination.page < totalPages) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [pagination.page, totalPages]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between flex-wrap mb-[15px] gap-5">
        <div className="flex items-center justify-center gap-5">
          <Button variant={"outline"} className="flex gap-2 ">
            <IoFilterSharp />
            <span className="md:block hidden">Filter by date</span>
          </Button>
          <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px] w-[250px]">
            <BiSearch
              className="absolute top-2 left-2.5 opacity-40"
              size={24}
            />
            <input
              name="search"
              placeholder="Search here"
              className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button variant={"outline"} className="flex-center gap-2 ">
            <FiUploadCloud />
            <span>Export as CSV</span>
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="!rounded-t-2xl bg-[#E8F3FC]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="font-poppins font-bold  text-[#3C3E41] cursor-pointer"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <LoadingState />
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="font-dm-sans text-black-main font-medium"
              >
                {row.getVisibleCells().map((cell) =>
                  cell.column.id === "logo" ? (
                    <TableCell key={cell.id} className="w-14 px-2">
                      <img
                        className="size-10"
                        src={cell.getValue() as string}
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {salesData.length ? (
        <div className="mt-4 flex-center w-fit ml-auto text-gray-500 text-xs font-kumbh">
          <div className="flex-center gap-1 ">
            <span> {salesData[0].id} </span>-
            <span> {salesData[salesData.length - 1].id} </span>
            of
            <span>{totalSales}</span>
          </div>

          <div className="flex-center">
            <button
              disabled={pagination.page <= 1}
              onClick={handleClickPrev}
              className={`${
                pagination.page <= 1 && "cursor-not-allowed text-muted"
              } grid place-items-center px-6 py-2 rounded-2xl`}
            >
              <FaChevronLeft size={17} />
            </button>

            <button
              disabled={pagination.page === totalPages}
              onClick={handleClickNext}
              className={`grid place-items-center pl-6 py-2 rounded-2xl ${
                pagination.page === totalPages &&
                "cursor-not-allowed text-muted"
              }`}
            >
              <FaChevronRight size={17} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
