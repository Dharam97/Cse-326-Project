var defaultNotices = [
    {
        id: "notice-1",
        circularNo: "NB-2026-041",
        category: "Exams",
        title: "Mid-semester timetable is available",
        body: "The sample timetable is ready for students. Please check your course and room details before the first paper.",
        department: "Examination Cell",
        date: "2026-11-03",
        priority: true,
        attachment: "Sample timetable PDF (label only)"
    },
    {
        id: "notice-2",
        circularNo: "NB-2026-040",
        category: "Events",
        title: "Student project showcase registration",
        body: "Students may add their names to the campus project showcase list. Bring a short description of your project.",
        department: "Student Activities",
        date: "2026-11-02",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-3",
        circularNo: "NB-2026-039",
        category: "Academic",
        title: "Library hours for this week",
        body: "The library will open during its regular daytime hours this week. Ask at the library desk if you need help finding a book.",
        department: "Library",
        date: "2026-11-01",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-4",
        circularNo: "NB-2026-038",
        category: "General",
        title: "Keep student ID cards ready at the gate",
        body: "Please carry your student identity card when entering campus. This is a sample notice for the website notice board.",
        department: "Campus Office",
        date: "2026-10-30",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-5",
        circularNo: "NB-2026-037",
        category: "Events",
        title: "Introductory coding club meeting",
        body: "New members are welcome to join a beginner-friendly coding club meeting. Bring a notebook and your questions.",
        department: "Coding Club",
        date: "2026-10-28",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-6",
        circularNo: "NB-2026-036",
        category: "Academic",
        title: "Academic calendar reminder",
        body: "Review the sample academic calendar and note the dates that apply to your class. Contact your department for official information.",
        department: "Academic Office",
        date: "2026-10-26",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-7",
        circularNo: "NB-2026-035",
        category: "Events",
        title: "Campus open-mic show",
        body: "Sample event notice. Example venue: Main Auditorium. Example time: 5:00 PM. Replace with confirmed show details.",
        department: "Student Activities",
        date: "2026-11-14",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-8",
        circularNo: "NB-2026-034",
        category: "Events",
        title: "College cultural fest",
        body: "Sample event notice. Example venue: Campus Grounds. Add the official date, schedule, stalls and organizer contact.",
        department: "Student Activities",
        date: "2026-11-21",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-9",
        circularNo: "NB-2026-033",
        category: "Events",
        title: "Student theatre performance",
        body: "Sample event notice. Example venue: Main Auditorium. Replace with the actual play title, time and entry details.",
        department: "Drama Club",
        date: "2026-11-27",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-10",
        circularNo: "NB-2026-032",
        category: "Events",
        title: "Club fair and campus happenings",
        body: "Sample activity notice. Example venue: Student Activity Center. Add actual clubs, registration information and contact details.",
        department: "Student Activities",
        date: "2026-12-02",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-11",
        circularNo: "NB-2026-031",
        category: "Fees",
        title: "Fee deadline reminder",
        body: "Sample fee notice only. Replace this with the official due date, payment instructions, and finance office contact.",
        department: "Accounts Office",
        date: "2026-11-10",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-12",
        circularNo: "NB-2026-030",
        category: "Placement",
        title: "Placement preparation session",
        body: "Sample placement notice only. Add confirmed registration details, venue, time, and eligible courses.",
        department: "Career Development Cell",
        date: "2026-11-18",
        priority: false,
        attachment: ""
    },
    {
        id: "notice-13",
        circularNo: "NB-2026-029",
        category: "Department",
        title: "Computer Science lab schedule",
        body: "Sample department notice only. Replace this with the approved lab schedule and contact information.",
        department: "Computer Science Department",
        date: "2026-11-12",
        priority: false,
        attachment: ""
    }
];

var noticeStorageKey = "noticeBoardNotices";
var savedStorageKey = "noticeBoardSavedIds";
// Keep this password in the front-end source only for local practice use.
var adminPasswordValue = "campus123";
var notices = loadNotices();
var savedIds = loadSavedIds();
var selectedCategory = "All";
var selectedDepartment = "All";
var searchText = "";
var sortMode = "newest";
var savedOnly = false;
var adminMode = false;

