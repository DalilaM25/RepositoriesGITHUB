import { observer } from "mobx-react-lite";
import { Repository } from "../api/getRepositiries";

type RepoInfoProps = {
  repo: Repository;
};

export const RepoInfo: React.FC<RepoInfoProps> = observer(({ repo }) => {
  const { owner, name, html_url, created_at, updated_at } = repo;
  const createdDate = new Date(created_at);
  const updatedDate = new Date(updated_at);

  const formattedСreatedDate = createdDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedUpdatedDate = updatedDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ul>
      <li>
        <img
          src={owner.avatar_url}
          alt={`Аватар пользователя ${owner.login}`}
        ></img>
        Пользователь: {owner.login}
      </li>
      <li>Название репозитория: {name}</li>
      <li>
        Ссылка:
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {html_url}
        </a>
      </li>
      <li>Дата создания: {formattedСreatedDate}</li>
      <li>Дата последнего изменения: {formattedUpdatedDate}</li>
    </ul>
  );
});
