import { fetchAnime } from '../utils/fetch.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Genre() {
  const [genres, setGenres] = useState([]);
  
  // Daftar kata/genre yang ingin difilter
  const filterWords = ['doujinshi', 'lolicon', 'yaoi','ecchi', 'shotacon','yuri',]; // Tambahkan kata-kata yang ingin difilter

  useEffect(() => {
    async function getGenres() {
      const data = await fetchAnime('genres');
      if (data && data.genres) {
        // Filter genre yang tidak ada dalam filterWords
        const filteredGenres = data.genres.filter(genre => 
          !filterWords.includes(genre.label.toLowerCase()) // Periksa apakah genre ada dalam filterWords
        );
        setGenres(filteredGenres);
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
