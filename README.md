# Biblioteca Virtual - APIS EM PRÁTICA

Este é um projeto simples de uma Biblioteca Virtual desenvolvido em HTML, CSS e JavaScript, utilizando o framework Bootstrap para o layout responsivo. O código inclui funcionalidades de pesquisa e exibição dinâmica de livros a partir de um banco de dados JSON.

## Estrutura do Projeto

### Arquivo HTML (index.html)

O arquivo HTML define a estrutura da página web e inclui os seguintes elementos:

- **Meta Tags e Links**: Configuração da codificação, viewport, ícone da página e inclusão do Bootstrap.
- **Barra de Navegação**: Uma barra de navegação fixa com um logotipo, título e um formulário de pesquisa.
- **Container de Cards**: Um contêiner que será preenchido dinamicamente com os cards de livros.

### Arquivos de Estilo (style.css)

O arquivo CSS contém estilos personalizados para a aplicação. Alguns estilos notáveis incluem a estilização da barra de pesquisa quando focada e um reset de estilos para todos os elementos.

### Arquivo de Script (script.js)

O arquivo JavaScript contém a lógica do aplicativo, incluindo:

- **Carregamento do Banco de Dados**: Utiliza a função `fetch` para carregar os dados do arquivo JSON (`banco.json`) e preencher o array de itens.
- **Manipulação do DOM**: Utiliza o DOM para interagir com os elementos HTML, como o contêiner de cards e a barra de pesquisa.
- **Criação de Cards**: A função `criarCard(item)` é responsável por criar dinamicamente os cards com base nos dados do livro.
- **Exibição de Cards**: A função `exibirCards()` filtra os livros com base no termo de pesquisa e exibe os cards correspondentes no contêiner.

## Como Usar

1. Abra o arquivo `index.html` em um navegador da web.
2. Utilize a barra de pesquisa para procurar livros por título, autor, ano de publicação ou gênero.
3. Pressione "Enter" na barra de pesquisa ou clique no botão "Confirmar" para exibir os resultados.

## Observações

- Certifique-se de ter uma conexão com a internet para carregar os recursos do Bootstrap.
- Os dados dos livros são carregados a partir do arquivo JSON (`banco.json`), certifique-se de ter o arquivo no mesmo diretório.
- Substitua o caminho da imagem (`imagem.src`) no método `criarCard(item)` pelo caminho real da imagem no seu objeto JSON.

Esperamos que este projeto seja útil como um exemplo prático de integração de tecnologias web para a criação de uma Biblioteca Virtual. Sinta-se à vontade para adaptar e expandir conforme necessário.
