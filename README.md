# Syed Rizwan Bukhari — Personal Developer Portfolio

A modern, responsive, industry-quality developer portfolio for **Syed Rizwan Bukhari**, Computer Engineering student at Government Polytechnic College Ganderbal (5th Semester).

---

## 🌟 Overview & Design Direction

- **Minimalist Engineering Aesthetic**: Clean, developer-focused interface designed with a deep navy / charcoal dark mode, crisp light mode toggle, and restrained indigo accents.
- **Authentic Presentation**: Accurately showcases Syed Rizwan Bukhari as a student developer building practical projects with honest skill categorization (no arbitrary proficiency percentages or exaggerated claims).
- **Zero Heavy Frameworks**: Pure semantic HTML5, modern vanilla CSS3, and JavaScript — lightning fast load times, zero build tooling required.
- **Genuine Image Integration**: High-resolution formal portrait and actual project preview assets.
- **Smooth Single-Page Flow & Universal Hamburger Navigation**: Minimalist header with a professional hamburger menu (☰) on desktop and mobile, opening an elegant off-canvas navigation panel with smooth transitions, scroll spy, and keyboard accessibility.
- **Featured Projects**:
  - **PDFKit**: Web-based PDF utility application deployed on Vercel ([Live Demo](https://pdfkit-1.vercel.app/) | [GitHub](https://github.com/rizwanbukhari-dev/pdfkit.1)).
  - **Personal Developer Portfolio**: Responsive portfolio codebase ([Live Demo](https://rizwanbukhari-1.vercel.app/) | [GitHub](https://github.com/rizwanbukhari-dev/my-portfolio)).
- **Live GitHub Activity**: Real-time integration with the GitHub REST API fetching public repositories from [@rizwanbukhari-dev](https://github.com/rizwanbukhari-dev) with graceful fallback cards.
- **Printable Curriculum Vitae**: Clean modal resume formatted for 1-click browser printing or PDF saving.

---

## 📂 Project Structure

```
d:\rizwan-bukhari-protfolio\
├── index.html                  # Main portfolio webpage (semantic sections A-I)
├── css\
│   └── style.css               # Design system, dark/light themes, typography, print styles
├── js\
│   ├── config.js               # Central configuration with verified personal & project details
│   ├── github.js               # GitHub REST API integration & fallback repository cards
│   └── main.js                 # Theme toggler, navigation, scroll spy, contact validation, CV modal
├── assets\
│   └── images\
│       ├── rizwan-photo.jpg    # Verified photograph of Syed Rizwan Bukhari
│       ├── avatar.jpg          # Avatar image
│       └── project-pdfshub.jpg # PDFKit project preview interface
└── README.md                   # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

You can run the portfolio locally using any standard static server:

### Option 1: Python (Built-in)
```bash
python -m http.server 3000
```
Then open: [http://localhost:3000](http://localhost:3000)

### Option 2: Node.js (`npx serve`)
```bash
npx -y serve . -p 3000
```
Then open: [http://localhost:3000](http://localhost:3000)

### Option 3: Direct Browser File
Double-click `index.html` in Windows Explorer to open it in Chrome, Edge, Firefox, Brave, or Safari.

---

## ⚙️ Details You Can Customize Manually

1. **LinkedIn Profile URL**:
   In `index.html` and `js/config.js`, search for `https://www.linkedin.com/` and replace it with your direct personal LinkedIn profile URL once confirmed (e.g. `https://www.linkedin.com/in/your-username`).
2. **Contact Email**:
   Currently configured to `syedrizwanbukhari18@gmail.com`. You can update this in `index.html`, `js/config.js`, and `js/main.js` if you ever switch emails.
3. **New Projects**:
   Add new projects inside `js/config.js` and `index.html` within the `#projects` section using the `.project-card` structure.

---

## 🌐 Publishing Your Changes

### 1. Push Changes to GitHub
Since your local repository is already connected to `https://github.com/rizwanbukhari-dev/my-portfolio.git`:

```bash
git add .
git commit -m "Redesign portfolio: modern minimalist developer UI, honest presentation, verified project links"
git push origin main
```

### 2. Deploying to Vercel (Recommended — Free & Instant)
1. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..." > "Project"**.
3. Import `my-portfolio` from your GitHub repositories.
4. Leave all build settings at default (Root Directory: `./`, Framework: `Other`).
5. Click **"Deploy"**. Vercel will give you a live production URL: [https://rizwanbukhari-1.vercel.app/](https://rizwanbukhari-1.vercel.app/).

### 3. Deploying to GitHub Pages (Alternative — Free)
1. In your GitHub repository (`rizwanbukhari-dev/my-portfolio`), go to **Settings > Pages**.
2. Under **Build and deployment**, choose **Source: Deploy from a branch**.
3. Select `Branch: main`, folder `/ (root)`, and click **Save**.
4. Your website will be available at: `https://rizwanbukhari-dev.github.io/my-portfolio/`

---

&copy; 2026 Syed Rizwan Bukhari. All rights reserved.
