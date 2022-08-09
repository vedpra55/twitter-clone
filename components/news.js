export default function News({ item }) {
  return (
    <a href={item.url} target="_black">
      <div className="flex justify-between items-center px-4 py-2 space-x-1 hover:bg-gray-200  transition duration-200">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{item.title}</h6>
          <p className="text-xs font-medium text-gray-500">
            {item.source.name}
          </p>
        </div>
        <img
          className="rounded-xl"
          width={"70px"}
          height={"70px"}
          src={item.urlToImage !== null ? item.urlToImage : "/tree.jpg"}
        />
      </div>
    </a>
  );
}
