import React from "react";
import ReposList from "./components/ReposList";
import { RootStoreContext } from "./store/rootStoreContext";
import RootStore from "./store/rootStore";
// import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <>
        <h1>Список репозиториев GitHub</h1>
        <ReposList />
      </>
    </RootStoreContext.Provider>
  );
};
export default App;