import React from "react";
import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from "../../context/FavoriteContext";
import "./Palette.css";

const Palette = ({ palette }) => {
  const { id, name, colors, liked } = palette;
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(liked);

  const handleFavorites = () => {
    setIsFavorite((isFavorite) => !isFavorite);
    // busco si la paleta ya esta en favoritos
    const foundIndex = favorites.findIndex((fav) => fav.id === id);
    console.log('favorites : ',favorites)
    // para agregar a favoritos
    if (foundIndex === -1) {
      setFavorites([...favorites, palette]);
      return;
    }

    // quitar de favoritos
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };
  return (
    <div className="palette-container">
      <div className="palette">
        <h3>{name}</h3>
        {colors.map((color) => {
          return (
            <div
              key={color}
              className="color"
              style={{ backgroundColor: color }}
            >
              <span>{color}</span>
            </div>
          );
        })}
      </div>
      <div className="fav">
        {/* { liked ? ( */}
        {isFavorite ? (
          <FaHeart className="fav heart" onClick={handleFavorites} />
        ) : (
          <FaRegHeart className="fav" onClick={handleFavorites} />
        )}
      </div>
    </div>
  );
};

export default Palette;
