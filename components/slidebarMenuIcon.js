import Link from "next/link";

export default function SlidebarMenuIcon({ text, Icon, active, link }) {
  return (
    <Link href={`/${link}`}>
      <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start  space-x-3">
        <Icon className="h-7" />
        <span className={` ${active && "font-bold"} hidden xl:inline-block `}>
          {text}
        </span>
      </div>
    </Link>
  );
}
