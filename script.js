// Carrega as informações contidas no arquivo dados.JSON e preenche o array de itens com esses dados.
fetch("banco.json")
    .then((data) => data.json())
    .then((data) => {
        items = data.Livros;
    });

// Obtem o elemento conteiner dos cards e a entrada de busca
const cardContainer = document.getElementById("cardContainer");
const barraDePesquisa = document.getElementById("barraDePesquisa");

// Array que armazena os itens do meu banco de dados (JSON)
let items = [];

// Adiciona um EventListener ao botão "Confirmar"
document.getElementById("confirmarBtn").addEventListener("click", function () {
    exibirCards();
});

// Adiciona um EventListener à barra de pesquisa para capturar a tecla Enter
barraDePesquisa.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o comportamento padrão do formulário (submit)
        exibirCards();
    }
});

// Função para criar um card na div.conteiner...
function criarCard(item) {
    const card = document.createElement('div');
    card.classList.add('col', 'border', 'border-dark', 'p-3', 'border-5');

    // Adiciona a imagem ao card
    const imagem = document.createElement('img');
    imagem.src = "/img/capa.jpg"; // Substitua 'imagem' pelo caminho real da imagem no seu objeto JSON(imagem é única, então não tem necessidade)
    imagem.classList.add('card-img');
    imagem.alt = 'Imagem do Livro';

    // Defina um estilo para a imagem ajustar-se à tela
    imagem.style.maxWidth = '100%'; // Ajuste conforme necessário
    imagem.style.borderRadius = '10px'; // Bordas levemente arredondadas
    card.appendChild(imagem);

    // Adiciona o conteúdo do card
    const corpoCard = document.createElement('div');
    corpoCard.classList.add('corpo-card');

    // Adiciona o título ao card
    const titulo = document.createElement('h4');
    titulo.classList.add('titulo-card');
    titulo.innerHTML = `<br>
                        <strong>Título:</strong> ${item.titulo}`;
    corpoCard.appendChild(titulo);

    // Adiciona os sub-titulos (Autor, Ano Publicado, Gênero)
    const subTitulos = document.createElement('p');
    subTitulos.classList.add('texto-card');
    subTitulos.innerHTML = `<strong>Autor:</strong> ${item.autor}<br>
                        <strong>Ano Publicado:</strong> ${item.anoPublicado}<br>
                        <strong>Gênero:</strong> ${item.genero}`;
    corpoCard.appendChild(subTitulos);

    card.appendChild(corpoCard);

    // Adiciona o card ao conteiner
    cardContainer.appendChild(card);
}

// Função para exibir os cards com base na pesquisa
function exibirCards() {
    // Obtém o termo de busca
    const termoDePesquisa = barraDePesquisa.value;

    // Verifica se algo foi digitado antes de realizar a busca
    if (termoDePesquisa.trim() !== "") {
        // Limpa o conteúdo atual do container de cards
        cardContainer.innerHTML = "";

        // Filtra os itens com base no termo de busca e adiciona os cards correspondentes
        items.filter((item) =>
            item.titulo.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
            item.autor.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
            item.anoPublicado.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
            item.genero.toLowerCase().includes(termoDePesquisa.toLowerCase())
        )
        .forEach((item) => criarCard(item));

    } else {
        // Limpa o conteúdo se a barra de pesquisa estiver vazia
        cardContainer.innerHTML = "";
    }
}