require("dotenv").config();

const express =
    require("express");

const path =
    require("path");


/* =========================================================
   DATABASE
========================================================= */

require("./database");


/* =========================================================
   ROUTES
========================================================= */

const plantsRouter =
    require("./routes/plants");

const authRouter =
    require("./routes/auth");

const memoriesRouter =
    require("./routes/memories");


/* =========================================================
   APP
========================================================= */

const app =
    express();


/* =========================================================
   CONFIG
========================================================= */

const PORT =
    process.env.PORT || 3000;


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
    express.json()
);


/* =========================================================
   API ROUTES
========================================================= */

app.use(
    "/api/plants",
    plantsRouter
);

app.use(
    "/api/auth",
    authRouter
);

app.use(
    "/api/memories",
    memoriesRouter
);


/* =========================================================
   FRONTEND
========================================================= */

const frontendPath =
    path.join(
        __dirname,
        "..",
        "frontend"
    );


app.use(
    express.static(
        frontendPath
    )
);


/* =========================================================
   DEFAULT ROUTE
========================================================= */

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                frontendPath,
                "html",
                "index.html"
            )
        );

    }
);


/* =========================================================
   SERVER
========================================================= */

app.listen(
    PORT,
    () => {

        console.log(
            `TIMEBLOOM server running on port ${PORT}`
        );

        console.log(
            `http://localhost:${PORT}`
        );

    }
);
