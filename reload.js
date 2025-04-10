document.getElementById('logo-start').addEventListener('click', function () {
  // Mostra o overlay de carregamento
  const overlay = document.getElementById('loadingOverlay')
  overlay.style.display = 'flex'

  // Bloqueia interações
  document.body.style.pointerEvents = 'none'

  // Recarrega a página após pequeno delay
  setTimeout(() => {
    window.location.reload()
  }, 1000)
})

