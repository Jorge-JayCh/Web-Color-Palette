import { useContext, useEffect, useState } from 'react';
import './Home.css'
import Palettes from '../../components/Palette/Palettes';
import Tags from '../../components/Tag/Tags';
import Favorites from '../../components/Favorite/Favorites';
import { getTags } from '../../service';
import { FavoritesContext } from '../../context/FavoritesContext';
import { FiltersContext } from '../../context/FiltersContext'
import { ColorPalettesContext } from '../../context/ColorPalettesContext';
import palettoLogo from '../../assets/logo.png';

const Home = () => {
  const [tags, setTags] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    searchField: '',
    tagFilter: []
  })

  const { colorPalettes } = useContext(ColorPalettesContext)

  useEffect(() => {
    getTags()
      .then((data) => setTags(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredColorPalettes = colorPalettes.filter(colorPalette => {

    //si no hay filtro por tag entonces devolver todos
    if(filters.tagFilter.length === 0) {
      return true
    }

    const verifiedTags = colorPalette.tags.filter(tag => filters.tagFilter.includes(tag))
    return verifiedTags.length === filters.tagFilter.length
  })

  const colorPaletteWithLikes = filteredColorPalettes.map(palette => {
    const foundIndex = favorites.findIndex(fav => fav.id === palette.id);

    //la paleta no esta marcada como favorita, entonces se la devuelve sin cambios
    if (foundIndex === -1) {
      return palette
    }

    return {...palette, liked: true}
  })

  return (
    <FavoritesContext.Provider value={{favorites, setFavorites}}>
      <FiltersContext.Provider value={{filters, setFilters}}>
        {/* <header>
          <img src={palettoLogo} alt="Logo" className='logo' />
        </header> */}
        <div className='main-container'>
          <Tags tags={tags}/>
          <Palettes palettes={colorPaletteWithLikes} />
          <Favorites favorites={favorites} />
        </div>
      </FiltersContext.Provider>
    </FavoritesContext.Provider>
  )
}

export default Home