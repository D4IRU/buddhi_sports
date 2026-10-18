# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# Project

Buddhi Sports is a Laravel 12 + Inertia.js (React/TSX) app for renting badminton and basketball courts (see [PRD.md](PRD.md)). UI components use shadcn/ui (`resources/js/Components/ui/`) with Tailwind v4.

Models use custom primary keys (e.g. `idPenyewa`, `idLapangan`) and `$timestamps = false`. See [implementation-plan.md](implementation-plan.md) for the master-data CRUD pattern in progress (controllers use `DB::table(...)` query builder, not Eloquent, to match an existing template style — follow that pattern for new master-data controllers unless told otherwise).

# Commands
- Dev server (Vite): `npm run dev`
- Build: `npm run build`
- PHP dev server + queue + Vite together: `composer dev`
- Laravel dev server only: `php artisan serve`
- Run tests: `php artisan test` (or `vendor/bin/phpunit`)
- Lint/format PHP: `vendor/bin/pint`
- Syntax check a PHP file: `php -l path/to/file.php`
- List routes: `php artisan route:list`

# Code Style
- PHP: 4-space indentation, PSR-4 autoloading under `App\`.
- TSX: match existing files in `resources/js/Pages/` and `resources/js/Components/`.
- Routes live in `routes/web.php`: Penyewa routes under `Route::middleware('auth')` (guard `web`), master-data routes under `Route::middleware('auth:admin')`, Manager routes under `auth:manager`.
- Controllers return `Inertia::render('Page/Path', [...])`, not Blade views.
- Master-data controllers follow the `Master{Model}Controller` naming and method pattern already used (`tampilData`, `tampilFormTambah`, `tampilFormEdit`, `insertData`, `updateData`, `deleteData{Model}`).

# Progress (2026-10-18)
Details and open items: [implementation-plan.md](implementation-plan.md).
- Done: CRUD for all 7 models (`Master*Controller` + 21 TSX pages in `resources/js/Pages/Master/`, wrapped in `AdminLayout`).
- Done: multi-role auth — guard `web` = `Penyewa` (`/login`, `/register`), guards `admin`/`manager` via `/login-pengelola` (two tabs). Admin/Manager dashboards are placeholders.
- In progress: SMTP via Mailtrap sandbox for Penyewa password reset (`.env` still `MAIL_MAILER=log`; credentials must come from the user, never invented).
- Open: no unique check on username/email; booking end time not validated after start time.

# Failing tests (8 of 25, `php artisan test`)
Cause: Breeze tests still create accounts with `User::factory()` and field `name`, but guard `web` now uses `Penyewa` (`namaPenyewa`, `noHp`). Fix needs a `PenyewaFactory` and updated test fields.
- `Tests\Feature\Auth\AuthenticationTest` › users can authenticate using the login screen
- `Tests\Feature\Auth\PasswordConfirmationTest` › password can be confirmed
- `Tests\Feature\Auth\PasswordResetTest` › reset password link can be requested
- `Tests\Feature\Auth\PasswordResetTest` › reset password screen can be rendered
- `Tests\Feature\Auth\PasswordResetTest` › password can be reset with valid token
- `Tests\Feature\Auth\RegistrationTest` › new users can register
- `Tests\Feature\ProfileTest` › profile information can be updated
- `Tests\Feature\ProfileTest` › email verification status is unchanged when the email address is unchanged
