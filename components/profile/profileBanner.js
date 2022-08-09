import { PhotographIcon } from "@heroicons/react/outline";
import React from "react";

function ProfileBanner(props, ref) {
  return props.bannerImg ? (
    <div className="flex justify-center items-center">
      <div className="absolute ">
        <input
          ref={ref}
          type="file"
          onChange={(e) => props.handleBannerImage(e)}
          hidden
        />
        <PhotographIcon
          onClick={() => ref.current.click()}
          className="h-12 bg-black rounded-full p-2 cursor-pointer text-white"
        />
      </div>
      {props.progress !== 0 && (
        <div className="absolute w-24 inset-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
          <p className="text-white text-center bg-black">
            {props.progress === 100 ? "File Uploaded" : props.progress}
          </p>
        </div>
      )}
      <img className=" w-full h-56 object-cover " src={props.bannerImg} />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <div className="absolute ">
        <input
          ref={ref}
          type="file"
          onChange={(e) => props.handleBannerImage(e)}
          hidden
        />
        <PhotographIcon
          onClick={() => ref.current.click()}
          className="h-12 bg-black rounded-full p-2 cursor-pointer text-white"
        />
      </div>
      <div className="h-56 w-full bg-gray-200"></div>
    </div>
  );
}

export default React.forwardRef(ProfileBanner);
