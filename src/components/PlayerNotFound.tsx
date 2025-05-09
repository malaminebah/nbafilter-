import React from "react";
import NotFound from "./NotFound";

interface PlayerNotFoundProps {
  errorMessage?: string;
}

const PlayerNotFound: React.FC<PlayerNotFoundProps> = ({ errorMessage }) => {
  return (
    <NotFound
      title={errorMessage ? "Error" : "Player not found"}
      message={errorMessage || "The player you are looking for does not exist."}
    />
  );
};

export default PlayerNotFound;
