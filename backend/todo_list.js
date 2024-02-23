const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


//Criação do array de armazenamento
let tasks = [];

let lastId = 1;
//Criação das funcionalidades da lista - API

//Listar todas as tarefas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

//Para adicionar uma tarefa
app.post("/task", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  
  if (!name) {
    return res.status(400).json("Please, insert a name.")
  }

  const task = { id: lastId, name, date: new Date(), checked: false }
  lastId++;
  tasks.push(task);
  res.status(200).json("Task created successfully.")
})

//Para acessar uma tarefa 
app.get("/task/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return res.status(400).json("Task not found.")
  }
  res.status(200).json(task)
})


//Para remover uma tarefa
app.delete("/task/:id", (req, res) => {
  const { id } = req.params;

  //Antes de deletar vamos fazer uma busca pela tarefa
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return res.status(400).json("Task not found.")
  }

  tasks = tasks.filter(task => task.id !== Number(id));
  res.status(200).json(task)
})

//Para editar uma tarefa 
app.put("/task/:id", (req, res) => {
  const { id } = req.params;
  const { name, checked } = req.body;

  //Antes de editar vamos fazer uma busca pela tarefa
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return res.status(400).json("Task not found.")
  }

  tasks = tasks.map(task => {
    if (task.id === Number(id)) {
      task.name = name || task.name; // Aqui ele altera ou nao o nome da tarefa
      if (typeof checked !== 'undefined') {
        task.checked = checked;
      }
      console.log(checked)
    }
    return task;
  })

  res.status(200).json("Task updated successfully");

})






app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});


