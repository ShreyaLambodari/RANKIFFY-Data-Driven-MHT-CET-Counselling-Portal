document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("studentForm");
    const button = document.getElementById("generateRecommendations");

    if (!form || !button) {
        console.error(" Student form or recommendation button not found.");
        return;
    }



    const jeeStatus = document.getElementById("jeeStatus");
const jeePercentileGroup = document.getElementById("jeePercentileGroup");
const jeePercentile = document.getElementById("jeePercentile");

jeeStatus.addEventListener("change", function () {

    if (this.value === "YES") {

        jeePercentileGroup.style.display = "block";
        jeePercentile.required = true;

    } else {

        jeePercentileGroup.style.display = "none";
        jeePercentile.required = false;
        jeePercentile.value = "";

    }

});


    button.addEventListener("click", async function (event) {

        event.preventDefault();

        // ==========================================
        // FORM VALIDATION
        // ==========================================

        if (!form.reportValidity()) {
            return;
        }


        // ==========================================
        // COLLECT FORM DATA
        // ==========================================

        const formData = new FormData(form);

        const studentData = {

            percentile:
                parseFloat(formData.get("percentile")),

            category:
                formData.get("category"),

            gender:
                formData.get("gender"),

            candidatureType:
                formData.get("candidatureType"),

            jeeStatus:
    formData.get("jeeStatus"),

jeePercentile:
    formData.get("jeeStatus") === "YES"
        ? parseFloat(formData.get("jeePercentile"))
        : null,

            homeUniversity:
                formData.get("homeUniversity"),

            allMaharashtraRank:
                formData.get("allMaharashtraRank") || null,

            capRound:
                formData.get("capRound"),


            // IMPORTANT:
            // Backend expects "quotas"
            quotas:
                Array.from(
                    form.querySelectorAll(
                        'input[name="quota"]:checked'
                    )
                ).map(input => input.value),


            preferredBranch:
                formData.get("preferredBranch"),

            preferredCollege:
                formData.get("preferredCollege") || "",

            preferredLocation:
                formData.get("preferredLocation") || ""
        };


        console.log(
            " Student Data being sent:",
            studentData
        );


        // ==========================================
        // DISABLE BUTTON
        // ==========================================

        button.disabled = true;
        button.textContent = "Generating...";


        try {

            // ======================================
            // CALL BACKEND
            // ======================================

            const response = await fetch(
                "http://localhost:5000/api/recommendations",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body:
                        JSON.stringify(studentData)
                }
            );


            // ======================================
            // READ RESPONSE
            // ======================================

            const data =
                await response.json();


            console.log(
                " Backend Response:",
                data
            );


            // ======================================
            // HANDLE API ERROR
            // ======================================

            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Failed to generate recommendations"
                );
            }


            // ======================================
            // STORE DATA
            // ======================================

            sessionStorage.setItem(
                "recommendations",
                JSON.stringify(data)
            );


            // ======================================
            // REDIRECT
            // ======================================

            window.location.href =
                "./recommendations.html";

        }


        catch (error) {

            console.error(
                " Recommendation Error:",
                error
            );


            alert(
                "Unable to generate recommendations.\n\n" +
                "Error: " +
                error.message
            );


            button.disabled = false;

            button.textContent =
                "Get Recommendations";
        }

    });

});