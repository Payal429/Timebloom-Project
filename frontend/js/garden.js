/* =========================================================
   TIMEBLOOM — LIVING MEMORY GARDEN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       USER / AUTHENTICATION
       =====================================================

       IMPORTANT:
       login.html stores the username as:

           localStorage.setItem(
               "timebloom_current",
               data.user.username
           );

       Therefore garden.js MUST read "timebloom_current".
    ===================================================== */

    let currentUser =
        localStorage.getItem("timebloom_current");

    /*
       Compatibility fallback.

       If an older version of Timebloom used  "timebloomUser", we can still recognise it.
    */

    if (!currentUser) {
        currentUser =
            localStorage.getItem("timebloomUser");
    }


    /*
       If there is still no logged-in user, send the user back to login.
    */

    if (!currentUser) {

        console.warn(
            "TIMEBLOOM: No logged-in user found."
        );

        window.location.href = "login.html";

        return;
    }


    console.log(
        "TIMEBLOOM: Logged in as:",
        currentUser
    );


    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const welcome =
        document.getElementById("welcome");

    const memoryGrid =
        document.getElementById("memoryGrid");

    const emptyGarden =
        document.getElementById("emptyGarden");

    const livingGarden =
        document.getElementById("livingGarden");

    const livingGardenGrid =
        document.getElementById("livingGardenGrid");

    const logoutButton =
        document.getElementById("logout");


    /* =====================================================
       WELCOME MESSAGE
    ===================================================== */

    if (welcome) {

        welcome.textContent =
            `Welcome, ${currentUser}`;

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                /*
                   Remove BOTH possible keys.
                   This keeps old and new versions clean.
                */

                localStorage.removeItem(
                    "timebloom_current"
                );

                localStorage.removeItem(
                    "timebloomUser"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    /* =====================================================
       FLOWER GROWTH PERIODS
    ===================================================== */

    const PLANT_GROWTH_DAYS = {

        rose: 45,

        tulip: 30,

        sunflower: 70,

        daisy: 35,

        lily: 50,

        orchid: 90,

        lavender: 60,

        jasmine: 75,

        marigold: 40,

        daffodil: 35,

        peony: 60,

        carnation: 50,

        chrysanthemum: 60,

        hibiscus: 70,

        hydrangea: 65,

        gerbera: 45,

        poppy: 40,

        iris: 45,

        gardenia: 75,

        violet: 35

    };


    /* =====================================================
       FLOWER PERSONALITIES
    ===================================================== */

    const FLOWER_PERSONALITIES = {

        rose:
            "I'm dramatic, romantic, and somehow still thriving. Respectfully, I need attention.",

        tulip:
            "I look delicate, but I survived your watering schedule. Please respect my resilience.",

        sunflower:
            "I follow the sun. You follow deadlines. We are not the same.",

        daisy:
            "I'm just happy to be here. No drama. Just petals.",

        orchid:
            "I'm elegant, slightly mysterious, and mildly offended by your care routine.",

        lavender:
            "I smell amazing and would like everyone to calm down.",

        jasmine:
            "I'm sweet, fragrant, and fully aware that I'm the favourite.",

        lily:
            "I'm classy. Please keep the soil drama to a minimum.",

        marigold:
            "I bring sunshine everywhere I go. You're welcome.",

        daffodil:
            "I arrived looking fabulous and completely unbothered.",

        peony:
            "I take my time becoming fabulous. Good things need patience.",

        carnation:
            "I'm tougher than I look. Basically, the friend who survives everything.",

        chrysanthemum:
            "I contain multitudes. And quite a few petals.",

        hibiscus:
            "I'm tropical, dramatic and absolutely not apologising for it.",

        hydrangea:
            "I change my colours depending on the soil. Adaptability is my superpower.",

        gerbera:
            "I woke up colourful and decided everyone else's day should improve too.",

        poppy:
            "I'm soft, pretty and slightly chaotic. A relatable combination.",

        iris:
            "I look sophisticated, but honestly I'm just here to make your garden prettier.",

        gardenia:
            "I smell expensive. Please behave accordingly.",

        violet:
            "I'm small, sweet and quietly stealing the attention.",

        default:
            "I'm still figuring things out, but look at me growing!"

    };


    /* =====================================================
       FLOWER FACTS
    ===================================================== */

    const FLOWER_FACTS = {

        rose:
            "Roses have been cultivated by humans for thousands of years and come in thousands of varieties.",

        tulip:
            "Tulips originally come from Central Asia and became especially famous through their history in the Netherlands.",

        sunflower:
            "Young sunflowers can track the sun across the sky. This behaviour is called heliotropism.",

        daisy:
            "What looks like one daisy flower is actually a collection of many tiny flowers grouped together.",

        orchid:
            "Orchids are one of the largest families of flowering plants, with tens of thousands of known species and hybrids.",

        lavender:
            "Lavender has been used for centuries for its fragrance and is especially loved by bees and other pollinators.",

        jasmine:
            "Jasmine flowers are famous for their strong fragrance and are used in perfumes and teas around the world.",

        lily:
            "True lilies belong to the genus Lilium and grow from bulbs.",

        marigold:
            "Marigolds are popular companion plants because their strong scent can help discourage some garden pests.",

        daffodil:
            "Daffodils grow from bulbs and are among the flowers associated with the arrival of spring.",

        peony:
            "Peonies can live for decades when planted in a suitable location and cared for properly.",

        carnation:
            "Carnations are popular cut flowers because their blooms can remain attractive for a relatively long time.",

        chrysanthemum:
            "Chrysanthemums are one of the most widely cultivated ornamental flowers in the world.",

        hibiscus:
            "Hibiscus flowers are often large and colourful, making them popular ornamental plants in warm climates.",

        hydrangea:
            "Some hydrangeas can change flower colour depending on soil chemistry, particularly its acidity.",

        gerbera:
            "Gerbera daisies are known for their bright colours and are commonly used as decorative cut flowers.",

        poppy:
            "Poppies produce distinctive seed capsules after flowering and have been cultivated for ornamental purposes for centuries.",

        iris:
            "The iris gets its name from the Greek goddess Iris, associated with rainbows.",

        gardenia:
            "Gardenias are prized for their intensely fragrant white flowers.",

        violet:
            "Violets are generally small flowering plants and many species are known for their delicate fragrance."

    };


    /* =====================================================
       FLOWER CARE INFORMATION
    ===================================================== */

    const FLOWER_CARE = {

        rose: {
            light: "Bright sunlight",
            water: "Moderate"
        },

        tulip: {
            light: "Bright sunlight",
            water: "Moderate"
        },

        sunflower: {
            light: "Full sunlight",
            water: "Moderate"
        },

        daisy: {
            light: "Full sunlight",
            water: "Moderate"
        },

        lily: {
            light: "Bright indirect",
            water: "Moderate"
        },

        orchid: {
            light: "Bright indirect",
            water: "Light"
        },

        lavender: {
            light: "Full sunlight",
            water: "Low"
        },

        jasmine: {
            light: "Bright sunlight",
            water: "Moderate"
        },

        marigold: {
            light: "Full sunlight",
            water: "Moderate"
        },

        daffodil: {
            light: "Bright sunlight",
            water: "Moderate"
        },

        peony: {
            light: "Full sunlight",
            water: "Moderate"
        },

        carnation: {
            light: "Full sunlight",
            water: "Moderate"
        },

        chrysanthemum: {
            light: "Full sunlight",
            water: "Moderate"
        },

        hibiscus: {
            light: "Full sunlight",
            water: "High"
        },

        hydrangea: {
            light: "Morning sunlight",
            water: "High"
        },

        gerbera: {
            light: "Full sunlight",
            water: "Moderate"
        },

        poppy: {
            light: "Full sunlight",
            water: "Low"
        },

        iris: {
            light: "Full sunlight",
            water: "Moderate"
        },

        gardenia: {
            light: "Bright indirect",
            water: "Moderate"
        },

        violet: {
            light: "Bright indirect",
            water: "Moderate"
        }

    };


    /* =====================================================
       GET FLOWER TYPE
    ===================================================== */

    function getFlowerType(name) {

        if (!name) {
            return "default";
        }

        const flowerName =
            String(name)
                .toLowerCase()
                .trim();


        for (
            const flower
            of Object.keys(PLANT_GROWTH_DAYS)
        ) {

            if (
                flowerName.includes(flower)
            ) {

                return flower;

            }

        }


        return "default";

    }


    /* =====================================================
       GET GROWTH DAYS
    ===================================================== */

    function getGrowthDays(flowerName) {

        const flowerType =
            getFlowerType(flowerName);

        return (
            PLANT_GROWTH_DAYS[flowerType]
            || 60
        );

    }


    /* =====================================================
       CALCULATE DAYS GROWING
    ===================================================== */

    function calculateDaysGrowing(memoryDate) {

        if (!memoryDate) {
            return 0;
        }


        const plantedDate =
            new Date(memoryDate);


        if (
            Number.isNaN(
                plantedDate.getTime()
            )
        ) {

            return 0;

        }


        const today =
            new Date();


        const difference =
            today.getTime()
            - plantedDate.getTime();


        const days =
            Math.floor(
                difference
                /
                (1000 * 60 * 60 * 24)
            );


        return Math.max(0, days);

    }


    /* =====================================================
       CALCULATE GROWTH %
    ===================================================== */

    function calculateGrowthPercentage(memory) {

        const daysGrowing =
            calculateDaysGrowing(
                memory.memory_date
            );


        const growthDays =
            getGrowthDays(
                memory.flower_name
            );


        const percentage =
            (daysGrowing / growthDays)
            * 100;


        return Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        );

    }


    /* =====================================================
       GET GROWTH STAGE
    ===================================================== */

    function getGrowthStage(memory) {

        const percentage =
            calculateGrowthPercentage(
                memory
            );


        if (percentage >= 100) {

            return {
                name: "Bloomed",
                className: "bloomed"
            };

        }


        if (percentage >= 65) {

            return {
                name: "Flowering",
                className: "flowering"
            };

        }


        if (percentage >= 30) {

            return {
                name: "Growing",
                className: "growing"
            };

        }


        return {
            name: "Planted",
            className: "planted"
        };

    }


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDate(dateString) {

        if (!dateString) {
            return "";
        }


        const date =
            new Date(dateString);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "";

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


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       GET PLANT IMAGE
    ===================================================== */

    function getFlowerImage(memory) {

        return (
            memory.flower_image ||
            memory.plant_image ||
            memory.image ||
            ""
        );

    }


    /* =====================================================
       GET FLOWER FACT
    ===================================================== */

    function getFlowerFact(memory) {

        const flowerType =
            getFlowerType(
                memory.flower_name
            );


        return (
            memory.flower_fact ||
            memory.plant_fact ||
            memory.fact ||
            FLOWER_FACTS[flowerType] ||
            "Every plant has its own story — just like every memory in your garden."
        );

    }


    /* =====================================================
       GET PERSONALITY
    ===================================================== */

    function getFlowerPersonality(memory) {

        const flowerType =
            getFlowerType(
                memory.flower_name
            );


        return (
            FLOWER_PERSONALITIES[
                flowerType
            ]
            ||
            FLOWER_PERSONALITIES.default
        );

    }


    /* =====================================================
       GET CARE
    ===================================================== */

    function getFlowerCare(memory) {

        const flowerType =
            getFlowerType(
                memory.flower_name
            );


        return (
            FLOWER_CARE[
                flowerType
            ]
            ||
            {
                light: "Bright light",
                water: "Moderate"
            }
        );

    }


    /* =====================================================
       CREATE MEMORY CARD
    ===================================================== */

    function createMemoryCard(memory) {

        const image =
            getFlowerImage(memory);


        const imageHTML =
            image

                ? `
                    <div class="memory-card-image">

                        <img
                            src="${escapeHtml(image)}"
                            alt="${escapeHtml(
                                memory.flower_name
                                || "Flower"
                            )}"
                            loading="lazy"
                        >

                    </div>
                  `

                : "";


        return `

            <article class="memory-card">

                ${imageHTML}

                <div class="memory-card-content">

                    <p class="memory-card-flower">
                        ${escapeHtml(
                            memory.flower_name
                            || "Flower"
                        )}
                    </p>

                    <h3>
                        ${escapeHtml(
                            memory.title
                            || "Untitled memory"
                        )}
                    </h3>

                    <p class="memory-card-text">
                        ${escapeHtml(
                            memory.memory_text
                            || ""
                        )}
                    </p>

                    <div class="memory-card-footer">

                        <span>
                            ${escapeHtml(
                                formatDate(
                                    memory.memory_date
                                )
                            )}
                        </span>

                    </div>

                </div>

            </article>

        `;

    }


    /* =====================================================
       CREATE LIVING PLANT
    ===================================================== */

    function createLivingPlant(
        memory,
        index
    ) {

        const flowerType =
            getFlowerType(
                memory.flower_name
            );


        const growthPercentage =
            calculateGrowthPercentage(
                memory
            );


        const daysGrowing =
            calculateDaysGrowing(
                memory.memory_date
            );


        const growthDays =
            getGrowthDays(
                memory.flower_name
            );


        const stage =
            getGrowthStage(
                memory
            );


        return `

            <article
                class="living-plant-card"
                data-memory-index="${index}"
            >

                <div
                    class="living-plant-world"
                    data-memory-index="${index}"
                    data-flower="${escapeHtml(
                        flowerType
                    )}"
                    data-growth="${growthPercentage}"
                    data-days="${daysGrowing}"
                    data-growth-days="${growthDays}"
                    role="button"
                    tabindex="0"
                    aria-label="Learn more about your ${escapeHtml(
                        memory.flower_name
                        || "flower"
                    )}"
                >

                    <div class="plant-ground-shadow"></div>

                    <div
                        class="css-plant flower-${escapeHtml(
                            flowerType
                        )} ${stage.className}"
                    >

                        <div class="plant-stem"></div>

                        <div class="plant-leaves">

                            <span
                                class="plant-leaf plant-leaf-left"
                            ></span>

                            <span
                                class="plant-leaf plant-leaf-right"
                            ></span>

                        </div>

                        <div class="plant-flower">

                            <span
                                class="flower-petal petal-one"
                            ></span>

                            <span
                                class="flower-petal petal-two"
                            ></span>

                            <span
                                class="flower-petal petal-three"
                            ></span>

                            <span
                                class="flower-petal petal-four"
                            ></span>

                            <span
                                class="flower-petal petal-five"
                            ></span>

                            <span
                                class="flower-centre"
                            ></span>

                        </div>

                    </div>

                    <div class="plant-click-hint">
                        Click me ✦
                    </div>

                </div>


                <div class="living-plant-info">

                    <div class="living-plant-title">

                        <div>

                            <p class="living-plant-flower">
                                ${escapeHtml(
                                    memory.flower_name
                                    || "Flower"
                                )}
                            </p>

                            <h3>
                                ${escapeHtml(
                                    memory.title
                                    || "A little memory"
                                )}
                            </h3>

                        </div>

                        <span
                            class="living-plant-stage ${stage.className}"
                        >
                            ${stage.name}
                        </span>

                    </div>


                    <div class="living-plant-progress">

                        <div class="progress-track">

                            <div
                                class="progress-fill"
                                style="width:${growthPercentage}%"
                            ></div>

                        </div>

                        <div class="progress-labels">

                            <span>
                                ${daysGrowing}
                                days growing
                            </span>

                            <span>
                                ${Math.round(
                                    growthPercentage
                                )}%
                            </span>

                        </div>

                    </div>


                    <p class="living-plant-date">

                        Planted
                        ${escapeHtml(
                            formatDate(
                                memory.memory_date
                            )
                        )}

                    </p>

                </div>

            </article>

        `;

    }


    /* =====================================================
       RENDER LIVING GARDEN
    ===================================================== */

    function renderLivingGarden(memories) {

        if (
            !livingGarden ||
            !livingGardenGrid
        ) {

            return;

        }


        if (
            !memories ||
            memories.length === 0
        ) {

            livingGarden.style.display =
                "none";

            return;

        }


        livingGarden.style.display =
            "block";


        livingGardenGrid.innerHTML =
            memories
                .map(
                    (
                        memory,
                        index
                    ) =>
                        createLivingPlant(
                            memory,
                            index
                        )
                )
                .join("");


        attachPlantInteractions(
            memories
        );


        requestAnimationFrame(() => {

            document
                .querySelectorAll(
                    ".living-plant-world"
                )
                .forEach(
                    (
                        plant,
                        index
                    ) => {

                        setTimeout(
                            () => {

                                plant.classList.add(
                                    "is-grown"
                                );

                            },
                            100 +
                            (index * 100)
                        );

                    }
                );

        });

    }


    /* =====================================================
       PLANT MODAL ELEMENTS
    ===================================================== */

    const plantModal =
        document.getElementById(
            "plantModal"
        );

    const closePlantModalButton =
        document.getElementById(
            "closePlantModal"
        );

    const plantModalImage =
        document.getElementById(
            "plantModalImage"
        );

    const plantModalName =
        document.getElementById(
            "plantModalName"
        );

    const plantModalScientific =
        document.getElementById(
            "plantModalScientific"
        );

    const plantModalFunny =
        document.getElementById(
            "plantModalFunny"
        );

    const plantModalFact =
        document.getElementById(
            "plantModalFact"
        );

    const plantModalLight =
        document.getElementById(
            "plantModalLight"
        );

    const plantModalWater =
        document.getElementById(
            "plantModalWater"
        );

    const plantModalAge =
        document.getElementById(
            "plantModalAge"
        );

    const plantModalStage =
        document.getElementById(
            "plantModalStage"
        );

    const plantModalMemoryTitle =
        document.getElementById(
            "plantModalMemoryTitle"
        );

    const plantModalMemoryText =
        document.getElementById(
            "plantModalMemoryText"
        );

    const plantModalMemoryDate =
        document.getElementById(
            "plantModalMemoryDate"
        );


    /* =====================================================
       OPEN PLANT MODAL
    ===================================================== */

    function openPlantModal(memory) {

        if (
            !plantModal ||
            !memory
        ) {

            return;

        }


        const flowerName =
            memory.flower_name
            || "Your Flower";


        const image =
            getFlowerImage(memory);


        const care =
            getFlowerCare(memory);


        const daysGrowing =
            calculateDaysGrowing(
                memory.memory_date
            );


        const stage =
            getGrowthStage(
                memory
            );


        /* IMAGE */

        if (
            image &&
            plantModalImage
        ) {

            plantModalImage.src =
                image;

            plantModalImage.alt =
                `${flowerName} — real plant image`;

            plantModalImage.style.display =
                "block";


            plantModalImage.onerror =
                () => {

                    plantModalImage.style.display =
                        "none";

                };

        }
        else if (plantModalImage) {

            plantModalImage.removeAttribute(
                "src"
            );

            plantModalImage.alt = "";

            plantModalImage.style.display =
                "none";

        }


        /* NAME */

        if (plantModalName) {

            plantModalName.textContent =
                flowerName;

        }


        /* SCIENTIFIC NAME */

        const scientificName =
            memory.scientific_name ||
            memory.scientificName ||
            memory.flower_scientific_name ||
            "";


        if (plantModalScientific) {

            if (scientificName) {

                plantModalScientific.textContent =
                    scientificName;

                plantModalScientific.style.display =
                    "block";

            }
            else {

                plantModalScientific.textContent =
                    "";

                plantModalScientific.style.display =
                    "none";

            }

        }


        /* PERSONALITY */

        if (plantModalFunny) {

            plantModalFunny.textContent =
                getFlowerPersonality(
                    memory
                );

        }


        /* FACT */

        if (plantModalFact) {

            plantModalFact.textContent =
                getFlowerFact(
                    memory
                );

        }


        /* CARE */

        if (plantModalLight) {

            plantModalLight.textContent =
                care.light;

        }


        if (plantModalWater) {

            plantModalWater.textContent =
                care.water;

        }


        /* AGE */

        if (plantModalAge) {

            plantModalAge.textContent =
                `${daysGrowing} ${
                    daysGrowing === 1
                        ? "day"
                        : "days"
                }`;

        }


        /* STAGE */

        if (plantModalStage) {

            plantModalStage.textContent =
                stage.name;

        }


        /* MEMORY */

        if (plantModalMemoryTitle) {

            plantModalMemoryTitle.textContent =
                memory.title ||
                "A memory worth keeping";

        }


        if (plantModalMemoryText) {

            plantModalMemoryText.textContent =
                memory.memory_text ||
                "This flower is holding onto a special moment.";

        }


        if (plantModalMemoryDate) {

            plantModalMemoryDate.textContent =
                memory.memory_date
                    ? `Planted on ${formatDate(
                        memory.memory_date
                    )}`
                    : "";

        }


        /* OPEN MODAL */

        plantModal.classList.add(
            "is-open"
        );

        plantModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "plant-modal-open"
        );


        /* ACCESSIBILITY */

        if (closePlantModalButton) {

            setTimeout(
                () => {

                    closePlantModalButton.focus();

                },
                100
            );

        }

    }


    /* =====================================================
       CLOSE PLANT MODAL
    ===================================================== */

    function closePlantModal() {

        if (!plantModal) {
            return;
        }


        plantModal.classList.remove(
            "is-open"
        );

        plantModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "plant-modal-open"
        );

    }


    /* =====================================================
       ATTACH PLANT INTERACTIONS
    ===================================================== */

    function attachPlantInteractions(
        memories
    ) {

        const plants =
            document.querySelectorAll(
                ".living-plant-world"
            );


        plants.forEach(
            (plant) => {

                const index =
                    Number(
                        plant.dataset.memoryIndex
                    );


                const memory =
                    memories[index];


                if (!memory) {
                    return;
                }


                /* CLICK */

                plant.addEventListener(
                    "click",
                    () => {

                        openPlantModal(
                            memory
                        );

                    }
                );


                /* KEYBOARD */

                plant.addEventListener(
                    "keydown",
                    (event) => {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            openPlantModal(
                                memory
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       MODAL CLOSE BUTTON
    ===================================================== */

    if (closePlantModalButton) {

        closePlantModalButton.addEventListener(
            "click",
            closePlantModal
        );

    }


    /* =====================================================
       CLICK BACKDROP TO CLOSE
    ===================================================== */

    if (plantModal) {

        plantModal
            .querySelectorAll(
                "[data-close-plant-modal]"
            )
            .forEach(
                (element) => {

                    element.addEventListener(
                        "click",
                        closePlantModal
                    );

                }
            );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                plantModal &&
                plantModal.classList.contains(
                    "is-open"
                )
            ) {

                closePlantModal();

            }

        }
    );


    /* =====================================================
       LOAD MEMORIES
    ===================================================== */

    async function loadMemories() {

        try {

            if (memoryGrid) {

                memoryGrid.innerHTML = `
                    <div class="memory-loading">
                        Growing your memories...
                    </div>
                `;

            }


            /*
               IMPORTANT:

               currentUser now comes from
               "timebloom_current", which is
               the same key used by login.html.
            */

            const response =
                await fetch(
                    `/api/memories?username=${encodeURIComponent(
                        currentUser
                    )}`
                );


            if (!response.ok) {

                throw new Error(
                    `Server returned ${response.status}`
                );

            }


            const memories =
                await response.json();


            console.log(
                "TIMEBLOOM: Memories loaded:",
                memories
            );


            /* EMPTY GARDEN */

            if (
                !Array.isArray(memories) ||
                memories.length === 0
            ) {

                if (memoryGrid) {

                    memoryGrid.innerHTML =
                        "";

                }


                if (emptyGarden) {

                    emptyGarden.style.display =
                        "flex";

                }


                if (livingGarden) {

                    livingGarden.style.display =
                        "none";

                }


                return;

            }


            /* HIDE EMPTY STATE */

            if (emptyGarden) {

                emptyGarden.style.display =
                    "none";

            }


            /* MEMORY CARDS */

            if (memoryGrid) {

                memoryGrid.innerHTML =
                    memories
                        .map(
                            createMemoryCard
                        )
                        .join("");

            }


            /* LIVING GARDEN */

            renderLivingGarden(
                memories
            );

        }


        catch (error) {

            console.error(
                "TIMEBLOOM garden error:",
                error
            );


            if (memoryGrid) {

                memoryGrid.innerHTML = `

                    <div class="memory-error">

                        <p class="eyebrow">
                            SOMETHING WENT WRONG
                        </p>

                        <h2>
                            Your garden is taking
                            <em>a little nap.</em>
                        </h2>

                        <p>
                            We couldn't load your memories right now.
                            Please refresh the page and try again.
                        </p>

                    </div>

                `;

            }


            if (livingGarden) {

                livingGarden.style.display =
                    "none";

            }

        }

    }


    /* =====================================================
       START
    ===================================================== */

    loadMemories();

});

