/* =========================================================
   TIMEBLOOM
   MEMORY GARDEN
========================================================= */


/* =========================================================
   CURRENT USER
========================================================= */

const currentUser =
    localStorage.getItem("timebloom_current");


if (!currentUser) {

    window.location.href = "login.html";

}


/* =========================================================
   FLOWER GROWTH INFORMATION
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
   SCIENTIFIC NAMES
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
        "Viola"

};


/* =========================================================
   FLOWER PERSONALITIES
========================================================= */

const FLOWER_PERSONALITIES = {

    rose:
        "The romantic one — passionate, thoughtful and never afraid to make a statement.",

    tulip:
        "The cheerful optimist — simple, bright and always ready for a fresh beginning.",

    sunflower:
        "The sunshine friend — warm, energetic and naturally drawn toward happy moments.",

    daisy:
        "The gentle soul — playful, uncomplicated and happiest when surrounded by good memories.",

    lily:
        "The graceful one — calm, elegant and quietly unforgettable.",

    orchid:
        "The mysterious perfectionist — unique, delicate and a little bit dramatic.",

    lavender:
        "The peaceful one — calm, comforting and happiest when everything feels just right.",

    jasmine:
        "The sweet storyteller — soft, warm and memorable long after the moment has passed.",

    marigold:
        "The little ray of sunshine — bold, energetic and impossible to ignore.",

    daffodil:
        "The hopeful one — always bringing a sense of new beginnings.",

    peony:
        "The soft-hearted dreamer — generous, romantic and wonderfully sentimental.",

    carnation:
        "The loyal friend — dependable, affectionate and full of lasting memories.",

    chrysanthemum:
        "The wise one — thoughtful, resilient and quietly full of character.",

    hibiscus:
        "The adventurous one — colourful, confident and happiest when life feels exciting.",

    hydrangea:
        "The mood-maker — sensitive, expressive and always changing with the seasons.",

    gerbera:
        "The joyful one — playful, colourful and determined to make people smile.",

    poppy:
        "The free spirit — delicate-looking but surprisingly brave.",

    iris:
        "The creative soul — imaginative, expressive and always seeing beauty differently.",

    gardenia:
        "The classic romantic — elegant, warm and beautifully timeless.",

    violet:
        "The quiet achiever — modest, thoughtful and stronger than it first appears."

};


/* =========================================================
   FLOWER FACTS
========================================================= */

const FLOWER_FACTS = {

    rose:
        "Roses have been cultivated by humans for thousands of years and come in thousands of varieties.",

    tulip:
        "Tulips originated in Central Asia before becoming famous through Dutch cultivation.",

    sunflower:
        "Young sunflowers naturally turn toward the sun as they grow.",

    daisy:
        "The name daisy comes from the phrase 'day's eye' because the flower opens with daylight.",

    lily:
        "Lilies are grown from bulbs and many species produce large, fragrant flowers.",

    orchid:
        "Orchids are one of the largest families of flowering plants in the world.",

    lavender:
        "Lavender has been used for centuries for its fragrance and calming scent.",

    jasmine:
        "Many jasmine species produce intensely fragrant flowers, especially in the evening.",

    marigold:
        "Marigolds are often planted alongside vegetables because their scent can help deter some pests.",

    daffodil:
        "Daffodils are among the first flowers associated with spring in many parts of the world.",

    peony:
        "Peonies can live for decades when planted in the right conditions.",

    carnation:
        "Carnations have been cultivated for more than 2,000 years.",

    chrysanthemum:
        "Chrysanthemums have been cultivated in China for more than 2,500 years.",

    hibiscus:
        "Hibiscus flowers can be found in tropical and subtropical regions around the world.",

    hydrangea:
        "Some hydrangeas can change flower colour depending on soil chemistry.",

    gerbera:
        "Gerberas belong to the sunflower family, Asteraceae.",

    poppy:
        "Poppies produce some of the most recognisable cup-shaped flowers in gardens.",

    iris:
        "The iris is named after the Greek goddess associated with the rainbow.",

    gardenia:
        "Gardenias are famous for their powerful fragrance and glossy green leaves.",

    violet:
        "Violets are small flowering plants known for their heart-shaped leaves and delicate flowers."

};


/* =========================================================
   FLOWER CARE
========================================================= */

