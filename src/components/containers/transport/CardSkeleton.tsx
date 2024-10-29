import { Skeleton } from "@mui/material";

const TransportHistoryCardSkeleton = () => {
  return (
    <div className="flex bg-gray-100 border rounded-lg py-5 px-5 sm:px-10 w-full">
      <div className="flex-1 flex-col sm:p-5 divide-y-2">
        <div className="flex justify-between items-center my-2">
          <div className="flex items-center gap-4">
            <Skeleton variant="rectangular" width={40} height={40} />
            <div>
              <Skeleton variant="text" width={100} />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center">
              <Skeleton variant="text" width={60} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-5">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col gap-y-1">
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportHistoryCardSkeleton;
