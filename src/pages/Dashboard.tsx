import { useEffect } from "react";
import { usePostContext } from "../contexts/PostContext";
import { useAuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import { Skeleton } from "../components";
import Button from "../components/layout/Button";
import Toast from "../components/layout/Toast";

const Dashboard = () => {
  const { authState } = useAuthContext();
  const {
    postState: { posts, postLoading },
    getPosts,
    setShowAddPostModal,
  } = usePostContext();
  useEffect(() => {
    getPosts();
  }, []);
  let body = null;
  if (postLoading) {
    body = <Skeleton />;
  } else if (posts.length === 0) {
    body = (
      <div className="text-center border m-10 rounded-md border-slate-300">
        <div className="bg-black bg-opacity-5 p-4 border-b border-slate-300 text-[#888] font-500 text-3xl">
          Hi {authState?.user?.username}
        </div>
        <div className="flex flex-col text-center">
          <h3>Welcome to LearnIt</h3>
          <p className="text-[#888]">
            Click the button below to track your first skill to learn
          </p>
          <Button
            className="max-w-[200px] mx-auto my-3"
            variant="primary"
            onClick={() => setShowAddPostModal(true)}
          >
            LearnIt!
          </Button>
        </div>
      </div>
    );
  } else {
    body = (
      <>
        <div className="mt-3 p-2 flex flex-wrap items-center">
          {posts.map((post) => (
            <div key={post._id} className="w-full md:w-1/3 px-2 my-2">
              <SinglePost post={post} />
            </div>
          ))}
        </div>
        <div className="fixed bottom-10 right-10">
          <button onClick={() => setShowAddPostModal(true)}>
            <img src={addIcon} alt="addIcon" width={40} height={40} />
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPostModal />
      <UpdatePostModal />
      <Toast />
    </>
  );
};

export default Dashboard;
