import { observer } from "mobx-react-lite";
import { Card, Avatar, Typography } from "antd";
import { Repository } from "../utils/types";
import styles from "../styles/repoItem.module.css";

const { Title, Paragraph } = Typography;

type RepoItemProps = {
  repo: Repository;
};

export const RepoItem: React.FC<RepoItemProps> = observer(({ repo }) => {
  const { owner, name, description, html_url, created_at, updated_at } = repo;
  const createdDate = new Date(created_at);
  const updatedDate = new Date(updated_at);

  const formattedCreatedDate = createdDate.toLocaleDateString("ru-RU", {
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
    <Card style={{ marginBottom: 16 }}>
      <Card.Meta
        avatar={
          <Avatar
            src={owner.avatar_url}
            alt={`Аватар пользователя ${owner.login}`}
            size={100}
          />
        }
        title={<span className={styles.username}>{owner.login}</span>}
        description={
          <>
            <Title level={4}>{name}</Title>
            <Paragraph>{description || "Нет описания"}</Paragraph>
            <Paragraph>
              Ссылка:{" "}
              <a href={html_url} target="_blank" rel="noopener noreferrer">
                {html_url}
              </a>
            </Paragraph>
            <Paragraph>Дата создания: {formattedCreatedDate}</Paragraph>
            <Paragraph>
              Дата последнего изменения: {formattedUpdatedDate}
            </Paragraph>
          </>
        }
      />
    </Card>
  );
});