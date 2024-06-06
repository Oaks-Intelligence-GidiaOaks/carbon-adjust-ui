import { IoArrowBack } from "react-icons/io5";

import ProductCard from "@/components/reusables/ProductCard";
import { Input } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";

type Props = {};

const NewPackage = (_: Props) => {
  return (
    <div>
      <div className="flex-center gap-2">
        <IoArrowBack color="#333333" />

        <h2 className="text-[#333333] font-[600] text-lg">
          Create new package
        </h2>
      </div>

      <div className="flex items-start mt-[28px]">
        <div className=" flex-[0.7] flex flex-col gap-[20px] bg-white px-6 text-[#575757] text-sm font-[400] ">
          {/* image upload */}
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[#575757] font-[400] text-xs ">
              Package attachment
            </h2>

            <div className="h-[150px] flex  flex-col  items-center justify-center gap-[] w-full border border-dotted ">
              <div className="h-[42px] w-[42px] rounded-full bg-[#F2F4F7] grid place-items-center">
                <img src="/assets/icons/upload-cloud.svg" alt="" />
              </div>

              <h2 className="font-[400] text-sm mt-[20px] text-center text-[#333333]">
                Click to Upload your image or Video
              </h2>

              <h4 className="text-[#828282] mt-1 font-[400] text-sm">
                or drag and drop
              </h4>
            </div>
          </div>

          <Input
            name=""
            label="Package ID"
            labelClassName="pb-[10px]"
            inputClassName="border p-3 bg-[#E4E7E8]"
            placeholder="Window Retrofitting"
          />

          <Input
            name=""
            label="Package Desription"
            labelClassName="pb-[10px]"
            inputClassName="border p-3 bg-[#E4E7E8] h-[100px] rounded-[12px] placeholder:text-left placeholder:align-top"
            placeholder="Write a brief Description of the Package"
          />

          <SelectInput
            options={[
              { label: "Home Energy Plans", value: "" },
              { label: "Home Energy Plans", value: "" },
              { label: "Home Energy Plans", value: "" },
            ]}
            className=""
            label="category"
            onChange={() => {}}
            placeholder="Select Category"
          />

          <SelectInput
            options={[
              { label: "Home Energy Plans", value: "" },
              { label: "Home Energy Plans", value: "" },
              { label: "Home Energy Plans", value: "" },
            ]}
            className=""
            label="Services/Products"
            onChange={() => {}}
            placeholder="Select specific service"
          />

          <div className="flex-center gap-[11px]">
            <input
              type="checkbox"
              name=""
              id=""
              className="border border-[#575757] h-[19px] w-[19px] "
            />

            <p>Purchasers should ask for a quote</p>
          </div>

          {/* optional content starts here */}
          <div className="flex-center">
            <div className="w-1/2 pr-[20px]">
              <Input
                name=""
                label="Price"
                labelClassName="pb-[10px]"
                inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                placeholder="$80"
              />
            </div>

            <div className="w-1/2">
              <Input
                name=""
                label="Discount"
                labelClassName="pb-[10px]"
                inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                placeholder="Enter %"
              />
            </div>
          </div>

          <Input
            name=""
            label="Country"
            labelClassName="pb-[10px]"
            inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
            placeholder="United Kingdom"
          />
          <Input
            name=""
            label="City"
            labelClassName="pb-[10px]"
            inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
            placeholder="London"
          />

          {/* optional checkbox */}
          <div className="flex-center gap-[11px]">
            <input
              type="checkbox"
              name=""
              id=""
              className="border border-[#575757] h-[19px] w-[19px] "
            />

            <p>Schedule Availability</p>
          </div>

          <div className="flex-center gap-[11px]">
            <input
              type="checkbox"
              name=""
              id=""
              className="border border-[#575757] h-[19px] w-[19px] "
            />

            <p>Additional Questions</p>
          </div>

          <button className="blue-gradient rounded-[12px] h-[46px]  text-[#F8F9FA] font-[500] text-sm text-center ">
            <span>Create</span>
          </button>
        </div>

        <div className="flex-[0.3] lg:px-[20px] xl:px-[40px] ">
          <h2 className="text-sm font-[600] ">Previously created packages</h2>

          <div className="mt-[19px] flex flex-col gap-[20px]">
            {Array.from({ length: 3 }, (_) => (
              <ProductCard
                cost="$24.99
        $400.00"
                image="/assets/graphics/paste-img.svg"
                name="Solar installation"
                rating={2}
                discount=""
                isHot={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPackage;
