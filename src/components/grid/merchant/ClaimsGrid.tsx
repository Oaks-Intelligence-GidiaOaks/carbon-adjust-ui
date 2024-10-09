import React from "react";
import { IClaim } from "@/interfaces/claim.interface";
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
// import { formatDate } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import GridDocField from "@/components/reusables/GridDocField";
import { formatDate } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClaimStatus } from "@/services/merchantService";
import toast from "react-hot-toast";
import LoadingModal from "@/components/reusables/LoadingModal";

const ClaimsGrid = ({
  data,
  hideAction,
}: {
  data: IClaim[];
  hideAction?: boolean;
}) => {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<string | null>(null);
  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const UpdateClaimStatus = useMutation({
    mutationKey: ["update-claim-status"],
    mutationFn: (arg: { claimId: string; status: string }) =>
      updateClaimStatus(arg),
    onSuccess: (sx) => {
      toast.success(sx.message);
      setShowModal(false);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-customer-claims"],
      });
    },
  });

  const handleActionClick = (id: any) => {
    if (currentRowId === id) {
      setShowModal((prevState) => !prevState);
    } else {
      setCurrentRowId(id);
      ``;
      setShowModal(true);
    }
  };

  const columnHelper = createColumnHelper();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterQuery, setFilterQuery] = useState("");

  let columns = [
    columnHelper.accessor((_, rowIndex) => ({ serialNumber: rowIndex + 1 }), {
      id: "serialNumber",
      cell: (info) => (
        <div className="w-24 mx-auto text-center">
          {info.getValue().serialNumber}{" "}
        </div>
      ),
      header: () => <div className="w-24 px-1 text-center">S/N</div>,
    }),

    columnHelper.accessor((row: any) => row._id, {
      id: "_id",
      cell: (info) => (
        <div className="w-60 mx-auto text-center">{info.getValue()}</div>
      ),
      header: () => <div className="w-48 px-1 text-center">Claim ID</div>,
    }),

    columnHelper.accessor((row: any) => row.packageName, {
      id: "packageName",
      cell: (info) => (
        <div className="w-60 mx-auto text-center">{info.getValue()}</div>
      ),
      header: () => <div className="w-48 px-1 text-center">Package Name</div>,
    }),

    columnHelper.accessor((row: any) => row.grants, {
      id: "grants",
      cell: (info) => (
        <div className="w-60 mx-auto text-center">
          {(info.row.original as any).category || info.getValue()}
        </div>
      ),
      header: () => <div className="w-48 px-1 text-center">Category</div>,
    }),

    columnHelper.accessor((row: any) => row.bookingDate, {
      id: "bookingDate",
      cell: (info) => (
        <div className="w-60 mx-auto text-center">
          {formatDate(info.getValue())}
        </div>
      ),
      header: () => <div className="w-48 px-1 text-center">Booking Date</div>,
    }),

    columnHelper.accessor((row: any) => row.claim, {
      id: "claim",
      cell: (info) => (
        <div className="w-60 mx-auto text-center">
          {(info.row.original as any).amount || info.getValue()}
        </div>
      ),
      header: () => <div className="w-48 px-1 text-center">Claim Amount</div>,
    }),

    columnHelper.accessor((row: any) => row.summaryReport, {
      id: "summaryReport",
      cell: (info) => {
        const docs = [];

        if ((info.row.original as any).summaryReport?.length) {
          for (let i of info.getValue()) {
            docs.push({
              url: i,
              idType: "Merchant Report",
            });
          }
        }

        return (
          <div>
            <GridDocField docs={docs || []} />
          </div>
        );
      },
      header: () => (
        <div className="w-48 px-1 text-center">Summary Report </div>
      ),
    }),

    columnHelper.accessor((row: any) => row.status, {
      id: "status",
      cell: (info) => (
        <div className="w-60 mx-auto text-center">{info.getValue()}</div>
      ),
      header: () => <div className="w-48 px-1 text-center">Status</div>,
    }),

    columnHelper.accessor((row: any) => row._id, {
      id: "_id",
      cell: (info: any) => {
        return (
          <div className="relative px-4 z-10">
            {/* Hamburger menu icon */}
            <div
              key={info.getValue()}
              className="rounded-full px-3 p-1 text-xs cursor-pointer mx-auto hover:bg-gray-300"
              onClick={() => handleActionClick(info.getValue())}
            >
              <BsThreeDotsVertical size={20} className="" />
            </div>

            {/* Modal */}
            {showModal && currentRowId === info.getValue() && (
              <div
                key={info.getValue()}
                ref={actionButtonsRef}
                className="absolute top-[-30px] flex flex-col gap-y-3 z-10 right-[40px] bg-white border border-gray-300  rounded p-2"
              >
                {/* <div
                  onClick={() => {}}
                  className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                >
                  <div className="rounded-full bg-blue-500 p-1">
                    <MdDone className="text-white text-base size-3" />
                  </div>

                  <span>View Details</span>
                </div> */}

                <div
                  onClick={() =>
                    UpdateClaimStatus.mutateAsync({
                      claimId: info.getValue(),
                      status: "complete",
                    })
                  }
                  className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                >
                  <div className="rounded-full bg-blue-500 p-1">
                    <MdDone className="text-white text-base size-3" />
                  </div>

                  <span>Approve</span>
                </div>
              </div>
            )}
          </div>
        );
      },
      header: () => <div className="">Action</div>,
    }),
  ];

  if (hideAction) {
    columns = columns.slice(0, -1);
  }

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

      {UpdateClaimStatus.isPending && (
        <LoadingModal
          key={Math.random() * 354546576}
          text={"Updating Claim status"}
        />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default ClaimsGrid;
