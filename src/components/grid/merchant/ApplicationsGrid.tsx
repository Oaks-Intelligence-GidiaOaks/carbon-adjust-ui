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
// import { formatDate } from "../../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { FaDownload, FaList } from "react-icons/fa";
import TablePagination from "../../reusables/TablePagination";
import LoadingModal from "../../reusables/LoadingModal";
// import { CiWarning } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
// import file_icon from "../../../assets/icons/file_icon.png";
// import DeleteAccount from "../../modals/DeleteAccount";
// import ResponseAlert from "../../reuseable/ResponseAlert";
import { useOutsideCloser } from "../../../hooks/useOutsideCloser";
import { EyeIcon } from "@heroicons/react/24/outline";
// import { IoDownloadOutline } from "react-icons/io5";
// import { cn } from "@/utils";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { BsPeople, BsThreeDotsVertical } from "react-icons/bs";
import {
  //   MdCancel,
  MdDone,
  //   MdDownloadDone,
  //   MdOutlineDeleteOutline,
} from "react-icons/md";
// import { PiWarningBold } from "react-icons/pi";
// import { BiMessage } from "react-icons/bi";
// import { PDFIcon } from "@/assets/icons";
// import { GrClose } from "react-icons/gr";
import { completeApplication } from "@/services/merchant";
import { StaffModal } from "@/components/dialogs";

