# 🍹 Cocktail App - Exodigo Frontend Assignment

A modern **React + TypeScript** application that allows users to **search, view, and save custom cocktails**.  
Built with **React Query, Zustand, and modern CSS styling**, this app ensures a **smooth user experience** with **pagination, search functionality, and form validation**.

---

## 🚀 Features

- 🔍 **Search for Cocktails** - Live search functionality using an external API.
- 📜 **Cocktail Details** - View ingredients and instructions for each cocktail.
- ⭐ **Favorite Cocktails** - Save favorite cocktails for easy access.
- ✨ **Add Custom Cocktails** - Create your own drinks with an intuitive form.
- 🖼️ **Image Upload Support** - Upload images or enter an image URL.
- 🔄 **Pagination** - Navigate easily through cocktails in a paginated view.
- 🔧 **State Management with Zustand** - Efficiently manage global state.
- ⚡ **Optimized with React Query** - Data fetching with caching and performance optimization.

---

## 📂 Project Structure

/src ├── components/ # Reusable UI components ├── pages/ # Main pages (Home, AddCocktail, Details) ├── store/ # Global state management (Zustand) ├── hooks/ # Custom React hooks (fetching data) ├── styles/ # CSS files for styling ├── types/ # TypeScript types ├── App.tsx # Main App component ├── main.tsx # React root entry point └── routes.tsx # React Router setup


---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/idangez95/Exodigo_Home_Assignment.git
cd Exodigo home assignment

npm install
# OR
yarn install

npm run dev
# OR
yarn dev


🔧 Technologies Used
Tech	| Purpose
React	| Frontend framework
TypeScript	| Type safety and better development experience
React | Router	Page navigation
Zustand	| State management
React | Query	Data fetching & caching
Axios	| API calls
CSS	| Custom styling

📝 API Used
The app fetches data from TheCocktailDB, a free API providing cocktail recipes.
Example API Call
GET https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita


📖 How to Use
🔍 Searching for a Cocktail
Enter a name in the search bar.
Results will be filtered dynamically.
✨ Adding a Custom Cocktail
Go to the "Add Cocktail" page.
Fill out the form (name, ingredients, instructions).
Upload an image or provide an image URL.
Click Save Cocktail - it will appear in the list.
🗑️ Removing Ingredients
Click the 🗑️ (Trash Icon) next to an ingredient field.
🐛 Known Issues & Future Improvements
🔹 Improved Search Accuracy - Better filtering for user-created cocktails.
🔹 More Styling Enhancements - Improve UI animations and transitions.
🔹 Unit & Integration Tests - Implement Jest & React Testing Library.

📜 License
This project is licensed under the MIT License.
