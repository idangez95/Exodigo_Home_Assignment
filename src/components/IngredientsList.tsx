import { Cocktail } from "../types";

interface IngredientsListProps {
  cocktail: Cocktail;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ cocktail }) => {
  return (
    <ul>
      {Array.from({ length: 15 }).map((_, index) => {
        const ingredient = cocktail[`strIngredient${index + 1}` as keyof Cocktail];
        return ingredient ? <li key={index}>{ingredient}</li> : null;
      })}
    </ul>
  );
};

export default IngredientsList;