function a1() {
    var b2 = document.getElementById("b2").value.trim();

    if (b2 === "") {
        alert("Vui lòng nhập số điện thoại!");
        return;
    }

    // Định dạng tên file PDF: "BH+sốđiệnthoại.pdf"
    var c3 = "BH" + b2 + ".pdf";

    // Kiểm tra nếu file tồn tại bằng cách thử mở file
    fetch(c3, { method: 'HEAD' })
        .then(f6 => {
            if (f6.ok) {
                const d4 = location.href.replace(/[^\/]*$/, "") + c3;
                const e5 = "https://docs.google.com/gview?embedded=true&url=" + encodeURIComponent(d4);
                window.open(e5, "_blank"); // Mở file PDF
            } else {
                alert("Không tìm thấy phiếu bảo hành cho số điện thoại này!");
            }
        })
        .catch(g7 => {
            alert("Lỗi khi tìm kiếm phiếu bảo hành!");
            console.g7(g7);
        });
}

// Gắn sự kiện click vào nút
document.addEventListener("loadEvt", function () {
    document.getElementById("btn").addEventListener("click", a1);
});
