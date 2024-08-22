import { Dispatch, SetStateAction, useRef } from "react";
import Modal from "./Modal";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { Button } from "../ui";
import { Oval } from "react-loader-spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser } from "@/services/adminService";

const DeleteUserModal = (props: {
  rowId: string;
  showUDeleteModal: boolean;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const ref = useRef(null);
  useOutsideCloser(ref, props.showUDeleteModal, props.setShowDeleteModal);

  const deleteMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted succesfully");
      queryClient.invalidateQueries({ queryKey: ["users-registration"] });
    },
    onError: () => {
      toast.error("Error deleting user");
    },
  });

  const handleSubmit = () => {
    deleteMutation.mutate(props.rowId);
  };

  return (
    <Modal>
      <div
        ref={ref}
        className="w-[95%] sm:w-1/2 max-w-[513px] min-w-[240px] h-[clamp(400px,50%,688px)] flex flex-col gap-4 bg-white shadow-lg rounded-xl overflow-scroll p-2 lg:px-5"
      >
        <h2 className="text-center font-[600] text-base text-gray-800 pt-3">
          Deleting this Account will remove all resources relating to this user
        </h2>

        <h2 className="text-center">Are you sure you want to proceed?</h2>

        <Button
          onClick={handleSubmit}
          isLoading={deleteMutation.isPending}
          variant={"destructive"}
          className="grid place-items-center mt-4"
        >
          {deleteMutation.isPending ? (
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
          onClick={() => props.setShowDeleteModal(false)}
          variant={"default"}
          className="grid place-items-center mt-4"
        >
          <span className="text-center ">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
