// script.js

document.getElementById('sortearBtn').addEventListener('click', function () {
  // Obter os valores de quantidade, início e fim
  const quantidade = parseInt(document.getElementById('quantidade').textContent)
  const inicio = parseInt(document.getElementById('inicio').textContent)
  const fim = parseInt(document.getElementById('fim').textContent)

  // Sortear os números
  const numerosSorteados = sortearNumeros(quantidade, inicio, fim)

  // Exibir os números sorteados
  exibirResultado(numerosSorteados)
})

document.getElementById('voltarBtn').addEventListener('click', function () {
  // Voltar para a tela de sorteio
  document.getElementById('resultado').style.display = 'none'
  document.querySelector('.raffle').style.display = 'block'
})

function sortearNumeros(quantidade, inicio, fim) {
  let numerosSorteados = new Set()
  while (numerosSorteados.size < quantidade) {
    let numeroSorteado = Math.floor(Math.random() * (fim - inicio + 1)) + inicio
    numerosSorteados.add(numeroSorteado)
  }
  return Array.from(numerosSorteados)
}

function exibirResultado(numerosSorteados) {
  // Ocultar a seção de sorteio e exibir a seção de resultados
  document.querySelector('.raffle').style.display = 'none'
  document.getElementById('resultado').style.display = 'block'

  // Exibir os números sorteados na seção de resultados
  document.getElementById('numerosSorteados').textContent =
    numerosSorteados.join('  ')
}
