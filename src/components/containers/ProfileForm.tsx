import { FC } from "react";
import { Input } from "../ui";
import Phoneinput from "../ui/PhoneInput";

type Props = {};

const ProfileForm: FC<Props> = ({}) => {
  let labelClassName = `text-[#495057] font-[500] text-sm leading-[23.97px] mb-4`;
  let inputClassName = ` bg-[#E4E7E863] bg-opacity-30 h-[56px] rounded-xl px-3 w-full border border-red-500`;

  return (
    <div className="">
      <form action="" className="flex flex-col space-y-5">
        <h2 className="page-header !text-base">Photo and Contact</h2>

        <img
          src={``}
          alt="carbon adjust img"
          className="rounded-full h-[88px] w-[88px] border"
        />

        <Input
          name="name"
          label="Full Name"
          labelClassName={labelClassName}
          placeholder="Jeffery Cooper"
          inputClassName={inputClassName}
        />

        <Input
          name="email"
          label="Email Address"
          labelClassName={labelClassName}
          placeholder="Jeffery Cooper"
          inputClassName={inputClassName}
        />

        <Phoneinput
          name="tel"
          label="Phone"
          labelClassName="mb-4"
          onInputChange={() => {}}
          inputClassName={inputClassName}
          placeholder="+234"
        />

        <Input
          name="name"
          // type="date"
          label="Job type"
          labelClassName={labelClassName}
          placeholder="UI/UX Designer"
          inputClassName={inputClassName}
        />

        <Input
          name="name"
          type="date"
          label="Date of Birth"
          labelClassName={labelClassName}
          placeholder="Jeffery Cooper"
          inputClassName={inputClassName}
        />
      </form>

      <div className="text-xs mt-[28px]">
        <h2 className="text-[#495057] text-xs font-[600]">
          Delete your Account
        </h2>
        <p className="mt-2">
          You can <span className="text-red-500"> Delete your account </span>{" "}
          but you should note that it is irreversible.
        </p>
        <span>Be sure you want to do that.</span>
      </div>
    </div>
  );
};

export default ProfileForm;
