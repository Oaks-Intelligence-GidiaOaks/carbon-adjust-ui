import { LogoAndBrand } from "@/assets/icons";
import { Button } from "../../ui";
import { AccountActionHeaderProps } from "@/types/general";
import { cn } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const AccountActionHeader = ({
  action,
  actionTitle,
  className,
}: AccountActionHeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "flex justify-between px-4 md:px-14 py-3 w-full max-w-[1440px] sticky top-0 z-50",
        className
      )}
    >
      <LogoAndBrand
        className="cursor-pointer"
        onClick={() => {
          if (pathname.includes("login") || pathname.includes("register")) {
            navigate("/");
          }
        }}
      />
      {actionTitle?.toLowerCase() === "register" ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant={"tab"}
              className="rounded-none px-8 text-blue-main hover:bg-gray-200"
              aria-label="Select sign up type"
            >
              Register
            </Button>
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
      ) : (
        <Button
          onClick={() => {
            action && action();
          }}
          variant="tab"
          className="rounded-none px-8 text-blue-main hover:bg-gray-200"
        >
          {actionTitle}
        </Button>
      )}
    </div>
  );
};

export default AccountActionHeader;
