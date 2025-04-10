document.querySelectorAll('.custom-caret').forEach(input => {
  input.addEventListener('input', function () {
    const box = this.closest('.box')
    const cursor = box.querySelector('.custom-cursor')
    // Lógica para atualizar a posição do cursor
  })
})
