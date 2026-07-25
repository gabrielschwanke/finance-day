import { useState } from 'react'
import KpiCard from '../components/KpiCard'
import QuickAdd from '../components/QuickAdd'
import TransactionList from '../components/TransactionList'
import GraficoPizza from '../components/PieChart'
import GraficoBarras from '../components/BarChart'
import { useData } from '../context/DataContext'
import { fmtBRL } from '../utils/formatters'
import MonthFilter from '../components/MonthFilter'

function Receitas({ showToast }) {
  const { data } = useData()
  const hoje = new Date()
  const [mes, setMes] = useState(hoje.getMonth() + 1)
  const [ano, setAno] = useState(hoje.getFullYear())


  const mesStr = String(mes).padStart(2, '0')
  const prefixo = `${ano}-${mesStr}`

  const transacoesFiltradas = data.transacoes.filter(t =>
    t.data.startsWith(prefixo)
  )

  const receitas = transacoesFiltradas
    .filter(t => t.tipo === 'receita')
    .reduce((s, t) => s + t.valor, 0)

  const despesas = transacoesFiltradas
    .filter(t => t.tipo === 'despesa')
    .reduce((s, t) => s + t.valor, 0)

  const saldo = receitas - despesas

  const nRec = data.transacoes.filter(t => t.tipo === 'receita').length
  const nDes = data.transacoes.filter(t => t.tipo === 'despesa').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">Receitas & Gastos</h2>
        <MonthFilter mes={mes} ano={ano} onChange={(m, a) => { setMes(m); setAno(a) }} />
      </div>
      <QuickAdd showToast={showToast} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          titulo="Receitas"
          valor={fmtBRL(receitas)}
          nota={`${nRec} transações`}
          cor="text-emerald-400"
        />
        <KpiCard
          titulo="Despesas"
          valor={fmtBRL(despesas)}
          nota={`${nDes} transações`}
          cor="text-red-400"
        />
        <KpiCard
          titulo="Saldo Mensal"
          valor={fmtBRL(saldo)}
          nota={receitas > 0 ? `${((saldo / receitas) * 100).toFixed(1)}% da receita` : '0% da receita'}
          cor={saldo >= 0 ? 'text-emerald-400' : 'text-red-400'}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GraficoPizza mes={mes} ano={ano} />
        <GraficoBarras />
      </div>
      <TransactionList showToast={showToast} mes={mes} ano={ano} />
    </div>
  )
}

export default Receitas