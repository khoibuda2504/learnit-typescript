import { PostActionType } from "../enums/Post";
import { PostReducerState, PostType } from "../types/Post";

type PostActionPayload =
  | { type: PostActionType.POSTS_LOADED_SUCCESS; payload: PostType[] }
  | { type: PostActionType.POSTS_LOADED_FAIL; payload?: never }
  | { type: PostActionType.ADD_POST; payload: PostType }
  | { type: PostActionType.DELETE_POST; payload: string }
  | { type: PostActionType.UPDATE_POST; payload: PostType }
  | { type: PostActionType.FIND_POST; payload: PostType };

export const postReducer = (
  state: PostReducerState,
  action: PostActionPayload
) => {
  const { type, payload } = action;
  switch (type) {
    case PostActionType.POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case PostActionType.POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case PostActionType.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case PostActionType.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: PostType) => post._id !== payload),
      };
    case PostActionType.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post: PostType) => {
          if (post._id === payload._id) {
            return payload;
          }
          return post;
        }),
      };
    case PostActionType.FIND_POST:
      return {
        ...state,
        post: payload,
      };
    default:
      return state;
  }
};
