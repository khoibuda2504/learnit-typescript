import { useState, useEffect } from "react";
import { usePostContext } from "../../contexts/PostContext";
import Input from "../auth/Input";
import Modal from "./Modal";
import { PostStatus } from "../../enums/Post";

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = usePostContext();
  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);
  const [updatedPost, setUpdatedPost] = useState(post);

  const onChangeUpdatedPostForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    if (!message) return;
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };
  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };
  const { title, description, url, status } = updatedPost;
  return (
    <Modal
      show={showUpdatePostModal}
      onClose={closeDialog}
      titleText="Making progress?"
      confirmText="LearnIt!"
      onSubmit={onSubmit}
    >
      <>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={title ?? ""}
          onChange={onChangeUpdatedPostForm}
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={description ?? ""}
          onChange={onChangeUpdatedPostForm}
        />
        <Input
          type="text"
          name="url"
          placeholder="Youtube tutorial URL"
          value={url ?? ""}
          onChange={onChangeUpdatedPostForm}
        />
        <select
          className="w-full p-2 border-2 border-gray-200 rounded my-2"
          name="status"
          value={status ?? ""}
          onChange={onChangeUpdatedPostForm}
        >
          <option value={PostStatus.TO_LEARN}>TO LEARN</option>
          <option value={PostStatus.LEARNING}>LEARNING</option>
          <option value={PostStatus.LEARNED}>LEARNED</option>
        </select>
      </>
    </Modal>
  );
};

export default UpdatePostModal;
