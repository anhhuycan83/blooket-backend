# AGENTS.md — Hướng Dẫn Ngữ Cảnh Dự Án Blooket Ôn Luyện (Backend)

1. **Đọc `NEXT_BUILD_NOTES.md`** trong thư mục này để nắm backlog cho lần build Frontend kế tiếp và trạng thái dự án.
2. **Server-Driven UI:** Mọi môn học, tuần học và bài học được điều khiển động từ `data/curriculum_tree.json` và `data/lessons/*.json`.
3. **Quy ước Subject ID hiện hành (không đặt trùng):**
   * Lớp 5 (`grade: 5`): `english`, `math`, `science` (Cambridge EN), `geography` (Địa Lý), `science_vn` (Khoa Học 5 Tiếng Việt HK1).
   * TOEIC (`grade: 0`): `ets_2026_lc`, `ets_2026_rc`, `ets_2026_all` (placeholder: `ets_2024`, `ets_2023`).
   * Icon Flutter hiện hỗ trợ trên bản live v1.0.6: chỉ dùng `"school"`, `"calculate"`, `"science"`.
4. **Validation bắt buộc trước khi push:**
   Chạy `python "<skill_dir>/builder.py" validate --lessons-dir "data/lessons"` để đảm bảo toàn bộ file JSON hợp lệ 100%.
5. **Trạng thái nền tảng:** Đang phục vụ Web & Android. **Chưa triển khai iOS** vào thời điểm này.
