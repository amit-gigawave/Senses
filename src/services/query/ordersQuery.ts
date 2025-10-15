import { apiEndpoints } from "@/constants/api_constants";
import { qKey } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignOrder,
  getHospitalsReports,
  getOrders,
  getOrderStatistics,
  getReportStatistics,
} from "../api/orders";
import type { OrdersQueryType } from "@/lib/types";
import { toast } from "sonner";

export const useGetOrderStatistics = () => {
  return useQuery({
    queryKey: qKey(apiEndpoints.orders.statistics),
    queryFn: () => getOrderStatistics(),
  });
};

export const useGetOrdersQuery = (
  data: OrdersQueryType,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.orders.orders, JSON.stringify(data)]),
    queryFn: () => getOrders(data),
    enabled: options?.enabled ?? true,
  });
};

export const useAssignOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: qKey(apiEndpoints.orders.assignOrder),
    mutationFn: assignOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qKey(apiEndpoints.orders.orders),
      });
      toast.success("Order assigned successfully");
    },
    onError: (e) => {
      toast.error(e.message || "Failed to assign order");
    },
  });
};

export const useGetReportStatistics = (data: {
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.orders.reports, JSON.stringify(data)]),
    queryFn: () => getReportStatistics(data),
  });
};

export const useGetHospitalsReportsQuery = (
  data: {
    startDate?: string;
    endDate?: string;
    hospitalName?: string;
  },
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: qKey([apiEndpoints.orders.hospitalReports, JSON.stringify(data)]),
    queryFn: () => getHospitalsReports(data),
    enabled: options?.enabled ?? true,
  });
};
