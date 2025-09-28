import API_URL from "../utils/constats/apiURL"; // Base URL for the Pokémon API
import axios from "axios";

/**
 * Fetch both Pokémon data and its species details by name or ID
 * @param {string|number} identifier - Pokémon name or ID
 * @returns {Promise<{pokemon: object, species: object}|null>} - Combined Pokémon and species data, or null if not found
 */
export async function fetchPokemon(identifier) {
  const pokemon = await getPokemon(identifier);
  if (!pokemon) return null; // Return null if Pokémon not found

  const species = await getSpecies(pokemon.species.url);
  return { pokemon, species };
}

export async function fetchAllPokemon() {
  try {
    const response = await axios.get(`${API_URL}?limit=1025`);
    if (!response) throw new Error("Pokémon not found.");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

/**
 * Fetch a Pokémon by name or ID
 * @param {string|number} identifier - Pokémon name or ID
 * @returns {Promise<object|null>} - Pokémon data or null if not found
 */
export async function getPokemon(identifier) {
  try {
    const response = await axios.get(`${API_URL}/${identifier}`);
    if (!response) throw new Error("Pokémon not found.");
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}

/**
 * Fetch Pokémon species data for additional information (flavor text, habitat, evolution chain)
 * @param {string} url - URL to the species endpoint
 * @returns {Promise<{englishFlavor: string, evolutionChain: string, habitat: object}|null>} - Species details or null if not found
 */
export async function getSpecies(url) {
  try {
    const response = await axios.get(url);
    if (!response) throw new Error("Species not found.");

    const data = response.data;

    // Extract first English flavor text and clean line breaks
    const englishFlavor = data.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/[\n\r\f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "No description available.";

    return {
      englishFlavor,
      evolutionChain: data.evolution_chain.url,
      habitat: data.habitat,
    };
  } catch (error) {
    console.error("Error fetching species:", error);
    return null;
  }
}

/**
 * Fetch all Pokémon evolutions from the evolution chain endpoint
 * @param {string} url - URL to the evolution chain endpoint
 * @returns {Promise<string[]>} - Array of evolution names in order (e.g. ["pichu", "pikachu", "raichu"])
 */
export async function getEvolutions(url) {
  try {
    const { data } = await axios.get(url);
    if (!data?.chain) throw new Error("Evolution chain not found.");

    const evolutions = [];

    // Recursive function to traverse the entire chain and collect species names
    function extractEvolutions(chain) {
      evolutions.push(chain.species.name);
      if (chain.evolves_to?.length > 0) {
        chain.evolves_to.forEach(next => extractEvolutions(next));
      }
    }

    extractEvolutions(data.chain);
    console.log("Evolutions found:", evolutions);

    return evolutions;
  } catch (error) {
    console.error("Error fetching evolutions:", error);
    return [];
  }
}

/**
 * Fetch a random Pokémon
 * @returns {Promise<{pokemon: object, species: object}|null>}
 */
export async function randomPokemon() {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  return fetchPokemon(randomId);
}

/**
 * Fetch the next Pokémon in the Pokédex (loops back to 1 after the last one)
 * @param {number} id - Current Pokémon ID
 * @returns {Promise<{pokemon: object, species: object}|null>}
 */
export async function nextPokemon(id) {
  return getPokemon(id === 1025 ? 1 : id + 1);
}

/**
 * Fetch the previous Pokémon in the Pokédex (loops back to 1025 if current is 1)
 * @param {number} id - Current Pokémon ID
 * @returns {Promise<{pokemon: object, species: object}|null>}
 */
export async function prevPokemon(id) {
  return getPokemon(id === 1 ? 1025 : id - 1);
}
