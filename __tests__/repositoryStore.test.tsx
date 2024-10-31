import RepositoryStore from "../src/store/repositoryStore"; // Импортируем синглтон
import { fetchRepositories } from "../src/api/fetchRepository"; // Импортируем функцию для загрузки репозиториев

jest.mock("../src/api/fetchRepository"); // Мокаем API

describe("RepositoryStore", () => {
  let store: typeof RepositoryStore;

  beforeEach(() => {
    store = RepositoryStore; // Используем экспортированный экземпляр
    // Сбрасываем состояние перед каждым тестом
    store.page = 1;
    store.repositories = [];
    store.loading = false;
    store.err = null;
    store.totalPages = 0;
    store.filter = "stars";
    store.order = "asc";
  });

  it("должен иметь начальное состояние", () => {
    expect(store.page).toBe(1);
    expect(store.repositories).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.err).toBe(null);
    expect(store.totalPages).toBe(0);
    expect(store.filter).toBe("stars");
    expect(store.order).toBe("asc");
  });

  it("должен загружать репозитории", async () => {
    const mockData = {
      items: [
        { id: 1, name: "repo1" },
        { id: 2, name: "repo2" },
      ],
      total_count: 2,
    };
    (fetchRepositories as jest.Mock).mockResolvedValue(mockData);

    await store.getRepositories();

    expect(store.loading).toBe(false);
    expect(store.repositories).toEqual(mockData.items);
    expect(store.totalPages).toBe(mockData.total_count);
  });

  it("должен обрабатывать ошибки при загрузке", async () => {
    (fetchRepositories as jest.Mock).mockRejectedValue(
      new Error("Ошибка загрузки")
    );

    await store.getRepositories();

    expect(store.loading).toBe(false);
    expect(store.err).toBe("Ошибка при загрузке репозиториев");
    expect(store.repositories).toEqual([]); // Проверяем, что репозитории не изменились
  });

  it("должен сбрасывать репозитории при первой странице", async () => {
    const mockData = {
      items: [{ id: 1, name: "repo1" }],
      total_count: 1,
    };
    (fetchRepositories as jest.Mock).mockResolvedValue(mockData);

    await store.getRepositories(); // Загружаем первую страницу
    expect(store.repositories).toEqual(mockData.items);

    store.page = 2; // Переходим на вторую страницу
    await store.getRepositories(); // Загружаем вторую страницу
    expect(store.repositories).toEqual(mockData.items); // Проверяем, что репозитории не сбрасываются
  });
});
