import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Menyimpan preferensi tema ke localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark'); // Menetapkan tema ke root HTML
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light'); // Menetapkan tema ke root HTML
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light'); // Ganti ke tema terang
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark'); // Ganti ke tema gelap
    }
  };

  return (
    <div
      className='w-16 h-8 flex p-1 justify-between items-center neu cursor-pointer rounded-full ease-in-out acc' onClick={toggleTheme}>
      <div
        className={`w-6 h-6 rounded-full  transition-transform duration-300 neu-inse ease-in-out ${
          isDarkMode ? 'transform translate-x-8 card' : 'card'
        }`}
      />
    </div>
  );
};

export default ThemeToggle;
