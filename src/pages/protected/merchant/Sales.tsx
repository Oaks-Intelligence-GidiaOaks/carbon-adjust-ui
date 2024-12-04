import { SalesGrid } from "@/components/grid/merchant/SalesGrid";

const Sales = () => {
  return (
    <>
      <h1 className="font-[500] text-[#050505] text-[24px] my-10 font-inter">
        Sales
      </h1>

      <SalesGrid className="mt-8 max-w-[90vw]"/>
    </>
  );
};

export default Sales;
