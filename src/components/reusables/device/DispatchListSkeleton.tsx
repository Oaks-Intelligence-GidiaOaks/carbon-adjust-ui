const DispatchListSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="border rounded-lg p-4">
          {/* Header row - Stacks on mobile */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
            <div className="space-y-2 w-full sm:w-auto">
              {/* Device name */}
              <div className="h-5 w-full sm:w-40 bg-gray-200 rounded animate-pulse"></div>
              {/* Device type */}
              <div className="h-5 w-3/4 sm:w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-24 bg-blue-100 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Details grid - Reorganizes on mobile */}
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-4">
            {/* Checkbox placeholder */}
            <div className="flex items-center">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Time and offset information - Stack on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              <div className="text-sm text-gray-500">Scheduled Time</div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              <div className="text-sm text-gray-500">Dispatch Window</div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              <div className="text-sm text-gray-500">Projected Offset</div>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Mobile-only labels and values */}
          <div className="mt-4 space-y-4 sm:hidden">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-500">Achieved Offset</div>
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Expand button */}
          <div className="flex justify-center mt-4">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DispatchSkeletonLoadingIndicator = () => {
  return (
    <div role="status" className="flex flex-col h-screen">
      <div className="animate-pulse space-y-4 w-full">
        <DispatchListSkeleton />
      </div>
    </div>
  );
};

export default DispatchSkeletonLoadingIndicator;
