import recipes from "./data/recipes.js";
import { updateFilters } from "./filters.js";
import { displayRecipes, updateRecipeCount } from "./render.js";
import { filterByTags, searchAndFilter } from "./searchAndFilterEngine.js";

const activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

const searchInput = document.getElementById("main-search");

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

function handleFilterClick(type, item) {
  if (!activeFilters[type].includes(item)) {
    activeFilters[type].push(item);
    createTag(type, item);
    applySearch();
  }
}

function removeFilter(type, item) {
  const index = activeFilters[type].findIndex((filter) => filter === item);
  activeFilters[type].splice(index, 1);
  applySearch();
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
  });

  tag.appendChild(close);
  container.append(tag);
}

export { activeFilters, createTag, handleFilterClick };
