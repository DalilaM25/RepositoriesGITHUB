import { makeAutoObservable, runInAction } from "mobx";
import { Repository } from "../utils/types";
import { fetchRepositories } from "../api/fetchRepository";

class RepositoryStore {
  page: number = 1;
  repositories: Repository[] = [];
  loading: boolean = false;
  err: string | null = null;
  totalPages: number = 0;
  filter: string = "stars";
  order: string = "asc";

  constructor() {
    makeAutoObservable(this);
  }

  getRepositories = async () => {
    this.loading = true;
    this.err = null;

    try {
      if (this.page === 1) {
        this.repositories = [];
      }
      const data = await fetchRepositories(this.page, this.filter, this.order);

      runInAction(() => {
        this.repositories.push(...data.items);
        this.totalPages = data.total_count;
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      console.error("Ошибка при загрузке репозиториев:", error);
      runInAction(() => {
        this.err = "Ошибка при загрузке репозиториев";
      });
    }
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setFilter = (filter: string) => {
    this.filter = filter;
  };

  setOrder = (order: string) => {
    this.order = order;
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
