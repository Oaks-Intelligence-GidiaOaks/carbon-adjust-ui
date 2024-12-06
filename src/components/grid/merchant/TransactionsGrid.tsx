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
import { fetchTransactions } from "@/services/merchant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import {
  ITransaction,
  WalletType,
  // TransactionStatus,
} from "@/interfaces/transaction.interface";
import { cn, formatDateTime, serializeGridData } from "@/lib/utils";
// import { IComponentMap } from "@/types/general";

// const getStatusStyle: IComponentMap = {
//   [TransactionStatus.PENDING]:
//     "text-[#CDBC05] bg-gradient-to-r from-[#FEFEF0] to-[#FFFEF2]",
//   [TransactionStatus.FAILED]:
//     "text-[#BF0508] bg-gradient-to-r from-[#FFF0F1] to-[#FFDFE0]",
//   [TransactionStatus.COMPLETED]:
//     "text-[#069662] bg-gradient-to-r from-[#EDFDF7] to-[#E5ECF6]",
// };

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "id",
    header: () => <div className="pl-2">S/N</div>,
    cell: ({ row }) => (
      <span className="text-xxs pl-2">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "_id",
    header: () => <div className="whitespace-nowrap">Transaction ID</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">{row.getValue("_id")}</div>
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
    header: () => <div className="w-20">Amount</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">{row.getValue("amount")}</div>
    ),
  },
  // {
  //   accessorKey: "status",
  //   header: () => <div className="w-28 text-center">Status</div>,
  //   cell: ({ row }) => (
  //     <div
  //       className={`capitalize text-xxs rounded-[16px] text-center py-[2px] ${
  //         // @ts-ignore
  //         getStatusStyle[row.getValue("status")]
  //       }`}
  //     >
  //       {row.getValue("status")}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "description",
    header: () => <div className="w-40">Description</div>,
    cell: ({ row }) => (
      <div className="capitalize text-xxs">{row.getValue("description")}</div>
    ),
  },
];

export function TransactionsGrid({
  className,
  walletType,
}: {
  className?: string;
  walletType: WalletType;
}) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const { data: transactions, isLoading } = useQuery({
    queryKey: [
      "get-transactions",
      pagination.page,
      pagination.limit,
      walletType,
    ],
    queryFn: () =>
      fetchTransactions(pagination.page, pagination.limit, walletType),
  });

  let transactionsData = useMemo(() => {
    return transactions?.data
      ? serializeGridData(
          transactions?.data?.transactions,
          pagination.page,
          pagination.limit
        )
      : [];
  }, [transactions?.data, pagination.page, pagination.limit]);

  const {
    page = 1,
    totalPages = 1,
    totalTransactions = 0,
  } = transactions?.data || {};

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: transactionsData,
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
      <div className="pb-3 flex-center justify-between">
        <h2 className="text-xl whitespace-nowrap font-[500]">
          Transaction History
        </h2>

        {/* <Input
          wrapperClassName=""
          inputClassName="bg-transparent !h-full"
          name="search"
          placeholder="Search"
          value={
            (table.getColumn("walletType")?.getFilterValue() as string) ?? ""
          }
          onChange={(event: any) =>
            table.getColumn("walletType")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border rounded-xl px-4 ml-auto text-xs h-[38px] text-gray-600"
        /> */}
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

      {transactionsData.length ? (
        <div className="mt-4 flex-center w-fit ml-auto text-gray-500 text-xs font-kumbh">
          <div className="flex-center gap-1 ">
            <span> {transactionsData[0].id} </span>-
            <span> {transactionsData[transactionsData.length - 1].id} </span>
            of
            <span>{totalTransactions}</span>
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
