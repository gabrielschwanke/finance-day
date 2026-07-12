export const uid = () => Math.random().toString(36).slice(2, 10)

export const getCategoriaById = (categorias, id) =>
  categorias.find(c => c.id === id) || { nome: 'Sem categoria', cor: '#6b7280' }