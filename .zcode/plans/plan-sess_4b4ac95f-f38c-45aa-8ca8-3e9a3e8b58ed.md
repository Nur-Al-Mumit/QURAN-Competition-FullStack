## Final Confirmation Feature — Implementation Plan

### Overview
Add a **Final Confirmation** system with a new `final_confirmations` database table, backend API endpoints (public read + admin write), and a public frontend page at `/final-confirmation`.

---

### 1. Database — Migration
**File:** `backend/database/migrations/2026_07_29_000000_create_final_confirmations_table.php`

Create table `final_confirmations` with columns:
- `id` — auto-increment PK
- `user_id` — FK to `users`, `onDelete('restrict')`
- `user_competition_form_id` — FK to `user_competition_forms`, `onDelete('restrict')`
- `season_id` — FK to `seasons`, `onDelete('restrict')`
- `criteria_id` — FK to `criteria`, nullable, `onDelete('restrict')` (copied from `user_preliminary_results`)
- `status` — tinyInteger (1 = YES/Confirmed, 2 = NO/Not Confirmed)
- `admin_id` — FK to `admins`, nullable, `onDelete('restrict')` (who set the status)
- `timestamps`
- Unique constraint: `['user_id', 'season_id']`

---

### 2. Backend — Model
**File:** `backend/app/Models/FinalConfirmation.php`

- `$fillable`: user_id, user_competition_form_id, season_id, criteria_id, status, admin_id
- Relationships: `belongsTo(User)`, `belongsTo(UserCompetitionForm)`, `belongsTo(Season)`, `belongsTo(Admin, 'admin_id')`

---

### 3. Backend — Controller
**File:** `backend/app/Http/Controllers/Api/V1/FinalConfirmationController.php`

**Public endpoints (no auth):**
- `GET /api/v1/final-confirmation/seasons` — same pattern as ResultCardController::seasons()
- `GET /api/v1/final-confirmation/data?season_id=N` — returns all participants with a final_confirmation record, grouped into mahir (result_category_id=1) and mubtadi (result_category_id=2). Within each group, sorted: YES first, then NO. Columns per row: `sl, serial, reg_no, name_en, criteria_id, status`.

**Admin endpoints (auth:admin-api):**
- `POST /api/v1/admin/final-confirmation/store` — create/update a confirmation record (upsert via `updateOrCreate` on user_id + season_id). Validates: `user_id, user_competition_form_id, season_id, status, criteria_id` (all required).
- `PUT /api/v1/admin/final-confirmation/update/{id}` — update an existing record's status.

---

### 4. Backend — Routes
**New files:**
- `backend/routes/api/public/final-confirmation.php` — public GET endpoints
- `backend/routes/api/admin/final-confirmation.php` — admin POST/PUT endpoints

**Modify:**
- `backend/routes/api.php` — include the new route files
- `backend/routes/api/admin/api.php` — include admin final-confirmation routes

---

### 5. Frontend — Public Page
**File:** `frontend/pages/final-confirmation.vue`

Layout: mirrors `results.vue` but with adapted columns:
- **Header:** "Final Confirmation" title
- **Controls:** Season selector + Search input (same pattern)
- **Sections:**
  - **Mahir group** — table with columns: `#`, `Serial`, `Reg No`, `Name`, `Criteria`, `Confirmation` (green YES / red NO badge)
  - **Mubtadi group** — same columns
  - Within each group: YES rows appear first, then NO rows (sorted server-side)
- Uses the existing `ResultSection` component adapted with a new `badgeTone` variant for YES (emerald) and NO (red) per-row status
- No auth needed — uses `useAxios` (unauthenticated)

---

### 6. Frontend — ResultSection Component Enhancement
**File:** `frontend/components/ResultSection.vue`

Add support for **per-row badge rendering** instead of static badge text:
- New optional prop: `statusField` (string, default empty)
- When `statusField` is set, the Result column reads `row[statusField]` per row and renders:
  - `1` → green "YES" badge
  - `2` → red "NO" badge
- When empty (existing behavior), renders the static `badgeText` for all rows
- Also add an optional `Criteria` column that shows when a `criteriaField` prop is set

This keeps backward compatibility — existing pages are unaffected.

---

### 7. Frontend — Admin Page (for managing confirmations)
**File:** `frontend/pages/admin/(ADMIN)/final-confirmation.vue`

- Authenticated admin page (uses `useAdminAuthenticatedAxios`)
- Displays all mahir + mubtadi participants with their confirmation status
- Allows admin to set/update YES or NO via a dropdown or toggle button per row
- Calls `POST /api/v1/admin/final-confirmation/store` to create/update

---

### 8. Frontend — Navigation & Route Protection
**Modify:**
- `frontend/utils/adminAuthRoutes.ts` — add `/admin/final-confirmation` to `protectedPaths`
- `frontend/composables/navigationLinks.ts` — add a "Final Confirmation" link under a suitable group (or as a standalone link) visible to ADMIN and SUPER_ADMIN roles

---

### Files to Create (7):
1. `backend/database/migrations/2026_07_29_000000_create_final_confirmations_table.php`
2. `backend/app/Models/FinalConfirmation.php`
3. `backend/app/Http/Controllers/Api/V1/FinalConfirmationController.php`
4. `backend/routes/api/public/final-confirmation.php`
5. `backend/routes/api/admin/final-confirmation.php`
6. `frontend/pages/final-confirmation.vue`
7. `frontend/pages/admin/(ADMIN)/final-confirmation.vue`

### Files to Modify (5):
1. `backend/routes/api.php` — include public final-confirmation routes
2. `backend/routes/api/admin/api.php` — include admin final-confirmation routes
3. `frontend/components/ResultSection.vue` — add per-row status badge support
4. `frontend/utils/adminAuthRoutes.ts` — add protected path
5. `frontend/composables/navigationLinks.ts` — add sidebar link