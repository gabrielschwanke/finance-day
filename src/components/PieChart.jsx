import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useData } from '../context/DataContext'
import { fmtBRL } from '../utils/formatters'

function GraficoPizza() {
  const { data } = useData()

  const gastosPorCategoria = data.categorias.map(cat => {
    const total = data.transacoes
      .filter(t => t.tipo === 'despesa' && t.categoriaId === cat.id)
      .reduce((s, t) => s + t.valor, 0)
    return { name: cat.nome, value: total, cor: cat.cor }
  }).filter(c => c.value > 0)

  if (gastosPorCategoria.length === 0) {
    return (
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50 text-center text-gray-500 text-sm py-10">
        Nenhuma despesa registrada ainda.
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
      <h3 className="text-base font-semibold text-white mb-4">Gastos por Categoria</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={gastosPorCategoria}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {gastosPorCategoria.map((entry, index) => (
              <Cell key={index} fill={entry.cor} />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoPizza