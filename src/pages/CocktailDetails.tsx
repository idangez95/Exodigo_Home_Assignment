import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCocktailStore } from "../store/cocktailStore";
import { Cocktail } from "../types";
import "../styles/cocktailDetails.css";

// Ensure proper typing for API response
const fetchCocktailDetails = async (id: string): Promise<Cocktail | null> => {
  const response = await axios.get<{ drinks: Cocktail[] | null }>(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.drinks ? response.data.drinks[0] : null;
};

const CocktailDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { customDrinks } = useCocktailStore();

  // Check if cocktail exists in Zustand (custom drinks)
  const localCocktail = customDrinks.find((drink) => drink.idDrink === id);

  const { data: apiCocktail, isLoading, error } = useQuery<Cocktail | null, Error>({
    queryKey: ["cocktail", id],
    queryFn: () => fetchCocktailDetails(id!),
    enabled: !!id && !localCocktail, // Only fetch if not in Zustand
  });

  // Use local data if available, otherwise use API data
  const cocktail = localCocktail || apiCocktail;

  if (isLoading) return <p>Loading cocktail details...</p>;
  if (error || !cocktail) return <p>Failed to load cocktail details.</p>;

  return (
    <div className="cocktail-details">
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h2>{cocktail.strDrink}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {Array.from({ length: 15 }).map((_, index) => {
          const ingredient = cocktail[`strIngredient${index + 1}` as keyof Cocktail];
          return ingredient ? <li key={index}>{ingredient}</li> : null;
        })}
      </ul>
      <h3>Instructions:</h3>
      <p>{cocktail.strInstructions}</p>
    </div>
  );
};

export default CocktailDetails;