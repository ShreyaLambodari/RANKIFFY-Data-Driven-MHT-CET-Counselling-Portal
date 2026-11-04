
// // ==========================================
// // RANKIFY RECOMMENDATIONS
// // ==========================================

// document.addEventListener("DOMContentLoaded", () => {

//     // ==========================================
//     // FILTER ELEMENTS
//     // ==========================================

//     const collegeFilter =
//         document.getElementById("collegeFilter");

//     const cityFilter =
//         document.getElementById("cityFilter");

//     const branchFilter =
//         document.getElementById("branchFilter");

//     const universityFilter =
//         document.getElementById("universityFilter");

//     const sortFilter =
//         document.getElementById("sortFilter");

//     const clearFilters =
//         document.getElementById("clearFilters");


//     // ==========================================
//     // RESULT ELEMENTS
//     // ==========================================

//     const collegeList =
//         document.getElementById("collegeList");

//     const resultCount =
//         document.getElementById("resultCount");

//     const noResults =
//         document.getElementById("noResults");


//     // ==========================================
//     // SAFETY CHECK
//     // ==========================================

//     if (!collegeList || !resultCount || !noResults) {

//         console.error(
//             "RANKIFY: Required result elements are missing."
//         );

//         return;
//     }


//     // ==========================================
//     // NORMALIZE TEXT
//     // ==========================================

//     function normalizeText(value) {

//         return String(value || "")
//             .toLowerCase()
//             .trim()
//             .replace(/&/g, "and")
//             .replace(/[.,'’()\-\/]/g, " ")
//             .replace(/\s+/g, " ");

//     }


//     // ==========================================
//     // CREATE SLUG
//     // ==========================================

//     function createSlug(value) {

//         return normalizeText(value)
//             .replace(/[^a-z0-9]+/g, "-")
//             .replace(/^-+|-+$/g, "");

//     }


//     // ==========================================
//     // CITY MAPPING
//     // ==========================================

//     const cityAliases = {

//         "chhatrapati-sambhajinagar":
//             ["aurangabad", "chhatrapati sambhajinagar"],

//         "mumbai-city":
//             ["mumbai"],

//         "mumbai-suburban":
//             ["mumbai"],

//         "ahmednagar":
//             ["ahmednagar", "nagar"],

//         "dharashiv":
//             ["dharashiv", "osmanabad"],

//         "nagpur":
//             ["nagpur"],

//         "amravati":
//             ["amravati"],

//         "akola":
//             ["akola"],

//         "buldhana":
//             ["buldhana"],

//         "washim":
//             ["washim"],

//         "yavatmal":
//             ["yavatmal"],

//         "wardha":
//             ["wardha"],

//         "chandrapur":
//             ["chandrapur"],

//         "bhandara":
//             ["bhandara"],

//         "gondia":
//             ["gondia"],

//         "gadchiroli":
//             ["gadchiroli"],

//         "pune":
//             ["pune"],

//         "nashik":
//             ["nashik"],

//         "jalgaon":
//             ["jalgaon"],

//         "dhule":
//             ["dhule"],

//         "nandurbar":
//             ["nandurbar"],

//         "nanded":
//             ["nanded"],

//         "latur":
//             ["latur"],

//         "parbhani":
//             ["parbhani"],

//         "hingoli":
//             ["hingoli"],

//         "beed":
//             ["beed"],

//         "jalna":
//             ["jalna"],

//         "ratnagiri":
//             ["ratnagiri"],

//         "raigad":
//             ["raigad"],

//         "palghar":
//             ["palghar"],

//         "sindhudurg":
//             ["sindhudurg"],

//         "thane":
//             ["thane"],

//         "kolhapur":
//             ["kolhapur"],

//         "sangli":
//             ["sangli"],

//         "satara":
//             ["satara"],

//         "solapur":
//             ["solapur"]
//     };


//     // ==========================================
//     // GET CITY FROM COLLEGE NAME
//     // ==========================================

//     function getCityFromCollege(collegeName) {

//         const name =
//             normalizeText(collegeName);


//         for (
//             const [citySlug, aliases]
//             of Object.entries(cityAliases)
//         ) {

//             for (const alias of aliases) {

//                 if (
//                     name.includes(
//                         normalizeText(alias)
//                     )
//                 ) {

//                     return citySlug;

//                 }

//             }

//         }


//         return "";

//     }


