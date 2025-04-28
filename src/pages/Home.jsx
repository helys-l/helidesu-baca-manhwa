import Header from '../components/Header';
import Recomendation from '../components/Recomendation';
import HomeSection from '../components/HomeSection';
import Genre from '../components/Genre';
import Popular from '../components/Popular';
import Footer from '../components/Footer';


export default function Home() {
    return (
        <>
        <main className='w-screen h-auto min-h-screen flex flex-col gap-x-7 md:p-6 md:flex-row'>
            <div className="w-screen mt-1 md:w-2/3 h-auto ">
            <Header></Header>
            <Recomendation></Recomendation>
            <Genre></Genre>
            <Popular></Popular>
            </div>
            <HomeSection></HomeSection>
        </main>
        <Footer></Footer>
        </>
        
    );
}