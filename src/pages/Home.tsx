import { useFetchCocktails } from "../hooks/useFetchCocktails";
import { useCocktailStore } from "../store/cocktailStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/home.css";

const COCKTAILS_PER_PAGE = 9;

const Home = () => {
  const { isLoading, error } = useFetchCocktails();
  const { cocktails, customDrinks, searchQuery, setSearchQuery } = useCocktailStore();
  const [currentPage, setCurrentPage] = useState(1);

  // Ensure `cocktails` and `customDrinks` are always arrays (prevent undefined error)
  const safeCocktails = cocktails || [];
  const safeCustomDrinks = customDrinks || [];

  if (isLoading) return <p>Loading cocktails...</p>;
  if (error) return <p>Failed to load cocktails.</p>;

  // Only show results if searchQuery is not empty
  const filteredCocktails =
    searchQuery.trim() === ""
      ? [] // No cocktails shown if search is empty
      : [...safeCustomDrinks, ...safeCocktails].filter((cocktail) =>
          cocktail.strDrink?.toLowerCase().includes(searchQuery.toLowerCase()) // Ensure strDrink exists
        );

  // Pagination Logic
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
          setCurrentPage(1); // Reset to first page when searching
        }}
        className="search-input"
      />

      {/* Only show cocktails if the search input is not empty */}
      {searchQuery.trim() !== "" && (
        <>
          <div className="cocktail-grid">
            {paginatedCocktails.length > 0 ? (
              paginatedCocktails.map((cocktail) => (
                <Link to={`/cocktail/${cocktail.idDrink}`} key={cocktail.idDrink} className="cocktail-card">
                  {cocktail.strDrinkThumb ? (
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                  ) : (
                    <p>No Image Available</p>
                  )}
                  <h3>{cocktail.strDrink}</h3>
                </Link>
              ))
            ) : (
              <p className="no-results">No results found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;