const FLOWER_CARE = {

    rose: {
        light: "6–8 hours of sunlight",
        water: "Water deeply when the soil begins to dry."
    },

    tulip: {
        light: "Full sun to partial shade",
        water: "Keep soil lightly moist but never waterlogged."
    },

    sunflower: {
        light: "Full direct sunlight",
        water: "Water deeply, especially while young."
    },

    daisy: {
        light: "Full sun",
        water: "Moderate watering when the soil is dry."
    },

    lily: {
        light: "Bright light or morning sun",
        water: "Keep soil evenly moist."
    },

    orchid: {
        light: "Bright indirect light",
        water: "Allow roots to partially dry between watering."
    },

    lavender: {
        light: "Full sunlight",
        water: "Water lightly and allow soil to dry."
    },

    jasmine: {
        light: "Bright light with some direct sun",
        water: "Keep soil lightly moist."
    },

    marigold: {
        light: "Full sunlight",
        water: "Moderate watering."
    },

    daffodil: {
        light: "Full sun to partial shade",
        water: "Keep soil moist during growth."
    },

    peony: {
        light: "Full morning sun",
        water: "Deep watering during dry periods."
    },

    carnation: {
        light: "Full sunlight",
        water: "Water when the top soil feels dry."
    },

    chrysanthemum: {
        light: "Full sun",
        water: "Keep soil consistently moist."
    },

    hibiscus: {
        light: "Bright direct sunlight",
        water: "Water regularly during active growth."
    },

    hydrangea: {
        light: "Morning sun and afternoon shade",
        water: "Needs regular, generous watering."
    },

    gerbera: {
        light: "Bright sunlight",
        water: "Water when the surface begins to dry."
    },

    poppy: {
        light: "Full sun",
        water: "Moderate watering; avoid soggy soil."
    },

    iris: {
        light: "Full sun",
        water: "Moderate watering."
    },

    gardenia: {
        light: "Bright indirect light",
        water: "Keep soil consistently moist."
    },

    violet: {
        light: "Bright indirect light",
        water: "Keep soil lightly moist."
    }

};


/* =========================================================
   FLOWER EMOJIS
   Used only as fallback.
========================================================= */

const FLOWER_EMOJIS = {

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
    gerbera: "🌸",
    poppy: "🌺",
    iris: "💜",
    gardenia: "🌼",
    violet: "💜"

};


/* =========================================================
   DOM
========================================================= */

const welcome =
    document.getElementById("welcome");

const logout =
    document.getElementById("logout");

const totalPlants =
    document.getElementById("totalPlants");

const bloomedPlants =
    document.getElementById("bloomedPlants");

const growingPlants =
    document.getElementById("growingPlants");

const gardenLoading =
    document.getElementById("gardenLoading");

const emptyGarden =
    document.getElementById("emptyGarden");

const livingGarden =
    document.getElementById("livingGarden");

const livingGardenGrid =
    document.getElementById("livingGardenGrid");

const memorySection =
    document.getElementById("memorySection");

const memoryGrid =
    document.getElementById("memoryGrid");


/* =========================================================
   CURRENT MEMORY
========================================================= */

let selectedMemory = null;

let allMemories = [];

let allPlants = [];


/* =========================================================
   WELCOME
========================================================= */

function getUsername() {

    if (!currentUser) {
        return "GARDENER";
    }

    try {

        const parsed =
            JSON.parse(currentUser);

        return (
            parsed.username ||
            parsed.name ||
            parsed.email ||
            "GARDENER"
        ).toString();

    } catch {

        return currentUser
            .toString()
            .split("@")[0];

    }

}


if (welcome) {

    welcome.textContent =
        getUsername().toUpperCase();

}


/* =========================================================
   LOGOUT
========================================================= */

if (logout) {

    logout.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "timebloom_current"
            );

            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   SAFE TEXT
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   NORMALISE FLOWER NAME
========================================================= */

function normaliseFlower(value) {

    return String(
        value ?? ""
    )
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, "");

}


/* =========================================================
   GET FLOWER TYPE
========================================================= */

