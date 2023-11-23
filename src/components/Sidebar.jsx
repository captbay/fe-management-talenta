"use client";

import {
  Users,
  LayoutDashboard,
  LogOut,
  Menu,
  School2,
  PencilRuler,
  Briefcase,
  BarChart,
} from "lucide-react";
import Image from "next/image";
import ModalLogout from "./ModalLogout";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useGetCookie from "@/hooks/useGetCookie";

export default function Sidebar() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const pathname = usePathname();
  const { name, role } = useGetCookie();

  const onOpenModal = () => setIsShowModal(true);
  const onCloseModal = () => setIsShowModal(false);

  const toggleSidebar = () => {
    setIsShowSidebar(!isShowSidebar); // Toggle sidebar visibility
  };

  return (
    <aside className="h-screen md:w-60 md:block sticky top-0 border-r">
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="p-3">
          <Menu size={24} color="red" /> {/* Burger icon for menu */}
        </button>
      </div>
      <nav
        className={`md:h-full h-[95%] flex flex-col dark:bg-white shadow-sm ${
          isShowSidebar ? "block" : "hidden"
        } md:flex `}
      >
        <div className="p-4 self-center">
          <Link href="/">
            <Image
              className="mx-auto cursor-pointer w-full"
              width={300}
              height={300}
              src="/logo_fri.png"
              alt="logo"
            />
          </Link>
        </div>
        <ul className="flex-1 px-3 mt-4">
          <SidebarItem
            active={pathname === "/dashboard"}
            icon={<LayoutDashboard />}
            text={"Dashboard"}
            href={"/dashboard"}
            toggleSidebar={toggleSidebar}
          />
          {role === "Dosen" ? (
            <>
              <SidebarItem
                active={pathname === "/dosen"}
                icon={<Users />}
                text={"Semua Dosen"}
                href={"/dosen"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/prodidosen"}
                icon={<School2 />}
                text={"Prodi Dosen"}
                href={"/prodidosen"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/kelompokkeahliandosen"}
                icon={<PencilRuler />}
                text={"Keahlian Dosen"}
                href={"/kelompokkeahliandosen"}
                toggleSidebar={toggleSidebar}
              />
            </>
          ) : role === "Pegawai" ? (
            <>
              <SidebarItem
                active={pathname === "/pegawai"}
                icon={<Users />}
                text={"Semua Pegawai"}
                href={"/pegawai"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/jabatanpegawai"}
                icon={<Briefcase />}
                text={"Jabatan Pegawai"}
                href={"/jabatanpegawai"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/statuspegawai"}
                icon={<BarChart />}
                text={"Status Pegawai"}
                href={"/statuspegawai"}
                toggleSidebar={toggleSidebar}
              />
            </>
          ) : (
            <>
              <SidebarItem
                active={pathname === "/dosen"}
                icon={<Users />}
                text={"Semua Dosen"}
                href={"/dosen"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/prodidosen"}
                icon={<School2 />}
                text={"Prodi Dosen"}
                href={"/prodidosen"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/kelompokkeahliandosen"}
                icon={<PencilRuler />}
                text={"Keahlian Dosen"}
                href={"/kelompokkeahliandosen"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/pegawai"}
                icon={<Users />}
                text={"Semua Pegawai"}
                href={"/pegawai"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/jabatanpegawai"}
                icon={<Briefcase />}
                text={"Jabatan Pegawai"}
                href={"/jabatanpegawai"}
                toggleSidebar={toggleSidebar}
              />
              <SidebarItem
                active={pathname === "/statuspegawai"}
                icon={<BarChart />}
                text={"Status Pegawai"}
                href={"/statuspegawai"}
                toggleSidebar={toggleSidebar}
              />
            </>
          )}
        </ul>
        <div>
          <div className="border-t flex p-3">
            <Link href={"/profile"} onClick={toggleSidebar}>
              <Image
                src="/Logo_Telkom_University_potrait.png"
                alt="profile pic"
                className="w-10 h-10 rounded-md cursor-pointer p-1"
                width={50}
                height={50}
              />
            </Link>
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3
          `}
            >
              <Link href={"/profile"} onClick={toggleSidebar}>
                <div className="leading-4">
                  <h4 className="font-semibold text-black overflow-x-clip">
                    {name}
                  </h4>
                  <span className="text-xs text-black">{role}</span>
                </div>
              </Link>
              <LogOut
                color="black"
                size={24}
                onClick={onOpenModal}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </nav>
      {isShowModal && <ModalLogout onCloseModal={onCloseModal} />}
    </aside>
  );
}

const SidebarItem = ({ icon, text, active, href, toggleSidebar }) => {
  return (
    <Link
      onClick={toggleSidebar}
      href={href}
      className={` 
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        group 
        ${
          active
            ? "bg-red-600 text-white"
            : "hover:bg-red-400 text-gray-800 hover:text-white"
        }
    `}
    >
      {icon}
      <span className={`overflow-hidden w-52 ml-3`}>{text}</span>
    </Link>
  );
};
