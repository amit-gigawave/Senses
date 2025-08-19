import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateStatus, updateUser } from "../api/userManagement";
import type { FieldExecutiveType, UserCreateType } from "@/lib/types";
import { apiEndpoints } from "@/constants/api_constants";
import { qKey } from "@/lib/utils";
import { toast } from "sonner";
import { UserRole } from "@/lib/enums";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: qKey(apiEndpoints.userManagement.createUser),
    mutationFn: (data: UserCreateType) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qKey([apiEndpoints.user.users, UserRole.field_executive])
      })
      toast.success("User created successfully");
    },
  });
};

export const useUpdateStatusMutation = () => {
  return useMutation({
    mutationKey: qKey(apiEndpoints.userManagement.updateStatus),
    mutationFn: (data: { id: string; isActive: boolean }) => updateStatus(data),
    onSuccess: () => {
      toast.success("User status updated successfully");
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.userManagement.updateUser),
    mutationFn: (data: FieldExecutiveType) => updateUser(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: qKey([apiEndpoints.user.users, variables.role]),
      });
      toast.success("User updated successfully");
    },
  });
};
