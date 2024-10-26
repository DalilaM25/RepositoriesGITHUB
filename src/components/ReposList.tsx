import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import repositoryStore from "../store/repositoryStore";
// import styles from "./ItemList.module.css";

const ItemList: React.FC = observer(() => {
  const { getRepos, repos } = repositoryStore;
  useEffect(() => {
    getRepos();
  }, []);
  console.log(repos, "repos");
  return <></>;
});

export default ItemList;
