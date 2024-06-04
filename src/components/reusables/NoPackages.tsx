import { FC } from "react";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";

type Props = {
  route: string;
};

const NoPackages: FC<Props> = ({ route }) => {
  const navigate = useNavigate();

  return (
    <div className="grid place-items-center h-[80vh] text-xs font-poppins">
      <div className=" text-center">
        <img
          src="/assets/graphics/no-pkg-img.svg"
          className=""
          alt="carbon adjust img"
        />

        <p className="my-[30px] text-[#575757] font-[600] text-[20px]">
          No Packages
        </p>

        <p className="text-[575757]">You have no package created yet</p>

        <Button
          onClick={() => navigate(route)}
          className="text-center mt-[30px]"
        >
          <span className="text-white text-xs">Create Package</span>
        </Button>
      </div>
    </div>
  );
};

export default NoPackages;
