const {
    getRecommendations
} = require("../services/recommendationService");


const getRecommendationsController = async (req, res) => {

    try {

        const {
            percentile,
            category,
            capRound,
            preferredBranch,
            gender,
            homeUniversity,
            preferredCollege,
            preferredLocation,
            quotas,
            allMaharashtraRank,
            candidatureType,
            jeeStatus,
    jeePercentile
        } = req.body;


        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        if (
            percentile === undefined ||
            percentile === null ||
            Number.isNaN(Number(percentile))
        ) {

            return res.status(400).json({
                success: false,
                message: "Valid percentile is required"
            });

        }


        if (!category) {

            return res.status(400).json({
                success: false,
                message: "Category is required"
            });

        }


        if (!capRound) {

            return res.status(400).json({
                success: false,
                message: "CAP round is required"
            });

        }


        if (!preferredBranch) {

            return res.status(400).json({
                success: false,
                message: "Preferred branch is required"
            });

        }


        // ==========================================
        // STUDENT DATA
        // ==========================================

        const studentData = {

            percentile: Number(percentile),

            category:
                String(category).trim().toUpperCase(),

            gender:
                String(gender || "").trim().toUpperCase(),

            capRound:
                String(capRound).trim().toUpperCase(),

            preferredBranch:
                String(preferredBranch).trim(),

            homeUniversity:
                String(homeUniversity || "").trim().toLowerCase(),

            preferredCollege:
                String(preferredCollege || "").trim(),

            preferredLocation:
                String(preferredLocation || "").trim().toLowerCase(),

            quotas:
                Array.isArray(quotas)
                    ? quotas
                    : [],

            allMaharashtraRank:
                allMaharashtraRank
                    ? Number(allMaharashtraRank)
                    : null,

            candidatureType:
                String(candidatureType || "")
                    .trim()
                    .toUpperCase(),

            jeeStatus:
    String(jeeStatus || "")
        .trim()
        .toUpperCase(),

jeePercentile:
    jeeStatus === "YES"
        ? Number(jeePercentile)
        : null
        };


        // ==========================================
        // CALL SERVICE
        // ==========================================

        const recommendations =
            await getRecommendations(studentData);


        // ==========================================
        // RESPONSE
        // ==========================================

        console.log(
            `✅ ${recommendations.length} recommendations generated`
        );


        return res.status(200).json({

            success: true,

            count:
                recommendations.length,

            student:
                studentData,

            recommendations

        });

    }


    catch (error) {

        console.error(
            "❌ Recommendation Controller Error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch recommendations",

            error:
                error.message

        });

    }

};


module.exports = {

    getRecommendations:
        getRecommendationsController

};