import { FC } from "react";

interface StaffRequestCardProps {
  name: string;
  role: string;
  department: string;
  requestDetails: string;
  status: "Pending" | "Approved" | "Declined";
  onApprove: () => void;
  onDecline: () => void;
  onViewDetails: () => void;
  profileImage: string;
}

const StaffRequestCard: FC<StaffRequestCardProps> = ({
  name,
  role,
  department,
  requestDetails,
  status,
  onApprove,
  onDecline,
  onViewDetails,
  profileImage,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Staff Request</h3>
        <div
          className={`text-[10px] flex-center gap-1 font-medium px-2 py-1 rounded-full ${
            status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : status === "Approved"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <div
            className={`w-[5px] h-[5px] rounded-full ${
              status === "Pending"
                ? " bg-yellow-600"
                : status === "Approved"
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
          <h4 className="text-base font-[600] text-blue-gradient ">{name}</h4>
          <p className="text-xs text-gray-600 font-[500]">
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
            onClick={onApprove}
            className="text-sm px-3 py-1.5 bg-blue-100 text-blue-600 rounded border border-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Approve
          </button>
          <button
            onClick={onDecline}
            className="text-sm px-3 py-1.5 bg-red-100 text-red-600 rounded border border-red-600 hover:bg-red-600 hover:text-white transition"
          >
            Decline
          </button>
        </div>
        <button
          onClick={onViewDetails}
          className="text-sm text-blue-600 hover:underline font-[600]"
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default StaffRequestCard;
