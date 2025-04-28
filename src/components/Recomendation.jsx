// src/components/Recommendation.jsx
import { useEffect, useState } from 'react';
import CardRecommendation from './CardRecommendation';
import{ fetchAnime }  from '../utils/fetch.js';

export default function Recommendation() {
  const [manhwas, setManhwas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadManhwa() {
      const data = await fetchAnime('manhwa-recommendation');
      if (data) {
        // Acak data
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        // Ambil 12 item pertama
        const selected = shuffled.slice(0, 12);
        setManhwas(selected);
      }
      setLoading(false);
    }
    loadManhwa();
  }, []);

  return (
    <>
    <h2 className='w-full text-center card rounded-md mt-1 md:mt-7 font-bold pt-6'>The perfect choice for you</h2>
    <section className="w-full grid grid-cols-2 gap-2 sm:grid-cols-5 py-5 px-2 md:grid-cols-6 h-auto min-h-[20rem] card ">
      {loading ? (
        <p className="col-span-full text-center">Loading...</p>
      ) : (
        manhwas.map((manhwa, index) => (
          <CardRecommendation
            key={index}
            title={manhwa.title}
            chapter={manhwa.chapter}
            rating={manhwa.rating}
            imageSrc={manhwa.imageSrc}
            link={manhwa.link}
          />
        ))
      )}
    </section>
    </>
  );
}
