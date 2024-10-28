import { makeAutoObservable, runInAction } from "mobx";
import { Repository } from "../utils/types";
import { fetchRepositories } from "../api/fetchRepository";

class RepositoryStore {
  page: number = 1;
  repositories: Repository[] = [];
  loading: boolean = false;
  err: string | null = null;
  totalPages: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getRepositories = async () => {
    this.loading = true;
    this.err = null;

    try {
      const data = await fetchRepositories(this.page);
      runInAction(() => {
        this.repositories.push(...data.items);
        this.totalPages = data.total_count;
        this.loading = false;
      });
    } catch (error) {
      console.error("Ошибка при загрузке репозиториев:", error);
      runInAction(() => {
        this.err = "Ошибка при загрузке репозиториев";
      });
    }
  };

  setPage = (page: number) => {
    this.page = page;
  };

  removeRepositoryByID = (repoID: number) => {
    this.repositories = this.repositories.filter((repo) => repo.id !== repoID);
  };

  editRepository = (updatedRepo: Repository) => {
    const index = this.repositories.findIndex(
      (repo) => repo.id === updatedRepo.id
    );
    if (index !== -1) {
      this.repositories[index] = updatedRepo;
    }
  };
}

export default new RepositoryStore();
