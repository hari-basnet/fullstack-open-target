import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  const request = axios.get(baseUrl + `/all`);
  return await request.then((response) => response.data);
};

const getCountryByName = async (name) => {
  try {
    const response = await axios.get(baseUrl + `/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country by name (${name}):`, error);
    throw error;
  }
};

export default { getAll, getCountryByName };
