import CustomSelect from "./CustomSelect";

function MonthFilter({ mes, ano, onChange }) {
  const meses = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Maio" },
    { value: 6, label: "Junho" },
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
    { value: 10, label: "Outubro" },
    { value: 11, label: "Novembro" },
    { value: 12, label: "Dezembro" },
  ];

  const anoAtual = new Date().getFullYear();
  const anos = [anoAtual - 1, anoAtual, anoAtual + 1, anoAtual + 2].map(
    (a) => ({
      value: a,
      label: String(a),
    }),
  );

  return (
    <div className="flex items-center gap-2">
      <CustomSelect
        value={mes}
        onChange={(m) => onChange(Number(m), ano)}
        options={meses}
      />
      <CustomSelect
        value={ano}
        onChange={(a) => onChange(mes, Number(a))}
        options={anos}
      />
    </div>
  );
}

export default MonthFilter;
