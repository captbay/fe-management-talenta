"use client";

import React, { useState, useEffect } from "react";
import { getPegawaiById } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import Image from "next/image";

const Page = ({ params: { id } }) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { token } = useGetCookie();

  useEffect(() => {
    setLoading(true);
    getPegawaiById(token, id)
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
              <h1 className="text-2xl font-bold">Data Pegawai</h1>
              {/* print button */}
              <button
                className="bg-blue-500 px-4 py-2 text-xs w-max text-white font-semibold rounded"
                onClick={() => window.print()}
              >
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
            {/* Pegawai */}
            <div className="flex flex-col justify-center items-start md:items-center m-8">
              <h2 className="text-xl mb-2 font-bold">Data Lengkap</h2>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-lg mb-1">NIP</p>
                <p className="text-lg mb-1">: {profileData.nip}</p>
                <p className="text-lg mb-1">Jabatan Fungsional</p>
                <p className="text-lg mb-1">
                  : {profileData.jabatan_fungsional}
                </p>
                <p className="text-lg mb-1">TMT Jabatan Fungsional</p>
                <p className="text-lg mb-1">
                  : {profileData.tmt_jabatan_fungsional}
                </p>
                {/* pendidikan_terakhir */}
                <p className="text-lg mb-1">Pendidikan Terakhir</p>
                <p className="text-lg mb-1">
                  : {profileData.pendidikan_terakhir}
                </p>
                {/* Unit Kerja */}
                <p className="text-lg mb-1">Unit Kerja</p>
                <p className="text-lg mb-1">: {profileData.unit_kerja}</p>
                {/* jenis_kelamin */}
                <p className="text-lg mb-1">Jenis Kelamin</p>
                <p className="text-lg mb-1">: {profileData.jenis_kelamin}</p>
                {/* status */}
                <p className="text-lg mb-1">Status</p>
                <p className="text-lg mb-1">: {profileData.status}</p>
                {/* tanggal_masuk */}
                <p className="text-lg mb-1">Tanggal Masuk</p>
                <p className="text-lg mb-1">: {profileData.tanggal_masuk}</p>
                {/* tempat_lahir */}
                <p className="text-lg mb-1">Tempat Lahir</p>
                <p className="text-lg mb-1">: {profileData.tempat_lahir}</p>
                {/* tanggal_lahir */}
                <p className="text-lg mb-1">Tanggal Lahir</p>
                <p className="text-lg mb-1">: {profileData.tanggal_lahir}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
