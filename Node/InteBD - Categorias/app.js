const express = require('express');
const app = express();
const port = 3000;

const db = require('./db'); // Importa o pool de conexões que configuramos

app.use(express.json()); // Habilita o Express a ler JSON no corpo da requisição

app.get("/Categorias", async (req, res) => {
try {
    const [rows] = await db.query("SELECT * FROM Categorias");
} catch (error) {
    console.error("Erro ao buscar Categorias",error);
    res.status(500).send("Erro interno do servidor ao buscar Categorias.");
}
});

app.get("Categorias/:id", async (req, res) =>{
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).send("ID inválido. O ID deve ser um número.");
    }
    try {
        const [rows] = await db.query("SELECT * FROM Categorias WHERE id = ?",[id]);
        if(rows.length > 0){
            res.json(rows[0]);
        } else {
            res.status(404).send("Categoria não encontrada");
        }
    } catch (error) {
        console.error(`Erro ao buscar Categoria com ID ${id}:`,error)
        res.status(500).send("Erro interno do servidor ao buscar Categoria.");
    }
});

app.post("/Categorias", async (req, res) =>{
    const {nome} = req.body;

    if(!nome){
        return res.status(400).send("O nome da categoria é obrigatório.");
    }

    try {
        const [result] = await db.query(
            "INSERT INTO Categorias (nome) VALUES (?)",
            [nome]
        );
        
        const novaCategoria = {id: result.insertId, nome};
        res.status(201).json(novaCategoria);
    } catch (error) {
        console.error('Erro ao criar Categoria:', error);
    res.status(500).send('Erro interno do servidor ao criar categoria.');
    }
});





// ... (Suas rotas virão aqui) ...

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });