function tinhTong() {
  const a = parseFloat(document.getElementById("so1").value);
  const b = parseFloat(document.getElementById("so2").value);
  const tong = a + b;

  if (isNaN(a) || isNaN(b)) {
    document.getElementById("ketqua").innerText = "Vui lòng nhập đủ 2 số!";
  } else {
    document.getElementById("ketqua").innerText = "Tổng = " + tong;
  }
}
