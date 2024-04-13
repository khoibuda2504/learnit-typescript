import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { usePostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }: { url: string | undefined; _id: string }) => {
  const { deletePost, findPost, setShowUpdatePostModal } = usePostContext();

  const choosePost = (postId: string) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <div>
      <button className="mr-3 relative top-1" onClick={() => window.open(url, "_blank")}>
        <img src={playIcon} alt="playIcon" width={32} height="32" />
      </button>
      <button className="mr-3" onClick={() => choosePost(_id)}>
        <img src={editIcon} alt="editIcon" width={24} height="24" />
      </button>
      <button onClick={() => deletePost(_id)}>
        <img src={deleteIcon} alt="deleteIcon" width={24} height="24" />
      </button>
    </div>
  );
};

export default ActionButtons;
