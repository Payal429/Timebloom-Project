/* =========================================================
   TIMEBLOOM — CREATE MEMORY

   Perenual flowers
   ↓
   Express API
   ↓
   Select flower
   ↓
   Save memory to SQLite
========================================================= */


/* =========================================================
   LOGIN CHECK
========================================================= */

const username =
    localStorage.getItem("timebloom_current");

if (!username) {

    window.location.href =
        "login.html";

    throw new Error(
        "User is not logged in."
    );
}


/* =========================================================
   ELEMENTS
========================================================= */

const flowerOptions =
    document.getElementById(
        "flowerOptions"
    );

const flowerSearch =
    document.getElementById(
        "flowerSearch"
    );

const flowerCount =
    document.getElementById(
        "flowerCount"
    );

const flowerLoading =
    document.getElementById(
        "flowerLoading"
    );

const flowerError =
    document.getElementById(
        "flowerError"
    );

const flowerErrorText =
    document.getElementById(
        "flowerErrorText"
    );

const retryFlowers =
    document.getElementById(
        "retryFlowers"
    );

const selectedFlower =
    document.getElementById(
        "selectedFlower"
    );

const selectedFlowerImage =
    document.getElementById(
        "selectedFlowerImage"
    );

const selectedFlowerSymbol =
    document.getElementById(
        "selectedFlowerSymbol"
    );

const selectedFlowerName =
    document.getElementById(
        "selectedFlowerName"
    );

const selectedFlowerMeaning =
    document.getElementById(
        "selectedFlowerMeaning"
    );

const selectedFlowerId =
    document.getElementById(
        "selectedFlowerId"
    );

const selectedFlowerNameHidden =
    document.getElementById(
        "selectedFlowerNameHidden"
    );

const memoryForm =
    document.getElementById(
        "memoryForm"
    );

const memoryTitle =
    document.getElementById(
        "memoryTitle"
    );

const memoryText =
    document.getElementById(
        "memoryText"
    );

const memoryDate =
    document.getElementById(
        "memoryDate"
    );

const memoryMood =
    document.getElementById(
        "memoryMood"
    );

const memoryCounter =
    document.getElementById(
        "memoryCounter"
    );

const apiStatus =
    document.getElementById(
        "apiStatus"
    );

const apiStatusText =
    document.getElementById(
        "apiStatusText"
    );

const submitMemory =
    document.getElementById(
        "submitMemory"
    );


/* =========================================================
   DATA
========================================================= */

let flowers = [];

let selectedPlant = null;


/* =========================================================
   DEFAULT DATE
========================================================= */

if (memoryDate) {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    memoryDate.value =
        `${year}-${month}-${day}`;
}


/* =========================================================
   LOADING STATE
========================================================= */

function showLoading(show) {

    if (!flowerLoading) {
        return;
    }

    flowerLoading.hidden =
        !show;

    if (
        show &&
        flowerError
    ) {

        flowerError.hidden =
            true;
    }
}


/* =========================================================
   ERROR STATE
========================================================= */

function showError(message) {

    if (flowerLoading) {

        flowerLoading.hidden =
            true;
    }

    if (flowerError) {

        flowerError.hidden =
            false;
    }

    if (flowerErrorText) {

        flowerErrorText.textContent =
            message ||
            "Unable to load flowers.";
    }
}


/* =========================================================
   LOAD FLOWERS FROM BACKEND
========================================================= */

