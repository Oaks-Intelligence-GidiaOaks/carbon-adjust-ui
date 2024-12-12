import { ChevronDown,} from "lucide-react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const LeaderboardAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Updated mock data to include separate scores for CFT, CRT, and CoB
  const mockData = [
    { rank: 1, name: "Jonathan Doe", cftScore: 1200, crtScore: 800, cobScore: 600, change: 3, direction: "up" },
    { rank: 2, name: "Jane Smith", cftScore: 1150, crtScore: 780, cobScore: 620, change: 2, direction: "down" },
    { rank: 3, name: "Emily Johnson", cftScore: 1100, crtScore: 770, cobScore: 630, change: 5, direction: "up" },
    { rank: 4, name: "Michael Brown", cftScore: 1080, crtScore: 760, cobScore: 610, change: 1, direction: "down" },
    { rank: 5, name: "Chris Davis", cftScore: 1050, crtScore: 750, cobScore: 590, change: 4, direction: "up" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Accordion Header */}
      <div
        className="flex items-center justify-between p-4  rounded-t-lg cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="trophy" className="text-yellow-500 text-xl">
            🏆
          </span>
          <h2 className="text-lg font-bold">Leaderboard</h2>
        </div>
        <span className="text-lg">{isOpen ? <IoClose /> : <ChevronDown />}</span>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-4">
            Explore the leaderboard rankings based on CFT, CRT, and CoB scores.
          </p>
          <table className="w-full border-collapse  text-sm border border-gray-200 text-left">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-[#737373]">Rank</th>
                <th className="border border-gray-200 px-4 py-2 text-[#737373]">Name</th>
                <th className="border border-gray-200 px-4 py-2 text-[#737373]">CFT Score</th>
                <th className="border border-gray-200 px-4 py-2 text-[#737373]">CRT Score</th>
                <th className="border border-gray-200 px-4 py-2 text-[#737373]">CoB Score</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Rank */}
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {entry.rank}
                    {/* {entry.rank === 1 && (
                      <span role="img" aria-label="medal" className="ml-2">
                        🥇
                      </span>
                    )} */}
                  </td>

                  {/* Name */}
                  <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{entry.name}</span>
                  </td>

                  {/* CFT Score */}
                  <td className="border border-gray-200 px-4 py-2">
                  
                    {entry.cftScore}{" "}
                    <span
                      className={`text-sm ${
                        entry.direction === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {entry.direction === "up" ? "↑" : "↓"} {entry.change}%
                    </span>  
                  </td>

                  {/* CRT Score */}
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.crtScore}{" "}
                    <span
                      className={`text-sm ${
                        entry.direction === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {entry.direction === "up" ? "↑" : "↓"} {entry.change}%
                    </span>
                  </td>

                  {/* CoB Score */}
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.cobScore}{" "}
                    <span
                      className={`text-sm ${
                        entry.direction === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {entry.direction === "up" ? "↑" : "↓"} {entry.change}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardAccordion;
