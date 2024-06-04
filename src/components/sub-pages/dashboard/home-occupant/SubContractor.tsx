import SubContractorCard from "@/components/reusables/SubContractorCard";
import { DataTable } from "@/components/tables/DataTable";
import {
  briefcaseIcon,
  docIcon,
  financeColumns,
  finImage1,
  finImage2,
  finImage3,
  finImage4,
  subContractors,
  subContractorsIcon,
} from "@/constants";
import { Finance as FinanceType } from "@/types/general";
import { useEffect, useState } from "react";
import { PiArrowDownLeft, PiArrowUpRight } from "react-icons/pi";

type Props = {};

const SubContractor = (_: Props) => {
  const [tableData, setTableData] = useState<FinanceType[]>([]);

  async function getData(): Promise<FinanceType[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        logo: finImage1,
        name: "Bank of Carbon Credit",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      {
        id: "728ed52f",
        logo: finImage4,
        name: "Citibank",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      {
        id: "728ed52f",
        logo: finImage2,
        name: "Chase Bank",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      {
        id: "728ed52f",
        logo: finImage3,
        name: "Berkshare Holdings",
        apr: "12%",
        loanTerm: "10 years",
        MaxLoanAmount: "£23,000",
      },
      // ...
    ];
  }

  useEffect(() => {
    getData().then((data) => {
      setTableData(data);
    });
  }, []);
  return (
    <div className="pt-6 px-6 pb-20 bg-white">
      {/* categories section */}
      <div className="h-[167px] flex flex-nowrap gap-x-6 rounded-lg border border-grey-swatch-300 mb-10">
        {/* Total packages  */}
        <div className="font-poppins p-5 pb-0 flex-1 relative after:absolute after:w-[1px] after:h-[80px] after:top-1/2 after:-translate-y-1/2 after:content('hello') after:right-0 after:bg-grey-swatch-400">
          <div className="flex gap-8 items-start mt-4">
            <div>
              <p className="font-semibold text-4xl">200+</p>
              <p className="text-xs">Total packages</p>
            </div>
            <div className="w-[47px] h-[41px] rounded-lg shadow-md flex justify-center items-center">
              <img className="" src={briefcaseIcon} />
            </div>
          </div>
          <div className="mt-3 flex items-center text-grey-swatch-600">
            <PiArrowUpRight className="text-green-500 text-xs" />
            <span className="text-[10px] inline-block ml-2">3%</span>
            <span className="text-[10px] inline-block ml-2">
              +12 packages this week
            </span>
          </div>
        </div>
        {/* Total applications */}
        <div className="font-poppins p-5 pb-0 flex-1 relative after:absolute after:w-[1px] after:h-[80px] after:top-1/2 after:-translate-y-1/2 after:content('hello') after:right-0 after:bg-grey-swatch-400">
          <div className="flex gap-8 items-start mt-4">
            <div>
              <p className="font-semibold text-4xl">65000</p>
              <p className="text-xs">Completed projects</p>
            </div>
            <div className="w-[47px] h-[41px] rounded-lg shadow-md flex justify-center items-center">
              <img className="" src={docIcon} />
            </div>
          </div>
          <div className="mt-3 flex items-center text-grey-swatch-600">
            <PiArrowUpRight className="text-green-500 text-xs" />
            <span className="text-[10px] inline-block ml-2">3%</span>
            <span className="text-[10px] inline-block ml-2">
              +12 packages this week
            </span>
          </div>
        </div>
        {/* finance institutions */}
        <div className="font-poppins p-5 pb-0 flex-1 relative">
          <div className="flex gap-8 items-start mt-4">
            <div>
              <p className="font-semibold text-4xl">21</p>
              <p className="text-xs">Subcontractors</p>
            </div>
            <div className="w-[47px] h-[41px] rounded-lg shadow-md flex justify-center items-center">
              <img className="" src={subContractorsIcon} />
            </div>
          </div>
          <div className="mt-3 flex items-center text-grey-swatch-600">
            <PiArrowDownLeft className="text-red-500 text-xs" />
            <span className="text-[10px] inline-block ml-2">2.56%</span>
            <span className="text-[10px] inline-block ml-2">-2 this week</span>
          </div>
        </div>
      </div>

      <>
        <div className="mt-6">
          <div className="py-3">
            <p className="text-lg font-medium font-poppins">
              Recently created packages
            </p>
          </div>

          <div className="flex items-center overflow-x-scroll h-fit gap-3 scrollbar-horizontal">
            <div className="max-w-[50vw] h-fit flex gap-x-3">
              {/* {dummyHiaPackages.map((pkg: any) => (
          <HiaPackageCard data={pkg} key={pkg._id} />
        ))} */}
              {subContractors.map((subcontractor, i) => (
                <SubContractorCard data={subcontractor} key={i} hideCheckbox />
              ))}
            </div>
          </div>
        </div>
      </>

      <div className="mt-12">
        <h1 className="text-[18px] leading-[20px] font-medium font-poppins text-sub-header py-2">
          Insurance Institutions
        </h1>
        <div className="grid grid-cols-4 gap-4 ">
          <div className="col-span-4 w-full">
            {/* <FinancialInstitutionGrid /> */}
            <DataTable<FinanceType, any>
              columns={financeColumns}
              data={tableData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubContractor;
