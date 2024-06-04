import { ICountry } from "country-state-city";
import { Control } from "react-hook-form";

export type DropdownProps = {
  wrapperClassName?: string;
  optionsContainerClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  control?: Control<RegisterFormContext, any>;
  placeholder?: string;
  label?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  isLoading?: boolean;
  prefixIcon?: string | ReactNode;
  suffixIcon?: string | ReactNode;
  loadingText?: string;
  name: string;
  options: { label: string; value: string; id?: string | number }[];
  searchable?: boolean;
  disabled?: boolean;
  addPortal?: boolean;
  addAnchor?: boolean;
  value?: any;
  onOptionChange?: (value: any) => void;
  countryChange?: (value: any) => void;
  cityChange?: (value: any) => void;
};

export type DropdownOption = {
  id?: number | string;
  label: string;
  value: string;
};

export type CheckboxProps = {
  className?: string;
  id?: string;
  defaultChecked?: boolean;
  checked: boolean;
  customSetIsChecked?: () => void;
  setIsChecked?: (boolean) => void;
  iconStyle?: string;
  checkIcon?: ReactNode;
};

export type AccountActionHeaderProps = {
  action?: () => void;
  actionTitle?: string;
  className?: string;
};

export type AccountSetupProgressIndicatorProps = {
  accountType: string | undefined;
  currentStep: number;
};

export type AccountSetupForm = {
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
};
export type OrgAccountSetupForm = {
  entityName: string;
  contactEmail: string;
  contactName: string;
  dateOfFormation: string;
  phoneNumber: string;
  bio: string;
};
export type OrgAddressSetupForm = {
  country: { label: string; value: string };
  cityOrProvince: { label: string; value: string };
  firstLineAddress: string;
  zipcode: string;
};
export type AddressSetupForm = {
  country: { label: string; value: string };
  cityOrProvince: { label: string; value: string };
  firstLineAddress: string;
  zipcode: string;
  epcRating: { label: string; value: string };
};
export type HomeInfoForm = {
  houseType: {
    label: string;
    value: string;
  };
  yearOfConstruction: string;
  ownershipStatus: {
    label: string;
    value: string;
  };
  moveInDate: string;
  nosOfRoom: string;
  nosOfOccupant: {
    adult: string;
    children: string;
  };
};
export type DocInfoForm = {
  idType: {
    label: string;
    value: string;
  };
  doc: File[] | null;
};

export type OrgDocInfoForm = {
  idType: {
    label: string;
    value: string;
  };
  contactDoc: File[] | null;
  certOfInc: File[] | null;
  letterOfAuth: File[] | null;
  certOfAuth: File[] | null;
};

export type AccountSetupPropsSteps = {
  accountType: string | undefined;
  currentStep: number | undefined;
};

export type AccountSetupProps = {
  accountType: string | undefined;
  currentStep: number;
  formState: AccountSetupForm;
  setFormState: React.Dispatch<React.SetStateAction<AccountSetupForm>>;
  addressFormState?: AddressSetupForm;
  setAddressFormState?: React.Dispatch<React.SetStateAction<AddressSetupForm>>;
  homeInfoState?: HomeInfoForm;
  setHomeInfoState?: React.Dispatch<React.SetStateAction<HomeInfoForm>>;
  DocInfoState?: DocInfoForm;
  setDocInfoState?: React.Dispatch<React.SetStateAction<DocInfoForm>>;
};

export type OrgAccountSetupProps = {
  accountType: string | undefined;
  currentStep: number | undefined;
  formState: OrgAccountSetupForm;
  setFormState: React.Dispatch<React.SetStateAction<OrgAccountSetupForm>>;
  addressFormState: OrgAddressSetupForm;
  setAddressFormState: React.Dispatch<
    React.SetStateAction<OrgAddressSetupForm>
  >;
  DocInfoState: OrgDocInfoForm;
  setDocInfoState: React.Dispatch<React.SetStateAction<OrgDocInfoForm>>;
  handleDocSubmission: () => void;
  handleCertOfIncSubmission: () => void;
  handleCertOfAuthSubmission: () => void;
};

export type SideBarProps = {
  accountType: string;
  mobileMenuIsOpen: boolean;
  setMobileMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type DropBoxProps = {
  value?: File[] | null;
  docName?: string;
  setFile?: React.Dispatch<React.SetStateAction<DocInfoForm>>;
  setFiles?: React.Dispatch<React.SetStateAction<OrgDocInfoForm>>;
  children?: ReactNode;
};

export type SideBarItem = {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  title: string;
  href: string;
};

export type ProfileProps = { accountType: string };

export type ProfileTabProps = {
  accountType: string;
  currentTab: number;
  setCurrentTab: (index: number) => void;
};

export type IComponentMap = {
  [key: string]: JSX.Element | [];
};

export type AuthUserProfile = {
  activationCode: string;
  activationExpiry: string;
  address: {
    cityOrProvince: string;
    country: string;
    firstLineAddress: string;
    zipcode: string;
  };
  epcRating: string;
  applications: Array;
  contactEmail: string;
  contactName?: string;
  dateFormed?: string;
  bio?: string;
  createdAt: string;
  doc: Array;
  email: string;
  emailActivatedAt: string;
  hasAcceptTerms: boolean;
  hasEmailVerified: boolean;
  name: string;
  dp?: string;
  password: string;
  phoneNos: string;
  roles: string[];
  status: string;
  updatedAt: string;
  phoneNos: string;
  dob: string;
  step: number;
  __v: number;
  _id: string;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Finance = {
  id: string;
  logo: string;
  name: string;
  apr: string;
  loanTerm: string;
  MaxLoanAmount: string;
};

export interface YearData {
  label: string;
  value: number;
}
