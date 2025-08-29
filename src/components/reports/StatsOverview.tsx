import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface StatItem {
  title: string;
  value: number;
  icon: any; // lucide icon component
  color: string;
  lightColor: string;
}

interface StatsOverviewProps {
  statsFromDate: Date;
  statsToDate: Date;
  setStatsFromDate: (d: Date) => void;
  setStatsToDate: (d: Date) => void;
  stats: StatItem[];
  onUpdate?: () => void;
}

export function StatsOverview({
  statsFromDate: fromDate,
  statsToDate: toDate,
  setStatsFromDate: setStatsFromDateProp,
  setStatsToDate: setStatsToDateProp,
  stats,
}: StatsOverviewProps) {
  const [statsFromDate, setStatsFromDate] = useState(fromDate);
  const [statsToDate, setStatsToDate] = useState(toDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#2c3e50]">Performance Overview</CardTitle>
        <CardDescription>
          Comprehensive metrics and key performance indicators for the selected
          period
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
                  {format(statsFromDate, "PPP")}
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
                  {format(statsToDate, "PPP")}
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
                  selected={statsToDate}
                  onSelect={setStatsToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            className="bg-[#3498db] hover:bg-[#2980b9] text-white"
            onClick={() => {
              setStatsFromDateProp(statsFromDate);
              setStatsToDateProp(statsToDate);
            }}
          >
            Update Stats
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="relative overflow-hidden">
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
  );
}
