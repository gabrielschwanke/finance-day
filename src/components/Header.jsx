import logo from '../assets/img/logo-finance.png'

function Header() {
  const mes = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-gray-700/50 h-25">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-45 h-auto object-contain" />
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white">
          G
        </div>

      </div>
    </header>
  )
}

export default Header