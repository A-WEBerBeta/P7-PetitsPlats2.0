import recipes from "./data/recipes.js";
import { displayRecipes, updateRecipeCount } from "./render.js";
import { searchAndFilter } from "./searchAndFilterEngine.js";

const activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

const searchInput = document.getElementById("main-search");

function handleFilterClick(type, item, recipes) {
  if (!activeFilters[type].includes(item)) {
    activeFilters[type].push(item);
    createTag(type, item);
    const searchTerm = searchInput.value.trim();
    const filtered = searchAndFilter(searchTerm);
    displayRecipes(filtered);
    updateRecipeCount(filtered, recipes.length);
  }
}

function removeFilter(type, item, recipes) {
  const index = activeFilters[type].findIndex((filter) => filter === item);
  activeFilters[type].splice(index, 1);
  const searchTerm = searchInput.value.trim();
  const filtered = searchAndFilter(searchTerm);
  displayRecipes(filtered);
  updateRecipeCount(filtered, recipes.length);
}

function createTag(type, item) {
  const container = document.getElementById("active-tags");

  const tag = document.createElement("span");
  tag.className = "badge bg-primary d-flex align-items-center";
  tag.textContent = item;

  const close = document.createElement("button");
  close.className = "btn-close";
  close.addEventListener("click", () => {
    removeFilter(type, item, recipes);
    tag.remove();
    searchAndFilter();
  });

  tag.appendChild(close);
  container.append(tag);
}

export { activeFilters, createTag, handleFilterClick };
