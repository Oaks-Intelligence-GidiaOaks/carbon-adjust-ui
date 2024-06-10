import axiosInstance from "@/api/axiosInstance";

export const getAllPackageCategories = async () => {
  const { data } = await axiosInstance.get(`/packages/categories`);

  return data;
};

export const getHomePagePackages = async () => {
  const { data } = await axiosInstance.get(`/packages/store/home`);

  return data;
};

export const getHomePageFreebies = async () => {
  const { data } = await axiosInstance.get(`/packages/store/freebies`);

  return data;
};

export const getBestSellerPackages = async () => {
  const { data } = await axiosInstance.get(`/packages/store/best-sellers`);

  return data;
};

export const getPackagesByCategorySlug = async (slug: string) => {
  const { data } = await axiosInstance.get(`packages/store/category/${slug}`);

  return data;
};

// ORDER
export const createNewOrder = async (iData: any) => {
  // {
  //     "package": "66648f3a9619f2263c4e4d60",
  //     "customerAddress": "23 jenkins street Texas",
  //     "price": 0,
  //     "customerEmail": "idysmanetim@gmail.com",
  //     "customerPhone": "+234703933086788",
  //     "requiredExtraProd": true,
  //     "responses": [
  //         {
  //             "question": "66648f3a9619f2263c4e4d61",
  //             "response": "Energy shortage and power failure"
  //         },
  //         {
  //             "question":"66648f3a9619f2263c4e4d62",
  //             "response":"yes"
  //         },
  //         {
  //             "question":"66648f3a9619f2263c4e4d63",
  //             "response":"yes"
  //         }
  //     ]
  // }

  const { data } = await axiosInstance.post(`application/initiate`, iData);

  return data;
};

export const updateOrderPaymentStatus = async (iData: any) => {
  const { data } = await axiosInstance.patch(
    `application/order/6664e947e25a812616aa74de/payment/confirm`
  );

  return data;
};
