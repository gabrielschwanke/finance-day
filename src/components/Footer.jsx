function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="mt-10 border-t border-gray-700/50 py-6 text-center text-xs text-gray-500">
      FinanceDay &copy; {ano} &mdash; Seus dados ficam salvos localmente no navegador
    </footer>
  )
}

export default Footer