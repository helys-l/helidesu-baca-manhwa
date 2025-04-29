import { Link } from "react-router-dom";
import Header from "../components/Header";
import HomeSection from "../components/HomeSection";
import { useEffect, useState } from "react";
import { fetchAnime } from "../utils/fetch.js";
import Footer from '../components/Footer';
import LoadingAnimation from '../components/loadingAnimation/Loading.jsx';

export default function List() {
  const [manhwas, setManhwas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getManhwas() {
      const data = await fetchAnime('list');
      if (data) {
        setManhwas(data);
      }
      setLoading(false);
    }
    getManhwas();
  }, []);

  const groupManhwasByLetter = () => {
    const grouped = {};
    manhwas.forEach(group => {
      group.manhwaList.forEach(manhwa => {
        const firstLetter = manhwa.title.charAt(0).toUpperCase();
        if (!grouped[firstLetter]) {
          grouped[firstLetter] = [];
        }
        grouped[firstLetter].push(manhwa);
      });
    });
    return grouped;
  };

  const groupedManhwas = groupManhwasByLetter();

  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <main className="w-screen h-auto min-h-screen flex flex-col gap-x-7 md:p-6 md:flex-row">
        <div className="w-screen mt-1 md:w-2/3 h-auto">
          <Header />
          <section className="w-full min-h-screen h-auto p-3 mt-1 md:mt-7 rounded-md card">
            <h1 className="w-full text-sm">List Manhwa</h1>

            {/* Navigasi huruf */}
            <div className="mt-4 h-auto w-full text-wrap">
              <h3 className="font-semibold">Pilih berdasarkan awalan huruf:</h3>
              <p className="mt-2 flex flex-wrap w-full text-xs h-auto">
                {Object.keys(groupedManhwas).sort().map(letter => (
                  <span key={letter}>
                    <a href={`#${letter}`} className="text-blue-500 mr-2">{letter}</a>
                  </span>
                ))}
              </p>
            </div>

            {/* List atau Loading */}
            <div className="w-full mt-4">
              {loading ? (
                <div className="w-full h-60 flex justify-center items-center">
                  <LoadingAnimation />
                </div>
              ) : (
                Object.keys(groupedManhwas).sort().map(letter => (
                  <div key={letter} className="mb-4">
                    <h2 id={letter} className="font-semibold text-lg">{letter}</h2>
                    <div className="flex gap-2 flex-wrap">
                      {groupedManhwas[letter].map((manhwa, index) => (
                        <Link
                          key={index}
                          to={`/manhwa-detail/${manhwa.href.split("/manga/")[1]?.replaceAll("/", "")}`}
                          className={`text-blue-500 hover:underline text-xs ${getRandomColor()} p-2 rounded-md`}
                        >
                          {manhwa.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Navigasi huruf lagi di bawah */}
            <div className="mt-4 h-auto w-auto">
              <h3 className="font-semibold">Pilih berdasarkan awalan huruf:</h3>
              <p className="mt-2 flex w-auto flex-wrap text-xs h-auto">
                {Object.keys(groupedManhwas).sort().map(letter => (
                  <span key={letter}>
                    <a href={`#${letter}`} className="text-blue-500 mr-2">{letter}</a>
                  </span>
                ))}
              </p>
            </div>
          </section>
        </div>
        <HomeSection />
      </main>
      <Footer />
    </>
  );
}
