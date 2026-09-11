/* =========================================================
   TIMEBLOOM
   MEMORY GARDEN
   garden.js

   Features:
   - Uses the same login key as login.html
   - Loads memories from backend
   - Handles { success, memories } API response
   - Calculates flower growth from memory date
   - Shows growing/bloomed stages
   - Displays API flower images
   - Clickable flower passport
   - Flower facts
   - Flower personality
   - Memory information
========================================================= */


/* =========================================================
   USER
========================================================= */

const currentUser =
    localStorage.getItem(
        "timebloom_current"
    );


/* =========================================================
   PROTECT GARDEN
========================================================= */

if (!currentUser) {

    window.location.href =
        "login.html";

}


/* =========================================================
   FLOWER GROWTH PERIODS
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


/* =========================================================
   FLOWER SCIENTIFIC NAMES
========================================================= */

const FLOWER_SCIENTIFIC = {

    rose:
        "Rosa",

    tulip:
        "Tulipa",

    sunflower:
        "Helianthus annuus",

    daisy:
        "Bellis perennis",

    lily:
        "Lilium",

    orchid:
        "Orchidaceae",

    lavender:
        "Lavandula",

    jasmine:
        "Jasminum",

    marigold:
        "Tagetes",

    daffodil:
        "Narcissus",

    peony:
        "Paeonia",

    carnation:
        "Dianthus caryophyllus",

    chrysanthemum:
        "Chrysanthemum",

    hibiscus:
        "Hibiscus",

    hydrangea:
        "Hydrangea",

    gerbera:
        "Gerbera",

    poppy:
        "Papaver",

    iris:
        "Iris",

    gardenia:
        "Gardenia",

    violet:
        "Viola odorata"

};


/* =========================================================
   FLOWER PERSONALITIES
========================================================= */

const FLOWER_PERSONALITIES = {

    rose:
        "I'm dramatic, romantic and absolutely convinced I am the main character.",

    tulip:
        "I look delicate, but I have survived more spring seasons than your group chat.",

    sunflower:
        "I follow the sun. You follow deadlines. We are not the same.",

    daisy:
        "I keep things simple. Apparently that makes me the emotionally stable one here.",

    lily:
        "Elegant, calm and slightly mysterious. I know things, but I won't tell.",

    orchid:
        "I take my time. Excellence cannot be rushed.",

    lavender:
        "I bring peace everywhere I go. Someone has to.",

    jasmine:
        "I may be small, but I fully expect everyone to notice me.",

    marigold:
        "I arrived with sunshine and absolutely no intention of being subtle.",

    daffodil:
        "I bloom early because waiting for everyone else is not my thing.",

    peony:
        "I take a while to open up. Then suddenly... look at me.",

    carnation:
        "Classic, colourful and slightly underrated. My time will come.",

    chrysanthemum:
        "I have layers. Many, many layers.",

    hibiscus:
        "Tropical energy only. If it isn't colourful, I'm not interested.",

    hydrangea:
        "My mood changes with my environment. Honestly, relatable.",

    gerbera:
        "Life is too short not to be ridiculously cheerful.",

    poppy:
        "I may look soft, but I know how to make an entrance.",

    iris:
        "A little mysterious, a little dramatic and very confident.",

    gardenia:
        "I smell amazing and I know it.",

    violet:
        "Quiet doesn't mean forgettable."

};


/* =========================================================
   FLOWER FACTS
========================================================= */

const FLOWER_FACTS = {

    rose:
        "Roses have been cultivated for thousands of years and are associated with love and remembrance.",

    tulip:
        "Tulips originated in Central Asia and became hugely popular in Europe during the 17th century.",

    sunflower:
        "Young sunflowers track the sun across the sky, a behaviour known as heliotropism.",

    daisy:
        "What looks like one daisy flower is actually a collection of many tiny flowers.",

    lily:
        "Lilies have been cultivated for centuries and appear in many cultures as symbols of purity and renewal.",

    orchid:
        "Orchids are one of the largest families of flowering plants in the world.",

    lavender:
        "Lavender is famous for its fragrance and has been used traditionally for relaxation and perfumes.",

    jasmine:
        "Jasmine flowers are especially famous for their strong fragrance, particularly at night.",

    marigold:
        "Marigolds are commonly planted in gardens because their bright flowers attract pollinators.",

    daffodil:
        "Daffodils are among the first flowers to appear in many spring gardens.",

    peony:
        "Peonies can live for decades when planted in the right conditions.",

    carnation:
        "Carnations have been cultivated for more than 2,000 years.",

    chrysanthemum:
        "Chrysanthemums are one of the most widely cultivated ornamental flowers in the world.",

    hibiscus:
        "Hibiscus flowers can be found in tropical and subtropical regions around the world.",

    hydrangea:
        "Some hydrangeas can change flower colour depending on soil chemistry.",

    gerbera:
        "Gerbera daisies are known for their large, colourful flower heads.",

    poppy:
        "Poppies have delicate petals and are strongly associated with remembrance.",

    iris:
        "The iris is named after the Greek goddess associated with rainbows.",

    gardenia:
        "Gardenias are prized for their beautiful white flowers and powerful fragrance.",

    violet:
        "Violets are small but fragrant flowers that have been cultivated for centuries."

};


