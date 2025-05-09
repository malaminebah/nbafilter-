import React from "react";
import NotFound from "./NotFound";

interface TeamNotFoundProps {
  errorMessage?: string;
}

const TeamNotFound: React.FC<TeamNotFoundProps> = ({ errorMessage }) => {
  return (
    <NotFound
      title={errorMessage ? "Erreur" : "Équipe non trouvée"}
      message={errorMessage || "L'équipe que vous recherchez n'existe pas."}
    />
  );
};

export default TeamNotFound;
