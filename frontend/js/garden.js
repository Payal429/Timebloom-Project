/* =========================================================
   TIMEBLOOM — MY GARDEN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const currentUser =
        localStorage.getItem("timebloom_current");

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const welcomeText =
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
       PLANT MODAL ELEMENTS
    ===================================================== */

    const plantModal =
        document.getElementById("plantModal");

    const closePlantModal =
        document.getElementById("closePlantModal");

    const plantModalImage =
        document.getElementById("plantModalImage");

    const plantModalName =
        document.getElementById("plantModalName");

    const plantModalScientific =
        document.getElementById("plantModalScientific");

    const plantModalFunny =
        document.getElementById("plantModalFunny");

    const plantModalFact =
        document.getElementById("plantModalFact");

    const plantModalLight =
        document.getElementById("plantModalLight");

    const plantModalWater =
        document.getElementById("plantModalWater");

    const plantModalAge =
        document.getElementById("plantModalAge");

    const plantModalStage =
        document.getElementById("plantModalStage");

    const plantModalMemoryTitle =
        document.getElementById("plantModalMemoryTitle");

    const plantModalMemoryText =
        document.getElementById("plantModalMemoryText");

    const plantModalMemoryDate =
        document.getElementById("plantModalMemoryDate");


    /* =====================================================
       USER
    ===================================================== */

    if (welcomeText) {
        welcomeText.textContent =
            `Welcome, ${currentUser}`;
    }


    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            localStorage.removeItem(
                "timebloom_current"
            );

            window.location.href =
                "login.html";

        });

    }


    /* =====================================================
       PLANT GROWTH TIMELINES
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

    const DEFAULT_GROWTH_DAYS = 60;


    /* =====================================================
       FLOWER INFORMATION
    ===================================================== */

    const FLOWER_INFORMATION = {

        rose: {
            scientific: "Rosa",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I may have thorns, but I'm still the dramatic one in this garden."
        },

        tulip: {
            scientific: "Tulipa",
            light: "Bright sunlight",
            water: "Moderate",
            funny:
                "I look elegant, but honestly I'm just here to make your garden look expensive."
        },

        sunflower: {
            scientific: "Helianthus annuus",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I spend my entire day chasing sunlight. It's basically my personality."
        },

        daisy: {
            scientific: "Bellis perennis",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I'm basically the cheerful friend who somehow survives everything."
        },

        lily: {
            scientific: "Lilium",
            light: "Bright sunlight",
            water: "Moderate",
            funny:
                "I look delicate, but I've got main-character energy."
        },

        orchid: {
            scientific: "Orchidaceae",
            light: "Indirect light",
            water: "Light",
            funny:
                "I'm beautiful, mysterious and slightly high-maintenance. You're welcome."
        },

        lavender: {
            scientific: "Lavandula",
            light: "Full sunlight",
            water: "Low",
            funny:
                "I smell amazing and require very little attention. Honestly, relationship goals."
        },

        jasmine: {
            scientific: "Jasminum",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I wait until evening to show off. Timing is everything."
        },

        marigold: {
            scientific: "Tagetes",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I'm small, bright and absolutely convinced I run this garden."
        },

        daffodil: {
            scientific: "Narcissus",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I arrive in spring looking fabulous and expect everyone to notice."
        },

        peony: {
            scientific: "Paeonia",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I take my time blooming. Great things apparently need a little patience."
        },

        carnation: {
            scientific: "Dianthus caryophyllus",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I've been around forever and somehow I'm still fashionable."
        },

        chrysanthemum: {
            scientific: "Chrysanthemum",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "My name is difficult to pronounce, but I'm worth the effort."
        },

        hibiscus: {
            scientific: "Hibiscus",
            light: "Full sunlight",
            water: "High",
            funny:
                "Give me sunshine and I'll give you tropical holiday energy."
        },

        hydrangea: {
            scientific: "Hydrangea",
            light: "Morning sunlight",
            water: "High",
            funny:
                "I like water. A lot. Please don't forget me."
        },

        gerbera: {
            scientific: "Gerbera",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I woke up colourful and decided everyone else should cheer up too."
        },

        poppy: {
            scientific: "Papaver",
            light: "Full sunlight",
            water: "Low",
            funny:
                "I look delicate, but I know how to make an entrance."
        },

        iris: {
            scientific: "Iris",
            light: "Full sunlight",
            water: "Moderate",
            funny:
                "I'm elegant enough to have my own name and dramatic enough to use it."
        },

        gardenia: {
            scientific: "Gardenia jasminoides",
            light: "Bright indirect light",
            water: "Moderate",
            funny:
                "I smell incredible. Please pretend I didn't say that myself."
        },

        violet: {
            scientific: "Viola",
            light: "Partial shade",
            water: "Moderate",
            funny:
                "I'm small, but don't let that fool you. I know how to steal attention."
        }

    };


    /* =====================================================
       GET PLANT INFORMATION
    ===================================================== */

    function getFlowerInformation(flowerName) {

        const name =
            String(flowerName || "")
                .toLowerCase()
                .trim();

        const match =
            Object.keys(FLOWER_INFORMATION)
                .find(
                    flower =>
                        name.includes(flower) ||
                        flower.includes(name)
                );

        if (match) {
            return FLOWER_INFORMATION[match];
        }

        return {
            scientific: "Botanical species",
            light: "Bright light",
            water: "Moderate",
            funny:
                "I'm still figuring out my personality. Give me some time to grow."
        };
    }


    /* =====================================================
       GET PLANT GROWTH TIME
    ===================================================== */

    function getGrowthDays(flowerName) {

        if (!flowerName) {
            return DEFAULT_GROWTH_DAYS;
        }

        const name =
            String(flowerName)
                .toLowerCase()
                .trim();

        if (PLANT_GROWTH_DAYS[name]) {
            return PLANT_GROWTH_DAYS[name];
        }

        const matchingPlant =
            Object.keys(PLANT_GROWTH_DAYS)
                .find(
                    plant =>
                        name.includes(plant) ||
                        plant.includes(name)
                );

        return matchingPlant
            ? PLANT_GROWTH_DAYS[matchingPlant]
            : DEFAULT_GROWTH_DAYS;
    }


    /* =====================================================
       DATE CALCULATIONS
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

        const today = new Date();

        plantedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const difference =
            today.getTime() -
            plantedDate.getTime();

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        return Math.max(0, days);
    }


    /* =====================================================
       GROWTH PERCENTAGE
    ===================================================== */

    function calculateGrowthPercentage(
        daysGrowing,
        growthDays
    ) {

        if (
            !growthDays ||
            growthDays <= 0
        ) {
            return 100;
        }

        return Math.min(
            100,
            Math.max(
                0,
                Math.round(
                    (daysGrowing / growthDays) *
                    100
                )
            )
        );
    }


    /* =====================================================
       GROWTH STAGES
    ===================================================== */

    function getGrowthStage(
        growthPercentage
    ) {

        if (growthPercentage <= 0) {

            return {
                className: "plant-seed",
                title: "Seed planted",
                description:
                    "A new memory has been planted."
            };

        }

        if (growthPercentage < 15) {

            return {
                className: "plant-sprout",
                title: "Beginning to sprout",
                description:
                    "Your memory is beginning to grow."
            };

        }

        if (growthPercentage < 40) {

            return {
                className: "plant-young",
                title: "Growing",
                description:
                    "Your memory is taking root."
            };

        }

        if (growthPercentage < 70) {

            return {
                className: "plant-growing",
                title: "Growing beautifully",
                description:
                    "Leaves are reaching toward the light."
            };

        }

        if (growthPercentage < 100) {

            return {
                className: "plant-budding",
                title: "Almost blooming",
                description:
                    "Something beautiful is about to bloom."
            };

        }

        return {
            className: "plant-bloomed",
            title: "Fully bloomed",
            description:
                "This memory has reached full bloom."
        };
    }


    /* =====================================================
       FLOWER TYPE
    ===================================================== */

    function getFlowerType(flowerName) {

        if (!flowerName) {
            return "daisy";
        }

        const name =
            String(flowerName)
                .toLowerCase();

        const knownFlowers = [
            "rose",
            "tulip",
            "sunflower",
            "daisy",
            "lily",
            "orchid",
            "lavender",
            "jasmine",
            "marigold",
            "daffodil",
            "peony",
            "carnation",
            "chrysanthemum",
            "hibiscus",
            "hydrangea",
            "gerbera",
            "poppy",
            "iris",
            "gardenia",
            "violet"
        ];

        const match =
            knownFlowers.find(
                flower =>
                    name.includes(flower) ||
                    flower.includes(name)
            );

        return match || "daisy";
    }


    /* =====================================================
       DATE FORMATTING
    ===================================================== */

    function formatDate(dateValue) {

        if (!dateValue) {
            return "Date unknown";
        }

        const date =
            new Date(dateValue);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "Date unknown";
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
       FLOWER IMAGE
    ===================================================== */

    function getFlowerImage(memory) {

        if (
            !memory ||
            !memory.flower_image
        ) {
            return "";
        }

        return String(
            memory.flower_image
        );
    }


    /* =====================================================
       HTML ESCAPING
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
       MEMORY CARD
    ===================================================== */

    function createMemoryCard(memory) {

        const flowerImage =
            getFlowerImage(memory);

        const flowerName =
            memory.flower_name ||
            memory.flower ||
            memory.plant_name ||
            "Unknown flower";

        const memoryText =
            memory.memory_text ||
            memory.memory ||
            memory.description ||
            "";

        const memoryDate =
            memory.memory_date ||
            memory.created_at ||
            memory.date;

        const imageHtml =
            flowerImage

                ? `
                    <div class="memory-flower">

                        <img
                            src="${escapeHtml(
                                flowerImage
                            )}"
                            alt="${escapeHtml(
                                flowerName
                            )}"
                            loading="lazy"
                        >

                    </div>
                  `

                : `
                    <div
                        class="
                            memory-flower
                            memory-flower-placeholder
                        "
                    >
                        <span>🌱</span>
                    </div>
                  `;

        return `
            <article class="memory-card">

                ${imageHtml}

                <div class="memory-card-content">

                    <p class="memory-flower-name">
                        ${escapeHtml(
                            flowerName
                        )}
                    </p>

                    <h3>
                        ${escapeHtml(
                            memory.title ||
                            "A Memory to Remember"
                        )}
                    </h3>

                    <p class="memory-text">
                        ${escapeHtml(
                            memoryText
                        )}
                    </p>

                    <div class="memory-card-footer">

                        <span>
                            ${escapeHtml(
                                formatDate(
                                    memoryDate
                                )
                            )}
                        </span>

                        <span
                            class="
                                memory-card-separator
                            "
                        >
                            •
                        </span>

                        <span>
                            Planted in your garden
                        </span>

                    </div>

                </div>

            </article>
        `;
    }


    /* =====================================================
       CREATE LIVING PLANT
    ===================================================== */

    function createLivingPlant(memory) {

        const flowerName =
            memory.flower_name ||
            memory.flower ||
            memory.plant_name ||
            "Flower";

        const memoryDate =
            memory.memory_date ||
            memory.created_at ||
            memory.date;

        const daysGrowing =
            calculateDaysGrowing(
                memoryDate
            );

        const growthDays =
            getGrowthDays(
                flowerName
            );

        const growthPercentage =
            calculateGrowthPercentage(
                daysGrowing,
                growthDays
            );

        const stage =
            getGrowthStage(
                growthPercentage
            );

        const flowerType =
            getFlowerType(
                flowerName
            );

        const stemHeight =
            Math.max(
                8,
                Math.round(
                    15 +
                    (growthPercentage / 100) *
                    135
                )
            );

        const leafProgress =
            Math.min(
                1,
                Math.max(
                    0,
                    (growthPercentage - 15) /
                    45
                )
            );

        const flowerProgress =
            Math.min(
                1,
                Math.max(
                    0,
                    (growthPercentage - 70) /
                    30
                )
            );

        const plantId =
            `plant-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`;


        return `
            <article
                class="living-plant-card"
                data-growth="${growthPercentage}"
                data-days="${daysGrowing}"
                data-growth-days="${growthDays}"
                data-flower="${escapeHtml(
                    flowerType
                )}"
            >

                <div class="living-plant-header">

                    <div>

                        <p class="living-plant-eyebrow">
                            MEMORY PLANTED
                        </p>

                        <h3>
                            ${escapeHtml(
                                flowerName
                            )}
                        </h3>

                    </div>

                    <div class="growth-percent">
                        ${growthPercentage}%
                    </div>

                </div>


                <div class="living-plant-stage">
                    ${escapeHtml(
                        stage.title
                    )}
                </div>


                <!-- CLICKABLE LIVING PLANT -->

                <div
                    class="
                        living-plant-world
                        clickable-plant
                    "
                    id="${plantId}"
                    tabindex="0"
                    role="button"
                    aria-label="Meet your ${escapeHtml(
                        flowerName
                    )}"
                    data-memory-id="${escapeHtml(
                        memory.id || ""
                    )}"
                >

                    <span class="plant-click-hint">
                        Click me 🌿
                    </span>

                    <div class="plant-light"></div>

                    <div class="plant-ground-glow"></div>

                    <div class="plant-soil">

                        <span class="soil-piece soil-piece-1"></span>
                        <span class="soil-piece soil-piece-2"></span>
                        <span class="soil-piece soil-piece-3"></span>
                        <span class="soil-piece soil-piece-4"></span>

                    </div>


                    <div
                        class="
                            css-plant
                            ${stage.className}
                        "
                        style="
                            --stem-height: ${stemHeight}px;
                            --leaf-progress: ${leafProgress};
                            --flower-progress: ${flowerProgress};
                        "
                    >

                        <span class="css-stem"></span>

                        <span
                            class="
                                css-leaf
                                css-leaf-left
                            "
                        ></span>

                        <span
                            class="
                                css-leaf
                                css-leaf-right
                            "
                        ></span>

                        <span
                            class="
                                css-leaf
                                css-leaf-upper-left
                            "
                        ></span>

                        <span
                            class="
                                css-leaf
                                css-leaf-upper-right
                            "
                        ></span>


                        <span class="css-flower">

                            <span
                                class="
                                    flower-petal
                                    petal-1
                                "
                            ></span>

                            <span
                                class="
                                    flower-petal
                                    petal-2
                                "
                            ></span>

                            <span
                                class="
                                    flower-petal
                                    petal-3
                                "
                            ></span>

                            <span
                                class="
                                    flower-petal
                                    petal-4
                                "
                            ></span>

                            <span
                                class="
                                    flower-petal
                                    petal-5
                                "
                            ></span>

                            <span
                                class="
                                    flower-petal
                                    petal-6
                                "
                            ></span>

                            <span
                                class="flower-center"
                            ></span>

                        </span>

                    </div>

                </div>


                <div class="living-plant-info">

                    <div class="growth-stat">

                        <strong>
                            ${daysGrowing}
                        </strong>

                        <span>
                            ${
                                daysGrowing === 1
                                    ? "day"
                                    : "days"
                            }
                            growing
                        </span>

                    </div>


                    <div class="growth-stat">

                        <strong>
                            ${growthDays}
                        </strong>

                        <span>
                            days to bloom
                        </span>

                    </div>

                </div>


                <div class="growth-progress">

                    <div
                        class="
                            growth-progress-track
                        "
                    >

                        <div
                            class="
                                growth-progress-bar
                            "
                            style="
                                width:
                                ${growthPercentage}%
                            "
                        ></div>

                    </div>


                    <div
                        class="
                            growth-progress-labels
                        "
                    >

                        <span>Seed</span>
                        <span>Sprout</span>
                        <span>Leaves</span>
                        <span>Bloom</span>

                    </div>

                </div>


                <p class="living-plant-description">
                    ${escapeHtml(
                        stage.description
                    )}
                </p>


                <p class="living-plant-date">
                    Planted
                    ${escapeHtml(
                        formatDate(
                            memoryDate
                        )
                    )}
                </p>

            </article>
        `;
    }


    /* =====================================================
       OPEN FLOWER MODAL
    ===================================================== */

    function openPlantModal(memory) {

        if (!plantModal) {
            return;
        }

        const flowerName =
            memory.flower_name ||
            memory.flower ||
            memory.plant_name ||
            "Your Flower";

        const flowerImage =
            getFlowerImage(memory);

        const memoryDate =
            memory.memory_date ||
            memory.created_at ||
            memory.date;

        const daysGrowing =
            calculateDaysGrowing(
                memoryDate
            );

        const growthDays =
            getGrowthDays(
                flowerName
            );

        const growthPercentage =
            calculateGrowthPercentage(
                daysGrowing,
                growthDays
            );

        const stage =
            getGrowthStage(
                growthPercentage
            );

        const info =
            getFlowerInformation(
                flowerName
            );


        /* -------------------------------------------------
           IMAGE
        ------------------------------------------------- */

        if (plantModalImage) {

            if (flowerImage) {

                plantModalImage.src =
                    flowerImage;

                plantModalImage.alt =
                    `${flowerName} plant`;

                plantModalImage.style.display =
                    "block";

            } else {

                plantModalImage.removeAttribute(
                    "src"
                );

                plantModalImage.alt =
                    "Plant image unavailable";

                plantModalImage.style.display =
                    "none";
            }
        }


        /* -------------------------------------------------
           NAME
        ------------------------------------------------- */

        if (plantModalName) {

            plantModalName.textContent =
                flowerName;

        }


        /* -------------------------------------------------
           SCIENTIFIC NAME
        ------------------------------------------------- */

        if (plantModalScientific) {

            plantModalScientific.textContent =
                info.scientific;

        }


        /* -------------------------------------------------
           FUNNY PERSONALITY
        ------------------------------------------------- */

        if (plantModalFunny) {

            plantModalFunny.textContent =
                info.funny;

        }


        /* -------------------------------------------------
           PLANT FACT
        ------------------------------------------------- */

        if (plantModalFact) {

            const apiFact =
                memory.flower_fact ||
                memory.flowerFact ||
                memory.fact;

            plantModalFact.textContent =
                apiFact ||
                "This little plant has been busy growing while you were busy making memories.";

        }


        /* -------------------------------------------------
           DETAILS
        ------------------------------------------------- */

        if (plantModalLight) {

            plantModalLight.textContent =
                info.light;

        }

        if (plantModalWater) {

            plantModalWater.textContent =
                info.water;

        }

        if (plantModalAge) {

            plantModalAge.textContent =
                `${daysGrowing} ${
                    daysGrowing === 1
                        ? "day"
                        : "days"
                }`;

        }

        if (plantModalStage) {

            plantModalStage.textContent =
                stage.title;

        }


        /* -------------------------------------------------
           MEMORY
        ------------------------------------------------- */

        if (plantModalMemoryTitle) {

            plantModalMemoryTitle.textContent =
                memory.title ||
                "A Memory to Remember";

        }

        if (plantModalMemoryText) {

            plantModalMemoryText.textContent =
                memory.memory_text ||
                memory.memory ||
                memory.description ||
                "This memory is still growing.";

        }

        if (plantModalMemoryDate) {

            plantModalMemoryDate.textContent =
                `Planted ${formatDate(
                    memoryDate
                )}`;

        }


        /* -------------------------------------------------
           SHOW MODAL
        ------------------------------------------------- */

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

        setTimeout(() => {

            if (closePlantModal) {
                closePlantModal.focus();
            }

        }, 100);
    }


    /* =====================================================
       CLOSE FLOWER MODAL
    ===================================================== */

    function closePlantDetails() {

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


    if (closePlantModal) {

        closePlantModal.addEventListener(
            "click",
            closePlantDetails
        );

    }


    if (plantModal) {

        plantModal
            .querySelectorAll(
                "[data-close-plant-modal]"
            )
            .forEach(element => {

                element.addEventListener(
                    "click",
                    closePlantDetails
                );

            });

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                plantModal &&
                plantModal.classList.contains(
                    "is-open"
                )
            ) {

                closePlantDetails();

            }

        }
    );


    /* =====================================================
       MEMORY CARD
       ===================================================== */

    function renderLivingGarden(memories) {

        if (!livingGardenGrid) {
            return;
        }

        livingGardenGrid.innerHTML = "";

        if (
            !memories ||
            memories.length === 0
        ) {

            if (livingGarden) {
                livingGarden.style.display =
                    "none";
            }

            return;
        }

        if (livingGarden) {
            livingGarden.style.display =
                "";
        }


        /* -------------------------------------------------
           CREATE PLANTS
        ------------------------------------------------- */

        memories.forEach(memory => {

            livingGardenGrid.insertAdjacentHTML(
                "beforeend",
                createLivingPlant(memory)
            );

        });


        /* -------------------------------------------------
           ADD CLICK EVENTS
        ------------------------------------------------- */

        const plantWorlds =
            livingGardenGrid.querySelectorAll(
                ".clickable-plant"
            );


        plantWorlds.forEach(
            (plantWorld, index) => {

                const memory =
                    memories[index];

                if (!memory) {
                    return;
                }


                /* Mouse click */

                plantWorld.addEventListener(
                    "click",
                    () => {

                        plantWorld.classList.add(
                            "plant-selected"
                        );

                        setTimeout(() => {

                            openPlantModal(
                                memory
                            );

                            plantWorld.classList.remove(
                                "plant-selected"
                            );

                        }, 180);

                    }
                );


                /* Keyboard */

                plantWorld.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            plantWorld.click();

                        }

                    }
                );

            }
        );


        /* -------------------------------------------------
           GROWTH ANIMATION
        ------------------------------------------------- */

        requestAnimationFrame(() => {

            setTimeout(() => {

                document
                    .querySelectorAll(
                        ".css-plant"
                    )
                    .forEach(plant => {

                        plant.classList.add(
                            "is-grown"
                        );

                    });

            }, 100);

        });

    }


    /* =====================================================
       LOAD MEMORIES
    ===================================================== */

    async function loadMemories() {

        if (!memoryGrid) {
            return;
        }

        memoryGrid.innerHTML = `
            <div class="garden-loading">

                <span class="loading-seed">
                    🌱
                </span>

                <p>
                    Walking through your garden...
                </p>

            </div>
        `;


        try {

            const response =
                await fetch(
                    `/api/memories?username=${encodeURIComponent(
                        currentUser
                    )}`,
                    {
                        method: "GET",
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            const rawText =
                await response.text();

            let data;

            try {

                data =
                    JSON.parse(rawText);

            } catch (jsonError) {

                console.error(
                    "Server returned invalid JSON:",
                    rawText
                );

                throw new Error(
                    "The server returned an invalid response."
                );

            }


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    data.message ||
                    `Server error (${response.status})`
                );

            }


            const memories =
                Array.isArray(
                    data.memories
                )
                    ? data.memories
                    : [];


            /* -------------------------------------------------
               MEMORY CARDS
            ------------------------------------------------- */

            if (
                memories.length === 0
            ) {

                memoryGrid.innerHTML = "";

                if (emptyGarden) {
                    emptyGarden.style.display =
                        "";
                }

            } else {

                if (emptyGarden) {
                    emptyGarden.style.display =
                        "none";
                }

                memoryGrid.innerHTML =
                    memories
                        .map(
                            createMemoryCard
                        )
                        .join("");

            }


            /* -------------------------------------------------
               LIVING GARDEN
            ------------------------------------------------- */

            renderLivingGarden(
                memories
            );


        } catch (error) {

            console.error(
                "Could not load garden:",
                error
            );


            if (memoryGrid) {

                memoryGrid.innerHTML = `

                    <div class="garden-load-error">

                        <div class="error-icon">
                            🌧️
                        </div>

                        <h3>
                            Your garden is taking
                            a little nap.
                        </h3>

                        <p>
                            We couldn't load your
                            memories right now.
                        </p>

                        <button
                            type="button"
                            id="retryGarden"
                            class="retry-garden-button"
                        >
                            Try again
                        </button>

                    </div>

                `;


                const retryButton =
                    document.getElementById(
                        "retryGarden"
                    );


                if (retryButton) {

                    retryButton.addEventListener(
                        "click",
                        loadMemories
                    );

                }

            }


            if (livingGardenGrid) {

                livingGardenGrid.innerHTML =
                    "";

            }

        }

    }


    /* =====================================================
       START
    ===================================================== */

    loadMemories();

});