import { Input, CountryRegionDropdown } from "@/components/ui";
import { OrgAddressSetupForm } from "@/types/general";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";

type Props = {
  formState: OrgAddressSetupForm;
  setFormState: React.Dispatch<React.SetStateAction<OrgAddressSetupForm>>;
};

const Address = ({ formState, setFormState }: Props) => {
  let countryData = Country.getAllCountries();

  const [country, setCountry] = useState({ label: "", value: "" });
  const [statesList, setStatesList] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setStatesList(
      State.getStatesOfCountry(country?.value).map((state) => ({
        label: state.name,
        value: state.isoCode,
      }))
    );
    setFormState((prev) => ({
      ...prev,
      cityOrProvince: { label: "", value: "" },
    }));
  }, [country]);

  return (
    <div>
      <div className="p-6 px-14 pt-14 bg-white my-10 pb-20 rounded-xl flex flex-col gap-y-6">
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
            value={formState.country}
            countryChange={(value) => {
              setCountry(value);
              setFormState((prev) => ({
                ...prev,
                country: value,
              }));
            }}
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
            value={formState.cityOrProvince}
            cityChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                cityOrProvince: value,
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
          value={formState.firstLineAddress}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              firstLineAddress: e.target.value,
            }))
          }
        />
        <Input
          name="zipCode"
          label="Zip Code"
          labelClassName="mb-4"
          inputClassName="bg-gray-100"
          placeholder="Enter zip code"
          value={formState.zipcode}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, zipcode: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default Address;
