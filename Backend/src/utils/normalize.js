function normalizeStudentData(data) {
    const percentile = Number(data.percentile);

    if (Number.isNaN(percentile) || percentile < 0 || percentile > 100) {
        throw new Error("Invalid percentile");
    }

    const category = String(data.category || "")
        .trim()
        .toUpperCase();

    const gender = String(data.gender || "")
        .trim()
        .toUpperCase();

    const homeUniversity = String(data.homeUniversity || "")
        .trim()
        .toLowerCase();

    const preferredBranch = String(data.preferredBranch || "")
        .trim();

    const capRound = String(data.capRound || "")
        .trim()
        .toUpperCase();

    const quotas = Array.isArray(data.quotas)
        ? data.quotas.map(q => String(q).trim().toUpperCase())
        : [];

    return {
        percentile,
        category,
        gender,
        homeUniversity,
        preferredBranch,
        capRound,
        quotas
    };
}


function getCutoffColumn(capRound) {
    switch (capRound) {
        case "ROUND_1":
            return "percentile_r1";

        case "ROUND_2":
            return "percentile_r2";

        case "ROUND_3":
            return "percentile_r3";

        default:
            throw new Error("Invalid CAP round");
    }
}


function getEligibleCategories(studentCategory, gender) {
    const categories = [];

    // OPEN seats are available to all candidates
    if (gender === "FEMALE") {
        categories.push(
            "GOPENH",
            "GOPENO",
            "GOPENS",
            "LOPENH",
            "LOPENO",
            "LOPENS"
        );
    } else {
        categories.push(
            "GOPENH",
            "GOPENO",
            "GOPENS"
        );
    }

    // Reserved category seats
    if (studentCategory === "OBC") {
        if (gender === "FEMALE") {
            categories.push(
                "GOBCH",
                "GOBCO",
                "GOBCS",
                "LOBCH",
                "LOBCO",
                "LOBCS"
            );
        } else {
            categories.push(
                "GOBCH",
                "GOBCO",
                "GOBCS"
            );
        }
    }

    if (studentCategory === "SC") {
        if (gender === "FEMALE") {
            categories.push(
                "GSCH",
                "GSCO",
                "GSCS",
                "LSCH",
                "LSCO",
                "LSCS"
            );
        } else {
            categories.push(
                "GSCH",
                "GSCO",
                "GSCS"
            );
        }
    }

    if (studentCategory === "ST") {
        if (gender === "FEMALE") {
            categories.push(
                "GSTH",
                "GSTO",
                "GSTS",
                "LSTH",
                "LSTO",
                "LSTS"
            );
        } else {
            categories.push(
                "GSTH",
                "GSTO",
                "GSTS"
            );
        }
    }

    return categories;
}


function getUniversityCategory(homeUniversity) {
    const universityMap = {
        "rtmnu":
            "Rashtrasant Tukadoji Maharaj Nagpur University",

        "sppu":
            "Savitribai Phule Pune University",

        "sbgau":
            "Sant Gadge Baba Amravati University",

        "shivaji-university":
            "Shivaji University",

        "dbamu":
            "Dr. Babasaheb Ambedkar Marathwada University",

        "srtmun":
            "Swami Ramanand Teerth Marathwada University, Nanded",

        "gondwana":
            "Gondwana University",

        "kbc-nmu":
            "Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon",

        "mumbai-university":
            "Mumbai University",

        "dbatu":
            "Dr. Babasaheb Ambedkar Technological University,Lonere",

        "sndt":
            "SNDT Women's University",

        "sppu-solapur":
            "Punyashlok Ahilyadevi Holkar Solapur University"
    };

    return universityMap[homeUniversity] || null;
}


module.exports = {
    normalizeStudentData,
    getCutoffColumn,
    getEligibleCategories,
    getUniversityCategory
};