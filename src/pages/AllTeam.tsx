import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import SearchBar from "../components/SearchBar";
import { Team } from "../types/types";
import NoResults from "../components/NoResults";
import { useTheme } from "../context/ThemeContext";
import { getAllTeams } from "../service/serviceApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const AllTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await getAllTeams();
        setTeams(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.full_name
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(searchTerm.toLowerCase().replace(/\s+/g, ""))
  );

  if (loading)
    return <LoadingSpinner />;

  if (error)
    return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-8">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search for a team..."
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
            message="No teams found for"
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
