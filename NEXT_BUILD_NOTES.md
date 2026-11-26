# NEXT BUILD NOTES — BLOOKET ÔN LUYỆN

Tài liệu này lưu các dự định, quy trình phân nhánh và lưu ý kỹ thuật để **AI ở các session sau** và **lần build kế tiếp** đọc lại và thực hiện tiếp chuẩn xác.

---

## 1. Trạng thái hiện tại (Cập nhật: 2026-11-26)
* **Frontend Production (`main`):** `v1.0.6+6` (Web live & Android Closed Testing 14 ngày).
* **Frontend Pre-release (`uat`):** **`v1.0.7+7`**
  * Đã sửa lỗi AppBar mobile đè chữ và icon badge.
  * Đã hiển thị độc lập `BE v...` ở chân trang và Settings (About), đã bỏ hẳn text `(Live via Cloudflare)`.
  * Đã thêm `RefreshIndicator` kéo xuống làm mới bài học từ Backend.
  * Khi push vào `uat`: GitHub Actions tự động build **APK** đẩy lên **Firebase App Distribution** cho nhóm testers `blooket-app-tester`.
* **Backend Live (`blooket-backend/main`):** **`v1.1.0`**
  * Đã cập nhật 2 môn học mới: Địa Lý (`geography`) và Khoa Học 5 HK1 (`science_vn`).
  * API trả về trường `backendVersion: "1.1.0"`.
* **iOS / TestFlight:** **TẠM HOÃN / CHƯA TRIỂN KHAI.**

---

## 2. Quy trình làm việc với Frontend (Git Branching)
1. **Phát triển tính năng / Fix bug mới:** Tạo nhánh từ `uat` (ví dụ `feat/...`, `fix/...`).
2. **Merge vào `uat` (Pre-release):**
   * Tăng version `pubspec.yaml` (ví dụ `1.0.8+8`).
   * Cập nhật `release_notes_data.dart` và `RELEASE_NOTES.md`.
   * Merge vào `uat` và push $\rightarrow$ GitHub Actions tự động build APK đẩy lên Firebase Tester.
3. **Phát hành chính thức lên Google Play (`main`):**
   * Sau khi kiểm thử bản APK trên Firebase đạt chuẩn, merge `uat` vào `main` và push `main`.
   * GitHub Actions tự động build AAB đẩy lên Google Play Console và build Web production.
   * Version trên Firebase và Google Play Console sẽ đồng nhất hoàn toàn.

---

## 3. Backlog dự định cho các đợt cập nhật tiếp theo
1. **TTS tiếng Việt (`vi-VN`)** trong `frontend/lib/services/tts_service.dart`: nhận diện các môn tiếng Việt (`geography`, `science_vn`) để phát âm tự nhiên bằng giọng `vi-VN`.
2. **Sửa điều hướng Next (`->`) & text cứng `Tuần 9`** trong `frontend/lib/ui/screens/weeks_screen.dart`: tự động lấy tuần nổi bật hoặc tuần cuối trong `widget.subject.weeks`.
3. **Mở rộng icon môn học** trong `frontend/lib/ui/screens/subjects_screen.dart`: bổ sung icon `public`, `headphones`, `menu_book`.
4. **Đồng bộ `frontend/assets/data/`** từ `backend/data/` để phục vụ chế độ offline fallback hoàn chỉnh.
