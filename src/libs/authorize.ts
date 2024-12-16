"use client";
import { useSession } from "next-auth/react";
import axios from "axios";

export const isLogin = () => {
  const { data: session, status } = useSession();

  console.log();
  if (status === "authenticated") {
    return {
      status: true,
      data: session,
    };
  }
  return false;
};

export const isSeller = () => {
  const { data: session, status } = useSession();

  axios.get("/api/getToken").then((data: any) => {
    if (status === "authenticated" && data.data.token.role === "seller") {
      return {
        status: true,
        data: data.data.token,
      };
    }
  });
  return false;
};
