# NEXT BUILD NOTES — BLOOKET ÔN LUYỆN

Tài liệu này lưu các dự định, cải tiến và lưu ý kỹ thuật để **AI ở các session sau** và **lần build Frontend kế tiếp (v1.0.7+)** đọc lại và thực hiện tiếp, không bị mất ngữ cảnh.

---

## 1. Phạm vi & Trạng thái hiện tại (Cập nhật: 2026-11-26)
* **Phiên bản Frontend đang chạy:** `1.0.6+6` (Web live & Android Closed Testing 14 ngày).
* **iOS / TestFlight:** **TẠM HOÃN / CHƯA TRIỂN KHAI.** Chủ dự án chưa có dự định làm iOS vào thời điểm hiện tại. Không tạo workflow, không cấu hình Fastlane/Xcode iOS trừ khi được yêu cầu rõ ràng.
* **Backend Server-Driven UI (`backend/data/`):**
  * Đã có **51 file bài học JSON** (Lớp 5: `english`, `math`, `science`, `geography`, `science_vn`; TOEIC `grade: 0`: `ets_2026_lc`, `ets_2026_rc`, `ets_2026_all`).
  * Mới bổ sung 2 môn Lớp 5 từ `d:\baby\lop5\`:
    * `geography` (**Địa Lý** — 6 tuần W1–W6, 39 thẻ, 70 câu hỏi).
    * `science_vn` (**Khoa Học 5 (HK1)** — 6 tuần W1–W6, 41 thẻ, 78 câu hỏi).

---

## 2. Danh sách việc cần làm cho lần build Frontend kế tiếp (v1.0.7+)

1. **Hỗ trợ giọng đọc Tiếng Việt (`vi-VN`) trong `TtsService`:**
   * File: `frontend/lib/services/tts_service.dart`
   * Hiện trạng: `TtsService` đang cố định `await _flutterTts.setLanguage('en-US')`. Với các môn tiếng Việt (`geography`, `science_vn`), khi bấm loa hoặc tự động đọc thẻ, giọng `en-US` đọc chữ tiếng Việt bị lơ lớ.
   * Kế hoạch: Truyền ngôn ngữ hoặc tự phát hiện tiếng Việt có dấu / dựa theo `subject` (`geography`, `science_vn` -> `vi-VN`, còn lại -> `en-US`), kèm tùy chọn bật/tắt tự đọc khi vào thẻ nếu cần.

2. **Sửa điều hướng nhanh & text cứng trong `WeeksScreen`:**
   * File: `frontend/lib/ui/screens/weeks_screen.dart`
   * Hiện trạng:
     * Dòng ~126 đang hiển thị chữ tĩnh `'Tuần 9: Dữ liệu bài mẫu đầy đủ 🎯'`.
     * Dòng ~280 nút Next (`->`) ở `NavigationBottomBar` đang trỏ cứng `week: 9`. Với các môn có 4 tuần (TOEIC) hoặc 6 tuần (Địa Lý, Khoa Học 5 HK1), bấm nút `->` sẽ ra màn hình chưa có dữ liệu.
   * Kế hoạch: Đổi sang tự động lấy tuần cuối cùng hoặc tuần có `isHighlighted == true` trong `widget.subject.weeks` (fallback về `weeks.last.weekNumber`), và hiển thị badge/text động theo môn học.

3. **Mở rộng bộ Icon môn học trong `SubjectsScreen`:**
   * File: `frontend/lib/ui/screens/subjects_screen.dart` (`_getIconData`)
   * Hiện trạng: Mới hỗ trợ 3 icon (`school`, `calculate`, `science`). Hiện Địa Lý đang dùng tạm `school`.
   * Kế hoạch: Thêm `public` / `explore` (`Icons.public_rounded`) cho Địa Lý, `headphones` (`Icons.headphones_rounded`) cho TOEIC Listening, `menu_book` cho Reading, v.v. *(Lưu ý: chỉ cập nhật `curriculum_tree.json` dùng icon mới **sau khi** bản app mới đã phát hành cho đa số người dùng).*

4. **Đồng bộ dữ liệu Offline Fallback (`frontend/assets/data/`):**
   * Copy toàn bộ `backend/data/curriculum_tree.json` và `backend/data/lessons/*.json` sang `frontend/assets/data/` trước khi build `v1.0.7` để người dùng khi mất mạng vẫn có đủ môn mới (`geography`, `science_vn`, `ets_2026_*`).

5. **Cập nhật Version & Release Notes khi phát hành v1.0.7:**
   * Tăng `version:` trong `frontend/pubspec.yaml`.
   * Cập nhật `frontend/lib/services/release_notes_data.dart` và `RELEASE_NOTES.md` (cả 2 repo).

---

## 3. Lưu ý CI/CD GitHub Actions
* **Backend (`backend/.github/workflows/deploy.yml`):** Chỉ chạy khi push lên `main` có thay đổi trong `src/**`, `data/**`, `package.json`, `tsconfig.json`, `Dockerfile`, `docker-compose.yaml`.
* **Frontend Web & Android (`frontend/.github/workflows/`):** Chạy trên mọi push `main` (không lọc `paths`). Chỉ push `frontend/` khi thực sự muốn build Web & APK mới.
