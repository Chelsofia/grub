
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: async (data) => {
      sessionStorage.setItem("token", data.token);

      // Update the current-user cache immediately.
      if (data.user) {
        queryClient.setQueryData(["currentUser"], data.user);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
      }

      navigate("/");
    },

    onError: (error) => {
      setError(error.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-[var(--color-white)] rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* Image section */}
        <div className="hidden md:block relative min-h-[600px]">

          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1000"
            alt="Delicious freshly prepared food"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[var(--color-primary)]/65 flex flex-col justify-end p-10 text-white">

            <p className="text-sm uppercase tracking-[0.2em] mb-4 text-[var(--color-secondary)]">
              Welcome to grub
            </p>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Good food brings people together.
            </h2>

            <p className="text-white/85 text-lg">
              Discover delicious recipes, explore new flavours,
              and make every meal memorable.
            </p>

          </div>
        </div>

        {/* Login form */}
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16">

          <Link
            to="/"
            className="text-2xl font-bold text-[var(--color-primary)] mb-10"
          >
            Grub<span className="text-[var(--color-accent)]">.</span>
          </Link>

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
              Welcome back!
            </h1>

            <p className="text-[var(--color-text)]/65">
              Log in to discover your next favourite recipe.
            </p>

          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text)] mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-secondary)]/60 rounded-xl outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary)]/40"
              />

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] transition"
                >
                  Forgot password?
                </Link>

              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-secondary)]/60 rounded-xl outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary)]/40"
              />

            </div>

            {/* Error */}
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-sm text-[var(--color-text)]/70 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--color-primary)] font-semibold hover:text-[var(--color-accent)] transition"
            >
              Sign up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Login;
