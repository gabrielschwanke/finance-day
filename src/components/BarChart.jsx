import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useData } from '../context/DataContext'
import { fmtBRL } from '../utils/formatters'

function GraficoBarras() {
  const { data } = useData()

  const meses = [
    { num: '01', label: 'Jan' },
    { num: '02', label: 'Fev' },
    { num: '03', label: 'Mar' },
    { num: '04', label: 'Abr' },
    { num: '05', label: 'Mai' },
    { num: '06', label: 'Jun' },
    { num: '07', label: 'Jul' },
    { num: '08', label: 'Ago' },
    { num: '09', label: 'Set' },
    { num: '10', label: 'Out' },
    { num: '11', label: 'Nov' },
    { num: '12', label: 'Dez' },
  ]

  const ano = new Date().getFullYear().toString()

  const chartData = meses.map(({ num, label }) => ({
    mes: label,
    Receitas: data.transacoes
      .filter(t => t.tipo === 'receita' && t.data.startsWith(`${ano}-${num}`))
      .reduce((s, t) => s + t.valor, 0),
    Despesas: data.transacoes
      .filter(t => t.tipo === 'despesa' && t.data.startsWith(`${ano}-${num}`))
      .reduce((s, t) => s + t.valor, 0),
  }))

  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
      <h3 className="text-base font-semibold text-white mb-4">Comparativo Mensal {ano}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} barGap={4}>
          <XAxis
            dataKey="mes"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
          />
          <Tooltip
            formatter={(value) => fmtBRL(value)}
            contentStyle={{
              background: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '12px',
              color: '#fff',
            }}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>
            )}
          />
          <Bar dataKey="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoBarras