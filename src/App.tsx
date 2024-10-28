import React from "react";
import RepositoriesList from "./components/ReposList";
import { RootStoreContext } from "./store/rootStoreContext";
import RootStore from "./store/rootStore";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <div className={styles.app}>
        <h1 className={styles.h1}>Список репозиториев GitHub</h1>
        <RepositoriesList />
      </div>
    </RootStoreContext.Provider>
  );
};
export default App;
