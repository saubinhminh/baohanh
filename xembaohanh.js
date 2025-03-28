document.getElementById("viewButton").addEventListener("click", function () {
    let phoneNumber = document.getElementById("phoneNumber").value.trim();

    if (!/^\d{10,11}$/.test(phoneNumber)) {
        alert("⚠️ Vui lòng nhập số điện thoại hợp lệ (10-11 số)!");
        return;
    }

    let filePath = `https://raw.githubusercontent.com/saubinhminh/baohanh/main/BH${phoneNumber}.pdf`;

    console.log("🔍 Đang tìm file:", filePath);

    fetch(filePath, { method: "HEAD" })
        .then(response => {
            if (response.ok) {
                console.log("✅ File tìm thấy! Mở ngay:", filePath);
                window.open(filePath, "_self"); // Mở trên tab hiện tại
            } else {
                alert("❌ Không tìm thấy phiếu bảo hành!");
            }
        })
        .catch(error => {
            console.error("⚠️ Lỗi khi kiểm tra file:", error);
            alert("🚨 Lỗi kết nối! Vui lòng thử lại sau.");
        });
});