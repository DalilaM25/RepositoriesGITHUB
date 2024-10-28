import { TResponse } from "../utils/types";

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchRepositories = async (page: number): Promise<TResponse> => {
  return fetch(
    `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
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
