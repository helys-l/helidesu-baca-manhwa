import { fetchAnime } from "../utils/fetch";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Footer from '../components/Footer';
import LoadingAnimation from '../components/loadingAnimation/Loading.jsx';

export default function ManhwaChapter() {
    const { idChapter } = useParams();
    const navigate = useNavigate();
    const [manhwa, setManhwa] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getManhwa() {
            setManhwa(null);
            setLoading(true);
            const data = await fetchAnime(`chapter/${idChapter}`);
            if (data) setManhwa(data);
            setLoading(false);
        }
        getManhwa();
    }, [idChapter]);

    const handleNavigation = (url) => {
        if (!url || loading) return;
        const parts = url.split('/');
        const chapterSlug = parts[parts.length - 2];
        navigate(`/chapter/${chapterSlug}`);
    };

    return (
        <>
        <main className="w-screen h-auto min-h-screen flex flex-col gap-x-7 md:p-6">
            <div className="w-screen mt-1 md:w-[95%] mx-auto h-auto">
                <Header />

                {/* Tombol Atas */}
                <div className="w-full h-12 md:h-24 card rounded-xl gap-x-2 flex justify-center items-center mt-1 mb-1">
                    <button
                        onClick={() => handleNavigation(manhwa?.prevChapter)}
                        disabled={!manhwa?.prevChapter || loading}
                        className={`w-10 md:w-20 flex justify-center text-sm items-center aspect-[2/1] acc rounded-md transition 
                            ${!manhwa?.prevChapter || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95'}`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => handleNavigation(manhwa?.nextChapter)}
                        disabled={!manhwa?.nextChapter || loading}
                        className={`w-10 md:w-20 flex justify-center text-sm items-center aspect-[2/1] acc rounded-md transition 
                            ${!manhwa?.nextChapter || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95'}`}
                    >
                        Next
                    </button>
                </div>

                {/* Gambar */}
                <div className="w-full h-auto card rounded-xl mt-1 p-3">
                    {loading || !manhwa ? (
                        <div className="w-full min-h-[30rem] flex justify-center items-center">
                            <LoadingAnimation />
                        </div>
                    ) : (
                        <>
                        <h1 className="text-sm w-full text-center mb-1">{manhwa.title}</h1>
                        {manhwa.images.map((image, index) => (
                            <div key={index} className="w-full mx-auto min-h-screen md:w-2/3 h-auto">
                                <img src={image} alt={`Page ${index + 1}`} className="w-full h-auto" />
                            </div>
                        ))}
                        </>
                    )}
                </div>

                {/* Tombol Bawah */}
                <div className="w-full h-12 md:h-24 card rounded-xl gap-x-2 text-sm flex justify-center items-center mt-1 mb-1">
                    <button
                        onClick={() => handleNavigation(manhwa?.prevChapter)}
                        disabled={!manhwa?.prevChapter || loading}
                        className={`w-10 md:w-20 flex justify-center items-center aspect-[2/1] acc rounded-md transition 
                            ${!manhwa?.prevChapter || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95'}`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => handleNavigation(manhwa?.nextChapter)}
                        disabled={!manhwa?.nextChapter || loading}
                        className={`w-10 md:w-20 flex justify-center text-sm items-center aspect-[2/1] acc rounded-md transition 
                            ${!manhwa?.nextChapter || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-95'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
}
