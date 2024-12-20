import { PlusCircleIcon } from 'lucide-react';
import Building from "@/assets/icons/emptystate-buildings.svg"


interface BuildingEmptyStateProps {
  onAddBuilding: () => void;  // Function to trigger when adding a building
}

const BuildingEmptyState: React.FC<BuildingEmptyStateProps> = ({ onAddBuilding }) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Image */}
      <div className="mb-6 mt-5">
        <img
          src={Building}
          alt="No building"
          className="w-40 h-40"
        />
      </div>

      {/* Message */}
      <h2 className="text-2xl text-center font-semibold text-[#495057] font-poppins mb-5">
        No building has been added
      </h2>
      <p className="text-[#6C6262] text-center font-poppins mb-6">
        Click the button below to add building
      </p>

      {/* Button */}
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 blue-gradient text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={onAddBuilding}  
      >
        Add building
        <PlusCircleIcon className="h-5 w-5 ml-2" />
      </button>

      {/* Footer text */}
      <p className="mt-8 text-center lg:w-1/2 font-poppins text-[#0E72CB] px-6">
        “From 1990 to 2019, the total warming effect from greenhouse gases
        added by humans to the Earth's atmosphere increased by 45 percent.
        The warming effect associated with carbon dioxide alone increased by
        36 percent.”
      </p>
    </div>
  );
};

export default BuildingEmptyState;

