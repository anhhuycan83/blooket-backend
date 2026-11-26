# BLOOKET ÔN LUYỆN - NHẬT KÝ PHÁT HÀNH (RELEASE NOTES)

Tất cả các thay đổi, tính năng mới và các bản sửa lỗi (bug fixes) cho từng phiên bản của ứng dụng Web, Android và iOS.

---

## 🚀 [v1.0.7] - 2026-11-26 (Build 7)
### ✨ Tính năng mới & Cải tiến:
* **Tách biệt & Hiển thị Version Backend độc lập:**
  * Hiển thị thông tin phiên bản Backend (`BE v...`) song song với phiên bản Frontend ở Footer chân trang và trong màn hình Cài đặt (`About`).
  * Backend API bổ sung trường `backendVersion` giúp dễ dàng theo dõi phiên bản nội dung đề cương học tập.
* **Tính năng Kéo xuống làm mới (Pull-to-Refresh):**
  * Hỗ trợ thao tác vuốt kéo xuống trên danh sách môn học để đồng bộ tức thì các môn và bài học mới nhất từ Backend Server.
* **Chiến thuật Git Branching UAT / Main chuẩn hóa:**
  * Toàn bộ tính năng mới từ các nhánh feature được merge vào nhánh `uat` để kích hoạt CI/CD build APK thử nghiệm trên Firebase App Distribution cho nhóm Testers.
  * Nhánh `main` chỉ nhận code khi release chính thức lên Google Play Console (AAB) và phát hành Web Production.

### 🐛 Sửa lỗi (Bug Fixes):
* **Sửa lỗi đè chữ trên AppBar Mobile:**
  * Khắc phục triệt để hiện tượng tiêu đề *"Blooket Học Tập & Ôn Luyện"* bị 2 badge cờ và streak chèn đè lên nhau trên các dòng điện thoại màn hình nhỏ.
  * Tự động điều chỉnh kích cỡ chữ, thu gọn tiêu đề thành *"Blooket Ôn Luyện"* và tối ưu khoảng cách hiển thị responsive.

---

## 🚀 [v1.0.6] - 2026-11-22 (Build 6)
### ✨ Tính năng mới & Cải tiến:
* **Mở rộng Tab TOEIC & Kho Học Liệu ETS 2026:**
  * Bổ sung Tab **TOEIC** mới với huy hiệu `Mới 🔥` trên thanh điều hướng đầu trang.
  * Tích hợp toàn bộ **86 thẻ Anki ETS 2026 chuẩn 750+** từ thư mục `d:\baby\toeic` thành ngân hàng Flashcard 3D và Game trắc nghiệm Blooket.
  * Phân loại thành 3 môn học / phân hệ:
    1. **ETS 2026 - Listening (Part 1–4):** 4 tuần học với 50 cụm từ bẫy nghe, phản xạ trả lời gián tiếp, hội thoại doanh nghiệp và độc thoại công sở.
    2. **ETS 2026 - Reading (Part 5–6):** 3 tuần học với 36 câu bẫy từ loại, collocations, cấu trúc ngữ pháp và điền đoạn văn.
    3. **ETS 2026 - Blooket Master:** Đấu trường Blooket 86 câu hỏi tổng hợp tốc độ cao.
    4. Cung cấp placeholder cho các bộ **ETS 2024** và **ETS 2023** sẵn sàng mở rộng.
* **Tối ưu hóa Tab Bar đa nền tảng:**
  * Thêm thanh cuộn ngang `SingleChildScrollView` cho `GradeTabBar` giúp hiển thị hoàn hảo trên các thiết bị di động màn hình hẹp khi có nhiều tab.
* **Server-Driven Deployment:**
  * Học sinh và testers đã cài app trên Android tự động nhận Tab TOEIC mà **không cần cài lại app**.

### 🐛 Sửa lỗi (Bug Fixes):
* Chuẩn hóa logic kiểm tra tham số truy vấn `grade` trên Backend API (`grade === undefined || grade === ''`) để hỗ trợ mã khối `0` cho TOEIC.

---

