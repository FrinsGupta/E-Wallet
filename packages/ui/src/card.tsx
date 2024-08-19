"use client"
export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 bg-gray-300 rounded-3xl py-6 px-10 ">
        <h1 className="text-xl border-b pb-2">{title}</h1>
        <div>{children}</div>
    </div>
  );
}