function getFlowerType(memory) {

    const candidates = [

        memory?.flower_name,

        memory?.flowerName,

        memory?.flower,

        memory?.plant_name,

        memory?.plantName,

        memory?.apiPlant?.name,

        memory?.apiPlant?.common_name,

        memory?.apiPlant?.commonName,

        memory?.flower_id

    ];


    for (
        const candidate
        of candidates
    ) {

        const type =
            normaliseFlower(candidate);


        if (
            type &&
            Object.prototype.hasOwnProperty.call(
                PLANT_GROWTH_DAYS,
                type
            )
        ) {

            return type;

        }

    }


    for (
        const candidate
        of candidates
    ) {

        const type =
            normaliseFlower(candidate);


        if (type) {
            return type;
        }

    }


    return "generic";

}


/* =========================================================
   GET FLOWER NAME
========================================================= */

function getFlowerName(memory) {

    return (
        memory?.flower_name ||
        memory?.flowerName ||
        memory?.apiPlant?.name ||
        memory?.apiPlant?.common_name ||
        memory?.apiPlant?.commonName ||
        memory?.flower ||
        "Flower"
    );

}


/* =========================================================
   GET FLOWER IMAGE
========================================================= */

function getFlowerImage(memory) {

    return (
        memory?.flower_image ||
        memory?.flowerImage ||
        memory?.image ||
        memory?.image_url ||
        memory?.imageUrl ||
        memory?.apiPlant?.image ||
        memory?.apiPlant?.image_url ||
        memory?.apiPlant?.imageUrl ||
        ""
    );

}


/* =========================================================
   GET MEMORY DATE
========================================================= */

function getMemoryDate(memory) {

    return (
        memory?.memory_date ||
        memory?.memoryDate ||
        memory?.date ||
        memory?.planted_at ||
        memory?.plantedAt ||
        memory?.created_at ||
        memory?.createdAt ||
        new Date().toISOString()
    );

}


/* =========================================================
   CALCULATE AGE
========================================================= */

function calculateAgeInDays(memory) {

    const rawDate =
        getMemoryDate(memory);

    const plantedDate =
        new Date(rawDate);

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


    return Math.max(
        0,
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        )
    );

}


/* =========================================================
   GROWTH PERCENTAGE
========================================================= */

function calculateGrowthPercentage(memory) {

    const type =
        getFlowerType(memory);

    const totalDays =
        PLANT_GROWTH_DAYS[type] ||
        45;

    const age =
        calculateAgeInDays(memory);

    return Math.min(
        100,
        Math.round(
            (age / totalDays) * 100
        )
    );

}


/* =========================================================
   GROWTH STAGE
========================================================= */