const ApplicationsGrid = ({ data }: { data: any[]; isUpdating: boolean }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [currentRowData, setCurrentRowData] = useState({
    packageId: "",
    appId: "",
  });

  //   console.log(data);
  //   const [expandedRows, setExpandedRows] = useState([]);

  // const [file, setFile] = useState<File | null>();
  const queryClient = useQueryClient();

  // const [declineRowId, setDeclineRowId] = useState(null);
  // const [showDeclineModal, setShowDeclineModal] = useState(false);
  //   const [, setShowDeleteModal] = useState(false);
  // const [showResponseAlert, setShowResponseAlert] = useState(false);
  // const [responseStatus, setResponseStatus] = useState(false);
  // const [responseMessage, setResponseMessage] = useState(null);
  //   const [, setUserToDelete] = useState(null);

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  //   const mutation = useMutation({
  //     mutationFn: updateVerificationStatus,
  //     onSuccess: () => {
  //       // Manually update the data state to reflect the updated status
  //       //   setData((prevData) =>
  //       //     prevData.map((item) =>
  //       //       item._id === variables.id
  //       //         ? { ...item, verified: variables.verified }
  //       //         : item
  //       //     )
  //       //   );
  //     },
  //   });

  //   const getTextColor = (value: null | string) => {
  //     if (value === null) {
  //       return "#139EEC";
  //     } else if (value === "completed") {
  //       return "#8AC926";
  //     } else if (value === "suspended") {
  //       return "#C9C126";
  //     } else {
  //       return "#FF595E";
  //     }
  //   };

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

  const handleActionClick = (id: any, rowData: any) => {
    console.log(rowData._id);

    setCurrentRowData({
      appId: rowData._id,
      packageId: rowData._id,
    });
    if (currentRowId === id) {
      setShowModal((prevState) => !prevState);
    } else {
      setCurrentRowId(id);
      setShowModal(true);
    }
  };

  const columnHelper = createColumnHelper();

  const approvalInputRef = useRef<HTMLInputElement>(null);
  const declineInputRef = useRef<HTMLInputElement>(null);

  const declineMutation = useMutation({
    mutationKey: ["decline application"],
    mutationFn: (ids: { appId: string; file: File }) => {
      const formData = new FormData();

      if (!ids.file) {
        toast.error("Attach document");
      }

      if (ids.file) {
        formData.append("file", ids.file);
      }

      formData.append("status", "false");

      return axiosInstance.patch(
        `applications/${ids.appId}/aggregator/review`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Application declined");
      queryClient.invalidateQueries({
        queryKey: ["get-applications"],
      });
      setCurrentRowId(null);
    },
    onError: () => {
      toast.error("Error approving contractor");
    },
  });

  const approvedMutation = useMutation({
    mutationKey: ["approve application"],
    mutationFn: (ids: { appId: string; file: File }) => {
      const formData = new FormData();

      if (!ids.file) {
        toast.error("Attach document");
      }
      if (ids.file) {
        formData.append("file", ids.file);
      }
      formData.append("status", "true");

      return axiosInstance.patch(
        `applications/${ids.appId}/aggregator/review`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Application approved");
      setCurrentRowId(null);
      queryClient.invalidateQueries({
        queryKey: ["get-applications"],
      });
    },
    onError: () => {
      toast.error("Error approving application");
    },
  });

  const handleApprovalMutation = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFile = event.target.files?.[0]; // Get the selected file
    if (newFile) {
      // Perform your request here
      approvedMutation.mutate({
        appId: currentRowData.appId,
        file: newFile,
      });
    }
  };

  const handleDeclineMutation = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFile = event.target.files?.[0]; // Get the selected file
    if (newFile) {
      // Perform your request here
      declineMutation.mutate({
        appId: currentRowData.appId,
        file: newFile,
      });
    }
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

    // columnHelper.accessor((row: any) => row?.appRef, {
    //   id: "appRef",
    //   cell: (info) => (
    //     <div className="w-30 mx-auto text-left">
    //       {" "}
    //       {(info.row.original as any).appRef}
    //     </div>
    //   ),
    //   header: () => <div className="w-36 text-left">Application ID</div>,
    // }),

    columnHelper.accessor((row: any) => row?._id, {
      id: "_id",
      cell: (info) => (
        <div className="w-fit text-left">
          {
            //   formatDate(

            info.getValue()

            // )
          }
        </div>
      ),
      header: () => <div className="w-60 text-left">Order ID</div>,
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

    // columnHelper.accessor((row: any) => row?.booking_date, {
    //   id: "booking_date",
    //   cell: (info) => (
    //     <div className="w-24 mx-auto text-left">{info.getValue()}</div>
    //   ),
    //   header: () => <div className="w-36 text-left">Booking Date</div>,
    // }),

    columnHelper.accessor((row: any) => row?.amount, {
      id: "amount",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">
          {console.log(console.log(info.row.original))}
          {info.getValue()}
        </div>
      ),
      header: () => <div className="w-36 text-left">Amount</div>,
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
            <input
              ref={approvalInputRef}
              type="file"
              name="image"
              id="approval-file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  handleApprovalMutation(e);
                }
              }}
            />
            <input
              ref={declineInputRef}
              type="file"
              name="image"
              id="rejection-file"
              className="hidden"
              onChange={(e) => {
                handleDeclineMutation(e);
              }}
            />
            {/* Modal */}
            {showModal && currentRowId === info.getValue() && (
              <div
                key={info.getValue()}
                ref={actionButtonsRef}
                className="absolute top-[-30px] flex flex-col gap-y-2 z-10 right-[40px] bg-white border border-gray-300  rounded p-2"
              >
                {!info.row.original.isAssigned && (
                  <div
                    className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                    onClick={() => setShowStaffModal(true)}
                  >
                    <div className="rounded-full bg-rose-500 p-1">
                      <BsPeople className="text-white text-base size-3" />
                    </div>
                    <span>Assign to staff</span>
                  </div>
                )}
                {info.row.original.status === "pending" && (
                  <div
                    className="cursor-pointer flex items-center gap-1 font-poppins whitespace-nowrap text-left text-xs hover:text-ca-blue px-1"
                    // onClick={() => {
                    //   setUserToDelete(info.row.original);
                    //   setShowDeleteModal(true);
                    // }}
                    onClick={() => {
                      completeApplicationMutation.mutate(info.getValue());
                      setCurrentRowId(null);
                      setShowModal(false);
                    }}
                  >
                    <div className="rounded-full bg-ca-blue p-1">
                      <MdDone className="text-white text-base size-3" />
                    </div>
                    <span>Complete Application</span>
                  </div>
                )}

                <div
                  className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                  onClick={() =>
                    navigate(`/merchant/applications/${info.row.original._id}`)
                  }
                >
                  <div className="rounded-full bg-violet-500 p-1">
                    <EyeIcon className="text-white text-base size-3" />
                  </div>
                  <span> View Details</span>
                </div>
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

export default ApplicationsGrid;
