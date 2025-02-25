import { create } from "zustand";
import { Cocktail } from "../types";

interface CocktailStore {
  cocktails: Cocktail[];
  favorites: Cocktail[];
  customDrinks: Cocktail[];
  searchQuery: string;
  filter: "All" | "Alcoholic" | "Non-Alcoholic";
  setCocktails: (data: Cocktail[]) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: "All" | "Alcoholic" | "Non-Alcoholic") => void;
  addFavorite: (cocktail: Cocktail) => void;
  removeFavorite: (id: string) => void;
  addCustomDrink: (drink: Cocktail) => void;
  removeCustomDrink: (id: string) => void;
}

export const useCocktailStore = create<CocktailStore>((set) => ({
  cocktails: [],
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  customDrinks: JSON.parse(localStorage.getItem("customDrinks") || "[]"),
  searchQuery: "Mojito",
  filter: "All",
  setCocktails: (data) => set({ cocktails: data ?? [] }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (filter) => set({ filter }),

  addFavorite: (cocktail) =>
    set((state) => {
      const updatedFavorites = [...state.favorites, cocktail];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((fav) => fav.idDrink !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),

  addCustomDrink: (drink) =>
    set((state) => {
      const updatedCustomDrinks = [...state.customDrinks, drink];
      localStorage.setItem("customDrinks", JSON.stringify(updatedCustomDrinks));
      return { customDrinks: updatedCustomDrinks };
    }),

  removeCustomDrink: (id) =>
    set((state) => {
      const updatedCustomDrinks = state.customDrinks.filter((drink) => drink.idDrink !== id);
      localStorage.setItem("customDrinks", JSON.stringify(updatedCustomDrinks));
      return { customDrinks: updatedCustomDrinks };
    }),
}));
