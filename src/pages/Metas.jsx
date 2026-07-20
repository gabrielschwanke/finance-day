import { useState } from 'react'
import { useData } from '../context/DataContext'
import { fmtBRL } from '../utils/formatters'
import { uid } from '../utils/helpers'

function Metas() {
  const { data, updateData } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [nome, setNome] = useState('')
  const [icone, setIcone] = useState('🎯')
  const [meta, setMeta] = useState('')
  const [atual, setAtual] = useState('0')
  const [aporte, setAporte] = useState('')
  const [cor, setCor] = useState('#3b82f6')

  function resetForm() {
    setEditId(null)
    setNome('')
    setIcone('🎯')
    setMeta('')
    setAtual('0')
    setAporte('')
    setCor('#3b82f6')
  }

  function handleSave() {
    if (!nome || !meta || !aporte) return

    const item = {
      id: editId || uid(),
      nome,
      icone: icone || '🎯',
      meta: parseFloat(meta),
      atual: parseFloat(atual) || 0,
      aporte: parseFloat(aporte),
      cor,
    }

    updateData({
      ...data,
      metas: editId
        ? data.metas.map(m => m.id === editId ? item : m)
        : [...data.metas, item],
    })

    resetForm()
    setShowForm(false)
  }

  function handleEdit(m) {
    setEditId(m.id)
    setNome(m.nome)
    setIcone(m.icone)
    setMeta(m.meta)
    setAtual(m.atual)
    setAporte(m.aporte)
    setCor(m.cor)
    setShowForm(true)
  }

  function handleDelete(id) {
    updateData({
      ...data,
      metas: data.metas.filter(m => m.id !== id),
    })
  }

  return (
    <div className="space-y-6">

      {/* Botão nova meta */}
      <div className="flex justify-end">
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          + Nova Meta
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50 space-y-3">
          <h3 className="text-sm font-semibold text-white">{editId ? 'Editar Meta' : 'Nova Meta'}</h3>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Nome da meta"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 min-w-32 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Ícone"
              value={icone}
              onChange={e => setIcone(e.target.value)}
              maxLength={4}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 w-20 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="number"
              placeholder="Valor da meta (R$)"
              value={meta}
              onChange={e => setMeta(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 min-w-32 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Valor atual (R$)"
              value={atual}
              onChange={e => setAtual(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 min-w-32 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Aporte mensal (R$)"
              value={aporte}
              onChange={e => setAporte(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 min-w-32 focus:outline-none focus:border-blue-500"
            />
            <input
              type="color"
              value={cor}
              onChange={e => setCor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-gray-700 bg-gray-800 cursor-pointer"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => { resetForm(); setShowForm(false) }}
              className="flex-1 py-2 rounded-lg text-sm text-gray-400 border border-gray-700 hover:border-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* Lista de metas */}
      {data.metas.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700/50 text-center text-gray-500 text-sm">
          Nenhuma meta ainda. Clique em "Nova Meta"!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.metas.map(m => {
            const pct = Math.min((m.atual / m.meta) * 100, 100)
            const restante = Math.max(m.meta - m.atual, 0)
            const meses = m.aporte > 0 ? Math.ceil(restante / m.aporte) : 0
            const anos = Math.floor(meses / 12)
            const mesesR = meses % 12
            const tempoStr = restante <= 0
              ? 'Concluída!'
              : anos > 0 ? `${anos}a ${mesesR}m` : `${meses} meses`

            return (
              <div key={m.id} className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{m.icone}</span>
                    <h4 className="font-semibold text-white text-sm">{m.nome}</h4>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(m)}
                      className="text-gray-500 hover:text-blue-400 transition-colors text-xs px-1"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{fmtBRL(m.atual)} de {fmtBRL(m.meta)}</span>
                    <span>{pct.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: m.cor }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Aporte: <span className="font-medium" style={{ color: m.cor }}>{fmtBRL(m.aporte)}/mês</span></span>
                  <span>Estimativa: <span className="text-gray-300 font-medium">{tempoStr}</span></span>
                </div>
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

export default Metas