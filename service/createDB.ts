// service/createDB.ts
import sqlite3 from 'sqlite3'
import app from "../index"

export const db: sqlite3.Database = new sqlite3.Database("user_database.db", (err) => {
    if (err) {
        app.log.error("Could not connect to the database", err)
        throw err
    }
    else
    {
        app.log.info("Connected to the database")
        db.run(`CREATE TABLE IF NOT EXISTS user_registration(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phoneNumber TEXT NOT NULL,
            start TEXT NOT NULL,
            end TEXT NOT NULL,
            uuid TEXT NOT NULL
        )`, (err) =>{
            if (err){
                app.log.error("ERROR", err);
            } else {
                app.log.info("user_registration created");
            }
        });

    }

});

