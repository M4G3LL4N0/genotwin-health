type ClinicianQuestionBriefProps = {
  questions: string[];
  summary?: string;
};

export function ClinicianQuestionBrief({ questions, summary }: ClinicianQuestionBriefProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Clinician question brief</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-900">Bring clearer questions to your visit</h2>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
        {questions.map((question) => (
          <li key={question} className="flex gap-3 rounded-2xl bg-sky-50/70 px-4 py-3 ring-1 ring-sky-100">
            <span className="font-semibold text-sky-700">?</span>
            <span>{question}</span>
          </li>
        ))}
      </ul>
      {summary ? (
        <div className="mt-6 rounded-2xl border border-slate-900/10 bg-slate-900 p-5 text-sm leading-relaxed text-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Discussion summary</p>
          <p className="mt-2">{summary}</p>
        </div>
      ) : null}
    </article>
  );
}
