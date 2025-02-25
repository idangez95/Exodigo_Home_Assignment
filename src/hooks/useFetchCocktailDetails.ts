import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Cocktail } from "../types";

const fetchCocktailDetails = async (id: string): Promise<Cocktail | null> => {
  const response = await axios.get<{ drinks: Cocktail[] | null }>(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.drinks ? response.data.drinks[0] : null;
};

export const useFetchCocktailDetails = (id: string | undefined) => {
  return useQuery<Cocktail | null, Error>({
    queryKey: ["cocktail", id],
    queryFn: () => fetchCocktailDetails(id!),
    enabled: !!id, // Only run if id exists
  });
};