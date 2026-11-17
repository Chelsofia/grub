
import { useNavigate } from "react-router-dom";
import {
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
} from "../hooks/useFavorites";

const FavoriteButton = ({ recipeId }) => {
  const navigate = useNavigate();

  const { data: favorites = [] } = useFavorites();
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  const isFavorite = favorites.some(
    (recipe) => recipe._id === recipeId
  );

  const isPending =
    addMutation.isPending || removeMutation.isPending;

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!sessionStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (isPending) return;

    if (isFavorite) {
      removeMutation.mutate(recipeId);
    } else {
      addMutation.mutate(recipeId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavorite}
      disabled={isPending}
      aria-label={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
      aria-pressed={isFavorite}
      title={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:scale-110 transition disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? "#C8754D" : "none"}
        stroke={isFavorite ? "#C8754D" : "#354B35"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
