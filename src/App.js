import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();

    setRecipes(data.meals || []);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍕 Recipes Finder</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />

        <button onClick={searchRecipes} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <h3>Loading...</h3>}

      <div style={styles.grid}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} style={styles.card}>
              <img src={recipe.strMealThumb} alt="" style={styles.image} />

              <h3 style={styles.recipeTitle}>{recipe.strMeal}</h3>

              <p style={styles.category}>Category: {recipe.strCategory}</p>

              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                ▶ Watch Recipe
              </a>
            </div>
          ))
        ) : (
          !loading && <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", textAlign: "center" },
  title: { fontSize: "32px", marginBottom: "20px" },
  searchBox: { display: "flex", justifyContent: "center", gap: "10px" },
  input: { padding: "10px", fontSize: "16px", width: "260px" },
  button: { padding: "10px 20px", cursor: "pointer", fontSize: "16px" },
  grid: {
    marginTop: "30px",
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "15px",
  },
  image: { width: "100%", borderRadius: "10px" },
  recipeTitle: { fontSize: "20px", margin: "10px 0" },
  category: { color: "gray" },
  link: { marginTop: "10px", display: "inline-block", textDecoration: "none" },
};

export default App;
