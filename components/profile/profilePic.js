import { PhotographIcon } from "@heroicons/react/outline";
import React from "react";

function PropfilePicture(props, ref) {
  return props.profileImg ? (
    <div className="relative ">
      <div className="absolute inset-0 h-24 w-24 flex justify-center items-center">
        <div>
          <input
            ref={ref}
            type="file"
            onChange={(e) => props.handleProfileImg(e)}
            hidden
          />
          <PhotographIcon
            onClick={() => ref.current.click()}
            className="h-8 bg-black rounded-full p-1 cursor-pointer text-white"
          />
        </div>
        {props.progress !== 0 && (
          <div className="absolute w-12 inset-0 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <p className="text-white text-center bg-black">
              {props.progress === 100 ? "File Uploaded" : props.progress}
            </p>
          </div>
        )}
      </div>
      <img
        className=" w-24 h-24 -mt-16 rounded-full object-cover "
        src={props.profileImg}
      />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <div className="absolute ">
        <input
          ref={ref}
          type="file"
          onChange={(e) => props.handleProfileImg(e)}
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

export default React.forwardRef(PropfilePicture);
