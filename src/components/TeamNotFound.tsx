import React from "react";
import NotFound from "./NotFound";

const TeamNotFound: React.FC = () => {
  return (
    <NotFound
      title="Équipe non trouvée"
      message="L'équipe que vous recherchez n'existe pas."
    />
  );
};

export default TeamNotFound;
