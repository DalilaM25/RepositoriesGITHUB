import React from "react";
import RepositoriesList from "./components/ReposList";
import { RootStoreContext } from "./store/rootStoreContext";
import RootStore from "./store/rootStore";
// import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <>
        <h1>Список репозиториев GitHub</h1>
        <RepositoriesList />
      </>
    </RootStoreContext.Provider>
  );
};
export default App;
