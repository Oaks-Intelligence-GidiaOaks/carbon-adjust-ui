import { RootState } from "@/app/store";
import { clearOrder } from "@/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PaymentSuccess = () => {
  const { product, order } = useSelector((state: RootState) => state);

  console.log(order._id, "order id");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   get product schedule from params
  const query = useQuery();
  const schedule = query.get("schedule");

  const handleContinueOrder = () => {
    if (schedule) {
      navigate(`/dashboard/order-booking/${order._id}`);
    } else {
      navigate(`/dashboard/orders`);
    }

    dispatch(clearOrder());
  };

  return (
    <div
      className="flex flex-col items-center h-[80vh]   
    md:w-1/3 mx-auto"
    >
      <div className="my-auto flex flex-col items-center gap-[14px] ">
        <h2 className="font-[600] text-base">Payment Successful</h2>

        <img
          src="/assets/icons/tick-circle.svg"
          className="h-[150px] w-[150px]"
          alt=""
        />
      </div>

      <button
        onClick={() => handleContinueOrder()}
        className="rounded-[12px] mt-[40px] font-poppins w-4/5 mx-auto blue-gradient hover:bg-gradient-t-b text-center text-white hover:bg-gradient-to-t h-[46px]"
      >
        {product.hasSchedule ? (
          <span>Proceed to schedule booking</span>
        ) : (
          <span>Continue to orders</span>
        )}
      </button>
    </div>
  );
};

export default PaymentSuccess;
