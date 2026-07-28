import { useState } from "react";
import { useData } from "../context/DataContext";
import CustomSelect from "./CustomSelect";

const BUCKET_OPTIONS = [
  { value: "", label: "Ignorar" },
  { value: "necessidades", label: "Necessidades (50%)" },
  { value: "desejos", label: "Desejos (30%)" },
  { value: "investimentos", label: "Investimentos (20%)" },
];

function BucketsModal({ onClose, showToast }) {
  const { data, updateData } = useData();
  const [buckets, setBuckets] = useState({ ...data.buckets });

  function handleSave() {
    updateData({ ...data, buckets });
    showToast("Categorias configuradas!");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl p-6 border border-gray-700/50 w-full max-w-md mx-4 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">
            Configurar Categorias
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Defina em qual bucket cada categoria se encaixa para calcular o
          orçamento 50/30/20.
        </p>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {data.categorias.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: cat.cor }}
              />
              <span className="text-sm text-gray-300 flex-1">{cat.nome}</span>
              <CustomSelect
                value={buckets[cat.id] || ""}
                onChange={v => setBuckets({ ...buckets, [cat.id]: v === '' ? null : v })}
                options={BUCKET_OPTIONS}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default BucketsModal;
