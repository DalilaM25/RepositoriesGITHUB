import { observer } from "mobx-react-lite";
import { render, screen, waitFor } from "@testing-library/react";
import { RootStoreContext, useStores } from "../src/store/rootStoreContext";
import RootStore from "../src/store/rootStore";
import { useEffect } from "react";

const MockComponent: React.FC = observer(() => {
  const {
    repos: { getRepositories, loading },
  } = useStores();

  // Вызываем getRepositories при монтировании компонента
  useEffect(() => {
    getRepositories();
  }, [getRepositories]);

  return <div>{loading ? "Loading..." : "Loaded"}</div>;
});

describe("RepositoryStore", () => {
  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();

    // Мокаем метод getRepositories
    jest
      .spyOn(rootStore.repos, "getRepositories")
      .mockImplementation(async () => {
        // Симулируем асинхронное поведение
        return new Promise((resolve) => {
          setTimeout(() => {
            rootStore.repos.loading = false; // Изменяем состояние
            resolve(undefined);
          }, 100);
        });
      });

    render(
      <RootStoreContext.Provider value={rootStore}>
        <MockComponent />
      </RootStoreContext.Provider>
    );
  });

  test("Проверка метода getRepositories", async () => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Loaded")).toBeInTheDocument());
    expect(rootStore.repos.getRepositories).toHaveBeenCalled();
  });
});
