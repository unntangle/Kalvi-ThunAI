import {
  CLASSES,
  SUBJECTS,
  GROUPS,
  CORE_SUBJECTS,
  hasGroups,
  classTotals,
} from "@/data/curriculum";

function chips(ids) {
  return ids
    .map((id) => SUBJECTS.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => (
      <span
        key={s.id}
        className="rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
        style={{ backgroundColor: `${s.color}16`, color: s.color }}
      >
        {s.name}
      </span>
    ));
}

export default function CoverageGrid() {
  const seniorSubjects = GROUPS.flatMap((g) => g.subjects).filter(
    (v, i, a) => a.indexOf(v) === i
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <caption className="sr-only">
          Subjects, chapters and concepts loaded into the demo, by class
        </caption>
        <thead>
          <tr className="bg-mist">
            <th className="rounded-l-lg px-4 py-3 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-inkFaint">
              Class
            </th>
            <th className="px-4 py-3 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-inkFaint">
              Subjects
            </th>
            <th className="px-4 py-3 text-right font-display text-[11px] font-bold uppercase tracking-[0.12em] text-inkFaint">
              Chapters
            </th>
            <th className="rounded-r-lg px-4 py-3 text-right font-display text-[11px] font-bold uppercase tracking-[0.12em] text-inkFaint">
              Concepts
            </th>
          </tr>
        </thead>
        <tbody>
          {CLASSES.map((c) => {
            const t = classTotals(c.id);
            const ids = hasGroups(c.id) ? seniorSubjects : CORE_SUBJECTS;
            return (
              <tr key={c.id} className="border-b border-line last:border-0 align-top">
                <th className="whitespace-nowrap px-4 py-4 text-left">
                  <span className="font-display text-[17px] font-extrabold text-brand">{c.id}</span>
                  <span className="ml-2 font-tamil text-[12px] font-medium text-inkFaint">
                    {c.tamil}
                  </span>
                  {hasGroups(c.id) ? (
                    <span className="mt-1 block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-accentInk">
                      By group
                    </span>
                  ) : null}
                </th>
                <td className="px-4 py-4">
                  <span className="flex flex-wrap gap-1.5">{chips(ids)}</span>
                </td>
                <td className="px-4 py-4 text-right font-display text-[15px] font-bold text-ink">
                  {t.chapters}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="inline-flex items-center rounded-full bg-brandTint px-3 py-1 font-display text-[13px] font-bold text-brand">
                    {t.concepts}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
