import { calculatePaymentTotals } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

interface OrderSummaryProps {
  selectedPayment: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedPayment }) => {
  const { orderId } = useParams<{ orderId: string }>();
  const orderIds = orderId ? orderId.split(",") : [];

  const paymentMethods = ["card", "klarna", "Wallet"];
  const paymentMethod = paymentMethods.includes(selectedPayment) ? selectedPayment : "Combination";

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["payment-totals", paymentMethod],
    queryFn: () =>
      calculatePaymentTotals({
        orderIds,
        paymentMethod,
      }),
  });

  if (isError) {
    return (
      <div className="border p-6 rounded-md shadow-sm">
        <div className="flex justify-center items-center h-full">
          <span>Error loading data. Please try again.</span>
        </div>
      </div>
    );
  }

  const packages = response?.data?.packages || [];
  const totalCalculations = response?.data?.totalCalculations || {};

  const orderSummary = {
    items: packages.map((pkg: any) => ({
      product: pkg.order.package.title,
      quantity: pkg.quantity || 1,
      price: (pkg.price || 0) * (pkg.quantity || 1),
      image: Array.isArray(pkg.order.package.attachments) && pkg.order.package.attachments.length > 0 
        ? pkg.order.package.attachments[0] 
        : "",
    })),
    productCost: totalCalculations.subtotal || 0,
    shippingCost: totalCalculations.shippingFee || 0,
    transactionFees: totalCalculations.transactionCost || 0,
    vat: totalCalculations.vat || 0,
    discount: totalCalculations.discount || 0,
    total: totalCalculations.total || 0,
  };

  return (
    <div className="border p-6 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Your Order</h2>
      {isLoading ? (
        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col justify-center items-center h-full">
            <span>Loading...</span>
            <FaSpinner className="animate-spin" />
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {orderSummary.items.map((item: any, index: number) => (
              <li key={index} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.product}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.product} x {item.quantity}
                  </p>
                </div>
                <p className="text-sm">£{(item.price ?? 0).toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-5 text-sm">
            <div className="flex justify-between">
              <span>Product cost</span>
              <span>£{(orderSummary.productCost ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping cost</span>
              <span>£{(orderSummary.shippingCost ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT</span>
              <span>£{(orderSummary.vat ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-£{(orderSummary.discount ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction Fees</span>
              <span>£{(orderSummary.transactionFees ?? 0).toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 mt-4 text-lg font-semibold flex justify-between">
              <span>Total</span>
              <span>£{(orderSummary.total ?? 0).toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
