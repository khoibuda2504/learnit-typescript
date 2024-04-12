export type PostType = {
  _id: string;
  title?: string;
  description?: string;
  url?: string;
};
export type PostReducerState = {
  posts: PostType[];
  postsLoading: boolean;
  post: PostType;
};
export type ShowToastType = {
  show: boolean;
  message: string;
  type: "success" | "error" | null;
};

