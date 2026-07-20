import { useData } from '../context/DataContext'
import { fmtBRL } from '../utils/formatters'

function Orcamento() {
  const { data } = useData()

  const receitas = data.transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((s, t) => s + t.valor, 0)

  const despesas = data.transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((s, t) => s + t.valor, 0)

  const saldo = receitas - despesas

  // Calcula gastos por bucket
  const buckets = { necessidades: 0, desejos: 0, investimentos: 0 }
  data.transacoes
    .filter(t => t.tipo === 'despesa')
    .forEach(t => {
      const bucket = data.buckets[t.categoriaId]
      if (bucket && buckets[bucket] !== undefined) {
        buckets[bucket] += t.valor
      }
    })

  const limites = {
    necessidades:  receitas * 0.5,
    desejos:       receitas * 0.3,
    investimentos: receitas * 0.2,
  }

  const itens = [
    { label: 'Necessidades', sublabel: '50%', gasto: buckets.necessidades, limite: limites.necessidades, cor: '#3b82f6' },
    { label: 'Desejos',      sublabel: '30%', gasto: buckets.desejos,      limite: limites.desejos,      cor: '#8b5cf6' },
    { label: 'Investimentos',sublabel: '20%', gasto: buckets.investimentos, limite: limites.investimentos,cor: '#10b981' },
  ]

  return (
    <div className="space-y-6">

      {/* Cards 50/30/20 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {itens.map(item => (
          <div key={item.label} className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50 text-center">
            <p className="text-2xl font-black mb-1" style={{ color: item.cor }}>{item.sublabel}</p>
            <p className="font-semibold text-white">{item.label}</p>
            <p className="text-lg font-bold mt-2" style={{ color: item.cor }}>{fmtBRL(item.limite)}</p>
          </div>
        ))}
      </div>

      {/* Barras de progresso */}
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50 space-y-6">
        <h3 className="text-base font-semibold text-white">Progresso da Regra 50/30/20</h3>
        {itens.map(item => {
          const pct = item.limite > 0 ? Math.min((item.gasto / item.limite) * 100, 100) : 0
          const over = item.gasto > item.limite
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-200 font-medium">{item.label} ({item.sublabel})</span>
                <span style={{ color: over ? '#ef4444' : '#10b981' }}>
                  {over ? `Acima em ${fmtBRL(item.gasto - item.limite)}` : `${fmtBRL(item.limite - item.gasto)} restante`}
                </span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: over ? '#ef4444' : item.cor }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{fmtBRL(item.gasto)} gastos</span>
                <span>Limite: {fmtBRL(item.limite)}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Indicador de fechamento */}
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Fechamento do Mês</h3>
            <p className="text-sm text-gray-400 mt-1">Quanto falta para fechar no positivo</p>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {fmtBRL(Math.abs(saldo))}
            </p>
            <p className="text-xs text-gray-400">{saldo >= 0 ? 'superávit' : 'déficit'}</p>
          </div>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-blue-500 to-emerald-500"
            style={{ width: receitas > 0 ? `${Math.min((despesas / receitas) * 100, 100)}%` : '0%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span className="text-red-400">{fmtBRL(despesas)} gastos</span>
          <span className={saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}>
            {saldo >= 0 ? `${fmtBRL(saldo)} sobrando` : `${fmtBRL(Math.abs(saldo))} a descoberto`}
          </span>
        </div>
      </div>

    </div>
  )
}

export default Orcamento