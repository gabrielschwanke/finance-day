import { createContext, useContext, useState } from 'react'

const DEFAULT_DATA = {
  categorias: [
    { id: 'c1', nome: 'Moradia',     cor: '#3b82f6' },
    { id: 'c2', nome: 'Alimentação', cor: '#10b981' },
    { id: 'c3', nome: 'Transporte',  cor: '#f59e0b' },
    { id: 'c4', nome: 'Saúde',       cor: '#ec4899' },
    { id: 'c5', nome: 'Lazer',       cor: '#8b5cf6' },
    { id: 'c6', nome: 'Educação',    cor: '#06b6d4' },
    { id: 'c7', nome: 'Outros',      cor: '#6b7280' },
    { id: 'c8', nome: 'Salário',     cor: '#10b981' },
    { id: 'c9', nome: 'Freelance',   cor: '#3b82f6' },
  ],
  transacoes: [],
  buckets: {
    c1: 'necessidades', c2: 'necessidades',
    c3: 'necessidades', c4: 'necessidades',
    c5: 'desejos',      c6: 'desejos',
    c7: 'desejos',      c8: null, c9: null,
  },
  patrimonio: { ativos: 0, passivos: 0 },
  investimentos: [],
  metas: [],
}

const STORAGE_KEY = 'financedash_v3'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_DATA))
}

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData)

  function updateData(newData) {
    setData(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  }

  return (
    <DataContext.Provider value={{ data, updateData, DEFAULT_DATA }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}