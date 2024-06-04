const PaginationButton = ({ data, onClick }: { data: any; onClick: any }) => (
  <div
    onClick={onClick}
    className="h-7 w-7 cursor-pointer text-sm grid place-items-center bg-light-gray border rounded"
  >
    {data}
  </div>
);

export default PaginationButton;
