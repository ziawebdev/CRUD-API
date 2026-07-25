CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (title, done)
SELECT 'Learn Express', false
WHERE NOT EXISTS (SELECT 1 FROM tasks);

INSERT INTO tasks (title, done)
SELECT 'Build CRUD API', false
WHERE NOT EXISTS (
    SELECT 1 FROM tasks WHERE title='Build CRUD API'
);

INSERT INTO tasks (title, done)
SELECT 'Push project to GitHub', true
WHERE NOT EXISTS (
    SELECT 1 FROM tasks WHERE title='Push project to GitHub'
);