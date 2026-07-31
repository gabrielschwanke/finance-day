import { useState, useEffect } from "react";
import Header from "./components/Header";
import NavTabs from "./components/NavTabs";
import Receitas from "./pages/Receitas";
import Orcamento from "./pages/Orcamento";
import Investimentos from "./pages/Investimentos";
import Metas from "./pages/Metas";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { useToast } from "./hooks/useToast";

function App() {
  const [activeTab, setActiveTab] = useState("receitas");
  const [visible, setVisible] = useState(true);
  const { mensagem, showToast, hideToast } = useToast();

  function handleTabChange(tab) {
    setVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setVisible(true);
    }, 150);
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header showToast={showToast} />
      <NavTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div
          className={`transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {activeTab === "receitas" && <Receitas showToast={showToast} />}
          {activeTab === "orcamento" && <Orcamento showToast={showToast} />}
          {activeTab === "investimentos" && (
            <Investimentos showToast={showToast} />
          )}
          {activeTab === "metas" && <Metas showToast={showToast} />}
        </div>
      </main>

      <Footer />
      <Toast mensagem={mensagem} onClose={hideToast} />
    </div>
  );
}

export default App;
