import NewManhwa from "./NewManhwa"
import Top from "./Top"
import Ongoing from "./Ongoing"

export default function HomeSection() {
    return (
        <section className="w-full md:w-[30%] min-h-[35rem] h-auto card rounded-md mt-1 ml-0 md:ml-1"> 
            <Ongoing></Ongoing>
            <Top></Top>
            <h2 className="w-full text-center text-sm font-bold mt-1">The latest release of a series</h2>
            <NewManhwa></NewManhwa>
        </section>
    )
}