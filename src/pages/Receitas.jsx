import KpiCard from '../components/KpiCard'
import QuickAdd from '../components/QuickAdd'
import TransactionList from '../components/TransactionList'
import GraficoPizza from '../components/PieChart'
import GraficoBarras from '../components/BarChart'
import { useData } from '../context/DataContext'
import { fmtBRL } from '../utils/formatters'

function Receitas() {
  const { data } = useData()

  const receitas = data.transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((s, t) => s + t.valor, 0)

  const despesas = data.transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((s, t) => s + t.valor, 0)

  const saldo = receitas - despesas

  const nRec = data.transacoes.filter(t => t.tipo === 'receita').length
  const nDes = data.transacoes.filter(t => t.tipo === 'despesa').length

  return (
    <div className="space-y-6">
      <QuickAdd />
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
      <GraficoPizza />
      <GraficoBarras />
      <TransactionList />
    </div>
  )
}

export default Receitas