import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  setPassword,
  updateStatus,
  updateUser,
} from "../api/userManagement";
import type { FieldExecutiveType, UserCreateType } from "@/lib/types";
import { apiEndpoints } from "@/constants/api_constants";
import { qKey } from "@/lib/utils";
import { toast } from "sonner";
import { UserRole } from "@/lib/enums";

export const useCreateUserMutation = ({
  isAdministrator,
  password,
  confirmPassword,
}: {
  isAdministrator: boolean;
  password: string;
  confirmPassword: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.userManagement.createUser),
    mutationFn: (data: UserCreateType) => createUser(data),
    onSuccess: async (data, variables) => {
      console.log(data);
      if (isAdministrator) {
        await setPassword({
          phone: variables.phone,
          password: password,
          confirmPassword: confirmPassword,
        });
      }
      queryClient.invalidateQueries({
        queryKey: qKey([apiEndpoints.user.users, UserRole.field_executive]),
      });
      toast.success("User created successfully");
    },
    onError: (e) => {
      toast.error(e.message || "Error creating user");
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
    onError: (e) => {
      toast.error(e.message || "Error updating user status");
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
    onError: (e) => {
      toast.error(e.message || "Error updating user");
    },
  });
};
