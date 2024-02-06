// /app/index.js
const express = require('express');
const mysql = require('mysql');
const app = express();

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'nodedb'
});

connection.connect();

// Rota principal
app.get('/', (req, res) => {
  const name = 'Nome'; // Aqui você pode gerar nomes aleatoriamente ou receber como parâmetro

  // Insere o nome no banco de dados
  connection.query(`INSERT INTO people(name) VALUES('${name}')`, (err, result) => {
    if (err) throw err;

    // Recupera nomes do banco de dados
    connection.query('SELECT name FROM people', (err, results) => {
      if (err) throw err;

      res.send(`<h1>Full Cycle Rocks!</h1><ul>${results.map(row => `<li>${row.name}</li>`).join('')}</ul>`);
    });
  });
});

app.listen(3000, () => {
  console.log('Aplicação rodando na porta 3000');
});
