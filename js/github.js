/**
 * GitHub API Integration & Fallback Handler
 * Syed Rizwan Bukhari - Profile & Repositories Showcase
 */

const GITHUB_USERNAME = "rizwanbukhari-dev";

// Default showcase repositories in case GitHub API is rate-limited or offline
const FALLBACK_REPOSITORIES = [
  {
    name: "PDFs-Hub",
    description: "A web-based PDF and document utility platform providing merging, conversion, compression, and document processing tools.",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    name: "KCF-Social-Analytics",
    description: "Analytics dashboard designed to evaluate Instagram and Facebook reach, engagement metrics, and posting time recommendations.",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    name: "rizwan-bukhari-portfolio",
    description: "Modern, responsive personal developer portfolio showcasing technical education, skills, projects, and learning journey.",
    language: "HTML / CSS / JS",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    name: "python-practical-scripts",
    description: "Modular Python scripts covering algorithmic logic, file automation, and academic engineering laboratory implementations.",
    language: "Python",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    name: "linux-command-line-notes",
    description: "Comprehensive notes, bash commands, system administration basics, and shell scripting reference for CSE students.",
    language: "Shell",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    name: "cybersecurity-basics-lab",
    description: "Documentation and study materials exploring network security protocols, vulnerability concepts, and ethical hacking essentials.",
    language: "Markdown",
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USERNAME}`
  }
];

async function loadGitHubData() {
  const reposContainer = document.getElementById("github-repos-grid");
  const statsRepos = document.getElementById("github-stat-repos");
  const statsFollowers = document.getElementById("github-stat-followers");
  const githubUserAvatar = document.getElementById("github-avatar-img");
  const githubProfileLink = document.getElementById("github-profile-link");

  if (githubProfileLink) {
    githubProfileLink.href = `https://github.com/${GITHUB_USERNAME}`;
  }

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (userRes.ok) {
      const userData = await userRes.json();
      if (statsRepos) statsRepos.textContent = userData.public_repos || "6+";
      if (statsFollowers) statsFollowers.textContent = userData.followers || "0";
      if (githubUserAvatar && userData.avatar_url) {
        githubUserAvatar.src = userData.avatar_url;
      }
    } else {
      // Graceful default values
      if (statsRepos) statsRepos.textContent = "6+";
      if (statsFollowers) statsFollowers.textContent = "Active";
    }

    // 2. Fetch User Repositories
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (repos && repos.length > 0) {
        renderRepositories(repos, reposContainer, true);
        return;
      }
    }
  } catch (err) {
    console.warn("GitHub API fetch notice (using curated repository showcase):", err);
  }

  // Fallback if API rate limited or empty
  renderRepositories(FALLBACK_REPOSITORIES, reposContainer, false);
}

function renderRepositories(repos, container, isApiData) {
  if (!container) return;

  container.innerHTML = "";
  
  repos.slice(0, 6).forEach(repo => {
    const name = isApiData ? repo.name : repo.name;
    const desc = isApiData ? (repo.description || "Project repository by Syed Rizwan Bukhari.") : repo.description;
    const lang = isApiData ? (repo.language || "Code") : repo.language;
    const url = isApiData ? repo.html_url : repo.url;
    const stars = isApiData ? repo.stargazers_count : (repo.stars || 0);

    const card = document.createElement("div");
    card.className = "repo-card";
    card.innerHTML = `
      <div>
        <div class="repo-title-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="repo-name">${name}</a>
        </div>
        <p class="repo-desc">${desc}</p>
      </div>
      <div class="repo-footer">
        <span class="repo-lang">
          <span class="lang-dot"></span>
          ${lang}
        </span>
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="contact-action-btn" style="padding: 3px 8px; font-size: 0.75rem;">
          View Repo &rarr;
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadGitHubData();
});
