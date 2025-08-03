let employees = [
  {
    ten: "Mai",
    hodem: "Thục Anh",
    diachi: "29 Hoàng Đạo Thúy, Thanh Xuân, Hà Nội",
    hoatdong: true,
  },
  {
    ten: "Hoàng",
    hodem: "Sinh Hồng",
    diachi: "29 Hoàng Đạo Thúy, Thanh Xuân, Hà Nội",
    hoatdong: false,
  },
  {
    ten: "Trinh",
    hodem: "Mai Trang",
    diachi: "14/11 Đường Láng, Cầu Giấy, Hà Nội",
    hoatdong: true,
  },
  {
    ten: "Hồng",
    hodem: "Nguyễn Văn",
    diachi: "14/11 Đường Láng, Cầu Giấy, Hà Nội",
    hoatdong: false,
  },
];

function renderTable(data) {
  const tbody = $("#employeeTable");
  tbody.empty();
  data.forEach((nv, index) => {
    tbody.append(`
      <tr>
        <td>
          <button class="btn-delete" data-index="${index}">🗑️</button>
          <button class="btn-edit" data-index="${index}">✏️</button>
        </td>
        <td>${index + 1}</td>
        <td>${nv.ten}</td>
        <td>${nv.hodem}</td>
        <td>${nv.diachi}</td>
        <td>${nv.hoatdong ? "✔️" : "❌"}</td>
      </tr>
    `);
  });
  $("#totalResults").text(data.length);
}

$(document).ready(() => {
  renderTable(employees);

  $("#btnAdd").click(() => $("#modal").show());
  $(".close, #btnCancel").click(() => $("#modal").hide());

  $("#btnSave").click(() => {
    const ten = $("#inputTen").val().trim();
    const hodem = $("#inputHoDem").val().trim();
    const diachi = $("#inputDiaChi").val().trim();

    if (ten && hodem && diachi) {
      employees.push({ ten, hodem, diachi, hoatdong: Math.random() > 0.5 });
      renderTable(employees);
      $("#modal").hide();
      $("#inputTen, #inputHoDem, #inputDiaChi").val("");
    }
  });

  $("#employeeTable").on("click", ".btn-delete", function () {
    const i = $(this).data("index");
    if (confirm("Bạn chắc chắn muốn xóa?")) {
      employees.splice(i, 1);
      renderTable(employees);
    }
  });

  $("#searchName").on("input", function () {
    const keyword = $(this).val().toLowerCase();
    const filtered = employees.filter((e) =>
      e.ten.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });

  $("#btnExport").click(() => {
    let csv = "Tên,Họ đệm,Địa chỉ,Hoạt động\n";
    employees.forEach((e) => {
      csv += `${e.ten},${e.hodem},${e.diachi},${
        e.hoatdong ? "Hoạt động" : "Không"
      }\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nhanvien.csv";
    link.click();
  });
});
