import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FlyoutSidebar from "../reusables/FlyoutSidebar";
import { Button, CountryRegionDropdown, Input } from "../ui";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Country, State } from "country-state-city";
// import { setUser } from "@/features/userSlice";
import toast from "react-hot-toast";
import { updateUserProfile } from "@/services/homeOwner";
import { Oval } from "react-loader-spinner";

const EditProfileModal = (props: {
  showEditModal: boolean;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const { user: userData } = useSelector((state: RootState) => state.user);
  let countryData = Country.getAllCountries();

  const [statesList, setStatesList] = useState<
    { label: string; value: string }[]
  >([]);

  const [formState, setFormState] = useState({
    address: {
      country: {
        label: userData?.address?.country ?? "",
        value: userData?.address?.country ?? "",
      },
      cityOrProvince: {
        label: userData?.address?.cityOrProvince ?? "",
        value: userData?.address?.cityOrProvince ?? "",
      },
      firstLineAddress: userData?.address?.firstLineAddress ?? "",
      zipcode: userData?.address?.zipcode ?? "",
    },
    bio: userData?.bio ?? "",
    email: userData?.email ?? "",
    name: userData?.name ?? "",
  });

  useEffect(() => {
    setStatesList(
      State.getStatesOfCountry(formState.address.country?.value).map(
        (state) => ({
          label: state.name,
          value: state.name,
        })
      )
    );

    if (formState.address?.country.label !== userData?.address?.country) {
      setFormState((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          cityOrProvince: { label: "", value: "" },
        },
      }));
    }
  }, [formState.address.country]);

  // const dispatch = useDispatch();

  const editProfileMutation = useMutation({
    mutationKey: ["Edit profile"],
    mutationFn: (profileData: any) => updateUserProfile(profileData),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
      toast.success("Profile information updated successfully.");
      props.setShowEditModal(false);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  const handleUpdateProfile = () => {
    const iData = {
      ...formState,
      address: {
        cityOrProvince: formState.address.cityOrProvince.value,
        country: formState.address.country.value,
        firstLineAddress: formState.address.firstLineAddress,
        zipcode: formState.address.zipcode,
      },
    };

    editProfileMutation.mutateAsync(iData);
  };

  const handleInputChange = (val: string, field: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: val,
    }));
  };

  return (
    <FlyoutSidebar
      isOpen={props.showEditModal}
      onOpenChange={props.setShowEditModal}
    >
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

          <div className="px-2 my-10 rounded-xl flex flex-col gap-y-4">
            {/* Contact Information */}
            <p className="mb-2 font-medium text-main text-lg">
              Personal Information
            </p>

            <Input
              name="name"
              label="Contact Name"
              labelClassName="mb-4"
              inputClassName="bg-gray-100"
              placeholder="Enter name"
              value={formState.name}
              onChange={(e) => handleInputChange(e.target.value, "name")}
            />

            <Input
              name="contactEmail"
              label="Contact Email"
              disabled
              labelClassName="mb-4"
              inputClassName="bg-gray-100"
              placeholder="Enter email"
              value={formState.email}
              onChange={(e) => handleInputChange(e.target.value, "email")}
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
              onChange={(e) => {
                setFormState((prevState) => ({
                  ...prevState,
                  address: {
                    ...prevState.address,
                    firstLineAddress: e.target.value,
                  },
                }));
              }}
            />

            <Input
              name="zipCode"
              label="Zip Code"
              labelClassName="mb-4"
              inputClassName="bg-gray-100"
              placeholder="Enter zip code"
              value={formState.address.zipcode}
              onChange={(e) => {
                setFormState((prevState) => ({
                  ...prevState,
                  address: {
                    ...prevState.address,
                    zipcode: e.target.value,
                  },
                }));
              }}
            />
          </div>
        </div>

        <div className="sticky bottom-0 mt-20 bg-white left-0 p-4 flex justify-around gap-2 flex-wrap font-poppins border w-full border-t-black-main/50 z-50">
          <Button
            disabled={editProfileMutation.isPending}
            onClick={handleUpdateProfile}
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
  );
};

export default EditProfileModal;
