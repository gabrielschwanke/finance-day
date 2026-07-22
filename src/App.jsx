import { useState } from 'react'
import Header from './components/Header'
import NavTabs from './components/NavTabs'
import Receitas from './pages/Receitas'
import Orcamento from './pages/Orcamento'
import Investimentos from './pages/Investimentos'
import Metas from './pages/Metas'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { useToast } from './hooks/useToast'

function App() {
  const [activeTab, setActiveTab] = useState('receitas')
  const { mensagem, showToast, hideToast } = useToast()

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'receitas'      && <Receitas showToast={showToast} />}
        {activeTab === 'orcamento'     && <Orcamento />}
        {activeTab === 'investimentos' && <Investimentos showToast={showToast} />}
        {activeTab === 'metas'         && <Metas showToast={showToast} />}
      </main>
      <Footer />
      <Toast mensagem={mensagem} onClose={hideToast} />
    </div>
  )
}

export default App
