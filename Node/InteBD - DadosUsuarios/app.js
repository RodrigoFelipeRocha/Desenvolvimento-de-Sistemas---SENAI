
const express = require('express');
const app = express();
const port = 3000;

const db = require('./db'); // Importa o pool de conexões que configuramos

app.use(express.json()); // Habilita o Express a ler JSON no corpo da requisição



// ... (Suas rotas virão aqui) ...

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });