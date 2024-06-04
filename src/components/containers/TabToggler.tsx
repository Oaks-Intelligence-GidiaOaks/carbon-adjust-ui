import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  tabs: string[];
  activeTab: string;
  onClick: Dispatch<SetStateAction<string>>;
};

type tabProps = {
  text: string;
  isActive: boolean;
  onClick: (e: string) => void;
};

const Tab: FC<tabProps> = ({ isActive, text, onClick }) => {
  const activeStyle = "bg-white text-[#344054] drop-shadow-sm  ";

  return (
    <div
      onClick={() => onClick(text)}
      className={`${
        isActive ? activeStyle : " text-[#667085] "
      } font-[500] text-sm  min-w-[237px] h-full text-center grid place-items-center rounded-[6px] cursor-pointer`}
    >
      <span>{text}</span>
    </div>
  );
};

const TabToggler: FC<Props> = ({ tabs, activeTab, onClick }) => {
  return (
    <div className="border h-[56px] bg-[#F2F4F7] flex-center w-fit py-[6px] px-[17px] rounded-lg gap-2 ">
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