function getGrowthStage(memory) {

    const percentage =
        calculateGrowthPercentage(memory);


    if (percentage >= 100) {

        return {
            key: "bloomed",
            label: "BLOOMED"
        };

    }


    if (percentage >= 70) {

        return {
            key: "blooming",
            label: "BLOOMING"
        };

    }


    if (percentage >= 25) {

        return {
            key: "growing",
            label: "GROWING"
        };

    }


    return {
        key: "planted",
        label: "PLANTED"
    };

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateValue) {

    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";

    }


    return date.toLocaleDateString(
        undefined,
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   GET FLOWER EMOJI
========================================================= */

function getFlowerEmoji(type) {

    return (
        FLOWER_EMOJIS[type] ||
        "🌱"
    );

}


/* =========================================================
   CREATE THE ACTUAL PLANT
========================================================= */

function createAnimatedPlant(
    memory,
    compact = false
) {

    const type =
        getFlowerType(memory);

    const knownType =
        Object.prototype.hasOwnProperty.call(
            PLANT_GROWTH_DAYS,
            type
        )
        ? type
        : "generic";


    const percentage =
        calculateGrowthPercentage(memory);

    const stage =
        getGrowthStage(memory);


    const plant =
        document.createElement("div");


    plant.className =
        `animated-plant plant-${knownType}`;


    if (compact) {

        plant.classList.add(
            "compact-plant"
        );

    }


    plant.innerHTML = `

        <div class="plant-stem"></div>

        <div class="plant-leaf leaf-left"></div>

        <div class="plant-leaf leaf-right"></div>

        <div class="plant-flower">

        </div>

    `;


    return plant;

}


/* =========================================================
   CREATE PLANT WORLD
========================================================= */

function createPlantWorld(memory) {

    const type =
        getFlowerType(memory);

    const knownType =
        Object.prototype.hasOwnProperty.call(
            PLANT_GROWTH_DAYS,
            type
        )
        ? type
        : "generic";


    const percentage =
        calculateGrowthPercentage(memory);

    const stage =
        getGrowthStage(memory);


    const world =
        document.createElement("div");


    world.className =
        `plant-stage-area visual-${stage.key}`;


    world.dataset.flower =
        knownType;


    const ground =
        document.createElement("div");


    ground.className =
        "plant-ground";


    const plant =
        createAnimatedPlant(
            memory
        );


    world.appendChild(
        ground
    );

    world.appendChild(
        plant
    );


    /*
     * The actual growth stage changes
     * how much of the plant is visually
     * developed.
     */

    if (
        stage.key === "planted"
    ) {

        plant.style.filter =
            "saturate(0.65)";

        plant.style.opacity =
            "0.72";

    }


    if (
        stage.key === "growing"
    ) {

        plant.style.transform =
            "scale(.82) translateY(12px)";

    }


    if (
        stage.key === "blooming"
    ) {

        plant.style.transform =
            "scale(.93)";

    }


    if (
        stage.key === "bloomed"
    ) {

        plant.style.transform =
            "scale(1)";

    }


    return world;

}


/* =========================================================
   CREATE FLOWER CARD
========================================================= */

function createFlowerCard(memory) {

    const type =
        getFlowerType(memory);

    const flowerName =
        getFlowerName(memory);

    const percentage =
        calculateGrowthPercentage(memory);

    const stage =
        getGrowthStage(memory);


    const card =
        document.createElement("article");


    card.className =
        "living-plant-world";


    card.setAttribute(
        "tabindex",
        "0"
    );


    card.setAttribute(
        "role",
        "button"
    );


    card.setAttribute(
        "aria-label",
        `Open ${flowerName} memory`
    );


    const stageArea =
        createPlantWorld(memory);


    const stageBadge =
        document.createElement("div");


    stageBadge.className =
        `plant-stage ${
            stage.key === "bloomed"
                ? "bloomed"
                : ""
        }`;


    stageBadge.textContent =
        stage.label;


    stageArea.appendChild(
        stageBadge
    );


    const info =
        document.createElement("div");


    info.className =
        "plant-info";


    const memoryTitle =
        memory?.title ||
        memory?.memory_title ||
        memory?.memoryTitle ||
        "A special memory";


    info.innerHTML = `

        <h3>
            ${escapeHTML(flowerName)}
        </h3>

        <div class="plant-date">
            ${escapeHTML(
                formatDate(
                    getMemoryDate(memory)
                )
            )}
        </div>

        <div class="plant-memory-title">
            ${escapeHTML(memoryTitle)}
        </div>

        <div class="plant-growth">

            <div class="plant-growth-top">

                <span>
                    GROWTH
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

    `;


    card.appendChild(
        stageArea
    );

    card.appendChild(
        info
    );


    card.addEventListener(
        "click",
        () => {

            openPlantModal(
                memory
            );

        }
    );


    card.addEventListener(
        "keydown",
        event => {

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


    return card;

}


/* =========================================================
   CREATE MEMORY BOOK COVER
========================================================= */

function createMemoryBook(memory) {

    const type =
        getFlowerType(memory);

    const flowerName =
        getFlowerName(memory);

    const memoryTitle =
        memory?.title ||
        memory?.memory_title ||
        memory?.memoryTitle ||
        "A special memory";


    const book =
        document.createElement("article");


    book.className =
        "memory-book";


    book.setAttribute(
        "tabindex",
        "0"
    );


    book.setAttribute(
        "role",
        "button"
    );


    const cover =
        document.createElement("div");


    cover.className =
        "memory-book-cover";


    const flowerContainer =
        document.createElement("div");


    flowerContainer.className =
        "book-cover-flower";


    const miniPlant =
        createAnimatedPlant(
            memory,
            true
        );


    flowerContainer.appendChild(
        miniPlant
    );


    cover.innerHTML = `

        <span class="book-cover-small">
            A MEMORY FROM YOUR LIFE
        </span>

    `;


    cover.appendChild(
        flowerContainer
    );


    const title =
        document.createElement("div");


    title.innerHTML = `

        <div class="book-cover-title">
            ${escapeHTML(memoryTitle)}
        </div>

        <div class="book-cover-date">
            ${escapeHTML(
                formatDate(
                    getMemoryDate(memory)
                )
            )}
        </div>

    `;


    cover.appendChild(
        title
    );


    const bottom =
        document.createElement("div");


    bottom.className =
        "book-cover-bottom";


    bottom.textContent =
        `TIMEBLOOM • ${flowerName}`;


    cover.appendChild(
        bottom
    );


    book.appendChild(
        cover
    );


    book.addEventListener(
        "click",
        () => {

            openMemoryBook(
                memory
            );

        }
    );


    book.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openMemoryBook(
                    memory
                );

            }

        }
    );


    return book;

}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStatistics(memories) {

    const total =
        memories.length;


    let bloomed = 0;


    memories.forEach(
        memory => {

            const stage =
                getGrowthStage(memory);


            if (
                stage.key === "bloomed"
            ) {

                bloomed++;

            }

        }
    );


    const growing =
        Math.max(
            0,
            total - bloomed
        );


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
   FIND API PLANT
========================================================= */

function findPlant(memory) {

    if (!Array.isArray(allPlants)) {
        return null;
    }


    const flowerId =
        String(
            memory?.flower_id ??
            memory?.flowerId ??
            ""
        );


    const flowerName =
        String(
            memory?.flower_name ??
            memory?.flowerName ??
            memory?.flower ??
            ""
        )
            .toLowerCase()
            .trim();


    return (
        allPlants.find(
            plant => {

                const plantId =
                    String(
                        plant?.id ??
                        plant?._id ??
                        ""
                    );


                return (
                    flowerId &&
                    plantId === flowerId
                );

            }
        ) ||

        allPlants.find(
            plant => {

                const plantName =
                    String(
                        plant?.name ??
                        plant?.common_name ??
                        plant?.commonName ??
                        ""
                    )
                        .toLowerCase()
                        .trim();


                return (
                    flowerName &&
                    plantName === flowerName
                );

            }
        ) ||

        null
    );

}


/* =========================================================
   LOAD PLANTS
========================================================= */

async function loadPlants() {

    try {

        const response =
            await fetch(
                "/api/plants"
            );


        if (!response.ok) {
            throw new Error(
                "Unable to load plants."
            );
        }


        const result =
            await response.json();


        if (Array.isArray(result)) {

            allPlants =
                result;

        } else if (
            Array.isArray(result?.data)
        ) {

            allPlants =
                result.data;

        } else if (
            Array.isArray(result?.plants)
        ) {

            allPlants =
                result.plants;

        } else {

            allPlants = [];

        }

    } catch (error) {

        console.error(
            "Plant API error:",
            error
        );

        allPlants = [];

    }

}


/* =========================================================
   LOAD MEMORIES
========================================================= */

async function loadMemories() {

    try {

        const username =
            getUsername();


        const response =
            await fetch(
                `/api/memories?username=${encodeURIComponent(username)}`
            );


        if (!response.ok) {
            throw new Error(
                "Unable to load memories."
            );
        }


        const result =
            await response.json();


        let memories = [];


        if (
            Array.isArray(result)
        ) {

            memories =
                result;

        } else if (
            Array.isArray(result?.memories)
        ) {

            memories =
                result.memories;

        } else if (
            Array.isArray(result?.data)
        ) {

            memories =
                result.data;

        }


        allMemories =
            memories.map(
                memory => {

                    const apiPlant =
                        findPlant(
                            memory
                        );


                    return {
                        ...memory,
                        apiPlant
                    };

                }
            );


        allMemories.sort(
            (a, b) => {

                return (
                    new Date(
                        getMemoryDate(b)
                    ) -
                    new Date(
                        getMemoryDate(a)
                    )
                );

            }
        );


        updateStatistics(
            allMemories
        );


        renderGarden(
            allMemories
        );


    } catch (error) {

        console.error(
            "Memory loading error:",
            error
        );


        allMemories = [];


        updateStatistics(
            []
        );


        renderGarden(
            []
        );

    }

}


/* =========================================================
   RENDER GARDEN
========================================================= */

function renderGarden(memories) {

    if (gardenLoading) {

        gardenLoading.hidden =
            true;

    }


    if (!memories.length) {

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


        return;

    }


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


    if (livingGardenGrid) {

        livingGardenGrid.innerHTML =
            "";

        memories.forEach(
            memory => {

                livingGardenGrid.appendChild(
                    createFlowerCard(
                        memory
                    )
                );

            }
        );

    }


    if (memoryGrid) {

        memoryGrid.innerHTML =
            "";

        memories.forEach(
            memory => {

                memoryGrid.appendChild(
                    createMemoryBook(
                        memory
                    )
                );

            }
        );

    }

}


/* =========================================================
   PLANT PASSPORT ELEMENTS
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

const plantModalStageBadge =
    document.getElementById(
        "plantModalStageBadge"
    );

const plantModalName =
    document.getElementById(
        "plantModalName"
    );

const plantModalScientific =
    document.getElementById(
        "plantModalScientific"
    );

const plantModalPercentage =
    document.getElementById(
        "plantModalPercentage"
    );

const plantModalProgress =
    document.getElementById(
        "plantModalProgress"
    );

const plantModalAge =
    document.getElementById(
        "plantModalAge"
    );

const plantModalStage =
    document.getElementById(
        "plantModalStage"
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
   OPEN PLANT PASSPORT
========================================================= */

function openPlantModal(memory) {

    if (!plantModal) {
        return;
    }


    selectedMemory =
        memory;


    const type =
        getFlowerType(memory);

    const flowerName =
        getFlowerName(memory);

    const percentage =
        calculateGrowthPercentage(memory);

    const age =
        calculateAgeInDays(memory);

    const stage =
        getGrowthStage(memory);


    const apiPlant =
        memory?.apiPlant ||
        {};


    const care =
        FLOWER_CARE[type] || {

            light:
                apiPlant?.light ||
                apiPlant?.sunlight ||
                "Bright natural light",

            water:
                apiPlant?.water ||
                apiPlant?.watering ||
                "Moderate watering"

        };


    const scientific =
        FLOWER_SCIENTIFIC[type] ||

        apiPlant?.scientific_name ||

        apiPlant?.scientificName ||

        "Beautifully unique";


    const personality =
        memory?.flower_personality ||

        memory?.flowerPersonality ||

        apiPlant?.personality ||

        apiPlant?.flower_personality ||

        FLOWER_PERSONALITIES[type] ||

        "Every flower has a story. This one is yours.";


    const fact =
        memory?.flower_fact ||

        memory?.flowerFact ||

        apiPlant?.fact ||

        apiPlant?.description ||

        FLOWER_FACTS[type] ||

        "Every flower carries its own little story.";


    const image =
        getFlowerImage(memory);


    const memoryTitle =
        memory?.title ||
        memory?.memory_title ||
        memory?.memoryTitle ||
        "My memory";


    const memoryText =
        memory?.description ||
        memory?.memory_text ||
        memory?.memoryText ||
        memory?.story ||
        memory?.notes ||
        "This beautiful memory is part of your TIMEBLOOM garden.";


    if (plantModalName) {

        plantModalName.textContent =
            flowerName;

    }


    if (plantModalScientific) {

        plantModalScientific.textContent =
            scientific;

    }


    if (plantModalPercentage) {

        plantModalPercentage.textContent =
            `${percentage}%`;

    }


    if (plantModalProgress) {

        requestAnimationFrame(
            () => {

                plantModalProgress.style.width =
                    `${percentage}%`;

            }
        );

    }


    if (plantModalAge) {

        plantModalAge.textContent =
            `${age} ${
                age === 1
                    ? "day"
                    : "days"
            } old`;

    }


    if (plantModalStage) {

        plantModalStage.textContent =
            stage.label;

    }


    if (plantModalStageBadge) {

        plantModalStageBadge.textContent =
            stage.label;

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
                getMemoryDate(memory)
            );

    }


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

            plantModalImage.style.display =
                "none";

        }

    }


    plantModal.classList.add(
        "active"
    );


    plantModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE PLANT MODAL
