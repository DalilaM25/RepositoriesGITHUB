import { Select } from "antd";
import { useStores } from "../../store/rootStoreContext";
import styles from "./filterSelect.module.css";

export const FilterSelect: React.FC = () => {
  const {
    repos: { setPage, setFilter, setOrder },
  } = useStores();

  const handleChange = (value: string) => {
    const [filter, order] = value.split(",");
    setFilter(filter);
    setOrder(order);
    setPage(1);
  };

  return (
    <>
      <Select
        defaultValue="stars,asc"
        className={styles.select}
        onChange={(value) => handleChange(value)}
      >
        <Select.Option value="stars,asc">Stars ⬆️</Select.Option>
        <Select.Option value="stars,desc">Stars ⬇️</Select.Option>
        <Select.Option value="forks,asc">Forks ⬆️</Select.Option>
        <Select.Option value="forks,desc">Forks ⬇️</Select.Option>
        <Select.Option value="updated,asc">Updated ⬆️</Select.Option>
        <Select.Option value="updated,desc">Updated ⬇️</Select.Option>
      </Select>
    </>
  );
};
