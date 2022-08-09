import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { ThreeDots } from "react-loader-spinner";
import { useRef } from "react";

import React from "react";

import ProfileBanner from "./profile/profileBanner";
import profilePic from "./profile/profilePic";
import ProfilePic from "./profile/profilePic";

function EditProfileModal({
  isOpen,
  setOpen,
  bio,
  name,
  profileImg,
  bannerImg,
  setProfileImgFile,
  setBannerImgFile,
  setProfileImg,
  setBannerImg,
  progress,
  setBio,
  setName,
  handleSave,
  saveBtnClick,
}) {
  const profileImgRef = useRef(null);
  const bannerImgRef = useRef(null);

  function handleBannerImage(e) {
    const image = e.target.files[0];
    setBannerImgFile(image);
    setBannerImg(URL.createObjectURL(image));
  }

  function handleProfileImage(e) {
    const image = e.target.files[0];
    setProfileImgFile(image);
    setProfileImg(URL.createObjectURL(image));
  }

  return (
    <Modal
      className="sm:w-[80%] xl:w-[40%] z-100 overflow-y-scroll bg-white h-[80%] rounded-md absolute top-[20%] translate-y-[-20%] left-[50%] translate-x-[-50%]"
      isOpen={isOpen}
    >
      <div className="mx-1 mb-5">
        <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-white z-50">
          <div className="flex gap-x-10 items-center">
            <XIcon
              onClick={() => setOpen(false)}
              className="h-6 cursor-pointer  text-black "
            />
            <p className="text-xl font-semibold">Edit Profile</p>
          </div>
          <div>
            <button
              onClick={handleSave}
              className="bg-black text-white hover:bg-black/80 px-4 py-1 rounded-2xl"
            >
              {saveBtnClick ? (
                <ThreeDots width={25} height={25} color="white" />
              ) : (
                <p>Save</p>
              )}
            </button>
          </div>
        </div>

        {/* Banner Section */}
        <ProfileBanner
          bannerImg={bannerImg}
          ref={bannerImgRef}
          progress={progress}
          handleBannerImage={handleBannerImage}
        />

        {/* Profile Section */}
        <ProfilePic
          profileImg={profileImg}
          ref={profileImgRef}
          progress={progress}
          handleProfileImg={handleProfileImage}
        />

        <div className="flex flex-col px-4 pt-4 gap-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md w-full"
            type="text"
            placeholder="Name"
          />
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="rounded-md w-full h-24"
            type="text"
            placeholder="Bio"
          />
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
