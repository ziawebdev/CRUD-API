const express = require('express');
const db = require("./database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const app = express();
const port = 3000;

app.use(express.json());



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

app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        const tasks = rows.map(task => ({
            id: task.id,
            title: task.title,
            done: Boolean(task.done)
        }));

        res.json(tasks);

    });
});

app.get("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }

            res.json({
                id: row.id,
                title: row.title,
                done: Boolean(row.done)
            });

        }
    );

});


app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    db.run(
        "INSERT INTO tasks (title, done) VALUES (?, ?)",
        [title.trim(), 0],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                title: title.trim(),
                done: false
            });

        }
    );

});



app.put("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    if (
        (title === undefined && done === undefined) ||
        (title !== undefined && title.trim() === "") ||
        (done !== undefined && typeof done !== "boolean")
    ) {
        return res.status(400).json({
            error: "Invalid request body"
        });
    }

    db.get(
        "SELECT * FROM tasks WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }

            const updatedTitle = title !== undefined ? title.trim() : row.title;
            const updatedDone = done !== undefined ? (done ? 1 : 0) : row.done;

            db.run(
                "UPDATE tasks SET title = ?, done = ? WHERE id = ?",
                [updatedTitle, updatedDone, id],
                function (err) {

                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    res.json({
                        id,
                        title: updatedTitle,
                        done: Boolean(updatedDone)
                    });

                }
            );

        }
    );

});


app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    db.run(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: `Task ${id} not found`
                });
            }

            res.status(204).send();

        }
    );

});


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




