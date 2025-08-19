import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExportButtons } from "../ExportButtons";
import { useGetUsersQuery } from "@/services/query/userQuery";
import { UserRole } from "@/lib/enums";
import { useGetOrdersQuery } from "@/services/query/ordersQuery";

export function ExecutiveTab() {
  const [selectedExecutive, setSelectedExecutive] = useState<string>("all");
  const [executiveFromDate, setExecutiveFromDate] = useState<Date | undefined>(undefined);
  const [executiveToDate, setExecutiveToDate] = useState<Date | undefined>(undefined);
  const [showExecutiveReports, setShowExecutiveReports] = useState(false);

  const { data: availableExecutives } = useGetUsersQuery(UserRole.field_executive);
  const { data: orders, refetch } = useGetOrdersQuery(
    {
      ...(selectedExecutive !== "all" && { fieldExecutiveId: selectedExecutive }),
      startDate: executiveFromDate?.toISOString(),
      endDate: executiveToDate?.toISOString(),
    },
    { enabled: false }
  );

  const handleGenerateExecutiveReports = async () => {
    await refetch();
    setShowExecutiveReports(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Executive</Label>
          <Select value={selectedExecutive} onValueChange={setSelectedExecutive}>
            <SelectTrigger>
              <SelectValue placeholder="Select executive" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Executive Names</SelectItem>
              {availableExecutives?.map((executive) => (
                <SelectItem key={executive.id} value={executive.id}>
                  {executive.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {executiveFromDate ? format(executiveFromDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={executiveFromDate} onSelect={setExecutiveFromDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {executiveToDate ? format(executiveToDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={executiveToDate} onSelect={setExecutiveToDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button onClick={handleGenerateExecutiveReports} className="bg-[#3498db] hover:bg-[#2980b9] text-white">
        Generate Reports
      </Button>

      {showExecutiveReports && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#2c3e50]">Executive Reports</h3>
            <ExportButtons data={orders ?? []} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Hospital Name</TableHead>
                <TableHead>Executive Name</TableHead>
                <TableHead>Amount Collected</TableHead>
                <TableHead>Date of Collection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((report, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>{report.hospitalName}</TableCell>
                  <TableCell>{report.fieldExecutive?.name}</TableCell>
                  <TableCell>{report.amountCollected}</TableCell>
                  <TableCell>{report.collectionDate ? format(report.collectionDate, "PPP") : ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
