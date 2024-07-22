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
import { IoClose } from "react-icons/io5";

//   util functions
import { calculateTimeLeft, formatDate } from "@/lib/utils";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";

// child   components
import LoadingModal from "@/components/reusables/LoadingModal";
import TablePagination from "@/components/reusables/TablePagination";
import { BsPeople, BsThreeDotsVertical } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushAdMetaData } from "@/features/adSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishAdsToLocation } from "@/services/adminService";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const AdsGrid = (props: { data: any[] }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const publishAdsToLocationMutation = useMutation({
    mutationKey: ["publish-ads-to-location"],
    mutationFn: (adsData: { location: string; adverts: string[] }) =>
      publishAdsToLocation(adsData),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["All"],
      });
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

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

  const handleEditActionClick = (info: any) => {
    dispatch(pushAdMetaData(info.row.original));
    navigate(`/admin/ads/${info.getValue()}/edit`);
  };

  const handleCheckboxClick = (id: string) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const columnHelper = createColumnHelper();

  const columns = [
    // Checkbox
    columnHelper.accessor((row: any) => row._id, {
      id: "select",
      cell: (info) => {
        return (
          <input
            type="checkbox"
            // @ts-ignore
            checked={selectedRows.includes(info.row?.original?._id!)}
            // @ts-ignore
            onChange={() => handleCheckboxClick(info?.row?.original?._id!)}
          />
        );
      },
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
    }),

    // S/N
    columnHelper.accessor((_, rowIndex) => ({ serialNumber: rowIndex + 1 }), {
      id: "serialNumber",
      cell: (info) => (
        <div className="w-14 mx-auto text-center">
          {info.getValue().serialNumber}
        </div>
      ),
      header: () => <div className="w-14 px-1 text-center">S/N</div>,
    }),

    // Date Created
    columnHelper.accessor((row: any) => row.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">
          {formatDate(info.getValue())}
        </div>
      ),
      header: () => <div className="w-24 px-1 text-center">Date created</div>,
    }),

    // title
    columnHelper.accessor((row: any) => row.title, {
      id: "title",
      cell: (info) => (
        <div className="w-24 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-24 px-1 text-center">Title</div>,
    }),

    // Description
    columnHelper.accessor((row: any) => row?.description, {
      id: "description",
      cell: (info) => (
        <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
          <span className="">{info.getValue()}</span>
        </div>
      ),
      header: () => <div className="w-44 text-left">Description</div>,
    }),

    // cta link
    columnHelper.accessor((row: any) => row.ctaLink, {
      id: "ctaLink",
      cell: (info) => (
        <div className="w-44 mx-auto text-left underline">
          <a href={info.getValue()} target="__blank" rel="noopener noreferrer">
            {info.getValue()}
          </a>
        </div>
      ),
      header: () => <div className="w-44 text-left">CTA Link</div>,
    }),

    // ctaText
    columnHelper.accessor((row: any) => row.ctaText, {
      id: "ctaText",
      cell: (info) => (
        <div className="line-clamp-1 pr-4 text-ellipsis w-64">
          <span className="">{info.getValue()}</span>
        </div>
      ),
      header: () => <div className="w-52 text-left">CTA Text</div>,
    }),

    // expirationDuration
    columnHelper.accessor((row: any) => row?.expirationDuration, {
      id: "expirationDuration",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">{info.getValue()} days</span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left"> Expiration Duration </div>,
    }),

    // expiredAt
    columnHelper.accessor((row: any) => row?.expiredAt, {
      id: "expiredAt",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">{calculateTimeLeft(info.getValue())}</span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">Expiration Time</div>,
    }),

    // exposureTime
    columnHelper.accessor((row: any) => row?.exposureTime, {
      id: "exposureTime",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">{info.getValue()} seconds</span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">Exposure Time</div>,
    }),

    // isActive
    columnHelper.accessor((row: any) => row?.isActive, {
      id: "isActive",
      cell: (info: any) => (
        <div className="w-44 relative flex items-center text-sm">
          {Boolean(info.row.original?.isActive) ? (
            <span className="text-green-500">Active</span>
          ) : (
            <span className="text-gray-400"> Inactive </span>
          )}
        </div>
      ),
      header: () => <div className="w-32 whitespace-nowrap">Status</div>,
    }),

    // isDefault
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
                <div
                  className="cursor-pointer flex items-center gap-1 font-poppins whitespace-nowrap text-left text-xs px-1 hover:text-ca-blue "
                  onClick={() => handleEditActionClick(info)}
                >
                  <div className="rounded-full bg-ca-blue p-1">
                    <BsPeople className="text-white text-base size-3" />
                  </div>
                  <span>Edit Ad</span>
                </div>

                <div
                  className="cursor-pointer flex items-center gap-1 font-poppins  hover:text-ca-red text-xs whitespace-nowrap px-1"
                  onClick={() => {}}
                >
                  <div className="rounded-full bg-red-500 p-1">
                    <IoClose className="text-white text-base size-3" />
                  </div>

                  <span> Delete Ad</span>
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

  const handlePublishToFeaturedAction = (location: string) => {
    // run publish mutation
    publishAdsToLocationMutation.mutate({
      location,
      adverts: selectedRows,
    });
  };

  return (
    <div className="">
      {/* table group actions */}
      <div className=" w-fit ml-auto flex gap-2 mt-3">
        <button
          disabled={selectedRows.length < 1}
          onClick={() => handlePublishToFeaturedAction("FEATURED")}
          className={` ${
            selectedRows.length < 1 ? "text-gray-300" : ""
          } border rounded-xl p-2 text-sm px-4`}
        >
          {publishAdsToLocationMutation.isPending ? (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span>Publish to Featured</span>
          )}
        </button>

        <button
          disabled={selectedRows.length < 1}
          onClick={() => handlePublishToFeaturedAction("HERO")}
          className={`${
            selectedRows.length < 1 ? "text-gray-300" : ""
          } text-sm border rounded-xl p-2 px-3`}
        >
          {publishAdsToLocationMutation.isPending ? (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span>Publish to Hero</span>
          )}
        </button>
      </div>

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
      {(false || false) && (
        <LoadingModal text={"Updating registration status"} />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default AdsGrid;
