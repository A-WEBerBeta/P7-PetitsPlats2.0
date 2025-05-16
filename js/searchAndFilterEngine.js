import recipes from "./data/recipes.js";
import { activeFilters } from "./tags.js";

export function filterByTags(baseRecipes = recipes) {
  let filtered = baseRecipes;
  const { ingredients, appliances, ustensils } = activeFilters;

  // Filtrage par tags

  if (ingredients.length > 0) {
    filtered = filtered.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ingObject) =>
        ingObject.ingredient.toLowerCase()
      );
      return ingredients.every((ing) => recipeIngredients.includes(ing));
    });
  }

  if (appliances.length > 0) {
    filtered = filtered.filter((recipe) =>
      appliances.includes(recipe.appliance.toLowerCase())
    );
  }

  if (ustensils.length > 0) {
    filtered = filtered.filter((recipe) => {
      const recipeUstensils = recipe.ustensils.map((ust) => ust.toLowerCase());
      return ustensils.every((ust) => recipeUstensils.includes(ust));
    });
  }

  return filtered;
}

export function searchAndFilter(searchTerm = "", baseRecipes = recipes) {
  const term = searchTerm.toLowerCase();

  // Filtrage barre de recherche principale

  return baseRecipes.filter((recipe) => {
    const inTitle = recipe.name.toLowerCase().includes(term);
    const inDescription = recipe.description.toLowerCase().includes(term);
    const inIngredients = recipe.ingredients.some((ing) =>
      ing.ingredient.toLowerCase().includes(term)
    );
    return inTitle || inDescription || inIngredients;
  });
}
