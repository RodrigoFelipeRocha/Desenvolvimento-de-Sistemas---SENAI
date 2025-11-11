const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
// Busquei ajuda por fora pra atender um pouco mais desse CORS

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint para buscar posts da API pública
app.get("/api/posts", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const limitedData = data.slice(0, 20); 
    res.json(limitedData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados da API" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3000/`);
  //Roda com npx serve, tentei fazer de outra forma mas fiquei perdido, ai achei mais facil dessa maneira
});
