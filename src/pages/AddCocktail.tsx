import { useState } from "react";
import { useCocktailStore } from "../store/cocktailStore";
import { useNavigate } from "react-router-dom";
import { Cocktail } from "../types";
import "../styles/addCocktail.css";

const AddCocktail = () => {
  const { addCustomDrink } = useCocktailStore();
  const navigate = useNavigate();

  // Form state
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

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value ?? "" }); // Ensure string value
  };

  // Handle ingredients input changes
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  // Add a new ingredient field
  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  // Remove an ingredient field
  const removeIngredientField = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  // Handle image upload (local preview)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.strDrink || !formData.strInstructions || ingredients.some((ing) => !ing.trim())) {
      setErrorMessage("Please fill out all fields and add at least one ingredient.");
      setSuccessMessage(null);
      return;
    }

    const strAlcoholicValue: "Alcoholic" | "Non-Alcoholic" =
      formData.strAlcoholic === "Non-Alcoholic" ? "Non-Alcoholic" : "Alcoholic";

    // ensure `strDrinkThumb` is always a valid string
    const drinkImage = imagePreview ?? formData.strDrinkThumb ?? "";

    // Create new cocktail object
    const newDrink: Cocktail = {
      idDrink: new Date().getTime().toString(),
      strDrink: formData.strDrink,
      strDrinkThumb: drinkImage,
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

  return (
    <div className="add-cocktail-container">
      <h2>Add a New Cocktail</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="strDrink" value={formData.strDrink ?? ""} onChange={handleChange} required />

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

        <label>Or Enter Image URL:</label>
        <input type="text" name="strDrinkThumb" value={formData.strDrinkThumb ?? ""} onChange={handleChange} />

        <label>Alcoholic / Non-Alcoholic:</label>
        <select name="strAlcoholic" value={formData.strAlcoholic ?? "Alcoholic"} onChange={handleChange}>
          <option value="Alcoholic">Alcoholic</option>
          <option value="Non-Alcoholic">Non-Alcoholic</option>
        </select>

        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="text"
              value={ingredient ?? ""} // Ensure value is always a string
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredientField(index)}/>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredientField} className="add-ingredient-btn">
          ➕ Add Ingredient
        </button>

        <label>Instructions:</label>
        <textarea name="strInstructions" value={formData.strInstructions ?? ""} onChange={handleChange} required />

        <button type="submit">Save Cocktail</button>
      </form>
    </div>
  );
};

export default AddCocktail;