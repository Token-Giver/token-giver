export function ProgressBar({
  percent,
  height = 10,
}: {
  percent: number | `${number}%`;
  height?: number;
}) {
  const width = typeof percent === "number" ? `${percent * 100}%` : percent;
  return (
    <div className="w-full bg-tkg-gray-200" style={{ height }}>
      <div className="bg-tkg-primary h-full" style={{ width }}></div>
    </div>
  );
}
