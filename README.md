# Rockstar Musical Instruments Shop — Production E-Commerce Platform

A production-ready e-commerce platform built specifically for **Rockstar Musical Instruments Shop**, a real local musical-instrument and audio equipment store located in Multan, Punjab, Pakistan.

---

## 📍 Verified Business Profile

* **Business Name:** Rockstar Musical Instruments Shop
* **Category:** Musical Instruments / Music Equipment / Audio Equipment
* **Phone:** `+92 300 6303618`
* **Address:** Service Road, Peer Khurshid Colony, Chah Usman Wala, Multan, Punjab, Pakistan
* **Currency:** PKR (Pakistani Rupee)
* **Pricing Notice:** `DEMO DATA — VERIFY BEFORE LAUNCH`
* **Payment Support:** Cash on Delivery (COD) initially supported

> **Strict Truthfulness Policy:** No invented branches, owners, awards, certifications, fake emails, or fake customer reviews are included. All catalog items reflect real-world musical gear with verified manufacturer specifications.

---

## 🎨 Visual Identity: "Black Recording Studio"

* **Primary Background:** `#000000` (Pitch Black)
* **Secondary Background:** `#0B0B0B` (Studio Floor)
* **Card & Glass Panels:** `#151515` (Border: `#292929`)
* **Text:** `#FFFFFF` (High contrast) & `#A3A3A3` (Muted gray)
* **Accent:** `#F5C542` (Warm Gold for CTA buttons, prices, active tabs, and audio waves)

---

## 🛠️ Technology Stack

* **Frontend:** React 18, Vite, Tailwind CSS, React Router DOM v6, Lucide React, Context API (`Auth`, `Cart`, `Wishlist`, `Compare`, `Toast`).
* **Backend:** Node.js, Express.js, JWT, bcryptjs, CORS, dotenv, express-validator.
* **Database:** MongoDB with Mongoose (with automated fallback data for zero-config offline execution).

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 2. Configure Environment

Review `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/rockstar_shop
JWT_SECRET=rockstar_multan_secret_key_studio_black_gold_92_300_6303618
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Seed Database (Optional)

```bash
cd server
npm run seed
```

Default Admin Credentials:
* **Email:** `admin@rockstar.pk`
* **Password:** `AdminPassword123!`

### 4. Run Development Servers

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd client
npm run dev
```

Visit the store in your browser: `http://localhost:5173`

---

## 📑 Page Routes

* `/`: Cinematic Dark Studio Homepage with Audio Wave graphics and category rail
* `/shop`: Advanced product catalog with multi-filter sidebar (price, brand, category, rating, stock)
* `/guitars`: Acoustic, electric, classical, and bass guitars
* `/keyboards`: Stage pianos, synthesizers, and portable keyboards
* `/drums`: Acoustic drum kits, electronic mesh drums, and cymbals
* `/microphones`: Dynamic vocal mics and studio condensers
* `/audio`: Studio monitors, USB audio interfaces, and amplifiers
* `/accessories`: Strings, cables, tuners, and stands
* `/product/:slug`: Product detail page with gallery, verified specs table, and review form
* `/compare`: Side-by-side comparison matrix for gear
* `/wishlist`: Customer wishlist with quick move-to-cart
* `/cart`: Real-time cart calculations and discount coupon codes
* `/checkout`: Cash on Delivery order flow with Pakistan city selector
* `/order-success/:orderNumber`: Confirmation receipt and order tracking reference
* `/login` & `/register`: Customer JWT authentication
* `/account`: Customer orders, addresses, and security
* `/music-guides`: 9 comprehensive educational music and gear articles
* `/brands`: Cataloged manufacturer directory with official disclaimers
* `/about`: Strictly verified Multan store details
* `/contact`: Store telephone dialer (`+92 300 6303618`), map preview, and inquiry form
* `/admin`: Full admin management dashboard with revenue analytics, stock control, and orders pipeline

---

## 🎟️ Active Demo Coupons

* `ROCKSTAR10`: 10% off on orders above PKR 5,000
* `STUDIO2000`: PKR 2,000 off on studio gear above PKR 25,000
* `WELCOME5`: 5% off any order
