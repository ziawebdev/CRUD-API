const express = require('express');
const db = require("./database");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/auth");
const authenticate = require("./middleware/auth");
const swaggerDocument = require("./openapi.json");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"]
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.get("/tasks" , authenticate, async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id");

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


app.get("/tasks/:id", authenticate, async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await db.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});


app.post("/tasks", authenticate, async (req, res) => {

    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    try {

        const result = await db.query(
            "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
            [title.trim(), false]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});



app.put("/tasks/:id", authenticate, async (req, res) => {

    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    try {

        const existing = await db.query(
            "SELECT * FROM tasks WHERE id=$1",
            [id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        const task = existing.rows[0];

        const updatedTitle =
            title !== undefined ? title.trim() : task.title;

        const updatedDone =
            done !== undefined ? done : task.done;

        const result = await db.query(
            `UPDATE tasks
             SET title=$1, done=$2
             WHERE id=$3
             RETURNING *`,
            [updatedTitle, updatedDone, id]
        );

        res.json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});


app.delete("/tasks/:id", authenticate,   async (req, res) => {

    const id = parseInt(req.params.id);

    try {

        const result = await db.query(
            "DELETE FROM tasks WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.status(204).send();

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




