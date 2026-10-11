/**
 * GitHub API Integration & Fallback Showcase
 * Syed Rizwan Bukhari (@rizwanbukhari-dev)
 * Fetches public repositories from GitHub REST API with curated fallbacks.
 */

const GITHUB_USERNAME = "rizwanbukhari-dev";

// Curated authentic repositories shown if GitHub API is rate-limited or offline
const FALLBACK_REPOSITORIES = [
  {
    name: "pdfkit.1",
    description: "A lightweight, web-based PDF and document utility application for merging, splitting, and converting documents. Deployed on Vercel.",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}/pdfkit.1`,
    liveDemo: "https://pdfkit-1.vercel.app/"
  },
  {
    name: "my-portfolio",
    description: "Modern, responsive personal developer portfolio engineered with HTML5, vanilla CSS3, and JavaScript.",
    language: "HTML",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}/my-portfolio`,
    liveDemo: "https://rizwanbukhari-1.vercel.app/"
  },
  {
    name: "python-practical-work",
    description: "Python scripts exploring programming logic, laboratory problem sets, automation routines, and data structures.",
    language: "Python",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`,
    liveDemo: ""
  },
  {
    name: "linux-cli-notes",
    description: "Practical documentation, bash command references, file system permissions, and shell scripting guides for engineering students.",
    language: "Shell",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`,
    liveDemo: ""
  }
];

async function loadGitHubData() {
  const reposContainer = document.getElementById("github-repos-grid");
  const statsRepos = document.getElementById("github-stat-repos");
  const statsFollowers = document.getElementById("github-stat-followers");
  const profileLink = document.getElementById("github-profile-link");

  if (profileLink) {
    profileLink.href = `https://github.com/${GITHUB_USERNAME}`;
  }

  if (!reposContainer) return;

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (userRes.ok) {
      const userData = await userRes.json();
      if (statsRepos && userData.public_repos !== undefined) {
        statsRepos.textContent = userData.public_repos;
      }
      if (statsFollowers && userData.followers !== undefined) {
        statsFollowers.textContent = userData.followers;
      }
    } else {
      if (statsRepos) statsRepos.textContent = "Active";
      if (statsFollowers) statsFollowers.textContent = "Student";
    }

    // 2. Fetch User Repositories
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        renderRepositories(repos, reposContainer, true);
        return;
      }
    }
  } catch (err) {
    // Gracefully handle rate limit / network issue
    console.info("Using curated GitHub repository showcase (network notice):", err.message || err);
  }

  // Fallback to authentic curated repositories
  renderRepositories(FALLBACK_REPOSITORIES, reposContainer, false);
}

function renderRepositories(repos, container, isApiData) {
  if (!container) return;

  container.innerHTML = "";

  repos.slice(0, 4).forEach(repo => {
    const name = repo.name;
    const desc = repo.description || "Public repository by Syed Rizwan Bukhari.";
    const lang = repo.language || "Code";
    const url = isApiData ? repo.html_url : repo.url;
    const stars = isApiData ? (repo.stargazers_count || 0) : (repo.stars || 0);

    const card = document.createElement("article");
    card.className = "github-repo-card";
    card.innerHTML = `
      <div class="repo-card-header">
        <div class="repo-name-wrap">
          <svg class="repo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="repo-title-link" aria-label="Repository ${name}">
            ${name}
          </a>
        </div>
        <span class="repo-badge">Public</span>
      </div>
      <p class="repo-description">${escapeHtml(desc)}</p>
      <div class="repo-meta-row">
        <div class="repo-lang-indicator">
          <span class="lang-color-dot lang-${lang.toLowerCase().replace(/[^a-z]/g, '')}"></span>
          <span class="repo-lang-name">${lang}</span>
        </div>
        ${stars > 0 ? `
          <div class="repo-stars">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>${stars}</span>
          </div>
        ` : ''}
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="repo-view-link" aria-label="View code for ${name} on GitHub">
          View Code &rarr;
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  loadGitHubData();
});
