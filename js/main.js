/**
 * Main Application Script
 * Syed Rizwan Bukhari - Developer Portfolio
 * Pure vanilla JavaScript with zero framework dependencies.
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initScrollSpy();
  initContactForm();
  initResumeModal();
  updateDynamicYear();
});

/* -------------------------------------------------------------------
   1. Theme Management (Dark / Light Theme)
   ------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const storedTheme = localStorage.getItem("portfolio_theme");
  
  // Default to dark theme as requested (deep navy / charcoal)
  const preferredTheme = storedTheme || "dark";
  document.documentElement.setAttribute("data-theme", preferredTheme);
  updateThemeIcon(preferredTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("portfolio_theme", nextTheme);
      updateThemeIcon(nextTheme);
      showToast(`Switched to ${nextTheme === "dark" ? "Dark" : "Light"} Mode`, "info");
    });
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }

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
   2. Navigation, Sticky Header & Hamburger Drawer Menu
   ------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const navDrawer = document.getElementById("nav-drawer");
  const navBackdrop = document.getElementById("nav-backdrop");
  const drawerLinks = document.querySelectorAll(".drawer-nav-link");

  // Sticky header shadow on scroll
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Drawer open / close handlers
  function openDrawer() {
    if (!navDrawer || !hamburgerBtn) return;
    hamburgerBtn.classList.add("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    navDrawer.classList.add("is-open");
    navDrawer.setAttribute("aria-hidden", "false");
    if (navBackdrop) navBackdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!navDrawer || !hamburgerBtn) return;
    hamburgerBtn.classList.remove("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    navDrawer.classList.remove("is-open");
    navDrawer.setAttribute("aria-hidden", "true");
    if (navBackdrop) navBackdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navDrawer && navDrawer.classList.contains("is-open");
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDrawer);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeDrawer);
  }

  // Close when clicking outside drawer
  document.addEventListener("click", (e) => {
    if (navDrawer && navDrawer.classList.contains("is-open")) {
      if (!navDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeDrawer();
      }
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
      closeModal("modal-resume");
    }
  });

  // Smooth scroll and auto-close drawer on link click
  drawerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetHref = link.getAttribute("href");
      if (targetHref && targetHref.startsWith("#")) {
        const targetEl = document.querySelector(targetHref);
        if (targetEl) {
          e.preventDefault();
          closeDrawer();
          
          const navHeight = navbar ? navbar.offsetHeight : 72;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
          
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
          });

          // Update hash without jumping
          history.pushState(null, "", targetHref);
        }
      }
    });
  });
}

/* -------------------------------------------------------------------
   3. ScrollSpy: Highlight Active Nav Link on Scroll
   ------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".drawer-nav-link, .nav-link");

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------------
   4. Contact Form Validation & Submission
   ------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const subjectInput = document.getElementById("contact-subject");
    const messageInput = document.getElementById("contact-message");
    const submitBtn = document.getElementById("contact-submit-btn");

    let isValid = true;

    // Validate Name
    if (!nameInput || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, "Please enter your name (min 2 characters).");
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    // Validate Subject
    if (!subjectInput || subjectInput.value.trim().length < 3) {
      showFieldError(subjectInput, "Please provide a subject line.");
      isValid = false;
    } else {
      clearFieldError(subjectInput);
    }

    // Validate Message
    if (!messageInput || messageInput.value.trim().length < 10) {
      showFieldError(messageInput, "Please enter a message (min 10 characters).");
      isValid = false;
    } else {
      clearFieldError(messageInput);
    }

    if (!isValid) return;

    // Form is valid: prepare mailto client launch and visual confirmation
    const name = encodeURIComponent(nameInput.value.trim());
    const email = encodeURIComponent(emailInput.value.trim());
    const subject = encodeURIComponent(subjectInput.value.trim());
    const message = encodeURIComponent(
      `Hello Syed Rizwan,\n\n${messageInput.value.trim()}\n\nBest regards,\n${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`
    );

    const targetEmail = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.contact && window.PORTFOLIO_CONFIG.contact.email)
      ? window.PORTFOLIO_CONFIG.contact.email
      : "syedrizwanbukhari18@gmail.com";

    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${message}`;

    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Opening Email App...</span>`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        showToast("Opening your default mail client with pre-filled message.", "success");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
      }, 500);
    }
  });

  // Clear errors on input
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", () => clearFieldError(input));
  });
}

function showFieldError(input, msg) {
  if (!input) return;
  input.classList.add("input-error");
  const parent = input.closest(".form-group");
  if (parent) {
    let errEl = parent.querySelector(".form-error-msg");
    if (!errEl) {
      errEl = document.createElement("div");
      errEl.className = "form-error-msg";
      parent.appendChild(errEl);
    }
    errEl.textContent = msg;
    errEl.style.display = "block";
  }
}

function clearFieldError(input) {
  if (!input) return;
  input.classList.remove("input-error");
  const parent = input.closest(".form-group");
  if (parent) {
    const errEl = parent.querySelector(".form-error-msg");
    if (errEl) {
      errEl.style.display = "none";
    }
  }
}

/* -------------------------------------------------------------------
   5. Printable Resume Modal
   ------------------------------------------------------------------- */
function initResumeModal() {
  const openButtons = document.querySelectorAll("[data-open-resume]");
  const modalResume = document.getElementById("modal-resume");
  const printBtn = document.getElementById("resume-print-btn");

  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("modal-resume");
    });
  });

  const closeButtons = document.querySelectorAll("[data-close-resume]");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      closeModal("modal-resume");
    });
  });

  if (modalResume) {
    modalResume.addEventListener("click", (e) => {
      if (e.target === modalResume) {
        closeModal("modal-resume");
      }
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("is-active");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("is-active");
  document.body.style.overflow = "";
}

/* -------------------------------------------------------------------
   6. Dynamic Copyright Year
   ------------------------------------------------------------------- */
function updateDynamicYear() {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll(".current-year");
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

/* -------------------------------------------------------------------
   7. Clean Lightweight Toast System
   ------------------------------------------------------------------- */
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    toastContainer.setAttribute("aria-live", "polite");
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-text">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// Global expose
window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
