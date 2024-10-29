const DeviceSkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-sm p-4">
          {/* Header with dots menu */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Device image and details container */}
          <div className="flex gap-4">
            {/* Image placeholder */}
            <div className="w-32 h-32 bg-gray-200 rounded animate-pulse"></div>

            {/* Device details */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Link Device button */}
          <div className="mt-4">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Dispatch info */}
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-center">
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeviceSkeletonLoader;
