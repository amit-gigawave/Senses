import { useMutation, useQuery } from "@tanstack/react-query";
import { forgotPassword, getUsers, login, resetPassword } from "../api/users";
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
      toast.error(e.message || "Failed to login");
    },
  });
};

export const useGetUsersQuery = (role: string) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.user.users, role]),
    queryFn: () => getUsers(role),
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.user.forgotPassword),
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent successfully");
    },
    onError: (e) => {
      toast.error(e.message || "Failed to send password reset link");
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.user.resetPassword),
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully");
    },
    onError: (e) => {
      toast.error(e.message || "Failed to reset password");
    },
  });
};
