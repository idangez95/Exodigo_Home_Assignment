export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strAlcoholic: "Alcoholic" | "Non-Alcoholic";
  [key: string]: string | null;
}