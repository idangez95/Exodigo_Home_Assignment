import { useState } from "react";
import { useCocktailStore } from "../store/cocktailStore";
import { useNavigate } from "react-router-dom";
import { Cocktail } from "../types";

export const useAddCocktail = () => {
  const { addCustomDrink } = useCocktailStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Cocktail, "idDrink">>({
    strDrink: "",
    strDrinkThumb: "",
    strInstructions: "",
    strAlcoholic: "Alcoholic",
  });

  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "strAlcoholic"
          ? (e.target.value as "Alcoholic" | "Non-Alcoholic")
          : e.target.value || "",
    });
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.strDrink || !formData.strInstructions || ingredients.some((ing) => !ing.trim())) {
      setErrorMessage("Please fill out all fields and add at least one ingredient.");
      setSuccessMessage(null);
      return;
    }

    // Ensure `strAlcoholic` is always a valid value
    const strAlcoholicValue: "Alcoholic" | "Non-Alcoholic" =
      formData.strAlcoholic === "Non-Alcoholic" ? "Non-Alcoholic" : "Alcoholic";

    const newDrink: Cocktail = {
      idDrink: new Date().getTime().toString(),
      strDrink: formData.strDrink,
      strDrinkThumb: imagePreview ?? formData.strDrinkThumb ?? "",
      strInstructions: formData.strInstructions,
      strAlcoholic: strAlcoholicValue,
      ...Object.fromEntries(ingredients.map((ing, i) => [`strIngredient${i + 1}`, ing])),
    };

    addCustomDrink(newDrink);
    console.log("New drink added:", newDrink);

    setSuccessMessage("Cocktail added successfully!");
    setErrorMessage(null);
    setTimeout(() => navigate("/"), 1500);
  };

  return {
    formData,
    setFormData,
    ingredients,
    handleChange,
    handleIngredientChange,
    addIngredientField,
    removeIngredientField,
    handleImageUpload,
    handleSubmit,
    imagePreview,
    errorMessage,
    successMessage,
  };
};