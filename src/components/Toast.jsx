import { useEffect } from 'react'

function Toast({ mensagem, onClose }) {
  useEffect(() => {
    if (!mensagem) return
    const timer = setTimeout(onClose, 2800)
    return () => clearTimeout(timer)
  }, [mensagem, onClose])

  if (!mensagem) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-700 text-white text-sm px-5 py-3 rounded-2xl shadow-lg border border-gray-600/50 animate-fade-in">
      {mensagem}
    </div>
  )
}

export default Toast