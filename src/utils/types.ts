export interface Owner {
  login: string;
  id: number;
  avatar_url: string;
}

export interface Repository {
  id: number;
  name: string;
  owner: Owner;
  html_url: string;
  description: string | null;
  forks_count: number;
  stargazers_count: number;
  url: string;
  created_at: string;
  updated_at: string;
}
export type TResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};
