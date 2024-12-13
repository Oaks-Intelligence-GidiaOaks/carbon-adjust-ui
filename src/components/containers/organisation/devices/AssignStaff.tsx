import Modal from "@/components/dialogs/Modal";
import { Button } from "@/components/ui";
import { BiSearch } from "react-icons/bi";

type AssignStaffModalProps = {
  setShowStaffModal: (value: boolean) => void;
};

const AssignStaffModal = ({ setShowStaffModal }: AssignStaffModalProps) => {
  return (
    <Modal>
      <div className="w-[90%] max-w-[513px] bg-white h-[90%] lg:h-[700px] rounded-lg flex flex-col">
        {/* Header */}
        <div className="bg-[#F5F6F7] h-[120px] p-7 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#091E42] font-poppins">
              Assign Staff
            </h3>
            <p className="text-[#7A8699] text-sm font-dm-sans">
              Assign staff to device
            </p>
          </div>
          <button
            className="bg-white rounded-full text-lg w-10 h-10 flex items-center justify-center"
            onClick={() => setShowStaffModal(false)}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow p-7 overflow-y-auto">
          {/* Search */}
          <div className="relative border border-border rounded-lg h-10 p-0 bg-white w-full">
            <BiSearch
              className="absolute top-2 left-2.5 opacity-40"
              size={24}
            />
            <input
              name="search"
              placeholder="Search for staff"
              className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
              onChange={() => {}}
            />
          </div>

          {/* Staff List */}
          <div className="my-10">
            <div className="border p-2 rounded-lg flex flex-col gap-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="border px-2 py-5 rounded-lg flex gap-3 justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://via.placeholder.com/10"
                      className="rounded-full w-8 h-8 object-cover"
                    />
                    <p className="text-[#091E42] font-poppins text-sm font-medium">
                      Air Fryer
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="askPurchaserQuote"
                    className="border accent-ca-blue border-[#575757] h-[19px] w-[19px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      
        <div className="p-7 bg-[#F5F6F7]  flex justify-end gap-5">
          <Button
            onClick={() => setShowStaffModal(false)}
            variant={"outline"}
            className="rounded-lg gap-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="rounded-lg gap-1">
            <span>Add</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignStaffModal;
