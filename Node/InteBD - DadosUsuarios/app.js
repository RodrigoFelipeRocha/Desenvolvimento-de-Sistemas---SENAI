
const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json()); 

app.get('/dados_usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id); 
  
    if (isNaN(id)) {
      return res.status(400).send('ID inválido. O ID deve ser um número.');
    }
  
    try {
      const [rows] = await db.query('SELECT * FROM dados_usuarios WHERE id = ?', [id]);
  
      if (rows.length > 0) {
        res.json(rows[0]); 
      } else {
        res.status(404).send('Dados não encontrada.');
      }
    } catch (error) {
      console.error(`Erro ao buscar dados com ID ${id}:`, error);
      res.status(500).send('Erro interno do servidor ao buscar dados.');
    }
  });

  app.post('/dados_usuarios', async (req, res) => {
    const { idUsuario, biografia, url_Foto, data_nascimento, telefone } = req.body;
  
    if (!idUsuario) {
      return res.status(400).send('O idUsuario é obrigatório.');
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO dados_usuarios (idUsuario, biografia, url_Foto, data_nascimento, telefone ) VALUES (?, ?, ?, ?, ?)',
        [idUsuario, biografia || null, url_Foto || null, data_nascimento || null, telefone || null] // Usamos null para descrição se não for fornecida, e false para concluida
      )
      const novosDados = { id: result.insertId, idUsuario, biografia, url_Foto, data_nascimento, telefone };
      res.status(201).json(novosDados);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).send('Erro interno do servidor ao criar tarefa.');
    }
  });

  app.put("/dados_usuarios/:id", async (req, res) =>{
    const id = parseInt(req.params.id);
    const {idUsuario, biografia, url_Foto, data_nascimento, telefone } = req.body;
    
    if(isNaN(id)){
      return res.status(400).send("ID inválido. O ID deve ser um número.");
    }
    if(!idUsuario=== undefined){
      return res.status(400).send("idUsuario = ?");
    }
    if(!biografia=== undefined){
      return res.status(400).send("biografia = ?");
    }
    if(!url_Foto=== undefined){
      return res.status(400).send("url_Foto = ?");
    }
    if(!data_nascimento=== undefined){
      return res.status(400).send("data_nascimento = ?");
    }
    if(!telefone=== undefined){
      return res.status(400).send("telefone = ?");
    }
    
    try {
      const [existingRows] = await db.query("SELECT * FROM dados_usuarios WHERE id = ?", [id]);
      if(existingRows.length === 0){
        return res.status(400).send("Usuário não encontrado para a atualização.");
      }
    
      let updates = [];
      let params = [];
      if(biografia !== undefined){
        updates.push('biografia = ?');
        params.push(biografia);
      }
      if(url_Foto !== undefined){
        updates.push('url_Foto = ?');
        params.push(url_Foto);
      }
      if(data_nascimento !== undefined){
        updates.push('data_nascimento = ?');
        params.push(data_nascimento);
      }
      if(telefone !== undefined){
        updates.push('telefone = ?');
        params.push(telefone);
      }
      if(updates.length === 0){ 
        return res.status(400).send("Nenhum campo válido para atualização fornecido.");
      }
    
      const query = `UPDATE dados_usuarios SET ${updates.join(', ')} WHERE id = ?`;
      params.push(id);
    
      const [result] = await db.query(query, params);
    
      if(result.affectedRows > 0){
        const [updatesRows] = await db.query('SELECT * FROM dados_usuarios WHERE id = ?'[id]);
        res.json(updatesRows[0]);
      }else {
        res.status(404).send("Dados não encontrado ou nenhum dado foi alterado.");
      }
    } catch (error) {
      console.error(`Erro ao atualizar Dados com ID ${id}:`,error);
      res.status(500).send("Erro interno do servidor ao atualizar Dados.");
    }
    });
    
    






// ... (Suas rotas virão aqui) ...

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });