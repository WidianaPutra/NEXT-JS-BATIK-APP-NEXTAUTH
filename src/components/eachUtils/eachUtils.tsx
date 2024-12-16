"use client";

import { Children } from "react";

export default function EachUtil({
  data,
  render,
}: {
  data: any;
  render: Function;
}) {
  return (
    <>
      {Children.toArray(
        data.map((item: any, index: Number) => render(item, index))
      )}
    </>
  );
}