var statsBox = document.getElementById("stats");
var urgentBanner = document.getElementById("urgentBanner");
var categoryList = document.getElementById("categoryList");
var departmentFilter = document.getElementById("departmentFilter");
var noticeGrid = document.getElementById("noticeGrid");
var searchInput = document.getElementById("searchInput");
var sortSelect = document.getElementById("sortSelect");
var themeButton = document.getElementById("themeButton");
var savedButton = document.getElementById("savedButton");
var adminButton = document.getElementById("adminButton");
var newNoticeButton = document.getElementById("newNoticeButton");
var statusNote = document.getElementById("statusNote");
var resultLine = document.getElementById("resultLine");
var modalBackdrop = document.getElementById("modalBackdrop");
var modalContent = document.getElementById("modalContent");
var toast = document.getElementById("toast");

function loadNotices() {
    try {
        var savedText = localStorage.getItem(noticeStorageKey);
        if (savedText) {
            var savedNotices = JSON.parse(savedText);

            // Add any new sample notices that are not in this browser yet.
            for (var i = 0; i < defaultNotices.length; i++) {
                var alreadyThere = false;

                for (var j = 0; j < savedNotices.length; j++) {
                    if (savedNotices[j].id === defaultNotices[i].id) {
                        alreadyThere = true;
                    }
                }

                if (alreadyThere === false) {
                    savedNotices.push(defaultNotices[i]);
                }
            }

            return savedNotices;
        }
    } catch (error) {
        console.log("Saved notices could not be read.");
    }
    return defaultNotices;
}

function loadSavedIds() {
    try {
        var savedText = localStorage.getItem(savedStorageKey);
        if (savedText) {
            return JSON.parse(savedText);
        }
    } catch (error) {
        console.log("Saved favourites could not be read.");
    }
    return [];
}

function saveNotices() {
    try {
        localStorage.setItem(noticeStorageKey, JSON.stringify(notices));
        return true;
    } catch (error) {
        showToast("Browser storage is unavailable or full");
        return false;
    }
}

function saveSavedIds() {
    try {
        localStorage.setItem(savedStorageKey, JSON.stringify(savedIds));
    } catch (error) {
        showToast("Browser storage is unavailable or full");
    }
}

function addTextElement(parent, tagName, className, text) {
    var element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
}

function addButton(parent, className, text, clickFunction) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.addEventListener("click", clickFunction);
    parent.appendChild(button);
    return button;
}

function isSaved(noticeId) {
    for (var i = 0; i < savedIds.length; i++) {
        if (savedIds[i] === noticeId) {
            return true;
        }
    }
    return false;
}

function toggleSaved(noticeId) {
    var foundIndex = -1;
    for (var i = 0; i < savedIds.length; i++) {
        if (savedIds[i] === noticeId) {
            foundIndex = i;
        }
    }

    if (foundIndex === -1) {
        savedIds.push(noticeId);
    } else {
        savedIds.splice(foundIndex, 1);
    }

    saveSavedIds();
    renderPage();
}

function formatDate(dateText) {
    var parts = dateText.split("-");
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthNumber = Number(parts[1]) - 1;
    return Number(parts[2]) + " " + monthNames[monthNumber] + " " + parts[0];
}

function renderStats() {
    var urgentCount = 0;
    for (var i = 0; i < notices.length; i++) {
        if (notices[i].priority) {
            urgentCount = urgentCount + 1;
        }
    }

    statsBox.innerHTML = "";
    var totalBox = document.createElement("div");
    totalBox.className = "stat-box";
    addTextElement(totalBox, "span", "stat-number", notices.length);
    addTextElement(totalBox, "span", "stat-label", "Notices");
    statsBox.appendChild(totalBox);

    var urgentBox = document.createElement("div");
    urgentBox.className = "stat-box urgent-stat";
    addTextElement(urgentBox, "span", "stat-number", urgentCount);
    addTextElement(urgentBox, "span", "stat-label", "Important");
    statsBox.appendChild(urgentBox);
}

function renderUrgentBanner() {
    var urgentNotice = null;
    for (var i = 0; i < notices.length; i++) {
        if (notices[i].priority) {
            urgentNotice = notices[i];
            break;
        }
    }

    urgentBanner.innerHTML = "";
    if (urgentNotice === null) {
        urgentBanner.hidden = true;
        return;
    }

    urgentBanner.hidden = false;
    var label = addTextElement(urgentBanner, "span", "urgent-label", "IMPORTANT NOTICE");
    var title = addTextElement(urgentBanner, "h2", "urgent-title", urgentNotice.title);
    var detail = addTextElement(urgentBanner, "span", "muted", urgentNotice.department + " · " + formatDate(urgentNotice.date));
    label.setAttribute("aria-hidden", "true");
    title.setAttribute("aria-label", "Important notice: " + urgentNotice.title);
    detail.className = "muted";
}

function countCategory(categoryName) {
    var count = 0;
    for (var i = 0; i < notices.length; i++) {
        if (notices[i].category === categoryName) {
            count = count + 1;
        }
    }
    return count;
}

function makeCategoryButton(categoryName, count) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";
    if (categoryName === selectedCategory) {
        button.className = "category-button active";
    }
    button.textContent = categoryName;

    var number = document.createElement("span");
    number.className = "category-count";
    number.textContent = count;
    button.appendChild(number);

    button.addEventListener("click", function () {
        selectedCategory = categoryName;
        renderPage();
    });

    categoryList.appendChild(button);
}

function renderCategoryButtons() {
    var categories = ["All", "Department", "Exams", "Fees", "Events", "Placement", "Academic", "General"];
    categoryList.innerHTML = "";

    for (var i = 0; i < categories.length; i++) {
        var categoryName = categories[i];
        var count = notices.length;
        if (categoryName !== "All") {
            count = countCategory(categoryName);
        }
        makeCategoryButton(categoryName, count);
    }
}

function renderDepartmentOptions() {
    var departments = [];
    var foundSelectedDepartment = selectedDepartment === "All";

    for (var i = 0; i < notices.length; i++) {
        var departmentName = notices[i].department;
        var alreadyListed = false;

        for (var j = 0; j < departments.length; j++) {
            if (departments[j] === departmentName) {
                alreadyListed = true;
            }
        }

        if (alreadyListed === false) {
            departments.push(departmentName);
        }

        if (departmentName === selectedDepartment) {
            foundSelectedDepartment = true;
        }
    }

    if (foundSelectedDepartment === false) {
        selectedDepartment = "All";
    }

    departmentFilter.innerHTML = "";
    var allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All departments";
    departmentFilter.appendChild(allOption);

    for (var k = 0; k < departments.length; k++) {
        var departmentOption = document.createElement("option");
        departmentOption.value = departments[k];
        departmentOption.textContent = departments[k];
        departmentFilter.appendChild(departmentOption);
    }

    departmentFilter.value = selectedDepartment;
}

function getVisibleNotices() {
    var visibleNotices = [];
    var searchWords = searchText.toLowerCase();

    for (var i = 0; i < notices.length; i++) {
        var notice = notices[i];
        var matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
        var matchesDepartment = selectedDepartment === "All" || notice.department === selectedDepartment;
        var matchesSaved = savedOnly === false || isSaved(notice.id);
        var allNoticeWords = (notice.title + " " + notice.circularNo + " " + notice.category + " " + notice.department + " " + notice.body).toLowerCase();
        var matchesSearch = allNoticeWords.indexOf(searchWords) !== -1;

        if (matchesCategory && matchesDepartment && matchesSaved && matchesSearch) {
            visibleNotices.push(notice);
        }
    }

    return visibleNotices;
}

function sortNotices(noticeList) {
    for (var i = 0; i < noticeList.length; i++) {
        for (var j = 0; j < noticeList.length - 1 - i; j++) {
            var first = noticeList[j];
            var second = noticeList[j + 1];
            var shouldSwap = false;

            if (sortMode === "priority") {
                if (first.priority === false && second.priority === true) {
                    shouldSwap = true;
                } else if (first.priority === second.priority && first.date < second.date) {
                    shouldSwap = true;
                }
            } else if (sortMode === "oldest") {
                if (first.date > second.date) {
                    shouldSwap = true;
                }
            } else {
                if (first.date < second.date) {
                    shouldSwap = true;
                }
            }

            if (shouldSwap) {
                noticeList[j] = second;
                noticeList[j + 1] = first;
            }
        }
    }

    return noticeList;
}

