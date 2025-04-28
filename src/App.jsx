import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import ManhwaDetail from './pages/ManhwaDetail';
import ManhwaChapter from './pages/ManhwaChapter';
import List from './pages/List';
import GenreDetail from './pages/GenreDetail';
import Search from './pages/Search';



function App() {

  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="manhwa-detail/:slug" element={<ManhwaDetail />} />
        <Route path="chapter/:idChapter" element={<ManhwaChapter/>} />
        <Route path="list" element={<List/>} />
        <Route path="genre/:genre" element={<GenreDetail />} />
        <Route path="search" element={<Search/>}></Route>
      </Routes>
  )
}

export default App
