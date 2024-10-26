import { observer } from "mobx-react-lite";
import { IPromiseBasedObservable } from "mobx-utils";
import { Repository } from "../api/getRepositiries";
import { RepoInfo } from "./RepoInfo";

export type ItemProps = {
  repoPromise: IPromiseBasedObservable<Repository[]>;
  lastRepositoryRef?: (node: HTMLLIElement) => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
};

export const RepoPageItem: React.FC<ItemProps> = observer(
  ({ repoPromise, lastRepositoryRef, onEdit, onDelete }) => {
    return repoPromise.case({
      pending: () => <li>Loading...</li>,
      rejected: () => <li>Error loading</li>,
      fulfilled: (data) => (
        <>
          {data.map((item) => (
            <li key={item.id} ref={lastRepositoryRef}>
              <RepoInfo repo={item}></RepoInfo>
              <button onClick={onEdit}>🖌</button>
              <button onClick={() => onDelete(item.id)}>X</button>
            </li>
          ))}
        </>
      ),
    });
  }
);

export default RepoPageItem;
