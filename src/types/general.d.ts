import { accountTypes } from "./../constants/index";
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

export type OrgMerchantTypeForm = {
  accountType: string;
};
export type OrgAccountSetupForm = {
  accountType: string;
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
  setSelectedFiles?: React.Dispatch<React.SetStateAction<File[] | null>>;
  children?: ReactNode;
  disabled?: boolean;
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
  [key: string | number]: JSX.Element | [] | string;
};

export type IComponentNestedMap = {
  [key: string | number]: {
    [key: string | number]: JSX.Element | [] | string;
  };
};

export type IStateMap = {
  [key: string]: number;
};

export type AuthUserProfile = {
  accountType: string;
  merchantType: string;
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
  isInternalMerchant: boolean;
  name: string;
  dp?: string;
  nonFinMerchantType:
    | "SELF_EMPLOYED"
    | "SELF_EMPLOYED_LICENSE"
    | "LIMITED_LIABILITY"
    | "LIMITED_LIABILITY_LICENSE";
  password: string;
  passwordLastResetAt?: null | string;
  phoneNos: string;
  roles: string[];
  status: string;
  updatedAt: string;
  phoneNos: string;
  merchantType: string;
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

export type Package = {
  _id: string;
  title: string;
  file?: string;
  description: string;
  attachments: string[];
  media: string[];
  owner: string;
  category: Category;
  regions: string[];
  defaultDecarbonizationQuestions?: string[];
  country: string;
  status: "publish";
  packageType: "Product";
  hasQuestion: boolean;
  allowPartPayment?: boolean;
  energyBillQuestionId?: string;
  isAiEnergyPackage: boolean;
  aiPackageType: string;
  percentPayment?: string;
  hasSchedule: boolean;
  askPurchaserQuote: boolean;
  hasDownloadedableFile: boolean;
  currency: string;
  price?: string;
  discount?: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  publishedAt: string;
};

export type Order = {
  _id: string;
  package: {
    _id: string;
    attachments: string[];
    media: string[];
    category: string;
    country: string;
    hasSchedule: boolean;
  };
  status: string;
  customer: {
    _id: string;
    name: string;
  };
  responses: {
    question: string;
    response: string;
    _id: string;
  }[];
  orderActivities: {
    initiator: string;
    initiatorRole: string;
    activity: string;
    status: string;
    initatedAt: string;
    responder: string;
    responderRole: string;
    respondedAt?: string;
    response?: string;
    _id: string;
  }[];
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  paymentStatus: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  booking: {
    _id: string;
    schedule: {
      _id: string;
      day: string;
      shortDay: string;
      package: string;
      createdBy: string;
      availabilityWindow: string;
      status: string;
      slotDuration: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    slot: {
      _id: string;
      desc: string;
      schedule: string;
      createdBy: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    status: string;
    order: string;
    appointmentDate: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export type DState = string | boolean | null;

export type LineChartProps = {
  options: {};
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      lineTension: number;
      borderColor: string;
      backgroundColor: string;
      pointRadius: number;
      yAxisID: string;
    }[];
  };
};

export type PaginateProps = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  onPageChange: (page: number) => void;
};
