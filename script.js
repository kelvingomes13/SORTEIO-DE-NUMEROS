document.addEventListener('DOMContentLoaded', function () {
  let contadorSorteios = 0
  let permitirRepeticao = false
  const loadingOverlay = document.getElementById('loadingOverlay')

  // Elementos do DOM
  const elements = {
    switch: document.getElementById('switch'),
    sortearBtn: document.getElementById('sortearBtn'),
    sortearNovamenteBtn: document.getElementById('sortearNovamenteBtn'),
    resultadoSection: document.getElementById('resultado'),
    raffleSection: document.querySelector('.raffle'),
    numerosSorteados: document.getElementById('numerosSorteados'),
    quantidadeInput: document.getElementById('quantidade'),
    inicioInput: document.getElementById('inicio'),
    fimInput: document.getElementById('fim')
  }

  // Funções de utilidade
  const utils = {
    showLoading: () => (loadingOverlay.style.display = 'flex'),
    hideLoading: () => (loadingOverlay.style.display = 'none'),
    validateInputs: (quantidade, inicio, fim) => {
      const errors = []
      if (isNaN(quantidade) || quantidade < 1)
        errors.push('Quantidade inválida')
      if (isNaN(inicio) || inicio < 0) errors.push('Valor inicial inválido')
      if (isNaN(fim) || fim < 1) errors.push('Valor final inválido')
      if (inicio >= fim)
        errors.push('O valor final deve ser maior que o inicial')
      return errors
    }
  }

  function atualizarLabel() {
    const label = document.querySelector('.toggle .label')
    if (label) {
      label.textContent = permitirRepeticao
        ? 'Repetição ativada'
        : 'Repetição desativada'
    }
  }

  // Event Listeners
  if (elements.switch) {
    elements.switch.addEventListener('change', function () {
      permitirRepeticao = this.checked
      atualizarLabel()
    })
  }

  const handleSortear = () => {
    utils.showLoading()
    setTimeout(() => {
      // Simula carregamento
      sortearNumerosEExibir()
      utils.hideLoading()
    }, 500)
  }

  if (elements.sortearBtn)
    elements.sortearBtn.addEventListener('click', handleSortear)
  if (elements.sortearNovamenteBtn)
    elements.sortearNovamenteBtn.addEventListener('click', handleSortear)

  // Lógica do sorteio
  function sortearNumeros(quantidade, inicio, fim) {
    let numeros = []
    const range = fim - inicio + 1

    if (!permitirRepeticao && quantidade > range) {
      alert(
        `Não é possível sortear ${quantidade} números únicos entre ${inicio} e ${fim}`
      )
      return []
    }

    const generator = permitirRepeticao
      ? Array.from(
          { length: quantidade },
          () => Math.floor(Math.random() * range) + inicio
        )
      : Array.from(
          new Set(
            Array.from(
              { length: range * 2 },
              () => Math.floor(Math.random() * range) + inicio
            )
          )
        ).slice(0, quantidade)

    return generator.sort((a, b) => a - b)
  }

  function sortearNumerosEExibir() {
    const quantidade = parseInt(elements.quantidadeInput.value)
    const inicio = parseInt(elements.inicioInput.value)
    const fim = parseInt(elements.fimInput.value)

    const errors = utils.validateInputs(quantidade, inicio, fim)
    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

    const numerosSorteados = sortearNumeros(quantidade, inicio, fim)
    if (numerosSorteados.length === 0) return

    exibirResultado(numerosSorteados)
  }

  // Exibição de resultados
  function exibirResultado(numerosSorteados) {
    contadorSorteios++
    elements.raffleSection.style.display = 'none'
    elements.resultadoSection.style.display = 'flex'

    const tituloSorteio =
      elements.resultadoSection.querySelector('.titulo-sorteio') ||
      document.createElement('h3')
    tituloSorteio.className = 'titulo-sorteio'
    tituloSorteio.textContent = `${contadorSorteios}º Resultado`

    if (!elements.resultadoSection.contains(tituloSorteio)) {
      elements.resultadoSection.insertBefore(
        tituloSorteio,
        elements.numerosSorteados
      )
    }

    elements.numerosSorteados.innerHTML = ''

    numerosSorteados.forEach((numero, index) => {
      setTimeout(() => {
        let box1 = document.createElement('div')
        box1.className = 'box1'

        const number1 = document.createElement('div')
        number1.className = 'number1'
        number1.textContent = numero

        box1.appendChild(number1)
        elements.numerosSorteados.appendChild(box1)

        // Animação
        setTimeout(() => {
          box1.style.animation = 'none'
          number1.style.animation = 'none'
          void box1.offsetWidth
          void number1.offsetWidth

          box1.style.animation =
            'scaleUp 0.5s ease-out, rotateHalf 1s ease-in-out 0.5s, fadeOut 0.5s ease 1.5s'
          number1.style.animation =
            'showNumber 0.1s ease 0.8s forwards, moveLeft 0.5s ease 1.5s'

          // Após animação, transformar em número final
          setTimeout(() => {
            const finalnumber = document.createElement('div')
            finalnumber.className = 'numero-final'
            finalnumber.textContent = numero
            elements.numerosSorteados.replaceChild(finalnumber, box1)//elements.numerosSorteados.removeChild(box1) é o mesmo que replaceChild, mas remove o box1 antes de adicionar o finalnumber
          }, 2000)
        }, 10)
      }, index * 2200)
    })
  }

  // Inicialização
  atualizarLabel()
})
