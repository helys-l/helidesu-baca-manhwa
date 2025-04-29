import { fetchAnime } from '../utils/fetch.js';
import { useEffect, useState } from 'react';
import CardTop from '../components/CardTop.jsx'; // pastikan path-nya benar

export default function Top() {
  const [topManhwas, setTopManhwas] = useState([]);

  useEffect(() => {
    async function getTopManhwas() {
      const data = await fetchAnime('manhwa-top');
      if (data) {
        setTopManhwas(data);
      }
    }
    getTopManhwas();
  }, []);

  return (
    <section className="w-full min-h-52 h-auto p-3 mt-4">
      <h3 className="w-full font-bold text-lg text-center">Top 5</h3>
      <div className="w-[95%] h-auto grid grid-cols-3 px-2 gap-2">
        {topManhwas.map((manhwa, index) => (
          <CardTop
            key={index}
            rank={manhwa.rank}
            title={manhwa.title}
            image={manhwa.image}
            genres={manhwa.genres}
            url={manhwa.url}
          />
        ))}
      </div>
    </section>
  );
}
