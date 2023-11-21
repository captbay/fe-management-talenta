"use client";

import { updateProfile } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import React, { useEffect, useState } from "react";
import Input from "../../Input";
import { toast } from "react-toastify";

const ModalEditProfile = ({ onClose, data }) => {
  console.log(data);

  const { token, role } = useGetCookie();

  //   global
  const namaRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const no_nipRef = React.useRef(null);
  const pendidikan_terakhirRef = React.useRef(null);
  const jenis_kelaminRef = React.useRef(null);
  const tanggal_masukRef = React.useRef(null);
  const tempat_lahirRef = React.useRef(null);
  const tanggal_lahirRef = React.useRef(null);

  //   Dosen
  const no_nidnRef = React.useRef(null);
  const kode_dosenRef = React.useRef(null);
  const jfaRef = React.useRef(null);
  const tmt_jadRef = React.useRef(null);
  const golonganRef = React.useRef(null);
  const tmt_inpassingRef = React.useRef(null);
  const no_serdosRef = React.useRef(null);
  const jurusan_pendidikan_terakhirRef = React.useRef(null);
  const universitas_pendidikan_terakhirRef = React.useRef(null);
  const kelompok_keahlianRef = React.useRef(null);
  const prodiRef = React.useRef(null);
  const status_pegawaiRef = React.useRef(null);
  const jumlah_karya_ilmiahRef = React.useRef(null);
  const jumlah_pengabdian_masyarakatRef = React.useRef(null);

  //   Pegawai
  const jabatan_fungsionalRef = React.useRef(null);
  const tmt_jabatan_fungsionalRef = React.useRef(null);
  const unit_kerjaRef = React.useRef(null);
  const statusRef = React.useRef(null);

  const handleUpdateDosen = ({
    nama,
    email,
    nidn,
    nip,
    kode_dosen,
    jfa,
    tmt_jad,
    golongan,
    tmt_inpassing,
    no_serdos,
    pendidikan_terakhir,
    jurusan_pendidikan_terakhir,
    universitas_pendidikan_terakhir,
    kelompok_keahlian,
    prodi,
    jenis_kelamin,
    status_pegawai,
    tanggal_masuk,
    tempat_lahir,
    tanggal_lahir,
    jumlah_karya_ilmiah,
    jumlah_pengabdian_masyarakat,
  }) => {
    updateProfile(token, {
      nama,
      email,
      nidn,
      nip,
      kode_dosen,
      jfa,
      tmt_jad,
      golongan,
      tmt_inpassing,
      no_serdos,
      pendidikan_terakhir,
      jurusan_pendidikan_terakhir,
      universitas_pendidikan_terakhir,
      kelompok_keahlian,
      prodi,
      jenis_kelamin,
      status_pegawai,
      tanggal_masuk,
      tempat_lahir,
      tanggal_lahir,
      jumlah_karya_ilmiah,
      jumlah_pengabdian_masyarakat,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil mengupdate data profile");
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);

        if (Array.isArray(error?.response?.data?.message)) {
          error?.response?.data?.message.map((err) => {
            toast.error(err);
          });
        } else {
          toast.error(error?.response?.data?.message);
        }
      });
  };

  const handleUpdatePegawai = ({
    nama,
    email,
    nip,
    jabatan_fungsional,
    tmt_jabatan_fungsional,
    pendidikan_terakhir,
    unit_kerja,
    jenis_kelamin,
    status,
    tanggal_masuk,
    tempat_lahir,
    tanggal_lahir,
  }) => {
    updateProfile(token, {
      nama,
      email,
      nip,
      jabatan_fungsional,
      tmt_jabatan_fungsional,
      pendidikan_terakhir,
      unit_kerja,
      jenis_kelamin,
      status,
      tanggal_masuk,
      tempat_lahir,
      tanggal_lahir,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil mengupdate data profile");
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);

        if (Array.isArray(error?.response?.data?.message)) {
          error?.response?.data?.message.map((err) => {
            toast.error(err);
          });
        } else {
          toast.error(error?.response?.data?.message);
        }
      });
  };

  const handleUpdate = ({ nama, tanggal_lahir }) => {
    updateProfile(token, {
      nama,
      tanggal_lahir,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Berhasil mengupdate data profile");
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);

        if (Array.isArray(error?.response?.data?.message)) {
          error?.response?.data?.message.map((err) => {
            toast.error(err);
          });
        } else {
          toast.error(error?.response?.data?.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "Dosen") {
      const nama = namaRef.current.value;
      const email = emailRef.current.value;
      const nidn = no_nidnRef.current.value;
      const nip = no_nipRef.current.value;
      const kode_dosen = kode_dosenRef.current.value;
      const jfa = jfaRef.current.value;
      const tmt_jad = tmt_jadRef.current.value;
      const golongan = golonganRef.current.value;
      const tmt_inpassing = tmt_inpassingRef.current.value;
      const no_serdos = no_serdosRef.current.value;
      const pendidikan_terakhir = pendidikan_terakhirRef.current.value;
      const jurusan_pendidikan_terakhir =
        jurusan_pendidikan_terakhirRef.current.value;
      const universitas_pendidikan_terakhir =
        universitas_pendidikan_terakhirRef.current.value;
      const kelompok_keahlian = kelompok_keahlianRef.current.value;
      const prodi = prodiRef.current.value;
      const jenis_kelamin = jenis_kelaminRef.current.value;
      const status_pegawai = status_pegawaiRef.current.value;
      const tanggal_masuk = tanggal_masukRef.current.value;
      const tempat_lahir = tempat_lahirRef.current.value;
      const tanggal_lahir = tanggal_lahirRef.current.value;
      const jumlah_karya_ilmiah = jumlah_karya_ilmiahRef.current.value;
      const jumlah_pengabdian_masyarakat =
        jumlah_pengabdian_masyarakatRef.current.value;
      handleUpdateDosen({
        nama,
        email,
        nidn,
        nip,
        kode_dosen,
        jfa,
        tmt_jad,
        golongan,
        tmt_inpassing,
        no_serdos,
        pendidikan_terakhir,
        jurusan_pendidikan_terakhir,
        universitas_pendidikan_terakhir,
        kelompok_keahlian,
        prodi,
        jenis_kelamin,
        status_pegawai,
        tanggal_masuk,
        tempat_lahir,
        tanggal_lahir,
        jumlah_karya_ilmiah,
        jumlah_pengabdian_masyarakat,
      });
    } else if (role === "Pegawai") {
      const nama = namaRef.current.value;
      const email = emailRef.current.value;
      const nip = no_nipRef.current.value;
      const jabatan_fungsional = jabatan_fungsionalRef.current.value;
      const tmt_jabatan_fungsional = tmt_jabatan_fungsionalRef.current.value;
      const pendidikan_terakhir = pendidikan_terakhirRef.current.value;
      const unit_kerja = unit_kerjaRef.current.value;
      const jenis_kelamin = jenis_kelaminRef.current.value;
      const status = statusRef.current.value;
      const tanggal_masuk = tanggal_masukRef.current.value;
      const tempat_lahir = tempat_lahirRef.current.value;
      const tanggal_lahir = tanggal_lahirRef.current.value;

      handleUpdatePegawai({
        nama,
        email,
        nip,
        jabatan_fungsional,
        tmt_jabatan_fungsional,
        pendidikan_terakhir,
        unit_kerja,
        jenis_kelamin,
        status,
        tanggal_masuk,
        tempat_lahir,
        tanggal_lahir,
      });
    } else {
      const nama = namaRef.current.value;
      const tanggal_lahir = tanggal_lahirRef.current.value;

      handleUpdate({
        nama,
        tanggal_lahir,
      });
    }
  };

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="bg-gray-500 bg-opacity-75 transition-opacity overflow-x-hidden overflow-y-auto fixed h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
    >
      <div className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4 h-full md:h-auto">
        <div className="bg-white border rounded-lg shadow relative">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-red-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              {role === "Dosen" ? (
                <div className="grid md:grid-cols-4 gap-4">
                  {/* nama  */}
                  <div>
                    <label
                      for="nama"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Nama
                    </label>
                    <Input
                      id="nama"
                      ref={namaRef}
                      placeholder="Nama User"
                      defaultValue={data.nama}
                    />
                  </div>
                  {/* tanggal_lahir */}
                  <div>
                    <label
                      for="tanggal_lahir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Tanggal Lahir
                    </label>
                    <Input
                      id="tanggal_lahir"
                      ref={tanggal_lahirRef}
                      placeholder="Tanggal Lahir"
                      defaultValue={data.tanggal_lahir}
                    />
                  </div>
                  {/* email */}
                  <div>
                    <label
                      for="email"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      ref={emailRef}
                      placeholder="Email User"
                      defaultValue={data.email}
                    />
                  </div>
                  {/* no nidn */}
                  <div>
                    <label
                      for="no_nidn"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      NIDN
                    </label>
                    <Input
                      id="no_nidn"
                      ref={no_nidnRef}
                      placeholder="No NIDN"
                      defaultValue={data.nidn}
                    />
                  </div>
                  {/* no nip */}
                  <div>
                    <label
                      for="no_nip"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      NIP
                    </label>
                    <Input
                      id="no_nip"
                      ref={no_nipRef}
                      placeholder="No NIP"
                      defaultValue={data.nip}
                    />
                  </div>
                  {/* kode_dosen */}
                  <div>
                    <label
                      for="kode_dosen"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Kode Dosen
                    </label>
                    <Input
                      id="kode_dosen"
                      ref={kode_dosenRef}
                      placeholder="Address Customer"
                      defaultValue={data.kode_dosen}
                    />
                  </div>
                  {/* jfa */}
                  <div>
                    <label
                      for="jfa"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      JFA
                    </label>
                    <Input
                      id="jfa"
                      ref={jfaRef}
                      placeholder="JFA"
                      defaultValue={data.jfa}
                    />
                  </div>
                  {/* tmt_jad */}
                  <div>
                    <label
                      for="tmt_jad"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      TMT JAD
                    </label>
                    <Input
                      id="tmt_jad"
                      ref={tmt_jadRef}
                      placeholder="TMT JAD"
                      defaultValue={data.tmt_jad}
                    />
                  </div>
                  {/* golongan */}
                  <div>
                    <label
                      for="golongan"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Golongan
                    </label>
                    <Input
                      id="golongan"
                      ref={golonganRef}
                      placeholder="Golongan"
                      defaultValue={data.golongan}
                    />
                  </div>
                  {/* tmt_inpassing */}
                  <div>
                    <label
                      for="tmt_inpassing"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      TMT Inpassing
                    </label>
                    <Input
                      id="tmt_inpassing"
                      ref={tmt_inpassingRef}
                      placeholder="TMT Inpassing"
                      defaultValue={data.tmt_inpassing}
                    />
                  </div>
                  {/* no_serdos */}
                  <div>
                    <label
                      for="no_serdos"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      No Serdos
                    </label>
                    <Input
                      id="no_serdos"
                      ref={no_serdosRef}
                      placeholder="No Serdos"
                      defaultValue={data.no_serdos}
                    />
                  </div>
                  {/* pendidikan_terakhir */}
                  <div>
                    <label
                      for="pendidikan_terakhir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Pendidikan Terakhir
                    </label>
                    <Input
                      id="pendidikan_terakhir"
                      ref={pendidikan_terakhirRef}
                      placeholder="Pendidikan Terakhir"
                      defaultValue={data.pendidikan_terakhir}
                    />
                  </div>
                  {/* jurusan_pendidikan_terakhir */}
                  <div>
                    <label
                      for="jurusan_pendidikan_terakhir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Jurusan Pendidikan Terakhir
                    </label>
                    <Input
                      id="jurusan_pendidikan_terakhir"
                      ref={jurusan_pendidikan_terakhirRef}
                      placeholder="Jurusan Pendidikan Terakhir"
                      defaultValue={data.jurusan_pendidikan_terakhir}
                    />
                  </div>
                  {/* universitas_pendidikan_terakhir */}
                  <div>
                    <label
                      for="universitas_pendidikan_terakhir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Universitas Pendidikan Terakhir
                    </label>
                    <Input
                      id="universitas_pendidikan_terakhir"
                      ref={universitas_pendidikan_terakhirRef}
                      placeholder="Universitas Pendidikan Terakhir"
                      defaultValue={data.universitas_pendidikan_terakhir}
                    />
                  </div>
                  {/* kelompok_keahlian */}
                  <div>
                    <label
                      for="kelompok_keahlian"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Kelompok Keahlian
                    </label>
                    <Input
                      id="kelompok_keahlian"
                      ref={kelompok_keahlianRef}
                      placeholder="Kelompok Keahlian"
                      defaultValue={data.kelompok_keahlian}
                    />
                  </div>
                  {/* prodi */}
                  <div>
                    <label
                      for="prodi"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Prodi
                    </label>
                    <Input
                      id="prodi"
                      ref={prodiRef}
                      placeholder="Prodi"
                      defaultValue={data.prodi}
                    />
                  </div>
                  {/* jenis_kelamin */}
                  <div>
                    <label
                      for="jenis_kelamin"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Jenis Kelamin
                    </label>
                    <Input
                      id="jenis_kelamin"
                      ref={jenis_kelaminRef}
                      placeholder="Jenis Kelamin"
                      defaultValue={data.jenis_kelamin}
                    />
                  </div>
                  {/* status_pegawai */}
                  <div>
                    <label
                      for="status_pegawai"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Status Pegawai
                    </label>
                    <Input
                      id="status_pegawai"
                      ref={status_pegawaiRef}
                      placeholder="Status Pegawai"
                      defaultValue={data.status_pegawai}
                    />
                  </div>
                  {/* tanggal_masuk */}
                  <div>
                    <label
                      for="tanggal_masuk"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Tanggal Masuk
                    </label>
                    <Input
                      id="tanggal_masuk"
                      ref={tanggal_masukRef}
                      placeholder="Tanggal Masuk"
                      defaultValue={data.tanggal_masuk}
                    />
                  </div>
                  {/* tempat_lahir */}
                  <div>
                    <label
                      for="tempat_lahir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Tempat Lahir
                    </label>
                    <Input
                      id="tempat_lahir"
                      ref={tempat_lahirRef}
                      placeholder="Tempat Lahir"
                      defaultValue={data.tempat_lahir}
                    />
                  </div>
                  {/* jumlah_karya_ilmiah */}
                  <div>
                    <label
                      for="jumlah_karya_ilmiah"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Jumlah Karya Ilmiah
                    </label>
                    <Input
                      id="jumlah_karya_ilmiah"
                      ref={jumlah_karya_ilmiahRef}
                      placeholder="Jumlah Karya Ilmiah"
                      defaultValue={data.jumlah_karya_ilmiah}
                    />
                  </div>
                  {/* jumlah_pengabdian_masyarakat */}
                  <div>
                    <label
                      for="jumlah_pengabdian_masyarakat"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Jumlah Pengabdian Masyarakat
                    </label>
                    <Input
                      id="jumlah_pengabdian_masyarakat"
                      ref={jumlah_pengabdian_masyarakatRef}
                      placeholder="Jumlah Pengabdian Masyarakat"
                      defaultValue={data.jumlah_pengabdian_masyarakat}
                    />
                  </div>
                </div>
              ) : role === "Pegawai" ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {/* nama */}
                  <div>
                    <label
                      for="nama"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Nama
                    </label>
                    <Input
                      id="nama"
                      ref={namaRef}
                      placeholder="Nama User"
                      defaultValue={data.nama}
                    />
                  </div>
                  {/* tanggal_lahir */}
                  <div>
                    <label
                      for="tanggal_lahir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Tanggal Lahir
                    </label>
                    <Input
                      id="tanggal_lahir"
                      ref={tanggal_lahirRef}
                      placeholder="Tanggal Lahir"
                      defaultValue={data.tanggal_lahir}
                    />
                  </div>
                  {/* email */}
                  <div>
                    <label
                      for="email"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      ref={emailRef}
                      placeholder="Email User"
                      defaultValue={data.email}
                    />
                  </div>
                  {/* nip */}
                  <div>
                    <label
                      for="no_nip"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      NIP
                    </label>
                    <Input
                      id="no_nip"
                      ref={no_nipRef}
                      placeholder="No NIP"
                      defaultValue={data.nip}
                    />
                  </div>
                  {/* jabatan_fungsional */}
                  <div>
                    <label
                      for="jabatan_fungsional"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Jabatan Fungsional
                    </label>
                    <Input
                      id="jabatan_fungsional"
                      ref={jabatan_fungsionalRef}
                      placeholder="Jabatan Fungsional"
                      defaultValue={data.jabatan_fungsional}
                    />
                  </div>
                  {/* tmt_jabatan_fungsional */}
                  <div>
                    <label
                      for="tmt_jabatan_fungsional"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      TMT Jabatan Fungsional
                    </label>
                    <Input
                      id="tmt_jabatan_fungsional"
                      ref={tmt_jabatan_fungsionalRef}
                      placeholder="TMT Jabatan Fungsional"
                      defaultValue={data.tmt_jabatan_fungsional}
                    />
                  </div>
                  {/* pendidikan_terakhir */}
                  <div>
                    <label
                      for="pendidikan_terakhir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Pendidikan Terakhir
                    </label>
                    <Input
                      id="pendidikan_terakhir"
                      ref={pendidikan_terakhirRef}
                      placeholder="Pendidikan Terakhir"
                      defaultValue={data.pendidikan_terakhir}
                    />
                  </div>
                  {/* unit_kerja */}
                  <div>
                    <label
                      for="unit_kerja"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Unit Kerja
                    </label>
                    <Input
                      id="unit_kerja"
                      ref={unit_kerjaRef}
                      placeholder="Unit Kerja"
                      defaultValue={data.unit_kerja}
                    />
                  </div>
                  {/* jenis_kelamin */}
                  <div>
                    <label
                      for="jenis_kelamin"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Jenis Kelamin
                    </label>
                    <Input
                      id="jenis_kelamin"
                      ref={jenis_kelaminRef}
                      placeholder="Jenis Kelamin"
                      defaultValue={data.jenis_kelamin}
                    />
                  </div>
                  {/* status */}
                  <div>
                    <label
                      for="status"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Status
                    </label>
                    <Input
                      id="status"
                      ref={statusRef}
                      placeholder="Status"
                      defaultValue={data.status}
                    />
                  </div>
                  {/* tanggal_masuk */}
                  <div>
                    <label
                      for="tanggal_masuk"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Tanggal Masuk
                    </label>
                    <Input
                      id="tanggal_masuk"
                      ref={tanggal_masukRef}
                      placeholder="Tanggal Masuk"
                      defaultValue={data.tanggal_masuk}
                    />
                  </div>
                  {/* tempat_lahir */}
                  <div>
                    <label
                      for="tempat_lahir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Tempat Lahir
                    </label>
                    <Input
                      id="tempat_lahir"
                      ref={tempat_lahirRef}
                      placeholder="Tempat Lahir"
                      defaultValue={data.tempat_lahir}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-4 gap-4">
                  {/* nama */}
                  <div>
                    <label
                      for="nama"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Nama
                    </label>
                    <Input
                      id="nama"
                      ref={namaRef}
                      placeholder="Nama User"
                      defaultValue={data.nama}
                    />
                  </div>
                  {/* tanggal_lahir */}
                  <div>
                    <label
                      for="tanggal_lahir"
                      className="text-sm font-medium text-gray-900 block mb-2 "
                    >
                      Tanggal Lahir
                    </label>
                    <Input
                      id="tanggal_lahir"
                      ref={tanggal_lahirRef}
                      placeholder="Tanggal Lahir"
                      defaultValue={data.tanggal_lahir}
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-4 self-center mt-8">
                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update
                </button>
                {/* cancel button */}
                <button
                  type="button"
                  className="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg border border-gray-200 text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  onClick={onClose}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditProfile;
