import Image from "next/image";
import SlidebarMenuIcon from "./slidebarMenuIcon";

import Link from "next/link";

import { DotsHorizontalIcon, HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  InboxIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";

export default function SlideBar({ user }) {
  const profile = user?.name === undefined ? "#" : user?.name;

  const items = [
    { text: "Home", Icon: HomeIcon, active: true, href: "#" },
    { text: "Explore", Icon: HashtagIcon, href: "#" },
    { text: "Notification", Icon: BellIcon, href: "#" },
    { text: "Message", Icon: InboxIcon, href: "#" },
    { text: "Bookmarks", Icon: BookmarkIcon, href: "#" },
    { text: "Lists", Icon: ClipboardIcon, href: "#" },
    { text: "Profile", Icon: UserIcon, href: profile },
    { text: "More", Icon: DotsCircleHorizontalIcon, href: "#" },
  ];

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Twitter Logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1 mt-2">
        <Image
          width={"50"}
          height={"50"}
          src="https://toppng.com/uploads/preview/twitter-logo-11549680523gyu1fhgduu.png"
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        {items.map((item, i) => (
          <SlidebarMenuIcon
            key={i}
            active={item.active}
            text={item.text}
            Icon={item.Icon}
            link={item.href}
          />
        ))}
      </div>

      {/* Button */}
      <button className="bg-blue-400 text-white  rounded-full w-56 h-12 font-bold shadow-md  hover:brightness-95 text-lg hidden xl:inline-block">
        Tweet
      </button>

      {/* Menu Profile */}
      <div className="gap-x-2 hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        {user?.img ? (
          <img
            className="rounded-full h-12 w-12 object-cover cursor-pointer  hover:brightness-95"
            src={user?.img}
            alt="user image"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center text-white">
            {user?.name.slice(0, 1)}
          </div>
        )}
        {user && (
          <>
            <div className="leading-5 hidden xl:inline">
              <Link href={user.name}>
                <h4 className="font-bold">{user?.name}</h4>
              </Link>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </>
        )}
      </div>
    </div>
  );
}
