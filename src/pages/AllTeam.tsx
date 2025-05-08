import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import { allTeams } from "../../data/NbaTeams";
import SearchBar from "../components/SearchBar";
import { Team } from "../types/types";
import NoResults from "../components/NoResults";

const AllTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(allTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (!teams) {
          throw new Error("Erreur lors de la récupération des équipes");
        }
        setTeams(teams);
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
    team.full_name.toLowerCase().replace(/\s+/g, '').includes(
      searchTerm.toLowerCase().replace(/\s+/g, '')
    )
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
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Rechercher une équipe..."
      />

      <div className="container mx-auto px-4">
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {filteredTeams.map((team) => (
              <Card key={team.id} {...team} />
            ))}
          </div>
        ) : (
          <NoResults 
            message="Aucune équipe trouvée pour"
            searchTerm={searchTerm}
            onClearSearch={() => setSearchTerm("")}
            showClearButton={true}
          />
        )}
      </div>
    </div>
  );
};

export default AllTeams;
