export default function FormContainer({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[30%]">
        {children}
      </div>
    </div>
  );
}
