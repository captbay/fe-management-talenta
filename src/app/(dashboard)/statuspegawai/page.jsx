"use client";

import React, { useState, useEffect, useRef } from "react";
import { getStatus } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import Link from "next/link";
import { getPegawai } from "@/api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Page = () => {
  const { token } = useGetCookie();
  const [labelStatusApi, setLabelStatusApi] = useState([]);
  const [dataStatusApi, setDataStatusApi] = useState([]);
  const [Pegawai, setPegawai] = useState([]);
  const [filteredPegawai, setFilteredPegawai] = useState([]);

  useEffect(() => {
    getStatus(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const labels = [];
          const data = [];
          res.data.data.forEach((item) => {
            labels.push(item.status_name);
            data.push(item.jumlah);
          });

          setLabelStatusApi(labels);
          setDataStatusApi(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getPegawai(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setPegawai(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart Jumlah Pegawai per Status",
      },
    },
  };

  const dataStatus = {
    labels: labelStatusApi,
    datasets: [
      {
        label: "Jumlah Pegawai",
        data: dataStatusApi,
        backgroundColor: "rgba(220, 0, 0, 0.5)",
      },
    ],
  };

  const chartRef = useRef();
  const onClick = (event) => {
    const data = getElementAtEvent(chartRef.current, event);
    if (data.length > 0) {
      const index = data[0].index;
      const selectedStatus = labelStatusApi[index];

      // Filter Pegawai based on the selected program with exact case match
      const filtered = Pegawai.filter(
        (pegawai) =>
          pegawai.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
      setFilteredPegawai(filtered); // Update the filteredPegawai state
    }
  };

  const handleResetFilter = () => {
    setFilteredPegawai([]); // Reset the filtered data
  };

  return (
    <section className="flex flex-col">
      <div className="h-[60vh] w-[60vw] relative md:w-full md:min-h-[70vh]">
        {labelStatusApi.length > 0 && dataStatusApi.length > 0 && (
          <Bar
            options={options}
            data={dataStatus}
            onClick={onClick}
            ref={chartRef}
          />
        )}
      </div>
      {/* please click the bar to show data */}
      <div className="flex justify-between mt-8">
        <h1 className="font-bold">*Klik Bar untuk melihat data</h1>
        <button
          onClick={handleResetFilter}
          className="bg-red-500 hover:bg-red-700 px-4 py-2 text-xs text-white font-semibold rounded"
        >
          Reset Data
        </button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs  uppercase  dark:bg-red-600 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                NIP
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Pendidikan Terakhir
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPegawai.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center px-6 py-4">
                  Silahkan klik bar untuk melihat data pegawai berdasarkan
                  status
                </td>
              </tr>
            ) : (
              filteredPegawai.map((k, index) => (
                <tr
                  className=" border-b dark:bg-white  dark:hover:bg-red-500 text-gray-800 hover:text-white"
                  key={index}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {k.nama}
                  </th>
                  <td className="px-6 py-4">{k.nip}</td>
                  <td className="px-6 py-4">{k.status}</td>
                  <td className="px-6 py-4">{k.pendidikan_terakhir}</td>
                  <td className="px-6 py-4">
                    {/* link to detail pegawai */}
                    <Link href={`/pegawai/${k.id}`}>
                      {/* button lihat detail */}
                      <button className="bg-gray-500 hover:bg-red-700 px-4 py-2 text-xs w-max text-white font-semibold rounded">
                        Lihat Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Page;
