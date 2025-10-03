const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let posts = [
    { id: 1, titulo: "Primeiro post", conteudo: "Conteudo do primeiro post...", autor:"Carlos"},
    { id: 2, titulo: "Segundo post", conteudo: "Olá, mundo!", autor:"Ana"}
];
nextId = 3;

app.get("/posts",(req,res)=>{
    res.status(201).send(posts);
});

app.post("/posts", (req,res)=>{
    let { titulo } = req.body;
    let { conteudo } = req.body;
    let { autor } = req.body;

    if(titulo == ""){
       return res.status(400).send();
    }
    if(conteudo == ""){
       return res.status(400).send();
    }
    if(autor == ""){
       return res.status(400).send();
    }

    post = {id: nextId, titulo: titulo, conteudo: conteudo, autor: autor};
    nextId++;

    posts.push(post);
    res.status(201).send("Post adicionado com sucesso!");
});









app.listen(port, () => {
    console.log("O servidor está rodando em http://localhost:" + port);
});