import { observer } from "mobx-react-lite";
import { IPromiseBasedObservable } from "mobx-utils";
import { Repository } from "../api/getRepositiries";

export const RepoPageItem = observer(
  ({
    repoPromise,
    lastRepoRef,
  }: {
    repoPromise: IPromiseBasedObservable<Repository[]>;
    lastRepoRef?: (node: HTMLLIElement) => void;
  }) => {
    return repoPromise.case({
      pending: () => <li>Loading...</li>,
      rejected: () => <li>Error loading</li>,
      fulfilled: (repos) => (
        <>
          {repos.map((repo) => (
            <li key={repo.id} ref={lastRepoRef}>
              {repo.owner.login}
            </li>
          ))}
        </>
      ),
    });
  }
);

export default RepoPageItem;
