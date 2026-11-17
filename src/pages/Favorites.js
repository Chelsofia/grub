
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import FavoriteButton from "../components/FavoriteButton";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const navigate = useNavigate();

  const {
    data: favorites = [],
    isLoading,
    isError,
    error,
  } = useFavorites();

  if (!sessionStorage.getItem("token")) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Header />

        <div className="text-center py-24 px-4">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">
            Sign in to view your favorites
          </h2>

          <p className="text-[var(--color-text)] mb-6">
            Save your favorite recipes and come back to them anytime.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">
            My Favorites
          </h1>

          <p className="text-[var(--color-text)] mt-2">
            All the recipes you've saved in one place.
          </p>
        </div>

        {isLoading && <Loader />}

        {isError && (
          <p className="text-center text-red-600">
            {error.message || "Unable to load your favorites."}
          </p>
        )}

        {!isLoading && !isError && favorites.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">♡</div>

            <h2 className="text-xl font-semibold text-[var(--color-primary)]">
              No favorites yet
            </h2>

            <p className="text-[var(--color-text)] mt-2 mb-6">
              Explore recipes and save the ones you love.
            </p>

            <Link
              to="/"
              className="inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg"
            >
              Explore recipes
            </Link>
          </div>
        )}

        {!isLoading && !isError && favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative">
                  <Link to={`/recipe/${recipe._id}`}>
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-56 object-cover"
                    />
                  </Link>

                  <div className="absolute top-3 right-3">
                    <FavoriteButton recipeId={recipe._id} />
                  </div>
                </div>

                <div className="p-4">
                  <Link to={`/recipe/${recipe._id}`}>
                    <h2 className="text-lg font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition">
                      {recipe.name}
                    </h2>
                  </Link>

                  <p className="text-sm text-gray-500 mt-2">
                    {recipe.area || "Origin unknown"}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {recipe.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
