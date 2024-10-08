import { GrantPkgIcon, RegularPkgIcon } from "@/assets/icons";
import { IComponentNestedMap } from "@/types/general";
import Modal from "./Modal";
import { Dispatch, SetStateAction, useRef } from "react";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { Link } from "react-router-dom";

const PackageTypeCard = (props: { type: "Regular" | "Grant" }) => {
  const detailsMap: IComponentNestedMap = {
    Regular: {
      Icon: <RegularPkgIcon />,
      header: "Regular Package",
      lead: "Create regular package",
    },
    Grant: {
      Icon: <GrantPkgIcon />,
      header: "Grant Management Package",
      lead: "Create grants for homeowners",
    },
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center gap-3 px-6 h-[289px] w-[250px] text-center cursor-pointer shadow-md shrink-0 flex-grow-0">
      {detailsMap[props.type].Icon}

      <h2 className="font-[500] text-base">{detailsMap[props.type].header}</h2>

      <p className="font-[400] text-xs text-[#575757]">
        {detailsMap[props.type].lead}
      </p>
    </div>
  );
};

const ChoosePackageType = (props: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useRef(null);
  useOutsideCloser(ref, props.showModal, props.setShowModal);

  return (
    <Modal>
      <div
        ref={ref}
        className="flex flex-col items-center justify-center bg-[#F9FCFD] gap-6 py-16 px-10"
      >
        <h2 className="text-[#141516] font-[500] text-lg tracking-tight">
          Choose Package
        </h2>

        <div className="flex items-start gap-5">
          <Link to="/merchant/packages/new">
            <PackageTypeCard type="Regular" key={1} />
          </Link>

          <Link to="/merchant/grant-packages/new">
            <PackageTypeCard type="Grant" key={2} />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ChoosePackageType;
