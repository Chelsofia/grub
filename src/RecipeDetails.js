
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "./components/Loader";
import Header from "./components/Header";

const fetchRecipe = async (id) => {
  const response = await fetch(
    `http://localhost:5001/api/recipes/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = await response.json();

  return data.recipe;
};

function RecipeDetails() {
  const { id } = useParams();

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipe(id),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <button
          className="text-white px-5 py-2 rounded-md mb-5 transition"
          onClick={() => window.history.back()}
        >
          Back
        </button>

        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full max-w-[450px] h-auto mx-auto rounded-lg"
        />
      </div>

      <section className="text-center max-w-2xl mx-auto px-4 mt-8 mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          {recipe.name}
        </h2>

        <div className="flex justify-center items-center gap-2 mb-5">
          <span className="text-sm font-semibold uppercase tracking-wider">
            Category
          </span>

          <span className="bg-[--color-secondary] px-4 py-1 rounded-full text-sm font-medium">
            {recipe.category}
          </span>
        </div>

        <p className="text-sm font-medium text-[#C8754D] mb-5">
          Origin: {recipe.area || "Unknown"}
        </p>
           {recipe.youtubeUrl && (
  <a
    href={recipe.youtubeUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-[--color-primary] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
  >
    <span>▶</span>
    Watch Recipe Video
  </a>
)}
      </section>
   

      <section className="max-w-4xl mx-auto px-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Instructions
        </h2>

        <p className="text-gray-700 leading-8 whitespace-pre-line text-justify">
          {recipe.instructions}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">
          Ingredients
        </h2>

        <ul className="list-disc list-inside space-y-2 mb-20">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>
              {item.measure} {item.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default RecipeDetails;
