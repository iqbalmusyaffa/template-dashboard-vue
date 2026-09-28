# NexusAdmin — Enterprise SaaS Dashboard

A complete, production-quality modern admin dashboard web application built with **Vue 3**, **TypeScript**, **Vite**, **Tailwind CSS**, and **PrimeVue** (100% Free & Open Source MIT).

Designed intentionally to replicate a real enterprise SaaS platform (like Stripe, Cloudflare, Linear, or Datadog) rather than an AI-generated template. It features restrained color choices, high-density layouts, subtle borders, dark and light modes, and native data visualization and data tables.

---

## 1. Tech Stack (100% Free & Open-Source MIT)

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API with `<script setup lang="ts">`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS + Custom Enterprise Design System
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/) (with navigation guards)
- **UI Components & Data Table**:
  - [PrimeVue v4](https://primevue.org/) with `@primevue/themes` (Aura preset)
  - `DataTable` & `Column` with multi-sorting, global search, column toggle, paginator with page-size options, row selection checkboxes, and CSV export.
  - `DatePicker` with date-range selection mode.
- **Charts & Visualizations**: [Chart.js](https://www.chartjs.org/) (Line area with gradients, Bar chart, and Doughnut distribution)
- **Icons**: `@lucide/vue`
- **Formatting**: Prettier (`.prettierrc`)

---

## 2. Key Features

### 🏢 Enterprise Design System
- **Restrained Color System**:
  - Light mode: Clean slate borders (`#e2e8f0`), crisp white cards (`#ffffff`), soft background (`#f8fafc`).
  - Dark mode: Tailored dark surfaces:
    - Background: `#0f1115`
    - Surface: `#171a21`
    - Elevated Surface: `#1e222b`
    - Border: `#2a303b`
    - Primary Text: `#f1f5f9`
    - Secondary Text: `#94a3b8`
- **Theme Modes**: Supports `Light`, `Dark`, and `System` with automatic `prefers-color-scheme` listener and persistent localStorage storage.
- **Zero AI Blobs**: Avoids neon glow, giant hero sections, floating emojis, and oversized cards.

### 🔐 Authentication Flow
- **Protected Routes**: Navigation guard checks credentials in `localStorage` (`attendance_auth`).
- **Demo Access**:
  - Default Admin: `admin@example.com` / `Admin123!`
  - Quick "Load Demo" button for one-click testing.
- **Registration**: Real-time password criteria checklist (8+ chars, uppercase, number, special character) that updates dynamically as the user types.

### 📊 Main Dashboard
- **Header**: Dynamic greeting, PrimeVue DatePicker range selector, and export trigger.
- **4 KPI Metrics**:
  - Total Users: `12,842` (+12.4%)
  - Active Users: `8,429` (+8.7%)
  - MRR: `$84,290` (+14.2%)
  - Pending Approvals: `128` (-4.3%)
- **Analytics Visualizations (Chart.js)**:
  - **Revenue Overview**: Spline area series with subtle gradient showing Revenue vs. Expenses with dark-mode aware tooltips and currency formatting.
  - **User Distribution**: Doughnut series displaying status distribution (Active, Inactive, Pending, Suspended).
  - **User Activity**: Bar series charting daily active users across the week.
  - **Audit Trail**: Real-time activity log stream.

### 🗃️ PrimeVue DataTable Integration
- Live users directory with 24+ realistic enterprise records.
- **Sorting & Multi-Column Sorting**: Click any column header to sort.
- **Instant Search Panel**: Global filtering across name, email, role, and department.
- **Column Chooser**: Show or hide columns dynamically.
- **Pagination & Page Size Selector**: 10, 25, 50, 100 per page.
- **Export to CSV**: Downloadable spreadsheet export.
- **Row Actions**:
  - View details (opens `UserViewDrawer` slide-over)
  - Edit user (opens `UserModal`)
  - Toggle status (Active / Inactive)
  - Delete user (displays confirmation dialog `UserDeleteModal`)
- **Add User**: Full modal with validation for inviting new team members.

---

## 3. Project Structure

```text
src/
├── assets/                  # Brand assets & logos
├── components/
│   ├── common/              # 13 reusable UI components
│   │   ├── AppAvatar.vue
│   │   ├── AppBadge.vue
│   │   ├── AppButton.vue
│   │   ├── AppCard.vue
│   │   ├── AppDrawer.vue
│   │   ├── AppDropdown.vue
│   │   ├── AppEmptyState.vue
│   │   ├── AppInput.vue
│   │   ├── AppModal.vue
│   │   ├── AppPageHeader.vue
│   │   ├── AppSelect.vue
│   │   ├── AppSkeleton.vue
│   │   └── AppToast.vue
│   ├── layout/              # Structural chrome
│   │   ├── AppNotificationDrawer.vue
│   │   ├── AppSidebar.vue
│   │   └── AppTopNav.vue
│   ├── dashboard/           # Analytics & KPI components
│   │   ├── KpiCard.vue
│   │   ├── RecentActivityList.vue
│   │   ├── RevenueChart.vue
│   │   ├── UserActivityChart.vue
│   │   └── UserDistributionChart.vue
│   └── users/               # PrimeVue DataTable & modals
│       ├── UserDeleteModal.vue
│       ├── UserModal.vue
│       ├── UsersDataGrid.vue
│       └── UserViewDrawer.vue
│
├── layouts/
│   ├── AuthLayout.vue       # Split-screen responsive authentication layout
│   └── DashboardLayout.vue  # Full admin shell with collapsible sidebar
│
├── views/
│   ├── auth/
│   │   ├── LoginView.vue    # Validation, eye toggle, demo autofill
│   │   └── RegisterView.vue # Dynamic password requirements checklist
│   └── dashboard/
│       ├── ActivityView.vue
│       ├── DashboardView.vue
│       ├── ReportsView.vue
│       ├── SettingsView.vue
│       ├── TeamsView.vue
│       └── UsersView.vue
│
├── stores/                  # auth.ts, theme.ts, toast.ts, users.ts
├── data/dummyData.ts        # 24+ realistic deterministic enterprise users & metrics
├── router/index.ts          # Navigation guard protecting /dashboard/* routes
├── utils/formatters.ts      # Currency, date, and badge helpers
├── types/index.ts           # TypeScript definitions
├── App.vue
├── main.ts
└── style.css                # Tailwind + PrimeVue theme custom styling
```

---

## 4. Getting Started

### Development
```bash
npm run dev
```
Opens the app on `http://localhost:5173/`.

### Production Build
```bash
npm run build
```
Typechecks via `vue-tsc` and bundles minified assets to the `dist/` directory in under 5 seconds.

### Preview Build
```bash
npm run preview
```
Serves the production build locally.

---

## 5. Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Root Administrator** | `admin@example.com` | `Admin123!` |

*(You can also click "Load Demo" on the login screen, or create your own custom account via the `/register` page).*
