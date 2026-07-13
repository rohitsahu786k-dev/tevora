export type TechnicalRow = { property: string; value: string; note?: string };
export function TechnicalTable({
  caption = "Technical specifications",
  rows,
}: {
  caption?: string;
  rows: TechnicalRow[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-line border-y">
            <th scope="col" className="type-spec-label py-3 pr-5">
              Property
            </th>
            <th scope="col" className="type-spec-label py-3 pr-5">
              Value
            </th>
            <th scope="col" className="type-spec-label py-3">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.property} className="border-line border-b">
              <th scope="row" className="type-body-sm py-4 pr-5 font-medium">
                {row.property}
              </th>
              <td className="type-technical py-4 pr-5">{row.value}</td>
              <td className="type-body-sm text-ink-muted py-4">
                {row.note ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
