"use client";
import { getDosen } from "@/api/api";
import useGetCookie from "@/hooks/useGetCookie";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {
  const [Dosen, setDosen] = useState([]);
  const { token } = useGetCookie();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const filteredDosen = Dosen.filter((k) => {
    return (
      k.nama?.toLowerCase().includes(query.toLowerCase()) ||
      k.kode_dosen?.toLowerCase().includes(query.toLowerCase()) ||
      k.jfa?.toLowerCase().includes(query.toLowerCase()) ||
      k.prodi?.toLowerCase().includes(query.toLowerCase()) ||
      k.pendidikan_terakhir?.toLowerCase().includes(query.toLowerCase())
    );
  });

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDosen.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    getDosen(token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setDosen(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Data Dosen...
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Data Dosen</h1>
        </div>
        {/* search */}
        <div className="flex items-center mb-4 gap-8">
          <input
            type="text"
            className="border border-gray-600 rounded-lg px-4 py-2 w-full max-w-lg"
            placeholder="Cari Dosen"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
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
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center px-6 py-4">
                    Data Tidak Ditemukan
                  </td>
                </tr>
              ) : (
                currentItems.map((k, index) => (
                  <tr
                    className=" border-b dark:bg-white  dark:hover:bg-red-500 text-gray-800 hover:text-white"
                    key={index}
                  >
                    <td className="px-6 py-4">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
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
        {/* Pagination controls */}
        <div className="pagination mt-4 flex items-center justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mr-2 px-3 py-1 bg-gray-200 rounded-md ${
              currentPage === 1 ? null : "hover:bg-red-400 hover:text-white"
            }`}
          >
            Previous
          </button>
          {Array.from(
            { length: Math.ceil(filteredDosen.length / itemsPerPage) },
            (_, i) => {
              const page = i + 1;
              const isCurrent = page === currentPage;
              const isFirstPage = page === 1;
              const isLastPage =
                page === Math.ceil(filteredDosen.length / itemsPerPage);
              const isInRange =
                page >= currentPage - 2 && page <= currentPage + 2;

              if (isFirstPage || isLastPage || isCurrent || isInRange) {
                return (
                  <button
                    key={i}
                    onClick={() => paginate(page)}
                    className={`mx-1 px-3 py-1 rounded-md ${
                      isCurrent
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 hover:bg-red-400 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                (currentPage >= 5 && page === 2) ||
                (currentPage <=
                  Math.ceil(filteredDosen.length / itemsPerPage) - 4 &&
                  page === Math.ceil(filteredDosen.length / itemsPerPage) - 1)
              ) {
                return (
                  <span key={i} className="mx-1">
                    ...
                  </span>
                );
              }
              return null;
            }
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredDosen.length}
            className={`ml-2 px-3 py-1 bg-gray-200 rounded-md ${
              indexOfLastItem >= filteredDosen.length
                ? null
                : "hover:bg-red-400 hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
