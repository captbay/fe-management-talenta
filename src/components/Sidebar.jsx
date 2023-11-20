"use client";

import { Users, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import ModalLogout from "./ModalLogout";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useGetCookie from "@/hooks/useGetCookie";

export default function Sidebar() {
  const [isShowModal, setIsShowModal] = useState(false);
  const pathname = usePathname();
  const { name, role } = useGetCookie();

  const onOpenModal = () => setIsShowModal(true);
  const onCloseModal = () => setIsShowModal(false);

  return (
    <aside className="h-screen w-60 sticky top-0">
      <nav className="h-full flex flex-col dark:bg-white border-r shadow-sm">
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
          />
          {role === "Dosen" ? (
            <SidebarItem
              active={pathname === "/dosen"}
              icon={<Users />}
              text={"Dosen"}
              href={"/dosen"}
            />
          ) : null}
          {role === "Pegawai" ? (
            <SidebarItem
              active={pathname === "/pegawai"}
              icon={<Users />}
              text={"Pegawai"}
              href={"/pegawai"}
            />
          ) : null}
        </ul>
        <div>
          <div className="border-t flex p-3">
            <Link href={"/profile"}>
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
              <Link href={"/profile"}>
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

const SidebarItem = ({ icon, text, active, href = "/" }) => {
  return (
    <Link
      href={href}
      className={` 
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group 
        ${
          active
            ? "bg-red-500 text-white"
            : "hover:bg-red-400 text-gray-800 hover:text-white"
        }
    `}
    >
      {icon}
      <span className={`overflow-hidden transition-all w-52 ml-3`}>{text}</span>
    </Link>
  );
};