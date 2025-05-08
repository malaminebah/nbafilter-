import React from "react";
import { Statistics } from "../types/types";
import { useTheme } from "../context/ThemeContext";

interface PerformanceEvolutionProps {
  history: Statistics[];
}

const PerformanceEvolution: React.FC<PerformanceEvolutionProps> = ({
  history,
}) => {
  const sortedHistory = [...history].sort((a, b) => (a.year > b.year ? -1 : 1));
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
        Évolution des performances
      </h2>

      {sortedHistory.length > 0 ? (
        <div className="p-4 rounded-xl">
          <div className="flex justify-center mb-4 space-x-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Points
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Rebonds
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Passes
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Interceptions
              </span>
            </div>
          </div>

          <div
            className={`h-60 ${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            } rounded-lg p-4 flex items-end justify-around`}
          >
            {sortedHistory.map((season, index) => (
              <div key={`bar-${index}`} className="flex flex-col items-center">
                <div className="flex items-end space-x-1 mb-2">
                  <div
                    className="w-8 bg-blue-500 rounded-t-md"
                    style={{ height: `${season.points * 1.5}px` }}
                    title={`Points: ${season.points}`}
                  ></div>
                  <div
                    className="w-8 bg-red-500 rounded-t-md"
                    style={{ height: `${season.rebounds * 4}px` }}
                    title={`Rebonds: ${season.rebounds}`}
                  ></div>
                  <div
                    className="w-8 bg-green-500 rounded-t-md"
                    style={{ height: `${season.assists * 4}px` }}
                    title={`Passes: ${season.assists}`}
                  ></div>
                  <div
                    className="w-8 bg-purple-500 rounded-t-md"
                    style={{ height: `${season.steals * 20}px` }}
                    title={`Interceptions: ${season.steals}`}
                  ></div>
                </div>
                <div
                  className={`text-xs font-medium ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {season.year.split("-")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`${
            darkMode ? "bg-gray-700" : "bg-gray-50"
          } rounded-xl p-8 text-center`}
        >
          <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Données insuffisantes pour afficher l'évolution
          </p>
        </div>
      )}
    </div>
  );
};

export default PerformanceEvolution;
