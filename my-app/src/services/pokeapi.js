import API_URL from "../utils/constats/apiURL"; // constant that stores the api url
import axios from "axios";

/**
 * Search for a Pokemon name or id
 */
export async function getPokemon(identifier) {
  try {
    const response = await axios.get(`${API_URL}/${identifier}`);
    if (!response) {
      throw new Error("Pokemon not found.");
    }
    const pokemon = response.data;
    console.log(pokemon);
    return await pokemon;
  } catch (error) {
    console.error("Error searching for pokemon:", error);
    return null;
  }
}

/**
 * Search for a random Pokemon
 */
export async function randomPokemon() {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  return getPokemon(randomId);
}

/**
 * Search the next pokemon
 */
export async function nextPokemon(id) {
  if (id === 1025) {
    return getPokemon(1);
  }

  return getPokemon(id + 1);
}

/**
 * Search the previous pokemon
 */
export async function prevPokemon(id) {
  if (id === 1) {
    return getPokemon(1025);
  }

  return getPokemon(id - 1);
}