//     // ==========================================
//     // UNIVERSITY MAPPING
//     // ==========================================

//     const universityAliases = {

//         "autonomous": [
//             "autonomous",
//             "autonomous institute"
//         ],

//         "sgbau": [
//             "sant gadge baba amravati university",
//             "sgbau"
//         ],

//         "srtmun": [
//             "swami ramanand teerth marathwada university",
//             "nanded"
//         ],

//         "dbamu": [
//             "dr babasaheb ambedkar marathwada university"
//         ],

//         "deemed-university": [
//             "deemed to be university",
//             "deemed university"
//         ],

//         "mumbai-university": [
//             "mumbai university",
//             "university of mumbai"
//         ],

//         "dbatu": [
//             "dr babasaheb ambedkar technological university",
//             "dbatu"
//         ],

//         "sndt": [
//             "sndt",
//             "sn dt",
//             "sndt women's university"
//         ],

//         "gondwana": [
//             "gondwana university"
//         ],

//         "rtmnu": [
//             "rashtrasant tukadoji maharaj nagpur university",
//             "rtm nagpur university",
//             "rtmnu"
//         ],

//         "kbc-nmu": [
//             "kavayitri bahinabai chaudhari north maharashtra university",
//             "north maharashtra university"
//         ],

//         "sppu": [
//             "savitribai phule pune university",
//             "pune university",
//             "sppu"
//         ],

//         "shivaji-university": [
//             "shivaji university"
//         ],

//         "sppu-solapur": [
//             "punyashlok ahilyadevi holkar solapur university",
//             "solapur university"
//         ]

//     };


//     // ==========================================
//     // READ SESSION STORAGE
//     // ==========================================

//     const storedData =
//         sessionStorage.getItem(
//             "recommendations"
//         );


//     let recommendations = [];


//     if (storedData) {

//         try {

//             const data =
//                 JSON.parse(storedData);


//             recommendations =
//                 Array.isArray(data.recommendations)
//                     ? data.recommendations
//                     : [];


//             console.log(
//                 "Recommendations received:",
//                 recommendations.length
//             );


//         } catch (error) {

//             console.error(
//                 "Error reading recommendations:",
//                 error
//             );

//         }

//     }


//     // ==========================================
//     // BEST MATCH SORT
//     // ==========================================

//     function sortByBestMatch() {

//         recommendations.sort(
//             (a, b) => {

//                 const cutoffA =
//                     Number(
//                         a.cutoff_percentile || 0
//                     );

//                 const cutoffB =
//                     Number(
//                         b.cutoff_percentile || 0
//                     );


//                 return cutoffB - cutoffA;

//             }
//         );

//     }


//     // ==========================================
//     // CREATE COLLEGE CARD
//     // ==========================================

//     function createCollegeCard(college) {

//         const card =
//             document.createElement("article");


//         card.className =
//             "college-card";


//         const collegeName =
//             college.college_name ||
//             "College name unavailable";


//         const branchName =
//             college.branch_name ||
//             "Branch information unavailable";


//         const university =
//             college.home_university ||
//             "University information unavailable";


//         const cutoff =
//             college.cutoff_percentile !== null &&
//             college.cutoff_percentile !== undefined
//                 ? Number(
//                     college.cutoff_percentile
//                 ).toFixed(3)
//                 : "N/A";


//         // ==========================================
//         // CITY
//         // ==========================================

//         const city =
//             college.city ||
//             college.district ||
//             getCityFromCollege(
//                 collegeName
//             );


//         // ==========================================
//         // DATA FOR FILTERING
//         // ==========================================

//         card.dataset.college =
//             normalizeText(collegeName);


//         card.dataset.collegeSlug =
//             createSlug(collegeName);


//         card.dataset.city =
//             normalizeText(city);


//         card.dataset.branch =
//             normalizeText(branchName);


//         card.dataset.university =
//             normalizeText(university);


//         // ==========================================
//         // CARD UI
//         // ==========================================

//         card.innerHTML = `

//             <div class="college-info">

//                 <h3>
//                     ${collegeName}
//                 </h3>

//                 <div class="college-meta">

//                     ${
//                         city
//                             ? `
//                                 <span>
//                                     ${city
//                                         .replaceAll("-", " ")
//                                         .replace(/\b\w/g, c =>
//                                             c.toUpperCase()
//                                         )}
//                                 </span>
//                               `
//                             : ""
//                     }

//                     <span>
//                         ${branchName}
//                     </span>

//                 </div>

//                 <p class="university">
//                     ${university}
//                 </p>

//             </div>


//             <div class="college-result">

//                 <span class="chance high">
//                     Eligible
//                 </span>

//                 <p>
//                     CAP Cutoff
//                 </p>

//                 <strong>
//                     ${cutoff}
//                 </strong>

//                 <button
//                     type="button"
//                     class="view-details-btn">

//                     View Details

//                 </button>

//             </div>

//         `;


//         return card;

//     }


//     // ==========================================
//     // COLLEGE MATCH
//     // ==========================================

//     function matchesCollege(
//         collegeName,
//         collegeSlug,
//         selectedValue
//     ) {

//         if (!selectedValue) {
//             return true;
//         }


//         // Direct slug match
//         if (
//             collegeSlug === selectedValue
//         ) {

//             return true;

//         }


//         // Get selected option text
//         const selectedOption =
//             collegeFilter
//                 ? collegeFilter.options[
//                     collegeFilter.selectedIndex
//                 ]
//                 : null;


//         const selectedText =
//             selectedOption
//                 ? selectedOption.textContent.trim()
//                 : "";


//         // Compare actual names
//         return (
//             normalizeText(collegeName) ===
//             normalizeText(selectedText)
//         );

//     }


//     // ==========================================
//     // CITY MATCH
//     // ==========================================

//     function matchesCity(
//         city,
//         selectedCity
//     ) {

//         if (!selectedCity) {
//             return true;
//         }


//         const normalizedCity =
//             normalizeText(city);


//         const aliases =
//             cityAliases[selectedCity] || [];


//         // Direct
//         if (
//             normalizedCity ===
//             normalizeText(selectedCity)
//         ) {

//             return true;

//         }


//         // Alias
//         return aliases.some(alias =>
//             normalizedCity.includes(
//                 normalizeText(alias)
//             )
//         );

//     }


//     // ==========================================
//     // BRANCH MATCH
//     // ==========================================

//     function matchesBranch(
//         branch,
//         selectedBranch
//     ) {

//         if (!selectedBranch) {
//             return true;
//         }


//         return (
//             normalizeText(branch) ===
//             normalizeText(selectedBranch)
//         );

//     }


//     // ==========================================
//     // UNIVERSITY MATCH
//     // ==========================================

//     function matchesUniversity(
//         university,
//         selectedUniversity
//     ) {

//         if (!selectedUniversity) {
//             return true;
//         }


//         const normalizedUniversity =
//             normalizeText(university);


//         const aliases =
//             universityAliases[
//                 selectedUniversity
//             ] || [];


//         return aliases.some(alias =>
//             normalizedUniversity.includes(
//                 normalizeText(alias)
//             )
//         );

//     }


//     // ==========================================
//     // APPLY FILTERS
//     // ==========================================

//     function applyFilters() {

//         const selectedCollege =
//             collegeFilter
//                 ? collegeFilter.value
//                 : "";


//         const selectedCity =
//             cityFilter
//                 ? cityFilter.value
//                 : "";


//         const selectedBranch =
//             branchFilter
//                 ? branchFilter.value
//                 : "";


//         const selectedUniversity =
//             universityFilter
//                 ? universityFilter.value
//                 : "";


//         const cards =
//             document.querySelectorAll(
//                 "#collegeList .college-card"
//             );


//         let visibleCount = 0;


//         cards.forEach(card => {

//             const college =
//                 card.dataset.college || "";


//             const collegeSlug =
//                 card.dataset.collegeSlug || "";


//             const city =
//                 card.dataset.city || "";


//             const branch =
//                 card.dataset.branch || "";


//             const university =
//                 card.dataset.university || "";


//             const collegeMatch =
//                 matchesCollege(
//                     college,
//                     collegeSlug,
//                     selectedCollege
//                 );


//             const cityMatch =
//                 matchesCity(
//                     city,
//                     selectedCity
//                 );


//             const branchMatch =
//                 matchesBranch(
//                     branch,
//                     selectedBranch
//                 );


//             const universityMatch =
//                 matchesUniversity(
//                     university,
//                     selectedUniversity
//                 );


//             const shouldShow =
//                 collegeMatch &&
//                 cityMatch &&
//                 branchMatch &&
//                 universityMatch;


//             if (shouldShow) {

//                 card.style.display =
//                     "flex";

//                 visibleCount++;

//             } else {

//                 card.style.display =
//                     "none";

//             }

//         });


//         resultCount.textContent =
//             visibleCount;


//         noResults.style.display =
//             visibleCount === 0
//                 ? "block"
//                 : "none";

//     }


//     // ==========================================
//     // DISPLAY RESULTS
//     // ==========================================

//     function displayRecommendations() {

//         // Remove old hardcoded cards
//         collegeList.innerHTML = "";


//         recommendations.forEach(
//             college => {

//                 const card =
//                     createCollegeCard(
//                         college
//                     );


//                 collegeList.appendChild(
//                     card
//                 );

//             }
//         );


//         applyFilters();

//     }


//     // ==========================================
//     // SORT
//     // ==========================================

//     function sortRecommendations() {

//         const sortValue =
//             sortFilter
//                 ? sortFilter.value
//                 : "match";


//         if (sortValue === "name") {

//             recommendations.sort(
//                 (a, b) =>
//                     String(
//                         a.college_name || ""
//                     ).localeCompare(
//                         String(
//                             b.college_name || ""
//                         )
//                     )
//             );

//         } else {

//             // Best Match
//             sortByBestMatch();

//         }


//         displayRecommendations();

//     }


//     // ==========================================
//     // FILTER EVENT LISTENERS
//     // ==========================================

//     if (collegeFilter) {

//         collegeFilter.addEventListener(
//             "change",
//             applyFilters
//         );

//     }


//     if (cityFilter) {

//         cityFilter.addEventListener(
//             "change",
//             applyFilters
//         );

//     }


//     if (branchFilter) {

//         branchFilter.addEventListener(
//             "change",
//             applyFilters
//         );

//     }


//     if (universityFilter) {

//         universityFilter.addEventListener(
//             "change",
//             applyFilters
//         );

//     }


//     if (sortFilter) {

//         sortFilter.addEventListener(
//             "change",
//             sortRecommendations
//         );

//     }


//     // ==========================================
//     // CLEAR ALL
//     // ==========================================

//     if (clearFilters) {

//         clearFilters.addEventListener(
//             "click",
//             () => {

//                 if (collegeFilter)
//                     collegeFilter.value = "";


//                 if (cityFilter)
//                     cityFilter.value = "";


//                 if (branchFilter)
//                     branchFilter.value = "";


//                 if (universityFilter)
//                     universityFilter.value = "";


//                 if (sortFilter)
//                     sortFilter.value = "match";


//                 // Restore best-match order
//                 sortByBestMatch();


//                 displayRecommendations();

//             }
//         );

//     }


//     // ==========================================
//     // INITIAL LOAD
//     // ==========================================

//     if (recommendations.length > 0) {

//         // Always start with best matches
//         sortByBestMatch();

//         displayRecommendations();

//     } else {

//         collegeList.innerHTML = "";

//         resultCount.textContent = "0";

//         noResults.style.display =
//             "block";

//     }

// });

// =============================
// RANKIFY RECOMMENDATIONS
// =============================

const collegeFilter = document.getElementById("collegeFilter");
const cityFilter = document.getElementById("cityFilter");
const branchFilter = document.getElementById("branchFilter");
const universityFilter = document.getElementById("universityFilter");
const sortFilter = document.getElementById("sortFilter");
const clearFilters = document.getElementById("clearFilters");
const collegeList = document.getElementById("collegeList");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

// =============================
// NORMALIZE TEXT
// =============================

function normalizeText(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[.,''()\-\/]/g, " ")
        .replace(/\s+/g, " ");
}

// =============================
// CITY MAPPING
// =============================

const cityMap = {
    "aurangabad": "chhatrapati-sambhajinagar",
    "chhatrapati sambhajinagar": "chhatrapati-sambhajinagar",
    "mumbai": "mumbai-city",
    "nagpur": "nagpur",
    "pune": "pune",
    "nashik": "nashik",
    "jalgaon": "jalgaon",
    "amravati": "amravati",
    "akola": "akola",
    "wardha": "wardha",
    "chandrapur": "chandrapur",
    "nanded": "nanded",
    "latur": "latur",
    "beed": "beed",
    "jalna": "jalna"
};

function normalizeCity(city) {
    const normalized = normalizeText(city);
    return cityMap[normalized] || normalized;
}

// =============================
// UNIVERSITY MAPPING
// =============================

const universityMap = {
    "autonomous": ["autonomous institute"],
    "rtmnu": ["rashtrasant tukadoji maharaj nagpur university", "rtm nagpur university"],
    "sgbau": ["sant gadge baba amravati university"],
    "srtmun": ["swami ramanand teerth marathwada university"],
    "dbamu": ["dr babasaheb ambedkar marathwada university"],
    "sppu": ["savitribai phule pune university"],
    "shivaji-university": ["shivaji university"],
    "deemed-university": ["deemed to be university"],
    "mumbai-university": ["mumbai university"],
    "sndt": ["sndt women's university"],
    "gondwana": ["gondwana university"],
    "dbatu": ["dr babasaheb ambedkar technological university"],
    "kbc-nmu": ["kavayitri bahinabai chaudhari north maharashtra university"]
};

function matchUniversity(actualUniversity, filterValue) {
    if (!filterValue) return true;
    
    const actual = normalizeText(actualUniversity);
    const aliases = universityMap[filterValue] || [];
    
    // Check if actual matches any alias for this filter
    for (const alias of aliases) {
        if (actual.includes(normalizeText(alias)) || normalizeText(alias).includes(actual)) {
            return true;
        }
    }
    
    return false;
}

// =============================
// GET RECOMMENDATIONS FROM SESSION
// =============================

const storedData = sessionStorage.getItem("recommendations");
let recommendations = [];

if (storedData) {
    try {
        const data = JSON.parse(storedData);
        recommendations = Array.isArray(data.recommendations) ? data.recommendations : [];
        console.log("✅ Recommendations loaded:", recommendations.length, "colleges");
    } catch (error) {
        console.error("❌ Error reading recommendations:", error);
    }
}

// =============================
// CREATE COLLEGE CARD
// =============================

function createCollegeCard(college) {
    const card = document.createElement("article");
    card.className = "college-card";

    const collegeName = college.college_name || "College name unavailable";
    const branchName = college.branch_name || "Branch information unavailable";
    const university = college.institute_name || college.home_university || "University information unavailable";
    
const city =
    college.city ||
    college.district ||
    "";

    const cetCutoff =
    college.cet_cutoff !== null &&
    college.cet_cutoff !== undefined
        ? Number(college.cet_cutoff).toFixed(3)
        : "N/A";

    const cetPredictedCutoff =
    college.cet_predicted_cutoff !== null &&
    college.cet_predicted_cutoff !== undefined
        ? Number(college.cet_predicted_cutoff).toFixed(3)
        : "N/A";

const jeeCutoff =
    college.jee_cutoff !== null &&
    college.jee_cutoff !== undefined
        ? Number(college.jee_cutoff).toFixed(3)
        : "N/A";

const eligibilitySource =
    college.eligibility_source || "CET";
    card.dataset.eligibilitySource =
    normalizeText(eligibilitySource);

    // ✅ STORE DATA FOR FILTERING
    card.dataset.college = normalizeText(collegeName);
    card.dataset.branch = normalizeText(branchName);
    card.dataset.university = normalizeText(university);
    card.dataset.universityFull = university; // Store full name for matching
    card.dataset.city = normalizeCity(city);
    
card.innerHTML = `
    <div class="college-info">
        <h3>${collegeName}</h3>
        <div class="college-meta">
            <span>${branchName}</span>
        </div>
        <p class="university">${university}</p>
    </div>

    <div class="college-result">
        <span class="chance high">
            Eligible via ${eligibilitySource}
        </span>

        <div class="cutoff-row">
            <span class="cutoff-item">
                CET: <strong class="${cetCutoff === "N/A" ? "not-available" : ""}">${cetCutoff}</strong>
            </span>

            <span class="cutoff-item">
                CET Predicted Cutoff: <strong class="${cetPredictedCutoff === "N/A" ? "not-available" : ""}">${cetPredictedCutoff}</strong>
            </span>

            <span class="cutoff-item">
                JEE: <strong class="${jeeCutoff === "N/A" ? "not-available" : ""}">${jeeCutoff}</strong>
            </span>

            <span class="cutoff-item">
                    JEE Predicted Cutoff: <strong class="${
                    college.jee_predicted_cutoff == null
                        ? "not-available"
                        : ""
                }">${
                    college.jee_predicted_cutoff != null
                        ? Number(college.jee_predicted_cutoff).toFixed(3)
                        : "N/A"
                }</strong>
            </span>
        </div>

        <button type="button" class="save-college-btn">
            Save College
        </button>
    </div>
`;


    const saveButton =
    card.querySelector(".save-college-btn");

saveButton.addEventListener("click", () => {

    const savedColleges =
        JSON.parse(
            localStorage.getItem("savedColleges")
        ) || [];

    const collegeKey =
        `${college.college_name}_${college.branch_name}`;

    const alreadySaved =
        savedColleges.some(
            saved =>
                saved.key === collegeKey
        );

    if (!alreadySaved) {

        savedColleges.push({
            key: collegeKey,
            ...college
        });

        localStorage.setItem(
            "savedColleges",
            JSON.stringify(savedColleges)
        );

        saveButton.textContent =
            "Saved ✓";

        saveButton.classList.add(
            "saved"
        );

    } else {

        const updatedSaved =
            savedColleges.filter(
                saved =>
                    saved.key !== collegeKey
            );

        localStorage.setItem(
            "savedColleges",
            JSON.stringify(updatedSaved)
        );

        saveButton.textContent =
            "Save College";

        saveButton.classList.remove(
            "saved"
        );
    }
});

    return card;
}

