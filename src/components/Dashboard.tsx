import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  useGetOrdersQuery,
  useGetOrderStatistics,
} from "@/services/query/ordersQuery";
import type { OrderStatisticsType } from "../lib/types";
import { OrderStatus } from "@/lib/enums";
import { toLocalISOString } from "@/lib/utils";
// import { format } from "date-fns";

export function Dashboard() {
  const mapStats = (data: OrderStatisticsType | undefined) => [
    {
      title: "Total Collections Today",
      value: data ? String(data.total) : "-",
      change: "",
      color: "bg-[#27ae60]",
    },
    {
      title: "Active Executives",
      value: data ? String(data.activeExecutives) : "-",
      change: "",
      color: "bg-[#3498db]",
    },
    {
      title: "Pending Orders",
      value: data ? String(data.pendingOrders) : "-",
      change: "",
      color: "bg-[#f39c12]",
    },
    {
      title: "Unassigned Orders",
      value: data ? String(data.unAssignedOrders) : "-",
      change: "",
      color: "bg-[#e74c3c]",
    },
  ];

  const { data, isPending, refetch: refetchOrders, isFetching } = useGetOrderStatistics();
  const { data: recentOrders, isPending: ordersPending, refetch: refetchRecentOrders, isFetching: isRefetching } = useGetOrdersQuery({
    startDate: toLocalISOString(
      (() => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date.toISOString();
      })()
    ),
  });
  // const { data: unassignedOrders, isPending: unassignedOrdersPending } =
  //   useGetOrdersQuery({
  //     orderStatus: OrderStatus.Created,
  //   });
  const stats = mapStats(data);

  if (isPending || ordersPending || isFetching || isRefetching) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button
          variant="outline"
          className="!border-[#3498db] text-[#3498db] !bg-transparent"
          onClick={() => {
            refetchOrders()
            refetchRecentOrders()
          }}
        >
          Refresh Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#2c3e50]">
                {stat.title}
              </CardTitle>
              <div className={`w-4 h-4 rounded-full ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2c3e50]">
                {stat.value}
              </div>
              <p className="text-xs text-[#717182]">
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="">
        {/* Recent Collections */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">Recent Collections</CardTitle>
            <CardDescription>
              Latest blood sample collections today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Executive</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders?.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell className="font-medium">
                      {collection.id}
                    </TableCell>
                    <TableCell>{collection.patientName}</TableCell>
                    <TableCell>{collection.fieldExecutiveId}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          collection.orderStatus === OrderStatus.Completed
                            ? "default"
                            : "secondary"
                        }
                        className={
                          collection.orderStatus === OrderStatus.Completed
                            ? "bg-[#27ae60] text-white"
                            : collection.orderStatus === OrderStatus.OnTheWay
                              ? "bg-[#f39c12] text-white"
                              : "bg-[#3498db] text-white"
                        }
                      >
                        {collection.orderStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Unassigned Orders Queue */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-[#2c3e50]">Unassigned Orders</CardTitle>
            <CardDescription>
              Orders waiting for executive assignment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unassignedOrders?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#2c3e50]">
                        {order.id}
                      </span>
                    </div>
                    <p className="text-sm text-[#717182]">
                      {order.patientName}
                    </p>
                    <p className="text-xs text-[#717182]">
                      {order.orderType} Collection •{" "}
                      {format(order.createdAt, "dd/MM/yyyy, h:mm a")}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#3498db] hover:bg-[#2980b9] text-white"
                  >
                    Assign
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
