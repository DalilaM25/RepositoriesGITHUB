import { makeAutoObservable, runInAction } from "mobx";
import { Repository } from "../utils/types";
import { fetchRepositories } from "../api/fetchRepository";

class RepositoryStore {
  page: number = 1;
  repositories: Repository[] = [];
  loading: boolean = false;
  err: string | null = null;
  totalPages: number = 0;
  filter: string = "name";

  constructor() {
    makeAutoObservable(this);
  }

  getRepositories = async (filter: string) => {
    this.loading = true;
    this.err = null;

    try {
      if (this.page === 1) {
        this.repositories = [];
      }
      const data = await fetchRepositories(this.page);
      const filteredItems = this.applyFilter(data.items, filter);

      runInAction(() => {
        this.repositories.push(...filteredItems);
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

  applyFilter(repositories: Repository[], filter: string): Repository[] {
    return repositories.sort((a, b) => {
      switch (filter) {
        case "name":
          return a.name.localeCompare(b.name);
        case "createdAt":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "updatedAt":
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        default:
          return 0;
      }
    });
  }

  setPage = (page: number) => {
    this.page = page;
  };

  setFilter = (filter: string) => {
    this.filter = filter;
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