function makeNoticeCard(notice) {
    var card = document.createElement("article");
    card.className = "notice-card";
    if (notice.priority) {
        card.className = "notice-card priority-card";
    }

    var topRow = document.createElement("div");
    topRow.className = "notice-top";
    addTextElement(topRow, "span", "category-tag", notice.category);

    if (notice.priority) {
        addTextElement(topRow, "span", "category-tag priority-tag", "Important");
    }

    var saveText = "♡";
    var saveClass = "save-button";
    if (isSaved(notice.id)) {
        saveText = "♥";
        saveClass = "save-button saved";
    }

    var saveButtonForNotice = addButton(topRow, saveClass, saveText, function () {
        toggleSaved(notice.id);
    });
    saveButtonForNotice.setAttribute("aria-label", "Save or remove this notice");
    card.appendChild(topRow);

    addTextElement(card, "h2", "notice-title", notice.title);

    var shortBody = notice.body;
    if (shortBody.length > 135) {
        shortBody = shortBody.substring(0, 135) + "...";
    }
    addTextElement(card, "p", "notice-summary", shortBody);

    var bottomRow = document.createElement("div");
    bottomRow.className = "notice-bottom";
    addTextElement(bottomRow, "span", "", notice.department);
    addTextElement(bottomRow, "span", "", formatDate(notice.date));
    card.appendChild(bottomRow);

    addButton(card, "details-button", "Read details", function () {
        openNotice(notice.id);
    });

    return card;
}

function renderNoticeCards() {
    var visibleNotices = getVisibleNotices();
    visibleNotices = sortNotices(visibleNotices);
    noticeGrid.innerHTML = "";

    if (visibleNotices.length === 0) {
        addTextElement(noticeGrid, "p", "empty-message", "No notices match. Try a different search or category.");
    } else {
        for (var i = 0; i < visibleNotices.length; i++) {
            noticeGrid.appendChild(makeNoticeCard(visibleNotices[i]));
        }
    }

    var resultText = visibleNotices.length + " notice(s) shown";
    if (savedOnly) {
        resultText = resultText + " · Saved only";
    }
    resultLine.textContent = resultText;
}

function renderPage() {
    renderStats();
    renderUrgentBanner();
    renderDepartmentOptions();
    renderCategoryButtons();
    renderNoticeCards();
}

function findNotice(noticeId) {
    for (var i = 0; i < notices.length; i++) {
        if (notices[i].id === noticeId) {
            return notices[i];
        }
    }
    return null;
}

function openNotice(noticeId) {
    var notice = findNotice(noticeId);
    if (notice === null) {
        return;
    }

    modalContent.innerHTML = "";
    var headingRow = document.createElement("div");
    headingRow.className = "modal-heading";
    addTextElement(headingRow, "span", "category-tag", notice.category);
    addButton(headingRow, "close-button", "×", closeModal);
    modalContent.appendChild(headingRow);

    addTextElement(modalContent, "h2", "", notice.title);
    addTextElement(modalContent, "p", "modal-copy", notice.body);

    var facts = document.createElement("p");
    facts.className = "modal-facts";
    facts.textContent = "Circular: " + notice.circularNo + " · Department: " + notice.department + " · Date: " + formatDate(notice.date);
    modalContent.appendChild(facts);

    if (notice.attachment) {
        addTextElement(modalContent, "p", "warning-box", notice.attachment + ". No real file is attached in this browser.");
    }

    if (notice.attachmentName && notice.attachmentData) {
        var attachmentLink = document.createElement("a");
        attachmentLink.className = "attachment-link";
        attachmentLink.href = notice.attachmentData;
        attachmentLink.download = notice.attachmentName;
        attachmentLink.textContent = "Download attachment: " + notice.attachmentName;
        modalContent.appendChild(attachmentLink);
        addTextElement(modalContent, "p", "attachment-note", "This file is saved only in this browser. It is not uploaded to a college server.");
    }

    if (adminMode) {
        var actionRow = document.createElement("div");
        actionRow.className = "modal-actions";
        addButton(actionRow, "delete-button", "Delete notice", function () {
            deleteNotice(notice.id);
        });
        modalContent.appendChild(actionRow);
    }

    modalBackdrop.hidden = false;
}

