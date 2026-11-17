
const API_URL = "https://grub-backend.vercel.app/api/favorites";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get the logged-in user's favorites
export const getFavorites = async () => {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch favorites");
  }

  return data.favorites;
};

// Add a recipe to favorites
export const addFavorite = async (recipeId) => {
  const response = await fetch(`${API_URL}/${recipeId}`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add favorite");
  }

  return data.favorites;
};

// Remove a recipe from favorites
export const removeFavorite = async (recipeId) => {
  const response = await fetch(`${API_URL}/${recipeId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove favorite");
  }

  return data.favorites;
};
