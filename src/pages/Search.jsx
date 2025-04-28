import Header from "../components/Header";
import { useState } from "react";
import { fetchAnime } from "../utils/fetch.js";
import { Link } from "react-router-dom";
import HomeSection from "../components/HomeSection";
import Footer from '../components/Footer';
import Searchicon from '../icon/search2.gif'


export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!searchInput.trim()) return; // kalau kosong, jangan fetch
    setLoading(true);
    const data = await fetchAnime(`/search/${searchInput}`);
    if (data && data.seriesList) {
      setSearchResult(data.seriesList);
    } else {
      setSearchResult([]);
    }
    setLoading(false);
  }

  return (
    <>
    <section className="w-screen h-auto min-h-screen flex flex-col gap-x-7 md:p-6 md:flex-row">
      <div className="w-screen mt-1 md:w-2/3 h-auto">
        <Header />

        {/* Input dan Tombol Search */}
        <div className="w-full h-12 mt-7 card flex pt-2 gap-x-2 justify-center items-center rounded-t-md">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search manhwa or manga..."
            className="w-[80%] h-[90%] p-2 rounded-md border"
          />
          <button
            onClick={handleSearch}
            className="h-[90%] aspect-square overflow-hidden rounded-full acc flex justify-center items-center hover:scale-95 duration-500"
          >
            <img src={Searchicon} alt="" className="w-[90%] aspect-square rounded-full" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-sm w-full py-4 text-center card rounded ">
          Search Result
        </h1>

        {/* Hasil Search */}
        <div className="w-full h-auto min-h-screen rounded-b-md card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {loading ? (
            <div className="col-span-full w-full text-center">Loading...</div>
          ) : searchResult.length > 0 ? (
            searchResult.map((item, index) => {
              const slug = item.url.split("/manga/")[1]?.replaceAll("/", "");
              return (
                <Link
                  key={index}
                  to={`/manhwa-detail/${slug}`}
                  className="w-36 min-w-36 flex-shrink-0 flex flex-col bg-[var(--accent-color)] hover:scale-95 duration-500 rounded-md p-2"
                >
                  <div className="w-full h-32 mb-2 overflow-hidden rounded">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold truncate">{item.title}</p>
                  <p className="text-[10px]">{item.latestChapter}</p>
                  <p className="text-[10px] font-semibold">{item.rating} ⭐</p>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full w-full text-center">
              No result found.
            </div>
          )}
        </div>
      </div>

      <HomeSection />
    </section>
    <Footer />
    </>
  );
}
