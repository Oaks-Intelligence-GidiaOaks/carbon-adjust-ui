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
// import Modal from "../../reuseable/RegistrationRejectionModal";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import {
//   Loading,
// //   PaginationButton,
// //   TableActionButtonHia,
// } from "../reusables/Loading";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { FaDownload, FaList } from "react-icons/fa";
// import { CiWarning } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";
// import file_icon from "../../../assets/icons/file_icon.png";
// import DeleteAccount from "../../modals/DeleteAccount";
// import ResponseAlert from "../../reuseable/ResponseAlert";
// import { EnvelopeIcon } from "@heroicons/react/24/outline";
// import { IoDownloadOutline } from "react-icons/io5";
// import { cn } from "@/utils";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
// import { BsPeople, BsThreeDotsVertical } from "react-icons/bs";
// import {
//   //   MdCancel,
//   MdDone,
//   //   MdDownloadDone,
//   //   MdOutlineDeleteOutline,
// } from "react-icons/md";
// import { PiWarningBold } from "react-icons/pi";
// import { BiMessage } from "react-icons/bi";
// import { PDFIcon } from "@/assets/icons";
// import { GrClose } from "react-icons/gr";
import { formatDate } from "@/lib/utils";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import LoadingModal from "@/components/reusables/LoadingModal";
import TablePagination from "@/components/reusables/TablePagination";
import { Button } from "@/components/ui";
import { Oval } from "react-loader-spinner";

