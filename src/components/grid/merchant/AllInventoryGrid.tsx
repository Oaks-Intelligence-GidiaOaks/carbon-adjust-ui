import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { deleteInventory, fetchInventory } from "@/services/merchant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "@/components/ui";
import { BiSearch } from "react-icons/bi";
import { PlusIcon } from "@/assets/icons";
import { IoFilterSharp } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { cn, formatDateTime, serializeGridData } from "@/lib/utils";
import EditInventoryModal from "@/components/containers/merchant/EditInventorymodal";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const getStatusStyle = (status: string): string => {
  switch (status.toLowerCase()) {
    case "re-order":
      return "text-[#A39412] bg-[#FCFFC1]";
    case "in-stock":
      return "text-[#15A312] bg-[#DEFFE5]";
    case "out of stock":
      return "text-[#FA4258] bg-[#FFEBEB]";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

export function AllInventoryGrid({ className }: { className?: string }) {
  //const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [currentRow, setCurrentRow] = useState<any | null>(null);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  const actionButtonsRef = useRef<HTMLDivElement>(null);

  const toggleDialog = (id: string) => {
    setOpenDialogId((prevId) => (prevId === id ? null : id));
  };

  const {
    data: inventory,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-inventory", pagination.page, pagination.limit],
    queryFn: () => fetchInventory(pagination.page, pagination.limit),
  });

  const DeleteInventory = useMutation({
    mutationKey: ["delete-inventory"],
    mutationFn: (inventoryId: string) => deleteInventory(inventoryId),
    onError: (err: any) => {
      toast.error(
        err.response.data.message ||
          "Error deleting device. Please try again..."
      );
    },
    onSuccess: (sx: any) => {
      refetch();
      toast.success(sx.message);
    },
  });

  useEffect(() => {
    if (inventory?.data) {
      const serializedData = serializeGridData(
        inventory.data.inventories,
        pagination.page,
        pagination.limit
      );
      setInventoryData(serializedData);
    } else {
      setInventoryData([]);
    }
  }, [inventory?.data, pagination.page, pagination.limit]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionButtonsRef.current &&
        !actionButtonsRef.current.contains(event.target as Node)
      ) {
        toggleDialog(""); // Close the dialog
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: () => <div className="pl-2">S/N</div>,
      cell: ({ row }) => (
        <span className="text-sm pl-2">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "package.ID",
      header: () => <div className="whitespace-nowrap">Product ID</div>,
      cell: ({ row }) => (
        <div className="capitalize text-sm">{row.original._id || "N/A"}</div>
      ),
    },
    {
      accessorKey: "package.title",
      header: () => <div className="whitespace-nowrap">Product</div>,
      cell: ({ row }) => (
        <div className="capitalize text-sm">{row.original.title || "N/A"}</div>
      ),
    },
    {
      accessorKey: "package.category.name",
      header: () => <div className="w-32">Category</div>,
      cell: ({ row }) => (
        <div className="capitalize text-sm">
          {row.original.category?.name || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "package.sku",
      header: () => <div className="whitespace-nowrap">SKU</div>,
      cell: ({ row }) => (
        <div className="capitalize text-sm">{row.original.sku || "N/A"}</div>
      ),
    },
    {
      accessorKey: "package.color",
      header: () => <div className="w-20">Color</div>,
      cell: ({ row }) => {
        const colors = row.original.colors || [];
        const displayedColors = colors.slice(0, 2).join(",");
        const hasMore = colors.length > 2;

        return (
          <div className="capitalize text-sm">
            {displayedColors}
            {hasMore && " ..."}
          </div>
        );
      },
    },
    {
      accessorKey: "package.quantity",
      header: () => <div className="w-30">Quantity</div>,
      cell: ({ row }) => (
        <div className="text-sm">{row.original.quantity || "N/A"}</div>
      ),
    },
    {
      accessorKey: "package.quantity",
      header: () => <div className="w-30">Quantity Left</div>,
      cell: ({ row }) => (
        <div className="text-sm">{row.original.quantityLeft || "N/A"}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="w-32">Date Created</div>,
      cell: ({ row }) => (
        <div className="text-sm">
          {formatDateTime(row.original.createdAt) || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="w-32">Status</div>,
      cell: ({ row }) => (
        <div
          className={`capitalize text-xss py-1 text-center rounded ${getStatusStyle(
            row.original.inventoryStatus || "n/a"
          )}`}
        >
          {row.original.inventoryStatus || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="w-32">Action</div>,
      cell: ({ row }) => {
        const handleActionClick = (action: "update" | "delete") => {
          if (action === "update") {
            setShowEditModal(true);
            setCurrentRow(row.original);
          } else {
            DeleteInventory.mutate(row.original._id);
          }
        };

        return (
          <div className="relative">
            <BsThreeDotsVertical
              size={20}
              className="cursor-pointer"
              onClick={() => toggleDialog(row.id)} // Toggles dialog visibility
            />
            {openDialogId === row.id && (
              <div
                ref={actionButtonsRef}
                className="absolute top-1/2 left-[-8rem] transform -translate-y-1/2 bg-white border shadow-lg rounded-md w-32 z-10 p-1"
              >
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-xxs mb-2"
                  onClick={() => handleActionClick("update")}
                >
                  Update product
                </button>
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-xxs text-red-500"
                  onClick={() => handleActionClick("delete")}
                >
                  Delete product
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const {
    page = 1,
    totalPages = 1,
    totalInventories = 0,
  } = inventory?.data || {};

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: inventoryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  const LoadingState = () => (
    <>
      {Array.from({ length: 8 }, (_, rowIndex) => (
        <TableRow key={`loading-row-${rowIndex}`}>
          {columns.map((_, colIndex) => (
            <TableCell
              key={`loading-cell-${rowIndex}-${colIndex}`}
              className="h-10 text-center animate-pulse bg-gray-50"
            >
              {/* Placeholder content */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page,
      totalPages,
    }));
  }, [page, totalPages]);

  const handleClickPrev = useCallback(() => {
    if (pagination.page > 1) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  }, [pagination.page]);

  const handleClickNext = useCallback(() => {
    if (pagination.page < totalPages) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [pagination.page, totalPages]);
  const rows = table.getRowModel().rows;
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between flex-wrap mb-[15px] gap-5">
        <div className="flex items-center justify-center gap-5">
          <Button variant={"outline"} className="flex gap-2 ">
            <IoFilterSharp />
            <span className="md:block hidden">Filter by date</span>
          </Button>
          <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px] w-[250px]">
            <BiSearch
              className="absolute top-2 left-2.5 opacity-40"
              size={24}
            />
            <input
              name="search"
              placeholder="Search here"
              className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/merchant/packages/new">
            <Button className="rounded-[20px] flex-center gap-1 ">
              <span>Add Inventory</span>
              <PlusIcon />
            </Button>
          </Link>
          <Button variant={"outline"} className="flex-center gap-2 ">
            <FiUploadCloud />
            <span>Export as CSV</span>
          </Button>
        </div>
      </div>
      {/* {showModal && (
        <AddInventoryModal
          setShowModal={setShowModal}
          refetchInventory={refetch}
        />
      )} */}
      {showEditModal && (
        <EditInventoryModal setShowModal={setShowEditModal} data={currentRow} />
      )}
      <Table>
        <TableHeader className="!rounded-t-2xl bg-[#E8F3FC]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="font-poppins font-bold  text-[#3C3E41] cursor-pointer"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <LoadingState />
          ) : rows.length > 0 ? (
            rows.map((row) => (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="font-dm-sans text-black-main font-medium"
              >
                {row.getVisibleCells().map((cell) =>
                  cell.column.id === "logo" ? (
                    <td key={cell.id} className="w-14 px-2">
                      <img
                        className="size-10"
                        src={cell.getValue() as string}
                        alt="Logo"
                        loading="lazy" // Lazy-load images for better performance
                      />
                    </td>
                  ) : (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  )
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </TableBody>
      </Table>

      {inventoryData.length ? (
        <div className="mt-4 flex-center w-fit ml-auto text-gray-500 text-xs font-kumbh">
          <div className="flex-center gap-1 ">
            <span> {inventoryData[0].id} </span>-
            <span> {inventoryData[inventoryData.length - 1].id} </span>
            of
            <span>{totalInventories}</span>
          </div>

          <div className="flex-center">
            <button
              disabled={pagination.page <= 1}
              onClick={handleClickPrev}
              className={`${
                pagination.page <= 1 && "cursor-not-allowed text-muted"
              } grid place-items-center px-6 py-2 rounded-2xl`}
            >
              <FaChevronLeft size={17} />
            </button>

            <button
              disabled={pagination.page === totalPages}
              onClick={handleClickNext}
              className={`grid place-items-center pl-6 py-2 rounded-2xl ${
                pagination.page === totalPages &&
                "cursor-not-allowed text-muted"
              }`}
            >
              <FaChevronRight size={17} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
