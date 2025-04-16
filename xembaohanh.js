function checkWarranty() {
    var phoneNumber = document.getElementById("phoneNumber").value.trim();

    if (phoneNumber === "") {
        alert("Vui lòng nhập số điện thoại!");
        return;
    }

    // Định dạng tên file PDF: "BH+sốđiệnthoại.pdf"
    var pdfFile = "BH" + phoneNumber + ".pdf";

    // Kiểm tra nếu file tồn tại bằng cách thử mở file
    fetch(pdfFile, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const fullPath = location.href.replace(/[^\/]*$/, "") + pdfFile;
                const viewerURL = "https://docs.google.com/gview?embedded=true&url=" + encodeURIComponent(fullPath);
                window.open(viewerURL, "_blank"); // Mở file PDF
            } else {
                alert("Không tìm thấy phiếu bảo hành cho số điện thoại này!");
            }
        })
        .catch(error => {
            alert("Lỗi khi tìm kiếm phiếu bảo hành!");
            console.error(error);
        });
}

// Gắn sự kiện click vào nút
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("viewButton").addEventListener("click", checkWarranty);
});
