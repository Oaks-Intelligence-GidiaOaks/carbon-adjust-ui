import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { Input } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/services/merchant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import transDummy from "@/dummy/transaction.json";
import { ITransaction } from "@/interfaces/transaction.interface";
import { formatDateTime } from "@/lib/utils";

// interface TransactionsGridProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
// data: TData[];
//   fetchData: (
//     pageNumber: number,
//     limit: number
//   ) => Promise<{
//     data: TData[];
//     total: number;
//   }>;
// }

export const columns: ColumnDef<ITransaction>[] = [
  {
    id: "_id",
    header: () => <div className="">S/N</div>,
    cell: ({ row }) => <span className="text-xxs">{row.index + 1}</span>,
  },
  {
    accessorKey: "_id",
    header: () => <div className="whitespace-nowrap">Transaction ID</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "userId",
    header: () => <div className="whitespace-nowrap"> User ID</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="w-32">Timestamp</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">
        {formatDateTime(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    accessorKey: "walletType",
    header: () => <div className="w-32">Wallet Type</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">
        {(row.getValue("walletType") as string).replace("_", " ")}
      </div>
    ),
  },
  {
    accessorKey: "transactionType",
    header: () => <div className="w-32">Transaction Type</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">
        {row.getValue("transactionType")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="w-32">Amount</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">{row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="w-40">Description</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">{row.getValue("description")}</div>
    ),
  },
];

export function TransactionsGrid() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(20);

  const {
    data: transactions,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["get-transactions", currentPage, limit],
    queryFn: () => fetchTransactions(currentPage, limit),
  });

  useEffect(() => {
    if (transactions?.transactions?.length) {
      refetch();
    }
  }, [refetch, currentPage]);

  const table = useReactTable({
    data: transactions?.transactions || transDummy,
    columns,
    getCoreRowModel: getCoreRowModel(),
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

  const handleClickPrev = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    if (currentPage < 100) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="">
      <div className="pb-3 flex-center justify-between">
        <h2 className="text-xl whitespace-nowrap font-[500]">
          Transaction History
        </h2>

        <Input
          name="search"
          placeholder="Search"
          value={
            (table.getColumn("walletType")?.getFilterValue() as string) ?? ""
          }
          onChange={(event: any) =>
            table.getColumn("walletType")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border rounded-xl px-4 ml-auto"
        />
      </div>

      <Table>
        <TableHeader className="!rounded-t-2xl bg-[#E8F3FC]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="font-poppins font-bold  text-[#3C3E41]"
                    key={header.id}
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
                className="font-poppins text-black-main"
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

      {(transactions?.transactions || true) && (
        <div className="mt-4 flex-center w-fit ml-auto text-gray-500">
          <div className="flex-center gap-1 ">
            <span>6</span>-<span>9</span>
            of
            <span>100</span>
          </div>

          <div className="flex-center">
            <button
              disabled={currentPage <= 1}
              onClick={handleClickPrev}
              className="grid place-items-center px-6 py-2 rounded-2xl"
            >
              <FaChevronLeft />
            </button>

            <button
              disabled={currentPage === transactions?.totalPages}
              onClick={handleClickNext}
              className="grid place-items-center px-6 py-2 rounded-2xl"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
