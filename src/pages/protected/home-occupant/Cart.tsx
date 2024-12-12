import { ArrowLeft } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { deleteCartItem, getCartItems } from "@/services/homeOwner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

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

const Cart = () => {
  const queryClient = useQueryClient();

  // Fetch data using useQuery
  const {
    data: response,
    isLoading,
    error,
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

  // Mutation to delete cart item
  const deleteCartItemMutation = useMutation({
    mutationFn: (productId: string) => deleteCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      toast.success("Item deleted successfully!", { duration: 5000 });
    },
    onError: (error: unknown) => {
      toast.error("Failed to delete item. Please try again.", { duration: 5000 });
      console.error("Error deleting cart item:", error);
    },
  });


  const handleRemoveItem = (productId: string) => {
    deleteCartItemMutation.mutate(String(productId));
  };

  const productCost = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const shippingCost = cartItems.length > 0 ? 0 : 0;
  const vat = cartItems.length > 0 ? 0 : 0;
  const discount = 0;
  const total = productCost + shippingCost + vat - discount;

 

  if (isLoading) {
    return (
      <div className="w-[100%] mx-auto mt-10 flex flex-col gap-4 ">
        {Array.from({ length: 3 }, (_, i) => (
        <Box key={i} sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          <Skeleton width={"100%"} />
          <Skeleton width={"50%"} animation="wave" />
        </Box>
      ))}
      </div>
    );
  }

  if (error) {
    return <p>Error fetching cart items.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Left Section - Shopping Cart */}
      <div className="flex-1 bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg text-[#191C1F] font-medium mb-4">
          Shopping Cart
        </h2>
        {cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mb-5">
              <thead className="bg-[#F2F4F5] border border-[#E4E7E9] text-[#475156] text-sm">
                <tr>
                  <th className="p-4 border-b">Products</th>
                  <th className="p-4 border-b">Price</th>
                  <th className="p-4 border-b">Quantity</th>
                  <th className="p-4 border-b">Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b flex items-center gap-4">
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        disabled={deleteCartItemMutation.isPending}
                      >
                        <IoCloseCircleOutline />
                      </button>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <span>{`${item.name} x ${item.quantity}`}</span>
                    </td>
                    <td className="p-4 border-b">${item.price}</td>
                    <td className="p-4 border-b">{item.quantity}</td>
                    <td className="p-4 border-b">${item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to={"/dashboard"}>
              <button className="px-4 py-2 border flex items-center gap-2 border-[#0B8DFF] text-transparent bg-clip-text bg-gradient-to-b from-[#2E599A] to-[#0B8DFF] rounded-lg hover:bg-blue-200">
                <ArrowLeft className="text-[#0B8DFF]" /> Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Link to={"/dashboard"} className="mt-4">
              <button className="px-4 py-2 border flex items-center gap-2 border-[#0B8DFF] text-transparent bg-clip-text bg-gradient-to-b from-[#2E599A] to-[#0B8DFF] rounded-lg hover:bg-blue-200">
                <ArrowLeft className="text-[#0B8DFF]" /> Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
      {/* Right Section - Summary */}
      <div className="w-full md:w-1/3 bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Your Order</h2>
        {cartItems.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span>Product cost</span>
              <span>${productCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Shipping cost</span>
              <span>${shippingCost}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>VAT</span>
              <span>${vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Discount</span>
              <span>${discount}</span>
            </div>
            <div className="flex justify-between items-center text-lg border-t border-gray-300 pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to={"/dashboard/checkout"}>
              <button className="mt-4 w-full px-4 py-2 blue-gradient rounded-full text-white hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </Link>
            {/* Coupon Code */}
            <div className="mt-4 border ">
              <label
                htmlFor="coupon"
                className="block text-gray-700 mb-2 p-4 border-b"
              >
                Coupon Code
              </label>
              <div className="p-4">
                <input
                  id="coupon"
                  type="text"
                  placeholder="Enter Coupon code"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="mt-2 w-full px-4 py-2 border border-[#0B8DFF] text-transparent bg-clip-text bg-gradient-to-b from-[#2E599A] to-[#0B8DFF] rounded-lg hover:bg-blue-200">
                  Apply Coupon
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Your order is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
