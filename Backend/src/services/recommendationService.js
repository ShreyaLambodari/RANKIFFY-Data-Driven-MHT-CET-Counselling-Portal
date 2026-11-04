const { pool } = require("../config/db");


// ======================================================
// CATEGORY → SEAT TYPES
// ======================================================

const categorySeatTypes = {
    OPEN: [
        "GOPENH",
        "GOPENO",
        "GOPENS"
    ],

    OBC: [
        "GOBCH",
        "GOBCO",
        "GOBCS"
    ],

    SC: [
        "GSCH",
        "GSCO",
        "GSCS"
    ],

    ST: [
        "GSTH",
        "GSTO",
        "GSTS"
    ],

    SEBC: [
        "GSEBCH",
        "GSEBCO",
        "GSEBCS"
    ],

    EWS: [
        "EWS"
    ],

    VJ: [
        "GVJH",
        "GVJO",
        "GVJS"
    ],

    NT: [
        "GNT1H", "GNT1O", "GNT1S",
        "GNT2H", "GNT2O", "GNT2S",
        "GNT3H", "GNT3O", "GNT3S"
    ]
};


// ======================================================
// UNIVERSITY MAP
// ======================================================

const universityMap = {
    autonomous: "Autonomous Institute",

    rtmnu:
        "Rashtrasant Tukadoji Maharaj Nagpur University",

    sgbau:
        "Sant Gadge Baba Amravati University",

    sppu:
        "Savitribai Phule Pune University",

    "shivaji-university":
        "Shivaji University",

    dbamu:
        "Dr. Babasaheb Ambedkar Marathwada University",

    srtmun:
        "Swami Ramanand Teerth Marathwada University, Nanded",

    gondwana:
        "Gondwana University",

    "kbc-nmu":
        "Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon",

    "mumbai-university":
        "Mumbai University",

    dbatu:
        "Dr. Babasaheb Ambedkar Technological University,Lonere",

    sndt:
        "SNDT Women's University",

    "sppu-solapur":
        "Punyashlok Ahilyadevi Holkar Solapur University"
};


// ======================================================
// CAP ROUND → CUTOFF COLUMN
// ======================================================

const roundColumns = {
    ROUND_1: "percentile_r1",
    ROUND_2: "percentile_r2",
    ROUND_3: "percentile_r3"
};

const predictedRoundColumns = {
    ROUND_1: "predicted_round_1",
    ROUND_2: "predicted_round_2",
    ROUND_3: "predicted_round_3"
};

// ======================================================
// JEE CAP ROUND → ACTUAL CUTOFF COLUMN
// ======================================================

const jeeRoundColumns = {
    ROUND_1: "cap1_actual_2025",
    ROUND_2: "cap2_actual_2025",
    ROUND_3: "cap3_actual_2025",
    ROUND_4: "cap4_actual_2025"
};

const jeePredictedRoundColumns = {
    ROUND_1: "cap1_predicted_2026",
    ROUND_2: "cap2_predicted_2026",
    ROUND_3: "cap3_predicted_2026",
    ROUND_4: "cap4_predicted_2026"
};


// ======================================================
// BRANCH GROUPS
// ======================================================

