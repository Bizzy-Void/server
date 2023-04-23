const express = require('express');
const app = express();
const db = require("./db_config");

// require cors
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// Routes

// create a new todo
app.post("/todos", async (req, res) => {
    try{
        // request data from body
        const { description } = req.body;

        // create a new todo
        const createNewTodo = await db.query("INSERT INTO todos (description) VALUES($1) RETURNING *", [description]);

        // response
        res.json(createNewTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

// get all todos
app.get("/todos", async (req, res) => {
    try {
        // retrieve all todos
        const retrieveAllTodos = await db.query("SELECT * FROM todos");

        // response
        res.json(retrieveAllTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a specific todo
app.get("/todos/:id", async (req, res) => {
    try {
        // request data from params
        const { id } = req.params;

        // retrieve a specific todo
        const retrieveTodo = await db.query("SELECT * FROM todos WHERE todo_id = $1", [id]);

        // response
        res.json(retrieveTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

// update a todo
// for commit
app.put("/todos/:id", async (req, res) => {
    try {
        // request params
        const { id } = req.params;
        //  request data from body
        const { description } = req.body;

        // update a todo
        const updateTodo = await db.query("UPDATE todos SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        // specify id to delete from params
        const { id } = req.params;

        // delete a todo
        const deleteTodo = await db.query("DELETE FROM todos WHERE todo_id = $1", [id]);

        // response
        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// listen on port 4000
app.listen(4000, () => {
    console.log('Listening on port 4000');
})