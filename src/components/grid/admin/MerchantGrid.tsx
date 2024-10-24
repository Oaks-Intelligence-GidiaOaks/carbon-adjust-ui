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
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

// util functions
import { formatDate, getMerchantRoleColor } from "@/lib/utils";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";

// child   components
import LoadingModal from "@/components/reusables/LoadingModal";
import TablePagination from "@/components/reusables/TablePagination";
import { BsPeople, BsThreeDotsVertical } from "react-icons/bs";
import {
  approveUserRegistration,
  declineUserRegistration,
  makeMerchantInternal,
  makeReportMerchant,
  makeSuperMerchant,
} from "@/services/adminService";
import GridDocField from "@/components/reusables/GridDocField";
import { UserRole } from "@/interfaces/user.interface";
import DeleteUserModal from "@/components/dialogs/DeleteUserModal";

const MerchantGrid = (props: { data: any[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

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

  const handleApprovalMutation = (userId: string) => {
    handleActionClick(userId);
    approvedMutation.mutate(userId);
  };

  const handleMakeMerchantInternal = (userId: string) => {
    internalMerchantMutation.mutate(userId);
  };

  const handleMakeReportMerchant = (userId: string) => {
    reportMerchantMutation.mutate(userId);
  };

  const handleMakeSuperMerchant = (userId: string) => {
    superMerchantMutation.mutate(userId);
  };

  const columnHelper = createColumnHelper();

  const columns = [
    // S/N
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

    // date Created
    columnHelper.accessor((row: any) => row.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">
          {formatDate(info.getValue())}
        </div>
      ),
      header: () => <div className="w-24 px-1 text-center">Date created</div>,
    }),

    // User
    columnHelper.accessor((row: any) => row.contactName, {
      id: "contactName",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-44 text-left">Name</div>,
    }),

    // Email
    columnHelper.accessor((row: any) => row.contactEmail, {
      id: "contactEmail",
      cell: (info) => (
        <div className="line-clamp-1 pr-4 text-ellipsis w-52">
          <span className="">{(info.row.original as any).email}</span>
        </div>
      ),
      header: () => <div className="w-52 text-left">Email</div>,
    }),

    // phone
    columnHelper.accessor((row: any) => row?.phoneNos, {
      id: "phoneNos",
      cell: (info) => (
        <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
          <span className="">
            {Boolean((info.row.original as any).phoneNos)
              ? (info.row.original as any).phoneNos
              : "---------------"}
          </span>
        </div>
      ),
      header: () => <div className="w-44 text-left">Phone</div>,
    }),

    columnHelper.accessor((row: any) => row?.address.country, {
      id: "Country",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">
              {Boolean((info.row.original as any)?.address?.country)
                ? (info.row.original as any)?.address?.country
                : "---------------"}
            </span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">Country</div>,
    }),

    // Address info
    columnHelper.accessor((row: any) => row?.address.cityOrProvince, {
      id: "City",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">
              {Boolean((info.row.original as any)?.address?.cityOrProvince)
                ? (info.row.original as any)?.address?.cityOrProvince
                : "---------------"}
            </span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">City</div>,
    }),

    columnHelper.accessor((row: any) => row?.address.firstLineAddress, {
      id: "Address",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">
              {Boolean((info.row.original as any)?.address?.firstLineAddress)
                ? (info.row.original as any)?.address?.firstLineAddress
                : "---------------"}
            </span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">Home Address</div>,
    }),

    // Zip code
    columnHelper.accessor((row: any) => row?.address.zipcode, {
      id: "zipcode",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">
              {Boolean((info.row.original as any)?.address?.zipcode)
                ? (info.row.original as any)?.address?.zipcode
                : "---------------"}
            </span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">Zip code</div>,
    }),

    // Documents
    columnHelper.accessor((row: any) => row?.doc, {
      id: "doc",
      cell: (info) => (
        <GridDocField docs={(info.row.original as any).doc || []} />
      ),
      header: () => <div className="w-44 text-left">Documents</div>,
    }),

    // Status
    columnHelper.accessor((row: any) => row?.status, {
      id: "status",
      cell: (info: any) => (
        <div className="w-44 relative flex items-center text-sm">
          {(info.row.original as any).status === "pending" ? (
            <span
              style={{ color: "#139EEC", background: "#139EEC30" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Pending
            </span>
          ) : (info.row.original as any).status === "completed" ? (
            <span
              style={{ color: "#8AC926", background: "#8AC92630" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Approved
            </span>
          ) : (info.row.original as any).status === "unverified" ? (
            <span
              style={{ color: "#ff7646", background: "#ff764630" }}
              className="w-36 py-1 rounded-full inline-block mx-auto"
            >
              Unverified
            </span>
          ) : (info.row.original as any).status === "suspended" ? (
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
      header: () => <div className="w-32 whitespace-nowrap">Status</div>,
    }),

    // Is Merchant Internal
    columnHelper.accessor((row: any) => row?.status, {
      id: "isInternalMerchant",
      cell: (info: any) => {
        const roles = info.row.original.roles || [];

        return (
          <div className="flex flex-col gap-1">
            {roles?.map((it: UserRole, i: number) => (
              <span
                key={i}
                className={`w-36 ${getMerchantRoleColor[it]} text-white py-1 rounded-full text-xs inline-block mx-auto`}
              >
                {it.replace("_", " ")}
              </span>
            ))}

            {info.row.original.isInternalMerchant && (
              <span
                className={`w-36 bg-teal-300 text-white py-1 rounded-full text-xs inline-block mx-auto`}
              >
                IINTERNAL MERCHANT
              </span>
            )}
          </div>
        );
      },
      header: () => (
        <div className="w-32 whitespace-nowrap">Merchant Roles</div>
      ),
    }),

    // Actions
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
                className="absolute top-[-30px] flex flex-col gap-y-3  right-[40px] bg-white border border-gray-300  rounded p-2"
              >
                {info.row.original.status !== "completed" && (
                  <div
                    className="cursor-pointer flex items-center gap-1 font-poppins whitespace-nowrap text-left text-xs px-1 hover:text-ca-blue "
                    onClick={() => handleApprovalMutation(currentRowId)}
                  >
                    <div className="rounded-full bg-ca-blue p-1">
                      <BsPeople className="text-white text-base size-3" />
                    </div>
                    <span>Activate</span>
                  </div>
                )}

                {!info.row.original.isInternalMerchant &&
                  info.row.original.merchantType &&
                  info.row.original.status === "completed" && (
                    <div
                      className="cursor-pointer flex items-center gap-1 font-poppins  hover:text-yellow-500 text-xs whitespace-nowrap px-1"
                      onClick={() => handleMakeMerchantInternal(currentRowId)}
                    >
                      <div className="rounded-full bg-yellow-500 p-1">
                        <IoClose className="text-white text-base size-3" />
                      </div>

                      <span> Make merchant internal</span>
                    </div>
                  )}

                {info.row.original.merchantType &&
                  info.row.original.status === "completed" &&
                  !info.row.original.roles.includes(
                    UserRole.REPORT_MERCHANT
                  ) && (
                    <div
                      className="cursor-pointer flex items-center gap-1 font-poppins  hover:text-green-500 text-xs whitespace-nowrap px-1"
                      onClick={() => handleMakeReportMerchant(currentRowId)}
                    >
                      <div className="rounded-full bg-green-500 p-1">
                        <IoClose className="text-white text-base size-3" />
                      </div>

                      <span> Make report merchant</span>
                    </div>
                  )}

                {!info.row.original.roles.includes(UserRole.SUPER_MERCHANT) &&
                  info.row.original.merchantType &&
                  info.row.original.status === "completed" && (
                    <div
                      className="cursor-pointer flex items-center gap-1 font-poppins  hover:text-cyan-500 text-xs whitespace-nowrap px-1"
                      onClick={() => handleMakeSuperMerchant(currentRowId)}
                    >
                      <div className="rounded-full bg-cyan-500 p-1">
                        <IoClose className="text-white text-base size-3" />
                      </div>

                      <span> Make super merchant</span>
                    </div>
                  )}

                {/* Make This To Be Active Again */}
                {/* <div
                  className="cursor-pointer flex items-center gap-1 font-poppins  hover:text-ca-red text-xs whitespace-nowrap px-1"
                  onClick={() => handleDeclineMutation(currentRowId)}
                >
                  <div className="rounded-full bg-red-500 p-1">
                    <IoClose className="text-white text-base size-3" />
                  </div>

                  <span> Suspend</span>
                </div> */}

                {/* This is temporary: Change back to suspend action */}
                <div
                  className="cursor-pointer flex items-center gap-1 font-poppins  hover:text-ca-red text-xs whitespace-nowrap px-1"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <div className="rounded-full bg-red-500 p-1">
                    <IoClose className="text-white text-base size-3" />
                  </div>

                  <span> Delete</span>
                </div>
              </div>
            )}
          </div>
        );
      },
      header: () => <div className="">Action</div>,
    }),
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterQuery, setFilterQuery] = useState("");

  const table = useReactTable({
    data: props.data,
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

  const approvedMutation = useMutation({
    mutationKey: ["approve-user"],
    mutationFn: (id: string) => approveUserRegistration(id),
    onSuccess: () => {
      toast.success("User verified succesfully");
      queryClient.invalidateQueries({ queryKey: ["users-registration"] });
    },
    onError: () => {
      toast.error("Error verifying user");
    },
  });

  const declineMutation = useMutation({
    mutationKey: ["decline-user"],
    mutationFn: (id: string) => declineUserRegistration(id),
    onSuccess: () => {
      toast.success("User declined succesfully");
      queryClient.invalidateQueries({ queryKey: ["users-registration"] });
    },
    onError: () => {
      toast.error("Error declining user");
    },
  });

  const internalMerchantMutation = useMutation({
    mutationKey: ["make-internal-merchant"],
    mutationFn: (id: string) => makeMerchantInternal(id),
    onSuccess: (_: any) => {
      toast.success("Merchant internalised succesfully");
      queryClient.invalidateQueries({ queryKey: ["users-registration"] });
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const reportMerchantMutation = useMutation({
    mutationKey: ["report-merchant"],
    mutationFn: (id: string) => makeReportMerchant(id),
    onSuccess: (_: any) => {
      toast.success("Merchant updated succesfully");
      queryClient.invalidateQueries({ queryKey: ["users-registration"] });
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const superMerchantMutation = useMutation({
    mutationKey: ["super-merchant"],
    mutationFn: (id: string) => makeSuperMerchant(id),
    onSuccess: (_: any) => {
      toast.success("Merchant updated succesfully");
      queryClient.invalidateQueries({ queryKey: ["users-registration"] });
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

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

      {(declineMutation.isPending ||
        approvedMutation.isPending ||
        internalMerchantMutation.isPending ||
        reportMerchantMutation.isPending) && (
        <LoadingModal text={"Updating registration status"} />
      )}

      {showDeleteModal && (
        <DeleteUserModal
          rowId={currentRowId}
          setShowDeleteModal={setShowDeleteModal}
          showUDeleteModal={showDeleteModal}
        />
      )}

      {superMerchantMutation.isPending && (
        <LoadingModal text="Updating Merchant Status" />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default MerchantGrid;
