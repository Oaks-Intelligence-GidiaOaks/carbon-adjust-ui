const AdminSettingSkeleton = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="py-3">
        <h2 className="font-[500] text-2xl text-center blue-gradient text-transparent bg-clip-text">
          Admin Settings
        </h2>
      </div>

      <div className="md:w-[600px] gap-6 grid grid-cols-2 place-items-center mx-auto">
        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Conversion Rate
          </label>

          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Default login coin reward
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Minimum amount of coin
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            Yearly carbon offset
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700">
            First purchase for marketplace reward
          </label>
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-md h-8 w-full"></div>
          </div>
        </div>
      </div>

      <div className="w-fit mx-auto mt-5">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-md h-10 w-32"></div>
        </div>
      </div>
    </div>
  );
};
export default AdminSettingSkeleton;
