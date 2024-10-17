import Loading from "@/components/reusables/Loading";
import { BiSearch } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";
import TransportCard from "./TransportCard";
import { useState } from "react";
import OptimizeModal from "./OptimizeModal";
import { getTransports } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { Transport } from "@/interfaces/transport.interface";

const Vehicles = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: transports, isLoading } = useQuery({
    queryKey: ["transports"],
    queryFn: () => getTransports(),
  });

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="loading" />
      </div>
    );
  }

  if (transports?.data?.transportationRecords.length === 0) {
    return (
      <div className="h-32 grid place-items-center max-w-[98%]">
        <h1>No Transport Data</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between flex-wrap mt-[15px] gap-5">
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
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => setShowModal(true)}
            variant={"outline"}
            className="rounded-[20px] border-cyan-700 flex-center gap-1 "
          >
            Optimize trip
          </Button>

          <Link className="ml-5" to="/dashboard/transport/add">
            <Button className="rounded-[20px] flex-center gap-1 ">
              <span className="md:block hidden">Add Transport</span>
              <PlusIcon />
            </Button>
          </Link>
        </div>
      </div>
      <div className=" mt-[20px] space-y-[38px]">
        {Array.from(
          transports.data.transportationRecords as Transport[],
          (it, i) => (
            <TransportCard {...it} key={i} />
          )
        )}
      </div>

      {showModal && <OptimizeModal onClick={() => setShowModal(false)} />}
      {/* Pagination */}
      {/* <div className="mt-8 pr-12 w-fit mx-auto">
        <Paginate {...pagination} onPageChange={handlePageChange} />
      </div> */}
    </div>
  );
};

export default Vehicles;
