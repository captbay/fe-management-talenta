"use client";

import React, { useState, useEffect } from "react";
import { getDosenById } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import Image from "next/image";
import { Printer } from "lucide-react";

const Page = ({ params: { id } }) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { token } = useGetCookie();

  useEffect(() => {
    setLoading(true);
    getDosenById(token, id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setProfileData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, id]);

  return (
    <>
      <section className="w-full">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            Loading profile...
          </div>
        ) : (
          <div className="">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Data Dosen</h1>
              {/* print button */}
              <button
                className="bg-red-500 px-4 py-2 text-xs w-max text-white font-semibold rounded"
                onClick={() => window.print()}
              >
                <Printer />
                Print
              </button>
            </div>
            <div className="flex flex-col items-center my-10">
              <Image
                className="w-28 h-28 mb-4"
                src="/Logo_Telkom_University_potrait.png"
                alt="Profile Avatar"
                width={300}
                height={300}
              />
              <h1 className="text-2xl mb-2">{profileData?.nama}</h1>
              <p className="text-lg">{profileData?.email}</p>
            </div>
            {/* Dosen */}
            <div className="flex flex-col justify-center items-start md:items-center m-8">
              <h2 className="text-xl mb-2 font-bold">Data Lengkap</h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-lg mb-1">NIDN</p>
                <p className="text-lg mb-1">: {profileData.nidn}</p>
                <p className="text-lg mb-1">NIP</p>
                <p className="text-lg mb-1">: {profileData.nip}</p>
                <p className="text-lg mb-1">Kode Dosen Lahir</p>
                <p className="text-lg mb-1">: {profileData.kode_dosen}</p>
                {/* jfa */}
                <p className="text-lg mb-1">JFA</p>
                <p className="text-lg mb-1">: {profileData.jfa}</p>
                {/* tmt_jad */}
                <p className="text-lg mb-1">TMT JAD</p>
                <p className="text-lg mb-1">: {profileData.tmt_jad}</p>
                {/* golongan */}
                <p className="text-lg mb-1">Golongan</p>
                <p className="text-lg mb-1">: {profileData.golongan}</p>
                {/* tmt_inpassing */}
                <p className="text-lg mb-1">TMT Inpassing</p>
                <p className="text-lg mb-1">: {profileData.tmt_inpassing}</p>
                {/* no_serdos */}
                <p className="text-lg mb-1">No Serdos</p>
                <p className="text-lg mb-1">: {profileData.no_serdos}</p>
                {/* pendidikan_terakhir */}
                <p className="text-lg mb-1">Pendidikan Terakhir</p>
                <p className="text-lg mb-1">
                  : {profileData.pendidikan_terakhir}
                </p>
                {/* jurusan_pendidikan_terakhir */}
                <p className="text-lg mb-1">Jurusan Pendidikan Terakhir</p>
                <p className="text-lg mb-1">
                  : {profileData.jurusan_pendidikan_terakhir}
                </p>
                {/* universitas_pendidikan_terakhir */}
                <p className="text-lg mb-1">Universitas Pendidikan Terakhir</p>
                <p className="text-lg mb-1">
                  : {profileData.universitas_pendidikan_terakhir}
                </p>
                {/* kelompok_keahlian */}
                <p className="text-lg mb-1">Kelompok Keahlian</p>
                <p className="text-lg mb-1">
                  : {profileData.kelompok_keahlian}
                </p>
                {/* prodi */}
                <p className="text-lg mb-1">Prodi</p>
                <p className="text-lg mb-1">: {profileData.prodi}</p>
                {/* jenis_kelamin */}
                <p className="text-lg mb-1">Jenis Kelamin</p>
                <p className="text-lg mb-1">: {profileData.jenis_kelamin}</p>
                {/* status_pegawai */}
                <p className="text-lg mb-1">Status Pegawai</p>
                <p className="text-lg mb-1">: {profileData.status_pegawai}</p>
                {/* tanggal_masuk */}
                <p className="text-lg mb-1">Tanggal Masuk</p>
                <p className="text-lg mb-1">: {profileData.tanggal_masuk}</p>
                {/* tempat_lahir */}
                <p className="text-lg mb-1">Tempat Lahir</p>
                <p className="text-lg mb-1">: {profileData.tempat_lahir}</p>
                {/* tanggal_lahir */}
                <p className="text-lg mb-1">Tanggal Lahir</p>
                <p className="text-lg mb-1">: {profileData.tanggal_lahir}</p>
                {/* jumlah_karya_ilmiah */}
                <p className="text-lg mb-1">Jumlah Karya Ilmiah</p>
                <p className="text-lg mb-1">
                  : {profileData.jumlah_karya_ilmiah}
                </p>
                {/* jumlah_pengabdian_masyarakat */}
                <p className="text-lg mb-1">Jumlah Pengabdian Masyarakat</p>
                <p className="text-lg mb-1">
                  : {profileData.jumlah_pengabdian_masyarakat}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
