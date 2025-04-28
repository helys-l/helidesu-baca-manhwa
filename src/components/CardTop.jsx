import { Link } from "react-router-dom";

export default function CardTop({ rank, title, image, genres, url }) {
  // Ambil slug dari url
  const slug = url.split("/manga/")[1]?.replaceAll("/", "");

  return (
    <div className="w-full aspect-[2/5] relative flex flex-col hover:scale-95 duration-500 items-center">
      <p className="text-6xl absolute top-0 left-5">{rank}</p>
      <Link to={`/manhwa-detail/${slug}`} className="w-[90%] aspect-[2/3] mt-8">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
      </Link>
      <p className="text-xs mt-1 text-center line-clamp-2">{title}</p>
      {/* Semua genre ditampilkan */}
      <div className="flex flex-wrap justify-center gap-1 mt-1 px-1">
        {genres.map((genre, index) => (
          <span key={index} className="text-[10px] text-gray-500">{genre}</span>
        ))}
      </div>
    </div>
  );
}
