import React, { Dispatch, SetStateAction, useRef } from "react";
import Modal from "./Modal";
import { Button } from "../ui";
import SelectInput from "../ui/SelectInput";
import { StaffRole } from "@/interfaces/user.interface";
// import { IUnit } from "@/interfaces/organisation.interface";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { useMutation } from "@tanstack/react-query";
import { AssignUnitAdmin } from "@/services/organisation";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const staffRoles = [
  { label: "UNIT ADMIN", value: StaffRole.UNIT_ADMIN },
  // { label: "SUB UNIT ADMIN", value: StaffRole.SUB_UNIT_ADMIN },
  
];

interface IAssignStaffRole {
  staffId: string;
  unit: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const AssignStaffRoleModal: React.FC<IAssignStaffRole> = ({
  staffId,
  unit,
  setShowModal,
  showModal,
}) => {
  // console.log(unitId, "unit id");
  // const queryClient = useQueryClient();

  // const { MakeunitAdmin } = useMutations();
  const ref = useRef<HTMLDivElement | null>(null);
  const initialState: any = {
    staffId: staffId,
    unitId: unit,
  };

  const makeAdmin = useMutation({
    mutationKey: ["create-x"],
    mutationFn: (initialState: FormData) => AssignUnitAdmin(initialState),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      setShowModal(false)
      // resetForm();

      // navigate(`/${type}/transport`);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  // const [formData, setFormData] = useState(initialState);

  useOutsideCloser(ref, showModal, setShowModal);

  // const handleAssignRole = (e: any) => {
  //   e.preventDefault();

  //   if (roleType === StaffRole.UNIT_ADMIN) {
  //     MakeunitAdmin.mutateAsync(
  //       { staffId, unitId },
  //       {
  //         onSuccess: (sx: any) => {
  //           toast.success(sx.message || `Staff Role Updated succesfully`);
  //           queryClient.invalidateQueries({ queryKey: ["get-admin-units"] });
  //           queryClient.invalidateQueries({ queryKey: ["get-admin-staff"] });
  //           setShowModal(false);
  //         },
  //         onError: (ex: any) => {
  //           toast.error(
  //             ex.response.data.message || "error updating staff role"
  //           );
  //         },
  //       }
  //     );
  //   }
  // };

  return (
    <Modal>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 font-kumbh">
        <div
          ref={ref}
          className="bg-white rounded-lg shadow-lg w-full mx-5 max-w-md p-8 animate-bounceIn"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Assign Role
          </h2>

          <form className="space-y-6" >
            {/* Assign Role */}
            <SelectInput
              label="Assign Role"
              //   @ts-ignore
              options={staffRoles}
              onChange={() => {}}
              className=""
            />

            {/* <SelectInput
              label="Sub-Unit"
              //   @ts-ignore
              options={staffRoles}
              className=""
            /> */}

            {/* Submit Button */}
       
            <Button
              disabled={makeAdmin.isPending}
              onClick={(e) => {
                e.preventDefault();
                makeAdmin.mutate(initialState);
              }}
              isLoading={false}
              className="w-full grid place-items-center mt-4 flex-1"
            >
              {makeAdmin.isPending ? (
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
                <span className="text-center ">Assign</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AssignStaffRoleModal;