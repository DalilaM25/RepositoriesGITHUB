import { Form, Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/rootStoreContext";
import { Repository } from "../../utils/types";
import styles from "./repoForm.module.css";
interface RepoFormProps {
  repo: Repository;
  onClose: () => void;
}

export const RepoForm: React.FC<RepoFormProps> = observer(
  ({ repo, onClose }) => {
    const {
      repos: { editRepository },
    } = useStores();

    const [form] = Form.useForm();

    const onFinish = (values: {
      name: string;
      html_url: string;
      description: string;
    }) => {
      editRepository({ ...repo, ...values });
      onClose();
    };

    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
        }}
        onFinish={onFinish}
        className={styles.customForm}
      >
        <Form.Item
          label="Название репозитория"
          name="name"
          rules={[{ required: true, message: "Пожалуйста, введите название!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="URL репозитория" name="html_url">
          <Input />
        </Form.Item>
        <Form.Item>
          <div className={styles.buttons}>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
            <Button type="default" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
);
