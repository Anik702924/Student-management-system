const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const search = document.getElementById("searchInput");
const totalStudents = document.getElementById("totalStudents");
const submitButton = document.getElementById("submitButton");
const formTitle = document.getElementById("formTitle");
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;
showStudents();
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let department = document.getElementById("department").value.trim();
    let semester = document.getElementById("semester").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    if (
        name === "" ||
        roll === "" ||
        department === "" ||
        semester === "" ||
        email === "" ||
        phone === ""
    ) {
        alert("Please fill in all the fields.");
        return;
    }
    let student = {
        name: name,
        roll: roll,
        department: department,
        semester: semester,
        email: email,
        phone: phone
    };
    if (editIndex !== -1) {
        students[editIndex] = student;
        editIndex = -1;
        submitButton.innerText = "Add Student";
        formTitle.innerText = "Add Student";
    }
    else {
        students.push(student);
    }
    saveData();
    showStudents();
    form.reset();

});
function showStudents(list = students) {
    tableBody.innerHTML = "";
    if (list.length === 0 && search.value !== "") {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="not-found">
                    Student Not Found
                </td>
            </tr>
        `;
        return;
    }
    list.forEach(function(student) {
        let index = students.indexOf(student);
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">
                    Edit
                </button>
                <button class="delete-btn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    totalStudents.innerText = students.length;
}

function editStudent(index) {
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("department").value = student.department;
    document.getElementById("semester").value = student.semester;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    editIndex = index;
    formTitle.innerText = "Edit Student";
    submitButton.innerText = "Update Student";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function deleteStudent(index) {
    let answer = confirm("Are you sure you want to delete this student?");
    if (answer) {
        students.splice(index, 1);
        saveData();
        showStudents();
    }
}
search.addEventListener("input", function() {

    let text = search.value.toLowerCase().trim();
    if (text === "") {

        showStudents();

        return;
    }
    let result = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(text) ||
            student.roll.toLowerCase().includes(text)
        );

    });
    showStudents(result);

});

// Save data

function saveData() {

    localStorage.setItem("students", JSON.stringify(students));

}