function openAddForm() {
    modalContent.innerHTML = "<div class=\"modal-heading\"><h2>Add a notice</h2><button class=\"close-button\" id=\"closeFormButton\" type=\"button\">×</button></div>" +
        "<p class=\"warning-box\">The notice data is stored in this browser only.</p>" +
        "<form class=\"notice-form\" id=\"noticeForm\">" +
        "<label>Title<input id=\"formTitle\" required maxlength=\"90\"></label>" +
        "<label>Circular number<input id=\"formNumber\" required maxlength=\"30\"></label>" +
        "<label>Category<select id=\"formCategory\"><option>Department</option><option>Exams</option><option>Fees</option><option>Events</option><option>Placement</option><option>Academic</option><option>General</option></select></label>" +
        "<label>Department<select id=\"formDepartment\" required>" +
        "<option value=\"\" selected>Choose a department</option>" +
        "<option>Accounts Office</option>" +
        "<option>Academic Office</option>" +
        "<option>Campus Office</option>" +
        "<option>Career Development Cell</option>" +
        "<option>Computer Science Department</option>" +
        "<option>Coding Club</option>" +
        "<option>Drama Club</option>" +
        "<option>Examination Cell</option>" +
        "<option>Library</option>" +
        "<option>Student Activities</option>" +
        "</select></label>" +

        "<label>Date<input id=\"formDate\" type=\"date\" required></label>" +
        "<label class=\"check-row\"><input id=\"formPriority\" type=\"checkbox\"> Mark as important</label>" +
        "<label class=\"wide-field\">Notice text<textarea id=\"formBody\" required maxlength=\"500\"></textarea></label>" +
        "<label class=\"wide-field\">Optional attachment (up to 500 KB)<input id=\"formAttachment\" type=\"file\"></label>" +
        "<p class=\"attachment-note wide-field\">The selected file stays in this browser. It will not be uploaded or shared with other students.</p>" +
        "<div class=\"wide-field form-actions\"><button class=\"small-button\" id=\"cancelForm\" type=\"button\">Cancel</button><button class=\"primary-button\" type=\"submit\">Save notice</button></div>" +
        "</form>";

    modalBackdrop.hidden = false;

    var noticeForm = document.getElementById("noticeForm");
    var cancelForm = document.getElementById("cancelForm");
    var closeFormButton = document.getElementById("closeFormButton");
    cancelForm.addEventListener("click", closeModal);
    closeFormButton.addEventListener("click", closeModal);
    noticeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addNewNotice();
    });
}

function addNewNotice() {
    var title = document.getElementById("formTitle").value.trim();
    var circularNo = document.getElementById("formNumber").value.trim();
    var category = document.getElementById("formCategory").value;
    var department = document.getElementById("formDepartment").value.trim();
    var date = document.getElementById("formDate").value;
    var body = document.getElementById("formBody").value.trim();
    var priority = document.getElementById("formPriority").checked;
    var selectedFile = document.getElementById("formAttachment").files[0];

    if (title === "" || circularNo === "" || department === "" || date === "" || body === "") {
        showToast("Please fill in each required field");
        return;
    }

    if (selectedFile && selectedFile.size > 500 * 1024) {
        showToast("Please choose a file smaller than 500 KB");
        return;
    }

    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function () {
            saveNewNotice(title, circularNo, category, department, date, body, priority, selectedFile.name, reader.result);
        };
        reader.onerror = function () {
            showToast("The file could not be read. Please try another file");
        };
        reader.readAsDataURL(selectedFile);
    } else {
        saveNewNotice(title, circularNo, category, department, date, body, priority, "", "");
    }
}

