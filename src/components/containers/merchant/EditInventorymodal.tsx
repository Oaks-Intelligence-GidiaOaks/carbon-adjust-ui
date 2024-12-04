import Modal from "@/components/dialogs/Modal";
import { Button, Input } from "@/components/ui";
import SelectInput from "@/components/ui/SelectInput";
import TextArea from "@/components/ui/TextArea";
import { UProductForm } from "@/interfaces/sales.interface";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

type EditInventoryModalProps = {
  setShowModal: (value: boolean) => void;
  data: any;
};

const EditInventoryModal = ({
  setShowModal,
  data,
}: EditInventoryModalProps) => {
  const initialState: UProductForm = {
    title: data?.title,
    description: data?.description,
    action: { label: data?.action, value: data?.action },
    quantity: data.package?.quantity,
    price: data?.price,
  };

  const [formData, setFormData] = useState<UProductForm>(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
    const Loading = false;
  return (
    <>
      <Modal>
        <div className="w-[90%] sm:w-[40%] bg-white rounded-lg px-5 py-10 overflow-y-scroll">
          <div className="sticky top-0 flex justify-end  p-5">
            <button
              className="text-gray-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex  flex-col justify-start p-2">
            <h2 className="text-2xl font-medium text-[#495057] capitalize mb-5 font-poppins">
              {data.title}
            </h2>
            <form action="">
              <div className="space-y-2 w-full mt-2">
                <h2 className="pl-2 text-[#575757] text-sm">Product Name</h2>

                <Input
                  name="title"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Enter product name"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="space-y-2 w-full mt-5">
                  <h2 className="pl-2 text-[#575757] text-sm">Quantity</h2>

                  <Input
                    name="quantity"
                    inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                    placeholder="Input quantity"
                    type="number"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2 w-full mt-5">
                  <h2 className="pl-2 text-[#575757] text-sm">Action</h2>
                  <SelectInput
                    options={[
                      { label: "Increase", value: "increase" },
                      { label: "Decrease", value: "decrease" },
                    ]}
                    className=""
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        action: val && val,
                      }))
                    }
                    value={formData.action}
                    placeholder="Select action"
                  />
                </div>
              </div>

              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">
                  Product Description
                </h2>
                <TextArea
                  rows={4}
                  name="description"
                  value={formData.description}
                  labelClassName="pb-[10px]"
                  inputClassName="border p-3 bg-[#E4E7E8] resize-none h-[100px] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Write a brief Description of the product"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 w-full mt-5">
                <h2 className="pl-2 text-[#575757] text-sm">Price</h2>

                <Input
                  name="price"
                  inputClassName="border p-3 bg-[#E4E7E8] rounded-[12px] placeholder:text-left placeholder:align-top"
                  placeholder="Enter Price"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full flex mt-5 ">
                <Button disabled={true} className="w-[80%] mx-auto">
                  {Loading ? (
                    <Oval
                      visible={true}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span>Update Product</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditInventoryModal;

// {
//     "id": 1,
//     "_id": "6745ac195198c4d50315178d",
//     "package": {
//         "_id": "6745a64f10d6de6967b33681",
//         "title": "Guard paln PlanTests here 561123443",
//         "category": {
//             "_id": "66f6b20e8e7ef393ffe0b775",
//             "name": "Grant for Renewable Wind Projects"
//         },
//         "packageType": "Product",
//         "quantity": 45,
//         "quantityLeft": 14,
//         "reOrderPoint": 15,
//         "color": "Blue"
//     },
//     "status": "pending",
//     "customer": {
//         "_id": "66622a60fa9153dfc09b7d33",
//         "name": "Emma Otuonye"
//     },
//     "createdAt": "2024-11-26T11:08:09.473Z"
// }

// {
//     "_id": "6745a64f10d6de6967b33681",
//     "title": "Guard paln PlanTests here 561123443",
//     "category": {
//         "_id": "66f6b20e8e7ef393ffe0b775",
//         "name": "Grant for Renewable Wind Projects"
//     },
//     "status": "unpublish",
//     "packageType": "Product",
//     "price": 300,
//     "currency": "£"
// },

// "inventories": [
//     {
//         "_id": "674f2e2a111126929da818be",
//         "packageId": {
//             "_id": "674f27400de20af5985aff79",
//             "title": "Smart Plug",
//             "owner": "6662281bfa9153dfc09b7cb2",
//             "category": {
//                 "_id": "66f6b20e8e7ef393ffe0b775",
//                 "name": "Grant for Renewable Wind Projects"
//             },
//             "status": "unpublish",
//             "packageType": "Product",
//             "price": 300,
//             "sku": "PWR0033",
//             "quantity": 65,
//             "color": [
//                 "Blue"
//             ],
//             "quantityLeft": 65,
//             "inventoryStatus": "In-Stock"
//         },
//         "creator": {
//             "_id": "6662281bfa9153dfc09b7cb2",
//             "name": "Emmanuel Otuonye"
//         },
//         "action": "increase",
//         "createdAt": "2024-12-03T16:13:30.750Z",
//         "updatedAt": "2024-12-03T16:13:30.750Z",
//         "comment": "I want to increase quantity",
//        
//     }
// ],
// "totalInventories": 1,
