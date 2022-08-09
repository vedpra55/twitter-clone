import {
  ChartSquareBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

export default function Post({ post, handleDelete, user }) {
  return (
    <div className="flex p-3 w-full cursor-pointer border-b  border-b-gray-200">
      {/* user image */}
      <img
        className="w-10 h-10 object-cover rounded-full "
        src={post.userImg}
        alt="user image"
      />
      {/* right side */}
      <div className="ml-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex space-x-1 items-center  whitespace-nowrap">
            <Link href={`/${post?.userName}`}>
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post.userName}
              </h4>
            </Link>
            <span className="text-sm sm:text-[15px]">@{post.userName}</span>
            <span className="text-sm sm:text-[16px] hover:underline"></span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className="h-10  w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* post text  */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.text}
        </p>
        {/* post image */}
        {post?.postImg && (
          <img
            className="rounded-2xl mr-2"
            src={post?.postImg}
            alt={post.text}
          />
        )}
        {/* post icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon className="h-12 w-12 hoverEffect hover:bg-sky-100 hover:text-sky-500" />
          {post?.userId === user?.id && (
            <TrashIcon
              onClick={() => handleDelete(post.id)}
              className="h-12 w-12 hoverEffect hover:bg-red-100 hover:text-red-500"
            />
          )}
          <HeartIcon className="h-12 w-12 hoverEffect hover:bg-red-100 hover:text-red-500" />
          <ShareIcon className="h-12 w-12 hoverEffect hover:bg-sky-100 hover:text-sky-500" />
          <ChartSquareBarIcon className="h-12 w-12 hoverEffect hover:bg-sky-100 hover:text-sky-500" />
        </div>
      </div>
    </div>
  );
}
