import { useRef } from "react";
import { Button } from "../ui";
import Modal from "./Modal";
import { DState } from "@/types/general";
import { useModalCloser } from "@/hooks/useModalCloser";
import { useDispatch } from "react-redux";
import { deviceChanged } from "@/features/assetSlice";

type Action = {
  text: string;
  onClick: () => void;
  actionType?: "destructive" | "outline" | "secondary" | "default";
  isLoading?: boolean;
};

const DeviceDialog = (props: {
  headerText: string;
  leadText: string;
  actions: Action[];
  deviceId: DState;
}) => {
  const dispatch = useDispatch();
  const dialogRef = useRef<null | HTMLDivElement>(null);

  const closeModal = () => {
    dispatch(deviceChanged({}));
  };

  useModalCloser(dialogRef, props.deviceId, closeModal);

  return (
    <Modal>
      <div
        ref={dialogRef}
        className="bg-white max-w-[440px] rounded-[12px] px-8 py-10 flex flex-col items-center text-center"
      >
        <h3 className="text-[#333333] font-[600] text-[20px]">
          {props.headerText}
        </h3>

        <p className="text-[#575757] font-[400] text-base text-center mt-2">
          {props.leadText}
        </p>

        <div className="flex-center justify-center gap-2 mt-10 w-full">
          {Array.from(props.actions, (it, i) => (
            <Button
              {...it}
              disabled={Boolean(it.isLoading)}
              key={i}
              className="flex-[0.5] "
              variant={it.actionType || "default"}
              onClick={it.onClick}
            >
              <span>{it.text}</span>
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default DeviceDialog;
