import { ApproveReceipt } from "@/services/organisation";
import { cn } from "@/utils";
import {  useMutation } from "@tanstack/react-query";
import { FC } from "react";
import toast from "react-hot-toast";

interface StaffRequestCardProps {
  name: string;
  role: string;
  id: string;
  department: string;
  requestDetails: string;
  status: "pending" | "approved" | "declined";
  profileImage: string;
  className?: string;
}

const StaffRequestCard: FC<StaffRequestCardProps> = ({
  name,
  role,
  department,
  requestDetails,
  status,
  profileImage,
  className,
  id,
}) => {
  const approveReceipt = useMutation({
    mutationKey: ["approveReceipt"],
    mutationFn: (receiptId: any) => ApproveReceipt(receiptId),
    onSuccess: () => {
      toast.success("Request approved successfully.");
    },
    onError: () => {
      toast.error(`Request approval failed, try again`);
    },
  });

  const declineReceipt = useMutation({
    mutationKey: ["approveReceipt"],
    mutationFn: (receiptId: any) => ApproveReceipt(receiptId),
    onSuccess: () => {
      toast.success("Request approved successfully.");
    },
    onError: () => {
      toast.error(`Request approval failed, try again`);
    },
  });

  const handleSubmit = (type: "approve" | "decline") => {
    
    type === "approve" ? approveReceipt.mutate({receiptId: id}) : declineReceipt.mutate(id);
  };

  return (
    <div
      className={cn(
        "bg-white shadow-md rounded-lg p-4 w-full max-w-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Staff Request</h3>
        <div
          className={`text-[10px] flex-center gap-1 font-medium px-2 py-1 rounded-full ${
            status.toLowerCase() === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : status.toLowerCase() === "approved"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <div
            className={`w-[5px] h-[5px] rounded-full ${
              status === "pending"
                ? " bg-yellow-600"
                : status === "approved"
                ? " bg-green-600"
                : " bg-red-600"
            }`}
          />
          {status}
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h4 className="text-base font-[600] text-blue-gradient capitalize">
            {name}
          </h4>
          <p className="text-xs text-gray-600 font-[500] capitalize">
            {role} - {department}
          </p>
        </div>
      </div>

      {/* Request Details */}
      <p className="text-xs text-gray-600 mb-4">{requestDetails}</p>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
             onClick={() => handleSubmit("approve")}
            className="text-sm px-3 py-1.5 bg-blue-100 text-blue-600 rounded border border-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Approve
          </button>
          <button
            onClick={() => handleSubmit("decline")}
            className="text-sm px-3 py-1.5 bg-red-100 text-red-600 rounded border border-red-600 hover:bg-red-600 hover:text-white transition"
          >
            Decline
          </button>
        </div>
        <button
          className="text-sm text-blue-600 hover:underline font-[600]"
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default StaffRequestCard;
