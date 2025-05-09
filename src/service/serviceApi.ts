import { Team, Player } from "../types/types";

const API_URL = "http://localhost:3001";

/**
 * Retrieves all NBA teams from the API
 * @returns Promise containing an array of teams
 */
export const getAllTeams = async (): Promise<Team[]> => {
  try {
    const response = await fetch(`${API_URL}/team`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving teams:", error);
    throw error;
  }
};

/**
 * Retrieves a team by its ID
 * @param id - The ID of the team to retrieve
 * @returns Promise containing the team or undefined
 */
export const getTeamById = async (id: number): Promise<Team | undefined> => {
  try {
    const response = await fetch(`${API_URL}/team/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error retrieving team ${id}:`, error);
    throw error;
  }
};


/**
 * Finds a player by name and returns the player and their team
 * @param playerName - The name of the player to search for
 * @returns Promise containing the player and their team, or undefined
 */
export const getPlayerByName = async (playerName: string): Promise<{ player: Player; team: Team } | undefined> => {
  try {
    const teams = await getAllTeams();

  
    for (const team of teams) {
      const player = team.players.find(p => p.name === playerName);
      if (player) {
        return { player, team };
      }
    }

    return undefined;
  } catch (error) {
    console.error(`Error searching for player ${playerName}:`, error);
    throw error;
  }
};
