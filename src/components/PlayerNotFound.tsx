import React from 'react';
import NotFound from './NotFound';

const PlayerNotFound: React.FC = () => {
  return (
    <NotFound 
      title="Joueur non trouvé"
      message="Le joueur que vous recherchez n'existe pas dans notre base de données."
    />
  );
};

export default PlayerNotFound; 