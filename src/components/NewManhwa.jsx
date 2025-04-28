import { fetchAnime } from '../utils/fetch.js';
import { useEffect, useState } from 'react';
import CardNewManhwa from '../components/CardNewManhwa.jsx'; // jangan lupa path-nya sesuai ya

export default function NewManhwa() {
  const [manhwas, setManhwas] = useState([]);

  useEffect(() => {
    async function getManhwas() {
      const data = await fetchAnime('manhwa-new');
      if (data) {
        setManhwas(data);
      }
    }
    getManhwas();
  }, []);

  return (
    <section className="w-full h-36 overflow-hidden p-3">
      <div className="w-full h-full flex gap-x-3 overflow-x-scroll mt-1 pl-2 hide-scrollbar">
        {manhwas.map((manhwa, index) => (
          <CardNewManhwa
            key={index}
            title={manhwa.title}
            link={manhwa.link}
            imageSrc={manhwa.imageSrc}
            latestChapter={manhwa.chapters[0]} // ambil hanya chapter terbaru
          />
        ))}
      </div>
    </section>
  );
}
