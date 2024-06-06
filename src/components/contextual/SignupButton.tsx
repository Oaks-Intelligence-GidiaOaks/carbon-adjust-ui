import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";

const SignupButton = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn" aria-label="Select sign up type">
          Sign up
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] font-poppins bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={() => navigate("/register")}
            className="group py-1 cursor-pointer text-[13px] text-ca-blue leading-none rounded-[3px] flex items-center h-8 px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-grey-swatch-300 data-[highlighted]:text-ca-blue"
          >
            As a Home Occupant
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => navigate("/merchant/register")}
            className="group py-1 cursor-pointer text-[13px] text-ca-blue leading-none rounded-[3px] flex items-center h-8 px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-grey-swatch-300 data-[highlighted]:text-ca-blue"
          >
            As a Merchant
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SignupButton;
