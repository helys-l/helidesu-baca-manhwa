import { fetchAnime } from "../utils/fetch";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from '../components/Footer';


export default function GenreDetail() {
  const { genre } = useParams();
  const [manhwas, setManhwas] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getManhwas(url) {
    setLoading(true);
    const data = await fetchAnime(url || `genre/${genre}`);
    if (data) {
      setManhwas(data.seriesList);
      setNextPage(data.nextPage);

      const pagination = data.pagination || [];
      const prev = pagination.find(
        (p) => p.pageNumber !== "Berikutnya »" && parseInt(p.pageNumber) < parseInt(pagination.find(p => p.pageNumber === "Berikutnya »")?.pageNumber || 2)
      );
      setPrevPage(prev?.pageUrl || null);
    }
    setLoading(false);
  }

  useEffect(() => {
    getManhwas();
  }, [genre]);

  if (!manhwas) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
    <section className="w-screen h-auto min-h-screen flex flex-col gap-y-3 md:p-6">
      <Header />
      <main className="w-screen mt-1 md:w-[95%] mx-auto md:mt-0 h-auto">
        <h1 className="w-full text-center text-sm py-2">
          Manhwa by genre {genre}
        </h1>

        <div className="w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
          {manhwas.map((manhwa, index) => (
            <div
              key={index}
              className="w-full h-auto card rounded-md p-2 flex flex-col justify-center items-center"
            >
              <img
                src={manhwa.image}
                alt={manhwa.title}
                className="w-full aspect-[2/3] object-cover rounded-md"
              />
              <h2 className="text-xs font-semibold text-center">
                {manhwa.title}
              </h2>
              <p className="text-xs">{manhwa.latestChapter}</p>
              <p className="text-xs">Rating: {manhwa.rating} ⭐</p>
              <Link
                to={`/manhwa-detail/${manhwa.url
                  .split("/manga/")[1]
                  ?.replaceAll("/", "")}`}
                className="text-blue-500 text-xs hover:underline"
              >
                Read
              </Link>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center my-4 gap-4">
          {/* Tombol Prev */}
          <button
            onClick={() => {
              if (prevPage && !loading) {
                setManhwas(null); // Kosongkan dulu supaya tampil loading
                const genrePath = prevPage.split("/genres/")[1];
                getManhwas(`genre/${genrePath}`);
              }
            }}
            disabled={!prevPage || loading}
            className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded-md ${
              (!prevPage || loading)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Prev Page
          </button>

          {/* Tombol Next */}
          <button
            onClick={() => {
              if (nextPage && !loading) {
                setManhwas(null); // Kosongkan dulu supaya tampil loading
                const genrePath = nextPage.split("/genres/")[1];
                getManhwas(`genre/${genrePath}`);
              }
            }}
            disabled={!nextPage || loading}
            className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded-md ${
              (!nextPage || loading)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Next Page
          </button>
        </div>
      </main>
    </section>
    <Footer />
            </>
  );
}
