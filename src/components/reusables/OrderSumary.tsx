interface OrderSummaryItem {
    product: string;
    quantity: number;
    price: number;
    image: string;
  }


interface OrderSummaryProps {
    items: OrderSummaryItem[];
    productCost: number;
    shippingCost: number;
    transactionFees: number;
    vat: number;
    discount: number;
    total: number;
  }
  
 export const OrderSummary: React.FC<OrderSummaryProps> = ({
    items,
    productCost,
    shippingCost,
    transactionFees,
    vat,
    discount,
    total,
  }) => {
    return (
      <div className="border p-6 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Your Order</h2>
        <ul className="space-y-4">
          {items.map((item, index) => (
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
              <p className="text-sm">£{item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-5 text-sm">
          <div className="flex justify-between">
            <span>Product cost</span>
            <span>£{productCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping cost</span>
            <span>£{shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Transaction Fees</span>
            <span>£{transactionFees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT</span>
            <span>£{vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-£{discount.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t pt-4 mt-4 text-lg font-semibold flex justify-between">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>
    );
  };
  