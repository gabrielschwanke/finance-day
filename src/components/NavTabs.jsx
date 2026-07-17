const TABS = [
  { id: 'receitas',      label: 'Receitas & Gastos' },
  { id: 'orcamento',     label: 'Orçamento' },
  { id: 'investimentos', label: 'Investimentos' },
  { id: 'metas',         label: 'Metas' },
]

function NavTabs({ activeTab, onTabChange }) {
  return (
    <nav className="bg-gray-900 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto py-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default NavTabs