import { useState } from "react";
import Modal from "@/components/dialogs/Modal";
import { Button } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import { AllUnits } from "@/services/organisation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { groupDevices } from "@/services/homeOwner";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

type GroupDevicesModalProps = {
  setShowModal: (value: boolean) => void;
  devices: any;
};

const GroupDevicesModal = ({
  setShowModal,
  devices
}: GroupDevicesModalProps) => {

  const initialState: any = {
  unitId:"",
  };

  const [formData, setFormData] = useState(initialState);

  const { data: units } = useQuery({
    queryKey: ["get units"],
    queryFn: AllUnits,
  });

  const [selectedDevices, setSelectedDevices] = useState<
    { id: string}[]
  >([]);

  // Add device to selectedDevices
  const handleSelectDevice = (device: { id: string }) => {
    if (!selectedDevices.some((d) => d.id === device.id)) {
      setSelectedDevices((prev) => [...prev, device]);
    }
  };

  const GroupDevice = useMutation({
    mutationKey: ["group-device"],
    mutationFn: () => {
      const payload = {
        unitId: formData.unitId?.value,
        deviceIds: selectedDevices.map((device) => device.id), 
      };
  
      return groupDevices(payload);
    },
    onSuccess: (sx: any) => {
      setShowModal(false);
      toast.success(sx.message);
    },
    onError: (ex: any) => {
      toast.error(ex.response?.data?.message || "An error occurred");
    },
  });
  

  // Remove device from selectedDevices
  // const handleDeleteDevice = (id: string) => {
  //   setSelectedDevices((prev) => prev.filter((device) => device.id !== id));
  // };
  const handleSelectInputChange = (e: any, fieldName: string) => {
    setFormData((prev:any) => ({
      ...prev,
      [fieldName]: e,
    }));
  };
   
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
            <h2 className="pl-1 text-[#091E42] text-sm font-medium">Unit</h2>
            <SelectInput
              options={units?.data?.unit.map(
                (cat: { name: string; _id: string }) => ({
                  label: cat.name,
                  value: cat._id,
                })
              )}
              value={formData.unitId}
              onChange={(e) =>
                handleSelectInputChange(e, "unitId")
              }
            />
          </div>

          {/* List of Devices */}
          <div className="my-10">
            <h2 className="text-[#091E42] text-sm font-medium my-3">
              List of Devices
            </h2>
            <div className="border p-2 rounded-lg flex flex-col gap-3">
              {devices?.data?.devices.map((device:any) => (
                <div
                  key={device._id}
                  className="border px-2 py-5 rounded-lg flex gap-3 items-center"
                >
                  <input
                    type="checkbox"
                    name="device"
                    className="border accent-ca-blue border-[#575757] h-[19px] w-[19px]"
                    onClick={() =>
                      handleSelectDevice({
                        id: device._id 
                      })
                    }
                  />
                  <img
                    src={device.file}
                    className="rounded-full w-8 h-8 object-contain"
                  />
                  <p className="text-[#091E42] font-poppins text-sm font-medium">
                     {device.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Devices */}
          {/* <div>
            <h2 className="text-[#091E42] text-sm font-medium my-3">
              Selected Devices
            </h2>
            <div className="border p-2 rounded-lg flex flex-col gap-3">
              {selectedDevices.map((device) => (
                <div
                  key={device.id}
                  className="border px-2 py-5 rounded-lg flex justify-between items-center"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://via.placeholder.com/10"
                      className="rounded-full w-8 h-8 object-cover"
                    />
                    <p className="text-[#091E42] font-poppins text-sm font-medium">
                      {device.name}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteDevice(device.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div> */}
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
          <Button className="rounded-lg gap-1" onClick={()=> GroupDevice.mutate()}>
          {GroupDevice.isPending ? (
              <Oval height={"15"} color="white" />
            ) : (
              <span className="text-center">Create</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDevicesModal;
