import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CocktailDetails from "./pages/CocktailDetails";
import AddCocktail from "./pages/AddCocktail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail/:id" element={<CocktailDetails />} />
        <Route path="/add-cocktail" element={<AddCocktail />} />
      </Routes>
    </>
  );
};

export default App;