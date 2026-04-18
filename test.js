const fetch = require('node-fetch');

async function getBankLink() {
    console.log("Đang gọi API VietQR...");

    try {
        // ✅ endpoint đúng
        const response = await fetch('https://api.vietqr.io/v2/generate', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accountNo: "4702205301198",
                accountName: "NGUYEN VAN A",
                acqId: "970416", // ✅ ACB đúng BIN
                amount: 50000,
                addInfo: "TEST_ZALO",
                format: "text" // lấy EMV string
            })
        });

        const result = await response.json();

        if (result.code === '00' && result.data) {

            const qrString = result.data.qrCode;
            const qrBase64 = result.data.qrDataURL;

            console.log("\n===== EMV QR STRING =====");
            console.log(qrString);
            const deeplinkZalo_1 = `https://dl.vietqr.io/pay?app=acb&qr=${encodeURIComponent(qrString)}`;

            console.log("\n===== LINK TEST TRÊN DI ĐỘNG =====");
            console.log(deeplinkZalo_1);

            console.log("\n===== QR IMAGE (BASE64) =====");
            console.log(qrBase64);

            // ✅ Deeplink cũ (dùng tham số rời)
            const deeplink = `https://dl.vietqr.io/pay?app=acb&ba=9704164702205301198&am=50000&tn=TEST_ZALO`;

            // ✅ DEEPLINK GIỐNG ZALO (Sử dụng chuỗi mã hóa qrString)
            // Cách này bóc tách dữ liệu chuẩn hơn nhiều
            const deeplinkZalo = `https://dl.vietqr.io/pay?app=acb&data=${encodeURIComponent(qrString)}`;

            console.log("\n===== DEEPLINK THÔNG THƯỜNG =====");
            console.log(deeplink);

            console.log("\n===== DEEPLINK GIỐNG ZALO (KHUYÊN DÙNG) =====");
            console.log(deeplinkZalo);

            // ✅ QR URL (Dùng hiển thị ảnh QR trên web)
            const qrImage = `https://img.vietqr.io/image/970416-4702205301198.png?amount=50000&addInfo=TEST_ZALO`;

            console.log("\n===== QR URL IMAGE =====");
            console.log(qrImage);

        } else {
            console.error("Lỗi từ API VietQR:", result.desc);
        }

    } catch (error) {
        console.error("Lỗi hệ thống:", error.message);
    }
}

getBankLink();
