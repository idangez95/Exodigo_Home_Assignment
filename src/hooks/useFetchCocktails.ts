import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCocktailStore } from "../store/cocktailStore";
import { useEffect, useState } from "react";
import { Cocktail } from "../types";

const fetchCocktails = async (searchQuery: string): Promise<Cocktail[]> => {
  const response = await axios.get<{ drinks: Cocktail[] | null }>(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
  );

  console.log("Fetched Cocktails:", response.data.drinks);

  return response.data.drinks ?? [];
};

export const useFetchCocktails = () => {
  const { searchQuery, setCocktails } = useCocktailStore();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const query = useQuery<Cocktail[], Error>({
    queryKey: ["cocktails", debouncedQuery],
    queryFn: () => fetchCocktails(debouncedQuery),
  });

  useEffect(() => {
    if (query.data) {
      console.log("Setting Cocktails in Zustand:", query.data);
      setCocktails(query.data);
    }
  }, [query.data, setCocktails]);

  return query;
};