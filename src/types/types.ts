// Types pour les joueurs
export interface Player {
  nom: string;
  points: number;
  rebonds: number;
  passes: number;
  interceptions: number;
  historique?: Statistique[];
}

// Types pour les statistiques
export interface Statistique {
  annee: string;
  points: number;
  rebonds: number;
  passes: number;
  interceptions: number;
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
