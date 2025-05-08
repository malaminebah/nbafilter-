
export interface Player {
  name: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  history?: Statistics[];
}


export interface Statistics {
  year: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
}


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


