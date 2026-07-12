function Header() {
  const mes = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">₢</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">FinanceDash</h1>
            <p className="text-xs text-gray-400 capitalize">{mes}</p>
          </div>
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
          G
        </div>

      </div>
    </header>
  )
}

export default Header