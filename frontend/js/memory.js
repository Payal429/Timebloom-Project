/* =========================================================
   TIMEBLOOM — MEMORY PAGE

   Loads the selected memory from SQLite
   and displays it on the growing flower page.
========================================================= */


/* =========================================================
   LOGIN CHECK
========================================================= */

const username =
    localStorage.getItem(
        "timebloom_current"
    );

if (!username) {

    window.location.href =
        "login.html";

    throw new Error(
        "User is not logged in."
    );
}


/* =========================================================
   GET MEMORY ID FROM URL
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const memoryId =
    params.get("id");


if (!memoryId) {

    window.location.href =
        "garden.html";

    throw new Error(
        "No memory ID was provided."
    );
}


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const memoryFlower =
    document.getElementById(
        "memoryFlower"
    );

const memoryTitle =
    document.getElementById(
        "memoryTitle"
    );

const memoryCopy =
    document.getElementById(
        "memoryCopy"
    );

const memoryDate =
    document.getElementById(
        "memoryDate"
    );

const memoryMood =
    document.getElementById(
        "memoryMood"
    );

const memoryFact =
    document.getElementById(
        "memoryFact"
    );


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(value) {

    if (!value) {
        return "";
    }


    /*
     * memory_date is stored as:
     *
     * YYYY-MM-DD
     *
     * Adding T00:00:00 prevents
     * timezone shifting the displayed day.
     */

    const date =
        new Date(
            `${value}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;
    }


    return date.toLocaleDateString(
        "en-ZA",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}


/* =========================================================
   CAPITALIZE
========================================================= */

function capitalize(value) {

    if (!value) {
        return "";
    }


    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );
}


/* =========================================================
   LOAD MEMORY FROM DATABASE
========================================================= */

async function loadMemory() {

    try {

        const response =
            await fetch(
                `/api/memories/${encodeURIComponent(
                    memoryId
                )}?username=${encodeURIComponent(
                    username
                )}`,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        /* -----------------------------------------
           CHECK RESPONSE TYPE
        ----------------------------------------- */

        const contentType =
            response.headers.get(
                "content-type"
            ) || "";


        let data;


        if (
            contentType.includes(
                "application/json"
            )
        ) {

            data =
                await response.json();

        } else {

            const serverResponse =
                await response.text();


            console.error(
                "Server returned non-JSON response:",
                serverResponse
            );


            throw new Error(
                `The server returned an invalid response (${response.status}).`
            );
        }


        /* -----------------------------------------
           CHECK HTTP ERROR
        ----------------------------------------- */

        if (!response.ok) {

            throw new Error(
                data.message ||
                data.error ||
                "Memory could not be found."
            );
        }


        /* -----------------------------------------
           CHECK MEMORY
        ----------------------------------------- */

        if (
            !data.memory
        ) {

            throw new Error(
                "No memory was returned by the server."
            );
        }


        const memory =
            data.memory;


        /* -----------------------------------------
           FLOWER
        ----------------------------------------- */

        if (memoryFlower) {

            memoryFlower.textContent =
                `✦ ${memory.flower_name || "Flower"} · A MEMORY`;
        }


        /* -----------------------------------------
           TITLE
        ----------------------------------------- */

        if (memoryTitle) {

            memoryTitle.textContent =
                memory.title ||
                "Untitled memory";
        }


        /* -----------------------------------------
           MEMORY TEXT
        ----------------------------------------- */

        if (memoryCopy) {

            memoryCopy.textContent =
                memory.memory_text ||
                "";
        }


        /* -----------------------------------------
           DATE
        ----------------------------------------- */

        if (memoryDate) {

            memoryDate.textContent =
                formatDate(
                    memory.memory_date
                );
        }


        /* -----------------------------------------
           MOOD
        ----------------------------------------- */

        if (memoryMood) {

            memoryMood.textContent =
                capitalize(
                    memory.mood ||
                    "Peaceful"
                );
        }


        /* -----------------------------------------
           FLOWER FACT
        ----------------------------------------- */

        if (memoryFact) {

            memoryFact.textContent =
                memory.flower_fact ||
                "A flower chosen for your memory.";
        }


        /*
         * Return the memory so the
         * flower animation can use it
         * if needed later.
         */

        return memory;

    } catch (error) {

        console.error(
            "Memory loading error:",
            error
        );


        if (memoryFlower) {

            memoryFlower.textContent =
                "YOUR MEMORY";
        }


        if (memoryTitle) {

            memoryTitle.textContent =
                "Memory not found";
        }


        if (memoryCopy) {

            memoryCopy.textContent =
                error.message ||
                "This memory could not be loaded.";
        }


        throw error;
    }
}


/* =========================================================
   THREE.JS FLOWER
========================================================= */

const canvas =
    document.getElementById(
        "flowerCanvas"
    );


/*
 * Keep the existing Three.js
 * growing-flower functionality.
 *
 * If your current memory.js already
 * contains the Three.js flower code,
 * keep that code below this section.
 */


/* =========================================================
   START MEMORY
========================================================= */

loadMemory();
