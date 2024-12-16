"use client";
import { useState, useEffect } from "react";
import { icons } from "@/assets/assest";

import Navbar from "@/components/nvabar/navbar";
import axios from "axios";
import Image from "next/image";

export default function Test() {
  const [token, setToken] = useState(
    {} as {
      email: String;
      phone: Number;
      role: String;
      user_id: Number;
      username: String;
      imgUrl: String;
    }
  );
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    const tokenData = await axios.get("/api/getToken");
    setToken(tokenData.data.token);
    console.log(tokenData.data);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="bg-gary-300 mb-3">
      <Navbar />
      <div className="w-full min-h-screen flex justify-center items-center gap-5 mt-3">
        {/* left side */}
        <div className="w-[18%] h-screen rounded-xl shadow-custom-light">
          {/* profile */}
          <div className="flex flex-shrink border-b-2 h-[100px] items-center px-3">
            <Image
              src={token.imgUrl ? token.imgUrl : icons.userFill}
              alt="test"
              className="h-[60px] w-auto border-gray-400 rounded-full bg-gray-300"
            />
            <div className="pl-3 flex flex-col gap-1">
              <h1 className="text-xl font-bold">{token.username}</h1>
              {/* tambahkan no hp */}
              {!token.phone ? (
                <div className="px-2 text-white text-[13px] bg-green-600 p-1 rounded-2xl flex gap-2 cursor-pointer font-bold">
                  <Image src={icons.add} alt=".." className="w-[18px] h-auto" />
                  Tambahkan no HP
                </div>
              ) : (
                `0${token.phone}`
              )}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="w-[70%] bg-green-500 h-screen"></div>
      </div>
    </div>
  );
}