========================================================= */

function closePlantPassport() {

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


    document.body.classList.remove(
        "modal-open"
    );


    selectedMemory =
        null;

}


if (closePlantModal) {

    closePlantModal.addEventListener(
        "click",
        closePlantPassport
    );

}


if (plantModal) {

    const backdrop =
        plantModal.querySelector(
            ".modal-backdrop"
        );


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closePlantPassport
        );

    }

}


/* =========================================================
   MEMORY BOOK MODAL
========================================================= */

const memoryBookModal =
    document.getElementById(
        "memoryBookModal"
    );

const closeMemoryBookButton =
    document.getElementById(
        "closeMemoryBook"
    );

const bookTitle =
    document.getElementById(
        "bookTitle"
    );

const bookDate =
    document.getElementById(
        "bookDate"
    );

const bookText =
    document.getElementById(
        "bookText"
    );

const bookFlower =
    document.getElementById(
        "bookFlower"
    );

const bookGrowth =
    document.getElementById(
        "bookGrowth"
    );

const bookStage =
    document.getElementById(
        "bookStage"
    );

const bookFlowerName =
    document.getElementById(
        "bookFlowerName"
    );

const bookPlantIllustration =
    document.getElementById(
        "bookPlantIllustration"
    );

const bookViewPlant =
    document.getElementById(
        "bookViewPlant"
    );


