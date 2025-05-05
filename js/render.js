export function displayRecipes(recipes) {
  const container = document.getElementById("recipe-container");
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>Aucune recette ne correspond à votre recherche.</p>
      </div>
    `;
    return;
  }

  recipes.forEach((recipe) => {
    const article = document.createElement("article");
    article.className = "card";

    article.innerHTML = `
      <div class="card__img">
        <img src="assets/json-recipes/${recipe.image}" alt="${
      recipe.name
    }" style="height: 253px; object-fit: cover; width: 100%;" />
        <span class="card__time">${recipe.time}min</span>
      </div>
      <div class="card__content">
        <h2 class="card__title">${recipe.name}</h2>
        <h3 class="card__recipe">Recette</h3>
        <p class="card__description">${recipe.description}</p>
        <h3 class="card__recipe">Ingrédients</h3>
        <div class="card__ingredients">
          ${recipe.ingredients
            .map(
              (item) => `
              <p class="card__ingredient">
                ${item.ingredient}<br />
                <span class="card__quantity">
                  ${item.quantity ? item.quantity : "-"} ${item.unit || ""}
                </span>
              </p>`
            )
            .join("")}
        </div>
      </div>
    `;

    container.appendChild(article);
  });
}

export function updateRecipeCount(filteredRecipes) {
  const counter = document.getElementById("recipe-counter");
  if (counter) {
    counter.textContent = `${filteredRecipes.length} recette${
      filteredRecipes.length > 1 ? "s" : ""
    }`;
  }
}
