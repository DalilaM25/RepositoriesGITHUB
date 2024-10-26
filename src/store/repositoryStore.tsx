import { makeAutoObservable } from "mobx";
import { fetchRepositories, Repository } from "../api/getRepositiries";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

class RepositoryStore {
  page: number = 1;
  hasMorePages: boolean = true;
  private repositoryCollection: Repository[] = [];
  repositoryPromises?: IPromiseBasedObservable<Repository[]>[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getRepositories = () => {
    if (!this.hasMorePages) return;

    const nextPage = fromPromise(fetchRepositories(this.page));
    nextPage.then((data) => {
      if (data.length === 0) {
        this.hasMorePages = false;
      } else {
        this.repositoryCollection.push(...data);
      }
    });
    this.repositoryPromises?.push(nextPage);
    this.page += 1;
  };

  removeRepositoryByID = (repoID: number) => {
    this.repositoryCollection = this.repositoryCollection.filter(
      (repo) => repo.id !== repoID
    );
    this.repositoryPromises = this.repositoryCollection.map((repo) =>
      fromPromise(Promise.resolve([repo]))
    );
  };

  // editRepository=()
}

export default new RepositoryStore();
