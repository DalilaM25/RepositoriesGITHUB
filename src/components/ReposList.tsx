import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/rootStoreContext";
import RepoPageItem from "./RepoItem";

// import styles from "./ItemList.module.css";

const ReposList: React.FC = observer(() => {
  const {
    repos: {
      getRepositories,
      removeRepositoryByID,
      repositoryPromises,
      hasMorePages,
    },
  } = useStores();

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastRepositoryRef = (node: HTMLLIElement) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMorePages) {
        getRepositories();
      }
    });

    if (node) observerRef.current.observe(node);
  };

  useEffect(() => {
    getRepositories();
  }, []);

  if (!repositoryPromises?.length) {
    return <div>loading</div>;
  }

  return (
    <ul>
      {repositoryPromises.map((repoPromise, index) => (
        <RepoPageItem
          key={index}
          repoPromise={repoPromise}
          lastRepositoryRef={
            index === repositoryPromises.length - 1
              ? lastRepositoryRef
              : undefined
          }
          onEdit={() => console.log("редактируем")}
          onDelete={(id) => removeRepositoryByID(id)}
        />
      ))}
    </ul>
  );
});

export default ReposList;