const FinancePackageGrid = ({ data }: { data: any[]; isUpdating: boolean }) => {
  //   const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  //   const [currentRowId, setCurrentRowId] = useState(null);
  //   const [currentRowData, setCurrentRowData] = useState({
  //     packageId: "",
  //     appId: "",
  //   });

  console.log(data);
  //   const [expandedRows, setExpandedRows] = useState([]);

  const queryClient = useQueryClient();

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const columnHelper = createColumnHelper();

  const publishMutation = useMutation({
    mutationKey: ["publish finance package"],
    mutationFn: (id: string) =>
      axiosInstance.patch(`packages/${id}/publish`, {
        userId: id,
        status: "declined",
      }),
    onSuccess: () => {
      toast.success("Package published successfully");
      queryClient.invalidateQueries({ queryKey: ["get-finance-packages"] });
    },
    onError: () => {
      toast.error("Error publishing package");
    },
  });

  const unpublishMutation = useMutation({
    mutationKey: ["unpublish finance package"],
    mutationFn: (id: string) =>
      axiosInstance.patch(`packages/${id}/unpublish`, {
        userId: id,
        status: "confirmed",
      }),
    onSuccess: () => {
      toast.success("Package unpublished successfully");
      queryClient.invalidateQueries({ queryKey: ["get-finance-packages"] });
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
        <div className="w-80 mx-auto text-left"> {info.getValue()}</div>
      ),
      header: () => <div className="w-80 text-left">Location</div>,
    }),
    columnHelper.accessor((row: any) => row?.locationType, {
      id: "locationType",
      cell: (info) => (
        <div className="w-80 mx-auto text-left"> {info.getValue()}</div>
      ),
      header: () => <div className="w-80 text-left">Package Availability</div>,
    }),
    columnHelper.accessor((row: any) => row?.maxAmount, {
      id: "maxAmount",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">
          {" "}
          {(info.row.original as any).currency}
          {info.getValue()}
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
    // columnHelper.accessor((row: any) => row?.currentState, {
    //   id: "currentState",
    //   cell: (info: any) => (
    //     <div className="w-44 relative flex items-center text-sm">
    //       {(info.row.original as any).currentState === "Initiated" ? (
    //         <span
    //           style={{ color: "#139EEC", background: "#139EEC30" }}
    //           className="w-36 py-1 rounded-full inline-block mx-auto"
    //         >
    //           Pending
    //         </span>
    //       ) : (info.row.original as any).currentState === "Approved" ? (
    //         <span
    //           style={{ color: "#8AC926", background: "#8AC92630" }}
    //           className="w-36 py-1 rounded-full inline-block mx-auto"
    //         >
    //           Approved
    //         </span>
    //       ) : (info.row.original as any).currentState === "Completed" ? (
    //         <span
    //           style={{ color: "#16e000", background: "#16e00030" }}
    //           className="w-36 py-1 rounded-full inline-block mx-auto"
    //         >
    //           Completed
    //         </span>
    //       ) : (info.row.original as any).currentState === "Declined" ? (
    //         <span
    //           style={{ color: "#FF595E", background: "#FF595E30" }}
    //           className="w-36 py-1 rounded-full inline-block mx-auto"
    //         >
    //           Declined
    //         </span>
    //       ) : (
    //         <span
    //           style={{ color: "#FF595E", background: "#FF595E30" }}
    //           className="w-36 py-1 rounded-full inline-block mx-auto capitalize"
    //         >
    //           {(info.row.original as any).currentState.toLowerCase()}
    //         </span>
    //       )}
    //     </div>
    //   ),
    //   header: () => <div className="w-32 whitespace-nowrap">Status</div>,
    // }),
    // columnHelper.accessor((row: any) => row._id, {
    //   id: "_id",
    //   cell: (info: any) => {
    //     return (
    //       <div className="relative px-4 z-10">
    //         {/* Hamburger menu icon */}
    //         <div
    //           key={info.getValue()}
    //           className="rounded-full px-3 p-1 text-xs cursor-pointer mx-auto hover:bg-gray-300"
    //           onClick={() =>
    //             handleActionClick(info.getValue(), info.row.original)
    //           }
    //         >
    //           <BsThreeDotsVertical size={20} className="" />
    //         </div>
    //         <input
    //           ref={approvalInputRef}
    //           type="file"
    //           name="image"
    //           id="approval-file"
    //           className="hidden"
    //           onChange={(e) => {
    //             if (e.target.files) {
    //               handleApprovalMutation(e);
    //             }
    //           }}
    //         />
    //         <input
    //           ref={declineInputRef}
    //           type="file"
    //           name="image"
    //           id="rejection-file"
    //           className="hidden"
    //           onChange={(e) => {
    //             handleDeclineMutation(e);
    //           }}
    //         />
    //         {/* Modal */}

    //         {showModal && currentRowId === info.getValue() && (
    //           <div
    //             key={info.getValue()}
    //             ref={actionButtonsRef}
    //             onClick={() => setShowModal(true)}
    //             className="absolute top-[-30px] flex flex-col gap-y-2 z-10 right-[40px] bg-white border border-gray-300  rounded p-2"
    //           >
    //             <div
    //               className="cursor-pointer flex items-center gap-1 font-poppins whitespace-nowrap text-left text-xs hover:text-ca-red px-1"
    //               // onClick={() => {
    //               //   setUserToDelete(info.row.original);
    //               //   setShowDeleteModal(true);
    //               // }}
    //             >
    //               <div className="rounded-full bg-ca-blue p-1">
    //                 <BsPeople className="text-white text-base size-3" />
    //               </div>
    //               <span>Assign</span>
    //             </div>
    //             {info.row.original.currentState === "Initiated" && (
    //               <>
    //                 <label
    //                   // htmlFor="approval-file"
    //                   className="cursor-pointer flex items-center gap-1 font-poppins hover:text-yellow-400  text-xs whitespace-nowrap px-1"
    //                   onClick={() => {
    //                     if (approvalInputRef.current) {
    //                       approvalInputRef.current.click();
    //                     }
    //                   }}
    //                 >
    //                   <div className="rounded-full bg-green-500 p-1">
    //                     <MdDone className="text-white text-base size-3" />
    //                   </div>
    //                   <span>Approve </span>
    //                 </label>
    //                 <label
    //                   // htmlFor="rejection-file"
    //                   className="cursor-pointer flex items-center gap-1 font-poppins hover:text-[#8AC926] text-xs whitespace-nowrap px-1"
    //                   onClick={() => {
    //                     if (declineInputRef.current) {
    //                       declineInputRef.current.click();
    //                     }
    //                   }}
    //                 >
    //                   <div className="rounded-full bg-red-500 p-1">
    //                     <GrClose className="text-white text-base size-3" />
    //                   </div>
    //                   <span>Decline </span>
    //                 </label>
    //               </>
    //             )}
    //             <div
    //               className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
    //               onClick={() =>
    //                 navigate(`/admin/inbox?uid=${info.row.original.user._id}`)
    //               }
    //             >
    //               <div className="rounded-full bg-yellow-500 p-1">
    //                 <EnvelopeIcon className="text-white text-base size-3" />
    //               </div>
    //               <span> Send a message</span>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     );
    //   },
    //   header: () => <div className="">Action</div>,
    // }),
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

  //   const getFileFormat = (url: any) => {
  //     const path = new URL(url).pathname;
  //     const filename = path.split("/").pop();
  //     const parts = filename.split(".");
  //     if (parts.length > 1) {
  //       return "." + parts.pop().toLowerCase();
  //     }
  //     return "";
  //   };

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
                    {/* <tr>
                      <td colSpan={columns.length}>
                        {(expandedRows as any).includes(
                          (row as any).original._id
                        ) && (
                          <div className="p-4 bg-[#F8F9FA] border-y border-gray-200">
                            <div className="flex items-center justify-between">
                              {console.log((row as any).original.doc)}
                              {(row as any).original.doc.map(
                                (
                                  doc: { idType: string; url: string },
                                  i: number,
                                  arr: { idType: string; url: string }[]
                                ) => (
                                  <div
                                    key={i}
                                    className={cn(
                                      "flex flex-col items-center border-r px-24",
                                      i === arr.length - 1 && "border-r-0"
                                    )}
                                  >
                                    <div className="">
                                      <span className="poppins-4 text-main text-xs font-medium whitespace-nowrap">
                                        {doc.idType}

                                        <div className="flex items-start mt-4 gap-x-2">
                                          <img
                                            className="w-fit h-10 bg-cover"
                                            src={
                                              "/public/assets/graphics/view-document.svg"
                                            }
                                            alt=""
                                          />
                                          <div className="flex flex-col gap-y-4">
                                            <div className="flex gap-4 pl-4">
                                              <DocumentIcon className="size-4 text-ca-blue" />
                                              <a
                                                href={doc.url}
                                                className="poppins-4 text-main text-xs hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                View
                                              </a>
                                            </div>
                                            <div className="flex gap-4 pl-4">
                                              <IoDownloadOutline className="size-4 text-ca-blue" />
                                              <a
                                                href={doc.url}
                                                className="poppins-4 text-main text-xs hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                Download
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                              {(row as any).original.status === "pending" && (
                                <div className="flex flex-col gapy-4 gap-2 px-14">
                                  <button
                                    onClick={() =>
                                      approvedMutation.mutate(
                                        (row as any).original._id
                                      )
                                    }
                                    className="border border-ca-green text-ca-green rounded-md poppins-4 text-xs px-3 py-1 hover:bg-ca-green hover:text-white"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() =>
                                      declineMutation.mutate(
                                        (row as any).original._id
                                      )
                                    }
                                    className="border border-ca-red text-ca-red rounded-md poppins-4 text-xs px-3 py-1 hover:bg-ca-red hover:text-white"
                                  >
                                    Decline
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr> */}
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
      {/* {showDeclineModal && (
        <Modal
          isOpen={showDeclineModal}
          onClose={() => setShowDeclineModal(false)}
          onReject={handleModalReject}
          label={"Click to Reject"}
          rowId={declineRowId}
        />
      )} */}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default FinancePackageGrid;
