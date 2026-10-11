/**
 * Main Application Script — Syed Rizwan Bukhari Portfolio
 * Polished Interactions, ScrollSpy, Drawer Menu, Typewriter & Scroll Reveal
 * Pure Vanilla JavaScript — Zero heavy frameworks
 */

document.addEventListener("DOMContentLoaded", () => {
  // Enforce consistent obsidian dark theme
  document.documentElement.setAttribute("data-theme", "dark");
  try { localStorage.removeItem("portfolio_theme"); } catch (e) {}

  initNavigation();
  initScrollSpy();
  initTypewriter();
  initScrollReveal();
  initContactForm();
  updateDynamicYear();
});

/* -------------------------------------------------------------------
   2. Navigation, Sticky Header & Hamburger Drawer Menu
   ------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById("header");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const navDrawer = document.getElementById("nav-drawer");
  const navBackdrop = document.getElementById("nav-backdrop");
  const navLinks = document.querySelectorAll(".nav__link, .drawer__nav-link");

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
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
    }
  });

  // Smooth scroll and auto-close drawer on link click
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetHref = link.getAttribute("href");
      if (targetHref && targetHref.startsWith("#")) {
        const targetEl = document.querySelector(targetHref);
        if (targetEl) {
          e.preventDefault();
          closeDrawer();
          
          const headerHeight = header ? header.offsetHeight : 74;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
          
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
          });

          history.pushState(null, "", targetHref);
        }
      }
    });
  });
}

/* -------------------------------------------------------------------
   3. ScrollSpy: Highlight Active Nav Link
   ------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link, .drawer__nav-link");

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
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
   4. Rotating Typewriter Headline (Inspired by abrarahmad.codes)
   ------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterEl = document.getElementById("home-typewriter");
  if (!typewriterEl) return;

  const roles = [
    "Computer Engineering Student",
    "Web Utility Developer",
    "Python & Automation Explorer",
    "Linux CLI Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* -------------------------------------------------------------------
   5. Scroll Reveal Effect
   ------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* -------------------------------------------------------------------
   6. Contact Form Validation & Mailto Trigger
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

    // Build Mailto URL
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = encodeURIComponent(subjectInput.value.trim());
    const rawMessage = `Hello Syed Rizwan,\n\n${messageInput.value.trim()}\n\nFrom: ${name}\nEmail: ${email}`;
    const encodedMessage = encodeURIComponent(rawMessage);

    const targetEmail = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.contact && window.PORTFOLIO_CONFIG.contact.email)
      ? window.PORTFOLIO_CONFIG.contact.email
      : "syedrizwanbukhari18@gmail.com";

    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${encodedMessage}`;

    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Opening Email App...</span>`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        showToast("Opening default email client with your prefilled message.", "success");
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
  const parent = input.closest(".form__group");
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
  const parent = input.closest(".form__group");
  if (parent) {
    const errEl = parent.querySelector(".form-error-msg");
    if (errEl) {
      errEl.style.display = "none";
    }
  }
}

/* -------------------------------------------------------------------
   7. Copy Email Helper
   ------------------------------------------------------------------- */
function copyEmailToClipboard(email = "syedrizwanbukhari18@gmail.com") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(() => showToast(`Copied ${email} to clipboard!`, "success"))
      .catch(() => showToast(`Email: ${email}`, "info"));
  } else {
    showToast(`Email: ${email}`, "info");
  }
}

/* -------------------------------------------------------------------
   8. Dynamic Copyright Year
   ------------------------------------------------------------------- */
function updateDynamicYear() {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll(".current-year");
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

/* -------------------------------------------------------------------
   9. Lightweight Toast Notification
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
  toast.innerHTML = `<span>${message}</span>`;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// Global exports
window.showToast = showToast;
window.copyEmailToClipboard = copyEmailToClipboard;
