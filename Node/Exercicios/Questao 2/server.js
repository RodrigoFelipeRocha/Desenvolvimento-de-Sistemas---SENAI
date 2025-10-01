const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const produtos = [
    {id: 1, nome: "Teclado", preco: 250.00,emEstoque: true},
    {id: 2, nome: "Mouse", preco: 200.00,emEstoque: false},
    {id: 3, nome: "Monitor", preco: 700.00,emEstoque: true},
];

// let nextId = 3;

//Mostrando produtos que possuem estoque
app.get("/produtos", (req,res) =>{
    if(produtos.emEstoque === true){
       res.send(produtos);
    }
    res.status(200).send("Produto temporariamente fora de estoque");
});

//Procurando pelo nome
app.get("/produtos/nome", (req,res)=>{
    const nome = (req.body.nome);
    console.log("oi");
    const produto = produtos.find(p => p.nome == nome);

    if(!produto){
        res.status(404).send("Produto não encontrado");
    }
    res.status(200).send(produto);
});

app.patch("/produtos/:id", (req,res) =>{
    const id = parseInt(req.params.id);
    const produto = findIndex(p => p.id == id);

    if(!produto){
        res.status(404).send("Produto não encontrado!");
    }
    const novoPreco = req.body.preco;

    produto.preco = novoPreco;
    res.status(200).send("Preço atualizado com sucesso");
    

    

});










app.listen(port, () => {
    console.log("O servidor está rodando em http://localhost:" + port);
});