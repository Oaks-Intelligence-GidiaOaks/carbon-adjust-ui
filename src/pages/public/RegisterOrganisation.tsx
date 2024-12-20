import { Input } from "../../components/ui";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormContext } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchemas } from "@/schemas/forms";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CheckBox from "@/components/ui/CheckBox";
import { Link, useNavigate } from "react-router-dom";
import AccountActionHeader from "@/components/reusables/account-setup/AccountActionHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { VerifyEmail, VerifyPhoneNumber } from "@/components/dialogs";
import SelectInput from "@/components/ui/SelectInput";
import Phoneinput from "@/components/ui/PhoneInput";
import { PropsValue } from "react-select";
import { SelectItem } from "@/types/formSelect";
import { getCountries } from "@/services/adminService";
import { IComponentMap } from "@/types/general";

type RegisterObject = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  accountType: "CORPORATE_USER_ADMIN";
  country: string | PropsValue<SelectItem>;
  phoneNos: string;
};

const initialState: RegisterObject = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  accountType: "CORPORATE_USER_ADMIN",
  country: "",
  phoneNos: "",
};

export enum modals {
  email = "email",
  phone = "phone",
  noll = "noll",
}

const RegisterOrganisation = () => {
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState<RegisterObject>(initialState);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeModal, setActiveModal] = useState<modals | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["get-countries"],
    queryFn: getCountries,
  });

  let countries: any[] = data?.data?.countries
    ? data?.data?.countries.map((it: any) => ({
        id: it._id,
        label: it.name,
        value: it.name,
      }))
    : [];

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prevState) => !prevState);

  const {
    control,
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<RegisterFormContext>({
    resolver: yupResolver<any>(FormSchemas().RegisterSchema),
  });

  const registerUser = useMutation({
    mutationFn: (userData: RegisterObject) =>
      axiosInstance.post(`/auth/register`, userData),
    mutationKey: ["register_account"],
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(`${data.data.message}. Please verify your email`, {
        duration: 10000,
      });

      setActiveModal(modals.email);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormContext> = async (value) => {
    try {
      await registerUser.mutateAsync({
        email: value.email,
        name: value.name,
        password: value.password,
        confirmPassword: value.confirmPassword,
        accountType: "CORPORATE_USER_ADMIN",
        acceptTerms: true,
        country: value.country?.value as string,
        phoneNos: value.phoneNos as string,
      });
    } catch (error: any) {
      console.log(error);
      throw error.response.data;
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const getActiveModal: IComponentMap = {
    [modals.email]: (
      <VerifyEmail
        nextStep={() => setActiveModal(modals.phone)}
        email={registerUser.data?.data.data.email}
      />
    ),
    [modals.phone]: (
      <VerifyPhoneNumber
        phone={registerUser.data?.data.data.phoneNos}
        closeVerifyPhoneNumber={() => {}}
        nextStep={() => navigate("/login")}
      />
    ),
  };

  return (
    <>
      {activeModal && getActiveModal[activeModal]}

      <div>
        <div className="bg-grey-swatch-100 flex justify-center mx-auto">
          <AccountActionHeader action={goToLogin} actionTitle="Login" />
        </div>

        <div className="mt-8 flex justify-center mx-auto">
          <div className="flex justify-between px-4 md:px-14 py-3 w-full max-w-[1440px]">
            <div className="hidden md:flex justify-start flex-[0.55] flex-col gap-5 relative">
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
            </div>
            <div className="bg-glass flex-1 md:flex-[0.45] py-9 px-4 md:px-12 rounded-xl max-w-[600px]">
              <p className="text-3xl font-bold">Create an account</p>

              <p className="pt-2">
                Let’s get started with your 30 days free trial
              </p>

              <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type={"text"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="name"
                  register={register}
                  wrapperClassName="mt-4"
                  error={errors.name?.message}
                  placeholder="Organization Name "
                />

                <Input
                  type={"email"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="email"
                  register={register}
                  wrapperClassName="mt-4"
                  error={errors.email?.message}
                  placeholder="Email"
                />

                <>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        className="text-sm 2xl:text-base font-normal mt-4"
                        label=""
                        placeholder="Select Country"
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                        disabled={isLoading}
                        options={countries}
                      />
                    )}
                  />

                  <p className="text-red-500 text-xs">
                    {errors.country?.value?.message}
                  </p>
                </>

                <>
                  <Controller
                    name="phoneNos"
                    control={control}
                    render={({ field }) => (
                      <Phoneinput
                        onInputChange={(selectedOption) => {
                          field.onChange(`+${selectedOption}`);
                        }}
                        inputClassName="mt-4"
                      />
                    )}
                  />

                  <p className="text-red-500 text-xs">
                    {errors.phoneNos?.message}
                  </p>
                </>

                <Input
                  type={showPassword ? "text" : "password"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="password"
                  register={register}
                  wrapperClassName="mt-4"
                  appendIcon={
                    showPassword ? (
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

                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  labelClassName="text-sm 2xl:text-base font-normal"
                  name="confirmPassword"
                  register={register}
                  wrapperClassName="mt-4"
                  appendIcon={
                    showConfirmPassword ? (
                      <EyeIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <EyeSlashIcon
                        width={18}
                        className="cursor-pointer select-none"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )
                  }
                  error={errors.confirmPassword?.message}
                  placeholder="Confirm password"
                />

                <div className="flex gap-x-2 items-start mt-4">
                  <CheckBox
                    className="border-2 border-grey-swatch-700 shrink-0"
                    id="t&c"
                    checked={formDetails.acceptTerms}
                    setIsChecked={(val) =>
                      setFormDetails((prev) => ({ ...prev, acceptTerms: val }))
                    }
                  />

                  <p className="font-poppins text-xs text-grey-swatch-800">
                    By clicking create account, you agree to the{" "}
                    <Link to={"/terms-and-conditions/merchant"}>
                      <span className="inline-flex text-xs py-0 h-fit px-0 bg-transparent text-blue-main hover:underline underline-offset-1 font-normal">
                        Terms and Conditions
                      </span>
                    </Link>{" "}
                    and{" "}
                    <Link to={"/privacy-policy"}>
                      <span className="inline-flex text-xs py-0 h-fit px-0 bg-transparent text-blue-main hover:underline underline-offset-1 font-normal">
                        Privacy Policy
                      </span>
                    </Link>
                  </p>
                </div>

                <Button
                  disabled={!formDetails.acceptTerms || registerUser.isPending}
                  className="rounded-lg text-white mt-4 w-full h-11 flex items-center justify-center"
                >
                  {registerUser.isPending ? (
                    <Oval
                      visible={registerUser.isPending}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Create account</span>
                  )}
                </Button>

                <p className="mt-6 text-sm">
                  Already have an account?{" "}
                  <Button
                    variant={"link"}
                    onClick={goToLogin}
                    className="inline-flex text-sm font-bold py-0 h-fit px-0 bg-transparent text-blue-main hover:underline underline-offset-1"
                  >
                    Log In
                  </Button>
                </p>
              </form>
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
    </>
  );
};

export default RegisterOrganisation;
