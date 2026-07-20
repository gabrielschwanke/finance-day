import { useState } from 'react'
import { useData } from '../context/DataContext'
import { fmtBRL, fmt } from '../utils/formatters'
import { uid } from '../utils/helpers'

function Investimentos() {
  const { data, updateData } = useData()
  const [showForm, setShowForm] = useState(false)
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [rentabilidade, setRentabilidade] = useState('')
  const [cor, setCor] = useState('#10b981')

  const total = data.investimentos.reduce((s, i) => s + i.valor, 0)
  const rentMedia = total > 0
    ? data.investimentos.reduce((s, i) => s + i.rentabilidade * (i.valor / total), 0)
    : 0
  const patrimonio = data.patrimonio.ativos - data.patrimonio.passivos

  function handleAdd() {
    if (!nome || !valor || !rentabilidade) return
    updateData({
      ...data,
      investimentos: [
        ...data.investimentos,
        { id: uid(), nome, valor: parseFloat(valor), rentabilidade: parseFloat(rentabilidade), cor }
      ]
    })
    setNome('')
    setValor('')
    setRentabilidade('')
    setCor('#10b981')
    setShowForm(false)
  }

  function handleDelete(id) {
    updateData({
      ...data,
      investimentos: data.investimentos.filter(i => i.id !== id)
    })
  }

  return (
    <div className="space-y-6">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
          <p className="text-sm text-gray-400 mb-2">Patrimônio Líquido</p>
          <p className="text-2xl font-bold text-purple-400">{fmtBRL(patrimonio)}</p>
          <p className="text-xs text-gray-500 mt-1">Ativos − Passivos</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
          <p className="text-sm text-gray-400 mb-2">Total Investido</p>
          <p className="text-2xl font-bold text-cyan-400">{fmtBRL(total)}</p>
          <p className="text-xs text-gray-500 mt-1">{data.investimentos.length} ativos</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
          <p className="text-sm text-gray-400 mb-2">Rentabilidade Média</p>
          <p className="text-2xl font-bold text-orange-400">{fmt(rentMedia, 1)}%</p>
          <p className="text-xs text-gray-500 mt-1">CDI: 10,5% a.a.</p>
        </div>
      </div>

      {/* Carteira */}
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">Carteira de Investimentos</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            + Adicionar
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-gray-900 rounded-xl p-4 mb-4 flex flex-wrap gap-2 border border-gray-700">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 min-w-32 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Valor (R$)"
              value={valor}
              onChange={e => setValor(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 w-36 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Rent. % a.a."
              value={rentabilidade}
              onChange={e => setRentabilidade(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 w-36 focus:outline-none focus:border-blue-500"
            />
            <input
              type="color"
              value={cor}
              onChange={e => setCor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-700 bg-gray-800 cursor-pointer"
            />
            <button
              onClick={handleAdd}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Salvar
            </button>
          </div>
        )}

        {/* Lista */}
        {data.investimentos.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-6">Nenhum investimento. Clique em "Adicionar".</p>
        ) : (
          <div className="space-y-4">
            {data.investimentos.map(inv => {
              const pct = total > 0 ? ((inv.valor / total) * 100).toFixed(1) : 0
              return (
                <div key={inv.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: inv.cor }} />
                      <span className="text-gray-200">{inv.nome}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{pct}%</span>
                      <span className="text-white font-medium">{fmtBRL(inv.valor)}</span>
                      <span className="text-xs text-emerald-400">+{inv.rentabilidade}%</span>
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: inv.cor }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

export default Investimentos