import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router";
import Loader from "./components/Loader";
import Header from "./components/Header";
import CallToAction from "./components/CallToAction";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import { getRecipes } from "./services/recipeService";

function Home({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debounce, setDebounce] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const recipesPerPage = 4;

  const dailyLetter = useMemo(() => {
    const letters = "abcdefghijklmnopqrstuvwxyz";

    const today = new Date();

    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 86400000
    );

    return letters[dayOfYear % letters.length];
  }, []);



  const fetchRecipes = useCallback(async (searchTerm, signal) => {
    try {
      setError("");

      const data = await getRecipes({
        search: searchTerm,
        letter: dailyLetter,
        signal,
      });

      if (!signal.aborted) {
        setRecipes(data || []);
      }
    } catch (error) {
      if (error.name === "AbortError") return;

      if (!signal.aborted) {
        setError("Something went wrong while loading recipes");
      }
    }
  }, [dailyLetter]);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setDebounce(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    const getRecipes = async () => {
      setLoading(true);

      try {
        await fetchRecipes(debounce, controller.signal);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getRecipes();

    return () => {
      controller.abort();
    };
  }, [debounce, searchTrigger, fetchRecipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDebounce(search);
    setCurrentPage(1);
    setSearchTrigger((prev) => prev + 1);
  };
  const lastRecipeIndex = currentPage * recipesPerPage;
  const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
  const currentRecipes = recipes.slice(
    firstRecipeIndex,
    lastRecipeIndex
  );

  const totalPages = Math.ceil(
    recipes.length / recipesPerPage
  );

  return (
    <>
      <Header />

      <main className="min-h-screen p-6">

        {user && (
          <div className="max-w-7xl mx-auto mb-8 mt-4">
            <p className="text-sm font-medium text-[#C8754D] mb-1">
              YOUR KITCHEN, YOUR SPACE
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#354B35]">
              Welcome back, {user.name}!
            </h2>

            <p className="text-sm sm:text-base text-[#555B50] mt-2">
              Ready to discover something delicious today?
            </p>
          </div>
        )}

        <CallToAction />

        <section>
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSubmit={handleSubmit}
          />
        </section>

        <section className="mt-10 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#354B35]">
            Recipes
          </h2>

          {loading && <Loader />}

          {error && (
            <p className="text-[#C8754D] text-center">
              {error}
            </p>
          )}

          {!loading && !error && recipes.length === 0 && (
            <p className="text-[#292B26] text-center">
              No recipes found.
            </p>
          )}

          {!loading && !error && recipes.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentRecipes.map((recipe) => (
                  <Link
                    to={`/recipe/${recipe._id}`}
                    key={recipe._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-bold text-lg text-[#354B35]">
                        {recipe.name}
                      </h3>

                      <p className="text-xs font-medium text-[#C8754D] mt-1">
                        {recipe.area || "Origin unknown"}
                      </p>

                      <p className="text-[#292B26] text-sm mt-2">
                        {recipe.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;