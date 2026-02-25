import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Button } from "@material-tailwind/react";
import Header from "../../../../components/Header";
import { HiDocumentDownload, HiOutlineCloudUpload, HiX, HiCheck, HiOutlineExclamationCircle } from "react-icons/hi";

function ImportExcel() {
  const [excelData, setExcelData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [typeError, setTypeError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (selectedFile) {
      const fileTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        setFileName(selectedFile.name);
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
        setTypeError("Please select only Excel file types (.xlsx, .xls, .csv)");
        setExcelData([]);
        setHeaders([]);
        setFileName(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    processFile(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearFile = () => {
    setExcelData([]);
    setHeaders([]);
    setFileName(null);
    setTypeError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8 pb-10">
      <Header 
        title="Import Colleges" 
        Icon={HiDocumentDownload} 
        description="Bulk upload college data using Excel or CSV files." 
      />
      
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        <div className="p-8">
           
           {/* Upload Area */}
           {!excelData.length > 0 ? (
             <div 
                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${typeError ? 'border-red-300 bg-red-50' : 'border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-300'}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
             >
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    className="hidden" 
                    accept=".xlsx, .xls, .csv"
                />
                
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${typeError ? 'bg-red-100 text-red-500' : 'bg-white shadow-sm text-indigo-500'}`}>
                    {typeError ? <HiOutlineExclamationCircle className="w-10 h-10"/> : <HiOutlineCloudUpload className="w-10 h-10"/>}
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {typeError ? "Invalid File Type" : "Click or Drag to Upload"}
                </h3>
                <p className="text-slate-500 max-w-sm">
                    {typeError || "Support for .xlsx, .xls, and .csv files. Maximum file size 10MB."}
                </p>
             </div>
           ) : (
             <div className="space-y-6">
                {/* File Info Bar */}
                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <HiCheck className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="font-semibold text-emerald-900">{fileName}</p>
                            <p className="text-xs text-emerald-700">{excelData.length} rows found</p>
                        </div>
                    </div>
                    <button onClick={clearFile} className="p-2 hover:bg-emerald-100/50 rounded-full text-emerald-600 transition-colors">
                        <HiX className="w-5 h-5"/>
                    </button>
                </div>

                {/* Preview Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="px-6 py-3 font-semibold whitespace-nowrap">{header}</th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.slice(0, 5).map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-white border-b border-slate-100 hover:bg-slate-50/50">
                                {headers.map((header, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">{row[header]}</td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                     {excelData.length > 5 && (
                        <div className="p-3 text-center bg-slate-50 text-xs text-slate-500 border-t border-slate-200">
                            Showing first 5 of {excelData.length} rows
                        </div>
                    )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                    <button 
                        onClick={clearFile}
                        className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <Button className="px-6 py-2.5 rounded-xl bg-indigo-600 shadow-indigo-200 hover:shadow-indigo-300">
                        Import Data
                    </Button>
                </div>
             </div>
           )}

           {/* Instructions */}
           <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                   Instructions
               </h4>
               <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                   <li>Ensure your Excel file has proper headers in the first row.</li>
                   <li>Required columns might include: <strong>College Name</strong>, <strong>City</strong>, <strong>State</strong>, etc.</li>
                   <li>Dates should be formatted as YYYY-MM-DD.</li>
                   <li>Check for duplicate entries before uploading.</li>
               </ul>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ImportExcel;
