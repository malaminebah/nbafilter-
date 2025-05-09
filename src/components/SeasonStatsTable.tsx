import React from "react";
import { Statistics } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface SeasonStatsTableProps {
  statistics: Statistics[];
}

const SeasonStatsTable: React.FC<SeasonStatsTableProps> = ({ statistics }) => {
  const { darkMode } = useTheme();
  const sortedStats = [...statistics].sort((a, b) =>
    a.year > b.year ? -1 : 1
  );

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
       Season Stats
      </h2>

      {sortedStats.length > 0 ? (
        <div
          className={`shadow-lg rounded-xl overflow-hidden border ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <table className="min-w-full">
            <thead
              className={`${
                darkMode
                  ? "bg-gradient-to-r from-gray-800 to-gray-700"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50"
              }`}
            >
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } uppercase tracking-wider`}
                >
                  Season
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } uppercase tracking-wider`}
                >
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-300 mr-2"></span>
                    Points
                  </span>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } uppercase tracking-wider`}
                >
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-red-300 mr-2"></span>
                    Rebounds
                  </span>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } uppercase tracking-wider`}
                >
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-300 mr-2"></span>
                    Assists
                  </span>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } uppercase tracking-wider`}
                >
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-purple-300 mr-2"></span>
                    Steals
                  </span>
                </th>
              </tr>
            </thead>
            <tbody
              className={darkMode ? "bg-gray-800" : "bg-white"}
              data-testid="stats-table"
            >
              {sortedStats.map((season, index) => (
                <tr
                  key={season.year}
                  className={`${
                    darkMode
                      ? index % 2 === 0
                        ? "bg-gray-700"
                        : "bg-gray-800"
                      : index % 2 === 0
                      ? "bg-gray-50"
                      : "bg-white"
                  } ${
                    darkMode ? "hover:bg-gray-600" : "hover:bg-blue-50"
                  } transition-colors`}
                  data-testid={`stats-row-${index}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`font-medium ${
                        darkMode
                          ? "text-white bg-blue-800"
                          : "text-gray-900 bg-blue-100"
                      } rounded-full px-3 py-1 text-center w-28`}
                    >
                      {season.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`${
                        darkMode
                          ? "text-blue-300 bg-blue-900"
                          : "text-blue-600 bg-blue-50"
                      } font-semibold rounded-lg px-3 py-1 text-center w-16`}
                    >
                      {season.points}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`${
                        darkMode
                          ? "text-red-300 bg-red-900"
                          : "text-red-600 bg-red-50"
                      } font-semibold rounded-lg px-3 py-1 text-center w-16`}
                    >
                      {season.rebounds}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`${
                        darkMode
                          ? "text-green-300 bg-green-900"
                          : "text-green-600 bg-green-50"
                      } font-semibold rounded-lg px-3 py-1 text-center w-16`}
                    >
                      {season.assists}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`${
                        darkMode
                          ? "text-purple-300 bg-purple-900"
                          : "text-purple-600 bg-purple-50"
                      } font-semibold rounded-lg px-3 py-1 text-center w-16`}
                    >
                      {season.steals}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className={`${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          } rounded-xl p-8 text-center`}
          data-testid="no-stats-message"
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
            No history of stats available for this player
          </p>
        </div>
      )}
    </div>
  );
};

export default SeasonStatsTable;
