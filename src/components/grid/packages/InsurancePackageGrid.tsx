import React, { useRef, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import LoadingModal from "@/components/reusables/LoadingModal";
import TablePagination from "@/components/reusables/TablePagination";
import { Button } from "@/components/ui";
import { Oval } from "react-loader-spinner";

const InsurancePackageGrid = ({
  data,
}: {
  data: any[];
  isUpdating: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);

  console.log(data);
  //   const [expandedRows, setExpandedRows] = useState([]);

  const queryClient = useQueryClient();

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const columnHelper = createColumnHelper();

  const publishMutation = useMutation({
    mutationKey: ["publish insurance package"],
    mutationFn: (id: string) =>
      axiosInstance.patch(`packages/${id}/publish`, {
        userId: id,
        status: "declined",
      }),
    onSuccess: () => {
      toast.success("Package published successfully");
      queryClient.invalidateQueries({ queryKey: ["get-insurance-packages"] });
    },
    onError: () => {
      toast.error("Error publishing package");
    },
  });

  const unpublishMutation = useMutation({
    mutationKey: ["unpublish insurance package"],
    mutationFn: (id: string) =>
      axiosInstance.patch(`packages/${id}/unpublish`, {
        userId: id,
        status: "confirmed",
      }),
    onSuccess: () => {
      toast.success("Package unpublished successfully");
      queryClient.invalidateQueries({ queryKey: ["get-insurance-packages"] });
    },
    onError: () => {
      toast.error("Error unpublishing package");
    },
  });

  console.log(data);

  const columns = [
    columnHelper.accessor((_, rowIndex) => ({ serialNumber: rowIndex + 1 }), {
      id: "serialNumber",
      cell: (info) => (
        <div className="w-14 mx-auto text-center">
          {" "}
          {info.getValue().serialNumber}{" "}
        </div>
      ),
      header: () => <div className="w-14 px-1 text-center">S/N</div>,
    }),
    columnHelper.accessor((row: any) => row?.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">
          {" "}
          {formatDate(info.getValue())}{" "}
        </div>
      ),
      header: () => <div className="w-36 text-left">Date</div>,
    }),
    columnHelper.accessor((row: any) => row?.createdBy, {
      id: "createdBy",
      cell: (info) => (
        <div className="w-80 mx-auto text-left">
          {" "}
          {(info.row.original as any).createdBy.name}
        </div>
      ),
      header: () => <div className="w-80 text-left">Package Name</div>,
    }),
    columnHelper.accessor((row: any) => row?.country, {
      id: "country",
      cell: (info) => (
        <div className="w-80 mx-auto text-left">
          {" "}
          {info.getValue() ?? "-----------------"}
        </div>
      ),
      header: () => <div className="w-80 text-left">Location</div>,
    }),
    columnHelper.accessor((row: any) => row?.locationType, {
      id: "locationType",
      cell: (info) => (
        <div className="w-80 mx-auto text-left">
          {" "}
          {info.getValue() ?? "-----------------"}
        </div>
      ),
      header: () => <div className="w-80 text-left">Package Availability</div>,
    }),
    columnHelper.accessor((row: any) => row?.maxAmount, {
      id: "maxAmount",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">
          {" "}
          {(info.row.original as any).currency}
          {info.getValue() ?? "-----------------"}
        </div>
      ),
      header: () => <div className="w-60 text-left">Maximum Amount</div>,
    }),
    columnHelper.accessor((row: any) => row?.status, {
      id: "status",
      cell: (info) => (
        <div className="col-span-1 flex items-end justify-center w-28">
          {info.getValue() === "unpublish" ? (
            <Button
              onClick={() =>
                publishMutation.mutate((info.row.original as any)._id)
              }
              disabled={publishMutation.isPending}
              className="rounded-full w-full text-white"
            >
              {publishMutation.isPending ? (
                <Oval
                  visible={publishMutation.isPending}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span>Publish</span>
              )}
            </Button>
          ) : (
            <Button
              onClick={() =>
                unpublishMutation.mutate((info.row.original as any)._id)
              }
              disabled={unpublishMutation.isPending}
              className="rounded-full w-full text-white"
            >
              {unpublishMutation.isPending ? (
                <Oval
                  visible={unpublishMutation.isPending}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span>Unpublish</span>
              )}
            </Button>
          )}
        </div>
      ),
      header: () => <div className="w-40 text-left">Status</div>,
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterQuery, setFilterQuery] = useState("");

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    state: {
      sorting: sorting,
      globalFilter: filterQuery,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilterQuery,
  });
  useOutsideCloser(actionButtonsRef, showModal, setShowModal);

  return (
    <div className="">
      {/* <TableFilter setFilterQuery={setFilterQuery} /> */}
      {/* main table */}

      <div className="mb-4 flex overflow-x-auto">
        <div className="w-auto flex-1 overflow-visible">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap gap-4 mt-10">
            <table className="text-center w-full font-poppins">
              <thead className="bg-[#E8F3FC] rounded-2xl">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    className="text-ca-blue font-[600]"
                    key={(headerGroup as any)._id}
                  >
                    {headerGroup.headers.map((header, i) => (
                      <th
                        className={`font-poppins font-bold px-3 cursor-pointer py-3 text-main text-sm text-left sticky top-0 ${
                          i === 0 ? "rounded-l-xl" : ""
                        }${
                          i === headerGroup.headers.length - 1
                            ? "rounded-r-xl"
                            : ""
                        }`}
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span className="flex justify-between items-center flex-nowrap whitespace-nowrap">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {
                            // {
                            //   asc: <TbSortAscending size={20} />,
                            //   desc: <TbSortDescending size={20} />,
                            // }[
                            //   header.column.getIsSorted() === "asc"
                            //     ? "asc"
                            //     : header.column.getIsSorted() === "desc"
                            //     ? "desc"
                            //     : "desc"
                            // ]
                          }
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className='before:content-["@"] before:block before:leading-[20px] before:-indent-[99999px] after:content-["@"] after:block after:leading-[20px] after:-indent-[99999px]'>
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    {/* Main row */}
                    <tr
                      className="bg-[black_!important] group-[]:hover"
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className="px-3 py-3 poppins-4 text-main text-sm even:bg-white odd: bg-[#F8F9FA]"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Collapsible row */}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {(publishMutation.isPending || unpublishMutation.isPending) && (
        <LoadingModal
          key={Math.random() * 354546576}
          text={"Updating application status"}
        />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default InsurancePackageGrid;
