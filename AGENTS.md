# AGENTS.md — Hướng Dẫn Ngữ Cảnh Dự Án Blooket Ôn Luyện

Khi bắt đầu làm việc trong workspace `android-blooket` ở bất kỳ session nào, hãy tuân thủ các nguyên tắc sau:

1. **Đọc `NEXT_BUILD_NOTES.md` trước tiên** để nắm backlog, chiến thuật phân nhánh và quy trình release.
2. **Kiến trúc 2 repo tách biệt:**
   * `backend/` -> `https://github.com/anhhuycan83/blooket-backend.git` (API Node.js + dữ liệu Server-Driven UI tại `backend/data/`).
   * `frontend/` -> `https://github.com/anhhuycan83/blooket-app.git` (Flutter Web & Android).
3. **Chiến thuật Git Branching & CI/CD Frontend (BẮT BUỘC TUÂN THỦ):**
   * **Nhánh `uat` (Pre-release):**
     * Mọi thay đổi code frontend từ các nhánh feature (`feat/*`, `fix/*`) **phải merge vào `uat` trước**.
     * **Bắt buộc:** Trước khi merge vào `uat`, phải tăng version (`version: X.Y.Z+build` trong `frontend/pubspec.yaml`, cập nhật `release_notes_data.dart` và `RELEASE_NOTES.md`).
     * Khi push/merge vào `uat`: GitHub Actions (`android_deploy.yml`) sẽ tự động build **file APK** và đẩy lên **Firebase App Distribution** cho nhóm testers (`blooket-app-tester`).
   * **Nhánh `main` (Production Release):**
     * **Tuyệt đối KHÔNG merge thẳng feature branch vào `main`**.
     * Chỉ merge code từ `uat` sang `main` khi phiên bản test trên Firebase đã được xác nhận sẵn sàng phát hành.
     * Khi merge vào `main`: GitHub Actions sẽ tự động build **file AAB** đẩy lên **Google Play Console** (track Closed Testing/Production) và build **Web Release** deploy lên server Armbian.
4. **Version độc lập giữa Backend & Frontend:**
   * **Backend:** Mỗi lần sửa dữ liệu (`data/`) hoặc code (`src/`) ở `backend/`, phải tăng `"backendVersion"` trong `backend/data/curriculum_tree.json` (và `"version"` trong `backend/package.json` khi sửa code API).
   * **Frontend:** Quản lý qua `frontend/pubspec.yaml` và `frontend/lib/services/release_notes_data.dart`.
5. **Quy ước Subject ID hiện hành (không đặt trùng):**
   * Lớp 5 (`grade: 5`): `english`, `math`, `science` (Cambridge EN), `geography` (Địa Lý), `science_vn` (Khoa Học 5 Tiếng Việt HK1).
   * TOEIC (`grade: 0`): `ets_2026_lc`, `ets_2026_rc`, `ets_2026_all` (placeholder: `ets_2024`, `ets_2023`).
   * Icon Flutter hiện có sẵn trên bản live: `"school"`, `"calculate"`, `"science"`.
6. **Trạng thái nền tảng:**
   * Đang chạy **Web** & **Android** (Google Play Closed Testing 14 ngày & Firebase Tester).
   * **iOS / TestFlight chưa triển khai** vào thời điểm này — không tự động thêm file/workflow iOS khi chưa có yêu cầu.
