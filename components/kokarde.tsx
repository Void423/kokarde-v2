"use client";

import { Siswa } from "@/types/siswa";
import Image from "next/image";
import React from "react";
import logoPemko from "@/components/assets/image/logo-bukittinggi.png";

interface KokardeCardProps {
   data: Siswa;
}

export const KokardeCard: React.FC<KokardeCardProps> = ({ data }) => {
   return (
      /* Ukuran Kokarde: Lebar 8cm, Tinggi 9cm */
      <div className="w-[8cm] h-[12.5cm] bg-white border-2 border-black p-0.5 flex flex-col justify-between font-sans text-black print:break-inside-avoid">
         {/* Frame Dalam */}
         <div className="border border-black h-full flex flex-col justify-between p-1 overflow-hidden">
            {/* Kop Sekolah */}
            <div>
               <div className="text-center">
                  <p className="text-[7.5px] font-bold leading-tight uppercase">
                     Dinas Pendidikan dan Kebudayaan
                  </p>
                  <h2 className="text-[8.5px] font-black leading-tight uppercase my-0.5 tracking-tight">
                     Sekolah Dasar Negeri 14 ATTS
                  </h2>
                  <p className="text-[7px] font-bold leading-tight uppercase">
                     Kecamatan Guguk Panjang
                  </p>
                  <p className="text-[7px] font-bold leading-tight uppercase">
                     Kota Bukittinggi
                  </p>
                  <p className="text-[6.5px] leading-tight">
                     Jl. Pemuda / Telp. (0752)626203
                  </p>
               </div>
               {/* Garis Ganda Pembatas Kop */}
               <div className="border-b border-black mt-0.5 mb-1px" />
               <div className="border-b border-black" />
            </div>

            {/* Judul Kartu */}
            <div className="text-center my-0.5">
               <h3 className="text-[14px] font-bold uppercase leading-tight">
                  Kartu Peserta Ujian
               </h3>
               <p className="text-[12px] font-bold uppercase leading-tight">
                  Tahun Pelajaran 2026/2027
               </p>
            </div>

            {/* Logo Kota Bukittinggi */}
            <div className="flex justify-center my-0.5">
               <Image
                  src={logoPemko}
                  alt="Logo Bukittinggi"
                  width={70}
                  height={50}
                  className="object-cover"
                  onError={(e) => {
                     e.currentTarget.onerror = null;
                     e.currentTarget.src =
                        "https://via.placeholder.com/40x40?text=LOGO";
                  }}
               />
            </div>

            {/* Kotak Nomor Ujian */}
            <div className="flex justify-center my-0.5">
               <div className="border border-black w-32 text-center bg-white">
                  <div className="border-b border-black py-0.5 text-[12px] font-bold">
                     Nomor Ujian
                  </div>
                  <div className="py-0.5 text-[12px] font-black tracking-wider">
                     {data.nomorUrut || "1 A - 000"}
                  </div>
               </div>
            </div>

            {/* Detail Peserta */}
            <div className="my-0.5 px-0.5  font-bold leading-snug space-y-0.5 text-[12px]">
               <div className="flex text-[12px]">
                  <span className="w-12 tracking-wider">NAMA</span>
                  <span className="mr-1">:</span>
                  <span className="font-black uppercase">{data.namaSiswa}</span>
               </div>
               <div className="flex">
                  <span className="w-12">KELAS</span>
                  <span className="mr-1">:</span>
                  <span>{data.kelas}</span>
               </div>
               <div className="flex">
                  <span className="w-12">LOKAL</span>
                  <span className="mr-1">:</span>
                  <span>{data.lokal}</span>
               </div>
            </div>

            {/* Catatan / Footer */}
            <div className="border-t border-black pt-0.5 mt-auto">
               <p className="text-center font-bold uppercase text-[12px] my-3">
                  kartu ini berlaku dalam 1 tahun pelajaran, jangan dihilangkan
               </p>
               <p className="text-[6.5px] text-left leading-tight">
                  Catt: Kartu Tidak boleh hilang / rusak
               </p>
            </div>
         </div>
      </div>
   );
};
