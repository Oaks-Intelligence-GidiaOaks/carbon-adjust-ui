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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import {
//   Loading,
// //   PaginationButton,
// //   TableActionButtonHia,
// } from "../reusables/Loading";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { formatDate } from "../../lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import axios from "axios";
// import { FaDownload, FaList } from "react-icons/fa";
import TablePagination from "../reusables/TablePagination";
// import TableFilter from "../reusables/TableFilter";
// import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import LoadingModal from "../reusables/LoadingModal";
// import { MdDownloadDone, MdOutlineDeleteOutline } from "react-icons/md";
// import { CiWarning } from "react-icons/ci";
// import { BiMessage } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import file_icon from "../../../assets/icons/file_icon.png";
// import { PiWarningBold } from "react-icons/pi";
// import DeleteAccount from "../../modals/DeleteAccount";
// import ResponseAlert from "../../reuseable/ResponseAlert";
import { useOutsideCloser } from "../../hooks/useOutsideCloser";
// import { FaDownload } from "react-icons/fa";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { IoDownloadOutline } from "react-icons/io5";
import { cn } from "@/utils";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { getSingleHOApp } from "@/services/homeOccupant";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";

const HOFinanceGrid = ({
  data,
}: //   isUpdating,
{
  data: any[];
  isUpdating: boolean;
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  //   const [currentRowId, setCurrentRowId] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);
  const queryClient = useQueryClient();
  // const [declineRowId, setDeclineRowId] = useState(null);
  // const [showDeclineModal, setShowDeclineModal] = useState(false);
  //   const [, setShowDeleteModal] = useState(false);
  // const [showResponseAlert, setShowResponseAlert] = useState(false);
  // const [responseStatus, setResponseStatus] = useState(false);
  // const [responseMessage, setResponseMessage] = useState(null);
  //   const [, setUserToDelete] = useState(null);

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const getTextColor = (value: null | string) => {
    if (value === null) {
      return "#139EEC";
    } else if (value === "completed") {
      return "#8AC926";
    } else if (value === "suspended") {
      return "#C9C126";
    } else {
      return "#FF595E";
    }
  };

  const toggleRowExpansion = (rowId: any) => {
    setExpandedRows((prevExpandedRows: any) => {
      if (prevExpandedRows.includes(rowId)) {
        return prevExpandedRows.filter((id: string) => id !== rowId);
      } else {
        return [...prevExpandedRows, rowId];
      }
    });
  };

  const columnHelper = createColumnHelper();

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
    columnHelper.accessor((row: any) => row?.appRef, {
      id: "appRef",
      cell: (info) => (
        <div className="w-24 mx-auto text-left"> {info.getValue()} </div>
      ),
      header: () => <div className="w-36 text-left">Application No</div>,
    }),
    columnHelper.accessor((row: any) => row?.fin.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">
          {" "}
          {formatDate((info.row.original as any).fin.createdAt)}{" "}
        </div>
      ),
      header: () => <div className="w-36 text-left">Registration date</div>,
    }),
    // columnHelper.accessor((row: any) => row?.aggregator.name, {
    //   id: "aggregator",
    //   cell: (info) => (
    //     <div className="w-44 mx-auto text-left">{info.getValue()}</div>
    //   ),
    //   header: () => <div className="w-44 text-left">Aggregators</div>,
    // }),

    columnHelper.accessor((row: any) => row?.projectCode, {
      id: "project-code",
      cell: () => (
        <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
          <span className="">---------------</span>
        </div>
      ),
      header: () => <div className="w-44 text-left">Project Code</div>,
    }),
    columnHelper.accessor((row: any) => row?.carbonCredit, {
      id: "email",
      cell: () => <div className="w-fit px-4 text-left">-----------------</div>,
      header: () => <div className="w-44 px-1 text-left">Carbon Credit</div>,
    }),

    columnHelper.accessor((row: any) => row?.fin, {
      id: "updatedStatus",
      cell: (info: any) => (
        <div className="w-44 relative flex items-center text-sm">
          {(info.row.original as any).fin.updatedStatus === "UNDER_REVIEW" ? (
            <span
              style={{ color: "#139EEC", background: "#139EEC30" }}
              className="w-36 py-1 rounded-full inline-block mx-auto capitalize"
            >
              {(info.row.original as any).fin.updatedStatus
                .toLowerCase()
                .split("_")
                .join(" ")}
            </span>
          ) : (info.row.original as any).fin.updatedStatus === "APPROVED" ? (
            <span
              style={{ color: "#8AC926", background: "#8AC92630" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Approved
            </span>
          ) : (info.row.original as any).fin.updatedStatus === "suspended" ? (
            <span
              style={{ color: "#c9c126", background: "#8AC92630" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Suspended
            </span>
          ) : (
            <span
              style={{ color: "#FF595E", background: "#FF595E30" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Rejected
            </span>
          )}
        </div>
      ),
      header: () => <div className="w-32 whitespace-nowrap">Status(Fin.)</div>,
    }),
    columnHelper.accessor((row: any) => row?.fin, {
      id: "initialStatus",
      cell: (info: any) => (
        <div className="w-44 relative flex items-center text-sm">
          {(info.row.original as any).fin.initialStatus === "APPLIED" ? (
            <span
              style={{ color: "#FFA832", background: "#FFA83230" }}
              className="w-36 py-1 rounded-full inline-block mx-auto capitalize"
            >
              {(info.row.original as any).fin.initialStatus.toLowerCase()}
            </span>
          ) : (info.row.original as any).fin.initialStatus === "completed" ? (
            <span
              style={{ color: "#8AC926", background: "#8AC92630" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Approved
            </span>
          ) : (info.row.original as any).fin.initialStatus === "suspended" ? (
            <span
              style={{ color: "#c9c126", background: "#8AC92630" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Suspended
            </span>
          ) : (
            <span
              style={{ color: "#FF595E", background: "#FF595E30" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Rejected
            </span>
          )}
        </div>
      ),
      header: () => <div className="w-32 whitespace-nowrap">Status(Owner)</div>,
    }),
    columnHelper.accessor((row: any) => row?.status, {
      id: "status",
      cell: (info: any) => (
        <div className="w-16 relative flex items-center">
          {/* Toggle icon */}
          <div
            className="absolute right-[16px] cursor-pointer"
            onClick={() => toggleRowExpansion(info.row.original._id)}
            style={{ color: getTextColor(info.getValue()) }}
          >
            {(expandedRows as any).includes(info.row.original._id) ? (
              <IoIosArrowDown className="text-ca-blue" />
            ) : (
              <IoIosArrowUp className="text-ca-blue" />
            )}
          </div>
        </div>
      ),
      header: () => <div className="w-16 whitespace-nowrap">More</div>,
    }),

    // columnHelper.accessor((row: any) => row._id, {
    //   id: "_id",
    //   cell: (info: any) => (
    //     <div className="relative px-4">
    //       {/* Hamburger menu icon */}
    //       <div
    //         className="rounded-full px-3 p-1 text-xs cursor-pointer mx-auto hover:bg-gray-300"
    //         onClick={() => handleActionClick(info.getValue())}
    //       >
    //         <BsThreeDotsVertical size={20} className="" />
    //       </div>

    //       {/* Modal */}

    //       {showModal && currentRowId === info.getValue() && (
    //         <div
    //           ref={actionButtonsRef}
    //           onClick={() => setShowModal(!showModal)}
    //           className="absolute top-[-30px] flex flex-col gap-y-2  right-[40px] bg-white border border-gray-300  rounded p-2"
    //         >
    //           <div
    //             className="cursor-pointer flex items-center gap-1 font-poppins whitespace-nowrap text-left text-xs hover:text-ca-red px-1"
    //             onClick={() => {
    //               setUserToDelete(info.row.original);
    //               setShowDeleteModal(true);
    //             }}
    //           >
    //             <MdOutlineDeleteOutline />
    //             <span>Delete account</span>
    //           </div>
    //           {info.row.original.verified !== "suspended" ? (
    //             <div
    //               className="cursor-pointer flex items-center gap-1 font-poppins hover:text-yellow-400  text-xs whitespace-nowrap px-1"
    //               onClick={() => handleSuspension(info.row.original._id)}
    //             >
    //               <PiWarningBold />
    //               <span>Suspend account</span>
    //             </div>
    //           ) : (
    //             <div
    //               className="cursor-pointer flex items-center gap-1 font-poppins hover:text-[#8AC926] text-xs whitespace-nowrap px-1"
    //               onClick={() => handleUnsuspension(info.row.original._id)}
    //             >
    //               <MdDownloadDone />
    //               <span>Unsuspend account</span>
    //             </div>
    //           )}
    //           <div
    //             className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
    //             onClick={() =>
    //               navigate(`/admin/inbox?uid=${info.row.original.user._id}`)
    //             }
    //           >
    //             <BiMessage />
    //             <span> Send a message</span>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   ),
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

  const currentApplicationDetails = queryClient.getQueryData([
    "application-status",
  ]);

  const singleHOApp = useQuery({
    queryKey: ["fetch-single-HO-app-details-insurance"],
    queryFn: () =>
      getSingleHOApp((currentApplicationDetails as any)?.data?.data.appId),
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  const completeApplicationMutation = useMutation({
    mutationKey: ["complete-application-at-insurance"],
    mutationFn: () => {
      return axiosInstance.patch(
        `applications/${
          (currentApplicationDetails as any)?.data?.data.appId
        }/ho/fulfil`
      );
    },
    onSuccess: () => {
      toast.success("Application completed successfully");
      queryClient.invalidateQueries({
        type: "all",
      });
      navigate("/dashboard/applications/finance-applications");
    },
    onError: () => {
      toast.error("Error completing application");
    },
  });

  const cancelApplicationMutation = useMutation({
    mutationKey: ["cancel-application-at-insurance"],
    mutationFn: () => {
      return axiosInstance.patch(
        `applications/${
          (currentApplicationDetails as any)?.data?.data.appId
        }/ho/cancel`
      );
    },
    onSuccess: () => {
      toast.success("Application canceled successfully");
      queryClient.invalidateQueries({
        type: "all",
      });
      navigate("/dashboard/applications/finance-applications");
    },
    onError: () => {
      toast.error("Error canceling application");
    },
  });

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
                    <tr>
                      <td colSpan={columns.length}>
                        {(expandedRows as any).includes(
                          (row as any).original._id
                        ) && (
                          <div className="p-4 bg-[#F8F9FA] border-y border-gray-200">
                            <div className="flex items-center justify-between">
                              {(row as any).original.fin.media.map(
                                (
                                  doc: { fileType: string; url: string },
                                  i: number,
                                  arr: { fileType: string; url: string }[]
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
                                        {doc.fileType}

                                        <div className="flex items-start mt-4 gap-x-2">
                                          <img
                                            className="w-fit h-10 bg-cover"
                                            src={
                                              "/assets/graphics/view-document.svg"
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
                              {(singleHOApp as any)?.data?.data?.data
                                ?.appStage === 3 &&
                                (singleHOApp as any)?.data?.data?.data
                                  ?.appId === (row as any).original._id && (
                                  <div className="flex flex-col gapy-4 gap-2 px-14">
                                    <Button
                                      onClick={() =>
                                        completeApplicationMutation.mutate()
                                      }
                                      variant={"outline"}
                                      className="border border-ca-blue text-ca-blue rounded-md poppins-4 text-xs px-3 py-1 hover:bg-ca-blue hover:text-white"
                                    >
                                      Complete Application
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        cancelApplicationMutation.mutate()
                                      }
                                      variant={"outline"}
                                      className="border border-ca-red text-ca-red rounded-md poppins-4 text-xs px-3 py-1 hover:bg-ca-red hover:text-white"
                                    >
                                      Cancel Application
                                    </Button>
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {(completeApplicationMutation.isPending ||
        cancelApplicationMutation.isPending) && (
        <LoadingModal text={"Updating registration status"} />
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

export default HOFinanceGrid;
