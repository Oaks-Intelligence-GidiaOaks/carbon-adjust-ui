import Modal from "./Modal";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { Button } from "../ui";

const DeleteDeviceModal = ({
  cancel,
  deletee,
  isPending,
}: {
  deletee: () => void;
  cancel: Dispatch<SetStateAction<string | null>>;
  isPending: boolean;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref?.current && !ref.current.contains(event?.target as Node)) {
        cancel(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cancel]);

  return (
    <Modal>
      <div
        ref={ref}
        className="w-[95%] sm:w-1/2 max-w-[513px] min-w-[240px] flex flex-col gap-4 bg-white shadow-lg rounded-xl overflow-scroll p-6 py-8 lg:px-5"
      >
        <h2 className="text-center font-[600] text-base text-gray-800 pt-3">
          Deleting this device will remove all schedule related to this device
        </h2>

        <h2 className="text-center">Are you sure you want to proceed?</h2>

        <div className="flex-center gap-3">
          <Button
            disabled={isPending}
            onClick={() => deletee()}
            isLoading={false}
            variant={"destructive"}
            className="grid place-items-center mt-4 flex-1"
          >
            {isPending ? (
              <Oval
                visible={true}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span className="text-center ">Delete</span>
            )}
          </Button>

          <Button
            onClick={() => cancel(null)}
            variant={"default"}
            className="grid place-items-center mt-4 flex-1"
          >
            <span className="text-center ">Cancel</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDeviceModal;
