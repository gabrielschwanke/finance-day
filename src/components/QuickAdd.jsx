import { useState } from 'react'
import { useData } from '../context/DataContext'
import { uid } from '../utils/helpers'

function QuickAdd({ showToast }) {
  const { data, updateData } = useData()
  const [tipo, setTipo] = useState('despesa')
  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [data_,  setData] = useState(new Date().toISOString().slice(0, 10))

  function handleSubmit() {
    if (!valor || !descricao || !categoriaId || !data_) return

    const nova = {
      id: uid(),
      tipo,
      descricao,
      valor: parseFloat(valor),
      categoriaId,
      data: data_,
    }

    updateData({
      ...data,
      transacoes: [...data.transacoes, nova],
    })

    setValor('')
    setDescricao('')
    showToast('Transação adicionada!') 
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700/50 space-y-3">
      
      {/* Tipo toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setTipo('despesa')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
            tipo === 'despesa'
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'text-gray-400 border border-gray-700 hover:border-gray-500'
          }`}
        >
          Despesa
        </button>
        <button
          onClick={() => setTipo('receita')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
            tipo === 'receita'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'text-gray-400 border border-gray-700 hover:border-gray-500'
          }`}
        >
          Receita
        </button>
      </div>

      {/* Campos */}
      <div className="flex flex-wrap gap-2">
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 w-32 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 min-w-32 focus:outline-none focus:border-blue-500"
        />
        <select
          value={categoriaId}
          onChange={e => setCategoriaId(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white flex-1 min-w-32 focus:outline-none focus:border-blue-500"
        >
          <option value="">Categoria...</option>
          {data.categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
        <input
          type="date"
          value={data_}
          onChange={e => setData(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Adicionar
        </button>
      </div>

    </div>
  )
}

export default QuickAdd