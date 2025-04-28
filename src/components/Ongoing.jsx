import { fetchAnime } from '../utils/fetch.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewManhwa() {
  const [manhwas, setManhwas] = useState([]);

  useEffect(() => {
    async function getManhwas() {
      const data = await fetchAnime('manhwa-ongoing');
      if (data) {
        setManhwas(data);
      }
    }
    getManhwas();
  }, []);

  return (
    <section className="w-full h-auto p-3 overflow-hidden">
      <h1 className="text-sm font-bold mb-2 pl-2">The ongoing series for you</h1>
      <div className="w-full flex gap-x-3 overflow-x-scroll pl-2 hide-scrollbar">
        {manhwas.map((manhwa, index) => {
          // Ambil slug dari link
          const slug = manhwa.link.split("/manga/")[1]?.replaceAll("/", ""); 
          
          return (
            <Link 
              key={index}
              to={`/manhwa-detail/${slug}`} 
              className="flex-shrink-0 w-[120px] md:w-[140px] hover:scale-95 transition-all duration-300 aspect-[2/3] relative"
            >
              {/* Rating dan Chapter */}
              <div className="w-full px-1 h-[10%] absolute flex justify-between items-center">
                <p className="text-xs card rounded-full px-1">{manhwa.rating} ⭐</p>
                <p className="text-[8px] card rounded-full px-1">{manhwa.latestChapter}</p>
              </div>

              {/* Gambar */}
              <div className="w-full h-[80%]">
                <img
                  src={manhwa.imageUrl}
                  alt={manhwa.title}
                  className="w-full h-full rounded-md object-cover"
                />
              </div>

              {/* Judul */}
              <p className="text-wrap text-xs mt-1">{manhwa.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
