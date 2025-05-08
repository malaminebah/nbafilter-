// Types pour les joueurs
export interface Player {
  name: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  history?: Statistics[];
}

// Types pour les statistiques
export interface Statistics {
  year: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
}

// Types pour les équipes
export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
  players: Player[];
}

// Type pour les données des équipes
export interface TeamsData {
  allTeams: Team[];
}
