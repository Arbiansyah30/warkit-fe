import { IncomeModel } from "@model/income";
import React, { useState } from "react";
import { FaChevronDown, FaFilePdf, FaFileExcel, FaChevronUp } from "react-icons/fa";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from "../../libs/helper/FormatTime";

const DropdownPrint: React.FC<{ dataIncome: IncomeModel }> = ({ dataIncome }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Cetak Excel
  const handleExportExcel = () => {
    const worksheetData = dataIncome?.incomes.map((row, index) => ({
      No: index + 1,
      Date: formatDate(row.createdAt),
      'Total Product Sold': row.transaction?.totalQuantity ?? 0,
      Income: row.nominal,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cetak PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Menambahkan judul dengan posisi yang tepat
    doc.text('Sales Report', 14, 20);
    
    const rows = dataIncome?.incomes.map((row, index) => [
      index + 1,
      formatDate(row.createdAt),
      row.transaction?.totalQuantity ?? 0,
      row.nominal 
    ]);
  
    autoTable(doc, {
      startY: 30,
      head: [['No', 'Date', 'Total Product Sold', 'Income']],
      body: rows as Array<Array<string | number>>, 
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { halign: 'center' }, 
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 }, 
        1: { halign: 'center', cellWidth: 50 }, 
        2: { halign: 'center', cellWidth: 50 }, 
        3: { halign: 'center', cellWidth: 50 }, 
      },
    });
  
    const pdfBlob = doc.output('blob');
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'report.pdf';
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
