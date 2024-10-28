import { TResponse } from "../utils/types";

export const fetchRepositories = async (page: number): Promise<TResponse> => {
  return fetch(
    `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};
