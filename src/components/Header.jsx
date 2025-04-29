import Switch from './Switch.jsx';
import { Link } from 'react-router-dom';
import HomeIcon from '../icon/home.gif'
import ListIcon from '../icon/list.gif'
import SearchIcon from '../icon/search.gif'

export default function Header() {
    return (
        <div className="w-full h-12 sm:h-14 md:h-20 flex justify-between items-center px-7 rounded-xl card ">
            <Switch></Switch>
            <div className='h-full w-1/2 grid-cols-3 grid gap-x-2'>
                <Link to='/' className='acc rounded-full aspect-square h-2/3  overflow-hidden my-auto hover:scale-95 duration-500 flex justify-center items-center'><img src={HomeIcon} className='h-[90%] aspect-square rounded-full' alt="" /></Link>
                <Link to='/list' className='acc rounded-full aspect-square h-2/3  overflow-hidden my-auto hover:scale-95 duration-500 flex justify-center items-center'><img src={ListIcon} className='h-[90%] aspect-square rounded-full' alt="" /></Link>
                <Link to='/search' className='h-2/3 my-auto aspect-square acc hover:scale-95 duration-500 flex justify-center items-center rounded-full overflow-hidden'><img src={SearchIcon} className='h-[90%] aspect-square rounded-full' alt="" /></Link>

            </div>
        </div>
    )
}