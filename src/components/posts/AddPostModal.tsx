import React, { useState } from "react";
import { usePostContext } from "../../contexts/PostContext";
import Input from "../auth/Input";
import Modal from "./Modal";

const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    usePostContext();

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
  });

  const onChangeNewPostForm = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData();
    if (!message) return;
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };
  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
    });
    setShowAddPostModal(false);
  };
  const { title, description, url } = newPost;

  return (
    <Modal
      show={showAddPostModal}
      onClose={resetAddPostData}
      titleText="What do you want to learn?"
      confirmText="LearnIt!"
      onSubmit={onSubmit}
    >
      <>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={onChangeNewPostForm}
          required
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={onChangeNewPostForm}
        />
        <Input
          type="text"
          name="url"
          placeholder="Youtube Tutorial URL"
          value={url}
          onChange={onChangeNewPostForm}
        />
      </>
    </Modal>
  );
};

export default AddPostModal;
