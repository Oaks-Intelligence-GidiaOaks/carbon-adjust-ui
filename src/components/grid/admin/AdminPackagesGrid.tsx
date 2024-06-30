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

import { useOutsideCloser } from "../../../hooks/useOutsideCloser";
// @ts-ignore
import { EnvelopeIcon, EyeIcon } from "@heroicons/react/24/outline";

import toast from "react-hot-toast";
import { BsPeople, BsThreeDotsVertical } from "react-icons/bs";
import { publishPackage, unPublishPackage } from "@/services/merchantService";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { BiEdit } from "react-icons/bi";

const AdminPackagesGrid = ({ data }: { data: any[]; isUpdating: boolean }) => {
  // @ts-ignore
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<string>("");

  const queryClient = useQueryClient();

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (id: any) => {
    setCurrentRowId(id);

    if (currentRowId === id) {
      setShowModal((prevState) => !prevState);
    } else {
      setCurrentRowId(id);
      setShowModal(true);
    }
  };

  const columnHelper = createColumnHelper();

  const publishMutation = useMutation({
    mutationKey: ["publish-package"],
    mutationFn: (packageId: string) => publishPackage(packageId),
    onSuccess: () => {
      toast.success("Package published  successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-packages"],
      });
      setCurrentRowId("");
    },
    onError: (ex: any) => {
      toast.error(ex.message);
    },
  });

  const unPublishMutation = useMutation({
    mutationKey: ["unpublish-package"],
    mutationFn: (packageId: string) => unPublishPackage(packageId),
    onSuccess: () => {
      toast.success(" package unpublished successfully");
      setCurrentRowId("");
      queryClient.invalidateQueries({
        queryKey: ["get-packages"],
      });
    },
    onError: () => {
      toast.error("Error unpublishing package");
    },
  });

  const handlePublushPackage = (packageId: string) => {
    publishMutation.mutate(packageId);
  };

  const handleUnPublushPackage = (packageId: string) => {
    unPublishMutation.mutate(packageId);
  };

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

    columnHelper.accessor((row: any) => row?.title, {
      id: "title",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-36 text-left">Title</div>,
    }),

    columnHelper.accessor((row: any) => row?.category, {
      id: "catgeory",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-36 text-left">Category</div>,
    }),

    columnHelper.accessor((row: any) => row?.status, {
      id: "status",
      cell: (info) => (
        <div className="w-24 mx-auto text-left capitalize">
          {info.getValue()}ed
        </div>
      ),
      header: () => <div className="w-36 text-left">Status</div>,
    }),

    columnHelper.accessor((row: any) => row?.packageType, {
      id: "packageType",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-36 text-left">Package type</div>,
    }),

    columnHelper.accessor((row: any) => row?.price, {
      id: "price",
      cell: (info) => (
        <>
          {/* {console.log("gbfhwrjgflahrfg", info.getValue())} */}
          <div className="w-24 mx-auto text-left">{info.getValue()}</div>
        </>
      ),
      header: () => <div className="w-36 text-left">Amount</div>,
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
                onClick={() => setShowModal(true)}
                className="absolute top-[-30px] flex flex-col gap-y-2 z-10 right-[40px] bg-white border border-gray-300  rounded p-2"
              >
                {info?.row?.original?.status === "unpublish" ? (
                  <div
                    className="cursor-pointer flex items-center gap-1 font-poppins whitespace-nowrap text-left text-xs hover:text-ca-blue  px-1"
                    onClick={() => handlePublushPackage(currentRowId)}
                  >
                    <div className="rounded-full bg-ca-blue p-1">
                      <BsPeople className="text-white text-base size-3" />
                    </div>
                    <span>Publish</span>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer flex items-center gap-1 font-poppins  hover:text-ca-blue text-xs whitespace-nowrap px-1"
                    onClick={() => handleUnPublushPackage(currentRowId)}
                  >
                    <div className="rounded-full bg-yellow-500 p-1">
                      <EnvelopeIcon className="text-white text-base size-3" />
                    </div>
                    <span> Unpublish</span>
                  </div>
                )}

                {/* <div
                  className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                  onClick={() =>
                    navigate(`/merchant/packages/update/${currentRowId}`)
                  }
                >
                  <div className="rounded-full bg-green-500 p-1">
                    <BiEdit className="text-white text-base size-3" />
                  </div>
                  <span> Edit Package</span>
                </div> */}
                {/* <div
                  className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                  onClick={() => navigate(`/merchant/packages/${currentRowId}`)}
                >
                  <div className="rounded-full bg-violet-500 p-1">
                    <EyeIcon className="text-white text-base size-3" />
                  </div>
                  <span> View details</span>
                </div> */}
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
      {(publishMutation.isPending || unPublishMutation.isPending) && (
        <LoadingModal
          key={Math.random() * 354546576}
          text={"Updating package status"}
        />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default AdminPackagesGrid;
