import { LogoAndBrandVertical, RegisterGraphic } from "@/assets/icons";
import { Input } from "../../components/ui";
import { Button } from "@/components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgotPasswordFormContext } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchemas } from "@/schemas/forms";
import { useNavigate } from "react-router-dom";
import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormContext>({
    resolver: yupResolver(FormSchemas().ForgotPasswordSchema),
  });

  const sendUserEmail = useMutation({
    mutationFn: (email: string) =>
      axiosInstance.post(`/auth/password/send-token`, { email }),
    mutationKey: ["forgot-password"],
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Error encountered trying to send link."
      );
    },
    onSuccess: () => {
      toast.success(`${"Password reset email was sent successfully"}`, {
        duration: 4000,
      });
      navigate("/login");
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormContext> = async (data) => {
    await sendUserEmail.mutateAsync(data.email);
  };

  const goToLogin = () => {
    navigate("/login");
  };
  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <div>
      <div className="h-[calc(100vh-60px)]">
        <div className="bg-grey-swatch-100 flex justify-center mx-auto">
          <AccountActionHeader action={goToLogin} actionTitle="Login" />
        </div>
        <div className="mt-8 flex justify-center mx-auto">
          <div className="flex justify-between px-4 md:px-14 py-3 w-full max-w-[1440px]">
            <div className="hidden md:flex justify-start min-h-screen flex-[0.55] flex-col relative">
              <div className="flex flex-col items-center gap-y-7 pt-10">
                <p className="max-w-[342px] text-center">
                  In need of Carbon Credit?
                  <br /> Get it with
                </p>
                <LogoAndBrandVertical className="max-h-[100px]" />
              </div>
              <RegisterGraphic className="absolute bottom-0 right-0 w-[120%] flex justify-center -z-10 min-h-[720px]" />
            </div>
            <div className="bg-glass h-fit flex-1 md:flex-[0.45] py-9 px-4 md:px-12 rounded-xl max-w-[600px]">
              <p className="text-3xl font-bold">Forgot password?</p>
              <p className="pt-2">
                Enter your email and send to receive a link to change your
                password.
              </p>
              <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type={"text"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="email"
                  register={register}
                  wrapperClassName="mt-4"
                  error={errors.email?.message}
                  placeholder="Email"
                />
                <Button
                  disabled={sendUserEmail.isPending}
                  className="rounded-lg text-white mt-4 w-full h-11 flex justify-center items-center"
                >
                  {sendUserEmail.isPending ? (
                    <Oval
                      visible={sendUserEmail.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Send</span>
                  )}
                </Button>
                <p className="mt-6 text-sm">
                  Don't have an account?{" "}
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button
                        variant={"link"}
                        onClick={goToRegistration}
                        className="inline-flex text-sm font-bold py-0 h-fit px-0 bg-transparent text-blue-main hover:underline underline-offset-1"
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
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[1440px] text-center mt-10 text-sm pb-4">
          Copyright Escrow-Tech Limited {new Date().getFullYear()}. All Rights
          Reserved.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
