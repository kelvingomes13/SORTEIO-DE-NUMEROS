document.addEventListener('DOMContentLoaded', function () {
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
})

function sortearNumerosEExibir() {
  // Obter os valores de quantidade, início e fim
  const quantidade = parseInt(
    document.getElementById('quantidade')?.textContent || 6
  )
  const inicio = parseInt(document.getElementById('inicio')?.textContent || 1)
  const fim = parseInt(document.getElementById('fim')?.textContent || 60)

  // Validar os valores
  if (isNaN(quantidade) || isNaN(inicio) || isNaN(fim) || inicio >= fim) {
    console.error('Parâmetros inválidos para o sorteio')
    return
  }

  // Sortear os números
  const numerosSorteados = sortearNumeros(quantidade, inicio, fim)

  // Exibir os números sorteados
  exibirResultado(numerosSorteados)
}

function sortearNumeros(quantidade, inicio, fim) {
  let numerosSorteados = new Set() // Usar Set para garantir números únicos
  const range = fim - inicio + 1

  if (quantidade > range) {
    console.error(
      `Não é possível sortear ${quantidade} números únicos no intervalo especificado`
    )
    return []
  }

  while (numerosSorteados.size < quantidade) {
    let numeroSorteado = Math.floor(Math.random() * range) + inicio
    numerosSorteados.add(numeroSorteado)
  }
  return Array.from(numerosSorteados).sort((a, b) => a - b)
}

let contadorSorteios = 0 // Contador de sorteios
function exibirResultado(numerosSorteados) {
  const resultadoDiv = document.getElementById('numerosSorteados')
  const resultadoSection = document.getElementById('resultado')
  const raffleSection = document.querySelector('.raffle')

  if (!resultadoDiv || !resultadoSection || !raffleSection) {
    console.error('Elementos não encontrados para exibir resultado')
    return
  }

  // Incrementa o contador de sorteios
  contadorSorteios++   // Incrementa o contador de sorteios

  // Alternar entre as seções
  raffleSection.style.display = 'none'
  resultadoSection.style.display = 'flex'

  // Criar elemento "1º Sorteio" se não existir
  let tituloSorteio = resultadoSection.querySelector('.titulo-sorteio')
  if (!tituloSorteio) {
    tituloSorteio = document.createElement('h3')
    tituloSorteio.className = 'titulo-sorteio'
    // Inserir após o h2 e antes da div#numerosSorteados
    resultadoSection.insertBefore(tituloSorteio, resultadoDiv)
  }
  tituloSorteio.textContent = `${contadorSorteios}º Resultado`

  // Exibir os números sorteados
  resultadoDiv.innerHTML = ''
  numerosSorteados.forEach(numero => {
    const span = document.createElement('span')
    span.textContent = numero
    span.className = 'numero-sorteado'
    resultadoDiv.appendChild(span)
  })
}

// Variável para controlar o modo de repetição
let permitirRepeticao = false; // Inicia desativado (sem repetição)

// Configuração do toggle switch
document.getElementById('switch').addEventListener('change', function() {
  permitirRepeticao = this.checked;
  atualizarLabel();
  console.log('Modo com repetição:', permitirRepeticao);
});

// Função para atualizar o texto do label
function atualizarLabel() {
  const label = document.querySelector('.toggle .label');
  label.textContent = permitirRepeticao ? 'Repetição ativada' : 'Repetição desativada';
}

// Função de sorteio adaptável (para usar em seu código existente)
function sortearNumeros(quantidade, inicio, fim) {
  let numeros = [];
  
  if (permitirRepeticao) {
    // Modo com repetição permitida
    for (let i = 0; i < quantidade; i++) {
      numeros.push(Math.floor(Math.random() * (fim - inicio + 1)) + inicio);
    }
  } else {
    // Modo sem repetição (usa Set)
    let numerosUnicos = new Set();
    while (numerosUnicos.size < quantidade) { //while para garantir a quantidade
      // Gera um número aleatório entre inicio e fim
      // Math.random() gera um número entre 0 e 1, multiplicamos pelo intervalo e somamos o início
      // Math.floor arredonda para baixo
      const numero = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
      numerosUnicos.add(numero);  
    }
    numeros = Array.from(numerosUnicos);
  }
  
  return numeros.sort((a, b) => a - b); // Retorna ordenado
}

// Inicialização
atualizarLabel();
