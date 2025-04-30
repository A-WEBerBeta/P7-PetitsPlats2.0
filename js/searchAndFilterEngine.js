import recipes from "./data/recipes.js";
import { activeFilters } from "./tags.js";

export function searchAndFilter(searchTerm = "") {
  const term = searchTerm.toLowerCase();

  let filtered = recipes.filter((recipe) => {
    const inTitle = recipe.name.toLowerCase().includes(term);
    const inDescription = recipe.description.toLowerCase().includes(term);
    const inIngredients = recipe.ingredients.some((ing) =>
      ing.ingredient.toLowerCase().includes(term)
    );
    return inTitle || inDescription || inIngredients;
  });

  // Filtrage par tags
  const { ingredients, appliances, ustensils } = activeFilters;

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
