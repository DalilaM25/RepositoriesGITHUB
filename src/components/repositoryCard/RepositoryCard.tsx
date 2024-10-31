import { observer } from "mobx-react-lite";
import { Card, Avatar, Typography } from "antd";
import { Repository } from "../../utils/types";
import styles from "./repositoryCard.module.css";

const { Title, Paragraph } = Typography;

type RepositoryCardProps = {
  repo: Repository;
};

export const RepositoryCard: React.FC<RepositoryCardProps> = observer(
  ({ repo }) => {
    const {
      owner,
      name,
      forks_count,
      stargazers_count,
      description,
      html_url,
      created_at,
      updated_at,
    } = repo;
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
      <Card className={styles.card}>
        <Card.Meta
          avatar={
            <Avatar
              className={styles.avatar}
              src={owner.avatar_url}
              alt={`Аватар пользователя ${owner.login}`}
            />
          }
          title={<span className={styles.username}>{owner.login}</span>}
          description={
            <div className={styles.customMeta}>
              <Title level={4}>
                {name} ⭐️: {stargazers_count}
              </Title>
              <Paragraph className={styles.text}>
                {description || "Нет описания"}
              </Paragraph>
              <Paragraph className={styles.text}>
                Ссылка:{" "}
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  {html_url}
                </a>
              </Paragraph>
              <Paragraph className={styles.text}>
                Скопирован: {forks_count}
              </Paragraph>
              <Paragraph className={styles.text}>
                Дата создания: {formattedCreatedDate}
              </Paragraph>
              <Paragraph className={styles.text}>
                Дата последнего изменения: {formattedUpdatedDate}
              </Paragraph>
            </div>
          }
        />
      </Card>
    );
  }
);

