import { IoCloseOutline } from "react-icons/io5";
import Search from "../ui/Search";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "../ui";
import Modal from "./Modal";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { IComponentMap } from "@/types/general";
import SendInvite from "../reusables/SendInvite";
import { useQuery } from "@tanstack/react-query";
import { getUserByRole } from "@/services/merchant";
import { UserRole } from "@/interfaces/user.interface";
import Loading from "../reusables/Loading";
import { RxAvatar } from "react-icons/rx";

// component types
type merchant = { name: string; email: string; _id: string };
type merchants = Array<merchant>;

const AddMerchantModal = (props: {
  addSubUsers: (arg: merchants) => void;
  merchants: merchants;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeChild, setActiveChild] = useState<
    "InviteMerchant" | "SendInvite"
  >("InviteMerchant");

  const [selectedMerchants, setSelectedMerchants] = useState(props.merchants);

  const ref = useRef(null);

  const params = useMemo(
    () => ({
      page: 1,
      limit: 5,
      role: UserRole.MERCHANT,
    }),
    []
  );

  const {
    data: merchantsData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["get-merchants"],
    queryFn: () => getUserByRole(params),
  });

  // component actions
  const fetchedMerchants: Array<{ name: string; email: string; _id: string }> =
    isSuccess
      ? merchantsData.data.users.map((it: any) => ({
          name: it.name,
          email: it.email,
          _id: it._id,
        }))
      : [];

  const selectMerchant = (dt: merchant) => {
    const isSelectedIndex = selectedMerchants.findIndex(
      (it) => it._id === dt._id
    );

    if (isSelectedIndex !== -1) {
      setSelectedMerchants((prev) =>
        prev.filter((_, index) => index !== isSelectedIndex)
      );
    } else {
      setSelectedMerchants((prev) => [...prev, dt]);
    }
  };

  const isuserSelected = (userId: string) => {
    return selectedMerchants.find((mc) => mc._id === userId) !== undefined;
  };

  const MerchantListTile = (prop: {
    _id: string;
    name: string;
    email: string;
    selected?: boolean;
  }) => {
    const { selected, ...rest } = prop;

    return (
      <div
        onClick={() => selectMerchant(rest)}
        className="border flex-center cursor-pointer justify-between rounded-lg p-3"
      >
        <div className="flex-center gap-2">
          <RxAvatar size={28} />
          {/* <img src="" alt="" className="rounded-full h-8 w-8 " /> */}
          <span className="text-xs text-[#091E42]">{prop?.name}</span>
        </div>

        {prop.selected ? (
          <FaCheckCircle size={16} color="#139EEC" />
        ) : (
          <div className="h-4 w-4 rounded-full border" />
        )}
      </div>
    );
  };

  const InviteMerchant = () => {
    return (
      <>
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-scroll scrollbar-hide border p-2 rounded-lg">
          {Array.from(fetchedMerchants, (it, i) => (
            <MerchantListTile
              {...it}
              selected={isuserSelected(it._id)}
              key={i}
            />
          ))}
        </div>

        <div className="w-fit ml-auto flex-center gap-2">
          <Button
            onClick={() => props.setShowModal(false)}
            variant={"outline"}
            className=""
          >
            Cancel
          </Button>

          <Button
            onClick={() => props.addSubUsers(selectedMerchants)}
            className=""
          >
            Add
          </Button>
        </div>
      </>
    );
  };

  const activeComponent: IComponentMap = {
    InviteMerchant: <InviteMerchant />,
    SendInvite: (
      <SendInvite type="merchant" setShowModal={props.setShowModal} />
    ),
    Loading: <Loading message="fetching merchants" />,
  };

  const toggleActiveChild = () => {
    if (activeChild === "InviteMerchant") {
      setActiveChild("SendInvite");
    } else {
      setActiveChild("InviteMerchant");
    }
  };

  useOutsideCloser(ref, props.showModal, props.setShowModal);

  return (
    <Modal>
      <div ref={ref} className="border shadow-md rounded-lg bg-white pb-5">
        <div className="flex items-start rounded-t-lg justify-between bg-[#F5F6F7] px-6 py-4 w-[397px]">
          <div className="flex flex-col">
            <h2 className="text-[#091E42] font-[700] text-lg">Add Merchant</h2>
            <h5 className="text-[#7A8699] font-[400] text-sm tracking-wide font-sans">
              Add staff to grant
            </h5>
          </div>

          <div
            onClick={() => props.setShowModal(false)}
            className="bg-white shadow-sm cursor-pointer h-8 w-8 rounded-full grid place-items-center"
          >
            <IoCloseOutline size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-6 py-4">
          <Search />

          <div className="flex-center gap-2 ">
            <input type="checkbox" name="" id="" onChange={toggleActiveChild} />
            <span className="font-[400] text-sm tracking-tight ">
              Add New Merchant
            </span>
          </div>

          {isLoading ? (
            <Loading message="fetching merchants" />
          ) : (
            activeComponent[activeChild]
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddMerchantModal;
