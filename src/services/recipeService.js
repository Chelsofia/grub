
const API_URL = "http://localhost:5001/api/recipes";

export const getRecipes = async ({ search = "", letter = "", signal } = {}) => {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  } else if (letter) {
    params.set("letter", letter);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await response.json();
  return data.recipes;
};
