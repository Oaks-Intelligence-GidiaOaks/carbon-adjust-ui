import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { GoDownload } from "react-icons/go";

const OrderCard: FC = () => {
  const ListTile = (props: { text: string; isBorder?: boolean }) => (
    <div
      className={`${
        props.isBorder && "border-l pl-[10px] border-[#4C5563]"
      } p-0 `}
    >
      <span className="text-xs p-0 font-[400] border-r text-[#4C5563]">
        {props.text}
      </span>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col font-inter">
        <div className="flex items-stretch ">
          <div className="px-4 bg-[#F3F5F7] h-[100px] grid place-items-center">
            <img
              src="/assets/graphics/user1.svg"
              alt=""
              className="h-[44px] w-[44px] rounded-full "
            />
          </div>

          <div className="flex flex-col justify-between pl-4">
            <h2 className="text-lg font-[600]">Andrew Griffins and Sons.</h2>

            <div className="flex-center gap-[10px]">
              {Array.from(
                [
                  "Applied Date: 02/05/2024",
                  "Window Retrofitting",
                  "United Kingdom",
                ],
                (it, i) => (
                  <ListTile text={it} key={it} isBorder={i !== 0} />
                )
              )}
            </div>

            <div className="flex-center gap-6">
              <span className="text-xs font-[400] border-r text-[#4C5563]">
                4.7k Homes Retrofitted | 2022
              </span>

              <div className="flex-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar size={13.94} key={i} color="#E99C1B" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[17px] ml-auto">
            <h2 className="text-sm font-[600] ">$250.28</h2>

            <button className="bg-[#257FCA] font-dm-sans rounded-[26px] h-[32px] w-[157px] grid place-items-center text-white font-[400] text-xs">
              <span>Proceed to pay</span>
            </button>
          </div>
        </div>

        <hr className="mt-[35px]" />

        <div className="flex-center gap-[] py-3 font-dm-sans text-sm text-[#A5A5A5]">
          <div className="flex-center gap-2">
            <div className="flex-center gap-3">
              <span className="blue-gradient inline-block bg-clip-text text-transparent font-[500]">
                Quote:{" "}
              </span>

              <span>12/05/2024 - 20:15 pm</span>
            </div>

            <img
              src="/assets/icons/check-mark.svg"
              className="h-4 w-4"
              alt=""
            />

            <GoDownload color="#575757" size={18} />
          </div>

          <div className="px-[10px] text-[#4C5563]">|</div>

          <div className="flex-center gap-2">
            <span className="font-[500] text-[#2B2A2A]">
              Payment: Undecided{" "}
            </span>

            <img
              src="/assets/icons/check-mark.svg"
              className="h-4 w-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
