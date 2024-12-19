import { getLeaderBoard } from "@/services/homeOwner";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const LeaderboardAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderBoard,
  });

  const LeaderBoardData = response?.data || [];

  const leaderboard = LeaderBoardData.map((entry: any, index: any) => ({
    rank: index + 1,
    name: entry.name,
    cftScore: (entry.cf ?? 0).toFixed(2),
    crtScore: (entry.ts ?? 0).toFixed(2),
    cobScore: (entry.purchase ?? 0).toFixed(2),
    transport: (entry.transport ?? 0).toFixed(2),
    score: (entry.score ?? 0).toFixed(2),
  }));


  //   // const leaderboard = LeaderBoardData.map((entry: any, index: any) => ({
//   //   rank: index + 1,
//   //   name: entry.name,
//   //   cftScore: entry.cf,
//   //   crtScore: entry.ts,
//   //   cobScore: entry.purchase,
//   //   change: 0, // Placeholder as change logic isn't provided
//   //   direction: "up", // Placeholder, add logic based on requirements
//   // }));


  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Accordion Header */}
      <div
        className="flex items-center justify-between p-4 rounded-t-lg cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center space-x-2">
          <span
            role="img"
            aria-label="trophy"
            className="text-yellow-500 text-xl"
          >
            🏆
          </span>
          <h2 className="text-lg font-bold">Leaderboard</h2>
        </div>
        <span className="text-lg">{isOpen ? <IoClose /> : <ChevronDown />}</span>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-4 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="w-[100%] flex flex-col gap-4">
              {Array.from({ length: 3 }, (_, i) => (
                <Box key={i} sx={{ width: "100%" }}>
                  <Skeleton variant="rectangular" width={"100%"} height={100} />
                  <Skeleton width={"100%"} />
                  <Skeleton width={"50%"} animation="wave" />
                </Box>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">
              Error loading leaderboard. Please try again later.
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Explore the leaderboard rankings based on CFT, CRT, and CoB
                scores.
              </p>
              <table className="w-full border-collapse text-sm border border-gray-200 text-left mb-7">
                <thead>
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      Rank
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      CFT Score
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      TS Score
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      Device
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      Transport
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      Purchases
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-[#737373]">
                      Aggregate score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry: any, index: any) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {entry.rank}
                        {/* <span className={`text-sm ${entry.direction === "up" ? "text-green-500" : "text-red-500"}`}>
                        {entry.direction === "up" ? "↑" : "↓"} {entry.change}%
                        </span> */}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {entry.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {entry.cftScore}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {entry.crtScore}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {entry.device || 0}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {entry.transport}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {entry.cobScore}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {entry.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaderboardAccordion;
