import { ArrowLeftIcon, CalendarIcon } from "@heroicons/react/outline";
import Link from "next/link";
import EditProfileModal from "./editProfileModal";
import { useState, useEffect } from "react";
import { uploadFile, updateProfileData } from "../lib/uploader";
import { useRouter } from "next/router";

export default function ProfileFeed({ user, Logout }) {
  const [isOpen, setOpen] = useState(false);

  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [profileImg, setProfileImg] = useState(user?.img);
  const [bannerImg, setBannerImg] = useState(user?.bannerImg);

  const [profileImgFile, setProfileImgFile] = useState(null);
  const [bannerImgFile, setBannerImgFile] = useState(null);

  const [imageProgress, setImageProgress] = useState(0);

  const [saveBtnClick, setSaveBtnClick] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setName(user?.name);
    setBio(user?.bio), setProfileImg(user?.img);
    setBannerImg(user?.bannerImg);
  }, [user]);

  async function handleSave() {
    setSaveBtnClick(true);

    if (profileImgFile) {
      await uploadFile(
        profileImgFile,
        "img",
        "user",
        setImageProgress,
        user?.id
      );
    }

    if (bannerImgFile) {
      await uploadFile(
        bannerImgFile,
        "bannerImg",
        "user",
        setImageProgress,
        user?.id
      );
    }

    const data = {
      name: name,
      bio: bio,
    };
    await updateProfileData(data, user?.id);
    setOpen(false);
    setSaveBtnClick(false);
    setImageProgress(0);
  }

  function handleLogout() {
    Logout();
    router.push("/");
  }

  return (
    <div
      className={`xl:ml-[375px] border-l border-r xl:min-w-[576px] border-gray-200 sm:ml-[73px] flex-grow max-w-xl ${
        isOpen && "brightness-90"
      }`}
    >
      <div className="flex py-2 px-3 sticky top-0 z-50 border-b border-gray-100  ">
        <div className=" flex items-center justify-center px-0  w-9 h-9">
          <Link href="/">
            <ArrowLeftIcon className="h-5 cursor-pointer" />
          </Link>
        </div>
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer ml-5">
          {user?.name}
        </h2>
      </div>

      {user.bannerImg ? (
        <img className="w-full h-56 object-cover" src={bannerImg} />
      ) : (
        <div className="bg-gray-200 w-full h-56"></div>
      )}

      <div className="gap-y-5 mx-5 flex flex-col">
        <div className="flex justify-between items-center">
          {user?.img ? (
            <img
              className="rounded-full -mt-16 h-32 w-32 object-cover cursor-pointer  hover:brightness-95"
              src={user?.img}
              alt="user image"
            />
          ) : (
            <div className="h-32 w-32  -mt-16 rounded-full bg-gray-600 flex items-center justify-center text-white">
              {user?.name.slice(0, 1)}
            </div>
          )}
          <div className="">
            <button
              onClick={() => setOpen(!isOpen)}
              className="border border-gray-300  rounded-2xl px-4 py-1 font-medium hover:bg-gray-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div>
          <p className="text-xl font-bold">{user?.name}</p>
        </div>
        <div>
          <p className="text-gray-700">
            {user?.bio ? user?.bio : "Here we go"}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <CalendarIcon className="h-8 text-gray-500" />
          <p className="text-gray-500">Join June 2022</p>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
      {user?.name && (
        <EditProfileModal
          name={name}
          setName={setName}
          bio={bio}
          setBio={setBio}
          user={user}
          profileImg={profileImg}
          bannerImg={bannerImg}
          setProfileImg={setProfileImg}
          setBannerImg={setBannerImg}
          setProfileImgFile={setProfileImgFile}
          setBannerImgFile={setBannerImgFile}
          progress={imageProgress}
          setOpen={setOpen}
          isOpen={isOpen}
          handleSave={handleSave}
          saveBtnClick={saveBtnClick}
          setSaveBtnClick={setSaveBtnClick}
        />
      )}
    </div>
  );
}