/* =========================================================
   OPEN MEMORY BOOK
========================================================= */

function openMemoryBook(memory) {

    if (!memoryBookModal) {
        return;
    }


    selectedMemory =
        memory;


    const flowerName =
        getFlowerName(memory);

    const percentage =
        calculateGrowthPercentage(memory);

    const stage =
        getGrowthStage(memory);


    const memoryTitle =
        memory?.title ||
        memory?.memory_title ||
        memory?.memoryTitle ||
        "A special memory";


    const memoryText =
        memory?.description ||
        memory?.memory_text ||
        memory?.memoryText ||
        memory?.story ||
        memory?.notes ||
        "Every memory deserves a place in your story.";


    if (bookTitle) {

        bookTitle.textContent =
            memoryTitle;

    }


    if (bookDate) {

        bookDate.textContent =
            formatDate(
                getMemoryDate(memory)
            );

    }


    if (bookText) {

        bookText.textContent =
            memoryText;

    }


    if (bookFlower) {

        bookFlower.textContent =
            flowerName;

    }


    if (bookFlowerName) {

        bookFlowerName.textContent =
            flowerName;

    }


    if (bookGrowth) {

        bookGrowth.textContent =
            `${percentage}%`;

    }


    if (bookStage) {

        bookStage.textContent =
            stage.label;

    }


    if (bookPlantIllustration) {

        bookPlantIllustration.innerHTML =
            "";


        const world =
            createPlantWorld(
                memory
            );


        world.classList.add(
            "visual-bloomed"
        );


        bookPlantIllustration.appendChild(
            world
        );

    }


    memoryBookModal.classList.add(
        "active"
    );


    memoryBookModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "book-open"
    );

}


