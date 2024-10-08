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

import TablePagination from "../../reusables/TablePagination";

import { useOutsideCloser } from "../../../hooks/useOutsideCloser";

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDone } from "react-icons/md";

import { formatDate } from "@/lib/utils";

import ViewGrantApplicationModal from "@/components/dialogs/ViewGrantApplicationModal";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "@/utils";

const GrantApplicationsGrid = ({
  data,
}: {
  data: any[];
  isUpdating: boolean;
}) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showGrantModal, setShowGrantModal] = useState<boolean>(false);

  const [currentRowId, setCurrentRowId] = useState<string | null>(null);
  const [rowData, setRowData] = useState(null);

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (id: any, rowData: any) => {
    setRowData(rowData);
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
          {" "}
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
      header: () => <div className="w-32 text-left">Date</div>,
    }),

    // Grant ID column
    // columnHelper.accessor((row: any)=> row.grantID)

    columnHelper.accessor((row: any) => row?._id, {
      id: "_id",
      cell: (info) => <div className="w-fit text-left">{info.getValue()}</div>,
      header: () => <div className="w-60 text-left">Order ID</div>,
    }),

    columnHelper.accessor((row: any) => row?.customer, {
      id: "customerName",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">
          {(info.row.original as any).customer?.name ?? "----------------"}
        </div>
      ),
      header: () => <div className="w-44 text-left">Customer Name</div>,
    }),

    columnHelper.accessor((row: any) => row?.package.title, {
      id: "packageName",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">
          {info.getValue() || "-------------"}
        </div>
      ),
      header: () => <div className="w-60 text-left">Package Name</div>,
    }),

    columnHelper.accessor((row: any) => row?.package.category.name, {
      id: "category",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-60 text-left">Category</div>,
    }),

    // Approved Grant
    columnHelper.accessor((row: any) => row?.approvedGrant, {
      id: "approvedGrant",
      cell: (info: any) => (
        <div>
          {(info.row.original as any).approvedGrant
            ? `£${formatNumberWithCommas(info.getValue())}`
            : "--------------------"}
        </div>
      ),
      header: () => <div>Approved Grant</div>,
    }),

    // Amount Spent

    columnHelper.accessor((row: any) => row?.grantStatus, {
      id: "grantStatus",
      cell: (info: any) => (
        <div className="w-44 relative text-center grid place-items-center items-center text-sm gap-x-2">
          <span>{info.getValue()}</span>
        </div>
      ),
      header: () => (
        <div className="w-32 whitespace-nowrap text-center">Status</div>
      ),
    }),

    //
    columnHelper.accessor((row: any) => row._id, {
      id: "_id",
      cell: (info: any) => {
        return (
          <div className="relative px-4 z-10">
            {/* Hamburger menu icon */}
            <div
              key={info.getValue()}
              className="rounded-full px-3 p-1 text-xs cursor-pointer mx-auto hover:bg-gray-300"
              onClick={() =>
                handleActionClick(info.getValue(), info.row.original)
              }
            >
              <BsThreeDotsVertical size={20} className="" />
            </div>

            {/* Modal */}
            {showModal && currentRowId === info.getValue() && (
              <div
                key={info.getValue()}
                ref={actionButtonsRef}
                className="absolute top-[-30px] flex flex-col gap-y-2 z-10 right-[40px] bg-white border border-gray-300  rounded p-2"
              >
                <div
                  onClick={() => setShowGrantModal(true)}
                  className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                >
                  <div className="rounded-full bg-blue-500 p-1">
                    <MdDone className="text-white text-base size-3" />
                  </div>

                  <span>
                    {!Boolean((info.row.original as any).approvedGrant)
                      ? " Complete Application"
                      : "show details"}
                  </span>
                </div>

                {(info.row.original as any).status !== "complete" && (
                  <div
                    onClick={() =>
                      navigate(
                        `/merchant/grant-applications/${info.row.original._id}`
                      )
                    }
                    className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                  >
                    <div className="rounded-full bg-blue-500 p-1">
                      <MdDone className="text-white text-base size-3" />
                    </div>

                    <span>View Applications</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      },
      header: () => <div className="">Action</div>,
    }),
    //
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

      {showGrantModal && (
        <ViewGrantApplicationModal
          setShowModal={setShowGrantModal}
          showGrantModal={showGrantModal}
          rowData={rowData}
        />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default GrantApplicationsGrid;
