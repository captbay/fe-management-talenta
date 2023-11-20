"use client";

import { login } from "@/api/api";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import Image from "next/image";

const LoginPage = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await login(username, password);
      if (res.status === 200 || res.status === 201) {
        toast.success("Login success");
        setCookie(
          "token",
          {
            token: res.data.access_token,
            role: res.data.role,
            username: res.data.username,
            name: res.data.data.nama,
            id: res.data.data.id,
          },
          {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          }
        );
        localStorage.clear();
        router.push("/dashboard");
      }
    } catch (error) {
      if (Array.isArray(error?.response?.data?.message)) {
        error?.response?.data?.message.map((err) => {
          toast.error(err);
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <section className="bg-red-500 flex flex-col md:flex-row min-w-max min-h-screen">
      <div
        className="w-full md:w-1/2 p-6 md:p-12 md:flex items-center justify-center hidden"
        style={{
          backgroundImage:
            'url("/Gedung-Telkom-University-Landmark-Tower-TULT.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center align-middle my-auto">
        <div className="max-w-md bg-white rounded-lg shadow p-6 md:p-12 space-y-4 md:space-y-6">
          <Link href="/">
            <Image
              className="mx-auto cursor-pointer w-full"
              width={300}
              height={300}
              src="/logo_fri.png"
              alt="logo"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-red-800 text-center">
            Sign in to your account
          </h1>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-red-800"
              >
                Username
              </label>
              <Input
                placeholder="Enter your username"
                type="text"
                ref={usernameRef}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-red-800"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  ref={passwordRef}
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
