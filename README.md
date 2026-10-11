# Syed Rizwan Bukhari — Personal Developer Portfolio

A modern, high-polish developer portfolio for **Syed Rizwan Bukhari**, Computer Engineering student at Government Polytechnic College Ganderbal (5th Semester), inspired by the visual quality, layout polish, and animations of [abrarahmad.codes](https://www.abrarahmad.codes/).

---

## 🌟 Visual Design & Architecture

- **Aesthetic DNA**: Sophisticated dark theme (deep obsidian `#08090d`, deep navy `#0d0f16`, and glassmorphic card backdrops) with luminous violet (`#a78bfa`) and cyan/blue (`#38bdf8`) accents.
- **Ambient Lighting & Glows**: Subtle multi-point radial gradient glow orbs and fine grid texture inspired by modern editorial developer portfolios.
- **Interactive Hero**:
  - Name header with signature interactive multi-layer luminous glow on hover.
  - Dynamic rotating role typewriter banner.
  - Profile portrait frame with glowing gradient border and live status pill.
- **Navigation**:
  - Sticky glassmorphic navbar with active section indicator (ScrollSpy).
  - Prominent "Resume" download button and quick contact action.
  - Responsive mobile slide-out drawer with numbered navigation entries (`01 Home` to `06 Contact`).
  - Consistent obsidian dark theme across all devices.
- **Resume Download Feature**:
  - Direct 1-click download of `assets/docs/resume.pdf` (saved as `Syed-Rizwan-Bukhari-Resume.pdf`), featuring verified student education, technical skills, and projects.
- **Featured Projects**:
  - **PDFKit**: Web-based PDF utility application deployed on Vercel ([Live Demo](https://pdfkit-1.vercel.app/) | [Source Code](https://github.com/rizwanbukhari-dev/pdfkit.1)).
  - **Personal Developer Portfolio**: Modern vanilla HTML/CSS/JS portfolio codebase ([Live Demo](https://rizwanbukhari-1.vercel.app/) | [Source Code](https://github.com/rizwanbukhari-dev/my-portfolio)).
- **Live GitHub Activity**: Real-time integration with GitHub REST API dynamically showcasing public repositories from [@rizwanbukhari-dev](https://github.com/rizwanbukhari-dev) with graceful fallbacks.
- **Authentic Presentation**: Accurate representation of educational background (5th Semester Computer Engineering Diploma, Govt. Polytechnic College Ganderbal) with honest skills and genuine projects (zero fabricated experience or inflated claims).
- **Fast & Zero-Bloat**: Built with pure semantic HTML5, modern vanilla CSS3, and JavaScript — loads instantly with zero heavy runtime frameworks.

---

## 📂 Project Structure

```
d:\rizwan-bukhari-protfolio\
├── index.html                  # Main portfolio webpage
├── css\
│   └── style.css               # Design system, glassmorphism, animations & responsive media queries
├── js\
│   ├── config.js               # Central portfolio configuration & personal details
│   ├── github.js               # Live GitHub REST API integration & fallback repository cards
│   └── main.js                 # Navigation drawer, scrollspy, typewriter & contact handler
├── assets\
│   ├── docs\
│   │   └── resume.pdf          # Verified PDF resume of Syed Rizwan Bukhari
│   └── images\
│       ├── rizwan-photo.jpg    # Verified photograph of Syed Rizwan Bukhari
│       ├── avatar.jpg          # Avatar image
│       └── project-pdfshub.jpg # PDFKit project preview interface
└── README.md                   # Project documentation
```

---

## 🚀 How to Run Locally

You can preview the portfolio locally with any static web server:

### Option 1: Python (Built-in)
```bash
python -m http.server 3000
```
Open: [http://localhost:3000](http://localhost:3000)

### Option 2: Node.js (`npx serve`)
```bash
npx -y serve . -p 3000
```
Open: [http://localhost:3000](http://localhost:3000)

### Option 3: Direct Browser File
Double-click `index.html` in Windows File Explorer to open directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## ⚙️ Customization Guide

1. **LinkedIn Profile URL**:
   In `index.html` and `js/config.js`, search for `https://www.linkedin.com/` and update it with your direct personal LinkedIn profile link (e.g. `https://www.linkedin.com/in/your-profile`).
2. **Contact Email**:
   Currently configured to `syedrizwanbukhari18@gmail.com`. Update in `index.html`, `js/config.js`, and `js/main.js` if you ever change email addresses.
3. **Adding New Projects**:
   Duplicate a `.project__card` block in `index.html` within `#projects` and update your repository and live demo links.

---

## 🌐 Deploying to Vercel

Since your project is configured with Git:
```bash
git add .
git commit -m "Redesign portfolio inspired by abrarahmad.codes with dark obsidian glassmorphism and modern animations"
git push origin main
```
Vercel will automatically build and deploy the update to your live domain: [https://rizwanbukhari-1.vercel.app/](https://rizwanbukhari-1.vercel.app/).
