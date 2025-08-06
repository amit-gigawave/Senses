import { apiEndpoints } from "@/constants/api_constants";
import type { FieldExecutiveType, UserCreateType } from "@/lib/types";
import { axiosInstance, handleErr } from "@/lib/utils";

export const createUser = async (data: UserCreateType) => {
  try {
    const snapshot = await axiosInstance.post(
      apiEndpoints.userManagement.createUser,
      data
    );
    if (snapshot.status == 201) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};

export const updateStatus = async ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  try {
    const snapshot = await axiosInstance.patch(
      apiEndpoints.userManagement.updateStatus.replace(":id", id) +
        `?isActive=${isActive}`
    );
    if (snapshot.status == 200) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};

export const updateUser = async (data: FieldExecutiveType) => {
  try {
    const snapshot = await axiosInstance.patch(
      apiEndpoints.userManagement.updateUser.replace(":id", data.id),
      data
    );
    if (snapshot.status == 200) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};
