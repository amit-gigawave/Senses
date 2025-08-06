import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, login } from "../api/users";
import type { LoginType } from "@/lib/types";
import { qKey, setCookie } from "@/lib/utils";
import { apiEndpoints } from "@/constants/api_constants";
import { toast } from "sonner";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.user.login),
    mutationFn: (data: LoginType) => login(data),
    onSuccess: (data) => {
      console.log({ data });
      setCookie("accessToken", data.access_token);
      setCookie("user", JSON.stringify(data.user));
      toast.success("Login successful");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
};

export const useGetUsersQuery = (role: string) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.user.users, role]),
    queryFn: () => getUsers(role),
  });
};
