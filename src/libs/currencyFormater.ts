"use client";

export const CurrencyFormater = (number: any) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  return formatter;
};
