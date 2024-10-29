import { TResponse } from "../utils/types";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const BASE_URL = "https://api.github.com";

export const fetchRepositories = async (
  page: number,
  filter: string,
  order: string
): Promise<TResponse> => {
  return fetch(
    `${BASE_URL}/search/repositories?q=javascript&sort=${filter}&order=${order}&per_page=10&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
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
