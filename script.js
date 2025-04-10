document.addEventListener('DOMContentLoaded', function () {
  // Variáveis globais dentro do escopo
  let contadorSorteios = 0
  let permitirRepeticao = false // Corrigido o nome da variável

  // Função para atualizar o texto do label
  function atualizarLabel() {
    const label = document.querySelector('.toggle .label')
    if (label) {
      label.textContent = permitirRepeticao
        ? 'Repetição ativada'
        : 'Repetição desativada'
    }
  }

  // Configuração do toggle switch
  const switchElement = document.getElementById('switch')
  if (switchElement) {
    switchElement.addEventListener('change', function () {
      permitirRepeticao = this.checked // Corrigido para usar o nome correto
      atualizarLabel()
      console.log('Modo com repetição:', permitirRepeticao)
    })
  }

  // Configuração do botão de sorteio inicial
  const sortearBtn = document.getElementById('sortearBtn')
  if (sortearBtn) {
    sortearBtn.addEventListener('click', function () {
      sortearNumerosEExibir()
    })
  }

  // Configuração do botão "Sortear Novamente"
  const sortearNovamenteBtn = document.getElementById('sortearNovamenteBtn')
  if (sortearNovamenteBtn) {
    sortearNovamenteBtn.addEventListener('click', function () {
      sortearNumerosEExibir()
    })
  }

  // Função para sortear números únicos
  function sortearNumeros(quantidade, inicio, fim) {
    let numeros = []

    if (permitirRepeticao) {
      // Modo com repetição permitida
      for (let i = 0; i < quantidade; i++) {
        numeros.push(Math.floor(Math.random() * (fim - inicio + 1)) + inicio)
      }
    } else {
      // Modo sem repetição (usa Set)
      let numerosUnicos = new Set()
      const range = fim - inicio + 1

      if (quantidade > range) {
        console.error(
          `Não é possível sortear ${quantidade} números únicos no intervalo especificado`
        )
        return []
      }

      while (numerosUnicos.size < quantidade) {
        const numero = Math.floor(Math.random() * (fim - inicio + 1)) + inicio
        numerosUnicos.add(numero)
      }
      numeros = Array.from(numerosUnicos)
    }

    return numeros.sort((a, b) => a - b)
  }

  function sortearNumerosEExibir() {
    // Obter os valores de quantidade, início e fim
    const quantidade = parseInt(
      document.getElementById('quantidade')?.textContent || 6
    )
    const inicio = parseInt(document.getElementById('inicio')?.textContent || 1)
    const fim = parseInt(document.getElementById('fim')?.textContent || 100)

    if (isNaN(quantidade) || isNaN(inicio) || isNaN(fim) || inicio >= fim) {
      console.error('Parâmetros inválidos para o sorteio')
      return
    }

    const numerosSorteados = sortearNumeros(quantidade, inicio, fim)
    exibirResultado(numerosSorteados)
  }

  function exibirResultado(numerosSorteados) {
    const resultadoDiv = document.getElementById('numerosSorteados')
    const resultadoSection = document.getElementById('resultado')
    const raffleSection = document.querySelector('.raffle')

    if (!resultadoDiv || !resultadoSection || !raffleSection) {
      console.error('Elementos não encontrados para exibir resultado')
      return
    }

    // Incrementa o contador de sorteios
    contadorSorteios++

    // Alternar entre as seções
    raffleSection.style.display = 'none'
    resultadoSection.style.display = 'flex'

    // Criar elemento "1º Sorteio" se não existir
    let tituloSorteio = resultadoSection.querySelector('.titulo-sorteio')
    if (!tituloSorteio) {
      tituloSorteio = document.createElement('h3')
      tituloSorteio.className = 'titulo-sorteio'
      resultadoSection.insertBefore(tituloSorteio, resultadoDiv)
    }
    tituloSorteio.textContent = `${contadorSorteios}º Resultado`

    // Exibir os números sorteados
    resultadoDiv.innerHTML = ''

    numerosSorteados.forEach((numero, index) => {
      setTimeout(() => {
        const box1 = document.createElement('div')
        box1.className = 'box1'

        const number1 = document.createElement('div')
        number1.className = 'number1'
        number1.textContent = numero

        box1.appendChild(number1)
        resultadoDiv.appendChild(box1)

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
            resultadoDiv.replaceChild(finalnumber, box1)
          }, 2000)
        }, 10)
      }, index * 2200) // Atraso entre cada número (2.2s)
    })
  }

  // Inicialização
  atualizarLabel()
})
