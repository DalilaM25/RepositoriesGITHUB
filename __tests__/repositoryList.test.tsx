import { fireEvent, render, screen } from "@testing-library/react";
import RepositoriesList from "../src/components/reposList/RepositoriesList";
import { useStores } from "../src/store/rootStoreContext";
import {
  MockDOMRect,
  MockIntersectionObserver,
  mockRepos,
} from "../__mocks__/mockData";

// Назначаем MockDOMRect в глобальный объект
global.DOMRect = MockDOMRect as any;

// Назначаем MockIntersectionObserver в глобальный объект
global.IntersectionObserver = MockIntersectionObserver as any;

// Мокаем хук useStores
jest.mock("../src/store/rootStoreContext", () => ({
  useStores: jest.fn(),
}));

//Мокаем компонент Modal
jest.mock("../src/components/modal/Modal", () => ({
  Modal: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="mock-modal">
      <button onClick={onClose}>Close Modal</button>
      {children}
    </div>
  ),
}));

describe("RepositoriesList", () => {
  beforeEach(() => {
    (useStores as jest.Mock).mockReturnValue({
      repos: mockRepos,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("проверка индикатора загрузки", () => {
    (useStores as jest.Mock).mockReturnValueOnce({
      repos: {
        ...useStores().repos,
        loading: true,
      },
    });

    render(<RepositoriesList />);

    expect(screen.getByTestId("spin")).toBeInTheDocument();
  });
  test("удаление репозитория", () => {
    render(<RepositoriesList />);
    fireEvent.click(screen.getAllByRole("button", { name: "delete" })[0]);
    expect(mockRepos.removeRepositoryByID).toHaveBeenCalledWith(1);
  });
  test("открытие модального окна", () => {
    render(<RepositoriesList />);
    fireEvent.click(screen.getAllByRole("button", { name: "edit" })[0]);
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });
  test("закрытие модального окна", () => {
    render(<RepositoriesList />);
    fireEvent.click(screen.getAllByRole("button", { name: "edit" })[0]);
    fireEvent.click(screen.getByRole("button", { name: /Отмена/ }));
    expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
  });

  test("проверка пагинации", async () => {
    render(<RepositoriesList />);

    const loader = screen.getByTestId("loaderRef");
    fireEvent.scroll(loader, { target: { scrollY: 100 } });

    expect(mockRepos.setPage).toHaveBeenCalledWith(2);
    expect(mockRepos.getRepositories).toHaveBeenCalled();
  });
});
