const express = require('express');
const app = express();
const port = 3000;

const db = require('./db'); // Importa o pool de conexões que configuramos

app.use(express.json()); // Habilita o Express a ler JSON no corpo da requisição

app.get("/Usuarios", async (req,res) =>{
    try {
      const [rows] = await db.query('SELECT * FROM Usuarios');
    } catch (error) {
      console.error("Erro ao buscar Usuários", error);
      res.status(500).send('Erro interno do servidor ao buscar tarefas.');
    }
});

app.get("/Usuarios/:id", async (req,res) =>{
  const id =  parseInt(req.params.id);

 if(isNaN(id)){
  return res.status(400).send("ID inválido. O ID deve ser um número.");
 }

 try {
  const [rows] = await db.query('SELECT * FROM Usuarios WHERE id = ?',[id])
 } catch (error) {
  console.error("Erro ao buscar ID do Usuario", error);
  res.status(400).send("Erro interno do servidor ao buscar Usuários.");
 }

});

app.post("/Usuarios", async (req,res) =>{
  const {nome, email} = req.body;

  if(!nome){
    return res.status(400).send("O nome do usuários é obrigatório.");
  }

  try {
    const [result] = await db.query(
      'INSERT INTO Usuarios (nome, email) VALUES (?, ?)',
      [nome, email || null] 
    );
    const novoUsuario = {id: result.insertId, nome, email};
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao criar usuário",error);
    res.status(500).send("Erro interno do servidor ao criar usúario.");
  }
});

app.put("/Usuarios/:id", async (req, res) =>{
const id = parseInt(req.params.id);
const {nome, email} = req.body;

if(isNaN(id)){
  return res.status(400).send("ID inválido. O ID deve ser um número.");
}
if(!nome && email === undefined){
  return res.status(400).send("Pelo menos um campo (nome, email) deve ser fornecido para atualização.");
}

try {
  const [existingRows] = await db.query("SELECT * FROM Usuario WHERE id = ?", [id]);
  if(existingRows.length === 0){
    return res.status(400).send("Usuário não encontrado para a atualização.");
  }

  let updates = [];
  let params = [];
  if(nome !== undefined){
    updates.push('nome = ?');
    params.push(nome);
  }
  if(email !== undefined){
    updates.push('email = ?');
    params.push(email);
  }
  if(updates.length === 0){ 
    return res.status(400).send("Nenhum campo válido para atualização fornecido.");
  }

  const query = `UPDATE Usuarios SET ${updates.join(', ')} WHERE id = ?`;
  params.push(id);

  const [result] = await db.query(query, params);

  if(result.affectedRows > 0){
    const [updatesRows] = await db.query('SELECT * FROM Usuarios WHERE id = ?'[id]);
    res.json(updatesRows[0]);
  }else {
    res.status(404).send("Usuário não encontrado ou nenhum dado foi alterado.");
  }
} catch (error) {
  console.error(`Erro ao atualizar Usuário com ID ${id}:`,error);
  res.status(500).send("Erro interno do servidor ao atualizar Usuário.");
}
});

app.delete("/Usuarios", async (req, res) => {
  const id = parseInt(req.params.id);

  if(isNaN(id)){
    return res.status(400).send("ID inválido. O ID deve ser um número.");
  }

  try {
    const [result] = await db.query('DELETE FROM Usuarios WHERE id = ?', [id]);

    if(result.affectedRows > 0){
        res.status(204).send();
    } else {
        res.status(404).send("Usuário não encontrado para exclusão.");
    }
  } catch (error) {
    console.error(`Erro ao excluir Usuário com ID ${id}:`, error);
    res.status(500).send("Erro interno do servidor ao excluir Usuário.");
  }
});

app.delete('/dados_usuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('ID inválido. O ID deve ser um número.');
  }

  try {
    const [result] = await db.query('DELETE FROM dados_usuarios WHERE id = ?', [id]);

    if (result.affectedRows > 0) { // affectedRows indica quantas linhas foram afetadas
      res.status(204).send(); // Retorna status 204 (No Content) - sucesso sem corpo de resposta
    } else {
      res.status(404).send('Dados não encontrados para exclusão.');
    }
  } catch (error) {
    console.error(`Erro ao excluir dados com ID ${id}:`, error);
    res.status(500).send('Erro interno do servidor ao excluir dados.');
  }
});


// ... (Suas rotas virão aqui) ...

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });