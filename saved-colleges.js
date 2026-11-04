document.addEventListener("DOMContentLoaded", function () {

    const savedCollegeList =
        document.getElementById("savedCollegeList");

    const noSavedColleges =
        document.getElementById("noSavedColleges");


    let savedColleges =
        JSON.parse(
            localStorage.getItem("savedColleges")
        ) || [];

    
    // ==========================================
    // DOWNLOAD SAVED COLLEGES AS CSV
    // ==========================================

    const downloadButton =
        document.getElementById("downloadSavedColleges");

    if (downloadButton) {
        downloadButton.addEventListener("click", function () {

            const colleges =
                JSON.parse(
                    localStorage.getItem("savedColleges")
                ) || [];

            if (colleges.length === 0) {
                alert("No saved colleges available to download.");
                return;
            }

            const headers = [
                "College Name",
                "Branch",
                "University",
                "CET Cutoff",
                "JEE Cutoff",
                "JEE Predicted Cutoff",
                "Eligibility Source"
            ];

            function escapeCSV(value) {
                if (value === null || value === undefined) {
                    return '""';
                }

                return '"' +
                    String(value).replace(/"/g, '""') +
                    '"';
            }

            const rows = colleges.map(college => [
                college.college_name || "",
                college.branch_name || "",
                college.home_university ||
                    college.institute_name || "",
                college.cet_cutoff ?? "",
                college.jee_cutoff ?? "",
                college.jee_predicted_cutoff ?? "",
                college.eligibility_source || "CET"
            ]);

            const csv = [
                headers,
                ...rows
            ]
                .map(row => row.map(escapeCSV).join(","))
                .join("\r\n");

            const blob = new Blob(
                ["\uFEFF" + csv],
                { type: "text/csv;charset=utf-8;" }
            );

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "RANKIFY_Saved_Colleges.csv";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        });
    }





    // ==========================================
    // RENDER SAVED COLLEGES
    // ==========================================

    function renderSavedColleges() {

        savedCollegeList.innerHTML = "";

        noSavedColleges.style.display =
    savedColleges.length === 0 ? "block" : "none";


        savedColleges.forEach((college, index) => {

            const card =
                document.createElement("div");

            card.className = "college-card";

            card.draggable = true;

            card.dataset.index = index;


            // ==================================
            // COLLEGE DATA
            // ==================================

            const collegeName =
                college.college_name ||
                "College name unavailable";


            const branchName =
                college.branch_name ||
                "Branch information unavailable";


            const university =
                college.home_university ||
                college.institute_name ||
                "University information unavailable";


            const cetCutoff =
                college.cet_cutoff !== null &&
                college.cet_cutoff !== undefined
                    ? Number(college.cet_cutoff).toFixed(3)
                    : "N/A";


            const jeeCutoff =
                college.jee_cutoff !== null &&
                college.jee_cutoff !== undefined
                    ? Number(college.jee_cutoff).toFixed(3)
                    : "N/A";


            const eligibilitySource =
                college.eligibility_source ||
                "CET";


            // ==================================
            // CARD HTML
            // ==================================

            card.innerHTML = `

                <div class="drag-handle"
                     title="Drag to reorder">
                    ⋮⋮
                </div>


                <div class="college-info">

                    <h3>${collegeName}</h3>

                    <div class="college-meta">
                        <span>${branchName}</span>
                    </div>

                    <p class="university">
                        ${university}
                    </p>

                </div>


                <div class="college-result">

                    <span class="chance high">
                        Eligible via ${eligibilitySource}
                    </span>


                    <p>CET Cutoff</p>

                    <strong>
                        ${cetCutoff}
                    </strong>


                    <p>JEE Cutoff</p>

                    <strong>
                        ${jeeCutoff}
                    </strong>


                    <p>JEE Predicted Cutoff</p>

                    <strong>
                        ${
                            college.jee_predicted_cutoff !== null &&
                            college.jee_predicted_cutoff !== undefined
                                ? Number(
                                    college.jee_predicted_cutoff
                                ).toFixed(3)
                                : "N/A"
                        }
                    </strong>

                </div>

                

    <button type="button" class="remove-college-btn">
                    Remove
                </button>

            `;


            // ==========================================
// REMOVE SAVED COLLEGE
// ==========================================

const removeButton =
    card.querySelector(".remove-college-btn");

removeButton.addEventListener("click", function (event) {
    event.stopPropagation();

    savedColleges.splice(index, 1);

    localStorage.setItem(
        "savedColleges",
        JSON.stringify(savedColleges)
    );

    renderSavedColleges();

    if (savedColleges.length === 0) {
        noSavedColleges.style.display = "block";
    }
});

            // ==================================
            // DRAG EVENTS
            // ==================================

            card.addEventListener(
                "dragstart",
                function () {

                    card.classList.add(
                        "dragging"
                    );

                    card.dataset.dragIndex =
                        index;
                }
            );


            card.addEventListener(
                "dragend",
                function () {

                    card.classList.remove(
                        "dragging"
                    );

                    saveNewOrder();
                }
            );


            card.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();

                    const draggingCard =
                        document.querySelector(
                            ".college-card.dragging"
                        );


                    if (
                        !draggingCard ||
                        draggingCard === card
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const middle =
                        rect.top +
                        rect.height / 2;


                    if (
                        event.clientY < middle
                    ) {

                        savedCollegeList.insertBefore(
                            draggingCard,
                            card
                        );

                    } else {

                        savedCollegeList.insertBefore(
                            draggingCard,
                            card.nextSibling
                        );

                    }

                }
            );


            savedCollegeList.appendChild(card);

        });

    }


    // ==========================================
    // SAVE NEW DRAG ORDER
    // ==========================================

    function saveNewOrder() {

        const cards =
            Array.from(
                savedCollegeList.querySelectorAll(
                    ".college-card"
                )
            );


        const newOrder =
            cards.map(card => {

                const index =
                    Number(card.dataset.index);

                return savedColleges[index];

            });


        savedColleges =
            newOrder;


        localStorage.setItem(
            "savedColleges",
            JSON.stringify(savedColleges)
        );


        // Re-render so indexes remain correct
        renderSavedColleges();

    }


    // ==========================================
    // INITIAL RENDER
    // ==========================================

    renderSavedColleges();

});