const FIPS_TO_ABBR = {
    "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE", "11": "DC",
    "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY",
    "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT",
    "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
    "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
    "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY"
};

const STATE_NAMES = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado",
    "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas",
    "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan",
    "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada",
    "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina",
    "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island",
    "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah",
    "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
};

const map = L.map("map", {
    minZoom: 3,
    maxZoom: 8,
    maxBounds: [
        [49.5, -66.9],
        [24.5, -125]
    ],
    maxBoundsViscosity: 1.0
}).setView([37.8, -96], 4);
map.setMinZoom(5); map.setMaxZoom(5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    noWrap: true,
    bounds: [
        [49.5, -66.9],
        [24.5, -125]
    ]
}).addTo(map);

const filters = {
    minSpeed: document.getElementById("minSpeed"),
    maxAlt: document.getElementById("maxAlt"),
    minAlt: document.getElementById("minAlt"),
    minFat: document.getElementById("minFat"),
    minYear: document.getElementById("minYear"),
    maxRecords: document.getElementById("maxRecords"),
    sortBy: document.getElementById("sortBy"),
    sortOrder: document.getElementById("sortOrder")
};

const stateTitle = document.getElementById("stateTitle");
const stateCount = document.getElementById("stateCount");
const resultList = document.getElementById("resultList");

let currentState = null;
const cache = {};

fetch("data/us-states.geojson")
    .then(r => r.json())
    .then(geojson => {
        L.geoJSON(geojson, {
            onEachFeature: (feature, layer) => {
                layer.on("click", () => {
                    const fips = feature.properties.STATE;
                    const abbr = FIPS_TO_ABBR[fips];
                    if (!abbr) return;
                    currentState = abbr;
                    loadStateAndRender(abbr);
                });
            }
        }).addTo(map);
    });

async function loadStateAndRender(stateCode) {
    if (!cache[stateCode]) {
        const res = await fetch(`data/states/${stateCode}.json`);
        cache[stateCode] = await res.json();
    }

    const data = cache[stateCode];
    const stateName = STATE_NAMES[stateCode] || "Unknown State";
    stateTitle.textContent = `${stateName} (${stateCode})`;

    const f = {
        minSpeed: parseNum(filters.minSpeed.value),
        maxAlt: parseNum(filters.maxAlt.value),
        minAlt: parseNum(filters.minAlt.value),
        minFat: parseNum(filters.minFat.value),
        minYear: parseNum(filters.minYear.value),
        maxRecords: parseNum(filters.maxRecords.value),
    };

    if (f.minFat === 0) f.minFat = null;
    if (f.minSpeed === 0) f.minSpeed = null;
    if (f.minSpeed === 0) f.minSpeed = null;

    const hasActiveFilters = f.minSpeed !== null || f.maxAlt !== null || f.minAlt !== null || f.minFat !== null || f.minYear !== null;

    let filtered = data;
    if (hasActiveFilters) {
        filtered = data.filter(r => {
            const s = parseFloat(r.speed_kts);
            const a = parseFloat(r.altitude_ft);
            const fat = parseFloat(r.fatalities);
            const year = parseInt(r.year);

            if (f.minSpeed !== null) {
                if (isNaN(s) || s < f.minSpeed) return false;
            }
            if (f.maxAlt !== null) {
                if (isNaN(a) || a > f.maxAlt) return false;
            }
            if (f.minAlt !== null) {
                if (isNaN(a) || a < f.minAlt) return false;
            }
            if (f.minFat !== null) {
                if (isNaN(fat) || fat < f.minFat) return false;
            }
            if (f.minYear !== null) {
                if (isNaN(year) || year < f.minYear) return false;
            }
            return true;
        });
    }

    if (hasActiveFilters && filtered.length === 0) {
        resultList.innerHTML = "<li>No data matches the selected filters.</li>";
        stateCount.textContent = "0 results";
        return;
    }

    const totalCount = data.length;
    const filteredCount = filtered.length;
    const countText = hasActiveFilters
        ? `${totalCount} total strikes - ${filteredCount} with these filters`
        : `${totalCount} total strikes`;
    stateCount.textContent = countText;

    const maxDisplay = f.maxRecords ?? 10;
    if (filters.sortBy && filters.sortOrder) {
        const key = filters.sortBy.value;
        const order = filters.sortOrder.value;

        filtered.sort((a, b) => {
            const av = parseFloat(a[key]) || 0;
            const bv = parseFloat(b[key]) || 0;
            return order === "asc" ? av - bv : bv - av;
        });
    }
    renderList(filtered.slice(0, maxDisplay));
}

function renderList(records) {
    resultList.innerHTML = "";
    for (const r of records) {
        const li = document.createElement("li");
        const date = r.date ? r.date.slice(0, 10) : "n/a";
        const speed = isNaN(parseFloat(r.speed_kts)) ? "n/a" : parseFloat(r.speed_kts);
        const alt = isNaN(parseFloat(r.altitude_ft)) ? "n/a" : parseFloat(r.altitude_ft);
        const fat = isNaN(parseFloat(r.fatalities)) ? "n/a" : parseFloat(r.fatalities);

        li.innerHTML = `
          <strong>${date}</strong> • ${r.airport || "Unknown airport"}<br>
          ${r.species || "Unknown species"}<br>
          <span class="meta">Speed: ${speed} kts | Altitude: ${alt} ft | Fatalities: ${fat}</span>
        `;
        resultList.appendChild(li);
    }
}
function parseNum(v) {
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

for (const input of Object.values(filters)) {
    input.addEventListener("input", () => {
        if (currentState) loadStateAndRender(currentState);
    });
    input.addEventListener("change", () => {
        if (currentState) loadStateAndRender(currentState);
    });
}