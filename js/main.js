/**
 * Main Application Logic & Interactivity
 * Syed Rizwan Bukhari - Developer Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initScrollEvents();
  initMobileNav();
  initSkillFilters();
  initTerminal();
  initContactForm();
  initModals();
  initContactConfigurator();
  renderDynamicContent();
});

/* -------------------------------------------------------------------
   1. Theme Management (Dark / Light)
   ------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("portfolio_theme") || "dark";
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = activeTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio_theme", newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, "info");
    });
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");
  if (!sunIcon || !moonIcon) return;

  if (theme === "light") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
}

/* -------------------------------------------------------------------
   2. Scroll Events & Navigation Spy
   ------------------------------------------------------------------- */
/* -------------------------------------------------------------------
   2. Scroll Events & Sticky Header
   ------------------------------------------------------------------- */
function initScrollEvents() {
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("scroll-progress");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Progress Bar
    if (progressBar && docHeight > 0) {
      const scrollPercent = (scrollPos / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Sticky Navbar Styling
    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* -------------------------------------------------------------------
   3. Multi-View SPA Router & Touchable Navigation Drawer
   ------------------------------------------------------------------- */
const viewMap = {
  "#home": "view-home",
  "#about": "view-about",
  "#education": "view-education",
  "#skills": "view-skills",
  "#learning": "view-skills",
  "#projects": "view-projects",
  "#journey": "view-journey",
  "#services": "view-services",
  "#certificates": "view-certificates",
  "#achievements": "view-certificates",
  "#github": "view-github",
  "#contact": "view-contact"
};

function switchView(targetViewId, scrollTargetId) {
  const allViews = document.querySelectorAll(".portfolio-view");
  const targetView = document.getElementById(targetViewId) || document.getElementById("view-home");

  allViews.forEach(v => {
    v.classList.remove("active");
  });

  if (targetView) {
    targetView.classList.add("active");
  }

  // Update active state in drawer links
  const drawerLinks = document.querySelectorAll(".drawer-link");
  drawerLinks.forEach(link => {
    const linkView = link.getAttribute("data-view");
    if (linkView === targetViewId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Scroll to anchor within view if specified, otherwise scroll to top
  if (scrollTargetId && document.getElementById(scrollTargetId)) {
    setTimeout(() => {
      const el = document.getElementById(scrollTargetId);
      if (el) {
        const topPos = el.offsetTop - 85;
        window.scrollTo({ top: Math.max(0, topPos), behavior: "smooth" });
      }
    }, 60);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleHashRouting() {
  const hash = window.location.hash || "#home";
  const viewId = viewMap[hash] || "view-home";
  const anchor = hash.replace("#", "");
  switchView(viewId, anchor !== "home" && anchor !== "view-home" ? anchor : null);
}

function initMobileNav() {
  const menuLinesBtn = document.getElementById("menu-lines-btn") || document.getElementById("hamburger-btn");
  const menuDrawer = document.getElementById("menu-drawer");
  const menuBackdrop = document.getElementById("menu-drawer-backdrop");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const drawerLinks = document.querySelectorAll(".drawer-link");
  const homeOpenMenuBtn = document.getElementById("btn-home-open-menu");

  if (!menuLinesBtn || !menuDrawer) return;

  function openDrawer() {
    menuLinesBtn.classList.add("active");
    menuLinesBtn.setAttribute("aria-expanded", "true");
    menuDrawer.classList.add("active");
    if (menuBackdrop) menuBackdrop.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeDrawer() {
    menuLinesBtn.classList.remove("active");
    menuLinesBtn.setAttribute("aria-expanded", "false");
    menuDrawer.classList.remove("active");
    if (menuBackdrop) menuBackdrop.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  function toggleDrawer() {
    if (menuDrawer.classList.contains("active")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  // Trigger when touching/clicking the 3 lines button
  menuLinesBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  if (homeOpenMenuBtn) {
    homeOpenMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openDrawer();
    });
  }

  // Close with close button
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Close when tapping/clicking backdrop
  if (menuBackdrop) {
    menuBackdrop.addEventListener("click", closeDrawer);
  }

  // Close when tapping any link inside drawer and switch view
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // Intercept all internal anchor links to switch view smoothly
  document.addEventListener("click", (e) => {
    const targetLink = e.target.closest("a[href^='#']");
    if (!targetLink) return;

    const href = targetLink.getAttribute("href");
    if (!href || href === "#") return;

    if (viewMap[href]) {
      e.preventDefault();
      closeDrawer();
      history.pushState(null, "", href);
      const viewId = viewMap[href];
      switchView(viewId, href.replace("#", ""));
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuDrawer.classList.contains("active")) {
      closeDrawer();
    }
  });

  // Listen to hash / history changes
  window.addEventListener("hashchange", handleHashRouting);
  window.addEventListener("popstate", handleHashRouting);

  // Initial routing
  handleHashRouting();
}

/* -------------------------------------------------------------------
   4. Technical Skills Filtering
   ------------------------------------------------------------------- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll(".skill-filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterCategory = btn.getAttribute("data-filter");

      skillCards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (filterCategory === "all" || cardCat === filterCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* -------------------------------------------------------------------
   5. Interactive Developer Terminal
   ------------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById("term-input");
  const body = document.getElementById("term-body");
  if (!input || !body) return;

  const commands = {
    help: () => `Available commands:
• <span class="term-accent">whoami</span> - Display developer profile
• <span class="term-accent">skills</span> - List core technical proficiencies
• <span class="term-accent">education</span> - Display current college & diploma details
• <span class="term-accent">interests</span> - Cybersecurity, Linux & web development focus
• <span class="term-accent">contact</span> - Display email, phone and social accounts
• <span class="term-accent">clear</span> - Clear the terminal screen`,
    
    whoami: () => `User: Syed Rizwan Bukhari
Role: Computer Science & Engineering Diploma Student
College: Government Polytechnic College Ganderbal (5th Sem)
Location: Budgam, Jammu & Kashmir, India
Aspiration: Software Developer & Cybersecurity Professional`,

    skills: () => `Programming: C, Python, Java, HTML, CSS, JavaScript
Database: DBMS, SQL
Operating Systems: Linux, Windows, UNIX basics
Tools: Git, GitHub, VS Code, Document Utilities, Linux CLI`,

    education: () => `• Diploma in Computer Science & Engineering
  Govt Polytechnic College Ganderbal (5th Semester)
• Class 10th
  HS Chewdara`,

    interests: () => `[+] Web Development & Responsive Design
[+] Linux Administration & Shell Scripting
[+] Cybersecurity & Ethical Hacking Fundamentals
[+] PDF & Document Processing Architectures
[+] Data Analytics & Metrics Dashboards`,

    contact: () => `WhatsApp: +91 6005320065
Email: syedrizwanbukhari18@gmail.com
Location: Budgam, Jammu & Kashmir, India
LinkedIn: Rizwan Bukhari-dev
GitHub: rizwanbukhari-dev
Instagram: rizwanbukhari.dev`,

    clear: () => {
      body.innerHTML = "";
      return "";
    }
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawCmd = input.value.trim().toLowerCase();
      input.value = "";

      if (!rawCmd) return;

      // Append command prompt
      const cmdLine = document.createElement("div");
      cmdLine.className = "term-line";
      cmdLine.innerHTML = `<span class="term-prompt">rizwan@budgam:~$</span> <span class="term-cmd">${rawCmd}</span>`;
      body.appendChild(cmdLine);

      // Execute command
      if (rawCmd === "clear") {
        commands.clear();
      } else if (commands[rawCmd]) {
        const outputLine = document.createElement("div");
        outputLine.className = "term-line term-output";
        outputLine.innerHTML = commands[rawCmd]().replace(/\n/g, "<br>");
        body.appendChild(outputLine);
      } else {
        const errorLine = document.createElement("div");
        errorLine.className = "term-line term-output";
        errorLine.innerHTML = `command not found: ${rawCmd}. Type <span class="term-accent">help</span> for a list of available commands.`;
        body.appendChild(errorLine);
      }

      body.scrollTop = body.scrollHeight;
    }
  });

  // Make terminal pill buttons clickable
  const quickPills = document.querySelectorAll(".term-quick-cmd");
  quickPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const cmd = pill.getAttribute("data-cmd");
      input.value = cmd;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });
  });
}

/* -------------------------------------------------------------------
   6. Contact Form Validation & Submission
   ------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");
  const submitBtn = document.getElementById("contact-submit-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError(nameInput);
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput);
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      showError(subjectInput);
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput);
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      showToast("Please correct the errors in the form.", "info");
      return;
    }

    // Loading State
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending Message...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      // Simulate successful dispatch
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      // Show success modal or toast
      showToast("Thank you, Syed Rizwan will receive your message!", "success");
      
      // Also offer to open client's default email client as a reliable alternative
      openEmailDraft(nameInput.value, subjectInput.value, messageInput.value);
    }, 900);
  });

  function showError(input) {
    input.classList.add("is-invalid");
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
    if (inp) {
      inp.addEventListener("input", () => clearError(inp));
    }
  });
}

function openEmailDraft(name, subject, message) {
  const targetEmail = getActiveEmail();
  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject || "Portfolio Contact Inquiry")}&body=${encodeURIComponent(`Hi Syed Rizwan,\n\nName: ${name}\n\n${message}`)}`;
  
  // Prompt user if they also want to trigger native mail client
  const promptBox = document.getElementById("email-redirect-notice");
  if (promptBox) {
    promptBox.style.display = "block";
    const mailBtn = document.getElementById("email-client-link");
    if (mailBtn) mailBtn.href = mailtoUrl;
  }
}

/* -------------------------------------------------------------------
   7. Modals (Project Details, CV Viewer, Contact Updater)
   ------------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll("[data-modal-target]");
  const modalCloses = document.querySelectorAll("[data-modal-close]");

  modalTriggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-modal-target");
      openModal(targetId);
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-backdrop");
      if (modal) closeModal(modal);
    });
  });

  // Close when clicking outside dialog
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Escape key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.active").forEach(m => closeModal(m));
    }
  });

  // CV Print Button
  const cvPrintBtn = document.getElementById("cv-print-btn");
  if (cvPrintBtn) {
    cvPrintBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* -------------------------------------------------------------------
   8. Contact Details Configurator (Phone & Email LocalStorage Override)
   ------------------------------------------------------------------- */
function initContactConfigurator() {
  const configBtn = document.getElementById("open-config-modal-btn");
  const saveBtn = document.getElementById("save-contact-info-btn");
  const phoneInput = document.getElementById("config-phone-input");
  const emailInput = document.getElementById("config-email-input");

  const defaultPhone = "+91 6005320065";
  const defaultEmail = "syedrizwanbukhari18@gmail.com";

  // Load saved custom values if any, otherwise default to real details
  let savedPhone = localStorage.getItem("rizwan_custom_phone");
  let savedEmail = localStorage.getItem("rizwan_custom_email");

  if (!savedPhone || savedPhone.includes("Your Phone Number") || savedPhone.includes("[PUT")) {
    savedPhone = defaultPhone;
    localStorage.setItem("rizwan_custom_phone", defaultPhone);
  }

  if (!savedEmail || savedEmail.includes("example.com") || savedEmail.includes("[PUT")) {
    savedEmail = defaultEmail;
    localStorage.setItem("rizwan_custom_email", defaultEmail);
  }

  if (phoneInput) phoneInput.value = savedPhone;
  if (emailInput) emailInput.value = savedEmail;

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const newPhone = phoneInput.value.trim();
      const newEmail = emailInput.value.trim();

      if (newPhone) localStorage.setItem("rizwan_custom_phone", newPhone);
      if (newEmail) localStorage.setItem("rizwan_custom_email", newEmail);

      renderContactLinks();
      closeModal(document.getElementById("modal-contact-config"));
      showToast("Contact information updated successfully!", "success");
    });
  }
}

function getActivePhone() {
  return localStorage.getItem("rizwan_custom_phone") || (window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.contact.phonePlaceholder : "+91 6005320065");
}

function getActiveEmail() {
  return localStorage.getItem("rizwan_custom_email") || (window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.contact.emailPlaceholder : "syedrizwanbukhari18@gmail.com");
}

function renderContactLinks() {
  const activePhone = getActivePhone();
  const activeEmail = getActiveEmail();

  // Update text nodes
  document.querySelectorAll(".contact-phone-text").forEach(el => el.textContent = activePhone);
  document.querySelectorAll(".contact-email-text").forEach(el => el.textContent = activeEmail);

  // Update links
  document.querySelectorAll(".contact-phone-link").forEach(link => {
    const rawNumber = activePhone.replace(/[^0-9+]/g, '');
    link.href = rawNumber ? `tel:${rawNumber}` : `#contact`;
  });

  document.querySelectorAll(".contact-whatsapp-link").forEach(link => {
    const rawNumber = activePhone.replace(/[^0-9]/g, '');
    link.href = rawNumber ? `https://wa.me/${rawNumber}?text=Hi%20Syed%20Rizwan,%20I%20viewed%20your%20portfolio!` : `https://wa.me/?text=Hi%20Syed%20Rizwan,%20I%20viewed%20your%20portfolio!`;
  });

  document.querySelectorAll(".contact-email-link").forEach(link => {
    link.href = `mailto:${activeEmail}?subject=Contact%20from%20Portfolio`;
  });
}

/* -------------------------------------------------------------------
   9. Render Dynamic Content
   ------------------------------------------------------------------- */
function renderDynamicContent() {
  renderContactLinks();

  // Populate dynamic project modal details
  const projectDetailsMap = {
    "pdfshub": {
      title: "PDFs Hub — Document Utility Platform",
      category: "Web Application & File Processing",
      status: "Coming Soon (Under Active Development)",
      img: "assets/images/project-pdfshub.jpg",
      desc: `A comprehensive web-based PDF and document utility platform engineered to solve repetitive document manipulation tasks for students, academic researchers, and digital service center (CSC) shop operators.`,
      features: [
        "Merge PDF: Combine multiple PDF files in custom order with client-side preview",
        "PDF Conversion: Convert PDFs to/from images, text, and office documents",
        "PDF Compression: Optimize file size while maintaining legible clarity for portal submissions",
        "Document Conversion: Transform DOCX, PPT, and image assets seamlessly",
        "Image Compression: Batch compression for passport-size photos and certificates",
        "Multiple file-processing tools with high-speed client-side execution"
      ]
    },
    "kcf-analytics": {
      title: "KCF Social Media Analytics Dashboard",
      category: "Analytics & Data Visualization",
      status: "Project Prototype",
      img: "assets/images/project-kcf-analytics.jpg",
      desc: `An analytical performance dashboard designed to track, measure, and optimize reach and engagement across Instagram and Facebook accounts. Built to deliver actionable content recommendations and timing insights.`,
      features: [
        "Instagram & Facebook platform selection tabs",
        "Date-range filtering and comparative metrics",
        "Reach and Impressions trend visualizations",
        "Engagement rate and follower growth breakdown",
        "Top-performing posts ranking by engagement",
        "Best posting time & day heatmap analytics",
        "Content category and format recommendations"
      ]
    }
  };

  document.querySelectorAll("[data-project-trigger]").forEach(btn => {
    btn.addEventListener("click", () => {
      const projKey = btn.getAttribute("data-project-trigger");
      const projData = projectDetailsMap[projKey];
      if (!projData) return;

      const titleEl = document.getElementById("project-modal-title");
      const catEl = document.getElementById("project-modal-cat");
      const statusEl = document.getElementById("project-modal-status");
      const imgEl = document.getElementById("project-modal-img");
      const descEl = document.getElementById("project-modal-desc");
      const featsEl = document.getElementById("project-modal-features");

      if (titleEl) titleEl.textContent = projData.title;
      if (catEl) catEl.textContent = projData.category;
      if (statusEl) statusEl.textContent = projData.status;
      if (imgEl) imgEl.src = projData.img;
      if (descEl) descEl.textContent = projData.desc;

      if (featsEl) {
        featsEl.innerHTML = "";
        projData.features.forEach(f => {
          const li = document.createElement("li");
          li.style.marginBottom = "8px";
          li.innerHTML = `<strong>&bull;</strong> ${f}`;
          featsEl.appendChild(li);
        });
      }

      openModal("modal-project-details");
    });
  });
}

/* -------------------------------------------------------------------
   10. Toast Notification System
   ------------------------------------------------------------------- */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<polyline points="20 6 9 17 4 12"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 20);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
