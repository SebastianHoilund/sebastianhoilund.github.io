import "dotenv/config";
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

const DB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const SQL = `
    SELECT
    INDEX_NR                          AS id,
    INCIDENT_DATE                     AS date,
    INCIDENT_YEAR                     AS year,
    STATE                              AS state,
    AIRPORT                            AS airport,
    LATITUDE                           AS lat,
    LONGITUDE                          AS lon,
    HEIGHT                             AS altitude_ft,
    SPEED                              AS speed_kts,
    NUM_STRUCK                         AS birds_struck,
    NR_FATALITIES                      AS fatalities,
    NR_INJURIES                        AS injuries,
    COST_REPAIRS                       AS cost_repair_usd,
    COST_OTHER                         AS cost_other_usd,
    COST_REPAIRS_INFL_ADJ              AS cost_repair_usd_adj,
    COST_OTHER_INFL_ADJ                AS cost_other_usd_adj,
    SPECIES                            AS species,
    SIZE                               AS size,
    PHASE_OF_FLIGHT                    AS phase,
    OPERATOR                           AS operator,
    AIRCRAFT                           AS aircraft_model
    FROM STRIKE_REPORTS
    WHERE STATE IN (
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
    'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
    'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
    'WI','WY'
    )
    AND LATITUDE IS NOT NULL
    AND LONGITUDE IS NOT NULL
`;

const OUT_DIR = path.resolve("public/data/states");
await fs.promises.mkdir(OUT_DIR, { recursive: true });

const conn = await mysql.createConnection(DB);
const [rows] = await conn.query(SQL);
await conn.end();

// Group by state
/** @type {Record<string, any[]>} */
const byState = {};
for (const r of rows) {
    // Normalize types
    const rec = {
        id: r.id,
        date: r.date ? new Date(r.date).toISOString() : null,
        year: r.year ?? null,
        state: r.state?.toUpperCase() ?? null,
        airport: r.airport ?? null,
        lat: r.lat != null ? Number(r.lat) : null,
        lon: r.lon != null ? Number(r.lon) : null,
        altitude_ft: r.altitude_ft != null ? Number(r.altitude_ft) : null,
        speed_kts: r.speed_kts != null ? Number(r.speed_kts) : null,
        birds_struck: r.birds_struck != null ? Number(r.birds_struck) : null,
        birds_killed: r.birds_killed != null ? Number(r.birds_killed) : null,
        injuries: r.injuries != null ? Number(r.injuries) : null,
        fatalities: r.fatalities != null ? Number(r.fatalities) : null,
        cost_usd: r.cost_usd != null ? Number(r.cost_usd) : null,
        species: r.species ?? null,
        size: r.size ?? null,
        phase: r.phase ?? null,
        operator: r.operator ?? null,
        aircraft_model: r.aircraft_model ?? null,
    };

    if (!rec.state) continue;
    if (!byState[rec.state]) byState[rec.state] = [];
    byState[rec.state].push(rec);
}

// Write one file per state, sorted by date desc
for (const [state, list] of Object.entries(byState)) {
    list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const outPath = path.join(OUT_DIR, `${state}.json`);
    await fs.promises.writeFile(outPath, JSON.stringify(list), "utf8");
    console.log(`Wrote ${state}.json (${list.length} rows)`);
}

// Also produce a tiny manifest of available states and counts
const manifest = Object.fromEntries(
    Object.entries(byState).map(([s, arr]) => [s, arr.length])
);
await fs.promises.writeFile(
    path.resolve("public/data/manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
);
console.log("Wrote manifest.json");