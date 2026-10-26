import type { Macros } from "@/lib/kitchen";

export function MacroPills({ macros }: { macros: Macros }) {
  const pills = [
    { label: `P ${macros.protein}`, dot: "bg-protein", text: "text-protein", wash: "bg-protein/10" },
    { label: `C ${macros.carbs}`, dot: "bg-carbs", text: "text-carbs", wash: "bg-carbs/10" },
    { label: `F ${macros.fat}`, dot: "bg-fat", text: "text-fat", wash: "bg-fat/10" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((pill) => (
        <span
          key={pill.label}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide uppercase ${pill.wash} ${pill.text}`}
        >
          <span className={`size-2 rounded-full ${pill.dot}`} />
          {pill.label}
        </span>
      ))}
    </div>
  );
}
