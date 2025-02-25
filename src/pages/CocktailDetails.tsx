import { useParams } from "react-router-dom";
import { useFetchCocktailDetails } from "../hooks/useFetchCocktailDetails";
import { useCocktailStore } from "../store/cocktailStore";
import IngredientsList from "../components/IngredientsList";
import "../styles/cocktailDetails.css";

const CocktailDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { customDrinks } = useCocktailStore();

  // Use Zustand for local drinks
  const localCocktail = customDrinks.find((drink) => drink.idDrink === id);

  // Fetch from API if not found in Zustand
  const { data: apiCocktail, isLoading, error } = useFetchCocktailDetails(id);
  const cocktail = localCocktail || apiCocktail;

  if (isLoading) return <p>Loading cocktail details...</p>;
  if (error || !cocktail) return <p>Failed to load cocktail details.</p>;

  return (
    <div className="cocktail-details">
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h2>{cocktail.strDrink}</h2>
      
      <h3>Ingredients:</h3>
      <IngredientsList cocktail={cocktail} />

      <h3>Instructions:</h3>
      <p>{cocktail.strInstructions}</p>
    </div>
  );
};

export default CocktailDetails;