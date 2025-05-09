import { Team, Player } from "../types/types";

const API_URL = "http://localhost:3001";

/**
 * Récupère toutes les équipes NBA depuis l'API
 * @returns Promise contenant un tableau d'équipes
 */
export const getAllTeams = async (): Promise<Team[]> => {
  try {
    const response = await fetch(`${API_URL}/team`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des équipes:", error);
    throw error;
  }
};

/**
 * Récupère une équipe par son ID
 * @param id - L'ID de l'équipe à récupérer
 * @returns Promise contenant l'équipe ou undefined
 */
export const getTeamById = async (id: number): Promise<Team | undefined> => {
  try {
    const response = await fetch(`${API_URL}/team/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'équipe ${id}:`, error);
    throw error;
  }
};

/**
 * Recherche des équipes par terme de recherche
 * @param searchTerm - Le terme à rechercher
 * @returns Promise contenant un tableau d'équipes correspondant à la recherche
 */
export const searchTeams = async (searchTerm: string): Promise<Team[]> => {
  try {
    // JSON Server permet de filtrer avec q=
    const response = await fetch(`${API_URL}/team?q=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la recherche d'équipes:", error);
    throw error;
  }
};

/**
 * Trouve un joueur par son nom et retourne le joueur ainsi que l'équipe
 * @param playerName - Le nom du joueur à rechercher
 * @returns Promise contenant le joueur et son équipe ou undefined
 */
export const getPlayerByName = async (playerName: string): Promise<{ player: Player; team: Team } | undefined> => {
  try {
    // Récupérer toutes les équipes
    const teams = await getAllTeams();

    // Chercher l'équipe contenant le joueur
    for (const team of teams) {
      const player = team.players.find(p => p.name === playerName);
      if (player) {
        return { player, team };
      }
    }

    return undefined;
  } catch (error) {
    console.error(`Erreur lors de la recherche du joueur ${playerName}:`, error);
    throw error;
  }
};
