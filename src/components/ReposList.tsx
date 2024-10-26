import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/rootStoreContext";
import RepoPageItem from "./RepoItem";

// import styles from "./ItemList.module.css";

const ReposList: React.FC = observer(() => {
  const {
    repos: { getRepos, repos, hasMore },
  } = useStores();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastRepoRef = (node: HTMLLIElement) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        getRepos();
      }
    });

    if (node) observerRef.current.observe(node);
  };

  useEffect(() => {
    getRepos();
  }, []);

  if (!repos?.length) {
    return <div>loading</div>;
  }

  return (
    <ul>
      {repos.map((repoPromise, index) => (
        <RepoPageItem
          key={index}
          repoPromise={repoPromise}
          lastRepoRef={index === repos.length - 1 ? lastRepoRef : undefined}
        />
      ))}
    </ul>
  );
});

export default ReposList;
