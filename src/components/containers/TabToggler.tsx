import { FC } from "react";

type Props = {
  tabs: string[];
  activeTab: string;
  onClick: (e: string) => void;
  variant?: "default" | "underline";
};

type tabProps = {
  text: string;
  isActive: boolean;
  onClick: (e: string) => void;
  variant: "default" | "underline";
};

const Tab: FC<tabProps> = ({ isActive, text, onClick, variant }) => {
  const activeStyleDefault =
    "bg-white text-[#344054] drop-shadow-sm px-1 md:px-0 rounded-[6px]";

  const activeUnderlineStyle = "border-b-2 border-blue-500 text-[#344054]";

  return (
    <div
      onClick={() => onClick(text)}
      className={`${
        isActive
          ? variant === "underline"
            ? activeUnderlineStyle
            : activeStyleDefault
          : " text-[#667085] "
      } font-[500] text-sm  min-w-[100px] flex-1 h-full text-center grid place-items-center  cursor-pointer`}
    >
      <span className="text-[10px] px-[2px]">{text.replace(/_/g, " ")}</span>
    </div>
  );
};

const TabToggler: FC<Props> = ({
  tabs,
  activeTab,
  onClick,
  variant = "default",
}) => {
  return (
    <div
      className={`  h-[46px] ${
        variant === "default" && "bg-[#F2F4F7] border"
      }  flex-center py-[6px] md:px-2 px-1 rounded-lg gap-2 `}
    >
      {tabs.map((item, i) => (
        <Tab
          variant={variant}
          onClick={onClick}
          isActive={activeTab === item}
          text={item}
          key={i}
        />
      ))}
    </div>
  );
};

export default TabToggler;
