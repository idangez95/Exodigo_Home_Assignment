import React from "react";
import { Cocktail } from "../types";

interface FormInputsProps {
  formData: Partial<Cocktail>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  ingredients: string[];
  handleIngredientChange: (index: number, value: string) => void;
  addIngredientField: () => void;
  removeIngredientField: (index: number) => void;
}

const FormInputs: React.FC<FormInputsProps> = ({
  formData,
  handleChange,
  handleImageUpload,
  imagePreview,
  ingredients,
  handleIngredientChange,
  addIngredientField,
  removeIngredientField,
}) => {
  return (
    <>
      {/* Name Input */}
      <label>Name:</label>
      <input type="text" name="strDrink" value={formData.strDrink ?? ""} onChange={handleChange} required />

      {/* Image Upload */}
      <label>Upload Image:</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

      {/* Alternative Image URL */}
      <label>Or Enter Image URL:</label>
      <input type="text" name="strDrinkThumb" value={formData.strDrinkThumb ?? ""} onChange={handleChange} />

      {/* Alcoholic / Non-Alcoholic Select */}
      <label>Alcoholic / Non-Alcoholic:</label>
      <select name="strAlcoholic" value={formData.strAlcoholic ?? "Alcoholic"} onChange={handleChange}>
        <option value="Alcoholic">Alcoholic</option>
        <option value="Non-Alcoholic">Non-Alcoholic</option>
      </select>

      {/* Ingredients List */}
      <label>Ingredients:</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <input
            type="text"
            value={ingredient ?? ""}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            required
          />
          {ingredients.length > 1 && (
            <button type="button" onClick={() => removeIngredientField(index)}/>
          )}
        </div>
      ))}
      <button type="button" onClick={addIngredientField} className="add-ingredient-btn">➕ Add Ingredient</button>

      {/* Instructions */}
      <label>Instructions:</label>
      <textarea name="strInstructions" value={formData.strInstructions ?? ""} onChange={handleChange} required />
    </>
  );
};

export default FormInputs;