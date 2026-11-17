
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";

// Fetch favorites
export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: Boolean(sessionStorage.getItem("token")),
    retry: false,
  });
};

// Add a favorite
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,

    onSuccess: (favorites) => {
      queryClient.setQueryData(["favorites"], favorites);
    },
  });
};

// Remove a favorite
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,

    onSuccess: (favorites) => {
      queryClient.setQueryData(["favorites"], favorites);
    },
  });
};
