import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  CalendarIcon,
  Download,
  ClipboardList,
  Users,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { useGetReportStatistics } from "@/services/query/ordersQuery";
import { toLocalISOString } from "@/lib/utils";

export function Reports() {
  const [statsFromDate, setStatsFromDate] = useState<Date | undefined>(
    undefined
  );
  const [statsToDate, setStatsToDate] = useState<Date | undefined>(undefined);
  const [hospitalFromDate, setHospitalFromDate] = useState<Date | undefined>(
    undefined
  );
  const [hospitalToDate, setHospitalToDate] = useState<Date | undefined>(
    undefined
  );
  const [executiveFromDate, setExecutiveFromDate] = useState<Date | undefined>(
    undefined
  );
  const [executiveToDate, setExecutiveToDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [selectedExecutive, setSelectedExecutive] = useState("all");
  const [hospitalReports, setHospitalReports] = useState<any[]>([]);
  const [executiveReports, setExecutiveReports] = useState<any[]>([]);
  const [showHospitalReports, setShowHospitalReports] = useState(false);
  const [showExecutiveReports, setShowExecutiveReports] = useState(false);

  // Mock data
  const hospitals = [
    "City General Hospital",
    "Metropolitan Medical Center",
    "Regional Health Institute",
    "Central Community Hospital",
    "Advanced Care Medical Center",
  ];

  const executives = [
    "Mike Rodriguez",
    "Sarah Johnson",
    "Jennifer Smith",
    "David Kim",
    "James Wilson",
  ];

  const mockHospitalReports = [
    {
      orderNumber: "ORD001",
      hospitalName: "City General Hospital",
      executiveName: "Mike Rodriguez",
      amountCollected: "$250.00",
      dateOfCollection: "2024-07-15",
    },
    {
      orderNumber: "ORD002",
      hospitalName: "Metropolitan Medical Center",
      executiveName: "Sarah Johnson",
      amountCollected: "$180.00",
      dateOfCollection: "2024-07-16",
    },
    {
      orderNumber: "ORD003",
      hospitalName: "City General Hospital",
      executiveName: "Jennifer Smith",
      amountCollected: "$320.00",
      dateOfCollection: "2024-07-17",
    },
  ];

  const mockExecutiveReports = [
    {
      orderNumber: "ORD001",
      hospitalName: "City General Hospital",
      executiveName: "Mike Rodriguez",
      amountCollected: "$250.00",
      dateOfCollection: "2024-07-15",
    },
    {
      orderNumber: "ORD004",
      hospitalName: "Regional Health Institute",
      executiveName: "Mike Rodriguez",
      amountCollected: "$290.00",
      dateOfCollection: "2024-07-18",
    },
    {
      orderNumber: "ORD005",
      hospitalName: "Central Community Hospital",
      executiveName: "Mike Rodriguez",
      amountCollected: "$175.00",
      dateOfCollection: "2024-07-19",
    },
  ];

  const stats = [
    {
      title: "Total Orders",
      value: "247",
      change: "+12%",
      changeText: "vs last period",
      icon: ClipboardList,
      color: "bg-[#3498db]",
      lightColor: "bg-[#ebf3fd]",
    },
    {
      title: "Total Executives",
      value: "12",
      change: "+2",
      changeText: "new this month",
      icon: Users,
      color: "bg-[#27ae60]",
      lightColor: "bg-[#eafaf1]",
    },
    {
      title: "Total Hospitals",
      value: "8",
      change: "+1",
      changeText: "new partner",
      icon: Activity,
      color: "bg-[#e74c3c]",
      lightColor: "bg-[#fdeaea]",
    },
  ];

  const {} = useGetReportStatistics({
    startDate:
      statsFromDate?.toISOString() ??
      toLocalISOString(new Date().toISOString()),
    endDate:
      statsToDate?.toISOString() ?? toLocalISOString(new Date().toISOString()),
  });

  const handleGenerateHospitalReports = () => {
    // Filter mock data based on selected hospital and date range
    let filteredReports = mockHospitalReports;

    if (selectedHospital !== "all") {
      filteredReports = filteredReports.filter(
        (report) => report.hospitalName === selectedHospital
      );
    }

    setHospitalReports(filteredReports);
    setShowHospitalReports(true);
  };

  const handleGenerateExecutiveReports = () => {
    // Filter mock data based on selected executive and date range
    let filteredReports = mockExecutiveReports;

    if (selectedExecutive !== "all") {
      filteredReports = filteredReports.filter(
        (report) => report.executiveName === selectedExecutive
      );
    }

    setExecutiveReports(filteredReports);
    setShowExecutiveReports(true);
  };

  const handleExportReport = (type: "excel" | "pdf", data: any[]) => {
    // Handle export logic here
    console.log(`Exporting ${type} with data:`, data);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Overview with Date Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Performance Overview</CardTitle>
          <CardDescription>
            Comprehensive metrics and key performance indicators for the
            selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Label>From:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {statsFromDate
                      ? format(statsFromDate, "PPP")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={statsFromDate}
                    onSelect={setStatsFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2">
              <Label>To:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {statsToDate ? format(statsToDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={statsToDate}
                    onSelect={setStatsToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button className="bg-[#3498db] hover:bg-[#2980b9] text-white">
              Update Stats
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.lightColor}`}>
                        <IconComponent
                          className={`w-6 h-6 text-white ${stat.color}`}
                        />
                      </div>
                      <div
                        className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-[#717182] font-medium">
                        {stat.title}
                      </p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-[#2c3e50]">
                          {stat.value}
                        </h3>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#27ae60]">
                            {stat.change}
                          </p>
                          <p className="text-xs text-[#717182]">
                            {stat.changeText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color}`}
                  ></div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#2c3e50]">Report Filters</CardTitle>
          <CardDescription>
            Generate detailed reports by hospital or executive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hospital" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12 bg-[#f5f6fa] p-1">
              <TabsTrigger
                value="hospital"
                className="h-10 data-[state=active]:bg-white data-[state=active]:text-[#2c3e50] data-[state=active]:shadow-sm"
              >
                Hospital
              </TabsTrigger>
              <TabsTrigger
                value="executive"
                className="h-10 data-[state=active]:bg-white data-[state=active]:text-[#2c3e50] data-[state=active]:shadow-sm"
              >
                Executive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hospital" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Hospital</Label>
                  <Select
                    value={selectedHospital}
                    onValueChange={setSelectedHospital}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Hospitals</SelectItem>
                      {hospitals.map((hospital) => (
                        <SelectItem key={hospital} value={hospital}>
                          {hospital}
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
                        {hospitalToDate
                          ? format(hospitalToDate, "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleExportReport("excel", hospitalReports)
                        }
                        className="border-[#27ae60] text-[#27ae60]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Excel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleExportReport("pdf", hospitalReports)
                        }
                        className="border-[#e74c3c] text-[#e74c3c]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
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
                      {hospitalReports.map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {report.orderNumber}
                          </TableCell>
                          <TableCell>{report.hospitalName}</TableCell>
                          <TableCell>{report.executiveName}</TableCell>
                          <TableCell>{report.amountCollected}</TableCell>
                          <TableCell>{report.dateOfCollection}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="executive" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Executive</Label>
                  <Select
                    value={selectedExecutive}
                    onValueChange={setSelectedExecutive}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select executive" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Executive Names</SelectItem>
                      {executives.map((executive) => (
                        <SelectItem key={executive} value={executive}>
                          {executive}
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
                        {executiveFromDate
                          ? format(executiveFromDate, "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={executiveFromDate}
                        onSelect={setExecutiveFromDate}
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
                        {executiveToDate
                          ? format(executiveToDate, "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={executiveToDate}
                        onSelect={setExecutiveToDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button
                onClick={handleGenerateExecutiveReports}
                className="bg-[#3498db] hover:bg-[#2980b9] text-white"
              >
                Generate Reports
              </Button>

              {showExecutiveReports && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-[#2c3e50]">
                      Executive Reports
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleExportReport("excel", executiveReports)
                        }
                        className="border-[#27ae60] text-[#27ae60]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Excel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleExportReport("pdf", executiveReports)
                        }
                        className="border-[#e74c3c] text-[#e74c3c]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
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
                      {executiveReports.map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {report.orderNumber}
                          </TableCell>
                          <TableCell>{report.hospitalName}</TableCell>
                          <TableCell>{report.executiveName}</TableCell>
                          <TableCell>{report.amountCollected}</TableCell>
                          <TableCell>{report.dateOfCollection}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
