import { makeAutoObservable } from "mobx";
import { fetchRepositories, Repository } from "../api/getRepositiries";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

class RepositoryStore {
  repos?: IPromiseBasedObservable<Repository[]>;
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  getRepos = () => {
    this.repos = fromPromise(fetchRepositories(this.page));
  };
}

export default new RepositoryStore();
