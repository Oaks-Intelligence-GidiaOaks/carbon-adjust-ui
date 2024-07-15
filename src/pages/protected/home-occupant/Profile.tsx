import { RootState } from "@/app/store";
import { AccountSetupScribbleRight } from "@/assets/icons";
import FlyoutSidebar from "@/components/reusables/FlyoutSidebar";
// import UserProfile from "@/components/sub-pages/user/Profile";
import { Button, CountryRegionDropdown, Input } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { cn } from "@/utils";
import { FC, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

// type Props = {}

const Profile: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);

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
            onChange={() => {}}
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
            <p className="font-poppins font-semibold text-lg">{"emmanuel"}</p>
            <p className="font-poppins text-sm">{"email"}</p>
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
                {formatDate(user!.createdAt)}
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

            <div className="px-2 my-10 rounded-xl flex flex-col gap-y-4">
              {/* Contact Information */}
              <p className="mb-2 font-medium text-main text-lg">
                Personal Information
              </p>
              <Input
                name="contactName"
                label="Contact Name"
                disabled
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                placeholder="Enter name"
                value={"me"}
                onChange={(e) => console.log(e.target.value)}
              />
              <Input
                name="contactEmail"
                label="Contact Email"
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                disabled
                placeholder="Enter email"
                // value={formState.email}
                onChange={() => {}}
              />
            </div>

            <div className="px-2 my-10 pb-10 rounded-xl flex flex-col gap-y-4">
              {/* Address section */}
              <p className=" mb-2 font-medium text-main text-lg">Address</p>
              <div>
                <CountryRegionDropdown
                  name="countryOfResidence"
                  labelClassName="mb-4 text-[#000000_!important]"
                  options={[]}
                  searchable={true}
                  label="Country of Residence"
                  wrapperClassName="bg-gray-100 w-full"
                  placeholder="Select country"
                  // value={}
                  cityChange={() => {}}
                />
              </div>

              <div>
                <CountryRegionDropdown
                  name="city/province"
                  labelClassName="mb-4 text-[#000000_!important]"
                  options={[]}
                  searchable={true}
                  label="City/Province"
                  wrapperClassName="bg-gray-100 w-full"
                  placeholder="Select city/province"
                  // value={formState.address.cityOrProvince}
                  cityChange={() => {}}
                />
              </div>
              <Input
                name="lineOfAddress"
                label="First Line of Address"
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                placeholder="Enter address"
                // value={}
                onChange={() => {}}
              />

              <Input
                name="zipCode"
                label="Zip Code"
                labelClassName="mb-4"
                inputClassName="bg-gray-100"
                placeholder="Enter zip code"
                // value={}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="sticky bottom-0 mt-20 bg-white left-0 p-4 flex justify-around gap-2 flex-wrap font-poppins border w-full border-t-black-main/50 z-50">
            <Button
              onClick={() => {}}
              className="text-white w-full min-w-[120px]"
            >
              {/* {editProfileMutation.isPending ? (
                <Oval
                  visible={editProfileMutation.isPending}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : ( */}
              <span>Save changes</span>
              {/* )} */}
            </Button>
          </div>
        </div>
      </FlyoutSidebar>
    </div>
  );
};

export default Profile;