function saveNewNotice(title, circularNo, category, department, date, body, priority, attachmentName, attachmentData) {
    var newNotice = {
        id: "notice-" + (notices.length + 1),
        circularNo: circularNo,
        category: category,
        title: title,
        body: body,
        department: department,
        date: date,
        priority: priority,
        attachment: "",
        attachmentName: attachmentName,
        attachmentData: attachmentData
    };

    notices.push(newNotice);
    if (saveNotices() === false) {
        notices.pop();
        return;
    }
    closeModal();
    renderPage();
    showToast("Notice saved in this browser");
}

function openAdminLogin() {
    modalContent.innerHTML = "<div class=\"modal-heading\"><h2>Admin access</h2><button class=\"close-button\" id=\"closeLoginButton\" type=\"button\">×</button></div>" +
        "<p class=\"warning-box\">This local password is visible in script.js. It is not a secure login and does not protect real college data.</p>" +
        "<form class=\"notice-form\" id=\"adminLoginForm\">" +
        "<label class=\"wide-field\">Password<input id=\"adminPassword\" type=\"password\" required autocomplete=\"current-password\"></label>" +
        "<div class=\"wide-field form-actions\"><button class=\"small-button\" id=\"cancelLogin\" type=\"button\">Cancel</button><button class=\"primary-button\" type=\"submit\">Continue</button></div>" +
        "</form>";

    modalBackdrop.hidden = false;
    var adminLoginForm = document.getElementById("adminLoginForm");
    var adminPassword = document.getElementById("adminPassword");
    document.getElementById("closeLoginButton").addEventListener("click", closeModal);
    document.getElementById("cancelLogin").addEventListener("click", closeModal);
    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (adminPassword.value === adminPasswordValue) {
            setAdminMode(true);
            closeModal();
            showToast("Admin access enabled");
        } else {
            showToast("Incorrect password");
            adminPassword.value = "";
            adminPassword.focus();
        }
    });
}

function setAdminMode(isEnabled) {
    adminMode = isEnabled;
    newNoticeButton.hidden = !adminMode;
    adminButton.textContent = adminMode ? "Admin mode on" : "Admin";
}

function deleteNotice(noticeId) {
    var noticeIndex = -1;

    for (var i = 0; i < notices.length; i++) {
        if (notices[i].id === noticeId) {
            noticeIndex = i;
            break;
        }
    }

    if (noticeIndex === -1) {
        return;
    }

    var shouldDelete = window.confirm("Delete this notice from this browser?");
    if (shouldDelete === false) {
        return;
    }

    notices.splice(noticeIndex, 1);

    for (var j = savedIds.length - 1; j >= 0; j--) {
        if (savedIds[j] === noticeId) {
            savedIds.splice(j, 1);
        }
    }

    saveNotices();
    saveSavedIds();
    closeModal();
    renderPage();
    showToast("Notice deleted");
}

function closeModal() {
    modalBackdrop.hidden = true;
}

function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.setTimeout(function () {
        toast.hidden = true;
    }, 2200);
}

searchInput.addEventListener("input", function () {
    searchText = searchInput.value.trim();
    renderNoticeCards();
});

departmentFilter.addEventListener("change", function () {
    selectedDepartment = departmentFilter.value;
    renderNoticeCards();
});

sortSelect.addEventListener("change", function () {
    sortMode = sortSelect.value;
    renderNoticeCards();
});

themeButton.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
        document.body.classList.remove("dark-mode");
        themeButton.textContent = "Dark mode";
        themeButton.setAttribute("aria-pressed", "false");
    } else {
        document.body.classList.add("dark-mode");
        themeButton.textContent = "Light mode";
        themeButton.setAttribute("aria-pressed", "true");
    }
});

savedButton.addEventListener("click", function () {
    savedOnly = !savedOnly;
    savedButton.className = "small-button";
    savedButton.textContent = "♡ Saved";
    if (savedOnly) {
        savedButton.className = "small-button active";
        savedButton.textContent = "♥ Saved";
    }
    renderNoticeCards();
});

adminButton.addEventListener("click", function () {
    if (adminMode) {
        setAdminMode(false);
    } else {
        openAdminLogin();
    }
});

newNoticeButton.addEventListener("click", openAddForm);

modalBackdrop.addEventListener("click", function (event) {
    if (event.target === modalBackdrop) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

renderPage();