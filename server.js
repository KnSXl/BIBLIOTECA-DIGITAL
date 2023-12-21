// Função para salvar dados no arquivo JSON
function salvarDados() {
    fs.writeFileSync(__dirname + '/banco.json', JSON.stringify(banco, null,  2))
}

// Inicia o servidor na porta 3000
const express = require('express');
const server = express('');
const banco = require('./banco.json');
const fs = require('fs');
const { json } = require('body-parser');
const { log } = require('console');

server.use(express.json());

// Rota raiz
server.get('/', (req, res) => {
    return res.json({mensagem: "Nossa Api está funcionando"})
});
server.listen(3000, () => {
    console.log("server está funcionando")
});

//LIVROS:

//gets === consumir APIS / Rota para obter todos os livros
server.get('/livros', (req, res) => {
    return res.json(banco.Livros)
})

//gets === consumir APIS / Rota para obter todos os livros
server.get('/livros/pesquisa', (req, res) => {
    return res.json(banco.Livros)
})

// Rota para consultar livros por variável
server.get('/livros/pesquisa/:variavel', (req, res) => {
    const variaveisLivro = req.params.variavel.toLowerCase();
    const livrosTitulo = banco.Livros.filter(Livros => Livros.titulo.toLowerCase() === variaveisLivro);
    const livrosAutor = banco.Livros.filter(Livros => Livros.autor.toLowerCase() === variaveisLivro);
    const livrosAnoPublicado = banco.Livros.filter(Livros => Livros.anoPublicado.toString().toLowerCase() === variaveisLivro);
    const livrosGenero = banco.Livros.filter(Livros => Livros.genero.toLowerCase() === variaveisLivro);

    if (livrosTitulo.length > 0) {
        res.json(livrosTitulo);

    }
    else if (livrosAutor.length > 0) {
        res.json(livrosAutor);

    }
    else if (livrosAnoPublicado.length > 0) {
        res.json(livrosAnoPublicado);

    }
    else if (livrosGenero.length > 0) {
        res.json(livrosGenero);

    }
    else {
        res.status(404).json({ mensagem: "livro não encontrado."}); 
    }
});



// Rota para consultar livros ordenação
server.get('/livros/ordenar/:variavel', (req, res) => {
    var variaveisLivro = req.params.variavel.toLowerCase();
    variaveisLivro = variaveisLivro.toLowerCase();
    var livrosOrdenados = [];

    switch (variaveisLivro) {
        case "titulo":
            livrosOrdenados = banco.Livros.sort((a, b) => a.titulo.localeCompare(b.titulo));
            res.json(livrosOrdenados);
        break;

        case "autor":
            livrosOrdenados = banco.Livros.sort((a, b) => a.autor.localeCompare(b.autor));
            res.json(livrosOrdenados);
        break;

        case "ano":
            livrosOrdenados = banco.Livros.sort((a, b) => a.anoPublicado.localeCompare(b.anoPublicado));
            res.json(livrosOrdenados);
        break;

        case "genero":
            livrosOrdenados = banco.Livros.sort((a, b) => a.genero.localeCompare(b.genero));
            res.json(livrosOrdenados);
        break;
        
        case "id":
            res.json(banco.Livros);
        break;
    
        default:
            res.json("erro errado");
            break;
    }
});


//post === salvar/inserir dados no JSON / Rota para adicionar um novo livro
server.post('/livros', (req, res) => {
    const novoLivros = req.body

    if (!novoLivros.id || !novoLivros.titulo || !novoLivros.autor || !novoLivros.anoPublicado || !novoLivros.genero) {
        return res.status(400).json({mensagem: "Informações incompletas."})
    } else {
        banco.Livros.push(novoLivros)
        salvarDados(banco)
        return res.status(201).json({mensagem: "Livro cadastrado com sucesso.",})
    }
})



//EDITORES DO JSON:
//put === updade de dados / Rota para atualizar um livro existente
server.put('/livros/:id', (req, res) => {
    const livrosId = parseInt(req.params.id)
    const atualizaLivros = req.body
    const idLivros = banco.Livros.findIndex(Livros => Livros.id === livrosId)

    if (idLivros === -1) {
        return res.status(404).json({mensagem: "Erro na alteração do livro."})

    } else {
        //Atualiza ou não o título do livro:
        banco.Livros[idLivros].titulo = atualizaLivros.titulo || banco.Livros[idLivros].titulo

        //Atualiza ou não o autor do livro:
        banco.Livros[idLivros].autor = atualizaLivros.autor || banco.Livros[idLivros].autor

        //Atualiza ou não o ano publicado do livro:
        banco.Livros[idLivros].anoPublicado = atualizaLivros.anoPublicado || banco.Livros[idLivros].anoPublicado

        //Atualiza ou não o genêro do livro:
        banco.Livros[idLivros].genero = atualizaLivros.genero || banco.Livros[idLivros].genero

        salvarDados(banco)

        return res.json({mensagem: "Livro atualizado com sucesso.", Livros: banco.Livros[idLivros] })
    }
})



//delete === para deletar um JSON / Rota para excluir um livro
server.delete('/livros/:id', (req, res) => {
    const livrosId = parseInt(req.params.id)

    banco.Livros = banco.Livros.filter(Livros => Livros.id !== livrosId)
    salvarDados(banco)

    return res.status(200).json({mensagem: "Livro excluido com sucesso"})
})