import React from "react";
import { Link } from "react-router-dom";
import { Player } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface TeamRosterProps {
  players: Player[];
}

const TeamRoster: React.FC<TeamRosterProps> = ({ players }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-2xl shadow-xl p-6 mb-8`}
    >
      <h2
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        } mb-6 border-b pb-2`}
      >
        Roster
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => (
          <div
            key={index}
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-xl shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:scale-105`}
          >
            <div
              className={`${
                darkMode
                  ? "bg-gradient-to-r from-gray-800 to-gray-700"
                  : "bg-gradient-to-r from-gray-100 to-gray-200"
              } p-4 border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <Link
                to={`/player/${encodeURIComponent(player.name)}`}
                className={`text-xl font-bold ${
                  darkMode
                    ? "text-white hover:text-blue-300"
                    : "text-blue-500 hover:text-blue-400"
                } transition-colors`}
              >
                {player.name}
              </Link>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`${
                    darkMode ? "bg-blue-900" : "bg-blue-50"
                  } rounded-lg p-3 text-center`}
                >
                  <p
                    className={`text-xs font-medium ${
                      darkMode ? "text-blue-300" : "text-blue-500"
                    } uppercase`}
                  >
                    Points
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      darkMode ? "text-blue-100" : "text-blue-800"
                    }`}
                  >
                    {player.points}
                  </p>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-red-900" : "bg-red-50"
                  } rounded-lg p-3 text-center`}
                >
                  <p
                    className={`text-xs font-medium ${
                      darkMode ? "text-red-300" : "text-red-500"
                    } uppercase`}
                  >
                    Rebounds
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      darkMode ? "text-red-100" : "text-red-800"
                    }`}
                  >
                    {player.rebounds}
                  </p>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-green-900" : "bg-green-50"
                  } rounded-lg p-3 text-center`}
                >
                  <p
                    className={`text-xs font-medium ${
                      darkMode ? "text-green-300" : "text-green-500"
                    } uppercase`}
                  >
                    Assists
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      darkMode ? "text-green-100" : "text-green-800"
                    }`}
                  >
                    {player.assists}
                  </p>
                </div>
                <div
                  className={`${
                    darkMode ? "bg-purple-900" : "bg-purple-50"
                  } rounded-lg p-3 text-center`}
                >
                  <p
                    className={`text-xs font-medium ${
                      darkMode ? "text-purple-300" : "text-purple-500"
                    } uppercase`}
                  >
                    Steals
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      darkMode ? "text-purple-100" : "text-purple-800"
                    }`}
                  >
                    {player.steals}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to={`/player/${encodeURIComponent(player.name)}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  See details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {players.length === 0 && (
        <div
          className={`${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          } rounded-xl p-8 text-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-10 w-10 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            } mx-auto mb-2`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-500"
            } font-medium`}
          >
            Aucun joueur disponible pour cette équipe
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamRoster;
