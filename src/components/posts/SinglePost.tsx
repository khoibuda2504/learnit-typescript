import ActionButtons from "./ActionButtons";
import { PostType } from "../../types/Post";
import { PostStatus } from "../../enums/Post";
const mappedClass = {
  border: {
    [PostStatus.TO_LEARN]: "border-red-500",
    [PostStatus.LEARNING]: "border-yellow-500",
    [PostStatus.LEARNED]: "border-green-500",
  },
  bg: {
    [PostStatus.TO_LEARN]: "bg-red-500",
    [PostStatus.LEARNING]: "bg-yellow-500",
    [PostStatus.LEARNED]: "bg-green-500",
  },
};
const SinglePost = ({
  post: { _id, title, description, url, status },
}: {
  post: PostType;
}) => (
  <div className={`p-4 rounded shadow border-2 ${mappedClass.border[status]}`}>
    <div className="flex justify-between">
      <div>
        <h4 className="text-lg"> {title}</h4>
        <div
          className={`max-w-[100px] p-1 shadow text-white rounded-md ${mappedClass.bg[status]}`}
        >
          {status}
        </div>
      </div>
      <ActionButtons url={url} _id={_id} />
    </div>
    <p className="text-[#888]">{description}</p>
  </div>
);

export default SinglePost;
