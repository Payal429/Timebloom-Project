const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const db = require("../database");


/* =========================================================
   PASSWORD HASHING
========================================================= */

function hashPassword(password) {

    const salt =
        crypto.randomBytes(16).toString("hex");

    const hash =
        crypto
            .scryptSync(
                password,
                salt,
                64
            )
            .toString("hex");

    return `${salt}:${hash}`;
}


/* =========================================================
   CHECK PASSWORD
========================================================= */

function verifyPassword(
    password,
    storedPassword
) {

    const parts =
        storedPassword.split(":");

    if (parts.length !== 2) {
        return false;
    }

    const salt = parts[0];

    const storedHash = parts[1];

    const hash =
        crypto
            .scryptSync(
                password,
                salt,
                64
            )
            .toString("hex");

    return crypto.timingSafeEqual(
        Buffer.from(hash, "hex"),
        Buffer.from(storedHash, "hex")
    );
}


/* =========================================================
   REGISTER
========================================================= */

router.post(
    "/register",
    (req, res) => {

        const username =
            String(
                req.body.username || ""
            ).trim();

        const password =
            String(
                req.body.password || ""
            );


        /* -------------------------
           VALIDATION
        ------------------------- */

        if (!username || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Username and password are required."

            });
        }


        if (
            username.length < 2 ||
            username.length > 30
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Username must be between 2 and 30 characters."

            });
        }


        if (password.length < 4) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 4 characters."

            });
        }


        /* -------------------------
           CHECK USERNAME
        ------------------------- */

        db.get(
            `
            SELECT id
            FROM users
            WHERE username = ?
            `,
            [username],
            (error, user) => {

                if (error) {

                    console.error(
                        "Registration lookup error:",
                        error
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Database error."

                    });
                }


                if (user) {

                    return res.status(409).json({

                        success: false,

                        message:
                            "That username already exists."

                    });
                }


                /* -------------------------
                   CREATE USER
                ------------------------- */

                const hashedPassword =
                    hashPassword(password);


                db.run(
                    `
                    INSERT INTO users
                    (
                        username,
                        password
                    )
                    VALUES
                    (
                        ?,
                        ?
                    )
                    `,
                    [
                        username,
                        hashedPassword
                    ],
                    function (error) {

                        if (error) {

                            console.error(
                                "Registration error:",
                                error
                            );

                            return res.status(500).json({

                                success: false,

                                message:
                                    "Could not create your account."

                            });
                        }


                        console.log(
                            `New TIMEBLOOM user registered: ${username}`
                        );


                        return res.status(201).json({

                            success: true,

                            message:
                                "Your garden has been created.",

                            user: {

                                id: this.lastID,

                                username: username

                            }

                        });

                    }
                );

            }
        );

    }
);


/* =========================================================
   LOGIN
========================================================= */

router.post(
    "/login",
    (req, res) => {

        const username =
            String(
                req.body.username || ""
            ).trim();

        const password =
            String(
                req.body.password || ""
            );


        if (!username || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter your username and password."

            });
        }


        db.get(
            `
            SELECT
                id,
                username,
                password
            FROM users
            WHERE username = ?
            `,
            [username],
            (error, user) => {

                if (error) {

                    console.error(
                        "Login database error:",
                        error
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Database error."

                    });
                }


                if (!user) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "Incorrect username or password."

                    });
                }


                const passwordCorrect =
                    verifyPassword(
                        password,
                        user.password
                    );


                if (!passwordCorrect) {

                    return res.status(401).json({

                        success: false,

                        message:
                            "Incorrect username or password."

                    });
                }


                console.log(
                    `TIMEBLOOM login: ${username}`
                );


                return res.json({

                    success: true,

                    message:
                        "Welcome back to your garden.",

                    user: {

                        id: user.id,

                        username:
                            user.username

                    }

                });

            }
        );

    }
);


module.exports = router;