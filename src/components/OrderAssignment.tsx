import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { OrderStatus, UserRole } from "@/lib/enums";
import {
  useAssignOrderMutation,
  useGetOrdersQuery,
} from "@/services/query/ordersQuery";
import { format } from "date-fns";
import { useGetUsersQuery } from "@/services/query/userQuery";
import type { OrderType } from "@/lib/types";

export function OrderAssignment() {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  const { data: pendingOrders, isPending: unassignedOrdersPending } =
    useGetOrdersQuery({
      orderStatus: OrderStatus.Created,
    });

  const { data: availableExecutives, isPending: executivesPending } =
    useGetUsersQuery(UserRole.field_executive);

  const { mutateAsync: assignOrder, isPending: assignmentPending } =
    useAssignOrderMutation();

  const handleAssignOrder = async () => {
    if (selectedOrder && selectedExecutive) {
      // Handle assignment logic here
      await assignOrder({
        id: selectedOrder.id,
        fieldExecutiveId: selectedExecutive,
      });
      setShowAssignDialog(false);
      setSelectedOrder(null);
      setSelectedExecutive("");
      setAssignmentNotes("");
    }
  };

  const openAssignDialog = (order: OrderType) => {
    setSelectedOrder(order);
    setShowAssignDialog(true);
  };

  if (unassignedOrdersPending || executivesPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2c3e50]">Pending Orders</CardTitle>
              <CardDescription>
                Orders waiting for executive assignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingOrders?.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#2c3e50]">
                          {order.orderNumber}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-[#3498db] text-[#3498db]"
                        >
                          {order.orderType} Collection
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => openAssignDialog(order)}
                        className="bg-[#3498db] hover:bg-[#2980b9] text-white"
                      >
                        Assign
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#717182]">Patient</p>
                        <p className="font-medium text-[#2c3e50]">
                          {order.patientName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#717182]">Tests Required</p>
                        <p className="font-medium text-[#2c3e50]">
                          {order.testType}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#717182]">Created</p>
                        <p className="font-medium text-[#2c3e50]">
                          {format(order.createdAt, "dd/MM/yyyy, h:mm a")}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#717182]">Type</p>
                        <p className="font-medium text-[#2c3e50]">
                          {order.orderType} Collection
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#717182] text-sm">Address</p>
                      <p className="text-sm text-[#2c3e50]">
                        {order.area}, {order.street}, {order.city},{" "}
                        {order.district}, {order.state}, {order.state},{" "}
                        {order.pincode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Executives */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-[#2c3e50]">
                Available Executives
              </CardTitle>
              <CardDescription>
                Field executives ready for assignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableExecutives?.map(
                  (executive) =>
                    executive.isActive && (
                      <div
                        key={executive.id}
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#2c3e50]">
                            {executive.name}
                          </span>
                          <Badge className="bg-[#27ae60] text-white">
                            {executive.isActive ? "Available" : "Not Available"}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#717182]">ID: </span>
                            <span className="text-[#2c3e50]">
                              {executive.userId}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assignment Dialog */}
      <Dialog
        open={showAssignDialog}
        onOpenChange={() => {
          setShowAssignDialog((prev) => !prev);
          setSelectedExecutive("");
          setAssignmentNotes("");
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Order to Executive</DialogTitle>
            <DialogDescription>
              Select an executive to assign this order to.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="border rounded-lg p-3 bg-[#f5f6fa]">
                <h4 className="font-medium text-[#2c3e50] mb-2">
                  Order Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-[#717182]">Order ID:</span>
                    <span className="ml-2 text-[#2c3e50]">
                      {selectedOrder.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#717182]">Patient:</span>
                    <span className="ml-2 text-[#2c3e50]">
                      {selectedOrder.patientName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#717182]">Type:</span>
                    <span className="ml-2 text-[#2c3e50]">
                      {selectedOrder.orderType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#717182]">Tests:</span>
                    <span className="ml-2 text-[#2c3e50]">
                      {selectedOrder.testType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="executive">Select Executive</Label>
                <Select
                  value={selectedExecutive}
                  onValueChange={setSelectedExecutive}
                >
                  <SelectTrigger
                    className={`!h-12 w-full bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl $`}
                  >
                    <SelectValue placeholder="Choose an executive" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableExecutives?.map((executive) =>
                      executive.isActive ? (
                        <SelectItem key={executive.id} value={executive.userId}>
                          {executive.name} ({executive.userId})
                        </SelectItem>
                      ) : null
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Assignment Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  className={`!h-12 w-full bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl $`}
                  placeholder="Add any special instructions..."
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAssignDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAssignOrder}
                  disabled={!selectedExecutive || assignmentPending}
                  className="bg-[#3498db] hover:bg-[#2980b9] text-white"
                >
                  Assign and Share Order Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
