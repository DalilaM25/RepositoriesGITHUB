import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/rootStoreContext";
import { RepositoryCard } from "../repositoryCard/repositoryCard";
import { Modal } from "../modal/Modal";
import { RepoForm } from "../repoForm/RepoForm";
import { Repository } from "../../utils/types";
import { Button, Spin } from "antd";
import styles from "./repositoriesList.module.css";
import { FilterSelect } from "../filterSelect/FilterSelect";

const RepositoriesList: React.FC = observer(() => {
  const {
    repos: {
      repositories,
      getRepositories,
      loading,
      page,
      setPage,
      totalPages,
      removeRepositoryByID,
      filter,
      order,
    },
  } = useStores();

  const [visible, setVisible] = useState(false);
  const [currentRepo, setCurrentRepo] = useState<Repository | null>(null);

  const handleOpenModal = (repo: Repository) => {
    setCurrentRepo(repo);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setCurrentRepo(null);
  };

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getRepositories();
  }, [filter, order, getRepositories, page]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && page < totalPages) {
        setPage(page + 1);
        getRepositories();
      }
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    const currentLoaderRef = loaderRef.current;

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [filter, order, getRepositories, loading, page, setPage, totalPages]);

  return (
    <>
      <FilterSelect />
      <div>
        {repositories.map((repo) => (
          <div className={styles.repo} key={repo.id}>
            <RepositoryCard repo={repo} />
            <div className={styles.buttonContainer}>
              <Button
                className={styles.buttonEdit}
                onClick={() => handleOpenModal(repo)}
                type="primary"
                icon={
                  <span role="img" aria-label="edit">
                    ✏️
                  </span>
                }
              />
              <Button
                className={styles.buttonX}
                onClick={() => removeRepositoryByID(repo.id)}
                danger
                icon={
                  <span role="img" aria-label="delete">
                    X
                  </span>
                }
              />
            </div>
          </div>
        ))}
      </div>

      {visible && currentRepo && (
        <Modal onClose={handleCloseModal}>
          <RepoForm repo={currentRepo} onClose={handleCloseModal} />
        </Modal>
      )}
      {loading && <Spin tip="Загрузка..." />}
      <div ref={loaderRef} style={{ height: "20px" }} />
    </>
  );
});

export default RepositoriesList;
