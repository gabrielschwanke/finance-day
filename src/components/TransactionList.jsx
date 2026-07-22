import { useState } from "react";
import { useData } from "../context/DataContext";
import { fmtBRL } from "../utils/formatters";
import { getCategoriaById } from "../utils/helpers";
import EditTransactionModal from "./EditTransactionModal";

function TransactionList({ showToast }) {
  const { data, updateData } = useData();
  const [editando, setEditando] = useState(null);

  function handleDelete(id) {
    updateData({
      ...data,
      transacoes: data.transacoes.filter((t) => t.id !== id),
    })
    showToast('Transação excluída!')
  }

  const transacoes = [...data.transacoes].sort((a, b) =>
    b.data.localeCompare(a.data),
  );

  if (transacoes.length === 0) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700/50 text-center text-gray-500 text-sm">
        Nenhuma transação ainda. Use o formulário acima para adicionar.
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800 rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-700/50">
          <h3 className="text-sm font-semibold text-white">Transações</h3>
        </div>
        <div className="divide-y divide-gray-700/50 max-h-80 overflow-y-auto">
          {transacoes.map((t) => {
            const cat = getCategoriaById(data.categorias, t.categoriaId);
            const isReceita = t.tipo === "receita";
            const data_ = new Date(t.data + "T12:00:00").toLocaleDateString(
              "pt-BR",
              {
                day: "2-digit",
                month: "short",
              },
            );

            return (
              <div
                key={t.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700/30 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: cat.cor }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{t.descricao}</p>
                  <p className="text-xs text-gray-500">
                    {cat.nome} · {data_}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium flex-shrink-0 ${isReceita ? "text-emerald-400" : "text-red-400"}`}
                >
                  {isReceita ? "+" : "-"}
                  {fmtBRL(t.valor)}
                </span>
                <button
                  onClick={() => setEditando(t)} // ← 3. abre o modal
                  className="text-gray-600 hover:text-blue-400 transition-colors text-xs ml-2"
                  title="Editar"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-gray-600 hover:text-red-400 transition-colors text-xs ml-2"
                  title="Excluir"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <EditTransactionModal
        transacao={editando}
        onClose={() => setEditando(null)}
        showToast={showToast}
      />
    </>
  );
}

export default TransactionList;
