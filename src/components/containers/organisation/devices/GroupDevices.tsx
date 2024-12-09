import Modal from "@/components/dialogs/Modal";
import { Button, Input } from "@/components/ui";

type GroupDevicesModalProps = {
  setShowModal: (value: boolean) => void;
};

const GroupDevicesModal = ({ setShowModal }: GroupDevicesModalProps) => {
  return (
    <Modal>
      <div className="w-[90%] max-w-[513px] bg-white h-[90%] lg:h-[700px] rounded-lg flex flex-col">
        {/* Header */}
        <div className="bg-[#F5F6F7] h-[120px] p-7 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-[#091E42] font-poppins">
              Group Devices
            </h3>
            <p className="text-[#7A8699] text-sm font-dm-sans">
              Select multiple devices and group them
            </p>
          </div>
          <button
            className="bg-white rounded-full text-lg w-10 h-10 flex items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow p-7 overflow-y-auto">
          {/* Group Name Input */}
          <div className="space-y-2 w-full">
            <h2 className="pl-1 text-[#091E42] text-sm font-medium">
              Name of Group
            </h2>
            <Input
              name="title"
              inputClassName="border p-3 bg-[#F5F6F7] rounded-[12px] placeholder:text-left placeholder:align-top"
              placeholder="Enter group name"
            />
          </div>

          {/* List of Devices */}
          <div className="my-10">
            <h2 className="text-[#091E42] text-sm font-medium my-3">
              List of Devices
            </h2>
            <div className="border p-2 rounded-lg flex flex-col gap-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="border px-2 py-5 rounded-lg flex gap-3 items-center"
                >
                  <input
                    type="checkbox"
                    name="device"
                    className="border accent-ca-blue border-[#575757] h-[19px] w-[19px]"
                  />
                  <img
                    src="/assets/graphics/deviceImage.svg"
                    className="rounded-full w-8 h-8 object-contain"
                  />
                  <p className="text-[#091E42] font-poppins text-sm font-medium">
                    Air Fryer
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Devices */}
          <div>
            <h2 className="text-[#091E42] text-sm font-medium my-3">
              Selected Devices
            </h2>
            <div className="border p-2 rounded-lg flex flex-col gap-3">
              {[...Array(1)].map((_, index) => (
                <div
                  key={index}
                  className="border px-2 py-5 rounded-lg flex gap-3 items-center"
                >
                  <input
                    type="checkbox"
                    name="selectedDevice"
                    className="border accent-ca-blue border-[#575757] h-[19px] w-[19px]"
                  />
                  <img
                    src="https://via.placeholder.com/10"
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <p className="text-[#091E42] font-poppins text-sm font-medium">
                    Air Fryer
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-7 bg-[#F5F6F7] flex justify-end gap-5">
          <Button
            onClick={() => setShowModal(false)}
            variant={"outline"}
            className="rounded-lg gap-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="rounded-lg gap-1">
            <span>Create</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDevicesModal;
