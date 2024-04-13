import { PostStatus } from "../enums/Post";

export type PostType = {
  _id: string;
  title?: string;
  description?: string;
  url?: string;
  status: PostStatus;
};
export type PostReducerState = {
  posts: PostType[];
  postLoading: boolean;
  post: PostType;
};
export type ShowToastType = {
  show: boolean;
  message: string;
  type: "success" | "danger" | null;
};
