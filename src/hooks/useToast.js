import { useState, useCallback } from 'react'

export function useToast() {
  const [mensagem, setMensagem] = useState('')

  const showToast = useCallback((msg) => {
    setMensagem(msg)
  }, [])

  const hideToast = useCallback(() => {
    setMensagem('')
  }, [])

  return { mensagem, showToast, hideToast }
}