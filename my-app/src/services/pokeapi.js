import API_URL from "../utils/constats/apiURL"; // constant that stores the api url
import axios from "axios";

export async function fetchPokemon(identifier) {
  const pokemon = await getPokemon(identifier);
  const species = await getSpecies(pokemon.species.url);

  return { pokemon, species };
}

/**
 * Fetch a Pokémon by name or id
 * @param {string|number} identifier - Pokémon name or ID
 * @returns {Promise<{pokemon: object, species: object}|null>} - Combined data of Pokémon and species, or null if not found
 */
export async function getPokemon(identifier) {
  try {
    const response = await axios.get(`${API_URL}/${identifier}`);
    if (!response) {
      throw new Error("Pokemon not found.");
    }
    const pokemon = response.data;
    return await pokemon;
  } catch (error) {
    console.error("Error searching for pokemon:", error);
    return null;
  }
}

/**
 * Fetch species data for additional details like flavor text
 * @param {string} url - URL to the species endpoint
 * @returns {Promise<{flavor_text: string|null}|null>} - Object containing English flavor text or null if not found
 */
export async function getSpecies(url) {
  try {
    const response = await axios.get(url);
    if (!response) throw new Error("Species not found.");

    const data = response.data;

    // Find the first English flavor text
    const flavorTexts = data.flavor_text_entries;
    const englishFlavor = flavorTexts
      .find((entry) => entry.language.name === "en")
      .flavor_text.replace(/[\n\r\f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const evolutionChain = data.evolution_chain.url;

    return { englishFlavor, evolutionChain };
  } catch (error) {
    console.error("Error searching for pokemon:", error);
    return null;
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
 * Fetch the next Pokémon (loops back to 1 after the last one)
 * @param {number} id - Current Pokémon ID
 * @returns {Promise<{pokemon: object, species: object}|null>}
 */
export async function nextPokemon(id) {
  if (id === 1025) {
    return getPokemon(1);
  }

  return getPokemon(id + 1);
}

/**
 * Fetch the previous Pokémon (loops back to 1025 if current is 1)
 * @param {number} id - Current Pokémon ID
 * @returns {Promise<{pokemon: object, species: object}|null>}
 */
export async function prevPokemon(id) {
  if (id === 1) {
    return getPokemon(1025);
  }

  return getPokemon(id - 1);
}