// =============================
// DISPLAY RECOMMENDATIONS
// =============================

function displayRecommendations() {
    collegeList.innerHTML = "";
    recommendations.forEach(college => {
        const card = createCollegeCard(college);
        collegeList.appendChild(card);
    });
    applyFilters();
}

// =============================
// APPLY FILTERS
// =============================

// function applyFilters() {
//     const selectedCollege = normalizeText(collegeFilter.value);
//     const selectedCity = cityFilter.value.toLowerCase();
//     const selectedBranch = normalizeText(branchFilter.value);
//     const selectedUniversity = universityFilter.value;

//     const cards = document.querySelectorAll(".college-card");
//     let visibleCount = 0;

//     cards.forEach(card => {
//         const collegeName = card.dataset.college;
//         const branchName = card.dataset.branch;
//         const universityFull = card.dataset.universityFull;

//         // ✅ COLLEGE FILTER
//         const collegeMatch = !selectedCollege || collegeName.includes(selectedCollege);

//         // ✅ BRANCH FILTER - Exact or partial match
//         const branchMatch = !selectedBranch || 
//             branchName === selectedBranch || 
//             branchName.includes(selectedBranch);

//         // ✅ UNIVERSITY FILTER - Using mapping
//         const universityMatch = matchUniversity(universityFull, selectedUniversity);

//         if (collegeMatch && branchMatch && universityMatch) {
//             card.style.display = "flex";
//             visibleCount++;
//         } else {
//             card.style.display = "none";
//         }
//     });

//     resultCount.textContent = visibleCount;
//     noResults.style.display = visibleCount === 0 ? "block" : "none";
// }



// function applyFilters() {
//     const selectedCollege = normalizeText(collegeFilter.value);
//     const selectedCity = normalizeCity(cityFilter.value);
//     const selectedUniversity = universityFilter.value;

//     const cards = document.querySelectorAll(".college-card");
//     let visibleCount = 0;

//     cards.forEach(card => {
//         const collegeName = card.dataset.college;
//         const universityFull = card.dataset.universityFull;
//         const cardCity = normalizeCity(card.dataset.city);

//         const collegeMatch =
//             !selectedCollege ||
//             collegeName.includes(selectedCollege);

//         const cityMatch =
//             !selectedCity ||
//             cardCity === selectedCity;

//         const universityMatch =
//             matchUniversity(universityFull, selectedUniversity);

//         if (collegeMatch && cityMatch && universityMatch) {
//             card.style.display = "flex";
//             visibleCount++;
//         } else {
//             card.style.display = "none";
//         }
//     });

//     resultCount.textContent = visibleCount;
//     noResults.style.display = visibleCount === 0 ? "block" : "none";
// }22222222222


