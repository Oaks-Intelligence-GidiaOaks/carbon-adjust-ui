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
import { EyeIcon } from "@heroicons/react/24/outline";

import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { BsPeople, BsThreeDotsVertical } from "react-icons/bs";
import { MdDone } from "react-icons/md";

import { completeApplication } from "@/services/merchant";
import { StaffModal } from "@/components/dialogs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { formatDate } from "@/lib/utils";
import UploadDocModal from "@/components/dialogs/UploadDocModal";
import { UserRole } from "@/interfaces/user.interface";
import { IoDocumentText } from "react-icons/io5";
import GridDocField from "@/components/reusables/GridDocField";

const ApplicationsGrid = ({
  data,
  params,
}: {
  data: any[];
  params?: { page: number; limit: number };
  isUpdating: boolean;
}) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const [showModal, setShowModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showUploadDocModal, setShowUploadDocModal] = useState<boolean>(false);
  const [currentRowId, setCurrentRowId] = useState<string | null>(null);
  const [currentRowData, setCurrentRowData] = useState({
    packageId: "",
    appId: "",
  });

  const hasReportAccess =
    user?.roles.includes(UserRole.ADMIN_STAFF) ||
    user?.roles.includes(UserRole.REPORT_MERCHANT);

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

  const handleActionClick = (id: any, rowData: any) => {
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

    columnHelper.accessor((row: any) => row?.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <div className="w-fit text-left">{formatDate(info.getValue())}</div>
      ),
      header: () => <div className="w-32 text-left">Date</div>,
    }),

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

    columnHelper.accessor((row: any) => row?.name, {
      id: "name",
      cell: (info) => (
        <div className="w-60 mx-auto text-left">
          {info.getValue() || "-------------"}
        </div>
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
                {!info.row.original.isAssigned &&
                  user?.roles[0] === "MERCHANT" && (
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

                {/* Upload Report Only for report merchant */}
                {hasReportAccess && (
                  <div
                    className="cursor-pointer flex items-center gap-1 font-poppins hover:text-teal-600 text-xs whitespace-nowrap px-1"
                    onClick={() => setShowUploadDocModal(true)}
                  >
                    <div className="rounded-full bg-teal-600 p-1">
                      <IoDocumentText className="text-white text-base size-3" />
                    </div>

                    <span>Upload Report</span>
                  </div>
                )}

                {info.row.original.status === "pending" &&
                  !user?.roles.includes(UserRole.ADMIN_STAFF) && (
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

                {!user?.roles.includes(UserRole.ADMIN_STAFF) && (
                  <div
                    className="cursor-pointer flex items-center gap-1 font-poppins hover:text-ca-blue text-xs whitespace-nowrap px-1"
                    onClick={() =>
                      navigate(
                        user?.roles[0] === "STAFF"
                          ? `/staff/orders/${info.row.original._id}`
                          : `/merchant/applications/${info.row.original._id}`
                      )
                    }
                  >
                    <div className="rounded-full bg-violet-500 p-1">
                      <EyeIcon className="text-white text-base size-3" />
                    </div>
                    <span> View Details</span>
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

  if (hasReportAccess) {
    columns.splice(
      7,
      0,
      columnHelper.accessor((row: any) => row.merchantReport, {
        id: "reports",
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

          return (
            <div>
              <GridDocField docs={docs || []} />
            </div>
          );
        },
        header: () => <div className="w-44 text-left">Reports</div>,
      })
    );
  }

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

      {showUploadDocModal && (
        <UploadDocModal
          rowId={currentRowId}
          setShowUploadDocModal={setShowUploadDocModal}
          showUploadDocModal={showUploadDocModal}
          params={params}
        />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default ApplicationsGrid;
