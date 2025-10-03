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
app.get("/produtos/", (req,res) =>{
    let emEstoque = produtos.filter(p => p.emEstoque === true);
    res.status(200).send(emEstoque);
 
});

//Procurando pelo nome
app.get("/produtos/:nome", (req,res)=>{
    const nome = (req.params.nome);
    const produto = produtos.find(p => p.nome == nome);

    if(!produto){
        res.status(404).send("Produto não encontrado");
    }
    res.status(200).send(produto);
});

// Alterando o preco do produto
app.patch("/produtos/:id", (req,res) =>{
    const id = parseInt(req.params.id);
    let index = produtos.findIndex(p => p.id == id);

    if(!index){
        res.status(404).send("Produto não encontrado!");
    }
    let novoPreco = req.body.preco;
    produtos[index].preco = novoPreco;
    
    res.status(200).send("Preço atualizado com sucesso para " + novoPreco);
    
});

app.put("/produtos/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    let index = produtos.findIndex(p => p.id == id);

});









app.listen(port, () => {
    console.log("O servidor está rodando em http://localhost:" + port);
});