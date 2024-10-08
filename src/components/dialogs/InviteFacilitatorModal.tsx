import { IoCloseOutline } from "react-icons/io5";
import Modal from "./Modal";
import SendInvite from "../reusables/SendInvite";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { Button } from "../ui";
import { FaCheckCircle } from "react-icons/fa";
import { UserRole } from "@/interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";
import { getUserByRole } from "@/services/merchant";
import { IComponentMap } from "@/types/general";
import Loading from "../reusables/Loading";
import Search from "../ui/Search";
import { RxAvatar } from "react-icons/rx";

// component types
type facilitator = { name: string; email: string; _id: string };
type facilitators = Array<facilitator>;

const InviteFacilitatorModal = (props: {
  addSubUsers: (arg: facilitators) => void;
  facilitators: facilitators;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useRef(null);
  const [selectedFacilitators, setSelectedFacilitators] = useState(
    props.facilitators
  );
  const [activeChild, setActiveChild] = useState<
    "InviteFacilitator" | "SendInvite"
  >("InviteFacilitator");

  const toggleActiveChild = () => {
    if (activeChild === "InviteFacilitator") {
      setActiveChild("SendInvite");
    } else {
      setActiveChild("InviteFacilitator");
    }
  };

  useOutsideCloser(ref, props.showModal, props.setShowModal);

  const params = useMemo(
    () => ({
      page: 1,
      limit: 5,
      role: UserRole.FACILITATOR,
    }),
    []
  );

  const {
    data: facilitatorData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["get-facilitators"],
    queryFn: () => getUserByRole(params),
  });

  const fetchedFaciltators: facilitators = isSuccess
    ? facilitatorData.data.users.map((it: facilitator) => ({
        name: it.name,
        email: it.email,
        _id: it._id,
      }))
    : [];

  const selectMerchant = (dt: facilitator) => {
    const isSelectedIndex = selectedFacilitators.findIndex(
      (it) => it._id === dt._id
    );

    if (isSelectedIndex !== -1) {
      setSelectedFacilitators((prev) =>
        prev.filter((_, index) => index !== isSelectedIndex)
      );
    } else {
      setSelectedFacilitators((prev) => [...prev, dt]);
    }
  };

  const isUserSelected = (userId: string) => {
    return selectedFacilitators.find((mc) => mc._id === userId) !== undefined;
  };

  const FacilitatorListTile = (prop: {
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

  const InviteFacilitator = () => {
    return (
      <>
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-scroll scrollbar-hide border p-2 rounded-lg">
          {Array.from(fetchedFaciltators, (it, i) => (
            <FacilitatorListTile
              {...it}
              selected={isUserSelected(it._id)}
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
            onClick={() => props.addSubUsers(selectedFacilitators)}
            className=""
          >
            Add
          </Button>
        </div>
      </>
    );
  };

  const activeComponent: IComponentMap = {
    InviteFacilitator: <InviteFacilitator />,
    SendInvite: (
      <SendInvite type="facilitator" setShowModal={props.setShowModal} />
    ),
  };

  return (
    <Modal>
      <div ref={ref} className="border shadow-md rounded-lg bg-white pb-5">
        <div className="flex items-start rounded-t-lg justify-between bg-[#F5F6F7] px-6 py-4 w-[397px]">
          <div className="flex flex-col">
            <h2 className="text-[#091E42] font-[700] text-lg">
              Invite Facilitator
            </h2>

            <h5 className="text-[#7A8699] font-[400] text-sm font-sans tracking-normal">
              Invite facilitator to your created package
            </h5>
          </div>

          <div
            onClick={() => props.setShowModal(false)}
            className="bg-white shadow-sm h-8 w-8 cursor-pointer rounded-full grid place-items-center"
          >
            <IoCloseOutline size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-6 py-4">
          <Search />

          <div className="flex-center gap-2 ">
            <input type="checkbox" name="" id="" onChange={toggleActiveChild} />
            <span className="font-[400] text-sm tracking-tight ">
              Add New Facilitator
            </span>
          </div>

          {isLoading ? (
            <Loading message="fetching facilitators" />
          ) : (
            activeComponent[activeChild]
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InviteFacilitatorModal;
