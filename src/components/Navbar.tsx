import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/add-cocktail">➕ Add Cocktail</Link>
    </nav>
  );
};

export default Navbar;