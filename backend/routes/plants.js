const express = require("express");

const router = express.Router();


/* =========================================================
   GET PLANTS FROM PERENUAL
========================================================= */

router.get("/", async (req, res) => {

    try {

        const apiKey =
            process.env.PERENUAL_API_KEY;


        if (!apiKey) {

            return res.status(500).json({
                error:
                    "PERENUAL_API_KEY is missing from .env"
            });

        }


        const search =
            (req.query.q || "").trim();


        const url =
            new URL(
                "https://www.perenual.com/api/v2/species-list"
            );


        url.searchParams.set(
            "key",
            apiKey
        );

        url.searchParams.set(
            "page",
            "1"
        );


        if (search) {

            url.searchParams.set(
                "q",
                search
            );

        }


        const response =
            await fetch(url);


        const data =
            await response.json();


        console.log(
            "Perenual:",
            response.status
        );


        if (!response.ok) {

            return res.status(
                response.status
            ).json({

                error:
                    data.message ||
                    data.error ||
                    `Perenual returned ${response.status}`

            });

        }


        res.json(data);


    } catch (error) {

        console.error(
            "Perenual API error:",
            error
        );


        res.status(500).json({

            error:
                "Could not connect to Perenual."

        });

    }

});


module.exports = router;