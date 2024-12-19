
import { CheckoutCard } from "@/components/reusables/CheckoutCard";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/services/homeOwner";

type CartItem = {
  id: number;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  subtotal: number;
  imageUrl: string;
 
};

type APIItem = {
  _id: number;
  productId: {
    _id: string;
    title: string;
    price: number;
    attachments: string[];
  };
  quantity: number;
};

type APICart = {
  items: APIItem[];
};



const Checkout = () => {

  // Fetch data using useQuery
  const {
    data: response,
  } = useQuery({
    queryKey: ["cart-items"],
    queryFn: getCartItems,
  });

  // Map fetched data into the expected format
  const cartItems: CartItem[] =
    response?.data?.cartItems?.flatMap((cart: APICart) =>
      cart.items.map((item: APIItem): CartItem => ({
        id: item._id,
        productId: item.productId._id,
        name: item.productId.title,
        price: item.productId.price,
        quantity: item.quantity,
        subtotal: item.productId.price * item.quantity,
        imageUrl: item.productId.attachments[0],
      }))
    ) || [];

  const productCost = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  // Calculate shipping cost
  const shippingCost = cartItems.length > 2 ? 0 : cartItems.length > 0 ? 4.12 : 0;

  // Calculate VAT (20% of product cost)
  const vat = productCost * 0.2;

  // Discount (set to 0 for now, can be updated as needed)
  const discount = 0;

  // Calculate total
  const total = productCost + shippingCost + vat - discount;

  // Generate orderSummary object
  const orderSummary = {
    items: cartItems.map((item) => ({
      product: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.imageUrl,
    })),
    productCost: productCost,
    shippingCost: shippingCost,
    vat: vat,
    discount: discount,
    total: total,
  };


  return (
    <div><CheckoutCard transactionFees={0} {...orderSummary} /></div>
  )
}

export default Checkout