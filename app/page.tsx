"use client";
import { KokardeCard } from "@/components/kokarde";
import { Siswa } from "@/types/siswa";
import { FileSpreadsheet, Printer, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const CARDS_PER_A4 = 4; // 4 kokarde per halaman A4 (2x2 grid)

export default function KokardeGeneratorPage() {
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);
  const [fileName, setFileName] = useState<string>("");

  // Fungsi membaca file CSV / Excel
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert ke JSON
      const json: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet);

      // Mapping fleksibel kolom Excel ke tipe Siswa
      const formattedData: Siswa[] = json.map((item, idx) => {
        // Helper pencari key fleksibel (tahan spasi & huruf besar/kecil)
        const getValue = (possibleKeys: string[], defaultValue = "-") => {
          const foundKey = Object.keys(item).find((k) =>
            possibleKeys.includes(k.trim().toUpperCase()),
          );
          return foundKey &&
            item[foundKey] !== undefined &&
            item[foundKey] !== ""
            ? String(item[foundKey]).trim()
            : defaultValue;
        };

        return {
          id: String(idx + 1),
          nomorUrut: getValue(["NOMORURUT"]).padStart(3, "0"),
          namaSiswa: getValue(["NAMASISWA"]),
          kelas: getValue(["KELAS"]),
          lokal: getValue(["LOKAL", "RUANG", "RUANGAN"], "1"),
        };
      });

      setSiswaList(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Chunking data menjadi halaman-halaman A4
  const chunkedPages = [];
  for (let i = 0; i < siswaList.length; i += CARDS_PER_A4) {
    chunkedPages.push(siswaList.slice(i, i + CARDS_PER_A4));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* UI Control / Form Upload (Sembunyi saat di-print) */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8 print:hidden">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Generator Kokarde (328+ Anak)
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Upload file <strong>.csv</strong> atau <strong>.xlsx</strong> dengan
          kolom minimal: <code>NAMA</code>, <code>KELAS</code>,{" "}
          <code>LOKAL</code>, <code>NOMOR UJIAN</code>.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileUpload}
            id="file-upload"
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-10 h-10 text-blue-500 mb-2" />
            <span className="font-semibold text-gray-700">
              Klik untuk upload file Excel / CSV
            </span>
            <span className="text-xs text-gray-400 mt-1">
              Format terdukung: XLSX, XLS, CSV
            </span>
          </label>
        </div>

        {/* Status Data */}
        {siswaList.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-700">{fileName}</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Total: {siswaList.length} Anak ({chunkedPages.length} Halaman
                A4)
              </span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setSiswaList([]);
                  setFileName("");
                }}
                className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 px-3 py-2 border rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Data</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Export PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tampilan Lembaran A4 Untuk Print & Preview */}
      {siswaList.length === 0 ? (
        <div className="text-center py-12 text-gray-400 print:hidden">
          Belum ada data yang di-upload.
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 print:gap-0">
          {chunkedPages.map((pageChunk, pageIndex) => (
            <div
              key={pageIndex}
              className="a4-page bg-white shadow-lg print:shadow-none p-8 w-[210mm] min-h-[27mm] grid grid-cols-2 gap-6 items-start justify-items-center print:m-0 print:p-6 break-after-page"
            >
              {pageChunk.map((siswa) => (
                <KokardeCard key={siswa.id || siswa.namaSiswa} data={siswa} />
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
