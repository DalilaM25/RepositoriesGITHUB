import { makeAutoObservable, runInAction } from "mobx";
import { fetchRepositories, Repository } from "../api/getRepositiries";

class RepositoryStore {
  repos: Repository[] = [];
  page: number = 1;
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  getRepos = async () => {
    try {
      this.isLoading = true;
      const res = await fetchRepositories(this.page);
      runInAction(() => {
        this.repos = res;
        this.isLoading = false;
      });
    } catch {
      this.isLoading = false;
      throw new Error("");
    }
  };
}

export default new RepositoryStore();
