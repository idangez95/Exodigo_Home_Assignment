import { useFetchCocktails } from "../hooks/useFetchCocktails";
import { useCocktailStore } from "../store/cocktailStore";
import { useState } from "react";
import CocktailCard from "../components/CocktailCard";
import Pagination from "../components/Pagination";
import "../styles/home.css";

const COCKTAILS_PER_PAGE = 9;

const Home = () => {
  const { isLoading, error } = useFetchCocktails();
  const { cocktails, customDrinks, searchQuery, setSearchQuery } = useCocktailStore();
  const [currentPage, setCurrentPage] = useState(1);

  const safeCocktails = cocktails || [];
  const safeCustomDrinks = customDrinks || [];

  if (isLoading) return <p>Loading cocktails...</p>;
  if (error) return <p>Failed to load cocktails.</p>;

  const filteredCocktails =
    searchQuery.trim() === ""
      ? []
      : [...safeCustomDrinks, ...safeCocktails].filter((cocktail) =>
          cocktail.strDrink?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const totalCocktails = filteredCocktails.length;
  const totalPages = Math.ceil(totalCocktails / COCKTAILS_PER_PAGE);
  const paginatedCocktails = filteredCocktails.slice(
    (currentPage - 1) * COCKTAILS_PER_PAGE,
    currentPage * COCKTAILS_PER_PAGE
  );

  return (
    <div className="cocktail-container">
      <h2>Idan's Cocktails</h2>

      <input
        type="text"
        placeholder="Search cocktails..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        className="search-input"
      />

      {searchQuery.trim() !== "" && (
        <>
          <div className="cocktail-grid">
            {paginatedCocktails.length > 0 ? (
              paginatedCocktails.map((cocktail) => <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />)
            ) : (
              <p>No results found.</p>
            )}
          </div>

          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
        </>
      )}
    </div>
  );
};

export default Home;