import React from "react";
import { Team } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface TeamHeaderProps {
  team: Team;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  const { darkMode } = useTheme();

  const gradientClass =
    team.conference === "West"
      ? "bg-gradient-to-r from-red-600 to-red-800"
      : "bg-gradient-to-r from-blue-600 to-blue-800";

  const badgeClass =
    team.conference === "West"
      ? darkMode
        ? "bg-red-900 text-red-300"
        : "bg-red-200 text-red-800"
      : darkMode
      ? "bg-blue-900 text-blue-300"
      : "bg-blue-200 text-blue-800";

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all hover:shadow-2xl`}
    >
      <div className={`${gradientClass} h-36 flex items-center`}>
        <div className="px-8">
          <h1 className="text-4xl font-bold text-white">{team.full_name}</h1>
          <div className="flex space-x-3 mt-2">
            <span
              className={`${badgeClass} px-3 py-1 rounded-full text-sm font-medium`}
            >
              {team.city}
            </span>
            <span
              className={`${badgeClass} px-3 py-1 rounded-full text-sm font-medium`}
            >
              Conference: {team.conference}
            </span>
            <span
              className={`${badgeClass} px-3 py-1 rounded-full text-sm font-medium`}
            >
              Division: {team.division}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
