/* =========================================================
   TIMEBLOOM — MY GARDEN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("timebloom_current");

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    /* ---------------------------------------------------------
       ELEMENTS
    --------------------------------------------------------- */

    const welcomeText = document.getElementById("welcome");
    const memoryGrid = document.getElementById("memoryGrid");
    const emptyGarden = document.getElementById("emptyGarden");
    const livingGarden = document.getElementById("livingGarden");
    const livingGardenGrid = document.getElementById("livingGardenGrid");
    const logoutButton = document.getElementById("logout");

    /* ---------------------------------------------------------
       USER
    --------------------------------------------------------- */

    if (welcomeText) {
        welcomeText.textContent = `Welcome, ${currentUser}`;
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("timebloom_current");
            window.location.href = "login.html";
        });
    }

    /* =========================================================
       PLANT GROWTH TIMELINES
       
       These are the number of days used by TIMEBLOOM to
       represent the complete growth journey of each plant.
       ========================================================= */

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

    /* ---------------------------------------------------------
       GET PLANT GROWTH TIME
       --------------------------------------------------------- */

    function getGrowthDays(flowerName) {
        if (!flowerName) {
            return DEFAULT_GROWTH_DAYS;
        }

        const name = String(flowerName).toLowerCase().trim();

        if (PLANT_GROWTH_DAYS[name]) {
            return PLANT_GROWTH_DAYS[name];
        }

        const matchingPlant = Object.keys(PLANT_GROWTH_DAYS).find(
            plant => name.includes(plant) || plant.includes(name)
        );

        return matchingPlant
            ? PLANT_GROWTH_DAYS[matchingPlant]
            : DEFAULT_GROWTH_DAYS;
    }

    /* =========================================================
       DATE CALCULATIONS
       ========================================================= */

    function calculateDaysGrowing(memoryDate) {
        if (!memoryDate) {
            return 0;
        }

        const plantedDate = new Date(memoryDate);

        if (Number.isNaN(plantedDate.getTime())) {
            return 0;
        }

        const today = new Date();

        /*
         * Compare dates at midnight so that:
         *
         * 1 September → 2 September = exactly 1 day
         *
         * Time of day does not affect the result.
         */

        plantedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const difference =
            today.getTime() - plantedDate.getTime();

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        return Math.max(0, days);
    }

    /* ---------------------------------------------------------
       GROWTH PERCENTAGE
       --------------------------------------------------------- */

    function calculateGrowthPercentage(daysGrowing, growthDays) {
        if (!growthDays || growthDays <= 0) {
            return 100;
        }

        return Math.min(
            100,
            Math.max(
                0,
                Math.round((daysGrowing / growthDays) * 100)
            )
        );
    }

    /* =========================================================
       GROWTH STAGES
       ========================================================= */

    function getGrowthStage(growthPercentage) {

        if (growthPercentage <= 0) {
            return {
                className: "plant-seed",
                title: "Seed planted",
                description: "A new memory has been planted."
            };
        }

        if (growthPercentage < 15) {
            return {
                className: "plant-sprout",
                title: "Beginning to sprout",
                description: "Your memory is beginning to grow."
            };
        }

        if (growthPercentage < 40) {
            return {
                className: "plant-young",
                title: "Growing",
                description: "Your memory is taking root."
            };
        }

        if (growthPercentage < 70) {
            return {
                className: "plant-growing",
                title: "Growing beautifully",
                description: "Leaves are reaching toward the light."
            };
        }

        if (growthPercentage < 100) {
            return {
                className: "plant-budding",
                title: "Almost blooming",
                description: "Something beautiful is about to bloom."
            };
        }

        return {
            className: "plant-bloomed",
            title: "Fully bloomed",
            description: "This memory has reached full bloom."
        };
    }

    /* =========================================================
       FLOWER TYPE
       ========================================================= */

    function getFlowerType(flowerName) {
        if (!flowerName) {
            return "daisy";
        }

        const name = String(flowerName).toLowerCase();

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

        const match = knownFlowers.find(
            flower =>
                name.includes(flower) ||
                flower.includes(name)
        );

        return match || "daisy";
    }

    /* =========================================================
       DATE FORMATTING
       ========================================================= */

    function formatDate(dateValue) {
        if (!dateValue) {
            return "Date unknown";
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "Date unknown";
        }

        return date.toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    /* =========================================================
       FLOWER IMAGE FOR MEMORY CARD
       
       IMPORTANT:
       This is ONLY for the memory card.
       The living plant below is NOT an image.
       ========================================================= */

    function getFlowerImage(memory) {
        if (!memory || !memory.flower_image) {
            return "";
        }

        return String(memory.flower_image);
    }

    /* =========================================================
       HTML ESCAPING
       ========================================================= */

    function escapeHtml(value) {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* =========================================================
       MEMORY CARD
       ========================================================= */

    function createMemoryCard(memory) {
        const flowerImage = getFlowerImage(memory);

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

        const imageHtml = flowerImage
            ? `
                <div class="memory-flower">
                    <img
                        src="${escapeHtml(flowerImage)}"
                        alt="${escapeHtml(flowerName)}"
                        loading="lazy"
                    >
                </div>
              `
            : `
                <div class="memory-flower memory-flower-placeholder">
                    <span>🌱</span>
                </div>
              `;

        return `
            <article class="memory-card">

                ${imageHtml}

                <div class="memory-card-content">

                    <p class="memory-flower-name">
                        ${escapeHtml(flowerName)}
                    </p>

                    <h3>
                        ${escapeHtml(
                            memory.title ||
                            "A Memory to Remember"
                        )}
                    </h3>

                    <p class="memory-text">
                        ${escapeHtml(memoryText)}
                    </p>

                    <div class="memory-card-footer">
                        <span>
                            ${escapeHtml(formatDate(memoryDate))}
                        </span>

                        <span class="memory-card-separator">•</span>

                        <span>
                            Planted in your garden
                        </span>
                    </div>

                </div>

            </article>
        `;
    }

    /* =========================================================
       CREATE CSS LIVING PLANT
       
       NO IMAGE IS USED HERE.
       
       The plant is made entirely from:
       - divs
       - spans
       - CSS
       - CSS animations
       ========================================================= */

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
            calculateDaysGrowing(memoryDate);

        const growthDays =
            getGrowthDays(flowerName);

        const growthPercentage =
            calculateGrowthPercentage(
                daysGrowing,
                growthDays
            );

        const stage =
            getGrowthStage(growthPercentage);

        const flowerType =
            getFlowerType(flowerName);

        /*
         * Stem growth:
         *
         * 0%   = tiny seed
         * 100% = full height
         */

        const stemHeight =
            Math.max(
                8,
                Math.round(
                    15 +
                    (growthPercentage / 100) * 135
                )
            );

        /*
         * Leaves begin appearing after 15%.
         */

        const leafProgress =
            Math.min(
                1,
                Math.max(
                    0,
                    (growthPercentage - 15) / 45
                )
            );

        /*
         * Flower begins appearing after 70%.
         */

        const flowerProgress =
            Math.min(
                1,
                Math.max(
                    0,
                    (growthPercentage - 70) / 30
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
                data-flower="${escapeHtml(flowerType)}"
            >

                <div class="living-plant-header">

                    <div>
                        <p class="living-plant-eyebrow">
                            MEMORY PLANTED
                        </p>

                        <h3>
                            ${escapeHtml(flowerName)}
                        </h3>
                    </div>

                    <div class="growth-percent">
                        ${growthPercentage}%
                    </div>

                </div>

                <div class="living-plant-stage">
                    ${escapeHtml(stage.title)}
                </div>

                <div
                    class="living-plant-world"
                    id="${plantId}"
                >

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

                        <!-- STEM -->

                        <span class="css-stem"></span>

                        <!-- LEFT LEAF -->

                        <span
                            class="
                                css-leaf
                                css-leaf-left
                            "
                        ></span>

                        <!-- RIGHT LEAF -->

                        <span
                            class="
                                css-leaf
                                css-leaf-right
                            "
                        ></span>

                        <!-- SMALL UPPER LEAVES -->

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

                        <!-- FLOWER -->

                        <span class="css-flower">

                            <span class="flower-petal petal-1"></span>
                            <span class="flower-petal petal-2"></span>
                            <span class="flower-petal petal-3"></span>
                            <span class="flower-petal petal-4"></span>
                            <span class="flower-petal petal-5"></span>
                            <span class="flower-petal petal-6"></span>

                            <span class="flower-center"></span>

                        </span>

                    </div>

                </div>

                <div class="living-plant-info">

                    <div class="growth-stat">
                        <strong>
                            ${daysGrowing}
                        </strong>

                        <span>
                            ${daysGrowing === 1 ? "day" : "days"} growing
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

                    <div class="growth-progress-track">
                        <div
                            class="growth-progress-bar"
                            style="width: ${growthPercentage}%"
                        ></div>
                    </div>

                    <div class="growth-progress-labels">
                        <span>Seed</span>
                        <span>Sprout</span>
                        <span>Leaves</span>
                        <span>Bloom</span>
                    </div>

                </div>

                <p class="living-plant-description">
                    ${escapeHtml(stage.description)}
                </p>

                <p class="living-plant-date">
                    Planted ${escapeHtml(formatDate(memoryDate))}
                </p>

            </article>
        `;
    }

    /* =========================================================
       RENDER LIVING GARDEN
       ========================================================= */

    function renderLivingGarden(memories) {

        if (!livingGardenGrid) {
            return;
        }

        livingGardenGrid.innerHTML = "";

        if (!memories || memories.length === 0) {

            if (livingGarden) {
                livingGarden.style.display = "none";
            }

            return;
        }

        if (livingGarden) {
            livingGarden.style.display = "";
        }

        memories.forEach(memory => {

            livingGardenGrid.insertAdjacentHTML(
                "beforeend",
                createLivingPlant(memory)
            );

        });

        /*
         * Start the growing animation after the plants
         * have been inserted into the page.
         */

        requestAnimationFrame(() => {

            setTimeout(() => {

                document
                    .querySelectorAll(".css-plant")
                    .forEach(plant => {
                        plant.classList.add("is-grown");
                    });

            }, 100);

        });
    }

    /* =========================================================
       LOAD MEMORIES
       ========================================================= */

    async function loadMemories() {

        if (!memoryGrid) {
            return;
        }

        memoryGrid.innerHTML = `
            <div class="garden-loading">
                <span class="loading-seed">🌱</span>
                <p>Walking through your garden...</p>
            </div>
        `;

        try {

            const response = await fetch(
                `/api/memories?username=${encodeURIComponent(currentUser)}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            /*
             * Get raw response first.
             * This prevents JSON.parse errors when the
             * server accidentally returns HTML.
             */

            const rawText = await response.text();

            let data;

            try {
                data = JSON.parse(rawText);
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
                Array.isArray(data.memories)
                    ? data.memories
                    : [];

            /* -------------------------------------------------
               MEMORY CARDS
               ------------------------------------------------- */

            if (memories.length === 0) {

                memoryGrid.innerHTML = "";

                if (emptyGarden) {
                    emptyGarden.style.display = "";
                }

            } else {

                if (emptyGarden) {
                    emptyGarden.style.display = "none";
                }

                memoryGrid.innerHTML =
                    memories
                        .map(createMemoryCard)
                        .join("");
            }

            /* -------------------------------------------------
               LIVING PLANTS
               ------------------------------------------------- */

            renderLivingGarden(memories);

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
                            Your garden is taking a little nap.
                        </h3>

                        <p>
                            We couldn't load your memories
                            right now.
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
                    document.getElementById("retryGarden");

                if (retryButton) {
                    retryButton.addEventListener(
                        "click",
                        loadMemories
                    );
                }
            }

            if (livingGardenGrid) {
                livingGardenGrid.innerHTML = "";
            }
        }
    }

    /* =========================================================
       START
       ========================================================= */

    loadMemories();

});