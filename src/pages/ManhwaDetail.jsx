import { useEffect, useState } from "react";
import { fetchAnime } from "../utils/fetch";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';


export default function ManhwaDetail() {
    const { slug } = useParams(); 
    const [manhwa, setManhwa] = useState(null);

    useEffect(() => {
        async function getManhwa() {
            const data = await fetchAnime(`manhwa-detail/${slug}`);
            if (data) setManhwa(data);
        }
        getManhwa();
    }, [slug]);

    if (!manhwa) {
        return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <>
        <main className='w-screen h-auto min-h-screen flex flex-col gap-x-7 md:p-6 md:flex-row'>
            <div className="w-screen mt-1 md:w-2/3 h-auto">
                <Header />
                <section className="w-full h-auto flex flex-col justify-center items-center min-h-[35rem] card rounded-xl mt-1 md:flex-row gap-3">
                    <div className="w-1/3 p-2 h-auto">
                        <img
                            src={manhwa.imageSrc}
                            alt={manhwa.title}
                            className="w-full aspect-[2/3] object-cover rounded-xl"
                        />
                    </div>
                    <div className="md:w-2/3 w-full px-7 h-auto flex flex-col p-3 min-h-[rem] justify-center items-start gap-2">
                        <h1 className="text-2xl font-bold">{manhwa.title}</h1>
                        <p className="text-sm"><strong>Alternative:</strong> {manhwa.alternative}</p>
                        <p className="text-sm"><strong>Rating:</strong> {manhwa.rating} ⭐</p>
                        <p className="text-sm"><strong>Author:</strong> {manhwa.author}</p>
                        <p className="text-sm"><strong>Artist:</strong> {manhwa.artist}</p>
                        <p className="text-sm"><strong>Status:</strong> {manhwa.status}</p>
                        <p className="text-sm"><strong>Updated On:</strong> {manhwa.updatedOn}</p>
                        <p className="text-sm">
                            <strong>Genre:</strong>{" "}
                            {manhwa.genres.map((g, i) => {
                                // Ekstrak id dari link
                                const genreId = g.genreLink.split("/genres/")[1]?.replaceAll("/", "");
                                return (
                                    <span key={i}>
                                        <Link to={`/genre/${genreId}`} className="text-blue-500 hover:underline">
                                            {g.genreName}
                                        </Link>
                                        {i < manhwa.genres.length - 1 ? ", " : ""}
                                    </span>
                                );
                            })}
                        </p>

                        <p className="text-sm"><strong>Description:</strong> {manhwa.synopsis}</p>
                    </div>
                </section>
            </div>

            {/* Chapter Section */}
            <div className="w-full h-auto md:w-[30%] card mt-2 md:mt-0 rounded-xl p-2">
                <h2 className="text-lg font-semibold mb-2">Chapters</h2>
                <div className="max-h-[35rem]  w-[95%] h-auto grid grid-cols-2 md:grid-cols-3 mx-auto overflow-y-scroll hide-scrollbar gap-2">
                    {manhwa.chapters.map((chapter, idx) =>{
                        const idChapter = chapter.chapterLink.split("/komikstation.co/")[1]?.replaceAll("/", "");
                        return (
                            <div key={idx} className="acc rounded-xl hover:scale-95 duration-500 text-sm flex flex-col p-3 gap-1">
                                <Link
                                    to={`/chapter/${idChapter}`}
                                    rel="noopener noreferrer"
                                    className=" hover:underline font-bold"
                                >
                                    {chapter.chapterNum}
                                </Link>
                                <p className="text-xs">{chapter.chapterDate}</p>
                                <a
                                    href={chapter.downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" hover:underline text-xs"
                                >
                                    Download
                                </a>
                            </div>
                        )

                        
                    } )}
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
}
