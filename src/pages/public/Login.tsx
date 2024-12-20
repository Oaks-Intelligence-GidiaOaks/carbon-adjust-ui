import { Input } from "../../components/ui";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormContext } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchemas } from "@/schemas/forms";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { setKommunitaToken, setToken } from "@/features/userSlice";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AuthUserProfile, IComponentMap } from "@/types/general";
import { RootState } from "@/app/store";
import { UserRole } from "@/interfaces/user.interface";
import { modals } from "./MerchantRegister";
import { VerifyEmail, VerifyPhoneNumber } from "@/components/dialogs";

const Login = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const tab = searchParams.get("ie");
  const [inactivityState] = useState(tab);
  const userData = useSelector((state: RootState) => state.user.user);
  const [activeModal, setActiveModal] = useState<modals | null>(null);

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormContext>({
    resolver: yupResolver(FormSchemas().LoginSchema),
  });

  const loginUser = useMutation({
    mutationFn: (loginCredentials: { email: string; password: string }) =>
      axiosInstance.post(`/auth/login`, loginCredentials),
    mutationKey: ["login-account"],
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Error encountered trying to login."
      );
    },
    onSuccess: (data) => {
      if (!data.data.data.user.hasPhoneNosVerified) {
        setActiveModal(modals.phone);
        return;
      }

      if (!data.data.data.user.hasEmailVerified) {
        setActiveModal(modals.email);
        return;
      }

      dispatch(setToken(data.data.data.access_token));
      dispatch(setKommunitaToken(data.data.data.kommunita_access_token));

      localStorage.setItem("token", data.data.data.access_token);

      if (
        data.data.data.user.roles[0] !== "STAFF" &&
        data.data.data.user.passwordLastResetAt
      ) {
        toast.success(`${"Login successful"}`, { duration: 4000 });
      }

      if (
        data.data.data.user.roles[0] === "STAFF" &&
        data.data.data.user.passwordLastResetAt !== null
      ) {
        toast.success(`${"Login successful"}`, { duration: 4000 });
      }

      handleRedirect(data.data.data.user, data.data.data.user.roles[0]);
    },
  });

  const sendResetPasswordEmail = useMutation({
    mutationFn: (loginCredentials: { email: string }) =>
      axiosInstance.post(`/auth/password/send-token`, loginCredentials),
    mutationKey: ["reset-password-token"],
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Error encountered trying to send password reset email."
      );
    },
    onSuccess: () => {
      toast.success(`${"Password reset email has been sent to your inbox."}`, {
        duration: 4000,
      });
    },
  });

  const handleRedirect = (user: AuthUserProfile, role: string) => {
    if (
      user.roles.includes(UserRole.CORPORATE_USER_ADMIN) ||
      role === UserRole.CORPORATE_USER_ADMIN
    ) {
      if (user.status === "pending") {
        return navigate("/account-setup");
      }

      return navigate("/organisation");
    }

    if (role === "HOME_OCCUPANT") return navigate("/dashboard");
    if (role === "ADMIN") return navigate("/admin");
    if (role === "STAFF") {
      if (user.passwordLastResetAt === null) {
        sendResetPasswordEmail.mutate({ email: user.email });
        return navigate(`/login`);
      } else {
        return navigate("/staff");
      }
    }

    if (role === "MERCHANT") {
      if (user.status === "pending") {
        return navigate("/account-setup");
      }
      return navigate("/merchant");
    }

    // For the new admin staff user
    if (role === UserRole.ADMIN_STAFF) {
      return navigate("/admin-staff");
    }
  };

  const onSubmit: SubmitHandler<LoginFormContext> = async (data) => {
    // console.log(data);
    await loginUser.mutateAsync({
      email: data.email,
      password: data.password,
    });
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (inactivityState === "unauthorized") {
      setTimeout(() => {
        toast.error(
          "You were logged out because you are unauthorized. Please logging to continue",
          { id: "unauthorized" }
        );
        navigate("/login");
      }, 0);
      // navigate("/login");
    }

    if (inactivityState === "true") {
      setTimeout(() => {
        toast.error(
          "You were logged out because you were inactive for too long.",
          { id: "inactivity" }
        );
        navigate("/login");
      }, 0);
      // navigate("/login");
    }
  }, [tab]);

  // Redirect user when they visit the login page if user is still logged in

  useEffect(() => {
    // console.log(userData?.roles);
    const userRole = userData?.roles[0];
    if (userRole) {
      // console.log(userRole);

      if (userRole === "ADMIN") {
        return navigate("/admin");
      }

      handleRedirect(userData, userData.roles[0]);
    }
  }, [userData?.roles[0]]);

  const getActiveModal: IComponentMap = {
    [modals.email]: (
      <VerifyEmail
        nextStep={() => setActiveModal(modals.phone)}
        email={loginUser.data?.data?.data?.user?.email}
      />
    ),
    [modals.phone]: (
      <VerifyPhoneNumber
        phone={loginUser.data?.data?.data?.user?.phoneNos}
        closeVerifyPhoneNumber={() => {}}
        nextStep={() => setActiveModal(null)}
      />
    ),
  };

  return (
    <div>
      {activeModal && getActiveModal[activeModal]}
      <div className="h-[calc(100vh-60px)]">
        <div className="bg-grey-swatch-100 flex justify-center mx-auto">
          <AccountActionHeader
            action={goToRegistration}
            actionTitle="Register"
          />
        </div>
        <div className="mt-8 flex justify-center mx-auto">
          <div className="flex justify-between px-4 md:px-14 py-3 w-full max-w-[1440px]">
            <div className="hidden md:flex justify-start min-h-screen flex-[0.55] flex-col gap-4 relative">
              {/* <div className="flex flex-col items-center gap-y-7 pt-10">
                <p className="max-w-[342px] text-center">
                  In need of Carbon Credit?
                  <br /> Get it with
                </p>
                <LogoAndBrandVertical className="max-h-[100px]" />
              </div> */}

              <div className="relative  w-full">
                <img
                  src={"/assets/graphics/hero-graphic.svg"}
                  alt=""
                  className="h-auto max-w-[80%] xl:max-w-[68%] 2xl:max-w-[72%] mx-auto animate-spin-slow"
                />

                <img
                  src="/assets/graphics/hero-house.svg"
                  alt=""
                  className=" absolute top-[43%] right-[5%] left-[5%] max-w-[80%] xl:max-w-[68%] 2xl:max-w-[72%] mx-auto "
                />
              </div>

              {/* 
              <RegisterGraphic className="absolute bottom-0 right-0 w-[120%] flex justify-center -z-10 min-h-[720px]" /> */}
            </div>

            <div className="bg-glass h-fit flex-1 md:flex-[0.45] py-9 px-4 md:px-12 rounded-xl max-w-[600px]">
              <p className="text-3xl font-bold">Login</p>
              <p className="pt-2">Welcome back, please enter your details.</p>
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
                <Input
                  type={showPassword ? "text" : "password"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="password"
                  register={register}
                  wrapperClassName="mt-4"
                  appendIcon={
                    !showPassword ? (
                      <EyeIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeSlashIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={togglePasswordVisibility}
                      />
                    )
                  }
                  error={errors.password?.message}
                  placeholder="Password"
                />
                <div className="my-2 flex justify-end">
                  <Link
                    to={"/forgot-password"}
                    className="text-sm hover:text-ca-blue"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  disabled={loginUser.isPending}
                  className="rounded-lg text-white mt-4 w-full h-11 flex justify-center items-center"
                >
                  {loginUser.isPending ? (
                    <Oval
                      visible={loginUser.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Login</span>
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

                        <DropdownMenu.Item
                          onClick={() => navigate("/organisation/register")}
                          className="group py-1 cursor-pointer text-[13px] text-ca-blue leading-none rounded-[3px] flex items-center h-8 px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-grey-swatch-300 data-[highlighted]:text-ca-blue"
                        >
                          As an organisation
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

export default Login;
