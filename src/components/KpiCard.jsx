function KpiCard({ titulo, valor, nota, cor }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700/50">
      <p className="text-sm text-gray-400 mb-2">{titulo}</p>
      <p className={`text-2xl font-bold ${cor || 'text-white'}`}>{valor}</p>
      {nota && <p className="text-xs text-gray-500 mt-1">{nota}</p>}
    </div>
  )
}

export default KpiCard