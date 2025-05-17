import recipes from "./data/recipes.js";
import { activeFilters } from "./tags.js";

export function filterByTags(baseRecipes = recipes) {
  // filtrage par tags
  const { ingredients, appliances, ustensils } = activeFilters;
  let filtered = baseRecipes;

  // Filtre : ingredients
  if (ingredients.length > 0) {
    const temporary = [];

    for (let i = 0; i < filtered.length; i++) {
      const recipe = filtered[i];
      const recipeIngredients = [];

      for (let j = 0; j < recipe.ingredients.length; j++) {
        recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
      }

      let allIngredientsExisting = true;
      for (let k = 0; k < ingredients.length; k++) {
        if (!recipeIngredients.includes(ingredients[k])) {
          allIngredientsExisting = false;
          break;
        }
      }

      if (allIngredientsExisting) {
        temporary.push(recipe);
      }
    }

    filtered.length = 0;
    for (let i = 0; i < temporary.length; i++) {
      filtered.push(temporary[i]);
    }
  }

  // Filtre : appareils
  if (appliances.length > 0) {
    const temporary = [];

    for (let i = 0; i < filtered.length; i++) {
      const recipe = filtered[i];
      if (appliances.includes(recipe.appliance.toLowerCase())) {
        temporary.push(recipe);
      }
    }

    filtered.length = 0;
    for (let i = 0; i < temporary.length; i++) {
      filtered.push(temporary[i]);
    }
  }

  // Filtre : ustensiles
  if (ustensils.length > 0) {
    const temporary = [];

    for (let i = 0; i < filtered.length; i++) {
      const recipe = filtered[i];
      const recipeUstensils = [];

      for (let j = 0; j < recipe.ustensils.length; j++) {
        recipeUstensils.push(recipe.ustensils[j].toLowerCase());
      }

      let allUstensilsExisting = true;
      for (let k = 0; k < ustensils.length; k++) {
        if (!recipeUstensils.includes(ustensils[k])) {
          allUstensilsExisting = false;
          break;
        }
      }

      if (allUstensilsExisting) {
        temporary.push(recipe);
      }
    }

    filtered.length = 0;
    for (let i = 0; i < temporary.length; i++) {
      filtered.push(temporary[i]);
    }
  }

  return filtered;
}

export function searchAndFilter(searchTerm = "", baseRecipes = recipes) {
  const term = searchTerm.toLowerCase();
  const filtered = [];

  // Filtrage dans la barre de recherche principale
  for (let i = 0; i < baseRecipes.length; i++) {
    const recipe = baseRecipes[i];

    let inTitle = recipe.name.toLowerCase().includes(term);
    let inDescription = recipe.description.toLowerCase().includes(term);

    if (inTitle || inDescription) {
      filtered.push(recipe); // on ajoute la recette au tableau si correspondance
      continue;
    }

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ing = recipe.ingredients[j].ingredient.toLowerCase();
      if (ing.includes(term)) {
        filtered.push(recipe);
        break;
      }
    }
  }

  return filtered;
}
