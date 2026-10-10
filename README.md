# Syed Rizwan Bukhari — Personal Developer Portfolio

A modern, responsive, high-performance personal portfolio website for **Syed Rizwan Bukhari**, Computer Science & Engineering student at Government Polytechnic College Ganderbal (5th Semester).

---

## 🌟 Overview & Highlights

- **Aesthetic**: Sleek Dark/Light theme, glassmorphism surfaces, neon cyan and violet accents, modern typography (`Outfit`, `Plus Jakarta Sans`, and `JetBrains Mono`).
- **Real Portrait Integration**: Uses Syed Rizwan Bukhari's uploaded photograph in the hero visual card and printable CV.
- **Interactive Developer Terminal**: Embedded interactive Bash terminal (`rizwan@budgam:~$`) with quick command triggers (`whoami`, `skills`, `education`, `interests`, `contact`, `clear`).
- **Zero Heavy Frameworks**: Pure vanilla HTML5, CSS3, and JavaScript — lightning fast load times, zero build steps needed.
- **Responsive**: Fully responsive across mobile smartphones, tablets, laptops, and ultra-wide desktop screens with animated hamburger menu.
- **GitHub API Integration**: Real-time integration fetching public repositories from [@rizwanbukhari-dev](https://github.com/rizwanbukhari-dev) with curated fallback support.
- **Printable / Downloadable CV**: Built-in modal with clean paper resume styling and 1-click **Print / Save as PDF**.
- **1-Click Contact Details Customizer**: Update your real phone number and email address directly from the browser, saving instantly to `localStorage`.

---

## 📂 Project Structure

```
d:\rizwan-bukhari-protfolio\
├── index.html                  # Main portfolio webpage
├── css\
│   └── style.css               # Design system, themes, animations, media queries & print CSS
├── js\
│   ├── config.js               # Central configuration with personal info & social links
│   ├── github.js               # GitHub API integration & fallback repository cards
│   └── main.js                 # App logic, theme toggle, terminal emulator, form validator & modals
├── assets\
│   └── images\
│       ├── rizwan-photo.jpg    # Genuine uploaded portrait of Syed Rizwan Bukhari
│       ├── project-pdfshub.jpg # UI preview for PDFs Hub project
│       └── project-kcf-analytics.jpg # UI preview for KCF Social Media Analytics Dashboard
└── README.md                   # Documentation
```

---

## 🚀 How to Run Locally

You can preview the website locally using any lightweight local server:

### Option 1: Python
```bash
# In the project directory:
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option 2: Node.js (npx serve)
```bash
npx -y serve . -p 3000
```

### Option 3: Double-click
Simply open `index.html` in any modern web browser (Google Chrome, Edge, Firefox, Brave, Safari).

---

## ⚙️ Customizing Your Information

### 1. In `js/config.js`
Open `js/config.js` to change:
- `contact.phonePlaceholder` & `contact.phoneRaw`
- `contact.emailPlaceholder` & `contact.emailRaw`
- Social media URLs

### 2. Directly in the Browser
Click **"Customize My Phone & Email In 1-Click"** in the **Let's Connect** section on the website to enter your phone number and email. All buttons (Call, WhatsApp, Email, CV) will update automatically.

---

## 🌐 Deploying to GitHub Pages (Free)

1. Create a repository named `portfolio` (or `rizwanbukhari-dev.github.io`) on GitHub under your account `rizwanbukhari-dev`.
2. Push this folder to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/rizwanbukhari-dev/portfolio.git
   git push -u origin main
   ```
3. Go to **Settings > Pages** on GitHub and select `Branch: main`, `Folder: / (root)`.
4. Your website will be live in 1 minute at:
   `https://rizwanbukhari-dev.github.io/portfolio`

---

&copy; 2026 Syed Rizwan Bukhari. All rights reserved.
