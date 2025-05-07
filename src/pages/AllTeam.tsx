import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import { allTeams } from "../../data/NbaTeams";
import SearchBar from "../components/SearchBar";


interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
  players: Array<{
    nom: string;
    points: number;
    rebonds: number;
    passes: number;
    interceptions: number;
  }>;
}

const AllTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dataTeams: Team[] = [...allTeams];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (!dataTeams) {
          throw new Error("Erreur lors de la récupération des équipes");
        }
        setTeams(dataTeams);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.full_name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 mb-3"></div>
          <div className="text-gray-500 text-lg font-medium">Chargement...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md">
          <div className="flex items-center mb-3">
            <svg
              className="w-8 h-8 text-red-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-red-800">Erreur</h3>
          </div>
          <p data-testid="error-message" className="text-red-700">
            {error}
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher une équipe..."
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {filteredTeams.map((team) => (
            <Card key={team.id} {...team} />
          ))}
        </div>
        
        {filteredTeams.length === 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              Aucune équipe trouvée pour "{search}"
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-200 ease-in-out shadow-md border-2 border-red-600 cursor-pointer"
            >
              Effacer la recherche
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTeams;
