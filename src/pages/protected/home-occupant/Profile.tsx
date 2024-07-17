import { AccountSetupScribbleRight } from "@/assets/icons";
import EditProfileModal from "@/components/containers/EditProfileModal";
import { Button } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { changeProfileDp, getMe } from "@/services/homeOwner";
import { cn } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Profile: FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-me"],
    queryFn: () => getMe(),
  });

  const uploadDpMutation = useMutation({
    mutationKey: ["Edit profile"],
    mutationFn: (formData: FormData) => changeProfileDp(formData),
    onSuccess: (_: any) => {
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
      toast.success("Profile picture updated successfully.");
      setShowEditModal(false);
    },
    onError: () => {
      toast.error("Error updating profile picture.");
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      return; // No file selected
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      e.target.files = null; // Reset file input
      return;
    }

    // Check if the file size exceeds 2MB
    if (file.size > 1 * 1024 * 1024) {
      toast.error("Please select an image file smaller than 1MB.");
      e.target.files = null; // Reset file input
      return;
    }

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
      uploadDpMutation.mutate(formData);
    } else {
      toast.error("You did not select an image.");
    }
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <Oval
          visible={true}
          height="20"
          width="20"
          color="#ffffff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  let user = isSuccess ? data.data : {};

  return (
    <div className="min-h-screen">
      {/* banner */}
      <div className="p-6 flex justify-center h-40 bg-gradient-to-r relative from-[hsla(224,76%,18%,1)] from-80% to-[hsla(224,76%,41%,1)]">
        <AccountSetupScribbleRight className="absolute bottom-0 right-0" />

        {/* avatar */}
        <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] shadow-xl rounded-full absolute left-[10vw] bottom-0 translate-y-1/2 border-white bg-white">
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />

          <label
            htmlFor="image"
            className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative rounded-full border bg-[#F2F2F2] grid place-items-center"
          >
            <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full flex justify-center items-center">
              <img
                src={user?.dp || "/assets/icons/img-icon.svg"}
                alt="icon"
                className={cn("w-full h-full object-cover")}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Oval
                  visible={false}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>

            <img
              src="/assets/icons/pen-icon.svg"
              alt="icon"
              className="absolute bottom-0 -right-1"
            />
          </label>
        </div>
      </div>

      <div className="sm:px-[10vw] pt-[80px] sm:pt-[100px]">
        {/* name */}
        <div className="flex flex-wrap gap-6 justify-between items-center pb-6 border-b border-grey-swatch-400">
          <div>
            <p className="font-poppins font-semibold text-lg">{user?.name}</p>
            <p className="font-poppins text-sm">{user?.email}</p>
          </div>

          <Button
            onClick={() => setShowEditModal(true)}
            className="font-poppins"
          >
            Edit Profile
          </Button>
        </div>

        {/* bio data */}
        <div className="mt-10 pb-6 border-b border-grey-swatch-400">
          <p className="font-poppins font-medium text-lg text-main">Bio Data</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
            <div>
              <p className="text-ca-blue font-poppins">Full Name</p>
              <p className="text-main font-poppins mt-1">{user?.name}</p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Email</p>
              <p className="text-main font-poppins mt-1">{user?.email}</p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Account Created</p>
              <p className="text-main font-poppins mt-1">
                {formatDate(user?.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Phone Number</p>
              <p className="text-main font-poppins mt-1">{user?.phoneNos}</p>
            </div>
          </div>
        </div>

        {/* address */}
        <div className="mt-10 pb-6 border-b border-grey-swatch-400">
          <p className="font-poppins font-medium text-lg text-main">Address</p>
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap-6 py-4">
            <div>
              <p className="text-ca-blue font-poppins">Country</p>
              <p className="text-main font-poppins mt-1">
                {user?.address?.country}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">City/Province/State</p>
              <p className="text-main font-poppins mt-1">
                {user?.address?.cityOrProvince}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Zip Code</p>
              <p className="text-main font-poppins mt-1">
                {user?.address?.zipcode}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Full Address</p>
              <p className="text-main font-poppins mt-1">
                {user?.address?.firstLineAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* edit sidebar */}
      <EditProfileModal
        // @ts-ignore
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
      />
    </div>
  );
};

export default Profile;
