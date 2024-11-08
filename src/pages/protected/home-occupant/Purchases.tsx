import Bucket from "@/assets/icons/shopping.svg"
import { useState } from "react";
import UploadPurchaseDocumentModal from "./PurchaseDoc";


const PurchasesEmptyState: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Image */}
      <div className="mb-6 mt-5">
        <img src={Bucket} alt="bucket" className="w-40 h-40" />
      </div>

      {/* Message */}
      <h2 className="text-2xl text-center font-semibold text-[#495057] font-poppins mb-5">
        No order list
      </h2>
      <p className="text-[#6C6262] text-center font-poppins mb-6">
        You have not made any purchases
      </p>

      {/* Button */}
      <button
        type="button"
        onClick={handleOpenModal}
        className="inline-flex items-center px-4 py-2 blue-gradient text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Upload document
      </button>

      {/* Modal */}
      <UploadPurchaseDocumentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buildingId="your-building-id" 
      />
    </div>
  );
};

export default PurchasesEmptyState;




// import { useState } from "react";
// import { GoDownload } from "react-icons/go";
// import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
// import { HiDotsVertical } from "react-icons/hi";
// import { PencilIcon, UploadIcon } from "lucide-react";


// const PurchaseHistoryCard = ({
//   purchaseId,
//   productName,
//   purchaseDate,
//   quantity,
//   price,
//   supplier,
//   onSelect,
//   isSelected,
//   invoiceUrl,
// }: any) => {
//   const [checked, setChecked] = useState<boolean>(isSelected);
//   const [detailsShown, setDetailsShown] = useState<boolean>(false);
//   const [isInvoiceModalOpen, setInvoiceModalOpen] = useState<boolean>(false);
//   const [isInvoiceDetailsModalOpen, setInvoiceDetailsModalOpen] = useState<boolean>(false);
//   const [toggleOptions, setToggleOptions] = useState<boolean>(false);

//   const toggleChecked = () => {
//     setChecked(!checked);
//     onSelect(purchaseId);
//   };

//   const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     // Handle download logic, e.g., open invoice URL
//     window.open(invoiceUrl, "_blank");
//   };

//   const openInvoiceModal = () => {
//     setInvoiceModalOpen(true);
//     setToggleOptions(false);
//   };

//   const closeInvoiceModal = () => {
//     setInvoiceModalOpen(false);
//   };

//   const openInvoiceDetailsModal = () => {
//     setInvoiceDetailsModalOpen(true);
//     setToggleOptions(false);
//   };

//   const closeInvoiceDetailsModal = () => setInvoiceDetailsModalOpen(false);

//   const handleToggleOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     setToggleOptions((prev) => !prev);
//   };

//   return (
//     <div className="bg-white border-[0.5px] mb-7 rounded-md shadow-sm flex flex-col md:flex-row p-4 lg:p-6 text-sm lg:text-base cursor-pointer">
//       <input
//         type="checkbox"
//         checked={isSelected}
//         onChange={toggleChecked}
//         className="mr-4"
//       />

//       <div className="flex-1">
//         {/* Purchase Main Details */}
//         <div className="flex flex-col md:flex-row justify-between items-start">
//           <div className="space-y-1">
//             <h4 className="font-poppins text-[#212121]">Purchase ID</h4>
//             <p className="font-semibold font-poppins text-[#4C5563] text-sm">
//               {purchaseId}
//             </p>
//           </div>

//           <div className="relative flex justify-between w-full md:w-fit md:items-center lg:space-x-2 mt-2 md:mt-0">
//             <button
//               onClick={openInvoiceModal}
//               className="text-[#3465AF] border border-[#3465AF] py-2 px-4 rounded-full text-xs md:text-sm font-medium flex items-center space-x-2"
//             >
//               <UploadIcon className="w-4 h-4" />
//               <span>Upload Invoice</span>
//             </button>
//             <button
//               onClick={handleToggleOptions}
//               className="text-xl text-[#5D5D5D]"
//             >
//               <HiDotsVertical />
//             </button>

//             {/* Dropdown Options */}
//             {toggleOptions && (
//               <div className="absolute top-8 right-0 bg-white border rounded shadow-md z-10 py-2 w-[160px]">
//                 <button
//                   onClick={openInvoiceDetailsModal}
//                   className="flex gap-2 items-center justify-center text-xs w-full px-4 py-2 text-left hover:bg-gray-100"
//                 >
//                   <PencilIcon size={12} /> View Invoice Details
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <hr className="my-4" />

//         {/* Purchase Info Section */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           <div>
//             <h4 className="text-[#212121]">Product Name</h4>
//             <p className="text-[#4C5563] text-xs sm:text-sm">{productName}</p>
//           </div>
//           <div>
//             <h4 className="text-[#212121]">Purchase Date</h4>
//             <p className="text-[#4C5563] text-xs sm:text-sm">{purchaseDate}</p>
//           </div>
//           <div>
//             <h4 className="text-[#212121]">Quantity</h4>
//             <p className="text-[#4C5563] text-xs sm:text-sm">{quantity}</p>
//           </div>
//           <div>
//             <h4 className="text-[#212121]">Price</h4>
//             <p className="text-[#4C5563] text-xs sm:text-sm">${price}</p>
//           </div>
//         </div>

//         <hr className="my-4" />

//         {/* Expand/Collapse Section */}
//         {detailsShown && (
//           <div className="p-3 flex flex-col md:flex-row items-stretch border-b pb-5">
//             <div className="flex flex-col gap-5 mt-4 md:mt-0">
//               <div className="flex flex-wrap gap-3">
//                 <div>
//                   <h4 className="text-[#767A85] font-inter text-xs">Supplier</h4>
//                   <p className="font-semibold text-xs font-inter text-[#1F2026]">
//                     {supplier}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleDownload}
//                 className="flex-center w-fit text-xs gap-2 py-[6px] px-5 border rounded-3xl bg-[#4D94FE] text-white hover:bg-blue-600"
//               >
//                 <GoDownload />
//                 <span>Download Invoice</span>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Collapse/Expand Button */}
//         <div className="items-center justify-center flex pt-4">
//           <p
//             onClick={(e) => {
//               e.stopPropagation();
//               setDetailsShown(!detailsShown);
//             }}
//             className="flex items-center justify-center gap-2 font-open-sans cursor-pointer text-sm text-[#212121]"
//           >
//             <span>{detailsShown ? "Collapse" : "Expand"}</span>
//             {detailsShown ? (
//               <MdOutlineKeyboardArrowUp className="size-5" />
//             ) : (
//               <MdOutlineKeyboardArrowDown className="size-5" />
//             )}
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// };






// const PurchaseList = () => {
//   const purchases = [
//     {
//       purchaseId: "d8674e99-de33...",
//       productName: "Office Supplies",
//       purchaseDate: "2024-11-01",
//       quantity: 10,
//       price: 150.00,
//       supplier: "ABC Supplies Inc.",
//       invoiceUrl: "/path/to/invoice.pdf",
//       isSelected: false,
//     },
//     // Add more purchases as needed
//   ];

//   const handleSelect = () => {
//     console.log(`Selected purchase ID:`);
//     // Add selection logic if needed
//   };

//   return (
//     <div className="p-6">
//       {purchases.map((purchase, index) => (
//         <PurchaseHistoryCard
//           key={index}
//           {...purchase}
//           onSelect={handleSelect}
//         />
//       ))}
//     </div>
//   );
// };

// export default PurchaseList;