const branchGroups = {

    COMPUTER: [
        "Computer Engineering",
        "Computer Engineering (Regional Language)",
        "Computer Engineering (Software Engineering)",

        "Computer Science",
        "Computer Science and Business Systems",
        "Computer Science and Design",
        "Computer Science and Engineering",

        "Computer Science and Engineering (Artificial Intelligence and Data Science)",
        "Computer Science and Engineering (Artificial Intelligence)",
        "Computer Science and Engineering (Cyber Security)",
        "Computer Science and Engineering (Internet of Things and Cyber Security Including Block Chain",
        "Computer Science and Engineering (IoT)",
        "Computer Science and Engineering(Artificial Intelligence and Machine Learning)",
        "Computer Science and Engineering(Cyber Security)",
        "Computer Science and Engineering(Data Science)",

        "Computer Science and Information Technology",
        "Computer Science and Technology",
        "Computer Technology",

        "Artificial Intelligence",
        "Artificial Intelligence (AI) and Data Science",
        "Artificial Intelligence and Data Science",
        "Artificial Intelligence and Machine Learning",

        "Cyber Security",
        "Data Science",

        "Information Technology",

        "Internet of Things (IoT)",
        "Industrial IoT",

        "Robotics and Artificial Intelligence"
    ],

    ELECTRONICS: [
        "Electronics & Telecommunication Engineering",
        "Electronics and Telecommunication Engg",
        "Electronics and Communication Engineering",
        "Electronics and Communication (Advanced Communication Technology)",
        "Electronics and Communication(Advanced Communication Technology)",
        "Electronics Engineering",
        "Electronics Engineering ( VLSI Design and Technology)",
        "Electronics and Biomedical Engineering",
        "ELECTRONICS AND COMMUNICATION ENGINEERING (BIO-MEDICAL ENGINEERING)",
        "Electronics and Computer Engineering",
        "Electronics and Computer Science"
    ],

    ELECTRICAL: [
        "Electrical Engineering",
        "Electrical and Electronics Engineering",
        "Electrical and Computer Engineering",
        "Electrical Engg[Electronics and Power]",
        "Electrical, Electronics and Power"
    ],

    MECHANICAL: [
        "Mechanical Engineering",
        "Mechanical Engineering Automobile",
        "Mechanical Engineering[Sandwich]",
        "Mechanical & Automation Engineering",
        "Mechanical and Automation Engineering",
        "Mechanical and Mechatronics Engineering (Additive Manufacturing)",
        "MECHANICAL AND RAIL ENGINEERING"
    ],

    AUTOMATION_ROBOTICS: [
        "Automation and Robotics",
        "Robotics and Artificial Intelligence",
        "Robotics and Automation",
        "Mechatronics Engineering"
    ],

    CIVIL: [
        "Civil Engineering",
        "Civil and Environmental Engineering",
        "Civil and infrastructure Engineering",
        "Civil Engineering (Structural Engineering)",
        "Civil Engineering and Planning",
        "Civil Engineering with Computer Application",
        "Structural Engineering"
    ],

    CHEMICAL: [
        "Chemical Engineering",
        "Petro Chemical Engineering"
    ],

    BIOTECH: [
        "Bio Technology",
        "Bio Medical Engineering"
    ],

    AERONAUTICAL: [
        "Aeronautical Engineering"
    ],

    AGRICULTURAL: [
        "Agricultural Engineering"
    ],

    FOOD: [
        "Food Engineering",
        "Food Engineering and Technology",
        "Food Technology",
        "Food Technology And Management"
    ],

    TEXTILE: [
        "Fibres and Textile Processing Technology",
        "Man Made Textile Technology",
        "Technical Textiles",
        "Textile Chemistry",
        "Textile Engineering / Technology",
        "Textile Technology"
    ],

    PRODUCTION: [
        "Production Engineering",
        "Production Engineering[Sandwich]",
        "Manufacturing Science and Engineering"
    ],

    METALLURGY: [
        "Metallurgy and Material Technology"
    ],

    MINING: [
        "Mining Engineering"
    ],

    PHARMACEUTICAL: [
        "Pharmaceutical and Fine Chemical Technology",
        "Pharmaceuticals Chemistry and Technology"
    ],

    PLASTIC_POLYMER: [
        "Plastic and Polymer Engineering",
        "Plastic Technology",
        "Polymer Engineering and Technology"
    ],

    PRINTING: [
        "Printing and Packing Technology"
    ],

    PAINTS: [
        "Dyestuff Technology",
        "Oil and Paints Technology",
        "Paints Technology",
        "Surface Coating Technology",
        "Oil Technology",
        "Oil Fats and Waxes Technology",
        "Oil,Oleochemicals and Surfactants Technology"
    ],

    INSTRUMENTATION: [
        "Instrumentation and Control Engineering",
        "Instrumentation Engineering"
    ],

    SAFETY: [
        "Safety and Fire Engineering"
    ],

    VLSI: [
        "VLSI"
    ],

    FASHION: [
        "Fashion Technology"
    ]
};


// ======================================================
// GET BRANCH GROUP
// ======================================================

function getBranchNames(preferredBranch) {

    for (const branches of Object.values(branchGroups)) {

        if (branches.includes(preferredBranch)) {
            return branches;
        }
    }

    // Fallback: exact branch only
    return [preferredBranch];
}


// ======================================================
// BUILD SEAT TYPES
// ======================================================

function buildSeatTypes(category, gender) {

    let seatTypes = categorySeatTypes[category];

    if (!seatTypes) {
        throw new Error(
            `Category '${category}' is not supported`
        );
    }

    seatTypes = [...seatTypes];


    // Reserved candidates can also compete
    // for OPEN seats.
    if (
        category !== "OPEN" &&
        category !== "EWS"
    ) {
        seatTypes.push(
            "GOPENH",
            "GOPENO",
            "GOPENS"
        );
    }


    // EWS + OPEN
    if (category === "EWS") {
        seatTypes.push(
            "GOPENH",
            "GOPENO",
            "GOPENS"
        );
    }


    // Female → Ladies seats
    if (gender === "FEMALE") {

        const ladiesSeatTypes =
            seatTypes
                .filter(type =>
                    type.startsWith("G")
                )
                .map(type =>
                    `L${type.substring(1)}`
                );

        seatTypes.push(
            ...ladiesSeatTypes
        );
    }


    return [
        ...new Set(seatTypes)
    ];
}