/* =========================================================
   FLOWER CARE
========================================================= */

const FLOWER_CARE = {

    rose: {
        light: "Bright sunlight",
        water: "Regular watering"
    },

    tulip: {
        light: "Full sunlight",
        water: "Moderate watering"
    },

    sunflower: {
        light: "Full sunlight",
        water: "Deep regular watering"
    },

    daisy: {
        light: "Full to partial sun",
        water: "Moderate watering"
    },

    lily: {
        light: "Bright indirect light",
        water: "Keep soil lightly moist"
    },

    orchid: {
        light: "Bright indirect light",
        water: "Light but consistent"
    },

    lavender: {
        light: "Full sunlight",
        water: "Allow soil to dry"
    },

    jasmine: {
        light: "Bright sunlight",
        water: "Regular watering"
    },

    marigold: {
        light: "Full sunlight",
        water: "Moderate watering"
    },

    daffodil: {
        light: "Full to partial sun",
        water: "Moderate watering"
    },

    peony: {
        light: "Full sunlight",
        water: "Moderate watering"
    },

    carnation: {
        light: "Full sunlight",
        water: "Moderate watering"
    },

    chrysanthemum: {
        light: "Bright sunlight",
        water: "Regular watering"
    },

    hibiscus: {
        light: "Bright sunlight",
        water: "Frequent watering"
    },

    hydrangea: {
        light: "Morning sun",
        water: "Keep soil moist"
    },

    gerbera: {
        light: "Bright sunlight",
        water: "Moderate watering"
    },

    poppy: {
        light: "Full sunlight",
        water: "Light watering"
    },

    iris: {
        light: "Full sunlight",
        water: "Moderate watering"
    },

    gardenia: {
        light: "Bright indirect light",
        water: "Consistent moisture"
    },

    violet: {
        light: "Bright indirect light",
        water: "Keep soil lightly moist"
    }

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const welcome =
    document.getElementById(
        "welcome"
    );

const logoutButton =
    document.getElementById(
        "logout"
    );

const gardenLoading =
    document.getElementById(
        "gardenLoading"
    );

const emptyGarden =
    document.getElementById(
        "emptyGarden"
    );

const livingGarden =
    document.getElementById(
        "livingGarden"
    );

const livingGardenGrid =
    document.getElementById(
        "livingGardenGrid"
    );

const memorySection =
    document.getElementById(
        "memorySection"
    );

const memoryGrid =
    document.getElementById(
        "memoryGrid"
    );

const totalPlants =
    document.getElementById(
        "totalPlants"
    );

const bloomedPlants =
    document.getElementById(
        "bloomedPlants"
    );

const growingPlants =
    document.getElementById(
        "growingPlants"
    );


/* =========================================================
   WELCOME MESSAGE
========================================================= */

if (welcome && currentUser) {

    welcome.textContent =
        currentUser.toUpperCase();

}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        () => {

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


/* =========================================================
   NORMALISE FLOWER NAME
========================================================= */

function getFlowerType(memory) {

    const possibleName =
        memory?.flower_id ||
        memory?.flower_name ||
        memory?.flowerName ||
        memory?.flower ||
        "";

    return String(
        possibleName
    )
        .toLowerCase()
        .trim()
        .replace(
            /[^a-z0-9]/g,
            ""
        );

}


/* =========================================================
   FLOWER DISPLAY NAME
========================================================= */

function getFlowerName(memory) {

    return (
        memory?.flower_name ||
        memory?.flowerName ||
        memory?.flower ||
        "Flower"
    );

}


/* =========================================================
   FLOWER IMAGE
========================================================= */

function getFlowerImage(
    memory,
    plant = null
) {

    const candidates = [

        memory?.flower_image,

        memory?.flowerImage,

        plant?.image_url,

        plant?.image,

        typeof plant?.default_image ===
            "string"
            ? plant.default_image
            : null,

        plant?.default_image?.medium_url,

        plant?.default_image?.original_url,

        plant?.default_image?.small_url

    ];


    const validImage =
        candidates.find(
            image =>
                typeof image ===
                    "string" &&
                image.trim() !== ""
        );


    return (
        validImage ||
        ""
    );

}


/* =========================================================
   GROWTH DAYS
========================================================= */

function getGrowthDays(
    memory
) {

    const type =
        getFlowerType(
            memory
        );


    return (
        PLANT_GROWTH_DAYS[type] ||
        45
    );

}


/* =========================================================
   CALCULATE DAYS GROWING
========================================================= */

function calculateDaysGrowing(
    memory
) {

    const dateValue =
        memory?.memory_date ||
        memory?.memoryDate ||
        memory?.created_at ||
        memory?.createdAt;


    if (!dateValue) {

        return 0;

    }


    const plantedDate =
        new Date(
            dateValue
        );


    if (
        Number.isNaN(
            plantedDate.getTime()
        )
    ) {

        return 0;

    }


    const now =
        new Date();


    const difference =
        now.getTime() -
        plantedDate.getTime();


    if (difference <= 0) {

        return 0;

    }


    return Math.floor(
        difference /
        (
            1000 *
            60 *
            60 *
            24
        )
    );

}


/* =========================================================
   GROWTH PERCENTAGE
========================================================= */

function calculateGrowthPercentage(
    memory
) {

    const days =
        calculateDaysGrowing(
            memory
        );


    const requiredDays =
        getGrowthDays(
            memory
        );


    const percentage =
        (
            days /
            requiredDays
        ) *
        100;


    return Math.min(
        100,
        Math.max(
            0,
            Math.round(
                percentage
            )
        )
    );

}


/* =========================================================
   GROWTH STAGE
========================================================= */

function getGrowthStage(
    memory
) {

    const percentage =
        calculateGrowthPercentage(
            memory
        );


    if (percentage >= 100) {

        return {
            label: "Bloomed",
            className: "bloomed"
        };

    }


    if (percentage >= 70) {

        return {
            label: "Blooming",
            className: "blooming"
        };

    }


    if (percentage >= 25) {

        return {
            label: "Growing",
            className: "growing"
        };

    }


    return {
        label: "Planted",
        className: "planted"
    };

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
    dateValue
) {

    if (!dateValue) {

        return "Unknown date";

    }


    const date =
        new Date(
            dateValue
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown date";

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
   FORMAT DAYS
========================================================= */

function formatAge(
    days
) {

    if (days === 0) {

        return "Planted today";

    }


    if (days === 1) {

        return "1 day old";

    }


    return `${days} days old`;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(
        value
    )
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


/* =========================================================
   FALLBACK FLOWER ICON
========================================================= */

function getFlowerEmoji(
    type
) {

    const emojis = {

        rose: "🌹",

        tulip: "🌷",

        sunflower: "🌻",

        daisy: "🌼",

        lily: "🌸",

        orchid: "🌺",

        lavender: "💜",

        jasmine: "🌼",

        marigold: "🌼",

        daffodil: "🌼",

        peony: "🌸",

        carnation: "🌸",

        chrysanthemum: "🌼",

        hibiscus: "🌺",

        hydrangea: "💠",

        gerbera: "🌼",

        poppy: "🌺",

        iris: "💜",

        gardenia: "🌼",

        violet: "💜"

    };


    return (
        emojis[type] ||
        "🌱"
    );

}


/* =========================================================
   LOAD PLANTS FROM API
========================================================= */

async function loadPlants() {

    try {

        const response =
            await fetch(
                "/api/plants"
            );


        if (!response.ok) {

            return [];

        }


        const result =
            await response.json();


        if (
            Array.isArray(
                result
            )
        ) {

            return result;

        }


        if (
            Array.isArray(
                result.data
            )
        ) {

            return result.data;

        }


        if (
            Array.isArray(
                result.plants
            )
        ) {

            return result.plants;

        }


        return [];

    } catch (error) {

        console.warn(
            "Could not load plant API:",
            error
        );

        return [];

    }

}


/* =========================================================
   FIND API PLANT
========================================================= */

function findPlant(
    memory,
    plants
) {

    if (
        !Array.isArray(
            plants
        )
    ) {

        return null;

    }


    const memoryId =
        String(
            memory?.flower_id ||
            ""
        ).toLowerCase();


    const memoryName =
        String(
            memory?.flower_name ||
            memory?.flowerName ||
            ""
        ).toLowerCase();


    return (
        plants.find(
            plant =>
                String(
                    plant?.id ||
                    ""
                ).toLowerCase() ===
                memoryId
        ) ||
        plants.find(
            plant =>
                String(
                    plant?.name ||
                    plant?.common_name ||
                    ""
                ).toLowerCase() ===
                memoryName
        ) ||
        null
    );

}


/* =========================================================
   LOAD MEMORIES
========================================================= */

async function loadMemories() {

    try {

        if (!currentUser) {

            window.location.href =
                "login.html";

            return;

        }


        const plants =
            await loadPlants();


        const response =
            await fetch(
                `/api/memories?username=${encodeURIComponent(
                    currentUser
                )}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load your memories."
            );

        }


        const result =
            await response.json();


        /*
         * IMPORTANT:
         *
         * Your backend returns:
         *
         * {
         *     success: true,
         *     memories: [...]
         * }
         *
         * So we must read result.memories.
         */

        let memories = [];


        if (
            Array.isArray(
                result
            )
        ) {

            memories =
                result;

        } else if (
            Array.isArray(
                result?.memories
            )
        ) {

            memories =
                result.memories;

        }


        memories =
            memories.map(
                memory => {

                    return {

                        ...memory,

                        apiPlant:
                            findPlant(
                                memory,
                                plants
                            )

                    };

                }
            );


        /*
         * Sort newest memories first.
         */

        memories.sort(
            (
                first,
                second
            ) => {

                const firstDate =
                    new Date(
                        first.memory_date ||
                        first.created_at ||
                        0
                    );


                const secondDate =
                    new Date(
                        second.memory_date ||
                        second.created_at ||
                        0
                    );


                return (
                    secondDate -
                    firstDate
                );

            }
        );


        updateStatistics(
            memories
        );


        hideLoading();


        if (
            memories.length === 0
        ) {

            showEmptyGarden();

            return;

        }


        showGarden();


        renderLivingGarden(
            memories
        );


        renderMemoryCards(
            memories
        );


    } catch (error) {

        console.error(
            "Garden loading error:",
            error
        );


        hideLoading();


        /*
         * Show a useful message
         * rather than leaving a blank page.
         */

        if (emptyGarden) {

            emptyGarden.hidden =
                false;


            emptyGarden.innerHTML = `

                <div class="empty-flower">
                    🌱
                </div>

                <p class="eyebrow">
                    SOMETHING WENT WRONG
                </p>

                <h2>
                    Your garden is
                    <em>taking a moment.</em>
                </h2>

                <p>
                    We couldn't load your memories right now.
                    Please refresh the page and try again.
                </p>

                <button
                    class="empty-button"
                    onclick="location.reload()"
                >
                    Try again →
                </button>

            `;

        }

    }

}


/* =========================================================
   HIDE LOADING
========================================================= */

function hideLoading() {

    if (gardenLoading) {

        gardenLoading.hidden =
            true;

    }

}


/* =========================================================
   SHOW EMPTY GARDEN
========================================================= */

function showEmptyGarden() {

    if (emptyGarden) {

        emptyGarden.hidden =
            false;

    }


    if (livingGarden) {

        livingGarden.hidden =
            true;

    }


    if (memorySection) {

        memorySection.hidden =
            true;

    }

}


/* =========================================================
   SHOW GARDEN
========================================================= */

function showGarden() {

    if (emptyGarden) {

        emptyGarden.hidden =
            true;

    }


    if (livingGarden) {

        livingGarden.hidden =
            false;

    }


    if (memorySection) {

        memorySection.hidden =
            false;

    }

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics(
    memories
) {

    const total =
        memories.length;


    const bloomed =
        memories.filter(
            memory =>
                getGrowthStage(
                    memory
                ).label ===
                "Bloomed"
        ).length;


    const growing =
        memories.filter(
            memory =>
                getGrowthStage(
                    memory
                ).label !==
                "Bloomed"
        ).length;


    if (totalPlants) {

        totalPlants.textContent =
            total;

    }


    if (bloomedPlants) {

        bloomedPlants.textContent =
            bloomed;

    }


    if (growingPlants) {

        growingPlants.textContent =
            growing;

    }

}


/* =========================================================
   RENDER LIVING GARDEN
========================================================= */

function renderLivingGarden(
    memories
) {

    if (!livingGardenGrid) {

        return;

    }


    livingGardenGrid.innerHTML =
        "";


    memories.forEach(
        memory => {

            const card =
                createFlowerCard(
                    memory
                );


            livingGardenGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CREATE FLOWER CARD
========================================================= */

function createFlowerCard(
    memory
) {

    const element =
        document.createElement(
            "article"
        );


    const type =
        getFlowerType(
            memory
        );


    const flowerName =
        getFlowerName(
            memory
        );


    const image =
        getFlowerImage(
            memory,
            memory.apiPlant
        );


    const percentage =
        calculateGrowthPercentage(
            memory
        );


    const days =
        calculateDaysGrowing(
            memory
        );


    const stage =
        getGrowthStage(
            memory
        );


    const title =
        memory?.title ||
        "A special memory";


    element.className =
        "living-plant-world";


    element.tabIndex =
        0;


    element.setAttribute(
        "role",
        "button"
    );


    element.setAttribute(
        "aria-label",
        `Open ${flowerName} memory`
    );


    const imageHTML =
        image
            ? `
                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(flowerName)}"
                    loading="lazy"
                    onerror="this.parentElement.innerHTML='<div class=&quot;plant-fallback&quot;>${getFlowerEmoji(type)}</div>'"
                >
              `
            : `
                <div class="plant-fallback">
                    ${getFlowerEmoji(type)}
                </div>
              `;


    element.innerHTML = `

        <span
            class="plant-stage ${stage.className}"
        >
            ${stage.label}
        </span>


        <div class="plant-image-wrap">

            ${imageHTML}

        </div>


        <div class="plant-info">

            <h3>
                ${escapeHTML(
                    flowerName
                )}
            </h3>


            <p class="plant-date">
                Planted
                ${escapeHTML(
                    formatDate(
                        memory.memory_date
                    )
                )}
            </p>


            <p class="plant-memory-title">
                “${escapeHTML(
                    title
                )}”
            </p>


            <div class="plant-growth">

                <div class="plant-growth-top">

                    <span>
                        ${formatAge(
                            days
                        )}
                    </span>

                    <strong>
                        ${percentage}%
                    </strong>

                </div>


                <div class="plant-growth-track">

                    <div
                        class="plant-growth-progress"
                        style="width:${percentage}%"
                    ></div>

                </div>

            </div>

        </div>

    `;


    /*
     * Click
     */

    element.addEventListener(
        "click",
        () => {

            openPlantModal(
                memory
            );

        }
    );


    /*
     * Keyboard accessibility
     */

    element.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                    "Enter" ||
                event.key ===
                    " "
            ) {

                event.preventDefault();

                openPlantModal(
                    memory
                );

            }

        }
    );


    return element;

}


/* =========================================================
   RENDER MEMORY CARDS
========================================================= */

function renderMemoryCards(
    memories
) {

    if (!memoryGrid) {

        return;

    }


    memoryGrid.innerHTML =
        "";


    memories.forEach(
        memory => {

            const card =
                createMemoryCard(
                    memory
                );


            memoryGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CREATE MEMORY CARD
========================================================= */

function createMemoryCard(
    memory
) {

    const card =
        document.createElement(
            "article"
        );


    const type =
        getFlowerType(
            memory
        );


    const image =
        getFlowerImage(
            memory,
            memory.apiPlant
        );


    const stage =
        getGrowthStage(
            memory
        );


    const flowerName =
        getFlowerName(
            memory
        );


    const title =
        memory?.title ||
        "A special memory";


    const text =
        memory?.memory_text ||
        memory?.memoryText ||
        memory?.memory ||
        "A memory planted in TIMEBLOOM.";


    card.className =
        "memory-card";


    const thumbnail =
        image
            ? `
                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(flowerName)}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >
              `
            : `
                <div
                    style="
                        width:100%;
                        height:100%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:24px;
                        background:#e8eee4;
                    "
                >
                    ${getFlowerEmoji(type)}
                </div>
              `;


    card.innerHTML = `

        <div class="memory-card-top">

            <div class="memory-thumbnail">

                ${thumbnail}

            </div>


            <div>

                <h3>
                    ${escapeHTML(
                        title
                    )}
                </h3>

                <p class="memory-card-date">

                    ${escapeHTML(
                        formatDate(
                            memory.memory_date
                        )
                    )}

                </p>

            </div>

        </div>


        <p class="memory-card-text">

            ${escapeHTML(
                text
            )}

        </p>


        <div class="memory-card-footer">

            <span class="memory-stage">

                ${escapeHTML(
                    flowerName
                )}
                ·
                ${escapeHTML(
                    stage.label
                )}

            </span>


            <button
                class="view-memory"
                type="button"
            >
                View flower →
            </button>

        </div>

    `;


    const viewButton =
        card.querySelector(
            ".view-memory"
        );


    if (viewButton) {

        viewButton.addEventListener(
            "click",
            () => {

                openPlantModal(
                    memory
                );

            }
        );

    }


    return card;

}


/* =========================================================
   MODAL ELEMENTS
========================================================= */

const plantModal =
    document.getElementById(
        "plantModal"
    );

const closePlantModal =
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

const plantModalPercentage =
    document.getElementById(
        "plantModalPercentage"
    );

const plantModalProgress =
    document.getElementById(
        "plantModalProgress"
    );

const plantModalStageBadge =
    document.getElementById(
        "plantModalStageBadge"
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


/* =========================================================
   OPEN PLANT MODAL
========================================================= */

function openPlantModal(
    memory
) {

    if (!plantModal) {

        return;

    }


    const type =
        getFlowerType(
            memory
        );


    const flowerName =
        getFlowerName(
            memory
        );


    const image =
        getFlowerImage(
            memory,
            memory.apiPlant
        );


    const days =
        calculateDaysGrowing(
            memory
        );


    const percentage =
        calculateGrowthPercentage(
            memory
        );


    const stage =
        getGrowthStage(
            memory
        );


    const care =
        FLOWER_CARE[type] || {

            light:
                "Bright natural light",

            water:
                "Moderate watering"

        };


    const scientific =
        FLOWER_SCIENTIFIC[type] ||
        memory?.apiPlant?.scientific_name ||
        memory?.apiPlant?.scientificName ||
        "Beautifully unique";


    const personality =
        FLOWER_PERSONALITIES[type] ||
        "Every flower has a story. This one is yours.";


    const fact =
        memory?.flower_fact ||
        memory?.flowerFact ||
        FLOWER_FACTS[type] ||
        "Every flower carries its own little story.";


    const memoryTitle =
        memory?.title ||
        "A special memory";


    const memoryText =
        memory?.memory_text ||
        memory?.memoryText ||
        memory?.memory ||
        "This memory is growing quietly in your garden.";


    if (plantModalImage) {

        if (image) {

            plantModalImage.src =
                image;

            plantModalImage.alt =
                flowerName;

            plantModalImage.style.display =
                "block";

        } else {

            plantModalImage.removeAttribute(
                "src"
            );

            plantModalImage.alt =
                "";

            plantModalImage.style.display =
                "none";

        }

    }


    if (plantModalName) {

        plantModalName.textContent =
            flowerName;

    }


    if (plantModalScientific) {

        plantModalScientific.textContent =
            scientific;

    }


    if (plantModalFunny) {

        plantModalFunny.textContent =
            personality;

    }


    if (plantModalFact) {

        plantModalFact.textContent =
            fact;

    }


    if (plantModalLight) {

        plantModalLight.textContent =
            care.light;

    }


    if (plantModalWater) {

        plantModalWater.textContent =
            care.water;

    }


    if (plantModalAge) {

        plantModalAge.textContent =
            formatAge(
                days
            );

    }


    if (plantModalStage) {

        plantModalStage.textContent =
            stage.label;

    }


    if (plantModalStageBadge) {

        plantModalStageBadge.textContent =
            stage.label.toUpperCase();

    }


    if (plantModalPercentage) {

        plantModalPercentage.textContent =
            `${percentage}%`;

    }


    if (plantModalProgress) {

        plantModalProgress.style.width =
            `${percentage}%`;

    }


    if (plantModalMemoryTitle) {

        plantModalMemoryTitle.textContent =
            memoryTitle;

    }


    if (plantModalMemoryText) {

        plantModalMemoryText.textContent =
            memoryText;

    }


    if (plantModalMemoryDate) {

        plantModalMemoryDate.textContent =
            formatDate(
                memory.memory_date
            );

    }


    plantModal.classList.add(
        "active"
    );


    plantModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    if (!plantModal) {

        return;

    }


    plantModal.classList.remove(
        "active"
    );


    plantModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closePlantModal) {

    closePlantModal.addEventListener(
        "click",
        closeModal
    );

}


/* =========================================================
   BACKDROP CLICK
========================================================= */

if (plantModal) {

    plantModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                plantModal
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   START GARDEN
========================================================= */

loadMemories();