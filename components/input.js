import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { useState, useRef } from "react";

import { ThreeDots } from "react-loader-spinner";

import { uploadPost } from "../lib/uploader";

export default function Input({ user }) {
  const [text, setText] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [postImgFile, setPostImgFile] = useState(null);
  const [isSaveBtn, setIsSaveBtn] = useState(false);
  const [progress, setProgress] = useState(0);
  const filePickerRef = useRef(null);

  async function handlePost() {
    setIsSaveBtn(true);
    const data = {
      text: text,
      userName: user?.name,
      userId: user?.id,
      userImg: user?.img,
      timeStamp: serverTimestamp(),
    };
    const postImg = postImgFile ? postImgFile : "";
    await uploadPost(data, postImg, setProgress);
    setIsSaveBtn(false);
    setPostImg(null);
    setText("");
  }

  function handleImageChange(e) {
    if (e.target.files) {
      const image = e.target.files[0];
      setPostImgFile(image);
      setPostImg(URL.createObjectURL(image));
    }
  }

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <div>
        {user?.img ? (
          <img
            className="rounded-full h-16 w-16 object-cover cursor-pointer  hover:brightness-95"
            src={user?.img}
            alt="user image"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-gray-600 flex items-center justify-center text-white">
            {user?.name.slice(0, 1)}
          </div>
        )}
      </div>
      <div className="w-full divide-y divide-gray-200">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border-none focus:ring-0 text-lg placeholder:text-gray-700 tracking-wide min-h-[50px] text-gray-700"
            rows={2}
            placeholder="What's happening"
          />
        </div>
        <div>
          {postImg && (
            <div className="relative">
              <img className="" src={postImg} alt="post image" />
              <XIcon
                onClick={() => setPostImg(null)}
                className="h-8 bg-black rounded-full p-1 hover:bg-black/50  absolute inset-0 text-white left-5 top-5 cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="flex items-center  justify-between pt-2.5">
          <div className="flex">
            <PhotographIcon
              onClick={() => filePickerRef.current.click()}
              className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
            />
            <input
              onChange={(e) => handleImageChange(e)}
              type="file"
              hidden
              ref={filePickerRef}
            />
            <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button
            onClick={handlePost}
            disabled={text ? false : true}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold disabled:opacity-50 hover:bg-blue-300"
          >
            {isSaveBtn ? (
              <ThreeDots width={25} height={25} color="white" />
            ) : (
              <p>Tweet</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