// ======================================================
// GET RECOMMENDATIONS
// ======================================================

async function getRecommendations(studentData) {

    const {
        percentile,
        category,
        capRound,
        preferredBranch,
        gender,
        homeUniversity,
        preferredCollege,
        preferredLocation,
        jeeStatus,
    jeePercentile
    } = studentData;


    console.log("JEE Status:", jeeStatus);
    console.log("JEE Percentile:", jeePercentile);

    // ==================================================
    // NORMALIZE
    // ==================================================

    const normalizedCategory =
        String(category)
            .trim()
            .toUpperCase();

    const normalizedGender =
        String(gender || "")
            .trim()
            .toUpperCase();

    const normalizedUniversity =
        String(homeUniversity || "")
            .trim()
            .toLowerCase();

    const normalizedLocation =
        String(preferredLocation || "")
            .trim()
            .toLowerCase();


    // ==================================================
    // ROUND
    // ==================================================

    const cutoffColumn = roundColumns[capRound];
const predictedCutoffColumn = predictedRoundColumns[capRound];

if (!cutoffColumn || !predictedCutoffColumn) {
    throw new Error("Invalid CAP round");
}


    // ==================================================
    // SEAT TYPES
    // ==================================================

    const seatTypes =
        buildSeatTypes(
            normalizedCategory,
            normalizedGender
        );


    const seatPlaceholders =
        seatTypes
            .map(() => "?")
            .join(",");


    // ==================================================
    // BRANCHES
    // ==================================================

    const branchNames =
        getBranchNames(preferredBranch);


    const branchPlaceholders =
        branchNames
            .map(() => "?")
            .join(",");


    // ==================================================
    // BASE QUERY
    // ==================================================

    let query = `

        SELECT

            ca.college_code,
            ca.college_name,

            ca.branch_code,
            ca.branch_name,

            ca.category,
            ca.seat_type,

            ca.home_university,
            ca.status,
            ca.stage,

            ca.${cutoffColumn}
    AS cutoff_percentile,

ca.${predictedCutoffColumn}
    AS predicted_cutoff,

ca.city

        FROM cet_new ca

        WHERE

            ca.${cutoffColumn}
                IS NOT NULL

            AND ca.${cutoffColumn}
                <= ?

            AND ca.category IN
                (${seatPlaceholders})

            AND ca.branch_name IN
                (${branchPlaceholders})

    `;


    const params = [

        Number(percentile),

        ...seatTypes,

        ...branchNames

    ];


    // ==================================================
    // HOME UNIVERSITY
    // ==================================================

    const universityName =
        universityMap[normalizedUniversity];


    if (
        universityName &&
        normalizedUniversity !== "autonomous"
    ) {

        query += `

            AND (

                (
                    RIGHT(
                        REPLACE(
                            ca.category,
                            ' ',
                            ''
                        ),
                        1
                    ) = 'H'

                    AND ca.home_university = ?
                )

                OR

                (
                    RIGHT(
                        REPLACE(
                            ca.category,
                            ' ',
                            ''
                        ),
                        1
                    ) = 'O'

                    AND ca.home_university <> ?
                )

                OR

                (
                    RIGHT(
                        REPLACE(
                            ca.category,
                            ' ',
                            ''
                        ),
                        1
                    ) = 'S'
                )

            )

        `;

        params.push(
            universityName,
            universityName
        );
    }


    // ==================================================
    // LOCATION
//     if (normalizedLocation) {
//     query += `
//         AND LOWER(TRIM(ca.city)) = LOWER(TRIM(?))
//     `;

//     params.push(preferredLocation.trim());
// }

// ✅ CET CITY FILTER — YAHAN ADD KARO
if (normalizedLocation) {
    query += ` AND LOWER(TRIM(ca.city)) = ? `;
    params.push(normalizedLocation);
}
    // ==================================================
    // OPTIONAL COLLEGE
    // ==================================================

    if (preferredCollege) {

        query += `

            AND ca.college_name LIKE ?

        `;

        params.push(
            `%${preferredCollege}%`
        );
    }


    // ==================================================
    // SORT
    // ==================================================

    query += `

        ORDER BY

            ca.${cutoffColumn} DESC,

            ca.college_name ASC

        LIMIT 25000

    `;


    // ==================================================
    // EXECUTE
    // ==================================================

    console.log("Branch group branches:", branchNames);
    console.log("Seat types:", seatTypes);

    const [rows] =
    await pool.query(
        query,
        params
    );


// ==================================================
// JEE RECOMMENDATIONS
// ==================================================

let jeeRows = [];

if (
    jeeStatus === "YES" &&
    jeePercentile !== null &&
    !isNaN(Number(jeePercentile))
) {

    const jeeCutoffColumn =
        jeeRoundColumns[capRound];

    if (!jeeCutoffColumn) {
        throw new Error(
            "Invalid JEE CAP round"
        );
    }


    let jeeQuery = `

        SELECT

            institution_code,
            institute_name,
            city,
            choice_code,
            course_name,

            ${jeeCutoffColumn}
                AS jee_cutoff,

        ${jeePredictedRoundColumns[capRound]} AS jee_predicted_cutoff

        FROM jee_admissions

        WHERE

            ${jeeCutoffColumn}
                IS NOT NULL

            AND ${jeeCutoffColumn}
                <= ?

    `;


    const jeeParams = [
        Number(jeePercentile),
        Number(jeePercentile)
    ];


    // ==============================================
    // BRANCH FILTER
    // ==============================================

    const jeeBranchPlaceholders =
        branchNames
            .map(() => "?")
            .join(",");


    jeeQuery += `

        AND course_name IN
            (${jeeBranchPlaceholders})

    `;


    jeeParams.push(
        ...branchNames
    );


    // ==============================================
    // COLLEGE FILTER
    // ==============================================

    if (preferredCollege) {

        jeeQuery += `

            AND institute_name LIKE ?

        `;

        jeeParams.push(
            `%${preferredCollege}%`
        );
    }


    // ==============================================
    // SORT
    // ==============================================

    jeeQuery += `

        ORDER BY

            ABS(${jeeCutoffColumn} - ?) DESC,

            institute_name ASC

        LIMIT 16000

    `;


    console.log(
        " JEE Percentile:",
        jeePercentile
    );

    console.log(
        " JEE Cutoff Column:",
        jeeCutoffColumn
    );


    const [jeeResult] =
        await pool.query(
            jeeQuery,
            jeeParams
        );


    jeeRows = jeeResult;
}


// ==================================================
// RETURN CET + JEE
// ==================================================

// ==================================================
// MERGE CET + JEE RECOMMENDATIONS
// ==================================================

const mergedRecommendations = new Map();


// ==================================================
// ADD CET RESULTS
// ==================================================

rows.forEach(college => {

    const key =
        `${college.college_code}_${college.branch_code}`;

    mergedRecommendations.set(
        key,
        {
            ...college,

            cet_cutoff:
                college.cutoff_percentile,

            cet_predicted_cutoff:
                college.predicted_cutoff,

            jee_cutoff:
                null,

            jee_institution_code:
                null,

            jee_choice_code:
                null,

            jee_course_name:
                null,

            eligibility_source:
                "CET"
        }
    );
});


// ==================================================
// ADD / MERGE JEE RESULTS
// ==================================================

jeeRows.forEach(college => {

    const key =
        `${college.institute_name}_${college.course_name}`;

    // Check whether same college + course
    // already exists from CET
    let existingKey = null;

    for (const [mapKey, item] of mergedRecommendations) {

        if (
            item.college_name ===
                college.institute_name
            &&
            item.branch_name ===
                college.course_name
        ) {
            existingKey = mapKey;
            break;
        }
    }


    // ==============================================
    // SAME COLLEGE + COURSE EXISTS
    // ==============================================

    if (existingKey) {

        const existing =
            mergedRecommendations.get(
                existingKey
            );

        existing.jee_cutoff =
            college.jee_cutoff;

        
existing.jee_predicted_cutoff = college.jee_predicted_cutoff;

        existing.jee_institution_code =
            college.institution_code;

        existing.jee_choice_code =
            college.choice_code;

        existing.jee_course_name =
            college.course_name;

        existing.eligibility_source =
            "CET + JEE";

        return;
    }


    // ==============================================
    // JEE ONLY
    // ==============================================

    mergedRecommendations.set(
        key,
        {
            college_code:
                college.institution_code,

            college_name:
                college.institute_name,

            branch_code:
                college.choice_code,

            branch_name:
                college.course_name,

            category:
                null,

            seat_type:
                null,

            institute_name:
                college.institute_name,
            
home_university:
    college.institute_name,

            status:
                null,

            stage:
                null,

            cutoff_percentile:
                null,

            district:
                college.city || null,

            cet_cutoff:
                null,

            cet_predicted_cutoff:
                null,

            jee_cutoff:
                college.jee_cutoff,

            
jee_predicted_cutoff: college.jee_predicted_cutoff,    

            jee_institution_code:
                college.institution_code,

            jee_choice_code:
                college.choice_code,

            jee_course_name:
                college.course_name,

            eligibility_source:
                "JEE"
        }
    );
});


// ==================================================
// FINAL RESULT
// ==================================================

const finalRecommendations =
    Array.from(
        mergedRecommendations.values()
    );


console.log(
    "CET results:",
    rows.length
);

console.log(
    "JEE results:",
    jeeRows.length
);

console.log(
    "Combined results:",
    finalRecommendations.length
);


return finalRecommendations;
}


module.exports = {
    getRecommendations
};