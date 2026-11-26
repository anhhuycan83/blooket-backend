# NEXT BUILD NOTES — BLOOKET ÔN LUYỆN

Tài liệu này lưu các dự định, nhánh đang chờ merge và lưu ý kỹ thuật để **AI ở các session sau** và **lần build Frontend kế tiếp (v1.0.7)** đọc lại và thực hiện tiếp.

---

## 1. Trạng thái hiện tại & Nhánh chờ Release (Cập nhật: 2026-11-26)
* **Frontend đang live trên `main`:** `1.0.6+6` (Web live & Android Closed Testing 14 ngày).
* **Backend đang live (`blooket-backend/main`):** **`v1.1.0`**
  * Endpoint `/api/v1/curriculum/tree` trả về trường `"backendVersion"` (và `/api/v1/health` trả về `"version"` + `"backendVersion"`).
  * **Quy ước bắt buộc cho Backend:** Mỗi lần cập nhật nội dung hoặc code trong `backend/`, phải tăng `"backendVersion"` trong `backend/data/curriculum_tree.json` (và `"version"` trong `backend/package.json` nếu sửa code `src/`).
* **Nhánh Frontend đã code sẵn, ĐANG CHỜ MERGE (`blooket-app`):**
  * Tên nhánh: **`fix/appbar-and-backend-version`** (đã push lên remote `origin`, **CHƯA merge vào `main`** để tránh trigger CI build Web & APK/Google Play sớm).
  * Nội dung đã hoàn thành trên nhánh `fix/appbar-and-backend-version`:
    1. Fix lỗi AppBar mobile (`lib/ui/screens/subjects_screen.dart`): không còn bị 2 badge `🚩 Cờ` và `🔥` đè lên chữ tiêu đề & chip version.
    2. Hiển thị Backend Version độc lập (`BE v...`) từ `/api/v1/curriculum/tree` ở Footer `SubjectsScreen` và hộp thoại `About` trong `SettingsScreen`.
    3. Thêm `RefreshIndicator` (kéo xuống làm mới) ở `SubjectsScreen`.
* **iOS / TestFlight:** **TẠM HOÃN / CHƯA TRIỂN KHAI.** Không tạo workflow hoặc cấu hình iOS trừ khi được yêu cầu.

---

## 2. Danh sách việc cần làm khi Release Frontend v1.0.7
1. Kiểm tra & sử dụng nhánh `fix/appbar-and-backend-version` làm nền (hoặc merge trước vào nhánh release).
2. Bổ sung các mục còn lại:
   * **TTS tiếng Việt (`vi-VN`)** trong `frontend/lib/services/tts_service.dart` cho `geography`, `science_vn`.
   * **Sửa điều hướng Next (`->`) & text cứng `Tuần 9`** trong `frontend/lib/ui/screens/weeks_screen.dart`.
   * **Mở rộng bộ Icon** trong `frontend/lib/ui/screens/subjects_screen.dart` (`public`, `headphones`, `menu_book`).
   * **Đồng bộ `frontend/assets/data/`** từ `backend/data/`.
3. Tăng version `pubspec.yaml` (`1.0.7+7`), cập nhật `release_notes_data.dart` và `RELEASE_NOTES.md`.
4. Merge vào `main` và push (tạo tag `v1.0.7` nếu đẩy Google Play).
