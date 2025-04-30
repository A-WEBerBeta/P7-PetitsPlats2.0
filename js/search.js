import { displayRecipes, updateRecipeCount } from "./render.js";
import { searchAndFilter } from "./searchAndFilterEngine.js";

export function setupSearch(recipes) {
  const searchInput = document.getElementById("main-search");
  const searchBtn = document.getElementById("search-btn");
  const clearBtn = document.getElementById("clear-search");

  function applySearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filtered = searchAndFilter(searchTerm);
    displayRecipes(filtered);
    updateRecipeCount(filtered, recipes.length);
  }

  // Affiche ou cache clearBtn
  searchInput.addEventListener("input", () => {
    clearBtn.style.display = searchInput.value.length > 0 ? "block" : "none";
  });

  // Clic sur le bouton de recherche
  searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim().length >= 3) {
      applySearch();
    } else {
      displayRecipes(recipes);
    }
  });

  // Clic sur la croix pour effacer
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    displayRecipes(recipes);
    updateRecipeCount(recipes, recipes.length);
  });
}
