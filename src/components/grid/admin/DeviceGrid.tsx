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

//   util functions
import { formDateWithTime, formatDate } from "@/lib/utils";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";

// child   components
import TablePagination from "@/components/reusables/TablePagination";

import DeleteUserModal from "@/components/dialogs/DeleteUserModal";
import { IDispatchDevice } from "@/interfaces/device.interface";

const DeviceGrid = (props: {
  data: IDispatchDevice[];
  isUpdating: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentRowId] = useState<string>("");

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const columnHelper = createColumnHelper();

  const getStatusColor: any = {
    processed: {
      main: "text-[#139EEC] bg-[#139EEC30]",
      dot: "bg-[#139EEC]",
    },
    received: {
      main: "text-[#8AC926] bg-[#8AC92630]",
      dot: "bg-[#8AC926]",
    },
  };

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

    // schedule ID
    columnHelper.accessor((row: any) => row._id, {
      id: "scheduleId",
      cell: (info) => <div className="">{info.getValue()}</div>,
      header: () => <div className="">Schedule ID</div>,
    }),

    // Device Name
    columnHelper.accessor((row: any) => row.device?.name, {
      id: "deviceName",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-44 text-left">Device Name</div>,
    }),
    // Device Type
    columnHelper.accessor((row: any) => row.device?.type, {
      id: "deviceType",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-44 text-left">Device Type</div>,
    }),

    // Electricty Supplier
    columnHelper.accessor((row: any) => row.device?.electricityProvider, {
      id: "electricityProvider",
      cell: (info) => (
        <div className="w-44 mx-auto text-left">{info.getValue()}</div>
      ),
      header: () => <div className="w-44 text-left">Electricity Supplier</div>,
    }),

    // Device Duration
    columnHelper.accessor((row: any) => row.wpInHours, {
      id: "wpInHours",
      cell: (info) => (
        <div className="line-clamp-1 pr-4 text-ellipsis w-64">
          <span className="">{info.getValue()} hrs</span>
        </div>
      ),
      header: () => <div className="w-52 text-left">Device Duration</div>,
    }),

    // Start Time
    columnHelper.accessor((row: any) => row?.wpInHoursTimestamp, {
      id: "wpInHoursTimestamp",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <span className="">{formDateWithTime(info.getValue(), true)}</span>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">Start Time</div>,
    }),

    // Emissions

    // Status
    columnHelper.accessor((row: any) => row?.status, {
      id: "status",
      cell: (info) => {
        return (
          <div className="flex justify-start w-full line-clamp-1 pr-4 text-ellipsis max-w-60">
            <div
              className={`flex-center gap-2 p-[6px] rounded-3xl px-4 border w-[120px] ${
                getStatusColor[info.getValue()].main
              }`}
            >
              <span
                className={`h-[6px] w-[6px] rounded-full border-[0.5px] ${
                  getStatusColor[info.getValue()].dot
                }`}
              />

              <span>{info.getValue()}</span>
            </div>
          </div>
        );
      },
      header: () => <div className="w-44 text-left">Status</div>,
    }),

    // Smart Plug ID
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

      {showDeleteModal && (
        <DeleteUserModal
          rowId={currentRowId}
          setShowDeleteModal={setShowDeleteModal}
          showUDeleteModal={showDeleteModal}
        />
      )}

      {/* pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default DeviceGrid;
