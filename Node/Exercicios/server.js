const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tarefas = [
    //Objetos no formato JSON
    {id: 1, nome: "Estudar", concluida: false},
    {id: 2, nome: "Fazer exercicios", concluida: false}
    
];
let nextId = 3;

// Inicializar com texto
app.get("/", (req, res) =>{
    res.send("Salve salve");
});

// Puxar todas as tarefas
app.get("/tarefas", (req,res)=>{
    res.send(tarefas);
});

// Selecionar tarefa especifica
app.get("/tarefas/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(u => u.id == id);

    if(!tarefa){
        res.status(404).send("Tarefa não encontrada!");
    }
    res.status(200).send(tarefa);
});

// Adicionar Tarefa
app.post("/tarefas", (req,res) =>{
    let novaTarefa = req.body;
    if(!novaTarefa.nome){
        res.status(400).send("É necessário preencher o nome da Tarefa!");
    }

    novaTarefa.id = nextId;
    nextId++;

    tarefas.push(novaTarefa);

    res.status(201).send(novaTarefa);
});

// Atualizar Dados da Tarefa
app.put("/tarefas/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    let novosDadosTarefa = req.body; 

    if(!novosDadosTarefa.nome){
        res.status(400).send("É necessário preencher o nome da Tarefa!");
    }
    novosDadosTarefa.id = id;
    const index = tarefas.findIndex( u => u.id == id)

    if(index == -1){
        res.status(404).send("Usuário não encontrado!");
    }
    tarefas[index] = novosDadosTarefa;
    //res.status(204).send();
    res.status(200).send("Usuário atualizado com sucesso!");
});

app.delete("/tarefas/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(u => u.id == id)

    if(index == -1){
        res.status(404).send("Usuário não encontrado!");
    }
    
    tarefas.splice[index,1];
    // res.status(204).send("");
    res.status(200).send("Usuário deletado com sucesso!");
    
});


app.listen(port,() => {
    console.log("O servidor está rodando em http://localhost:"+ port);
});