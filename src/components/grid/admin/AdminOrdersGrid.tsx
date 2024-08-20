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

import TablePagination from "../../reusables/TablePagination";
import LoadingModal from "../../reusables/LoadingModal";
import { useNavigate } from "react-router-dom";

import { useOutsideCloser } from "../../../hooks/useOutsideCloser";
// @ts-ignore
import { EyeIcon } from "@heroicons/react/24/outline";

import toast from "react-hot-toast";
// @ts-ignore
import { BsThreeDotsVertical } from "react-icons/bs";

import { completeApplication } from "@/services/merchant";
import { StaffModal } from "@/components/dialogs";
import { formatDate } from "@/lib/utils";
import GridDocField from "@/components/reusables/GridDocField";

const OrdersGrid = ({ data }: { data: any[]; isUpdating: boolean }) => {
  // @ts-ignore
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);

  const queryClient = useQueryClient();

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const completeApplicationMutation = useMutation({
    mutationKey: ["get-applications"],
    mutationFn: (orderId: string) => completeApplication(orderId as string),
    onSuccess: () => {
      toast.success("Application status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-applications"] });
    },
    onError: () => {
      toast.error("Encountered error while updating application status");
    },
  });

  // @ts-ignore
  const handleActionClick = (id: any) => {
    if (currentRowId === id) {
      setShowModal((prevState) => !prevState);
    } else {
      setCurrentRowId(id);
      setShowModal(true);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((_, rowIndex) => ({ serialNumber: rowIndex + 1 }), {
      id: "serialNumber",
      cell: (info) => (
        <div className="w-14 mx-auto text-center">
          {info.getValue().serialNumber}{" "}
        </div>
      ),
      header: () => <div className="w-14 px-1 text-center">S/N</div>,
    }),

    columnHelper.accessor((row: any) => row?.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <div className="w-fit text-left">{formatDate(info.getValue())}</div>
      ),
      header: () => <div className="w-44 text-left">Date</div>,
    }),

    columnHelper.accessor((row: any) => row?._id, {
      id: "_id",
      cell: (info) => <div className="w-fit text-left">{info.getValue()}</div>,
      header: () => <div className="w-60 text-left">Order ID</div>,
    }),

    columnHelper.accessor((row: any) => row?.merchant, {
      id: "merchantName",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">
          {(info.row.original as any).merchant.name ?? "----------------"}
        </div>
      ),
      header: () => <div className="w-44 text-left">Merchant Name</div>,
    }),

    columnHelper.accessor((row: any) => row?.customer, {
      id: "customerName",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">
          {(info.row.original as any).customer.name ?? "----------------"}
        </div>
      ),
      header: () => <div className="w-44 text-left">Customer Name</div>,
    }),

    columnHelper.accessor((row: any) => row?.customer, {
      id: "customerAddress",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">
          {`${(info.row.original as any).customerAddress.firstLineAddress} ${
            (info.row.original as any).customerAddress.cityOrProvince
          } ${(info.row.original as any).customerAddress.country}` ??
            "----------------"}
        </div>
      ),
      header: () => <div className="w-44 text-left">Customer Address</div>,
    }),

    columnHelper.accessor((row: any) => row?.customer, {
      id: "customerAddress",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">
          {(info.row.original as any).customerPhone ?? "----------------"}
        </div>
      ),
      header: () => <div className="w-44 text-left">Customer Phone</div>,
    }),

    columnHelper.accessor((row: any) => row?.name, {
      id: "name",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-60 text-left">Package Name</div>,
    }),

    columnHelper.accessor((row: any) => row?.category, {
      id: "category",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-60 text-left">Service Rendered</div>,
    }),

    columnHelper.accessor((row: any) => row?.amount, {
      id: "amount",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-36 text-left">Amount</div>,
    }),

    // Reports
    columnHelper.accessor((row: any) => row?.merchantReport, {
      id: "merchantReport",
      cell: (info) => {
        const docs = [];

        if ((info.row.original as any).merchantReport?.length) {
          docs.push({
            url: info.getValue(),
            idType: "Merchant Report",
          });
        }

        if ((info.row.original as any).adminReport?.length) {
          docs.push({
            url: (info.row.original as any).adminReport,
            idType: "Admin Report",
          });
        }

        return <GridDocField docs={docs || []} />;
      },

      header: () => <div className="w-36 text-left">Reports</div>,
    }),

    columnHelper.accessor((row: any) => row?.status, {
      id: "status",
      cell: (info: any) => (
        <div className="w-44 relative text-center grid place-items-center items-center text-sm gap-x-2">
          <span>
            {(info.row.original as any).status === "pending" ? (
              <span
                style={{ color: "#139EEC", background: "#139EEC30" }}
                className="w-36 py-1 rounded-full inline-flex gap-x-2 justify-center mx-auto"
              >
                <div>
                  {(info.row.original as any).status === "pending" ? (
                    <span
                      style={{ color: "#139EEC", background: "#139EEC" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "completed" ? (
                    <span
                      style={{ color: "#8AC926", background: "#8AC926" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "cancelled" ? (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "processing" ? (
                    <span
                      style={{ color: "#7c4804", background: "#7c4804" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  )}
                </div>
                Pending
              </span>
            ) : (info.row.original as any).status === "completed" ? (
              <span
                style={{ color: "#8AC926", background: "#8AC92630" }}
                className="w-36 py-1 rounded-full inline-flex gap-x-2 justify-center mx-auto"
              >
                <div>
                  {(info.row.original as any).status === "pending" ? (
                    <span
                      style={{ color: "#139EEC", background: "#139EEC" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "completed" ? (
                    <span
                      style={{ color: "#8AC926", background: "#8AC926" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "cancelled" ? (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "processing" ? (
                    <span
                      style={{ color: "#7c4804", background: "#7c4804" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  )}
                </div>
                Completed
              </span>
            ) : (info.row.original as any).status === "cancelled" ? (
              <span
                style={{ color: "#FF595E", background: "#FF595E30" }}
                className="w-36 py-1 rounded-full inline-flex gap-x-2 justify-center mx-auto"
              >
                <div>
                  {(info.row.original as any).status === "pending" ? (
                    <span
                      style={{ color: "#139EEC", background: "#139EEC" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "completed" ? (
                    <span
                      style={{ color: "#8AC926", background: "#8AC926" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "cancelled" ? (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "processing" ? (
                    <span
                      style={{ color: "#7c4804", background: "#7c4804" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  )}
                </div>
                Declined
              </span>
            ) : (info.row.original as any).status === "processing" ? (
              <span
                style={{ color: "#7c4804", background: "#7c480430" }}
                className="w-36 py-1 rounded-full inline-flex gap-x-2 justify-center mx-auto"
              >
                <div>
                  {(info.row.original as any).status === "pending" ? (
                    <span
                      style={{ color: "#139EEC", background: "#139EEC" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "completed" ? (
                    <span
                      style={{ color: "#8AC926", background: "#8AC926" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "cancelled" ? (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "processing" ? (
                    <span
                      style={{ color: "#7c4804", background: "#7c4804" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  )}
                </div>
                Disabled
              </span>
            ) : (
              <span
                style={{ color: "#FF595E", background: "#FF595E30" }}
                className="w-36 py-1 rounded-full inline-flex gap-x-2 justify-center mx-auto"
              >
                <div>
                  {(info.row.original as any).status === "pending" ? (
                    <span
                      style={{ color: "#139EEC", background: "#139EEC" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "completed" ? (
                    <span
                      style={{ color: "#8AC926", background: "#8AC926" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "cancelled" ? (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (info.row.original as any).status === "processing" ? (
                    <span
                      style={{ color: "#7c4804", background: "#7c4804" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  ) : (
                    <span
                      style={{ color: "#FF595E", background: "#FF595E" }}
                      className="size-2 py-1 rounded-full inline-block mx-auto"
                    ></span>
                  )}
                </div>
                Rejected
              </span>
            )}
          </span>
        </div>
      ),
      header: () => <div className="w-32 whitespace-nowrap">Status</div>,
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
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {completeApplicationMutation.isPending && (
        <LoadingModal
          key={Math.random() * 354546576}
          text={"Updating application status"}
        />
      )}

      {showStaffModal && (
        <StaffModal
          showStaffModal={showStaffModal}
          setShowStaffModal={setShowStaffModal}
          onClose={() => setShowStaffModal(false)}
          rowId={currentRowId}
        />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default OrdersGrid;
