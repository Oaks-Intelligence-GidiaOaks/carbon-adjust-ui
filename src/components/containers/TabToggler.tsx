import { FC } from "react";

type Props = {
  tabs: string[];
  activeTab: string;
  onClick: (e: string) => void;
};

type tabProps = {
  text: string;
  isActive: boolean;
  onClick: (e: string) => void;
};

const Tab: FC<tabProps> = ({ isActive, text, onClick }) => {
  const activeStyle = "bg-white text-[#344054] drop-shadow-sm px-1 md:px-0";

  return (
    <div
      onClick={() => onClick(text)}
      className={`${
        isActive ? activeStyle : " text-[#667085] "
      } font-[500] text-sm  min-w-[100px] flex-1 h-full text-center grid place-items-center rounded-[6px] cursor-pointer`}
    >
      <span className="text-[10px] px-[2px]">{text.replace(/_/g, " ")}</span>
    </div>
  );
};

const TabToggler: FC<Props> = ({ tabs, activeTab, onClick }) => {
  return (
    <div className="border h-[46px] bg-[#F2F4F7] flex-center py-[6px] md:px-2 px-1 rounded-lg gap-2 ">
      {tabs.map((item, i) => (
        <Tab
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