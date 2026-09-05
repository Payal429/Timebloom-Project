const sqlite3 = require("sqlite3").verbose();
const path = require("path");


/* =========================================================
   DATABASE
========================================================= */

const databasePath =
    path.join(
        __dirname,
        "timebloom.db"
    );


const db =
    new sqlite3.Database(
        databasePath,
        (error) => {

            if (error) {

                console.error(
                    "Database connection failed:",
                    error.message
                );

                return;
            }

            console.log(
                "TIMEBLOOM SQLite database connected."
            );
        }
    );


/* =========================================================
   CREATE TABLES
========================================================= */

db.serialize(() => {

    /* =====================================================
       USERS
    ===================================================== */

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);


    /* =====================================================
       MEMORIES

       This creates the table for a brand-new database.
    ===================================================== */

    db.run(`
        CREATE TABLE IF NOT EXISTS memories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            flower_id TEXT,
            flower_name TEXT NOT NULL,
            flower_image TEXT,
            title TEXT NOT NULL,
            memory_text TEXT NOT NULL,
            memory_date TEXT NOT NULL,
            mood TEXT,
            flower_fact TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id)
                REFERENCES users(id)
        )
    `);


    /* =====================================================
       MIGRATE EXISTING DATABASE

       SQLite does NOT update an existing table when the
       CREATE TABLE statement changes.

       Therefore we check which columns already exist
       and add only the missing ones.
    ===================================================== */

    db.all(
        `PRAGMA table_info(memories)`,
        (error, columns) => {

            if (error) {

                console.error(
                    "Could not inspect memories table:",
                    error.message
                );

                return;
            }


            const existingColumns =
                columns.map(
                    column => column.name
                );


            const migrations = [

                {
                    name: "user_id",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN user_id INTEGER
                    `
                },

                {
                    name: "flower_id",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN flower_id TEXT
                    `
                },

                {
                    name: "flower_name",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN flower_name TEXT
                    `
                },

                {
                    name: "flower_image",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN flower_image TEXT
                    `
                },

                {
                    name: "title",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN title TEXT
                    `
                },

                {
                    name: "memory_text",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN memory_text TEXT
                    `
                },

                {
                    name: "memory_date",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN memory_date TEXT
                    `
                },

                {
                    name: "mood",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN mood TEXT
                    `
                },

                {
                    name: "flower_fact",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN flower_fact TEXT
                    `
                },

                {
                    name: "created_at",
                    sql: `
                        ALTER TABLE memories
                        ADD COLUMN created_at
                        DATETIME
                        DEFAULT CURRENT_TIMESTAMP
                    `
                }

            ];


            migrations.forEach(
                migration => {

                    if (
                        !existingColumns.includes(
                            migration.name
                        )
                    ) {

                        db.run(
                            migration.sql,
                            (migrationError) => {

                                if (migrationError) {

                                    console.error(
                                        `Could not add ${migration.name}:`,
                                        migrationError.message
                                    );

                                } else {

                                    console.log(
                                        `Database migration: added ${migration.name}`
                                    );

                                }
                            }
                        );
                    }
                }
            );

        }
    );

});


/* =========================================================
   EXPORT DATABASE
========================================================= */

module.exports = db;