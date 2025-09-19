import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExportButtons } from "../ExportButtons";
import { useGetUsersQuery } from "@/services/query/userQuery";
import { UserRole } from "@/lib/enums";
import { useGetHospitalsReportsQuery } from "@/services/query/ordersQuery";
import { toLocalISOString } from "@/lib/utils";

export function HospitalTab() {
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [hospitalFromDate, setHospitalFromDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [hospitalToDate, setHospitalToDate] = useState<Date>(new Date());
  const [fromDate, setFromDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [toDate, setToDate] = useState<Date>(new Date());

  const [showHospitalReports, setShowHospitalReports] = useState(false);

  const { data } = useGetUsersQuery(UserRole.hospital_staff);
  const { data: hospitalReportsData, refetch } = useGetHospitalsReportsQuery(
    {
      startDate: toLocalISOString(fromDate),
      endDate: toLocalISOString(toDate),
      ...(selectedHospital !== "all" && { hospitalName: selectedHospital }),
    },
    { enabled: false }
  );

  const handleGenerateHospitalReports = async () => {
    setFromDate(hospitalFromDate);
    setToDate(hospitalToDate);
    refetch();
    setShowHospitalReports(true);
  };

  const hospitalOptions = useMemo(() => {
    const hospitalSet = new Set();
    data?.map((staf) => {
      hospitalSet.add(staf.hospitalName);
    });
    return Array.from(hospitalSet);
  }, [data]);

  console.log({ hospitalReportsData });

  useEffect(() => {
    refetch();
  }, [fromDate, toDate]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Hospital</Label>
          <Select value={selectedHospital} onValueChange={setSelectedHospital}>
            <SelectTrigger
              className={`h-12 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-lg pr-12`}
            >
              <SelectValue placeholder="Select hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hospitals</SelectItem>
              {hospitalOptions.map((hospital) => (
                <SelectItem
                  key={hospital as string}
                  value={(hospital as string).toLowerCase().split(" ").join("")}
                >
                  {hospital as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {hospitalFromDate
                  ? format(hospitalFromDate, "PPP")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                disabled={(date) => {
                  const d = new Date(date.toDateString());
                  const today = new Date(new Date().toDateString());
                  return d > today;
                }}
                required
                mode="single"
                selected={hospitalFromDate}
                onSelect={setHospitalFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {hospitalToDate ? format(hospitalToDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                disabled={(date) => {
                  const d = new Date(date.toDateString());
                  const today = new Date(new Date().toDateString());
                  return d > today;
                }}
                required
                mode="single"
                selected={hospitalToDate}
                onSelect={setHospitalToDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button
        onClick={handleGenerateHospitalReports}
        className="bg-[#3498db] hover:bg-[#2980b9] text-white"
      >
        Generate Reports
      </Button>

      {showHospitalReports && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#2c3e50]">
              Hospital Reports
            </h3>
            <ExportButtons data={hospitalReportsData ?? []} />
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
              {hospitalReportsData?.map((report, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {report.orderNumber}
                  </TableCell>
                  <TableCell>{report.hospitalName}</TableCell>
                  <TableCell>{report.fieldExecutive?.name}</TableCell>
                  <TableCell>{report.amountCollected}</TableCell>
                  <TableCell>{format(report.collectionDate!, "PPP")}</TableCell>
                </TableRow>
              ))}
              {hospitalReportsData?.length === 0 && (
                <TableRow className="mx-auto text-center">
                  <TableCell className="font-medium" colSpan={5}>
                    No reports available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
