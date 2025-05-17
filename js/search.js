import { updateFilters } from "./filters.js";
import { displayRecipes, updateRecipeCount } from "./render.js";
import { filterByTags, searchAndFilter } from "./searchAndFilterEngine.js";

export function setupSearch(recipes) {
  const searchInput = document.getElementById("main-search");
  const searchBtn = document.getElementById("search-btn");
  const clearBtn = document.getElementById("clear-search");

  function applySearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const tagFiltered = filterByTags(recipes);
    const finalFiltered =
      searchTerm.length >= 3
        ? searchAndFilter(searchTerm, tagFiltered)
        : tagFiltered;

    displayRecipes(finalFiltered, searchTerm);
    updateRecipeCount(finalFiltered, recipes.length);
    updateFilters(finalFiltered);
  }

  // Recherche automtique à partir de 3 caractères
  searchInput.addEventListener("input", () => {
    // Affiche ou cache clearBtn
    clearBtn.style.display = searchInput.value.length > 0 ? "block" : "none";
    applySearch();
  });

  // Clic sur le bouton de recherche
  searchBtn.addEventListener("click", applySearch);

  // Clic sur la croix pour effacer
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    applySearch();
  });
}
