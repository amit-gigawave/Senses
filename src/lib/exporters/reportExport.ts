import { format } from "date-fns";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type ReportExportType = "excel" | "pdf";

function normalizeRows(data: any[]) {
  return (data ?? []).map((r: any) => ({
    "Order #": r.id ?? r.orderNumber ?? "",
    Hospital: r.hospitalName ?? "",
    Executive: r.fieldExecutive?.name ?? r.executiveName ?? "",
    "Amount Collected": r.amountCollected ?? "",
    "Collection Date": r.collectionDate
      ? format(new Date(r.collectionDate), "yyyy-MM-dd")
      : r.dateOfCollection ?? "",
    "Patient Name": r.patientName ?? r.patient?.name ?? "",
    "Patient Number": r.patientMobileNumber ?? r.patient?.mobileNumber ?? "",
  }));
}

export function exportReport(type: ReportExportType, data: any[]) {
  const rows = normalizeRows(data);

  if (type === "excel") {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    const fileName = `Reports_${format(new Date(), "yyyy-MM-dd_HH-mm")}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    return;
  }

  if (type === "pdf") {
    const doc = new jsPDF({ orientation: "landscape" });
    const head = [
      [
        "Order #",
        "Hospital",
        "Executive",
        "Amount Collected",
        "Collection Date",
        "Patient Name",
        "Patient Number",
      ],
    ];
    const body = rows.map((r) => [
      r["Order #"],
      r.Hospital,
      r.Executive,
      r["Amount Collected"],
      r["Collection Date"],
      r["Patient Name"],
      r["Patient Number"],
    ]);

    autoTable(doc, {
      head,
      body,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [39, 174, 96] },
      margin: { top: 14 },
    });

    const fileName = `Reports_${format(new Date(), "yyyy-MM-dd_HH-mm")}.pdf`;
    doc.save(fileName);
    return;
  }
}

// Generic helper to export arbitrary row objects to Excel
export function exportJsonToExcel(
  sheetName: string,
  filePrefix: string,
  rows: Record<string, any>[]
) {
  const worksheet = XLSX.utils.json_to_sheet(rows ?? []);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || "Data");
  const fileName = `${filePrefix || "Export"}_${format(
    new Date(),
    "yyyy-MM-dd_HH-mm"
  )}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
