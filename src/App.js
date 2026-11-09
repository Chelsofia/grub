
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import RecipeDetails from "./RecipeDetails";
import Login from "./components/Login";
import useCurrentUser from "./hooks/useCurrentUser";

function App() {
  const {
    data: user,
    isLoading,
  } = useCurrentUser();

  if (isLoading) {
    return <p>Checking authentication...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
