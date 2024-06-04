import { FaSearch } from "react-icons/fa";

const TableFilter = ({ setFilterQuery }: { setFilterQuery: any }) => {
  return (
    <div className="w-full my-3 mb-5 flex justify-end items-center px-2 sm:px-6">
      <div className="flex justify-between items-center relative border border-gray-300 rounded-md">
        <input
          className="w-[240px] flex-1 border-none p-2 text-sm rounded-md pr-8 focus:outline-ca-blue font-poppins"
          placeholder="Search table"
          onChange={(e) => setFilterQuery(e.target.value)}
        />
        <div className="flex absolute right-0 top-[50%] -translate-y-1/2 items-center justify-center px-2">
          <FaSearch className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
