import { createContext, useContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";
import axios from "axios";
import { PostReducerState, ShowToastType, PostType } from "../types/Post";
import { ResponsePost } from "../types/Auth";
import { PostActionType } from "../enums/Post";
type Context = {
  getPosts: () => void;
  postState: PostReducerState;
  showAddPostModal: boolean;
  setShowAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  addPost: (post: Partial<PostType>) => Promise<ResponsePost>;
  showToast: ShowToastType;
  setShowToast: React.Dispatch<React.SetStateAction<ShowToastType>>;
  deletePost: (id: string) => void;
  findPost: (id: string) => void;
  showUpdatePostModal: boolean;
  setShowUpdatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  updatePost: (post: PostType) => Promise<ResponsePost>;
};
const initialPostState: PostReducerState = {
  posts: [],
  postLoading: true,
  post: {} as PostType,
};
const initialShowToast: ShowToastType = {
  show: false,
  message: "",
  type: null,
};
export const PostContext = createContext<Context | null>(null);

const PostContextProvider = ({ children }: { children: JSX.Element }) => {
  const [postState, dispatch] = useReducer(postReducer, initialPostState);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState(initialShowToast);
  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: PostActionType.POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: PostActionType.POSTS_LOADED_FAIL });
    }
  };
  // Add post
  const addPost = async (newPost: Partial<PostType>) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: PostActionType.ADD_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  };
  // Delete post
  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: PostActionType.DELETE_POST, payload: postId });
      }
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  };
  // Find post when user is updating post
  const findPost = (postId: string) => {
    const post = postState.posts.find((post: PostType) => post._id === postId);
    if (!post) return;
    dispatch({ type: PostActionType.FIND_POST, payload: post });
  };

  // Update post
  const updatePost = async (updatedPost: PostType) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (!response.data.success) return;
      dispatch({
        type: PostActionType.UPDATE_POST,
        payload: response.data.post,
      });
      return response.data;
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  };
  const postContextData = {
    getPosts,
    postState,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
export const usePostContext = () => useContext(PostContext) as Context;
export default PostContextProvider;
