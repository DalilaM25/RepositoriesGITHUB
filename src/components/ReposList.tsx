import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/rootStoreContext";

// import styles from "./ItemList.module.css";

const ReposList: React.FC = observer(() => {
  const {
    repos: { getRepos, repos },
  } = useStores();
  useEffect(() => {
    getRepos();
  }, []);

  if (!repos) {
    return null;
  }

  // console.log(repos, "repos");
  return repos.case({
    pending: () => <div>loading</div>,
    rejected: () => <div>error</div>,
    fulfilled: (value) => (
      <ul>
        {value.map((repo) => {
          return <li key={repo.id}>{repo.owner.login}</li>;
        })}
      </ul>
    ),
  });
});

export default ReposList;