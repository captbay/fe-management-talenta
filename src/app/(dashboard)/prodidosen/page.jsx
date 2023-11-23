"use client";

import React, { useState, useEffect, useRef } from "react";
import { getProdi } from "@/api/api";
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
import { getDosen } from "@/api/api";
import { toast } from "react-toastify";

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
  const [labelProdiApi, setLabelProdiApi] = useState([]);
  const [dataProdiApi, setDataProdiApi] = useState([]);
  const [Dosen, setDosen] = useState([]);
  const [filteredDosen, setFilteredDosen] = useState([]);

  useEffect(() => {
    getProdi(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const labels = [];
          const data = [];
          res.data.data.forEach((item) => {
            labels.push(item.prodi_name);
            data.push(item.jumlah);
          });

          setLabelProdiApi(labels);
          setDataProdiApi(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getDosen(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setDosen(res.data.data);
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
        text: "Chart Jumlah Dosen per Prodi",
      },
    },
    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
    onHover: function (event, chartElement) {
      if (chartElement.length == 1) {
        event.native.target.style.cursor = "pointer";
      } else {
        event.native.target.style.cursor = "default";
      }
    },
  };

  const dataProdi = {
    labels: labelProdiApi,
    datasets: [
      {
        label: "Jumlah Dosen",
        data: dataProdiApi,
        backgroundColor: "rgba(220, 0, 0, 0.5)",
        hoverBackgroundColor: "rgba(220, 0, 0, 0.8)",
        hoverBorderRadius: 10,
        hoverBorderWidth: 2,
      },
    ],
  };

  const chartRef = useRef();
  const onClick = (event) => {
    const data = getElementAtEvent(chartRef.current, event);
    if (data.length > 0) {
      const index = data[0].index;
      const selectedProdi = labelProdiApi[index];

      // Filter Dosen based on the selected program with exact case match
      const filtered = Dosen.filter(
        (dosen) => dosen.prodi.toLowerCase() === selectedProdi.toLowerCase()
      );
      setFilteredDosen(filtered); // Update the filteredDosen state

      toast.success(
        "Data " +
          selectedProdi +
          " berhasil ditampilkan, silahkan lihat di tabel"
      );
    }
  };

  const handleResetFilter = () => {
    setFilteredDosen([]); // Reset the filtered data
  };

  return (
    <section className="flex flex-col">
      <div className="h-[60vh] w-[60vw] md:w-full md:min-h-[70vh] ">
        {labelProdiApi.length > 0 && dataProdiApi.length > 0 && (
          <Bar
            options={options}
            data={dataProdi}
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
                Kode Dosen
              </th>
              <th scope="col" className="px-6 py-3">
                JFA
              </th>
              <th scope="col" className="px-6 py-3">
                Prodi
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
            {filteredDosen.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center px-6 py-4">
                  Silahkan klik bar untuk melihat data dosen berdasarkan prodi
                </td>
              </tr>
            ) : (
              filteredDosen.map((k, index) => (
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
                  <td className="px-6 py-4">{k.kode_dosen}</td>
                  <td className="px-6 py-4">{k.jfa}</td>
                  <td className="px-6 py-4">{k.prodi}</td>
                  <td className="px-6 py-4">{k.pendidikan_terakhir}</td>
                  <td className="px-6 py-4">
                    {/* link to detail dosen */}
                    <Link href={`/dosen/${k.id}`}>
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
