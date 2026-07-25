import logo from '../assets/img/logo-finance.png'
import { useData } from '../context/DataContext'

function Header({ showToast }) {
  const { data, updateData, DEFAULT_DATA } = useData()
  const mes = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  function handleExport() {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `financeday-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Dados exportados!')
  }

  function handleReset() {
    if (!confirm('Isso apagará todos os seus dados. Deseja continuar?')) return
    updateData(JSON.parse(JSON.stringify(DEFAULT_DATA)))
    showToast('Dados resetados!')
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-gray-700/50 h-20">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors border border-gray-700/50"
          >
            Exportar
          </button>
          <button
            onClick={handleReset}
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors border border-gray-700/50"
          >
            Resetar
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
            G
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header