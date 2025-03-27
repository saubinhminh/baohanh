let currentAccessToken = null; // Lưu access_token để tái sử dụng

async function getNewAccessToken() {
    const refreshToken = "dJGpF4BuWMQAAAAAAAAAARVqgW9c4TfOQPAAob-lV1isyakHeHlyfIbi6dm_U_lP"; // 🔴 refresh_token
    const clientId = "0zspdk576nq3lck"; // 🔴 client_id
    const clientSecret = "nffwryjhsftwk3x"; // 🔴 client_secret

    try {
        const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret
            }),
        });

        if (!response.ok) {
            console.error("❌ Lỗi lấy access_token:", response.statusText);
            return null;
        }

        const data = await response.json();
        currentAccessToken = data.access_token; // Cập nhật token mới
        return currentAccessToken;
    } catch (error) {
        console.error("⚠️ Lỗi kết nối khi lấy token:", error);
        return null;
    }
}

async function getDropboxFileLink(filePath) {
    if (!currentAccessToken) {
        currentAccessToken = await getNewAccessToken(); // 🔄 Lấy token nếu chưa có
    }

    if (!currentAccessToken) {
        alert("🚨 Lỗi lấy token! Không thể mở file.");
        return null;
    }

    const url = "https://api.dropboxapi.com/2/files/get_temporary_link";

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${currentAccessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ path: filePath }),
        });

        // Nếu token hết hạn (401), lấy token mới và thử lại
        if (response.status === 401) {
            console.warn("🔄 Token hết hạn! Lấy token mới...");
            currentAccessToken = await getNewAccessToken();

            if (!currentAccessToken) {
                alert("🚨 Không thể lấy token mới!");
                return null;
            }

            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${currentAccessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: filePath }),
            });
        }

        if (!response.ok) {
            console.error(`❌ Lỗi HTTP: ${response.status} - ${response.statusText}`);
            alert("🚨 Lỗi tải file từ Dropbox!");
            return null;
        }

        const data = await response.json();
        return data.link || null;
    } catch (error) {
        console.error("⚠️ Lỗi kết nối đến Dropbox:", error);
        alert("🚨 Lỗi kết nối đến Dropbox! Vui lòng thử lại sau.");
        return null;
    }
}

document.getElementById("viewButton").addEventListener("click", async function () {
    let phoneNumber = document.getElementById("phoneNumber").value.trim();

    if (!/^\d{10,11}$/.test(phoneNumber)) {
        alert("⚠️ Vui lòng nhập số điện thoại hợp lệ (10-11 số)!");
        return;
    }

    let filePath = `/SAOLUU/BAOHANH/BH${phoneNumber}.PDF`; 
    console.log("🔍 Đang tìm file:", filePath);

    let fileLink = await getDropboxFileLink(filePath);

    if (fileLink) {
        console.log("✅ File tìm thấy! Mở ngay trên trang:", fileLink);
        window.location.href = fileLink;
    } else {
        alert("❌ Không tìm thấy phiếu bảo hành!");
    }
});
