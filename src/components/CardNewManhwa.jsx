import { Link } from "react-router-dom";

export default function CardNewManhwa({ title, link, imageSrc, latestChapter }) {
  // Ambil slug dari link
  const slug = link.split("/manga/")[1]?.replaceAll("/", "");

  return (
    <div className="h-full aspect-[2/3] acc rounded-md hover:scale-95 duration-300 flex items-center justify-center flex-col">
      <Link to={`/manhwa-detail/${slug}`} className="w-[95%] h-4/5">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-md" />
      </Link>
      <div className="w-full flex justify-between items-center px-1 mt-1">
        <p className="text-[8px] truncate">{latestChapter?.chapterTitle || 'No Chapter'}</p>
        <p className="text-[8px]">{latestChapter?.timeAgo || '-'}</p>
      </div>
    </div>
  );
}
