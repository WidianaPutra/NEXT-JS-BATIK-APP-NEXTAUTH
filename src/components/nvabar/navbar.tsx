"use client";
import { useState, useEffect } from "react";
import { icons } from "@/assets/assest";
import { isLogin, isSeller } from "@/libs/authorize";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter();

  return (
    <div className="container-navbar h-[70px] bg-green-500 flex w-full justify-between items-center px-[4%] relative overflow-hidden">
      <h1 className="hidden sm:block text-3xl font-bold text-white cursor-pointer">
        KotoPedia
      </h1>
      <div className="flex bg-white w-[60%] sm:w-[65%] px-3 rounded-sm">
        <input
          type="text"
          placeholder="Cari barang..."
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none bg-none w-full py-2"
        />
        <Image
          src={icons.search}
          alt="cart"
          width={25}
          height={25}
          className="cursor-pointer"
        />
      </div>
      <div className="flex gap-4 ml-2">
        {!isLogin() ? (
          <>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-white rounded-md text-green-500 font-bold"
                onClick={() => router.push("/auth/signup")}
              >
                Register
              </button>
              <button
                className="px-4 py-2 bg-white rounded-md text-green-500 font-bold"
                onClick={() => signIn()}
              >
                Login
              </button>
            </div>
          </>
        ) : (
          <>
            <Image
              src={icons.cart}
              alt="menu"
              width={30}
              height={30}
              className="cursor-pointer"
            />
            <Image
              src={icons.mail}
              alt="menu"
              width={30}
              height={30}
              className="cursor-pointer"
            />
            <Image
              src={icons.user}
              alt="menu"
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={() => router.push("/account/setting")}
            />
          </>
        )}
      </div>

      <button onClick={() => signOut()}>log</button>
    </div>
  );
}
