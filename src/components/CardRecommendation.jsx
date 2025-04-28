import { Link } from "react-router-dom";

export default function CardRecommendation({ title, chapter, rating, imageSrc, link }) {
    // Ambil slug dari link
    const slug = link.split("/manga/")[1]?.replaceAll("/", ""); 

    return (
      <Link to={`/manhwa-detail/${slug}`} className="w-[97%] hover:scale-95 duration-500 aspect-[2/3] relative">
        <div className="w-full px-1 h-[10%] absolute flex justify-between items-center">
          <p className="text-xs card rounded-full px-1">{rating} ⭐</p>
          <p className="text-xs card rounded-full px-1">{chapter}</p>
        </div>
        <div className="w-full h-[80%]">
          <img src={imageSrc} alt={title} className="w-full h-full rounded-md object-cover" />
        </div>
        <p className="text-wrap text-xs">{title}</p>
      </Link>
    );
}
