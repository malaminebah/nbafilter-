import React from "react";
import { Player } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface PlayerSummaryProps {
  player: Player;
  teamName: string;
}

const PlayerSummary: React.FC<PlayerSummaryProps> = ({ player, teamName }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all hover:shadow-2xl`}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32 flex items-center">
        <div className="px-8">
          <h1 className="text-4xl font-bold text-white">{player.name}</h1>
          <p className="text-blue-100 mt-1">{teamName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <div
          className={`${
            darkMode ? "bg-blue-900" : "bg-blue-50"
          } rounded-xl p-4 shadow-sm transform transition-all hover:scale-105`}
        >
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-blue-300" : "text-blue-500"
            } uppercase`}
          >
            Points
          </p>
          <p
            className={`text-3xl font-bold ${
              darkMode ? "text-blue-100" : "text-blue-900"
            }`}
          >
            {player.points}
          </p>
        </div>
        <div
          className={`${
            darkMode ? "bg-red-900" : "bg-red-50"
          } rounded-xl p-4 shadow-sm transform transition-all hover:scale-105`}
        >
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-red-300" : "text-red-500"
            } uppercase`}
          >
            Rebounds
          </p>
          <p
            className={`text-3xl font-bold ${
              darkMode ? "text-red-100" : "text-red-900"
            }`}
          >
            {player.rebounds}
          </p>
        </div>
        <div
          className={`${
            darkMode ? "bg-green-900" : "bg-green-50"
          } rounded-xl p-4 shadow-sm transform transition-all hover:scale-105`}
        >
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-green-300" : "text-green-500"
            } uppercase`}
          >
            Assists
          </p>
          <p
            className={`text-3xl font-bold ${
              darkMode ? "text-green-100" : "text-green-900"
            }`}
          >
            {player.assists}
          </p>
        </div>
        <div
          className={`${
            darkMode ? "bg-purple-900" : "bg-purple-50"
          } rounded-xl p-4 shadow-sm transform transition-all hover:scale-105`}
        >
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-purple-300" : "text-purple-500"
            } uppercase`}
          >
            Steals
          </p>
          <p
            className={`text-3xl font-bold ${
              darkMode ? "text-purple-100" : "text-purple-900"
            }`}
          >
            {player.steals}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerSummary;
