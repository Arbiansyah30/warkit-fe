import { IncomeModel } from "@model/income";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaFileExcel,
  FaFilePdf,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { formatRupiah } from "../../libs/helper";
import { formatDate } from "../../libs/helper/FormatTime";

const DropdownPrint: React.FC<{ dataIncome: IncomeModel }> = ({
  dataIncome,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Cetak Excel
  const handleExportExcel = () => {
    const worksheetData = dataIncome?.incomes.map((row, index) => ({
      No: index + 1,
      Date: formatDate(row.createdAt),
      Name: row.transaction?.name ?? "",
      Email: row.transaction?.email ?? "",
      "Total Product Sold": row.transaction?.totalQuantity ?? 0,
      Income: row.nominal,
    }));

    const worksheet = XLSX.utils.json_to_sheet([
      ...worksheetData,
      {
        No: "Total",
        Date: "",
        Name: "",
        Email: "",
        "Total Product Sold": "",
        Income: formatRupiah(dataIncome?.totalIncome as number),
      },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cetak PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Menambahkan judul dengan posisi yang tepat
    doc.text("Sales Report Warmindo Kita", 14, 20);

    const rows = dataIncome?.incomes.map((row, index) => [
      index + 1,
      formatDate(row.createdAt),
      row.transaction?.name,
      row.transaction?.email,
      row.transaction?.totalQuantity ?? 0,
      formatRupiah(row.nominal) as string,
    ]);
    autoTable(doc, {
      startY: 30,
      head: [["No", "Date", "Name", "Email", "Total Product", "Income"]],
      body: [
        ...(rows as any),
        ["Total", "", "", "", "", formatRupiah(dataIncome?.totalIncome)],
      ],
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { halign: "center" },
      columnStyles: {
        0: { halign: "center", cellWidth: 20 },
        1: { halign: "center", cellWidth: 40 },
        2: { halign: "center", cellWidth: 25 },
        3: { halign: "center", cellWidth: 35 },
        4: { halign: "center", cellWidth: 25 },
        5: { halign: "center", cellWidth: 35 },
      },
    });

    const pdfBlob = doc.output("blob");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative text-right">
      <button
        type="button"
        className="inline-flex items-center text-sm justify-center px-3 py-2 bg-secondary rounded-md hover:opacity-90 focus:outline-none"
        onClick={toggleDropdown}
      >
        Options
        {isOpen ? (
          <FaChevronUp className="ml-2 -mr-1" />
        ) : (
          <FaChevronDown className="ml-2 -mr-1" />
        )}
      </button>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full"
              role="menuitem"
              onClick={handleExportPDF}
            >
              <FaFilePdf className="mr-2 text-red-600" />
              Print PDF
            </button>
            <button
              className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full"
              role="menuitem"
              onClick={handleExportExcel}
            >
              <FaFileExcel className="mr-2 text-green-600" />
              Print Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownPrint;
