import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './routes/Home/Home';
import PaletteDisplay from './routes/Palette/PaletteDisplay';
import { useContext, useEffect } from 'react';
import { getColorsPalettes } from './service';
import { ColorPalettesContext} from './context/ColorPalettesContext'
import Navigation from './routes/Navigation/Navigation';
import Login from './routes/Login/Login';
import PaletteCreation from './routes/Palette/PaletteCreation';

function App() {

  const { setColorPalettes } = useContext(ColorPalettesContext)

  useEffect(()=> {
    getColorsPalettes()
    .then((data) => {
      setColorPalettes(data);
    })
    .catch((err) => console.log(err));
  }, [])

  return (
      <div className='App'>
          <Routes>
            <Route path='/' element={<Navigation/>}>
              <Route index element={<Home/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='palette/:id' element={<PaletteDisplay/>}/>
              <Route path='palette/create' element={<PaletteCreation/>}/>
            </Route>
          </Routes>
      </div>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import { getColorsPalettes, getTags } from "./service";
// import "./App.css";
// import Palettes from "./components/Palette/Palettes";
// import Tags from "./components/Tag/Tags";
// import Favorites from "./components/Favorite/Favorites";
// import { FavoritesContext } from "./context/FavoriteContext";

// function App() {
//   const [colorPalettes, setColorPalettes] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   useEffect(() => {
//     getColorsPalettes()
//       .then((data) => {
//         console.log("data :", data);
//         setColorPalettes(data);
//         setFavorites((data) => data.filter((palette) => palette.liked));
//       })
//       .catch((err) => console.log(err));
//     getTags()
//       .then((data) => {
//         console.log("data :", data);
//         setTags(data);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <FavoritesContext.Provider value={{favorites, setFavorites}}>
//       <div className="App">
//         <header>
//           <h1>Color Pelette Projects</h1>
//         </header>
//         <div className="main-container">
//           <Tags tags={tags} />
//           <Palettes palettes={colorPalettes} />
//           <Favorites favorites={favorites} />
//         </div>
//       </div>
//     </FavoritesContext.Provider>
//   );
// }

// export default App;
