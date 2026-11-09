
const API_URL = "http://localhost:5001/api/auth";

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getCurrentUser = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    sessionStorage.removeItem("token");
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to retrieve user information");
  }

  const data = await response.json();

  return data.user;
};
