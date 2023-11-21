"use client";

import React from "react";
import useGetCookie from "@/hooks/useGetCookie";

const Page = () => {
  const { name } = useGetCookie();

  return (
    <section className="flex flex-col w-full h-screen">
      <h1 className="text-4xl font-bold">Selamat Datang</h1>
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-2xl mt-8">
        Management Talenta adalah platform management Talenta yang digunakan
        untuk mengelola seluruh talent agar dapat ditindaklanjuti secara efektif
        dan sistematis. Selain itu, Management Talenta juga digunakan untuk
        mengeksplorasi potensial kenaikan jabatan.
      </p>
    </section>
  );
};

export default Page;