async function loadFlowers(
    search = ""
) {

    showLoading(true);


    if (flowerOptions) {

        flowerOptions.innerHTML = `
            <option value="">
                Finding flowers...
            </option>
        `;
    }


    try {

        const url =
            search
                ? `/api/plants?q=${encodeURIComponent(search)}`
                : "/api/plants";


        const response =
            await fetch(
                url,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        const contentType =
            response.headers.get(
                "content-type"
            ) || "";


        /* -----------------------------------------
           SERVER ERROR
        ----------------------------------------- */

        if (!response.ok) {

            let message =
                `Flower API returned ${response.status}.`;


            if (
                contentType.includes(
                    "application/json"
                )
            ) {

                const errorData =
                    await response.json();

                message =
                    errorData.error ||
                    errorData.message ||
                    message;
            }


            throw new Error(
                message
            );
        }


        /* -----------------------------------------
           NON-JSON RESPONSE
        ----------------------------------------- */

        if (
            !contentType.includes(
                "application/json"
            )
        ) {

            const serverResponse =
                await response.text();

            console.error(
                "Expected JSON but received:",
                serverResponse
            );

            throw new Error(
                "The server returned a webpage instead of flower data. Make sure TIMEBLOOM is running with Node/Express."
            );
        }


        /* -----------------------------------------
           READ FLOWER DATA
        ----------------------------------------- */

        const result =
            await response.json();


        /*
         * Support both:
         *
         * [ ...flowers ]
         *
         * and
         *
         * { data: [ ...flowers ] }
         */

        if (
            Array.isArray(result)
        ) {

            flowers =
                result;

        } else if (
            Array.isArray(result.data)
        ) {

            flowers =
                result.data;

        } else {

            flowers =
                [];
        }


        showLoading(false);

        renderFlowers();

    } catch (error) {

        console.error(
            "Flower loading error:",
            error
        );


        showLoading(false);


        if (flowerOptions) {

            flowerOptions.innerHTML = `
                <option value="">
                    Unable to load flowers
                </option>
            `;
        }


        if (flowerCount) {

            flowerCount.textContent =
                "Unavailable";
        }


        showError(
            error.message
        );
    }
}


/* =========================================================
   RENDER FLOWERS
========================================================= */

function renderFlowers() {

    if (!flowerOptions) {
        return;
    }


    flowerOptions.innerHTML =
        "";


    if (!flowers.length) {

        flowerOptions.innerHTML = `
            <option value="">
                No flowers found
            </option>
        `;


        if (flowerCount) {

            flowerCount.textContent =
                "0 flowers";
        }

        return;
    }


    if (flowerCount) {

        flowerCount.textContent =
            `${flowers.length} flowers`;
    }


    const firstOption =
        document.createElement(
            "option"
        );

    firstOption.value =
        "";

    firstOption.textContent =
        "Select a flower...";

    flowerOptions.appendChild(
        firstOption
    );


    flowers.forEach(
        function (flower) {

            const option =
                document.createElement(
                    "option"
                );


            const id =
                flower.id ??
                flower.species_id ??
                "";


            const name =
                flower.common_name ||
                flower.scientific_name ||
                "Unnamed flower";


            option.value =
                String(id);

            option.textContent =
                name;


            flowerOptions.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   GET FLOWER IMAGE
========================================================= */

function getFlowerImage(
    flower
) {

    if (!flower) {
        return "";
    }


    if (flower.default_image) {

        if (
            typeof flower.default_image ===
            "string"
        ) {

            return flower.default_image;
        }


        return (
            flower.default_image.original_url ||
            flower.default_image.regular_url ||
            flower.default_image.small_url ||
            ""
        );
    }


    if (flower.image_url) {

        return flower.image_url;
    }


    if (flower.image) {

        return flower.image;
    }


    return "";
}


/* =========================================================
   GET FLOWER DESCRIPTION
========================================================= */

function getFlowerDescription(
    flower
) {

    if (!flower) {

        return (
            "A flower chosen for your memory."
        );
    }


    return (
        flower.description ||
        flower.watering ||
        (
            Array.isArray(
                flower.sunlight
            )
                ? flower.sunlight.join(", ")
                : ""
        ) ||
        "A flower chosen for your memory."
    );
}


/* =========================================================
   SELECT FLOWER
========================================================= */

function selectFlower(
    id
) {

    if (!id) {

        selectedPlant =
            null;


        if (selectedFlower) {

            selectedFlower.hidden =
                true;
        }


        if (selectedFlowerId) {

            selectedFlowerId.value =
                "";
        }


        if (
            selectedFlowerNameHidden
        ) {

            selectedFlowerNameHidden.value =
                "";
        }


        return;
    }


    selectedPlant =
        flowers.find(
            function (flower) {

                return String(
                    flower.id ??
                    flower.species_id ??
                    ""
                ) === String(id);

            }
        );


    if (!selectedPlant) {

        console.error(
            "Selected flower was not found:",
            id
        );

        return;
    }


    const name =
        selectedPlant.common_name ||
        selectedPlant.scientific_name ||
        "Your flower";


    const image =
        getFlowerImage(
            selectedPlant
        );


    const description =
        getFlowerDescription(
            selectedPlant
        );


    const flowerId =
        selectedPlant.id ??
        selectedPlant.species_id ??
        "";


    /* -----------------------------------------
       HIDDEN VALUES
    ----------------------------------------- */

    if (selectedFlowerId) {

        selectedFlowerId.value =
            flowerId;
    }


    if (
        selectedFlowerNameHidden
    ) {

        selectedFlowerNameHidden.value =
            name;
    }


    /* -----------------------------------------
       DISPLAY
    ----------------------------------------- */

    if (selectedFlowerName) {

        selectedFlowerName.textContent =
            name;
    }


    if (selectedFlowerMeaning) {

        selectedFlowerMeaning.textContent =
            description;
    }


    if (selectedFlowerSymbol) {

        selectedFlowerSymbol.textContent =
            "✦";
    }


    /* -----------------------------------------
       IMAGE
    ----------------------------------------- */

    if (
        selectedFlowerImage
    ) {

        if (image) {

            selectedFlowerImage.src =
                image;

            selectedFlowerImage.alt =
                name;

            selectedFlowerImage.style.display =
                "block";

        } else {

            selectedFlowerImage.removeAttribute(
                "src"
            );

            selectedFlowerImage.alt =
                "Flower image unavailable";
        }
    }


    if (selectedFlower) {

        selectedFlower.hidden =
            false;
    }
}


/* =========================================================
   FLOWER DROPDOWN
========================================================= */

if (flowerOptions) {

    flowerOptions.addEventListener(
        "change",
        function () {

            selectFlower(
                this.value
            );

        }
    );
}


/* =========================================================
   FLOWER SEARCH
========================================================= */

let searchTimer;


if (flowerSearch) {

    flowerSearch.addEventListener(
        "input",
        function () {

            clearTimeout(
                searchTimer
            );


            const search =
                this.value.trim();


            searchTimer =
                setTimeout(
                    function () {

                        loadFlowers(
                            search
                        );

                    },
                    500
                );
        }
    );
}


/* =========================================================
   RETRY FLOWERS
========================================================= */

if (retryFlowers) {

    retryFlowers.addEventListener(
        "click",
        function () {

            loadFlowers(
                flowerSearch
                    ? flowerSearch.value.trim()
                    : ""
            );

        }
    );
}


/* =========================================================
   MEMORY CHARACTER COUNTER
========================================================= */

if (
    memoryText &&
    memoryCounter
) {

    memoryText.addEventListener(
        "input",
        function () {

            memoryCounter.textContent =
                `${this.value.length} / 1000`;

        }
    );
}


/* =========================================================
   SAVE MEMORY TO SQLITE
========================================================= */

if (memoryForm) {

    memoryForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* -----------------------------------------
               CHECK USER
            ----------------------------------------- */

            if (!username) {

                if (apiStatus) {
                    apiStatus.hidden =
                        false;
                }

                if (apiStatusText) {
                    apiStatusText.textContent =
                        "Please log in before planting a memory.";
                }

                return;
            }


            /* -----------------------------------------
               CHECK FLOWER
            ----------------------------------------- */

            if (!selectedPlant) {

                if (apiStatus) {
                    apiStatus.hidden =
                        false;
                }

                if (apiStatusText) {
                    apiStatusText.textContent =
                        "Please choose a flower before planting your memory.";
                }

                return;
            }


            /* -----------------------------------------
               GET FORM VALUES
            ----------------------------------------- */

            const title =
                memoryTitle
                    ? memoryTitle.value.trim()
                    : "";


            const text =
                memoryText
                    ? memoryText.value.trim()
                    : "";


            const date =
                memoryDate
                    ? memoryDate.value
                    : "";


            const mood =
                memoryMood
                    ? memoryMood.value
                    : "";


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (
                !title ||
                !text ||
                !date
            ) {

                if (apiStatus) {
                    apiStatus.hidden =
                        false;
                }

                if (apiStatusText) {
                    apiStatusText.textContent =
                        "Please complete your memory before planting it.";
                }

                return;
            }


            /* -----------------------------------------
               BUTTON
            ----------------------------------------- */

            if (submitMemory) {

                submitMemory.disabled =
                    true;


                const buttonText =
                    submitMemory.querySelector(
                        "span"
                    );


                if (buttonText) {

                    buttonText.textContent =
                        "Planting memory...";
                }
            }


            try {

                /* -------------------------------------
                   FLOWER INFORMATION
                ------------------------------------- */

                const flowerName =
                    selectedPlant.common_name ||
                    selectedPlant.scientific_name ||
                    "Flower";


                const flowerId =
                    selectedPlant.id ??
                    selectedPlant.species_id ??
                    "";


                const flowerImage =
                    getFlowerImage(
                        selectedPlant
                    );


                const flowerFact =
                    getFlowerDescription(
                        selectedPlant
                    );


                /* -------------------------------------
                   SEND TO BACKEND
                ------------------------------------- */

                const response =
                    await fetch(
                        "/api/memories",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    username:
                                        username,

                                    flowerId:
                                        flowerId,

                                    flowerName:
                                        flowerName,

                                    flowerImage:
                                        flowerImage,

                                    title:
                                        title,

                                    memoryText:
                                        text,

                                    memoryDate:
                                        date,

                                    mood:
                                        mood,

                                    flowerFact:
                                        flowerFact
                                })
                        }
                    );


                /* -------------------------------------
                   CHECK CONTENT TYPE
                ------------------------------------- */

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
                        `The server returned an invalid response (${response.status}). Make sure the TIMEBLOOM backend is running.`
                    );
                }


                /* -------------------------------------
                   CHECK BACKEND ERROR
                ------------------------------------- */

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        data.error ||
                        "Could not save your memory."
                    );
                }


                /* -------------------------------------
                   CHECK MEMORY ID
                ------------------------------------- */

                if (
                    !data.memory ||
                    !data.memory.id
                ) {

                    console.error(
                        "Unexpected server response:",
                        data
                    );


                    throw new Error(
                        "The memory was saved, but the server did not return a memory ID."
                    );
                }


                /* -------------------------------------
                   SUCCESS
                ------------------------------------- */

                if (submitMemory) {

                    const buttonText =
                        submitMemory.querySelector(
                            "span"
                        );


                    if (buttonText) {

                        buttonText.textContent =
                            "Memory planted ✓";
                    }
                }


                if (apiStatus) {

                    apiStatus.hidden =
                        false;
                }


                if (apiStatusText) {

                    apiStatusText.textContent =
                        "Your memory has taken root.";
                }


                /* -------------------------------------
                   STORE LAST MEMORY
                ------------------------------------- */

                localStorage.setItem(
                    "timebloom_last_memory",
                    String(
                        data.memory.id
                    )
                );


                /* -------------------------------------
                   OPEN MEMORY PAGE
                ------------------------------------- */

                setTimeout(
                    function () {

                        window.location.href =
                            `memory.html?id=${encodeURIComponent(
                                data.memory.id
                            )}`;

                    },
                    600
                );

            } catch (error) {

                console.error(
                    "Memory save error:",
                    error
                );


                if (apiStatus) {

                    apiStatus.hidden =
                        false;
                }


                if (apiStatusText) {

                    apiStatusText.textContent =
                        error.message ||
                        "Unable to save your memory.";
                }


                if (submitMemory) {

                    submitMemory.disabled =
                        false;


                    const buttonText =
                        submitMemory.querySelector(
                            "span"
                        );


                    if (buttonText) {

                        buttonText.textContent =
                            "Plant this memory";
                    }
                }
            }

        }
    );
}


/* =========================================================
   START
========================================================= */

loadFlowers();