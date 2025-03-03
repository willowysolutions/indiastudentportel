import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@material-tailwind/react";

function ImportExcel() {
  const [excelData, setExcelData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [typeError, setTypeError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = () => {
          const workbook = XLSX.read(reader.result, { type: "buffer" });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);

          if (data.length > 0) {
            setHeaders(Object.keys(data[0])); // Extract column names (headers)
            setExcelData(data); // Set table data
          }
        };
      } else {
        setTypeError("Please select only Excel file types");
        setExcelData([]);
        setHeaders([]);
      }
    }
  };

  return (
    <div className="bg-white">
      <h2>Import Excel File</h2>
      <input type="file" onChange={handleFileChange} />

      {typeError && <p style={{ color: "red" }}>{typeError}</p>}

      {excelData.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-end m-10">
        <Button>import</Button>
      </div>
    </div>
  );
}

export default ImportExcel;
