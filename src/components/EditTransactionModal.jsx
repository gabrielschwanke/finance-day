import { useState, useEffect } from 'react'
import { useData } from '../context/DataContext'
import { fmtBRL } from '../utils/formatters'

function EditTransactionModal({ transacao, onClose, showToast }) {
  const { data, updateData } = useData()
  const [tipo, setTipo] = useState('despesa')
  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [data_, setData] = useState('')

  useEffect(() => {
    if (transacao) {
      setTipo(transacao.tipo)
      setValor(transacao.valor)
      setDescricao(transacao.descricao)
      setCategoriaId(transacao.categoriaId)
      setData(transacao.data)
    }
  }, [transacao])

  if (!transacao) return null

  function handleSave() {
    if (!valor || !descricao || !categoriaId || !data_) return

    updateData({
      ...data,
      transacoes: data.transacoes.map(t =>
        t.id === transacao.id
          ? { ...t, tipo, valor: parseFloat(valor), descricao, categoriaId, data: data_ }
          : t
      ),
    })

    showToast('Transação atualizada!')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700/50 w-full max-w-md mx-4 space-y-4" onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Editar Transação</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        {/* Tipo toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setTipo('despesa')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              tipo === 'despesa'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'text-gray-400 border border-gray-700'
            }`}
          >
            Despesa
          </button>
          <button
            onClick={() => setTipo('receita')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              tipo === 'receita'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-gray-400 border border-gray-700'
            }`}
          >
            Receita
          </button>
        </div>

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={e => setValor(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            value={data_}
            onChange={e => setData(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={categoriaId}
          onChange={e => setCategoriaId(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Categoria...</option>
          {data.categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditTransactionModal