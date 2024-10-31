import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { RepositoryCard } from "../src/components/repositoryCard/RepositoryCard";
import { Repository } from "../src/utils/types";
import { expect, describe, it } from "@jest/globals";
import { mockRepositories } from "../__mocks__/mockData";

describe("RepositoryCard", () => {
  const mockRepo: Repository = mockRepositories[0];

  it("Карточка репозитория рендерится с корректными данными", () => {
    const { getByText, getByAltText } = render(
      <RepositoryCard repo={mockRepo} />
    );

    // Проверка отображения имени владельца
    expect(getByText("testUser1")).toBeInTheDocument();

    // Проверка отображения количества звезд
    expect(getByText(/⭐️: 10/)).toBeInTheDocument();

    // Проверка отображения описания
    expect(getByText("This is a test repository")).toBeInTheDocument();

    // Проверка наличия ссылки на репозиторий
    expect(
      getByText("https://github.com/testUser/test-repo")
    ).toBeInTheDocument();

    // Проверка количества форков
    expect(getByText(/Скопирован: 5/)).toBeInTheDocument();

    // Проверка даты создания
    expect(getByText(/Дата создания: 1 января 2023/)).toBeInTheDocument();

    // Проверка даты последнего изменения
    expect(
      getByText(/Дата последнего изменения: 2 января 2023/)
    ).toBeInTheDocument();

    // Проверка отображения аватара
    expect(getByAltText("Аватар пользователя testUser1")).toHaveAttribute(
      "src",
      "https://example.com/avatar.png"
    );
  });

  it('Отображается "Нет описания" если нет описания', () => {
    const repoWithoutDescription = { ...mockRepo, description: "" };

    const { getByText } = render(
      <RepositoryCard repo={repoWithoutDescription} />
    );

    // Проверка отображения текста "Нет описания"
    expect(getByText("Нет описания")).toBeInTheDocument();
  });
});
