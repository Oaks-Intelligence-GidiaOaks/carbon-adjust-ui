import {
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  useReactTable,
  // getFilteredRowModel,
  getPaginationRowModel,
  // getSortedRowModel,
  // Column,
  // ColumnDef,
  PaginationState,
  // Table,
} from "@tanstack/react-table";
import { IGrid } from "@/types/grid";
import { findObjectWithMostKeys } from "@/utils";
import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const columnHelper = createColumnHelper<any>();

const Grid = (props: IGrid & { type?: string }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: props.pageSize,
  });

  const mostKeysObject = findObjectWithMostKeys(props.data);

  if (!mostKeysObject) {
    return <div>No data available for table</div>;
  }

  const headers = Object.keys(mostKeysObject).map((key) =>
    columnHelper.accessor((row) => row[key], {
      id: key,
      header: () => <p className={`min-w-[100px] px-2`}>{key}</p>,
      cell: (info) => <p>{info.getValue()}</p>,
    })
  );

  const serialNumberColumn = columnHelper.accessor(
    (_, rowIndex) => rowIndex + 1,
    {
      id: "w",
      header: () => <p className="min-w-[60px]">S/N</p>,
    }
  );

  // const actionsColumn = columnHelper.accessor(() => <div>holy</div>, {
  //   header: "header",
  //   // id: "id",
  //   // accessor: 'header'
  // });

  const columns = [serialNumberColumn, ...headers];

  const table = useReactTable({
    columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className={`w-full font-poppins`}>
      <div
        className={`w-full overflow-x-scroll text-center font-poppins relative max-h-[450px] text-xs ${props.tableStyles}`}
      >
        <table className={`min-w-[400px] w-full`}>
          <thead className="w-full text-xs font-[600] font-poppins sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="rounded-[32px] text-[#2196F3] w-full p-2"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header, i) => (
                  <th
                    // style={{
                    //   color: "red",
                    // }}
                    className={`bg-blue-light h-[55px] leading-[16.09px] capitalize ${
                      i == 0 && "rounded-l-[12px]"
                    }`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="w-full">
            {table.getRowModel().rows.map((row, i) => (
              <tr
                className={`h-[70px] font-[400] ${
                  i % 2 !== 0 && "bg-[#F7FBFE]"
                }`}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="h-[50px]  w-full flex items-center justify-between px-2 text-xs leading-[21px]">
        <div className="flex items-center  w-fit gap-4 font-[500] text-xs leading-[18px] text-[#696C71]">
          <span>Rows per page</span>
          <select className="w-[77px] border rounded-[5px] p-1">
            <option value="1">10</option>
            <option value="2">20</option>
            <option value="3">30</option>
          </select>
        </div>

        <div className=" gap-[22px] flex items-center ">
          <div>
            <span>
              {`
                ${table.getState().pagination.pageIndex + 1} of
                ${table.getPageCount().toLocaleString()}
                `}
            </span>
          </div>

          <div className="gap-5 flex items-center">
            <MdArrowBackIos size={15} onClick={() => table.previousPage()} />
            <MdArrowForwardIos size={15} onClick={() => table.nextPage()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
