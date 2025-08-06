import { apiEndpoints } from "@/constants/api_constants";
import type { FieldExecutiveType, LoginResponse, LoginType } from "@/lib/types";
import { axiosInstance, handleErr } from "@/lib/utils";

export const login = async (auth: LoginType): Promise<LoginResponse> => {
  try {
    const snapshot = await axiosInstance.post(apiEndpoints.user.login, {
      ...auth,
    });
    if (snapshot.status == 201) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};

export const getUsers = async (role: string): Promise<FieldExecutiveType[]> => {
  try {
    const snapshot = await axiosInstance.get(
      `${apiEndpoints.user.users}?role=${role}`
    );
    if (snapshot.status == 200) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};