function applyFilters() {
    const selectedEligibility = collegeFilter
        ? collegeFilter.value
        : "";

    const selectedCity = cityFilter
        ? normalizeCity(cityFilter.value)
        : "";

    const selectedUniversity = universityFilter
        ? universityFilter.value
        : "";

    const cards = document.querySelectorAll(
        "#collegeList .college-card"
    );

    let visibleCount = 0;

    cards.forEach(card => {
        const eligibility = normalizeText(
            card.dataset.eligibilitySource || ""
        );

        const universityFull =
            card.dataset.universityFull || "";

        const cardCity = normalizeCity(
            card.dataset.city || ""
        );

        // Eligibility filter
        let eligibilityMatch = true;

        if (selectedEligibility === "cet") {
            eligibilityMatch = eligibility === "cet";
        } else if (selectedEligibility === "jee") {
            eligibilityMatch = eligibility === "jee";
        } else if (selectedEligibility === "both") {
            eligibilityMatch = eligibility === "cet + jee";
        }

        // City filter
        const cityMatch =
            !selectedCity || cardCity === selectedCity;

        // University filter
        const universityMatch = matchUniversity(
            universityFull,
            selectedUniversity
        );

        const shouldShow =
            eligibilityMatch &&
            cityMatch &&
            universityMatch;

        card.style.display = shouldShow ? "flex" : "none";

        if (shouldShow) {
            visibleCount++;
        }
    });

    resultCount.textContent = visibleCount;

    noResults.style.display =
        visibleCount === 0 ? "block" : "none";
}




// function applyFilters() {
//     const selectedEligibility = collegeFilter
//         ? collegeFilter.value
//         : "";

//     const selectedCity = cityFilter
//         ? normalizeCity(cityFilter.value)
//         : "";

//     const selectedUniversity = universityFilter
//         ? universityFilter.value
//         : "";

//     const cards = document.querySelectorAll(
//         "#collegeList .college-card"
//     );

//     let visibleCount = 0;

//     cards.forEach(card => {
//         const eligibility =
//             normalizeText(card.dataset.eligibilitySource);

//         const universityFull =
//             card.dataset.universityFull || "";

//         const cardCity = normalizeCity(
//             card.dataset.city || ""
//         );

//         let eligibilityMatch = true;

//         if (selectedEligibility === "cet") {
//             eligibilityMatch =
//                 eligibility.includes("cet") &&
//                 !eligibility.includes("jee");
//         } else if (selectedEligibility === "jee") {
//             eligibilityMatch =
//                 eligibility.includes("jee") &&
//                 !eligibility.includes("cet");
//         } else if (selectedEligibility === "both") {
//             eligibilityMatch =
//                 eligibility.includes("both") ||
//                 (
//                     eligibility.includes("cet") &&
//                     eligibility.includes("jee")
//                 );
//         }

//         const cityMatch =
//             !selectedCity || cardCity === selectedCity;

//         const universityMatch =
//             matchUniversity(
//                 universityFull,
//                 selectedUniversity
//             );

//         const shouldShow =
//             eligibilityMatch &&
//             cityMatch &&
//             universityMatch;

//         card.style.display = shouldShow ? "flex" : "none";

//         if (shouldShow) {
//             visibleCount++;
//         }
//     });

//     resultCount.textContent = visibleCount;

//     noResults.style.display =
//         visibleCount === 0 ? "block" : "none";
// }




// =============================
// SORT RESULTS
// =============================

function sortRecommendations() {
    const sortValue = sortFilter.value;

    if (sortValue === "name") {
        recommendations.sort((a, b) =>
            String(a.college_name || "").localeCompare(String(b.college_name || ""))
        );
    } else {
        // Best Match / Cutoff (highest first)
        recommendations.sort((a, b) =>
            Number(b.cutoff_percentile || 0) - Number(a.cutoff_percentile || 0)
        );
    }

    displayRecommendations();
}

// =============================
// EVENT LISTENERS
// =============================

collegeFilter.addEventListener("change", applyFilters);
cityFilter.addEventListener("change", applyFilters);
// branchFilter.addEventListener("change", applyFilters);
universityFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", sortRecommendations);

clearFilters.addEventListener("click", () => {
    collegeFilter.value = "";
    cityFilter.value = "";
    // branchFilter.value = "";
    universityFilter.value = "";
    sortFilter.value = "match";
    applyFilters();
});




// =============================
// INITIAL LOAD
// =============================

if (recommendations.length > 0) {
    displayRecommendations();
} else {
    collegeList.innerHTML = "";
    resultCount.textContent = "0";
    noResults.style.display = "block";
}

// =============================
// VIEW SAVED COLLEGES
// =============================

const viewSavedColleges =
    document.getElementById("viewSavedColleges");

if (viewSavedColleges) {

    viewSavedColleges.addEventListener("click", function () {

        window.location.href = "saved-colleges.html";

    });

}