## 🚀 [v1.0.5] - 2026-11-22 (Build 5)
### ✨ Tính năng mới & Cải tiến:
* **Server-Driven UI 100%:** Chuyển đổi toàn bộ cấu trúc hiển thị danh sách tuần (tiêu đề, màu sắc HEX, badge, biểu tượng emoji) sang do Backend điều khiển động qua `curriculum_tree.json`. Từ nay khi bổ sung tuần hoặc môn học mới, Client (Web / Android) tự cập nhật mà không cần build hay cài lại app.
* **Huy hiệu Version trên giao diện Web:** Bổ sung chip huy hiệu phiên bản `v1.0.5` ngay trên thanh AppBar màn hình chính và chân trang Web. Bấm vào huy hiệu sẽ mở ngay cửa sổ **Nhật ký phát hành (Release Notes)** chi tiết.
* **Tích hợp Release Notes Dialog:** Cung cấp màn hình tra cứu lịch sử cập nhật chi tiết theo từng phiên bản trực tiếp bên trong ứng dụng.

### 🐛 Sửa lỗi (Bug Fixes):
* Khắc phục lỗi cú pháp đóng ngoặc thừa trong `weeks_screen.dart` khiến tiến trình `flutter build web` trên CI/CD bị gián đoạn.
* Cải thiện cơ chế nạp màu tùy biến an toàn (`AppColors.parseHex`) ngăn ngừa lỗi crash giao diện khi nhận mã màu HEX từ API.

---

## 🌟 [v1.0.4] - 2026-11-21 (Build 4)
### ✨ Tính năng mới:
* **Tổng ôn tập Cuối Kì 1 (Review Final Test 1 - Tuần 10):**
  * **Anh Văn:** Bổ sung 28 thẻ Flashcard và 40 câu hỏi trắc nghiệm Blooket chuẩn hóa (Động từ bất quy tắc V3, các kiểu nhà, câu bị động, Modals of possibility, Quantifiers).
  * **Khoa Học:** 10 thẻ lý thuyết và 15 câu hỏi (Cao độ, âm lượng, Decibel, mô hình hạt của chất rắn/lỏng/khí, độ nở của nước đá).
  * **Toán Học:** 5 thẻ lý thuyết và 10 câu hỏi (Phép tính số thập phân, nhân chia 10/100/1000, số nguyên tố, phân số).
* **Hoàn thiện dữ liệu thực tế cho W3, W4, W5, W7:** Quét và tích hợp đầy đủ ngân hàng câu hỏi thật từ thư mục `d:\baby\lop5\`.
* **Phát hành Google Play Closed Testing:** Tải thành công bản AAB lên Google Play Store track Closed Testing phục vụ chu kỳ thử nghiệm 14 ngày.

---

## 📦 [v1.0.3] - 2026-11-21 (Build 3)
### ✨ Tính năng mới:
* Tích hợp Firebase App Distribution tự động phân phối file APK cho nhóm `blooket-app-tester`.
* Triển khai Fastlane tự động hóa ký số Keystore và xuất bản đa kênh.

---

## 🎨 [v1.0.2] - 2026-11-20 (Build 2)
### ✨ Cải tiến:
* Chuẩn hóa giao diện người dùng theo Wireframe gốc (app_1, app_2, app_3).
* Cơ chế Dynamic In-Game Shuffling: Tự động đảo ngẫu nhiên vị trí 4 ô đáp án (A, B, C, D) mỗi khi câu hỏi xuất hiện để chống học vẹt.
* Thêm màn hình Cài đặt (Settings) & Giới thiệu tác giả (About Huy Pham).

---

## 🏗️ [v1.0.0] - 2026-11-20 (Build 1)
### 🚀 Khởi tạo dự án:
* Khởi tạo kiến trúc Flutter Multiplatform (Web, Android, iOS).
* Xây dựng Backend REST API Node.js + TypeScript phục vụ dữ liệu bài học qua Docker Stack và Cloudflare Tunnel.
* Trang chính sách quyền riêng tư đạt chuẩn Google Play (`privacy.html`).
