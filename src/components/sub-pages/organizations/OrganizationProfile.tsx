import axiosInstance from "@/api/axiosInstance";
import { RootState } from "@/app/store";
import { AccountSetupScribbleRight } from "@/assets/icons";
import FlyoutSidebar from "@/components/reusables/FlyoutSidebar";
import {
  Button,
  CountryRegionDropdown,
  //   Dropdown,
  Input,
} from "@/components/ui";
import TextArea from "@/components/ui/TextArea";
import { setUser } from "@/features/userSlice";
import { cn, formatDate } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const OrganizationProfile = (_: Props) => {
  const dispatch = useDispatch();
  let countryData = Country.getAllCountries();

  const userData = useSelector((state: RootState) => state.user.user);
  const [showEditModal, setShowEditModal] = useState(false);

  //   const [country, setCountry] = useState({ label: "", value: "" });
  const [statesList, setStatesList] = useState<
    { label: string; value: string }[]
  >([]);

  const [formState, setFormState] = useState({
    address: {
      country: {
        label: userData?.address.country ?? "",
        value: userData?.address.country ?? "",
      },
      cityOrProvince: {
        label: userData?.address.cityOrProvince ?? "",
        value: userData?.address.cityOrProvince ?? "",
      },
      firstLineAddress: userData?.address.firstLineAddress ?? "",
      zipcode: userData?.address.zipcode ?? "",
    },
    bio: userData?.bio ?? "",
    contactEmail: userData?.contactEmail ?? "",
    contactName: userData?.contactName ?? "",
  });

  const editProfileMutation = useMutation({
    mutationKey: ["Edit profile"],
    mutationFn: () =>
      axiosInstance.patch("/users/me/profile", {
        address: {
          country: formState.address.country.label,
          cityOrProvince: formState.address.cityOrProvince.label,
          firstLineAddress: formState.address.firstLineAddress,
          zipcode: formState.address.zipcode,
        },
        bio: formState.bio,
        contactEmail: formState.contactEmail,
        contactName: formState.contactName,
      }),
    onSuccess: (data) => {
      dispatch(setUser(data.data.data));
      toast.success("Profile information updated successfully.");
      setShowEditModal(false);
    },
    onError: () => {
      toast.error("Error updating profile information.");
    },
  });

  const uploadDpMutation = useMutation({
    mutationKey: ["Edit profile"],
    mutationFn: (formData: FormData) =>
      axiosInstance.post("/users/me/profile/dp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (data) => {
      console.log(data);
      dispatch(setUser(data.data.data));
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

  useEffect(() => {
    setStatesList(
      State.getStatesOfCountry(formState.address.country?.value).map(
        (state) => ({
          label: state.name,
          value: state.name,
        })
      )
    );

    if (formState.address.country.label !== userData?.address.country) {
      setFormState((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          cityOrProvince: { label: "", value: "" },
        },
      }));
    }
  }, [formState.address.country]);

  {
    console.log(formState.address.cityOrProvince);
  }
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
                src={userData?.dp ? userData.dp : "/assets/icons/img-icon.svg"}
                alt="icon"
                className={cn(userData?.dp && "w-full h-full object-cover")}
              />
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
            <p className="font-poppins font-semibold text-lg">
              {userData?.name}
            </p>
            <p className="font-poppins text-sm">{userData?.email}</p>
          </div>
          <Button
            onClick={() => setShowEditModal(true)}
            className="font-poppins"
          >
            Edit Profile
          </Button>
        </div>

        {/* bio */}
        <div className="mt-10 pb-6 border-b border-grey-swatch-400">
          <p className="font-poppins font-medium text-lg text-main">
            Professional Bio
          </p>
          <p className="font-poppins text-sm mt-6">{userData?.bio}</p>
        </div>

        {/* bio data */}
        <div className="mt-10 pb-6 border-b border-grey-swatch-400">
          <p className="font-poppins font-medium text-lg text-main">Bio Data</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
            <div>
              <p className="text-ca-blue font-poppins">Contact Name</p>
              <p className="text-main font-poppins mt-1">
                {userData?.contactName}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Contact Email</p>
              <p className="text-main font-poppins mt-1">
                {userData?.contactEmail}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">
                {userData?.dateFormed ? "Date of Formation" : "Account Created"}
              </p>

              <p className="text-main font-poppins mt-1">
                {formatDate(userData?.dateFormed ?? userData?.createdAt ?? "")}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Phone Number</p>
              <p className="text-main font-poppins mt-1">
                {userData?.phoneNos}
              </p>
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
                {userData?.address.country}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">City/Province/State</p>
              <p className="text-main font-poppins mt-1">
                {userData?.address.cityOrProvince}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Zip Code</p>
              <p className="text-main font-poppins mt-1">
                {userData?.address.zipcode}
              </p>
            </div>
            <div>
              <p className="text-ca-blue font-poppins">Full Address</p>
              <p className="text-main font-poppins mt-1">
                {userData?.address.firstLineAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* edit sidebar */}
      <FlyoutSidebar isOpen={showEditModal} onOpenChange={setShowEditModal}>
        <div className="font-poppins relative h-full">
          <div className="px-2 sm:px-6 min-h-screen">
            <div>
              <p className="font-semibold text-2xl text-black-main">
                Edit Profile
              </p>
              <p className="text-gray-500 mt-1">
                Update your profile information
              </p>
            </div>
            <div className="px-2 my-6 mb-0 rounded-xl flex flex-col gap-y-2">
              {/* Bio section */}
              <p className="my-6 mt-0 mb-2 font-medium text-main text-lg">
                Bio
              </p>
              <TextArea
                name="bio"
                labelClassName="mb-2 text-[#000000]"
                inputClassName="bg-gray-100 min-h-20"
                placeholder=""
                value={formState.bio}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
              />
            </div>

            <div className="px-2 my-10 rounded-xl flex flex-col gap-y-4">
              {/* Contact Information */}
              <p className="mb-2 font-medium text-main text-lg">
                Contact Information
              </p>
              <Input
                name="contactName"
                label="Contact Name"
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                placeholder="Enter name"
                value={formState.contactName}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    contactName: e.target.value,
                  }))
                }
              />
              <Input
                name="contactEmail"
                label="Contact Email"
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                placeholder="Enter email"
                value={formState.contactEmail}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    contactEmail: e.target.value,
                  }))
                }
              />
            </div>

            <div className="px-2 my-10 pb-10 rounded-xl flex flex-col gap-y-4">
              {/* Address section */}
              <p className=" mb-2 font-medium text-main text-lg">Address</p>
              <div>
                <CountryRegionDropdown
                  name="countryOfResidence"
                  labelClassName="mb-4 text-[#000000_!important]"
                  options={countryData.map((country) => ({
                    label: country.name,
                    value: country.isoCode,
                    prefixIcon: country.flag,
                  }))}
                  searchable={true}
                  label="Country of Residence"
                  wrapperClassName="bg-gray-100 w-full"
                  placeholder="Select country"
                  value={formState.address.country}
                  cityChange={(value) =>
                    setFormState((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        country: value,
                      },
                    }))
                  }
                />
              </div>

              <div>
                <CountryRegionDropdown
                  name="city/province"
                  labelClassName="mb-4 text-[#000000_!important]"
                  options={statesList}
                  searchable={true}
                  label="City/Province"
                  wrapperClassName="bg-gray-100 w-full"
                  placeholder="Select city/province"
                  value={formState.address.cityOrProvince}
                  cityChange={(value) =>
                    setFormState((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        cityOrProvince: value,
                      },
                    }))
                  }
                />
              </div>
              <Input
                name="lineOfAddress"
                label="First Line of Address"
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                placeholder="Enter address"
                value={formState.address.firstLineAddress}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      firstLineAddress: e.target.value,
                    },
                  }))
                }
              />
              <Input
                name="zipCode"
                label="Zip Code"
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                placeholder="Enter zip code"
                value={formState.address.zipcode}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      zipcode: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
          <div className="sticky bottom-0 mt-20 bg-white left-0 p-4 flex justify-around gap-2 flex-wrap font-poppins border w-full border-t-black-main/50 z-50">
            <Button
              onClick={() => {
                editProfileMutation.mutate();
              }}
              className="text-white w-full min-w-[120px]"
            >
              {editProfileMutation.isPending ? (
                <Oval
                  visible={editProfileMutation.isPending}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span>Save changes</span>
              )}
            </Button>
          </div>
        </div>
      </FlyoutSidebar>
    </div>
  );
};

export default OrganizationProfile;
