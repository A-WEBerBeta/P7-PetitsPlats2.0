import recipes from "./data/recipes.js";
import { handleFilterClick } from "./tags.js";

export function updateFilters(recipes) {
  const ingredients = [];
  const appliances = [];
  const ustensils = [];

  // Collecte des données ingrédients, appareils et ustensiles
  recipes.forEach((rec) => {
    rec.ingredients.forEach((i) =>
      ingredients.push(i.ingredient.toLowerCase())
    );
    appliances.push(rec.appliance.toLowerCase());
    rec.ustensils.forEach((u) => ustensils.push(u.toLowerCase()));
  });

  // MAJ des dropdowns avec les valeurs uniques (set)
  updateDropdown("ingredients", [...new Set(ingredients)]);
  updateDropdown("appliances", [...new Set(appliances)]);
  updateDropdown("ustensils", [...new Set(ustensils)]);
}

function searchDropdown(type, items, container) {
  const wrapper = document.createElement("div");
  wrapper.className =
    "dropdown-search-wrapper position-relative d-flex align-items-center mb-2";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "dropdown-search form-control";

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "clear-dropdown-search";
  clearBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  clearBtn.style.display = "none";

  const searchIcon = document.createElement("button");
  searchIcon.type = "button";
  searchIcon.className = "search-icon";
  searchIcon.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;

  wrapper.appendChild(input);
  wrapper.appendChild(clearBtn);
  wrapper.appendChild(searchIcon);
  container.appendChild(wrapper);

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    clearBtn.style.display = input.value.length > 0 ? "block" : "none";

    // Suppression des anciens <li>
    while (container.children.length > 1) {
      container.removeChild(container.lastChild);
    }

    const filteredItems = items
      .filter((item) => item.toLowerCase().includes(value))
      .sort();

    filteredItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
      li.className = "dropdown-item";
      li.addEventListener("click", () => {
        handleFilterClick(type, item, recipes);
        const dropdownMenu = document.getElementById(`${type}-dropdown`);
        dropdownMenu.classList.remove("show");
      });
      container.appendChild(li);
    });
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";

    // Réaffiche tous les items
    while (container.children.length > 1) {
      container.removeChild(container.lastChild);
    }

    items.sort().forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
      li.className = "dropdown-item";
      li.addEventListener("click", () => {
        handleFilterClick(type, item, recipes);
      });
      container.appendChild(li);
    });
  });
}

function updateDropdown(type, items) {
  const container = document.getElementById(`${type}-dropdown`);
  container.innerHTML = "";

  // Ajout de la search-bar
  searchDropdown(type, items, container);

  items.sort().forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
    li.className = "dropdown-item";

    li.addEventListener("click", () => {
      handleFilterClick(type, item, recipes);

      const dropdownMenu = document.getElementById(`${type}-dropdown`);
      dropdownMenu.classList.remove("show");
    });
    container.appendChild(li);
  });
}

function setupDropdownToggle(buttonId, menuId) {
  const btn = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);
  const chevronDown = btn.querySelector(".fa-chevron-down");
  const chevronUp = btn.querySelector(".fa-chevron-up");

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("show");

    chevronDown.classList.toggle("d-none", isOpen);
    chevronUp.classList.toggle("d-none", !isOpen);
  });

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("show");
      chevronDown.classList.remove("d-none");
      chevronUp.classList.add("d-none");
    }
  });
}

setupDropdownToggle("ingredients-btn", "ingredients-dropdown");
setupDropdownToggle("appliances-btn", "appliances-dropdown");
setupDropdownToggle("ustensils-btn", "ustensils-dropdown");
