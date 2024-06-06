// this page shows the list of orders

import OrderCard from "@/components/reusables/OrderCard";

type Props = {};

const OrderList = (_: Props) => {
  return (
    <div>
      <div className="h-[150px] bg-[#F5FAFF] flex items-center lg:pl-[50px]">
        <h2 className="font-[500] text-xl">Order List</h2>
      </div>

      {/* flat list */}
      <div className="w-5/6 mx-auto mt-[79px] space-y-[38px]">
        {Array.from({ length: 4 }, (_, i) => (
          <OrderCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
