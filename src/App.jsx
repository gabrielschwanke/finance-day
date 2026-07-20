import { useState } from 'react'
import Header from './components/Header'
import NavTabs from './components/NavTabs'
import Receitas from './pages/Receitas'
import Orcamento from './pages/Orcamento'
import Investimentos from './pages/Investimentos'
import Metas from './pages/Metas'

function App() {
  const [activeTab, setActiveTab] = useState('receitas')

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'receitas'      && <Receitas />}
        {activeTab === 'orcamento'     && <Orcamento />}
        {activeTab === 'investimentos' && <Investimentos />}
        {activeTab === 'metas'         && <Metas />}
      </main>
    </div>
  )
}

export default App
