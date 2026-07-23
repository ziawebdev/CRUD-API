const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tasks.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            done INTEGER NOT NULL
        )
    `);

    db.get(
        "SELECT COUNT(*) AS count FROM tasks",
        [],
        (err, row) => {

            if (row.count === 0) {

                db.run(
                    "INSERT INTO tasks(title, done) VALUES (?, ?)",
                    ["Learn Express", 0]
                );

                db.run(
                    "INSERT INTO tasks(title, done) VALUES (?, ?)",
                    ["Build CRUD API", 0]
                );

                db.run(
                    "INSERT INTO tasks(title, done) VALUES (?, ?)",
                    ["Push project to GitHub", 1]
                );

            }

        }
    );

});

module.exports = db;