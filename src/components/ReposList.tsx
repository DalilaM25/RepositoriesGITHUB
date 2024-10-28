import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/rootStoreContext";
import { RepoItem } from "./RepoItem";
import { Modal } from "./Modal";
import { RepoForm } from "./RepoForm";
import { Repository } from "../utils/types";
import { Button, Spin } from "antd";
import styles from "../styles/reposList.module.css";

const ReposList: React.FC = observer(() => {
  const {
    repos: {
      repositories,
      getRepositories,
      loading,
      page,
      setPage,
      totalPages,
      removeRepositoryByID,
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
  }, []);

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
  }, [getRepositories, loading, page, setPage, totalPages]);

  return (
    <>
      <div>
        {repositories.map((repo) => (
          <div
            key={repo.id}
            style={{
              position: "relative",
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <RepoItem repo={repo} />
            <div className={styles.buttonContainer}>
              <Button
                onClick={() => handleOpenModal(repo)}
                type="primary"
                icon={
                  <span role="img" aria-label="edit">
                    🖌
                  </span>
                }
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "40px",
                  margin: 0,
                }}
              />
              <Button
                onClick={() => removeRepositoryByID(repo.id)}
                danger
                icon={
                  <span role="img" aria-label="delete">
                    X
                  </span>
                }
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  margin: 0,
                }}
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

export default ReposList;
