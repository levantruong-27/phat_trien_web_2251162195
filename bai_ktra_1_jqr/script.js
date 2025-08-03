let employees = [
  {
    name: "Thomas Hardy",
    email: "thomashardy@mail.com",
    address: "89 Chiaroscuro Rd, Portland, USA",
    phone: "(171) 555-2222",
  },
  {
    name: "Dominique Perrier",
    email: "dominiqueperrier@mail.com",
    address: "Obere Str. 57, Berlin, Germany",
    phone: "(313) 555-5735",
  },
  {
    name: "Maria Anders",
    email: "mariaanders@mail.com",
    address: "25, rue Lauriston, Paris, France",
    phone: "(503) 555-9931",
  },
  {
    name: "Fran Wilson",
    email: "franwilson@mail.com",
    address: "C/ Araquil, 67, Madrid, Spain",
    phone: "(204) 619-5731",
  },
  {
    name: "Martin Blank",
    email: "martinblank@mail.com",
    address: "Via Monte Bianco 34, Turin, Italy",
    phone: "(480) 631-2097",
  },
];

let perPage = 5,
  currentPage = 1;

function renderTable(data) {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const displayData = data.slice(start, end);

  $("#employeeBody").empty();
  displayData.forEach((e, i) => {
    $("#employeeBody").append(`
      <tr>
        <td><input type="checkbox" class="selectItem" data-index="${
          start + i
        }"></td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.address}</td>
        <td>${e.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1 editBtn" data-index="${
            start + i
          }"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-danger deleteBtn" data-index="${
            start + i
          }"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `);
  });

  $("#countInfo").text(`${displayData.length} out of ${data.length} entries`);
}

function renderPagination(data) {
  const pageCount = Math.ceil(data.length / perPage);
  let html = "";
  for (let i = 1; i <= pageCount; i++) {
    html += `<li class="page-item ${i === currentPage ? "active" : ""}">
               <a class="page-link" href="#">${i}</a>
             </li>`;
  }
  $("#pagination").html(html);
}

function refresh() {
  const keyword = $("#searchBox").val().toLowerCase();
  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(keyword) ||
      e.email.toLowerCase().includes(keyword) ||
      e.address.toLowerCase().includes(keyword) ||
      e.phone.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
  renderPagination(filtered);
}

$(document).ready(function () {
  refresh();

  $("#pagination").on("click", "a", function (e) {
    e.preventDefault();
    currentPage = Number($(this).text());
    refresh();
  });

  $("#searchBtn").click(function () {
    currentPage = 1;
    refresh();
  });

  $("#addNew").click(function () {
    $("#modalTitle").text("Add Employee");
    $("#saveBtn").text("Add");
    $("#employeeForm")[0].reset();
    $("#empIndex").val("");
  });

  $("#employeeForm").submit(function (e) {
    e.preventDefault();
    const emp = {
      name: $("#empName").val().trim(),
      email: $("#empEmail").val().trim(),
      address: $("#empAddress").val().trim(),
      phone: $("#empPhone").val().trim(),
    };
    const index = $("#empIndex").val();
    if (index === "") {
      employees.push(emp);
    } else {
      employees[index] = emp;
    }
    bootstrap.Modal.getInstance(
      document.getElementById("employeeModal")
    ).hide();
    refresh();
  });

  $("#employeeBody").on("click", ".editBtn", function () {
    const index = $(this).data("index");
    const emp = employees[index];
    $("#modalTitle").text("Edit Employee");
    $("#saveBtn").text("Update");
    $("#empIndex").val(index);
    $("#empName").val(emp.name);
    $("#empEmail").val(emp.email);
    $("#empAddress").val(emp.address);
    $("#empPhone").val(emp.phone);
    $("#employeeModal").modal("show");
  });

  $("#employeeBody").on("click", ".deleteBtn", function () {
    const index = $(this).data("index");
    if (confirm("Are you sure to delete this employee?")) {
      employees.splice(index, 1);
      refresh();
    }
  });

  $("#selectAll").change(function () {
    $(".selectItem").prop("checked", $(this).prop("checked"));
  });

  $("#deleteSelected").click(function () {
    const checked = $(".selectItem:checked")
      .map(function () {
        return parseInt($(this).data("index"));
      })
      .get()
      .sort((a, b) => b - a); // xóa từ cuối

    if (checked.length === 0) {
      alert("Please select at least one employee.");
      return;
    }

    if (confirm("Delete selected employees?")) {
      checked.forEach((i) => employees.splice(i, 1));
      refresh();
    }
  });
});
