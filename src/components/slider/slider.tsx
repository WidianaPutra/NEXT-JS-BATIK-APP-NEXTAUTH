export default function Slider({
  data,
  callback,
}: {
  data: any;
  callback: Function;
}) {
  return (
    <>
      <div>{data.map((itmes: any, i: Number) => callback(itmes, i))}</div>
    </>
  );
}
