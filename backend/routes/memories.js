const express = require("express");

const router = express.Router();
const db = require("../database");


/* =========================================================
   SAVE A MEMORY
========================================================= */

router.post("/", (req, res) => {

    const {
        username,
        flowerId,
        flowerName,
        flowerImage,
        title,
        memoryText,
        memoryDate,
        mood,
        flowerFact
    } = req.body;


    if (
        !username ||
        !flowerName ||
        !title ||
        !memoryText ||
        !memoryDate
    ) {

        return res.status(400).json({
            success: false,
            message: "Please complete all required fields."
        });
    }


    db.get(
        `SELECT id FROM users WHERE username = ?`,
        [username],
        (error, user) => {

            if (error) {

                console.error(
                    "Memory user lookup error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error."
                });
            }


            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }


            /*
             * IMPORTANT:
             *
             * Your existing database has an older required
             * column called "memory".
             *
             * We save memoryText into BOTH:
             *
             *     memory
             *     memory_text
             *
             * This keeps the old database compatible with
             * the new TIMEBLOOM code.
             */

            db.run(
                `
                INSERT INTO memories
                (
                    user_id,
                    flower_id,
                    flower_name,
                    flower_image,
                    title,
                    memory,
                    memory_text,
                    memory_date,
                    mood,
                    flower_fact
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    user.id,
                    flowerId || "",
                    flowerName,
                    flowerImage || "",
                    title,
                    memoryText,
                    memoryText,
                    memoryDate,
                    mood || "",
                    flowerFact || ""
                ],
                function (error) {

                    if (error) {

                        console.error(
                            "Memory save error:",
                            error
                        );

                        return res.status(500).json({
                            success: false,
                            message: "Could not save memory."
                        });
                    }


                    console.log(
                        `Memory saved for ${username}: ${title}`
                    );


                    return res.status(201).json({

                        success: true,

                        message: "Memory planted.",

                        memory: {
                            id: this.lastID,
                            flower: flowerName,
                            title: title
                        }

                    });

                }
            );

        }
    );

});


/* =========================================================
   GET ALL MEMORIES FOR A USER
========================================================= */

router.get("/", (req, res) => {

    const username =
        String(
            req.query.username || ""
        ).trim();


    if (!username) {

        return res.status(400).json({
            success: false,
            message: "Username is required."
        });
    }


    db.all(
        `
        SELECT
            memories.id,
            memories.flower_id,
            memories.flower_name,
            memories.flower_image,
            memories.title,
            memories.memory_text,
            memories.memory_date,
            memories.mood,
            memories.flower_fact,
            memories.created_at

        FROM memories

        INNER JOIN users
            ON memories.user_id = users.id

        WHERE users.username = ?

        ORDER BY memories.created_at DESC
        `,
        [username],
        (error, memories) => {

            if (error) {

                console.error(
                    "Memory loading error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: "Could not load memories."
                });
            }


            return res.json({

                success: true,

                memories: memories || []

            });

        }
    );

});


/* =========================================================
   GET ONE MEMORY
========================================================= */

router.get("/:id", (req, res) => {

    const memoryId =
        req.params.id;


    const username =
        String(
            req.query.username || ""
        ).trim();


    if (!username) {

        return res.status(400).json({
            success: false,
            message: "Username is required."
        });
    }


    db.get(
        `
        SELECT
            memories.id,
            memories.flower_id,
            memories.flower_name,
            memories.flower_image,
            memories.title,
            memories.memory_text,
            memories.memory_date,
            memories.mood,
            memories.flower_fact,
            memories.created_at

        FROM memories

        INNER JOIN users
            ON memories.user_id = users.id

        WHERE
            memories.id = ?
            AND users.username = ?
        `,
        [
            memoryId,
            username
        ],
        (error, memory) => {

            if (error) {

                console.error(
                    "Single memory loading error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: "Could not load memory."
                });
            }


            if (!memory) {

                return res.status(404).json({
                    success: false,
                    message: "Memory not found."
                });
            }


            return res.json({

                success: true,

                memory: memory

            });

        }
    );

});


/* =========================================================
   EXPORT
========================================================= */

module.exports = router;