"use client";
import { icons } from "@/assets/assest";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CurrencyFormater } from "@/libs/currencyFormater";

import EachUtil from "@/components/eachUtils/eachUtils";
import Navbar from "@/components/nvabar/navbar";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const datas = [
    {
      nama: "Keyboard",
      harga: 10000,
      img: "/products/th.jpg",
    },
    {
      nama: "Keyboard",
      harga: 10000,
      img: "/products/th.jpg",
    },
    {
      nama: "Keyboard",
      harga: 10000,
      img: "/products/th.jpg",
    },
    {
      nama: "Keyboard",
      harga: 10000,
      img: "/products/th.jpg",
    },
    {
      nama: "Keyboard",
      harga: 10000,
      img: "/products/th.jpg",
    },
  ];

  return (
    <div className="bg-gray-300">
      <Navbar />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2 py-3">
        <EachUtil
          data={datas}
          render={(item: any, i: any) => (
            <div key={i} className="w-full bg-white">
              <Image
                src={item.img}
                alt="...."
                width={200}
                height={200}
                className="w-full h-auto"
              />
              <h1 className="text-black">{item.nama}</h1>
              <p>{CurrencyFormater(item.harga)}</p>
            </div>
          )}
        />
      </div>
    </div>
  );
}
