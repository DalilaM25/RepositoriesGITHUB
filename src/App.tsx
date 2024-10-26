import React from "react";
import ReposList from "./components/ReposList";
// import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <>
      <h1>Список репозиториев GitHub</h1>
      <ReposList />
    </>
  );
};
export default App;
