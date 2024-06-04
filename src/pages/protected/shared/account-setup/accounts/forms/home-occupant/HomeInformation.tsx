import userService from "@/api/services/user";
import { Dropdown, Input } from "@/components/ui";
import Datepicker from "@/components/ui/DatePicker";
import { HomeInfoForm } from "@/types/general";
import { handleWheel } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";

type Props = {
  formState: HomeInfoForm | undefined;
  setFormState: React.Dispatch<React.SetStateAction<HomeInfoForm>> | undefined;
};

const HomeInformation = ({ formState, setFormState }: Props) => {
  const houseMetaData = useQuery({
    queryKey: ["fetch-home-metadata"],
    queryFn: userService().fetchHomeMetaData,
  });
  console.log(houseMetaData);
  return !houseMetaData.isLoading && houseMetaData.isSuccess ? (
    <>
      <div className="">
        <div className="p-6 px-14 pt-14 bg-white my-10 pb-20 rounded-xl flex flex-col gap-y-6">
          <div>
            <Dropdown
              name="houseType"
              labelClassName="mb-4 text-[#000000_!important]"
              options={houseMetaData.data.data.data.houseType.map(
                (houseType: string) => ({ label: houseType, value: houseType })
              )}
              label="House Type"
              wrapperClassName="bg-gray-100 w-full"
              placeholder="Select house type"
              value={formState!.houseType}
              onOptionChange={(value) =>
                setFormState!((prev) => ({
                  ...prev,
                  houseType: value,
                }))
              }
            />
          </div>
          <Datepicker
            name="yearOfConstruction"
            label="Year of Construction"
            labelClassName="mb-4"
            inputClassName="bg-gray-100"
            placeholder="Select year"
            dateValue={formState!.yearOfConstruction}
            onDateChange={(value: any) => {
              const dateString = value;
              setFormState!((prev) => ({
                ...prev,
                yearOfConstruction: new Date(dateString).toISOString(),
              }));
            }}
          />
          <div>
            <Dropdown
              name="Ownership Status"
              labelClassName="mb-4 text-[#000000_!important]"
              options={houseMetaData.data.data.data.ownershipStatus.map(
                (ownershipStatus: string) => ({
                  label: ownershipStatus,
                  value: ownershipStatus,
                })
              )}
              label="Ownership status"
              wrapperClassName="bg-gray-100 w-full"
              placeholder="Select ownership status"
              value={formState!.ownershipStatus}
              onOptionChange={(value) =>
                setFormState!((prev) => ({
                  ...prev,
                  ownershipStatus: value,
                }))
              }
            />
          </div>
          <Datepicker
            name="moveInDate"
            label="Move-in Date"
            labelClassName="mb-4"
            inputClassName="bg-gray-100"
            placeholder="Select move-in date"
            dateValue={formState!.moveInDate}
            onDateChange={(value: any) => {
              const dateString = value;
              setFormState!((prev) => ({
                ...prev,
                moveInDate: new Date(dateString).toISOString(),
              }));
            }}
          />
          <Input
            name="noOfRooms"
            label="Number of rooms"
            labelClassName="mb-4"
            inputClassName="bg-gray-100"
            placeholder=""
            onWheel={handleWheel}
            value={formState!.nosOfRoom}
            onChange={(e) =>
              setFormState!((prev) => {
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                return {
                  ...prev,
                  nosOfRoom: newValue,
                };
              })
            }
          />
          <Input
            name="noOfadults"
            label="Number of Occupants (Adults 16+)"
            labelClassName="mb-4"
            inputClassName="bg-gray-100"
            onWheel={handleWheel}
            value={formState!.nosOfOccupant.adult}
            onChange={(e) =>
              setFormState!((prev) => {
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                return {
                  ...prev,
                  nosOfOccupant: {
                    ...prev.nosOfOccupant,
                    adult: newValue,
                  },
                };
              })
            }
          />
          <Input
            name="noOfchildren"
            label="Number of Occupants (Children 0-15)"
            onWheel={handleWheel}
            labelClassName="mb-4"
            inputClassName="bg-gray-100"
            value={formState!.nosOfOccupant.children}
            onChange={(e) =>
              setFormState!((prev) => {
                const newValue = e.target.value.replace(/[^0-9]/g, "");
                return {
                  ...prev,
                  nosOfOccupant: {
                    ...prev.nosOfOccupant,
                    children: newValue,
                  },
                };
              })
            }
          />
        </div>
      </div>
    </>
  ) : (
    <div className="w-full pt-20 flex justify-center">
      <Oval
        visible={houseMetaData.isLoading}
        height="20"
        width="20"
        color="#ffffff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default HomeInformation;
