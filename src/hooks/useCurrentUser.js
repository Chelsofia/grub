
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authService";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: Boolean(sessionStorage.getItem("token")),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export default useCurrentUser;
