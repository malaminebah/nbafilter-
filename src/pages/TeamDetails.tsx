import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeamHeader from "../components/TeamHeader";
import TeamRoster from "../components/TeamRoster";
import TeamNotFound from "../components/TeamNotFound";
import { useTheme } from "../context/ThemeContext";
import { getTeamById } from "../service/serviceApi";
import { Team } from "../types/types";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { darkMode } = useTheme();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        if (!teamId) {
          throw new Error("Team ID is required");
        }
        const data = await getTeamById(Number(teamId));
        if (data) {
          setTeam(data);
        } else {
          setTeam(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <TeamNotFound errorMessage={error} />;
  }

  if (!team) {
    return <TeamNotFound />;
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-gray-100 to-gray-200"
      } py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        <TeamHeader team={team} />
        <TeamRoster players={team.players} />
      </div>
    </div>
  );
};

export default TeamDetails;