/* =========================================================
   CLOSE MEMORY BOOK
========================================================= */

function closeMemoryBook() {

    if (!memoryBookModal) {
        return;
    }


    memoryBookModal.classList.remove(
        "active"
    );


    memoryBookModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "book-open"
    );

}


if (closeMemoryBookButton) {

    closeMemoryBookButton.addEventListener(
        "click",
        closeMemoryBook
    );

}


if (memoryBookModal) {

    const backdrop =
        memoryBookModal.querySelector(
            ".memory-book-backdrop"
        );


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeMemoryBook
        );

    }

}


/* =========================================================
   VIEW PLANT FROM BOOK
========================================================= */

if (bookViewPlant) {

    bookViewPlant.addEventListener(
        "click",
        () => {

            if (!selectedMemory) {
                return;
            }


            closeMemoryBook();


            setTimeout(
                () => {

                    openPlantModal(
                        selectedMemory
                    );

                },
                250
            );

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
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            memoryBookModal?.classList.contains(
                "active"
            )
        ) {

            closeMemoryBook();

            return;

        }


        if (
            plantModal?.classList.contains(
                "active"
            )
        ) {

            closePlantPassport();

        }

    }
);


/* =========================================================
   START
========================================================= */

async function initialiseGarden() {

    if (gardenLoading) {

        gardenLoading.hidden =
            false;

    }


    await loadPlants();

    await loadMemories();

}


initialiseGarden();