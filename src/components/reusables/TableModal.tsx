import { IconType } from "react-icons/lib";
import Backdrop from "./Backdrop";

const TableModal = (props: {
  Icon: IconType;
  iconColor: string;
  textOne: string;
  textTwo?: string;
  btnTextOne: string;
  btnTextTwo?: string;
  btnTextOneStyle?: string;
  btnTextOneAction: () => void;
  btnTextTwoAction?: () => void;
}) => {
  return (
    <Backdrop show setShow={() => {}}>
      <div className="flex flex-col items-center gap-6 border p-10 w-fit rounded-xl bg-white max-w-[440px]">
        <div
          className={`w-10 h-10 cursor-pointer grid place-items-center border rounded-full`}
        >
          <props.Icon color={props.iconColor} />
        </div>

        <h2 className={`text-[#333333] font-[600] text-lg w-fit`}>
          {props.textOne}
        </h2>

        <p className="text-[#575757] text-center">{props.textTwo}</p>

        <div className="flex-center w-full justify-center gap-3">
          <button
            className={
              props.btnTextOneStyle +
              " p-3 flex-1 min-w-[40px] py-2 rounded-lg border"
            }
          >
            <span>{props.btnTextOne}</span>
          </button>

          {props.btnTextTwo && (
            <button className="p-3 flex-1 min-w-[40px] text-white bg-[#EC2222] py-2 rounded-lg">
              <span>{props.btnTextTwo}</span>
            </button>
          )}
        </div>
      </div>
    </Backdrop>
  );
};

export default TableModal;
