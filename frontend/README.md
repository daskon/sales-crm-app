# Sales CRM Module

A simple **Sales CRM** system with API and CI/CD setup, built with **Next.js**, **Express.js**, and **MongoDB**, deployed to **Vercel**.

**Live Demo:** [https://sales-crm-app-eta.vercel.app/](https://sales-crm-app-eta.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js
- **Backend:** Express.js
- **Database:** MongoDB (Mongoose)
- **UI Library:** shadcn/ui
- **Charts:** Recharts
- **CSV Export:** react-csv
- **Authentication:** JWT (HttpOnly cookie)
- **CI/CD:** GitHub Actions → Vercel Deployment

---

## ⚡ Features

- JWT HttpOnly token authentication to protect `/orders` route and home page
- Export table data to CSV using `react-csv`
- Display order statistics using `recharts`
- Clean UI with `shadcn/ui`
- Filters to search and export specific order data
- CI/CD configured with GitHub workflow: main branch push triggers deployment to Vercel

---

## 👤 Login Details

- **Username:** `crmadmin`
- **Password:** `crm123`

**After login:**
1. Click the **View Orders** button.
2. Use filters to get specific data.
3. Export filtered data to CSV.

---

## 💡 Design Decisions

- Frontend and API are separated into different folders.
- Frontend deployed on Vercel; API calls made via Axios from Next.js frontend.
- Initial table records added using `request.http` package.

---

## 🔌 API Endpoints

### Auth Endpoints

| Method | Endpoint           | Description |
|--------|------------------|-------------|
| POST   | `/api/auth/login` | Login with username & password. Returns HttpOnly JWT token. |
| POST   | `/api/auth/logout`| Logout and clear HttpOnly token. |
| POST   | `/api/auth/create`| Create new login users with username & password. |
| GET    | `/api/auth/me`    | Validate user token and return user info if valid. |

### Orders Endpoints

| Method | Endpoint         | Description |
|--------|----------------|-------------|
| GET    | `/api/orders`   | Return list of orders in JSON format. |
| POST   | `/api/orders`   | Create new orders. |

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/daskon/sales-crm-app.git