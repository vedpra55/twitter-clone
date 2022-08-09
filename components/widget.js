import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import News from "./news";

export default function Widget({ newsResult }) {
  const [newsIndex, setNewsIndex] = useState(3);

  return (
    <div className="xl:w-[600px] hidden xl:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full relative">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            className="absolute inset-0 rounded-full pl-11 border-gray-500  text-gray-700 border hover:shadow-lg bg-gray-100 focus:bg-white"
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div className="space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>

        {newsResult.slice(0, newsIndex).map((item, i) => (
          <News item={item} key={i} />
        ))}
        <button
          onClick={() => setNewsIndex(newsIndex + 3)}
          className="text-blue-300 pl-4  pb-3 hover:text-blue-400"
        >
          Show More
        </button>
      </div>
    </div>
  );
}
