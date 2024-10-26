import { makeAutoObservable } from "mobx";
import { fetchRepositories, Repository } from "../api/getRepositiries";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

class RepositoryStore {
  repos?: IPromiseBasedObservable<Repository[]>[] = [];
  page: number = 1;
  hasMore: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  getRepos = () => {
    if (!this.hasMore) return;

    const newRepos = fromPromise(fetchRepositories(this.page));
    newRepos.then((data) => {
      if (data.length === 0) {
        this.hasMore = false;
      }
    });
    this.repos?.push(newRepos);
    this.page += 1;
  };
}

export default new RepositoryStore();
