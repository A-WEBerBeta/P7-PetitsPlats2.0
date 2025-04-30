import recipes from "./data/recipes.js";
import { updateFilters } from "./filters.js";
import { displayRecipes } from "./render.js";
import { setupSearch } from "./search.js";
import "./tags.js";

// Initialisation
displayRecipes(recipes);
updateFilters(recipes);
setupSearch(recipes);
