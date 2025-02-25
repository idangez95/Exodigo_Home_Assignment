import { Link } from "react-router-dom";
import { Cocktail } from "../types";
import "../styles/cocktailCard.css";

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail }) => {
  return (
    <Link to={`/cocktail/${cocktail.idDrink}`} key={cocktail.idDrink} className="cocktail-card">
      {cocktail.strDrinkThumb ? (
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      ) : (
        <p>No Image Available</p>
      )}
      <h3>{cocktail.strDrink}</h3>
    </Link>
  );
};

export default CocktailCard;
