import { fetchAnime } from '../utils/fetch.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    async function getPopular() {
      const data = await fetchAnime('manhwa-popular');
      if (data) {
        setPopular(data);
      }
    }
    getPopular();
  }, []);

  return (
    <section className="w-full h-auto mt-1 md:mt-7 rounded-md card p-4">
      <h2 className="text-center text-sm font-bold mb-2">The most popular pick for you</h2>
      <div className="w-full h-full flex gap-x-3 overflow-x-scroll hide-scrollbar">
        {popular.map((item, index) => {
          const slug = item.link.split("/manga/")[1]?.replaceAll("/", "");
          return (
            <Link
              key={index}
              to={`/manhwa-detail/${slug}`}
              className="w-36 min-w-36 flex-shrink-0 flex flex-col bg-[var(--accent-color)] hover:scale-95 duration-500 rounded-md p-2"
            >
              <div className="w-full h-32 mb-2 overflow-hidden rounded">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-bold truncate">{item.title}</p>
              <p className="text-[10px]">{item.chapter}</p>
              <p className="text-[10px] font-semibold">{item.rating} ⭐</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
