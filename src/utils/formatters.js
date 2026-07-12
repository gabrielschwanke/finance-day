export const fmt = (v, decimals = 2) =>
  v.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

export const fmtBRL = (v) => 'R$ ' + fmt(v)