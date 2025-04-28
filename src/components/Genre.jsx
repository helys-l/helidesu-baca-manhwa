import { fetchAnime } from '../utils/fetch.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Genre() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getGenres() {
      const data = await fetchAnime('genres');
      if (data && data.genres) {
        setGenres(data.genres);
      }
    }
    getGenres();
  }, []);

  return (
    <section className="w-full mt-1 md:mt-7 rounded-md h-auto card p-4">
      <h2 className="text-center text-sm font-bold mb-4">Choice genre match for you.</h2>
      <div className="text-justify text-sm acc p-2 rounded-lg">
        {genres.map((genre, index) => (
          <span key={index}>
           <Link to={`/genre/${genre.label.toLowerCase()}`} className='hover:underline'> {genre.label}</Link>
            {index !== genres.length - 1 && ', '}
          </span>
        ))}
      </div>
    </section>
  );
}
