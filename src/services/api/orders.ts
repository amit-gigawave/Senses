import { apiEndpoints } from "@/constants/api_constants";
import type {
  OrdersQueryType,
  OrderStatisticsType,
  OrderType,
} from "@/lib/types";
import { axiosInstance, handleErr } from "@/lib/utils";

export const getOrderStatistics = async (): Promise<OrderStatisticsType> => {
  try {
    const snapshot = await axiosInstance.get(apiEndpoints.orders.statistics);
    if (snapshot.status == 200) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};

export const getOrders = async ({
  orderStatus,
  orderType,
  fieldExecutiveId,
  hospitalStaffId,
  startDate,
  endDate,
}: OrdersQueryType): Promise<OrderType[]> => {
  try {
    const params = new URLSearchParams();
    if (orderStatus !== undefined) params.append("orderStatus", orderStatus);
    if (orderType !== undefined) params.append("orderType", orderType);
    if (fieldExecutiveId !== undefined)
      params.append("fieldExecutiveId", fieldExecutiveId);
    if (hospitalStaffId !== undefined)
      params.append("hospitalStaffId", hospitalStaffId);
    if (startDate !== undefined) params.append("startDate", startDate);
    if (endDate !== undefined) params.append("endDate", endDate);
    const url = `${apiEndpoints.orders.orders}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const snapshot = await axiosInstance.get(url);
    if (snapshot.status == 200) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};

export const assignOrder = async ({
  id,
  fieldExecutiveId,
}: {
  id: string;
  fieldExecutiveId: string;
}): Promise<OrderType> => {
  try {
    const snapshot = await axiosInstance.patch(
      apiEndpoints.orders.assignOrder.replace(":id", id),
      {
        fieldExecutiveId,
      }
    );

    if (snapshot.status == 200) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};

export const getReportStatistics = async ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}): Promise<OrderStatisticsType> => {
  try {
    const snapshot = await axiosInstance.get(
      apiEndpoints.orders.reports + `?startDate=${startDate}&endDate=${endDate}`
    );
    if (snapshot.status == 200) {
      return snapshot.data;
    }
    throw snapshot.data.message;
  } catch (e) {
    throw handleErr({ e });
  }
};
