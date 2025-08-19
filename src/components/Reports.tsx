import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { StatsOverview } from "./reports/StatsOverview";
import { HospitalTab } from "./reports/tabs/HospitalTab";
import { ExecutiveTab } from "./reports/tabs/ExecutiveTab";
import { ClipboardList, Users, Activity } from "lucide-react";
import { useGetReportStatistics } from "@/services/query/ordersQuery";
import { toLocalISOString } from "@/lib/utils";

export function Reports() {
  const [statsFromDate, setStatsFromDate] = useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [statsToDate, setStatsToDate] = useState<Date>(new Date());

  const { data } = useGetReportStatistics({
    startDate: statsFromDate?.toISOString() ?? toLocalISOString(statsFromDate),
    endDate: statsToDate?.toISOString() ?? toLocalISOString(statsToDate),
  });

  const stats = useMemo(() => {
    return [
      {
        title: "Total Orders",
        value: data?.totalOrders ?? 0,
        icon: ClipboardList,
        color: "bg-[#3498db]",
        lightColor: "bg-[#ebf3fd]",
      },
      {
        title: "Total Executives",
        value: data?.totalExecutives ?? 0,
        icon: Users,
        color: "bg-[#27ae60]",
        lightColor: "bg-[#eafaf1]",
      },
      {
        title: "Total Hospitals",
        value: data?.totalHospitals ?? 0,
        icon: Activity,
        color: "bg-[#e74c3c]",
        lightColor: "bg-[#fdeaea]",
      },
    ];
  }, [data]);

  return (
    <div className="space-y-6">
      <StatsOverview
        statsFromDate={statsFromDate}
        statsToDate={statsToDate}
        setStatsFromDate={setStatsFromDate}
        setStatsToDate={setStatsToDate}
        stats={stats}
        onUpdate={() => { /* trigger if needed */ }}
      />

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
              <TabsTrigger value="hospital" className="h-10 data-[state=active]:bg-white data-[state=active]:text-[#2c3e50] data-[state=active]:shadow-sm">
                Hospital
              </TabsTrigger>
              <TabsTrigger value="executive" className="h-10 data-[state=active]:bg-white data-[state=active]:text-[#2c3e50] data-[state=active]:shadow-sm">
                Executive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hospital" className="space-y-4">
              <HospitalTab />
            </TabsContent>

            <TabsContent value="executive" className="space-y-4">
              <ExecutiveTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
