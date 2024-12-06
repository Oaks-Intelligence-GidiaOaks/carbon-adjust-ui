

import image2 from "@/assets/main-image.svg";
import aircon from "@/assets/Air-con.svg";
import { CheckoutCard } from "@/components/reusables/CheckoutCard";


const Checkout = () => {
  const orderSummary = {
    items: [
      {
        product: "Laptop",
        quantity: 1,
        price: 999.99,
        image: `${image2}`,
      },
      {
        product: "Headphones",
        quantity: 2,
        price: 49.99,
        image: `${aircon}`,
      },
    ],
    productCost: 100,
    shippingCost: 100,
    transactionFees: 2,
    vat: 7.5,
    discount: 0,
    total: 700,
  };

  return (
    <div><CheckoutCard {...orderSummary} /></div>
  )
}

export default Checkout