const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tarefas = [
    //Objetos no formato JSON
    { id: 1, nome: "Estudar", concluida: false },
    { id: 2, nome: "Fazer exercicios", concluida: false }

];
let nextId = 3;

// Inicializar com texto
app.get("/", (req, res) => {
    res.send("Salve salve");
});

// Puxar todas as tarefas
app.get("/tarefas", (req, res) => {
    res.send(tarefas);
});

// Selecionar tarefa especifica
app.get("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id == id);

    if (!tarefa) {
        res.status(404).send("Tarefa não encontrada!");
    }
    res.status(200).send(tarefa);
});

// Adicionar Tarefa ( MEU POST)
// app.post("/tarefas", (req,res) =>{
//     let novaTarefa = req.body;
//     if(!novaTarefa.nome){
//         res.status(400).send("É necessário preencher o nome da Tarefa!");
//     }

//     novaTarefa.id = nextId;
//     nextId++;

//     tarefas.push(novaTarefa);

//     res.status(201).send(novaTarefa);
// });

// Post do Prof

app.post("/tarefas", (req, res) => {
    let { nome } = req.body;

    let tarefa = { id: nextId, nome: nome, concluida: false };
    nextId++;

    tarefas.push(tarefa);
    res.status(201).send(tarefa);
});

// Atualizar Dados da Tarefa
//Pode ser usada para validar tarefas
app.put("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let novosDadosTarefa = req.body;

    if (!novosDadosTarefa.nome) {
        res.status(400).send("É necessário preencher o nome da Tarefa!");
    }
    novosDadosTarefa.id = id;
    // t - Corresponde a uma iteração dos itens da lista
    // t.id - E o id de cada tarefa
    // id - variavel id recebida na requisição
    //verificando cada tarefa ate acharcom o mesmo id, achar o id correspondente
    const index = tarefas.findIndex(t => t.id == id)

    if (index == -1) {
        res.status(404).send("Tarefa não encontrada!");
    }
    tarefas[index] = novosDadosTarefa;
    //204 OK sem dados
    //res.status(204).send();
    res.status(200).send("Tarefa atualizada com sucesso!");
});

    //Deletar tarefa
app.delete("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(t => t.id == id)

    if (index == -1) {
       return res.status(404).send("Tarefa não encontrada!");
    }
    tarefas.splice(index,1);
    // res.status(204).send("");
    res.status(200).send("Tafefa deletada com sucesso!");

});


app.listen(port, () => {
    console.log("O servidor está rodando em http://localhost:" + port);
});