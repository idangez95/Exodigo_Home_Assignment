import { useAddCocktail } from "../hooks/useAddCocktail";
import FormInputs from "../components/FormInputs";
import "../styles/addCocktail.css";

const AddCocktail = () => {
  const {
    formData,
    handleChange,
    handleImageUpload,
    imagePreview,
    ingredients,
    handleIngredientChange,
    addIngredientField,
    removeIngredientField,
    handleSubmit,
    errorMessage,
    successMessage,
  } = useAddCocktail();

  return (
    <div className="add-cocktail-container">
      <h2>Add a New Cocktail</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <FormInputs
          formData={formData}
          handleChange={handleChange}
          handleImageUpload={handleImageUpload}
          imagePreview={imagePreview}
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          addIngredientField={addIngredientField}
          removeIngredientField={removeIngredientField}
        />

        <button type="submit">Save Cocktail</button>
      </form>
    </div>
  );
};

export default AddCocktail;