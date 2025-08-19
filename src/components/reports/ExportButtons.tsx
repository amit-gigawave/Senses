import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportReport } from "@/lib/exporters/reportExport";

interface ExportButtonsProps {
  data: any[];
}

export function ExportButtons({ data }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportReport("excel", data)}
        className="border-[#27ae60] text-[#27ae60]"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Excel
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => exportReport("pdf", data)}
        className="border-[#e74c3c] text-[#e74c3c]"
      >
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
}
